'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { getAllProjects } from '@/lib/projects';

export default function Projects() {
  const root = useRef<HTMLElement>(null);
  const projects = getAllProjects();

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.case-card');
    cards.forEach((card) => gsap.from(card, { y: 70, opacity: 0, duration: .9, ease: 'power4.out', scrollTrigger: { trigger: card, start: 'top 88%', once: true } }));
  }, { scope: root });

  return (
    <section ref={root} id="projects" className="case-section">
      <div className="section-index"><span>03</span> SELECTED SYSTEMS</div>
      <div className="case-heading">
        <h2>Work built for<br/><em>the real world.</em></h2>
        <p>Selected software systems spanning public-sector workflows, employee operations, commerce, and computer vision.</p>
      </div>
      <div className="case-grid">
        {projects.map((project, index) => (
          <Link href={`/projects/${project.slug}`} key={project.slug} className={`case-card case-${index + 1}`}>
            <div className="case-image">
              <Image src={project.hoverImage} alt={`${project.title} project preview`} fill sizes="(max-width: 768px) 100vw, 65vw" />
              <div className="case-image-overlay" />
              <span className="case-open">View case ↗</span>
            </div>
            <div className="case-meta"><span>0{index + 1}</span><span>{project.type}</span></div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="case-tech">{project.tech.slice(0, 4).map((tech) => <span key={tech}>{tech}</span>)}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
