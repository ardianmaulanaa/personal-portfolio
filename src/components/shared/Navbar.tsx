'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';

const links = [
  ['About', '#about'], ['Work', '#projects'], ['Services', '#services'], ['Stack', '#tech-stack'], ['Journey', '#experience'], ['Contact', '#contact'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('top');
  const panel = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)), { rootMargin: '-30% 0px -60%' });
    ['top', 'about', 'projects', 'services', 'tech-stack', 'experience', 'contact'].forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const menu = panel.current;
    if (!menu) return;

    const items = menu.querySelectorAll<HTMLElement>('.nav-panel-link');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gsap.killTweensOf([menu, items]);

    if (open) {
      gsap.set(menu, { autoAlpha: 1, pointerEvents: 'auto' });
      gsap.to(menu, { xPercent: 0, duration: reduceMotion ? 0 : .75, ease: 'power4.inOut', overwrite: 'auto' });
      gsap.fromTo(items, { y: reduceMotion ? 0 : 40, opacity: 0 }, {
        y: 0,
        opacity: 1,
        stagger: reduceMotion ? 0 : .07,
        delay: reduceMotion ? 0 : .2,
        duration: reduceMotion ? 0 : .55,
        ease: 'power3.out',
        overwrite: 'auto',
        onComplete: () => items[0]?.focus(),
      });
    } else {
      gsap.to(items, { y: reduceMotion ? 0 : 40, opacity: 0, duration: reduceMotion ? 0 : .25, overwrite: 'auto' });
      gsap.to(menu, {
        xPercent: 105,
        duration: reduceMotion ? 0 : .55,
        ease: 'power4.inOut',
        overwrite: 'auto',
        onComplete: () => {
          gsap.set(menu, { autoAlpha: 0, pointerEvents: 'none' });
        },
      });
      if (wasOpen.current) toggle.current?.focus();
    }

    wasOpen.current = open;
  }, [open]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
      if (event.key !== 'Tab' || !open || !panel.current) return;

      const focusable = Array.from(panel.current.querySelectorAll<HTMLElement>('button, a[href]'));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    const closeOnDesktop = () => {
      if (window.innerWidth > 900) setOpen(false);
    };

    document.body.classList.toggle('menu-open', open);
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
    window.addEventListener('keydown', closeOnEscape);
    window.addEventListener('resize', closeOnDesktop);

    return () => {
      document.body.classList.remove('menu-open');
      window.__lenis?.start();
      window.removeEventListener('keydown', closeOnEscape);
      window.removeEventListener('resize', closeOnDesktop);
    };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    const target = document.querySelector(href);
    setTimeout(() => target?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  return (
    <>
      <header className="system-nav">
        <Link href="/#top" className="system-wordmark" aria-label="Ardian home"><b>AM</b><span>.</span></Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([label, href]) => <button key={href} className={active === href.slice(1) ? 'active' : ''} onClick={() => go(href)}>{label}</button>)}
        </nav>
        <button className="nav-contact" onClick={() => go('#contact')}>Let&apos;s talk <span>↗</span></button>
        <button ref={toggle} type="button" className="nav-toggle" onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-controls="mobile-navigation"><span>{open ? 'CLOSE' : 'MENU'}</span><i className={open ? 'open' : ''} /></button>
      </header>
      <div ref={panel} id="mobile-navigation" className="nav-panel" role="dialog" aria-label="Mobile navigation" aria-modal="true" aria-hidden={!open} inert={!open}>
        <div className="nav-panel-meta">NAVIGATION / 2026</div>
        <nav aria-label="Mobile navigation">{links.map(([label, href], i) => <button type="button" key={href} className="nav-panel-link" onClick={() => go(href)}><span>0{i + 1}</span>{label}<i>↗</i></button>)}</nav>
        <div className="nav-panel-bottom"><span>Bandung, Indonesia</span><a href="mailto:ardianmaulana92251@gmail.com">ardianmaulana92251@gmail.com</a></div>
      </div>
    </>
  );
}
