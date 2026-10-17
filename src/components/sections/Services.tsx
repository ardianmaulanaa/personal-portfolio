'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

const services = [
  ['Backend Systems', 'REST APIs, authentication, relational data, and maintainable application logic.', ['API DESIGN', 'AUTH', 'DATABASES']],
  ['Full-Stack Applications', 'Responsive products connecting polished interfaces to dependable server-side workflows.', ['NEXT.JS', 'TYPESCRIPT', 'POSTGRES']],
  ['AI & Data Solutions', 'Practical machine-learning and computer-vision prototypes grounded in real use cases.', ['PYTHON', 'COMPUTER VISION', 'DATA']],
  ['Cloud & Deployment', 'Containerized applications, web-server configuration, and evolving cloud workflows.', ['DOCKER', 'NGINX', 'LINUX']],
];

export default function Services() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => { gsap.from('.build-row', { x: -45, opacity: 0, stagger: .1, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 72%', once: true } }); }, { scope: root });
  return <section ref={root} id="services" className="build-section">
    <div className="section-index light"><span>02</span> CAPABILITIES</div>
    <div className="build-title"><h2>What I <em>build.</em></h2><p>Engineering services shaped by practical project experience and continuous technical learning.</p></div>
    <div className="build-list">{services.map(([title, desc, tags], i) => <article className="build-row" key={title as string}>
      <span className="build-num">0{i + 1}</span><h3>{title as string}</h3><p>{desc as string}</p><div>{(tags as string[]).map(t => <span key={t}>{t}</span>)}</div><i>↗</i>
    </article>)}</div>
  </section>;
}
