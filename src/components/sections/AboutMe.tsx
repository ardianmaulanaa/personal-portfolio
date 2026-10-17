'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

export default function AboutMe() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    gsap.from('.about-statement span', { yPercent: 110, duration: 1, stagger: .11, ease: 'power4.out', scrollTrigger: { trigger: '.about-statement', start: 'top 82%', once: true } });
    gsap.from('.editorial-bio > *', { y: 35, opacity: 0, duration: .75, stagger: .1, ease: 'power3.out', scrollTrigger: { trigger: '.editorial-bio', start: 'top 82%', once: true } });
  }, { scope: root });

  return <section ref={root} id="about" className="editorial-about">
    <div className="section-index light"><span>01</span> BEYOND THE CODE</div>
    <div className="about-editorial-grid">
      <div className="about-statement" aria-label="Engineering reliable systems with curiosity and intent">
        <span>Engineering</span><span>reliable systems</span><span>with <em>curiosity</em></span><span>and intent.</span>
      </div>
      <div className="editorial-bio">
        <span className="bio-label">PROFILE / ARDIAN</span>
        <p>I&apos;m Muhammad Ardian Maulana, an Informatics Engineering student at Telkom University. My interests lie in backend engineering, artificial intelligence, and building software that solves practical problems.</p>
        <p>I enjoy developing applications that combine reliable backend systems, structured data, and intuitive user experiences—from procurement monitoring and employee attendance to computer vision experiments.</p>
        <div className="interest-cluster"><span>BACKEND</span><span>AI / ML</span><span>DISTRIBUTED SYSTEMS</span><span>CLOUD & DEVOPS</span></div>
      </div>
    </div>
  </section>;
}
