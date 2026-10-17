'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';

const links = [
  ['About', '#about'], ['Services', '#services'], ['Stack', '#tech-stack'], ['Work', '#projects'], ['Journey', '#experience'], ['Contact', '#contact'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('top');
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)), { rootMargin: '-30% 0px -60%' });
    ['top', 'about', 'projects', 'experience', 'services', 'tech-stack', 'contact'].forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!panel.current) return;
    gsap.to(panel.current, { xPercent: open ? 0 : 105, duration: open ? .75 : .55, ease: 'power4.inOut' });
    gsap.to(panel.current.querySelectorAll('.nav-panel-link'), { y: open ? 0 : 40, opacity: open ? 1 : 0, stagger: open ? .07 : 0, delay: open ? .2 : 0, duration: .55, ease: 'power3.out' });
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
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
        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation"><span>{open ? 'CLOSE' : 'MENU'}</span><i className={open ? 'open' : ''} /></button>
      </header>
      <div ref={panel} id="mobile-navigation" className="nav-panel" aria-hidden={!open}>
        <div className="nav-panel-meta">NAVIGATION / 2026</div>
        <nav>{links.map(([label, href], i) => <button key={href} className="nav-panel-link" onClick={() => go(href)}><span>0{i + 1}</span>{label}<i>↗</i></button>)}</nav>
        <div className="nav-panel-bottom"><span>Bandung, Indonesia</span><a href="mailto:ardianmaulana92251@gmail.com">ardianmaulana92251@gmail.com</a></div>
      </div>
    </>
  );
}
