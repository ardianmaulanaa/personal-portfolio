import { Metadata } from 'next';
import { site } from './site';

const title = 'Muhammad Ardian Maulana | Backend Developer & AI Enthusiast';
const description =
  'Portfolio of Muhammad Ardian Maulana, an Informatics Engineering student at Telkom University focused on backend engineering, artificial intelligence, and software development.';

export const siteMetadata: Metadata = {
  title: {
    default: title,
    template: '%s | Muhammad Ardian Maulana',
  },
  description,
  keywords: [
    'Muhammad Ardian Maulana',
    'Backend Developer',
    'AI Enthusiast',
    'Informatics Engineering',
    'Telkom University',
    'Web Developer',
    'Software Engineer',
    'Next.js',
    'React',
    'JavaScript',
    'Portfolio',
  ],
  authors: [
    {
      name: 'Muhammad Ardian Maulana',
    },
  ],
  creator: 'Muhammad Ardian Maulana',
  metadataBase: new URL(site.url),
  alternates: {
    canonical: './',
  },
  icons: {
    icon: '/logo.svg',
  },
  openGraph: {
    title,
    description,
    url: site.url,
    siteName: 'Muhammad Ardian Maulana Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Muhammad Ardian Maulana — Backend Developer and AI Enthusiast',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};
