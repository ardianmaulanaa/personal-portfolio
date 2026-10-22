"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface ExperienceItem {
  id: string;
  period: string;
  organization: string;
  role: string;
  category: "Laboratory" | "Comitee" | "Internship" | "Organization";
  description: string;
  technologies: string[];
  image?: string;
  imageAlt?: string;
  initials: string;
}

const experiences: ExperienceItem[] = [
  {
    id: "telkomsel",
    period: "JUN—AUG 2026",
    organization: "Telkomsel ",
    role: "Software Development Internship",
    category: "Internship",
    description:
      "Contributed to a web-based employee attendance application, working across attendance workflows, employee management interfaces, and full-stack feature delivery.",
    technologies: ["Next.js", "TypeScript", "React"],
    image: "/experience/creativemu",
    imageAlt:
      "FaceAttend attendance system interface illustration developed during the internship",
    initials: "MKC",
  },
  {
    id: "creativemu",
    period: "JUN—AUG 2026",
    organization: "CV. Mulya Kreatif Cipta",
    role: "Software Development Internship",
    category: "Internship",
    description:
      "Contributed to a web-based employee attendance application, working across attendance workflows, employee management interfaces, and full-stack feature delivery.",
    technologies: ["Next.js", "TypeScript", "React"],
    image: "/experience/creativemu/COVER.JPG",
    imageAlt:
      "FaceAttend attendance system interface illustration developed during the internship",
    initials: "MKC",
  },
  {
    id: "central-computer-improvement",
    period: "JAN 2026—NOW",
    organization: "Central Computer Improvement",
    role: "Backend Division",
    category: "Organization",
    description:
      "Developing backend skills through API design, relational data, application logic, and practical software utilities within the division.",
    technologies: ["Backend", "REST API", "Database"],
    image: "/experience/CCI/COVER.png",
    initials: "CCI",
  },
  {
    id: "big-data-laboratory",
    period: "Des 2025—NOW",
    organization: "Big Data Laboratory",
    role: "Senior Member",
    category: "Laboratory",
    description:
      "Developing backend skills through API design, relational data, application logic, and practical software utilities within the division.",
    technologies: ["Backend", "REST API", "Database"],
    image: "/experience/bigdata/COVER.jpeg",
    initials: "BIGDATA",
  },
  {
    id: "advanced-software-engineering",
    period: "NOV 2025—NOW",
    organization: "Advanced Software Engineering Laboratory",
    role: "System Analyst",
    category: "Laboratory",
    description:
      "Exploring software requirements and system design through structured analysis, SRS documentation, UML, and collaborative engineering work.",
    technologies: ["System Analysis", "SRS", "UML"],
    image: "/experience/ase-team.jpeg",
    imageAlt:
      "Advanced Software Engineering Laboratory team presenting a software project",
    initials: "ASE",
  },
  {
    id: "multimedia-laboratory",
    period: "2024—2025",
    organization: "Multimedia Laboratory",
    role: "E-Tilang Project Division",
    category: "Laboratory",
    description:
      "Studying Informatics Engineering in Bandung, with a current GPA of 3.68 / 4.00 and a focus on backend systems, artificial intelligence, and software engineering.",
    technologies: ["Roboflow", "Machine Learning", "EDA"],
    image: "/experience/multimedia/COVER.JPG",
    initials: "Multimedia",
  },

  {
    id: "PPUH",
    period: "2024—2024",
    organization: "Informatics student association selection committee",
    role: "Publication And Documentation",
    category: "Comitee",
    description:
      "Contributed to the Publication and Documentation division of the Informatics Student Association selection committee, creating visual content, documenting activities, and supporting media publication to ensure clear communication and professional event coverage.",
    technologies: ["Adobe Premiere Pro", "Adobe Photoshop", "Photoshoot"],
    image: "/experience/PPUH/COVER.JPG",
    initials: "PPUH",
  },
];

function ExperienceVisual({ item }: { item: ExperienceItem }) {
  if (item.image) {
    return (
      <Image
        src={item.image}
        alt={item.imageAlt ?? ""}
        fill
        sizes="(max-width: 767px) 86vw, 42vw"
      />
    );
  }

  return (
    <div className="timeline-fallback" aria-hidden="true">
      <span>{item.initials}</span>
      <div className="fallback-grid" />
      <i>SYS / {item.id.toUpperCase().slice(0, 12)}</i>
    </div>
  );
}

export default function ExperienceTimeline() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const progress = section.querySelector<HTMLElement>(".timeline-progress");
      const items = gsap.utils.toArray<HTMLElement>(".timeline-item", section);

      if (reducedMotion) {
        gsap.set(progress, { scaleY: 1 });
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        progress,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline-list",
            start: "top 65%",
            end: "bottom 55%",
            scrub: 0.5,
          },
        },
      );

      items.forEach((item) => {
        const card = item.querySelector(".timeline-card");
        const visual = item.querySelector(".timeline-visual");
        const content = item.querySelectorAll(".timeline-content > *");
        const node = item.querySelector(".timeline-node");
        const reveal = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 78%",
            once: true,
            toggleClass: { targets: item, className: "is-active" },
          },
        });
        reveal
          .fromTo(
            card,
            { autoAlpha: 0, y: 34 },
            { autoAlpha: 1, y: 0, duration: 0.72, ease: "power3.out" },
          )
          .fromTo(
            visual,
            { clipPath: "inset(0 0 100% 0)" },
            {
              clipPath: "inset(0 0 0% 0)",
              duration: 0.7,
              ease: "power3.inOut",
            },
            0.05,
          )
          .fromTo(
            node,
            { scale: 0.55 },
            { scale: 1, duration: 0.45, ease: "back.out(1.7)" },
            0.1,
          )
          .fromTo(
            content,
            { autoAlpha: 0, y: 14 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.45,
              stagger: 0.055,
              ease: "power2.out",
            },
            0.22,
          );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="experience" className="timeline-section">
      <div className="section-index light">
        <span>05</span> THE JOURNEY
      </div>
      <header className="timeline-heading">
        <h2>
          Experience &amp;
          <br />
          <em>education.</em>
        </h2>
        <p>
          A developing path through software delivery, system analysis, backend
          engineering, and formal computer science education.
        </p>
      </header>

      <div className="timeline-list">
        <div className="timeline-track" aria-hidden="true">
          <div className="timeline-progress" />
        </div>
        {experiences.map((item, index) => (
          <article
            className={`timeline-item ${index % 2 ? "timeline-item-right" : "timeline-item-left"}`}
            key={item.id}
          >
            <span className="timeline-node" aria-hidden="true">
              <i />
            </span>
            <div className="timeline-card">
              <div className="timeline-visual">
                <ExperienceVisual item={item} />
              </div>
              <div className="timeline-content">
                <div className="timeline-meta">
                  <span>
                    0{index + 1} / {item.category}
                  </span>
                  <time>{item.period}</time>
                </div>
                <h3>{item.organization}</h3>
                <h4>{item.role}</h4>
                <p>{item.description}</p>
                <div className="timeline-tags">
                  {item.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
