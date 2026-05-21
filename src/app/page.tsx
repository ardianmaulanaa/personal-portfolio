"use client";

import { useEffect } from "react";

const skills = [
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
  "MySQL",
  "Git & GitHub",
];

const projects = [
  {
    title: "GreenMarket",
    description:
      "Marketplace website with login, product management, cart feature, guest access, and transaction flow.",
    tech: ["Next.js", "Node.js", "MySQL"],
  },
  {
    title: "PantauLaras",
    description:
      "Disaster monitoring concept for mapping safe routes, damaged roads, volunteer locations, and aid distribution.",
    tech: ["Web App", "Maps", "Real-time"],
  },
  {
    title: "Startup Management App",
    description:
      "Golang-based data management program with login, CRUD, search, sorting, and category reports.",
    tech: ["Golang", "CLI", "Data Management"],
  },
];

export default function Home() {
  useEffect(() => {
    const elements = document.querySelectorAll(".scroll-fade, .project-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.15 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f1e3] text-[#18181b] lg:pl-[88px]">
      {/* Mobile Navbar */}
<nav className="fixed left-0 top-0 z-50 w-full border-b-4 border-[#18181b] bg-[#f7f1e3]/95 backdrop-blur-md lg:hidden">
  <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
    <a href="#home" className="text-lg font-black tracking-[0.18em]">
      ARDN<span className="text-orange-500">.</span>
    </a>

    <div className="flex items-center gap-3">
      {[
        { href: "#about", label: "About", color: "hover:bg-orange-300" },
        { href: "#focus", label: "Focus", color: "hover:bg-emerald-300" },
        { href: "#skills", label: "Skills", color: "hover:bg-yellow-300" },
        { href: "#projects", label: "Projects", color: "hover:bg-orange-400" },
        { href: "#contact", label: "Contact", color: "hover:bg-emerald-400" },
      ].map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={`flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#18181b] bg-white text-[#18181b] shadow-[3px_3px_0px_#18181b] transition duration-300 hover:-translate-y-1 ${item.color}`}
          aria-label={item.label}
        >
          {item.label === "About" && (
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          )}

          {item.label === "Focus" && (
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v4" />
              <path d="M12 18v4" />
              <path d="M2 12h4" />
              <path d="M18 12h4" />
            </svg>
          )}

          {item.label === "Skills" && (
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          )}

          {item.label === "Projects" && (
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M7 8h10" />
              <path d="M7 12h7" />
              <path d="M7 16h5" />
            </svg>
          )}

          {item.label === "Contact" && (
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16v16H4z" />
              <path d="M4 7l8 6 8-6" />
            </svg>
          )}
        </a>
      ))}
    </div>
  </div>
</nav>

{/* Desktop Sidebar Navbar */}
<aside className="fixed left-0 top-0 z-50 hidden h-screen w-[88px] border-r-4 border-[#18181b] bg-[#f7f1e3]/95 backdrop-blur-md lg:flex lg:flex-col lg:items-center">
  <a
    href="#home"
    className="flex h-28 w-full items-center justify-center border-b-4 border-[#18181b] bg-[#f7f1e3]"
    aria-label="Home"
  >
    <div className="text-center">
      <h1 className="text-sm font-black leading-tight tracking-[0.28em] text-[#18181b]">
        ARDN
      </h1>
      <p className="mt-2 text-[8px] font-black uppercase tracking-[0.32em] text-orange-500">
        DEV
      </p>
    </div>
  </a>

  <div className="flex flex-1 flex-col items-center justify-center gap-4">
    <a
      href="#about"
      className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-[#18181b] bg-white text-[#18181b] shadow-[4px_4px_0px_#18181b] transition duration-300 hover:-translate-y-1 hover:bg-orange-300"
      title="About"
      aria-label="About"
    >
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    </a>

    <a
      href="#focus"
      className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-[#18181b] bg-[#18181b] text-white shadow-[4px_4px_0px_#f97316] transition duration-300 hover:-translate-y-1 hover:bg-emerald-400 hover:text-[#18181b]"
      title="Focus"
      aria-label="Focus"
    >
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4" />
        <path d="M12 18v4" />
        <path d="M2 12h4" />
        <path d="M18 12h4" />
      </svg>
    </a>

    <a
      href="#skills"
      className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-[#18181b] bg-white text-[#18181b] shadow-[4px_4px_0px_#18181b] transition duration-300 hover:-translate-y-1 hover:bg-yellow-300"
      title="Skills"
      aria-label="Skills"
    >
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    </a>

    <a
      href="#projects"
      className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-[#18181b] bg-white text-[#18181b] shadow-[4px_4px_0px_#18181b] transition duration-300 hover:-translate-y-1 hover:bg-orange-400"
      title="Projects"
      aria-label="Projects"
    >
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M7 8h10" />
        <path d="M7 12h7" />
        <path d="M7 16h5" />
      </svg>
    </a>

    <a
      href="#contact"
      className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-[#18181b] bg-white text-[#18181b] shadow-[4px_4px_0px_#18181b] transition duration-300 hover:-translate-y-1 hover:bg-emerald-400"
      title="Contact"
      aria-label="Contact"
    >
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16v16H4z" />
        <path d="M4 7l8 6 8-6" />
      </svg>
    </a>
  </div>

  <div className="flex w-full flex-col items-center gap-4 border-t-4 border-[#18181b] bg-[#f7f1e3] py-5">
    <a
      href="#home"
      className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-[#18181b] bg-white text-[#18181b] shadow-[3px_3px_0px_#18181b] transition duration-300 hover:-translate-y-1 hover:bg-orange-400"
      title="Back to top"
      aria-label="Back to top"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M6 21v-2a6 6 0 0 1 12 0v2" />
      </svg>
    </a>

    <a
      href="#contact"
      className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-[#18181b] bg-[#18181b] text-white shadow-[3px_3px_0px_#f97316] transition duration-300 hover:-translate-y-1 hover:bg-emerald-400 hover:text-[#18181b]"
      title="Contact"
      aria-label="Contact"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5z" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.05.05a2 2 0 1 1-2.83 2.83l-.05-.05A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21a2 2 0 1 1-4 0v-.08a1.7 1.7 0 0 0-.4-1.1 1.7 1.7 0 0 0-1-.6 1.7 1.7 0 0 0-1.87.34l-.05.05a2 2 0 1 1-2.83-2.83l.05-.05A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3a2 2 0 1 1 0-4h.08a1.7 1.7 0 0 0 1.1-.4 1.7 1.7 0 0 0 .6-1 1.7 1.7 0 0 0-.34-1.87l-.05-.05a2 2 0 1 1 2.83-2.83l.05.05A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3a2 2 0 1 1 4 0v.08a1.7 1.7 0 0 0 .4 1.1 1.7 1.7 0 0 0 1 .6 1.7 1.7 0 0 0 1.87-.34l.05-.05a2 2 0 1 1 2.83 2.83l-.05.05A1.7 1.7 0 0 0 19.4 9c.17.38.4.72.6 1a1.7 1.7 0 0 0 1.1.4H21a2 2 0 1 1 0 4h-.08a1.7 1.7 0 0 0-1.1.4 1.7 1.7 0 0 0-.42.2z" />
      </svg>
    </a>
  </div>
</aside>

      <section
        id="home"
        className="animate-stripe relative mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-6 pt-28 md:grid-cols-[1.2fr_0.8fr]"
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="animate-bob absolute -left-24 top-28 h-72 w-72 rounded-full bg-orange-400/30 blur-3xl" />
          <div className="animate-wiggle absolute right-0 top-96 h-80 w-80 rounded-full bg-emerald-300/30 blur-3xl" />
        </div>

        <div>
          <div className="mb-6 inline-block rotate-[-2deg] border-4 border-[#18181b] bg-emerald-400 px-5 py-2 font-black shadow-[6px_6px_0px_#18181b]">
            Backend Developer • Web Developer
          </div>

          <h2 className="mb-6 max-w-4xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
            Hi, I&apos;m{" "}
            <span className="text-orange-500">Muhammad Ardian Maulana</span>
          </h2>

          <p className="mb-8 max-w-2xl text-lg font-medium leading-relaxed text-zinc-700">
            Informatics student focused on building useful digital products,
            backend systems, web applications, cybersecurity, and artificial
            intelligence.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="#projects"
              className="border-4 border-[#18181b] bg-orange-500 px-7 py-4 text-center font-black text-white shadow-[6px_6px_0px_#18181b] transition duration-300 hover:translate-x-1 hover:translate-y-1 hover:scale-105 hover:shadow-[2px_2px_0px_#18181b] active:scale-95"
            >
              View Projects
            </a>

            <a
              href="#contact"
              className="border-4 border-[#18181b] bg-white px-7 py-4 text-center font-black shadow-[6px_6px_0px_#18181b] transition duration-300 hover:translate-x-1 hover:translate-y-1 hover:scale-105 hover:shadow-[2px_2px_0px_#18181b] active:scale-95"
            >
              Contact Me
            </a>
          </div>
        </div>

        <div id="focus" className="relative scroll-mt-28">
  <div className="relative min-h-[500px] isolate">
    {/* Background blur yang lebih luas dan halus */}
    <div className="pointer-events-none absolute -inset-24 -z-10 overflow-visible">
      <div className="absolute left-[-70px] top-[-40px] h-[360px] w-[360px] rounded-full bg-orange-300/45 blur-[90px]" />

      <div className="absolute right-[-80px] top-[40px] h-[390px] w-[390px] rounded-full bg-emerald-300/45 blur-[95px]" />

      <div className="absolute bottom-[-80px] left-[80px] h-[340px] w-[340px] rounded-full bg-yellow-300/40 blur-[90px]" />

      <div className="absolute bottom-[40px] right-[70px] h-[300px] w-[300px] rounded-full bg-lime-300/35 blur-[85px]" />

      <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/45 blur-[110px]" />

      <div className="absolute left-[20px] top-[80px] h-[420px] w-[420px] rotate-12 bg-orange-200/25 blur-[100px] [clip-path:polygon(18%_0,100%_18%,82%_100%,0_78%)]" />

      <div className="absolute right-[10px] bottom-[20px] h-[430px] w-[430px] -rotate-12 bg-emerald-200/30 blur-[100px] [clip-path:polygon(0_20%,80%_0,100%_78%,22%_100%)]" />
    </div>

    <div className="relative flex min-h-[470px] flex-col justify-center gap-5">
      <div className="focus-panel-main relative z-10 max-w-[540px] border-4 border-[#18181b] bg-[#101014] p-1 shadow-[10px_10px_0px_#f97316] transition duration-300 hover:-translate-y-2 hover:shadow-[14px_14px_0px_#f97316]">
        <div className="focus-panel-main bg-[#101014] px-9 py-8 text-white">
          <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-orange-400">
            Currently Learning
          </p>

          <h3 className="text-4xl font-black leading-tight md:text-5xl">
            Next.js + Tailwind CSS
          </h3>

          <p className="mt-4 max-w-md text-sm font-medium leading-relaxed text-zinc-300">
            Building responsive layouts, clean interfaces, and modern web
            experiences.
          </p>
        </div>
      </div>

      <div className="focus-panel-left relative z-10 ml-6 max-w-[440px] border-4 border-[#18181b] bg-orange-200 shadow-[8px_8px_0px_#18181b] transition duration-300 hover:-translate-y-2 hover:bg-orange-300">
        <div className="px-8 py-6">
          <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-zinc-500">
            Main Interest
          </p>

          <p className="text-2xl font-black leading-tight">
            Backend, Cybersecurity, AI
          </p>
        </div>
      </div>

      <div className="focus-panel-right relative z-10 ml-20 max-w-[410px] border-4 border-[#18181b] bg-emerald-200 shadow-[8px_8px_0px_#18181b] transition duration-300 hover:-translate-y-2 hover:bg-emerald-300">
        <div className="px-8 py-6">
          <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-zinc-500">
            Status
          </p>

          <p className="text-2xl font-black leading-tight">
            Informatics Student
          </p>
        </div>
      </div>

      <div className="relative z-10 ml-4 flex flex-wrap gap-3 pt-2">
        <span className="border-4 border-[#18181b] bg-white px-5 py-3 font-black shadow-[5px_5px_0px_#18181b] transition duration-300 hover:-translate-y-1 [clip-path:polygon(0_0,90%_0,100%_35%,100%_100%,10%_100%,0_65%)]">
          Web Dev
        </span>

        <span className="border-4 border-[#18181b] bg-yellow-300 px-5 py-3 font-black shadow-[5px_5px_0px_#18181b] transition duration-300 hover:-translate-y-1 [clip-path:polygon(10%_0,100%_0,100%_70%,90%_100%,0_100%,0_30%)]">
          Focus Mode
        </span>
      </div>
    </div>
  </div>
</div>
      </section>

      <section id="about" className="bg-[#ffd7a8] px-6 py-24 scroll-mt-24">
        <div className="scroll-fade mx-auto max-w-6xl">
          <div className="mb-6 inline-block border-4 border-[#18181b] bg-orange-500 px-4 py-2 font-black text-white shadow-[5px_5px_0px_#18181b] transition duration-300 hover:rotate-2 hover:scale-105">
            About
          </div>

          <h2 className="mb-6 text-4xl font-black md:text-5xl">About Me</h2>

          <p className="max-w-3xl text-lg font-medium leading-relaxed text-zinc-800">
            I am an Informatics student who enjoys learning technology through
            real projects. I like building applications, understanding backend
            logic, solving coding problems, and exploring cybersecurity and AI.
          </p>
        </div>
      </section>

     <section
  id="skills"
  className="bg-[#b7f7c6] px-6 py-24 scroll-mt-24"
>
  <div className="scroll-fade mx-auto max-w-6xl">
    <div className="mb-6 inline-block border-4 border-[#18181b] bg-emerald-400 px-4 py-2 font-black shadow-[5px_5px_0px_#18181b] transition duration-300 hover:-rotate-2 hover:scale-105">
      Skills
    </div>

    <h2 className="mb-10 text-4xl font-black md:text-5xl">
      Tech Stack & Skills
    </h2>
  </div>

  <div className="relative w-full overflow-x-hidden overflow-y-visible px-2 py-8">
    <div className="animate-marquee-left flex w-max gap-5">
      {[...skills, ...skills].map((skill, index) => (
        <div
          key={`${skill}-${index}`}
          className={`min-w-[260px] border-4 border-[#18181b] p-5 text-center font-black shadow-[6px_6px_0px_#18181b] transition duration-300 hover:-translate-y-3 hover:rotate-2 hover:scale-105 hover:shadow-[12px_12px_0px_#18181b] ${
            index % 3 === 0
              ? "bg-orange-300"
              : index % 3 === 1
                ? "bg-emerald-300"
                : "bg-white"
          }`}
        >
          {skill}
        </div>
      ))}
    </div>
  </div>
</section>

     <section id="projects" className="bg-[#f7f1e3] px-6 py-24 scroll-mt-24">
  <div className="scroll-fade mx-auto max-w-6xl">
    <div className="mb-6 inline-block border-b-4 border-orange-500 px-1 pb-2 font-black text-orange-600">
      Projects
    </div>

    <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <h2 className="max-w-2xl text-4xl font-black leading-tight md:text-5xl">
        Featured Projects
      </h2>

      <p className="max-w-md text-base font-medium leading-relaxed text-zinc-600">
        Some projects that I built while learning backend, web development,
        and problem solving through real applications.
      </p>
    </div>

    <div className="space-y-6">
      {projects.map((project, index) => (
        <article
          key={project.title}
          className="project-card group border-b-2 border-zinc-300 py-8 transition duration-300 hover:border-orange-500"
        >
          <div className="grid gap-6 md:grid-cols-[90px_1fr_260px] md:items-start">
            <p className="text-4xl font-black text-zinc-300 transition duration-300 group-hover:text-orange-500">
              0{index + 1}
            </p>

            <div>
              <h3 className="mb-3 text-3xl font-black tracking-tight transition duration-300 group-hover:text-orange-600">
                {project.title}
              </h3>

              <p className="max-w-2xl text-base font-medium leading-relaxed text-zinc-700">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 md:justify-end">
              {project.tech.map((item) => (
                <span
                  key={item}
                  className="rounded-full border-2 border-zinc-300 bg-white px-4 py-2 text-sm font-black text-zinc-700 transition duration-300 group-hover:border-orange-500 group-hover:bg-orange-50 group-hover:text-orange-600"
                >
                  {item}
                </span>
              ))}

              <a
                href="#"
                className="mt-3 w-full font-black text-orange-600 transition duration-300 group-hover:tracking-wide md:text-right"
              >
                View Detail →
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  </div>
</section>

      <section id="contact" className="bg-[#18181b] px-6 py-24 text-white scroll-mt-24">
        <div className="mx-auto max-w-6xl">
          <div className="scroll-fade border-4 border-white bg-[#18181b] p-8 shadow-[10px_10px_0px_#f97316] transition duration-300 hover:shadow-[16px_16px_0px_#f97316] md:p-12">
            <div className="mb-6 inline-block border-4 border-white bg-emerald-400 px-4 py-2 font-black text-[#18181b] transition duration-300 hover:rotate-2">
              Contact
            </div>

            <h2 className="mb-4 text-4xl font-black md:text-5xl">
              Let&apos;s Build Something
            </h2>

            <p className="mb-8 max-w-2xl text-zinc-300">
              Interested to collaborate, discuss a project, or connect with me?
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="mailto:ardianmaulana92251@gmail.com"
                className="border-4 border-white bg-orange-500 px-6 py-3 text-center font-black text-white transition duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-orange-400 active:scale-95"
              >
                Email Me
              </a>

              <a
                href="https://github.com/ardianmaulanaa"
                target="_blank"
                className="border-4 border-white bg-white px-6 py-3 text-center font-black text-[#18181b] transition duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-emerald-300 active:scale-95"
              >
                GitHub
              </a>

              <a
                href="#"
                className="border-4 border-white px-6 py-3 text-center font-black text-white transition duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-white hover:text-[#18181b] active:scale-95"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t-4 border-[#18181b] bg-[#f7f1e3] py-8 text-center text-sm font-bold text-zinc-600">
        © 2026 Muhammad Ardian Maulana. All rights reserved.
      </footer>
    </main>
  );
}