"use client";

import Image from "next/image";
import { useEffect, useMemo } from "react";

import {
  Home,
  Workflow,
  BriefcaseBusiness,
  UserRound,
  Code2,
  BarChart3,
  GraduationCap,
  Mail,
} from "lucide-react";

interface ApproachItem {
  number: string;
  title: string;
  text: string;
}

interface ExperienceItem {
  place: string;
  role: string;
  date: string;
  text: string;
}

interface NavItem {
  href: string;
  label: string;
}

const SKILLS: string[] = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "Next.js",
  "React",
  "Node.js",
  "Golang",
  "Python",
  "Java",
  "PostgreSQL",
  "Git & GitHub",
];

const APPROACH: ApproachItem[] = [
  {
    number: "01",
    title: "Web Development",
    text: "Building modern, responsive, and user-friendly websites such as portfolios, landing pages, dashboards, and web-based systems.",
  },
  {
    number: "02",
    title: "Artificial Intelligence",
    text: "Exploring AI concepts, machine learning basics, automation ideas, and intelligent features that can improve digital products.",
  },
  {
    number: "03",
    title: "Cybersecurity",
    text: "Learning security fundamentals, system protection, vulnerability awareness, and safer development practices for web applications.",
  },
];

const SERVICES: Array<[string, string]> = [
  ["Frontend Development", "Responsive landing page, dashboard, portfolio, and admin interface."],
  ["Backend Development", "API logic, CRUD flow, authentication concept, and database integration."],
  ["Project Refactoring", "Cleaning structure, splitting components, and improving code readability."],
  ["UI Enhancement", "Modern layout, section animation, color balance, and mobile responsive design."],
  ["Database Flow", "Designing table relations, query logic, backup concept, and report structure."],
  ["Learning Lab", "Documenting progress, practical notes, and simple experiments for campus tasks."],
];

const EXPERIENCES: ExperienceItem[] = [
  {
    place: "Central Computer Improvement",
    role: "Back End Developer",
    date: "Jan 2026 - Present",
    text: "Contributing as a back-end developer by learning and working with Node.js, JavaScript, API development, server-side logic, and database integration.",
  },
  {
    place: "Big Data Laboratory",
    role: "AI Engineering",
    date: "Nov 2025 - Present",
    text: "Exploring artificial intelligence, big data concepts, MySQL, SQL, data processing, and AI-related development through laboratory activities.",
  },
  {
    place: "Advanced Software Engineering Laboratory",
    role: "System Analyst",
    date: "Jul 2025 - Sep 2025",
    text: "Worked on EchoMarket, a digital platform project for buying and selling unused or second-hand items. Focused on system analysis, project flow, database structure, and feature planning.",
  },
  {
    place: "Multimedia Laboratory",
    role: "Programming Division",
    date: "Nov 2024 - Dec 2025",
    text: "Learning and exploring machine learning, Roboflow, data processing, and practical technology implementation through laboratory activities.",
  },
  {
    place: "Informatics Student Association",
    role: "Publication and Documentation Staff",
    date: "Nov 2024 - Feb 2025",
    text: "Contributed to publication and documentation activities, including event documentation, photography, content preparation, and supporting organizational media needs.",
  },
  {
    place: "Informatics Student",
    role: "Software Development Learner",
    date: "2024 - Present",
    text: "Learning programming fundamentals, web development, database, software engineering, and practical project implementation.",
  },
];

