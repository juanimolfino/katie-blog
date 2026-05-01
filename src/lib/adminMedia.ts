import { supabase } from '@/lib/supabase';

const MEDIA_BUCKET = 'media';
const MAX_UPLOAD_SIZE = 10 * 1024 * 1024;
const DEFAULT_TARGET_SIZE = 850 * 1024;
const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

type ImageOptimizationOptions = {
  maxWidth?: number;
  quality?: number;
  targetSize?: number;
  minWidth?: number;
  minQuality?: number;
};

function requireSupabase() {
  if (!supabase) {
    throw new Error('Supabase is not configured.');
  }

  return supabase;
}

function sanitizeFileName(fileName: string, extensionOverride?: string) {
  const extension = extensionOverride ?? fileName.split('.').pop()?.toLowerCase() ?? 'jpg';
  const baseName = fileName
    .replace(/\.[^/.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 60);

  return `${baseName || 'image'}.${extension}`;
}

function validateImageFile(file: File) {
  if (!SUPPORTED_IMAGE_TYPES.includes(file.type)) {
    throw new Error(
      'Unsupported image format. Please upload a JPG, PNG, WebP, or GIF file. If this is an iPhone HEIC photo, export it as JPG first.'
    );
  }
}

function loadImage(file: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Unable to read this image. Please try exporting it as JPG or PNG.'));
    };

    image.src = objectUrl;
  });
}

async function canvasToBlob(canvas: HTMLCanvasElement, quality: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Unable to optimize this image.'));
          return;
        }

        resolve(blob);
      },
      'image/webp',
      quality
    );
  });
}

async function renderImageToWebp(
  image: HTMLImageElement,
  maxWidth: number,
  quality: number
) {
  const scale = Math.min(1, maxWidth / image.naturalWidth);
  const width = Math.round(image.naturalWidth * scale);
  const height = Math.round(image.naturalHeight * scale);
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('This browser cannot optimize images right now.');
  }

  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, 0, 0, width, height);

  return canvasToBlob(canvas, quality);
}

async function optimizeImageFile(file: File, options: ImageOptimizationOptions) {
  validateImageFile(file);

  if (file.type === 'image/gif') {
    if (file.size > MAX_UPLOAD_SIZE) {
      throw new Error('GIF files must be under 10 MB. Try uploading a JPG, PNG, or WebP instead.');
    }

    return file;
  }

  const image = await loadImage(file);
  const targetSize = options.targetSize ?? DEFAULT_TARGET_SIZE;
  const minWidth = options.minWidth ?? 1000;
  const minQuality = options.minQuality ?? 0.6;
  let currentMaxWidth = options.maxWidth ?? 1600;
  let currentQuality = options.quality ?? 0.78;
  let blob = await renderImageToWebp(image, currentMaxWidth, currentQuality);

  while (blob.size > targetSize && (currentQuality > minQuality || currentMaxWidth > minWidth)) {
    if (currentQuality > minQuality) {
      currentQuality = Math.max(minQuality, currentQuality - 0.08);
    } else {
      currentMaxWidth = Math.max(minWidth, Math.round(currentMaxWidth * 0.84));
    }

    blob = await renderImageToWebp(image, currentMaxWidth, currentQuality);
  }

  const optimizedFile = new File(
    [blob],
    sanitizeFileName(file.name, 'webp'),
    { type: 'image/webp' }
  );

  if (optimizedFile.size > MAX_UPLOAD_SIZE) {
    throw new Error(
      'This image is still over 10 MB after optimization. Try cropping it or exporting a smaller JPG/WebP.'
    );
  }

  return optimizedFile;
}

export async function uploadMediaFile(
  file: File,
  folder = 'posts',
  options: ImageOptimizationOptions = {}
) {
  const client = requireSupabase();
  const uploadFile = await optimizeImageFile(file, options);
  const filePath = `${folder}/${crypto.randomUUID()}-${sanitizeFileName(uploadFile.name)}`;

  const { error } = await client.storage.from(MEDIA_BUCKET).upload(filePath, uploadFile, {
    cacheControl: '3600',
    upsert: false,
  });

  if (error) throw error;

  const { data } = client.storage.from(MEDIA_BUCKET).getPublicUrl(filePath);
  return data.publicUrl;
}
