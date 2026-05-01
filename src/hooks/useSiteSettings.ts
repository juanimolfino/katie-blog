import { useEffect, useState } from 'react';
import { defaultSiteSettings, fetchSiteSettings, type SiteSettings } from '@/lib/siteSettings';

export function useSiteSettings() {
  return useSiteSettingsState().settings;
}

export function useSiteSettingsState() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadSettings() {
      setIsLoading(true);

      try {
        const nextSettings = await fetchSiteSettings();
        if (isMounted) setSettings(nextSettings);
      } catch (error) {
        console.error('Unable to load site settings', error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    void loadSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  return { settings, isLoading };
}
