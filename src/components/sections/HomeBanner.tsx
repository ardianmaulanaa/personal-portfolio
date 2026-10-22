'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { useReducedMotion } from '@/lib/useReducedMotion';

function ProfilePhoto() {
  return (
    <div className="hero-profile-frame">
      <Image
        src="/img/ProfilePict-Ardian.JPG"
        alt="Muhammad Ardian Maulana"
        fill
        priority
        sizes="(min-width: 1024px) 40vw, (min-width: 768px) 72vw, calc(100vw - 2.5rem)"
        className="hero-profile-image"
      />
    </div>
  );
}

export default function HomeBanner() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP((_, contextSafe) => {
    if (reduced) return;

    gsap.set('.hero-reveal', { yPercent: 115 });
    gsap.set('.hero-fade', { y: 24, opacity: 0 });

    // The preloader can finish after this effect has mounted. Wrapping its
    // callback in contextSafe makes the delayed timeline part of this GSAP
    // context, so Strict Mode and route unmounts can reliably revert it.
    const play = contextSafe!(() => {
      gsap.timeline({ defaults: { ease: 'power4.out' } })
        .to('.hero-reveal', {
          yPercent: 0,
          duration: 1.05,
          stagger: 0.1,
          overwrite: 'auto',
        })
        .to('.hero-fade', {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.09,
          overwrite: 'auto',
        }, '-=.6');
    });

    if (window.__preloaderDone) play();
    else window.addEventListener('preloaderComplete', play, { once: true });

    return () => {
      window.removeEventListener('preloaderComplete', play);
    };
  }, { scope: root, dependencies: [reduced] });

  const scrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    const lenis = (window as Window & { __lenis?: { scrollTo: (el: Element, opts: object) => void } }).__lenis;
    if (lenis) lenis.scrollTo(target, { duration: 1.1 });
    else target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={root} id="top" className="systems-hero">
      <div className="hero-code-label hero-fade"><span>01</span> HELLO, I&apos;M ARDIAN</div>
      <div className="systems-hero-grid">
        <div className="hero-copy">
          <h1 aria-label="Muhammad Ardian Maulana">
            <span className="hero-line"><span className="hero-reveal">Muhammad</span></span>
            <span className="hero-line"><span className="hero-reveal serif-accent">Ardian</span></span>
            <span className="hero-line"><span className="hero-reveal">Maulana</span></span>
          </h1>
          <div className="hero-visual-wrap hero-fade"><ProfilePhoto /></div>
          <div className="hero-position hero-fade">Backend Developer <i /> AI Enthusiast</div>
          <p className="hero-summary hero-fade">I build reliable digital systems, explore intelligent technologies, and turn complex ideas into practical software.</p>
          <div className="hero-actions hero-fade">
            <button onClick={() => scrollTo('projects')} className="system-button primary">Explore projects <span>↗</span></button>
            <button onClick={() => scrollTo('about')} className="system-button">About me <span>↓</span></button>
          </div>
        </div>
      </div>
      <div className="hero-footer hero-fade">
        <span>BASED IN BANDUNG, INDONESIA</span><span className="hero-scroll"><i /> SCROLL TO EXPLORE</span><span>AVAILABLE FOR COLLABORATION</span>
      </div>
    </section>
  );
}
