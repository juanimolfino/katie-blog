import { supabase } from '@/lib/supabase';
import type { BlogCategorySlug, Continent } from '@/types';

export type AdminPostStatus = 'draft' | 'published';
export type AdminPostBlockType =
  | 'heading'
  | 'paragraph'
  | 'image'
  | 'image-pair'
  | 'divider'
  | 'youtube'
  | 'quote'
  | 'link'
  | 'list';

export type AdminPostBlockContent = {
  text?: string;
  src?: string;
  alt?: string;
  caption?: string;
  attribution?: string;
  href?: string;
  label?: string;
  items?: string[];
  srcSecondary?: string;
  altSecondary?: string;
  captionSecondary?: string;
  orientation?: 'landscape' | 'portrait';
  youtubeUrl?: string;
  youtubeUrlMobile?: string;
  videoTitle?: string;
};

export type AdminPost = {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  excerpt: string;
  cover_image: string;
  status: AdminPostStatus;
  categories: BlogCategorySlug[];
  tags: string[];
  read_time: number;
  destination: string;
  country: string;
  continent: Continent | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type AdminPostInput = {
  title: string;
  slug: string;
  subtitle: string;
  excerpt: string;
  cover_image: string;
  status: AdminPostStatus;
  categories: BlogCategorySlug[];
  tags: string[];
  read_time: number;
  destination: string;
  country: string;
  continent: Continent | null;
  published_at: string | null;
};

export type AdminPostBlock = {
  id: string;
  post_id: string;
  type: AdminPostBlockType;
  position: number;
  content: AdminPostBlockContent;
  created_at: string;
  updated_at: string;
};

export type AdminPostBlockInput = {
  type: AdminPostBlockType;
  position: number;
  content: AdminPostBlockContent;
};

function requireSupabase() {
  if (!supabase) {
    throw new Error('Supabase is not configured.');
  }

  return supabase;
}

export async function fetchAdminPosts() {
  const client = requireSupabase();
  const { data, error } = await client
    .from('posts')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return (data ?? []) as AdminPost[];
}

export async function fetchAdminPost(id: string) {
  const client = requireSupabase();
  const { data, error } = await client
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as AdminPost;
}

export async function createAdminPost(input: AdminPostInput) {
  const client = requireSupabase();
  const { data, error } = await client
    .from('posts')
    .insert(input)
    .select()
    .single();

  if (error) throw error;
  return data as AdminPost;
}

export async function updateAdminPost(id: string, input: AdminPostInput) {
  const client = requireSupabase();
  const { data, error } = await client
    .from('posts')
    .update(input)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as AdminPost;
}

export async function deleteAdminPost(id: string) {
  const client = requireSupabase();
  const { error } = await client.from('posts').delete().eq('id', id);

  if (error) throw error;
}

export async function fetchAdminPostBlocks(postId: string) {
  const client = requireSupabase();
  const { data, error } = await client
    .from('post_blocks')
    .select('*')
    .eq('post_id', postId)
    .order('position', { ascending: true });

  if (error) throw error;
  return (data ?? []) as AdminPostBlock[];
}

export async function replaceAdminPostBlocks(
  postId: string,
  blocks: AdminPostBlockInput[]
) {
  const client = requireSupabase();
  const { error: deleteError } = await client
    .from('post_blocks')
    .delete()
    .eq('post_id', postId);

  if (deleteError) throw deleteError;

  if (blocks.length === 0) return [];

  const rows = blocks.map((block, index) => ({
    post_id: postId,
    type: block.type,
    position: index,
    content: block.content,
  }));

  const { data, error } = await client
    .from('post_blocks')
    .insert(rows)
    .select()
    .order('position', { ascending: true });

  if (error) throw error;
  return (data ?? []) as AdminPostBlock[];
}
