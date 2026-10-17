# Muhammad Ardian Maulana — Portfolio

Personal portfolio for Muhammad Ardian Maulana, an Informatics Engineering student at Telkom University focused on backend engineering, artificial intelligence, and practical software development.

The site is built with Next.js 15, React 19, TypeScript, GSAP, ScrollTrigger, Lenis, and Tailwind CSS. It preserves the expressive motion system and editorial direction of the upstream project while replacing the public identity, biography, projects, contact details, and media with Ardian's verified information.

## Highlights

- Animated hero typography and global preloader
- Smooth scrolling with Lenis and GSAP ScrollTrigger
- Curved full-screen navigation and custom cursor
- Responsive project showcase with dynamic case-study routes
- Interactive canvas backgrounds and scroll-driven reveals
- Contact form with Resend/Gmail support and an honest local-development fallback
- Reduced-motion support

## Projects

- SIMUKPBJ — procurement monitoring system
- FaceAttend — employee attendance system
- GreenMarket — marketplace web application
- E-Tilang — wrong-way vehicle detection prototype

Project descriptions and external links are based on Ardian's CV, local source code, and public GitHub repositories. Institutional records and unsupported performance claims are intentionally excluded.

## Development

```bash
npm ci
npm run dev
```

Open <http://localhost:3000>.

Production verification:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Optional environment variables

Copy `.env.example` to `.env.local` only when needed.

- `NEXT_PUBLIC_SITE_URL` — deployed canonical URL; defaults to `http://localhost:3000`
- `NEXT_PUBLIC_GA_ID` — optional Google Analytics ID
- `RESEND_API_KEY` — optional Resend delivery key
- `GMAIL_APP_PASSWORD` — optional Gmail App Password
- `CONTACT_EMAIL` — optional recipient override; defaults to Ardian's email from `src/lib/site.ts`

Without mail credentials in development, messages are saved to the local ignored `messages.txt` file and the UI explicitly states that no email was delivered.

## Attribution and license

This project is based on the open-source [Aitezaz Portfolio](https://github.com/aitezazdev/Portfolio) by Aitezaz Sikandar and retains its original MIT license and copyright notice in `LICENSE`.

Personalization and portfolio content represent Muhammad Ardian Maulana. Upstream attribution is not personal branding and is intentionally preserved.
