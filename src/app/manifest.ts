import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Backend Developer & AI Enthusiast`,
    short_name: 'Ardian.',
    description: site.tagline,
    start_url: '/',
    display: 'standalone',
    background_color: '#0D1525',
    theme_color: '#2456C4',
    icons: [
      {
        src: '/logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
