export const site = {
  name: 'Muhammad Ardian Maulana',
  firstName: 'Ardian',
  lastName: 'Maulana',
  handle: 'ardianmaulanaa',
  brand: 'Ardian.',
  email: 'ardianmaulana92251@gmail.com',
  location: 'Bandung, Indonesia',
  timeZone: 'Asia/Jakarta',
  timeZoneLabel: 'WIB',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  tagline: 'Backend Developer & AI Enthusiast building reliable, useful software.',
  roles: [
    'Backend Developer',
    'AI Enthusiast',
    'Software Engineer',
    'Cloud & DevOps Learner',
  ],
} as const;

export type SocialKey = 'github' | 'linkedin' | 'source';

export const socials: Record<SocialKey, { label: string; href: string }> = {
  github: { label: 'GitHub', href: 'https://github.com/ardianmaulanaa' },
  linkedin: { label: 'LinkedIn', href: 'https://www.linkedin.com/in/muhammad-ardian-maulana-92449b30a/' },
  source: { label: 'Original Source', href: 'https://github.com/aitezazdev/Portfolio' },
};

export const socialList: Array<{ label: string; href: string }> = [
  socials.linkedin,
  socials.github,
  socials.source,
];

export const navLinks = [
  { name: 'Home', href: '/#top', menuOnly: true },
  { name: 'About', href: '/#about' },
  { name: 'Services', href: '/#services' },
  { name: 'Work', href: '/#projects' },
  { name: 'Contact', href: '/#contact' },
] as const;