const NAV_ITEMS: NavItem[] = [
  { href: "#home", label: "Home" },
  { href: "#approach", label: "Approach" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#stats", label: "Stats" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

function SplitText({ text }: { text: string }) {
  let charIndex = 0;

  return (
    <span className="split-text" aria-label={text}>
      {text.split(" ").map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} className="split-word">
          {word.split("").map((char) => {
            const currentIndex = charIndex;
            charIndex += 1;

            return (
              <span
                key={`${char}-${wordIndex}-${currentIndex}`}
                className="split-char"
                style={{ animationDelay: `${currentIndex * 0.045}s` }}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

function SectionTitle({
  number,
  eyebrow,
  title,
  side,
}: {
  number: string;
  eyebrow?: string;
  title: string;
  side?: string;
}) {
  return (
    <div className="section-head scroll-fade">
      <div className="section-kicker">
        <span>{number}</span>
        {eyebrow ? <span>{eyebrow}</span> : <span />}
        {side ? <span>{side}</span> : <span />}
      </div>

      <h2>
        <SplitText text={title} />
      </h2>
    </div>
  );
}

function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(249,115,22,0.16),transparent_32%),radial-gradient(circle_at_78%_26%,rgba(255,255,255,0.12),transparent_30%),radial-gradient(circle_at_50%_88%,rgba(249,115,22,0.12),transparent_36%)]" />
      <div className="noise-layer" />
      <div className="grid-layer" />
      <div className="orb orb-one" />
      <div className="orb orb-two" />
      <div className="orb orb-three" />
    </div>
  );
}

function SideIcon({ label }: { label: string }) {
  const iconProps = {
    size: 19,
    strokeWidth: 2.2,
  };

  if (label === "Home") return <Home {...iconProps} />;
  if (label === "Approach") return <Workflow {...iconProps} />;
  if (label === "Portfolio") return <BriefcaseBusiness {...iconProps} />;
  if (label === "About") return <UserRound {...iconProps} />;
  if (label === "Services") return <Code2 {...iconProps} />;
  if (label === "Stats") return <BarChart3 {...iconProps} />;
  if (label === "Experience") return <GraduationCap {...iconProps} />;
  return <Mail {...iconProps} />;
}

export default function HomePage() {
  const duplicatedSkills = useMemo(() => [...SKILLS, ...SKILLS], []);

  useEffect(() => {
    const targets = document.querySelectorAll(
      ".scroll-fade, .phase-card, .project-row, .service-row, .experience-row, .stat-card"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.12 }
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0d0d0f] text-[#f7f1e3] lg:pl-[96px]">
      <AnimatedBackground />

      <aside className="side-nav">
        <a href="#home" className="side-logo" aria-label="Home">
          <span>ARDN</span>
          <small>DEV</small>
        </a>

        <div className="side-links">
          {NAV_ITEMS.slice(1, 7).map((item) => (
            <a key={item.href} href={item.href} title={item.label} aria-label={item.label}>
              <SideIcon label={item.label} />
            </a>
          ))}
        </div>

        <a href="#contact" className="side-contact" aria-label="Contact">
          <Mail size={18} strokeWidth={2.4} />
        </a>
      </aside>

      <nav className="mobile-nav">
        <a href="#home" className="font-black tracking-[0.25em]">
          ARDN<span className="text-orange-500">.</span>
        </a>
        <a
          href="#contact"
          className="rounded-full border border-white/20 px-4 py-2 text-xs font-black uppercase tracking-[0.2em]"
        >
          Contact
        </a>
      </nav>

      <section id="home" className="hero-section">
        <div className="hero-topline scroll-fade">
          <div>
            <span>DEV /</span>
            <span>PORTFOLIO</span>
          </div>

          <a href="#contact">Contact Now</a>
        </div>

        <div className="hero-grid">
          <div className="scroll-fade">
            <p className="hero-location">Based in Indonesia • Available Worldwide</p>
            <h1 className="hero-title">
              Muhammad
              <span>Ardian</span>
              Maulana
            </h1>
          </div>

          <div className="hero-profile scroll-fade">
            <div className="profile-glow" />
            <div className="profile-ring">
              <Image
                src="/profile/ProfilePict.JPG"
                alt="Muhammad Ardian Maulana"
                width={400}
                height={400}
                className="profile-img"
                priority
              />
            </div>

            <div className="profile-card profile-card-one">
              <span>Digital Portfolio</span>
              <b>2026</b>
            </div>

            <div className="profile-card profile-card-two">
              <span>Focus</span>
              <b>Backend • Web • AI</b>
            </div>
          </div>
        </div>

        <div className="hero-bottom scroll-fade">
          <p>
            Informatics student focused on building useful digital products, backend systems,
            web applications, cybersecurity, and artificial intelligence.
          </p>

          <div className="hero-role">
            <span>Backend Developer</span>
            <span>+</span>
            <span>Web Developer</span>
          </div>
        </div>
      </section>

      <section id="approach" className="section-block bg-cream text-dark">
        <div className="main-focus-title">
          <SectionTitle number="01" title="Main Focus" side="Web • AI • Cyber" />
        </div>

        <div className="phase-grid">
          {APPROACH.map((item) => (
            <article key={item.number} className="phase-card">
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="portfolio" className="portfolio-section">
        <div className="portfolio-top">
          <span>02</span>
          <span>PORTFOLIO</span>
          <span>2026</span>
        </div>

        <div className="portfolio-layout">
          <div className="portfolio-left">
            <h2 className="portfolio-title scroll-fade">
              <SplitText text="Latest Portfolio" />
            </h2>

            <article className="portfolio-card-work scroll-fade">
              <div className="portfolio-image large">
                <img src="/greenmarket-preview.png" alt="GreenMarket preview" />
              </div>

              <div className="portfolio-work-meta">
                <div>
                  <h3>GreenMarket</h3>
                  <p>PORTFOLIO</p>
                </div>

                <a href="#" aria-label="Open GreenMarket">
                  →
                </a>
              </div>
            </article>
          </div>

          <div className="portfolio-right">
            <div className="portfolio-desc scroll-fade">
              <span className="portfolio-dot" />
              <p>
                My creative spirit comes alive in the digital realm. With clean code, modern layout,
                and practical features.
              </p>
            </div>

            <article className="portfolio-card-work portfolio-card-lower scroll-fade">
              <div className="portfolio-image small">
                <img src="/procurement-preview.png" alt="Procurement Dashboard preview" />
              </div>

              <div className="portfolio-work-meta">
                <div>
                  <h3>Health Procurement</h3>
                  <p>DASHBOARD WEBSITE</p>
                </div>

                <a href="#" aria-label="Open Procurement Dashboard">
                  →
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="about" className="section-block bg-cream text-dark">
        <SectionTitle number="03" eyebrow="Who Am I" title="More About Ardian" side="Since Learning" />

        <div className="about-grid">
          <div className="about-copy scroll-fade">
            <h3>I build projects to understand how real software works.</h3>
            <p>
              I am an Informatics student who enjoys learning technology by building real projects.
              I work with frontend, backend, databases, debugging, and code improvement to create
              cleaner and easier-to-understand applications.
            </p>
            <p>
              My main interests are backend development, cybersecurity, and artificial intelligence.
              I aim to build applications that are not only visually appealing, but also supported by clean logic and a well-organized structure. 
            </p>
            <a href="#contact">Download Resume</a>
          </div>

          <div className="about-image scroll-fade">
            <img src="/profile.png" alt="Ardian profile" />
            <div>
              <span>Currently Learning</span>
              <b>Next.js + Tailwind CSS</b>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section-block bg-orange text-dark">
        <SectionTitle number="04" eyebrow="Services" title="What I Can Build" side="Fast Iteration" />

        <div className="service-list">
          {SERVICES.map(([title, text], index) => (
            <article key={title} className="service-row">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="skill-strip" aria-label="Skills marquee">
        <div className="marquee-track">
          {duplicatedSkills.map((skill, index) => (
            <span key={`${skill}-${index}`}>{skill}</span>
          ))}
        </div>
      </section>

      <section id="stats" className="section-block bg-dark text-cream">
        <SectionTitle number="05" eyebrow="Stats" title="Fun Facts" side="Growing" />

        <div className="stats-grid">
          {[
            ["10+", "Tech Stack Learned"],
            ["3+", "Main Project Areas"],
            ["100%", "Learning Mode"],
            ["24/7", "Curiosity"],
          ].map(([value, label]) => (
            <article key={label} className="stat-card">
              <strong>{value}</strong>
              <span>{label}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="experience" className="section-block bg-cream text-dark">
        <SectionTitle number="06" eyebrow="Experience" title="Learning Journey" side="Present" />

        <div className="experience-list">
          {EXPERIENCES.map((item) => (
            <article key={item.place} className="experience-row">
              <div>
                <h3>{item.place}</h3>
                <span>{item.role}</span>
              </div>

              <time>{item.date}</time>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-card scroll-fade">
          <span>07 Contact</span>
          <h2>
            <SplitText text="Let's Build Something Useful." />
          </h2>
          <p>
            Interested to collaborate, discuss a project, or connect with me? Reach me through email,
            GitHub, or LinkedIn.
          </p>

          <div>
            <a href="mailto:ardianmaulana92251@gmail.com">Email Me</a>

            <a href="https://github.com/ardianmaulanaa" target="_blank" rel="noreferrer">
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/muhammad-ardian-maulana-92449b30a/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        © 2026 Muhammad Ardian Maulana. Portfolio inspired layout, modified for developer identity.
      </footer>
    </main>
  );
}