"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { MouseEvent as ReactMouseEvent } from "react";

import {
  Home,
  Workflow,
  BriefcaseBusiness,
  UserRound,
  Code2,
  BarChart3,
  GraduationCap,
  Mail,
  LayoutGrid,
  Sparkles,
} from "lucide-react";

interface ApproachItem {
  value: number;
  label: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}

interface ExperienceItem {
  place: string;
  role: string;
  date: string;
  text: string;
  images?: string[];
  imageAlt?: string;
}

interface CertificateItem {
  title: string;
  image: string;
  imageAlt: string;
  label: string;
}

interface NavItem {
  href: string;
  label: string;
}

type ProjectCategory = "All" | "FullStack" | "DevOps" | "AI" | "System-Analyst";

interface ProjectItem {
  title: string;
  category: Exclude<ProjectCategory, "All">;
  label: string;
  image: string;
  href: string;
  size: "large" | "small";
}

const PROJECTS: ProjectItem[] = [
  {
    title: "GreenMarket",
    category: "FullStack",
    label: "MARKETPLACE",
    image: "/img/greenmarket/1.png",
    href: "/projects/greenmarket",
    size: "large",
  },
  {
    title: "E Tilang - Detect Wrong Way",
    category: "AI",
    label: "COMPUTER VISION",
    image: "/img/multimedia/4.JPG",
    href: "/projects/E-tilang",
    size: "small",
  },
];

const PROJECT_CATEGORIES: ProjectCategory[] = [
  "All",
  "FullStack",
  "DevOps",
  "AI",
  "System-Analyst",
];

const SKILLS: string[] = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Express.js",
  "Golang",
  "Python",
  "Java",
  "Java Servlet",
  "C++",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Prisma",
  "REST API",
  "CRUD Flow",
  "GitHub",
];

const APPROACH: ApproachItem[] = [
  {
    value: 3.68,
    label: "GPA",
    decimals: 2,
    duration: 1600,
  },
  {
    value: 5,
    label: "Projects",
    suffix: "+",
    duration: 1300,
  },
  {
    value: 1,
    label: "Years",
    suffix: "+",
    duration: 900,
  },
  {
    value: 20,
    label: "Experiences",
    suffix: "+",
    duration: 1800,
  },
];

const SERVICES: Array<[string, string]> = [
  [
    "Frontend Development",
    "Responsive landing page, dashboard, portfolio, and admin interface.",
  ],
  [
    "Backend Development",
    "API logic, CRUD flow, authentication concept, and database integration.",
  ],
  [
    "Project Refactoring",
    "Cleaning structure, splitting components, and improving code readability.",
  ],
  [
    "UI Enhancement",
    "Modern layout, section animation, color balance, and mobile responsive design.",
  ],
  [
    "Database Flow",
    "Designing table relations, query logic, backup concept, and report structure.",
  ],
  [
    "Learning Lab",
    "Documenting progress, practical notes, and simple experiments for campus tasks.",
  ],
];

const CERTIFICATES: CertificateItem[] = [
  {
    title: "Web Development Project-Based Learning",
    image: "/img/certificates/1.jpg",
    imageAlt: "Web development certificate",
    label: "WEB DEVELOPMENT",
  },
  {
    title: "Computer Vision Exploration",
    image: "/img/certificates/3.png",
    imageAlt: "Computer vision certificate",
    label: "COMPUTER VISION",
  },
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
    images: ["/img/ASE/1.jpeg", "/img/ASE/2.jpg", "/img/ASE/3.png"],
    imageAlt: "Multimedia Laboratory activity",
  },
  {
    place: "Multimedia Laboratory",
    role: "Programming Division",
    date: "Nov 2024 - Dec 2025",
    text: "Learning and exploring machine learning, Roboflow, data processing, and practical technology implementation through laboratory activities.",
    images: [
      "/img/multimedia/1.JPG",
      "/img/multimedia/2.jpeg",
      "/img/multimedia/3.jpeg",
    ],
    imageAlt: "Multimedia Laboratory activity",
  },
  {
    place: "Informatics Student Association",
    role: "Publication and Documentation Staff",
    date: "Nov 2024 - Feb 2025",
    text: "Contributed to publication and documentation activities, including event documentation, photography, content preparation, and supporting organizational media needs.",
    images: ["/img/PPUH/1.jpeg"],
    imageAlt: "Multimedia Laboratory activity",
  },
];

const NAV_ITEMS: NavItem[] = [
  { href: "#home", label: "Home" },
  { href: "#approach", label: "Approach" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#about", label: "About" },
  { href: "#certificates", label: "Certificates" },
  { href: "#services", label: "Services" },
  { href: "#stats", label: "Stats" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

const MOBILE_MENU_ITEMS: NavItem[] = [
  { href: "#home", label: "Home" },
  { href: "#approach", label: "Main Focus" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#about", label: "About" },
  { href: "#certificates", label: "Certificates" },
  { href: "#services", label: "Services" },
  { href: "#stats", label: "Stats" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

function SplitText({ text }: { text: string }) {
  const words = text.split(" ");

  return (
    <span className="split-text" aria-label={text}>
      {words.map((word, wordIndex) => {
        const previousLength = words
          .slice(0, wordIndex)
          .reduce((total, currentWord) => total + currentWord.length, 0);

        return (
          <span key={`${word}-${wordIndex}`} className="split-word">
            {word.split("").map((char, charIndex) => {
              const currentIndex = previousLength + charIndex;

              return (
                <span
                  key={`${char}-${wordIndex}-${charIndex}`}
                  className="split-char"
                  style={{ animationDelay: `${currentIndex * 0.045}s` }}
                >
                  {char}
                </span>
              );
            })}
          </span>
        );
      })}
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

function AnimatedBackground({ isReady }: { isReady: boolean }) {
  return (
    <div
      className={`portfolio-opening-bg site-background pointer-events-none absolute inset-0 z-0 overflow-hidden ${
        isReady ? "is-ready" : ""
      }`}
      aria-hidden="true"
    >
      <div className="site-background-base" />
      <div className="site-background-tones" />
      <div className="site-background-diagonal" />
      <div className="site-background-grid" />
      <div className="site-background-glow site-background-glow-hero" />
      <div className="site-background-glow site-background-glow-projects" />
      <div className="site-background-glow site-background-glow-contact" />
      <div className="noise-layer site-background-noise" />
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
  if (label === "Certificates") return <GraduationCap {...iconProps} />;
  if (label === "Services") return <Code2 {...iconProps} />;
  if (label === "Stats") return <BarChart3 {...iconProps} />;
  if (label === "Experience") return <GraduationCap {...iconProps} />;
  return <Mail {...iconProps} />;
}

function CustomCursor() {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const hoverTargets = document.querySelectorAll("a, button, .nav-dots");

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener("mousemove", moveCursor);

    hoverTargets.forEach((target) => {
      target.addEventListener("mouseenter", handleMouseEnter);
      target.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);

      hoverTargets.forEach((target) => {
        target.removeEventListener("mouseenter", handleMouseEnter);
        target.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        className="cursor-dot"
        style={{
          left: position ? `${position.x}px` : "-999px",
          top: position ? `${position.y}px` : "-999px",
        }}
      />

      <div
        className={`cursor-circle ${isHovering ? "is-hovering" : ""}`}
        style={{
          left: position ? `${position.x}px` : "-999px",
          top: position ? `${position.y}px` : "-999px",
        }}
      />
    </>
  );
}

function CountUp({
  target,
  duration = 1500,
  decimals = 0,
  suffix = "",
}: {
  target: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.4,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (startTime === null) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;

      const progress = Math.min(elapsed / duration, 1);

      const easeOut = 1 - Math.pow(1 - progress, 3);

      const currentValue = target * easeOut;

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, target, duration]);

  return (
    <strong ref={ref}>
      {count.toFixed(decimals)}
      {suffix}
    </strong>
  );
}

function ProjectCategoryIcon({ category }: { category: ProjectCategory }) {
  const props = {
    size: 19,
    strokeWidth: 2,
  };

  if (category === "All") {
    return <LayoutGrid {...props} />;
  }

  if (category === "FullStack") {
    return <Code2 {...props} />;
  }

  if (category === "DevOps") {
    return <Workflow {...props} />;
  }

  if (category === "AI") {
    return <Sparkles {...props} />;
  }

  if (category === "System-Analyst") {
    return <BarChart3 {...props} />;
  }

  return <LayoutGrid {...props} />;
}

interface AllProjectsHorizontalProps {
  projects: ProjectItem[];
  openingProjectHref: string | null;
  onProjectOpen: (
    href: string,
  ) => (event: ReactMouseEvent<HTMLAnchorElement>) => void;
}

function AllProjectsHorizontal({
  projects,
  openingProjectHref,
  onProjectOpen,
}: AllProjectsHorizontalProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  const [layout, setLayout] = useState({
    itemWidth: 620,
    gap: 32,
    sidePadding: 24,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [canPin, setCanPin] = useState(projects.length > 1);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, projects.length);
  }, [projects.length]);

  useEffect(() => {
    const updateLayout = () => {
      const availableWidth =
        stickyRef.current?.clientWidth ?? window.innerWidth;

      const isMobile = availableWidth <= 700;
      const itemWidth = isMobile
        ? Math.max(250, availableWidth - 44)
        : Math.min(720, availableWidth * 0.64);
      const gap = isMobile ? 18 : 32;
      const sidePadding = Math.max(22, (availableWidth - itemWidth) / 2);

      setLayout({ itemWidth, gap, sidePadding });
    };

    updateLayout();

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updateLayout)
        : null;

    if (stickyRef.current && resizeObserver) {
      resizeObserver.observe(stickyRef.current);
    }

    window.addEventListener("resize", updateLayout);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateLayout);
    };
  }, []);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;

    if (!container || !sticky || !track) return;

    let isCancelled = false;
    let cleanup = () => {};

    const setup = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (isCancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

      const buildMetrics = () => {
        const maxX = Math.max(0, track.scrollWidth - sticky.clientWidth);
        const cards = cardRefs.current.filter(Boolean) as HTMLAnchorElement[];
        const snapOffsets = cards.map((card) => {
          const cardCenter = card.offsetLeft + card.offsetWidth / 2;
          const viewportCenter = sticky.clientWidth / 2;

          return Math.min(Math.max(cardCenter - viewportCenter, 0), maxX);
        });

        const uniqueSnapOffsets = Array.from(
          new Set(snapOffsets.map((offset) => Math.round(offset))),
        );

        return {
          maxX,
          snapPoints:
            maxX > 0
              ? uniqueSnapOffsets.map((offset) => offset / maxX)
              : [0],
          snapOffsets: uniqueSnapOffsets,
        };
      };

      const updateActiveProject = (xOffset: number) => {
        const cards = cardRefs.current.filter(Boolean) as HTMLAnchorElement[];

        if (!cards.length) {
          setActiveIndex(0);
          return;
        }

        const viewportCenter = sticky.clientWidth / 2;
        const closestIndex = cards.reduce((closest, card, index) => {
          const cardCenter = card.offsetLeft - xOffset + card.offsetWidth / 2;
          const distance = Math.abs(cardCenter - viewportCenter);

          return distance < closest.distance ? { index, distance } : closest;
        }, { index: 0, distance: Number.POSITIVE_INFINITY }).index;

        setActiveIndex(closestIndex);
      };

      const refreshState = () => {
        const { maxX } = buildMetrics();
        const shouldPin = projects.length > 1 && maxX > 8 && !mediaQuery.matches;

        setCanPin(shouldPin);

        if (!shouldPin) {
          gsap.set(track, { clearProps: "transform" });
          setProgress(0);
          setActiveIndex(0);
        }
      };

      refreshState();

      const initialMetrics = buildMetrics();
      const shouldPin =
        projects.length > 1 && initialMetrics.maxX > 8 && !mediaQuery.matches;

      if (!shouldPin) return;

      const scrollTween = gsap.to(track, {
        x: () => -buildMetrics().maxX,
        ease: "none",
        scrollTrigger: {
          id: "portfolio-horizontal-scroll",
          trigger: container,
          pin: sticky,
          scrub: 0.55,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          start: () => {
            const navHeight = window.innerWidth < 1024 ? 76 : 0;
            return `top top+=${navHeight}`;
          },
          end: () => {
            const { maxX } = buildMetrics();
            return `+=${Math.max(maxX + window.innerHeight * 0.5, window.innerHeight * 0.9)}`;
          },
          snap: {
            snapTo: (value) => {
              const { snapPoints, maxX } = buildMetrics();

              if (maxX <= 8 || snapPoints.length <= 1) return value;

              return snapPoints.reduce((closest, point) =>
                Math.abs(point - value) < Math.abs(closest - value)
                  ? point
                  : closest,
              );
            },
            duration: { min: 0.16, max: 0.42 },
            delay: 0.08,
            ease: "power2.out",
          },
          onRefresh: refreshState,
          onUpdate: (self) => {
            const { maxX } = buildMetrics();
            const xOffset = self.progress * maxX;

            setProgress(self.progress);
            updateActiveProject(xOffset);
          },
        },
      });

      const refreshAfterAssets = () => ScrollTrigger.refresh();
      const handleMotionChange = () => ScrollTrigger.refresh();
      const handleLenisScroll = () => ScrollTrigger.update();

      window.addEventListener("load", refreshAfterAssets, { once: true });
      window.addEventListener("lenis-scroll", handleLenisScroll);
      mediaQuery.addEventListener("change", handleMotionChange);

      const resizeObserver =
        typeof ResizeObserver !== "undefined"
          ? new ResizeObserver(() => ScrollTrigger.refresh())
          : null;

      resizeObserver?.observe(sticky);
      resizeObserver?.observe(track);

      ScrollTrigger.refresh();

      cleanup = () => {
        window.removeEventListener("load", refreshAfterAssets);
        window.removeEventListener("lenis-scroll", handleLenisScroll);
        mediaQuery.removeEventListener("change", handleMotionChange);
        resizeObserver?.disconnect();
        scrollTween.scrollTrigger?.kill();
        scrollTween.kill();
        gsap.set(track, { clearProps: "transform" });
      };
    };

    setup();

    return () => {
      isCancelled = true;
      cleanup();
    };
  }, [layout.gap, layout.itemWidth, layout.sidePadding, projects]);

  const projectCountLabel = String(projects.length).padStart(2, "0");
  const activeProjectLabel = String(activeIndex + 1).padStart(2, "0");

  return (
    <div
      ref={containerRef}
      className={`portfolio-horizontal-scroll ${canPin ? "is-pinned-scroll" : "is-native-scroll"}`}
    >
      <div ref={stickyRef} className="portfolio-horizontal-sticky">
        <div className="portfolio-horizontal-copy" aria-hidden="true">
          <span>{projectCountLabel} PROJECTS</span>
          <span className="portfolio-horizontal-hint">
            {canPin ? "Scroll to explore projects" : "Swipe projects"}
          </span>
        </div>

        <div
          ref={trackRef}
          className="portfolio-horizontal-track"
          style={{
            gap: layout.gap,
            paddingLeft: layout.sidePadding,
            paddingRight: layout.sidePadding,
          }}
        >
          {projects.map((project, index) => (
            <a
              key={project.href}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              href={project.href}
              className={`portfolio-card-work portfolio-horizontal-card ${
                openingProjectHref === project.href ? "is-opening" : ""
              } ${activeIndex === index ? "is-active" : ""}`}
              style={{ width: layout.itemWidth }}
              aria-label={`Open ${project.title} project`}
              onClick={onProjectOpen(project.href)}
            >
              <div className="portfolio-horizontal-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="portfolio-image horizontal">
                <Image
                  src={project.image}
                  alt={`${project.title} preview`}
                  width={1200}
                  height={760}
                />
              </div>

              <div className="portfolio-work-meta">
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.label}</p>
                </div>

                <span className="portfolio-category-chip">
                  {project.category === "System-Analyst"
                    ? "System Analyst"
                    : project.category}
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="portfolio-horizontal-progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress})` }} />
          <strong>
            {activeProjectLabel} / {projectCountLabel}
          </strong>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();

  const duplicatedSkills = useMemo(() => [...SKILLS, ...SKILLS], []);

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const [activeExperienceImage, setActiveExperienceImage] = useState(0);

  const [pageReady] = useState(true);

  const [activeProjectCategory, setActiveProjectCategory] =
    useState<ProjectCategory>("All");

  const [openingProjectHref, setOpeningProjectHref] = useState<string | null>(
    null,
  );

  const filteredProjects = useMemo(() => {
    if (activeProjectCategory === "All") {
      return PROJECTS;
    }

    return PROJECTS.filter(
      (project) => project.category === activeProjectCategory,
    );
  }, [activeProjectCategory]);

  const handleProjectOpen = useCallback(
    (href: string) => (event: ReactMouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();

      if (openingProjectHref) return;

      setOpeningProjectHref(href);

      window.setTimeout(() => {
        router.push(href);
      }, 620);
    },
    [openingProjectHref, router],
  );

  useLayoutEffect(() => {
    if (!pageReady) return;

    const hero = document.querySelector<HTMLElement>(".hero-section");
    const glow = document.querySelector<HTMLElement>(".hero-ambient-glow");
    const background = document.querySelector<HTMLElement>(".portfolio-opening-bg");
    const sideNavItems = document.querySelectorAll<HTMLElement>(
      ".side-nav a, .side-contact",
    );

    if (!hero) return;

    let isCancelled = false;
    let cleanup = () => {};

    const setupHeroMotion = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (isCancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );
      const canHover = window.matchMedia(
        "(hover: hover) and (pointer: fine)",
      ).matches;
      const ctx = gsap.context(() => {
        const nameLines = gsap.utils.toArray<HTMLElement>(".hero-name-line");
        const secondaryItems = gsap.utils.toArray<HTMLElement>(
          ".hero-location, .hero-topline, .hero-bottom",
        );
        const profile = document.querySelector<HTMLElement>(".hero-profile");
        const profileRing = document.querySelector<HTMLElement>(".profile-ring");
        const profileCards =
          gsap.utils.toArray<HTMLElement>(".hero-profile .profile-card");

        if (reduceMotion.matches) {
          gsap.set(
            [
              background,
              glow,
              sideNavItems,
              nameLines,
              secondaryItems,
              profile,
              profileCards,
              profileRing,
            ],
            { clearProps: "all" },
          );
          gsap.set([nameLines, secondaryItems, profile, profileCards], {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "none",
          });
          gsap.set(profileRing, { "--orbit-opacity": 0.55 });
          return;
        }

        gsap.set(glow, { opacity: 0, x: 0, y: 0 });
        gsap.set(sideNavItems, { opacity: 0, x: -12 });
        gsap.set(nameLines, { opacity: 0, y: 56 });
        gsap.set(secondaryItems, { opacity: 0, y: 14 });
        gsap.set(profile, {
          opacity: 0,
          scale: 0.92,
          y: 18,
          filter: "blur(10px)",
          clipPath: "circle(34% at 50% 50%)",
        });
        gsap.set(profileRing, { "--orbit-opacity": 0 });
        gsap.set(profileCards, { opacity: 0, y: 16, scale: 0.96 });

        const intro = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => {
            gsap.set([nameLines, secondaryItems, profile, profileCards], {
              clearProps: "willChange",
            });
          },
        });

        intro
          .to(background, { opacity: 1, scale: 1, duration: 0.55 }, 0)
          .to(glow, { opacity: 1, duration: 0.55, ease: "power2.out" }, 0.05)
          .to(
            sideNavItems,
            { opacity: 1, x: 0, duration: 0.44, stagger: 0.055 },
            0.15,
          )
          .to(
            nameLines,
            { opacity: 1, y: 0, duration: 0.86, stagger: 0.16 },
            0.3,
          )
          .to(
            profile,
            {
              opacity: 1,
              scale: 1,
              y: 0,
              filter: "blur(0px)",
              clipPath: "circle(76% at 50% 50%)",
              duration: 0.82,
            },
            0.65,
          )
          .to(
            profileRing,
            { "--orbit-opacity": 0.62, duration: 0.7, ease: "power2.out" },
            0.85,
          )
          .to(
            profileCards,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.62,
              stagger: 0.12,
              ease: "power2.out",
            },
            1,
          )
          .to(
            secondaryItems,
            { opacity: 1, y: 0, duration: 0.58, stagger: 0.08 },
            1.1,
          );

        if (canHover && glow) {
          const moveGlowX = gsap.quickTo(glow, "x", {
            duration: 0.8,
            ease: "power3.out",
          });
          const moveGlowY = gsap.quickTo(glow, "y", {
            duration: 0.8,
            ease: "power3.out",
          });

          const handlePointerMove = (event: PointerEvent) => {
            const rect = hero.getBoundingClientRect();
            const normalizedX =
              (event.clientX - rect.left) / rect.width - 0.5;
            const normalizedY =
              (event.clientY - rect.top) / rect.height - 0.5;

            moveGlowX(normalizedX * 76);
            moveGlowY(normalizedY * 62);
          };
          const handlePointerLeave = () => {
            moveGlowX(0);
            moveGlowY(0);
          };

          hero.addEventListener("pointermove", handlePointerMove);
          hero.addEventListener("pointerleave", handlePointerLeave);

          cleanup = () => {
            hero.removeEventListener("pointermove", handlePointerMove);
            hero.removeEventListener("pointerleave", handlePointerLeave);
          };
        }

        if (window.innerWidth >= 768) {
          gsap.to(".profile-card-one", {
            y: -3,
            duration: 4.6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
          gsap.to(".profile-card-two", {
            y: 4,
            duration: 5.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 0.45,
          });
        }

        const exitTimeline = gsap.timeline({
          scrollTrigger: {
            id: "hero-scroll-exit",
            trigger: hero,
            start: "top top",
            end: () => `+=${Math.min(hero.offsetHeight * 0.72, 680)}`,
            scrub: 0.65,
            invalidateOnRefresh: true,
          },
        });

        exitTimeline
          .to(
            ".hero-copy-reveal",
            { y: () => (window.innerWidth < 768 ? -28 : -62), opacity: 0.55, ease: "none" },
            0,
          )
          .to(
            ".hero-profile",
            { y: () => (window.innerWidth < 768 ? 18 : 44), opacity: 0.78, ease: "none" },
            0,
          )
          .to(
            ".hero-topline, .hero-bottom",
            { y: -20, opacity: 0.2, ease: "none" },
            0,
          )
          .to(glow, { y: -24, opacity: 0.56, ease: "none" }, 0);

        const handleLenisScroll = () => ScrollTrigger.update();

        window.addEventListener("lenis-scroll", handleLenisScroll);

        const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 80);

        cleanup = ((previousCleanup) => () => {
          previousCleanup();
          window.clearTimeout(refreshTimer);
          window.removeEventListener("lenis-scroll", handleLenisScroll);
        })(cleanup);
      }, hero);

      const previousCleanup = cleanup;
      cleanup = () => {
        previousCleanup();
        ctx.revert();
      };
    };

    setupHeroMotion();

    return () => {
      isCancelled = true;
      cleanup();
    };
  }, [pageReady]);

  useEffect(() => {
    if (!pageReady) return;

    const sections = NAV_ITEMS.map((item) =>
      document.querySelector<HTMLElement>(item.href),
    ).filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-38% 0px -48% 0px",
        threshold: [0.08, 0.18, 0.32, 0.48],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [pageReady]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveExperienceImage((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!pageReady) return;

    const targets = document.querySelectorAll(
      ".scroll-fade, .approach-stat-card, .project-row, .service-row, .education-card, .certificate-card, .experience-row, .stat-card",
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    targets.forEach((target) => observer.observe(target));

    return () => {
      observer.disconnect();
    };
  }, [pageReady, activeProjectCategory]);

  return (
    <main
      className={`portfolio-page relative min-h-screen bg-[#0d0d0f] text-[#f7f1e3] lg:pl-[96px] ${
        pageReady ? "portfolio-page-ready has-custom-cursor" : ""
      }`}
    >
      {pageReady ? <CustomCursor /> : null}
      <AnimatedBackground isReady={pageReady} />
      <div
        className={`project-transition-overlay ${
          openingProjectHref ? "is-active" : ""
        }`}
        aria-hidden="true"
      />

      <aside className={`side-nav intro-nav ${pageReady ? "is-ready" : ""}`}>
        <a
          href="#home"
          className={`side-logo ${activeSection === "home" ? "is-active" : ""}`}
          aria-label="Home"
        >
          <span>ARDN</span>
          <small>DEV</small>
        </a>

        <div className="side-links">
          {NAV_ITEMS.slice(1, 8).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={
                activeSection === item.href.slice(1) ? "is-active" : undefined
              }
              title={item.label}
              aria-label={item.label}
            >
              <SideIcon label={item.label} />
              <span className="side-tooltip">{item.label}</span>
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className={`side-contact ${
            activeSection === "contact" ? "is-active" : ""
          }`}
          aria-label="Contact"
        >
          <Mail size={18} strokeWidth={2.4} />
          <span className="side-tooltip">Contact</span>
        </a>
      </aside>

      <nav className={`mobile-nav intro-nav ${pageReady ? "is-ready" : ""}`}>
        <a href="#home" className="font-black tracking-[0.25em]">
          ARDN<span className="text-orange-500">.</span>
        </a>

        <button
          type="button"
          className={`nav-dots ${menuOpen ? "is-active" : ""}`}
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <a
          href="#contact"
          className="rounded-full border border-white/20 px-4 py-2 text-xs font-black uppercase tracking-[0.2em]"
        >
          Contact
        </a>
      </nav>

      <div className={`fullscreen-menu ${menuOpen ? "is-open" : ""}`}>
        <div className="fullscreen-menu-top">
          <span>LOCAL / INDONESIA</span>
          <span>PORTFOLIO MENU</span>
        </div>

        <div className="fullscreen-menu-links">
          {MOBILE_MENU_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="fullscreen-menu-bottom">
          <span>MUHAMMAD ARDIAN MAULANA</span>
          <span>WEB • AI • CYBER</span>
        </div>
      </div>

      <div
        className={`portfolio-content-reveal ${pageReady ? "is-ready" : ""}`}
      >
        <section id="home" className="hero-section">
          <div className="hero-ambient-glow" aria-hidden="true" />

          <div className="hero-topline scroll-fade">
            <div>
              <span>DEV /</span>
              <span>PORTFOLIO</span>
            </div>

            <a href="#contact">Contact Now</a>
          </div>

          <div className="hero-grid">
            <div className="hero-copy-reveal">
              <p className="hero-location">
                Based in Indonesia • Available Worldwide
              </p>
              <h1 className="hero-title">
                <span className="hero-name-mask">
                  <span className="hero-name-line hero-name-1">Muhammad</span>
                </span>

                <span className="hero-name-mask">
                  <span className="hero-name-line hero-name-2 hero-name-orange">
                    Ardian
                  </span>
                </span>

                <span className="hero-name-mask">
                  <span className="hero-name-line hero-name-3">Maulana</span>
                </span>
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
                <b>FullStack • DevOps • AI • Cyber</b>
              </div>
            </div>
          </div>

          <div className="hero-bottom scroll-fade">
            <div className="hero-role">
              <span>Web Developer</span>
            </div>
          </div>
        </section>

        <section id="approach" className="section-block bg-cream text-dark">
          <div className="main-focus-title">
            <SectionTitle number="01" title="Quick Facts" side="2026" />
          </div>

          <div className="approach-stats-grid">
            {APPROACH.map((item) => (
              <article key={item.label} className="approach-stat-card">
                <CountUp
                  target={item.value}
                  duration={item.duration}
                  decimals={item.decimals}
                  suffix={item.suffix}
                />

                <span>{item.label}</span>
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

          <div className="project-filter scroll-fade">
            {PROJECT_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                className={`project-filter-button ${
                  activeProjectCategory === category ? "is-active" : ""
                }`}
                onClick={() => setActiveProjectCategory(category)}
              >
                <ProjectCategoryIcon category={category} />

                <span>
                  {category === "System-Analyst" ? "System Analyst" : category}
                </span>
              </button>
            ))}
          </div>

          {filteredProjects.length > 0 ? (
            <AllProjectsHorizontal
              projects={filteredProjects}
              openingProjectHref={openingProjectHref}
              onProjectOpen={handleProjectOpen}
            />
          ) : (
            <div className="portfolio-empty-state">
              <span>{activeProjectCategory}</span>
              <p>Project untuk kategori ini sedang disiapkan.</p>
            </div>
          )}
        </section>

        <section id="about" className="section-block bg-cream text-dark">
          <SectionTitle
            number="03"
            eyebrow="Who Am I"
            title="More About Ardian"
            side="Since Learning"
          />

          <div className="about-grid">
            <div className="about-copy scroll-fade">
              <h3>I build projects to understand how real software works.</h3>
              <p>
                I am an Informatics student who enjoys learning technology by
                building real projects. I work with frontend, backend,
                databases, debugging, and code improvement to create cleaner and
                easier-to-understand applications.
              </p>
              <p>
                My main interests are backend development, cybersecurity, and
                artificial intelligence. I aim to build applications that are
                not only visually appealing, but also supported by clean logic
                and a well-organized structure.
              </p>
              <a href="/CV/CV-ARDIAN.pdf">Download Resume</a>
            </div>

            <div className="about-image scroll-fade">
              <Image
                src="/profile/ProfilePict2.JPG"
                alt="Muhammad Ardian Maulana"
                width={400}
                height={400}
                className="profile-img"
                priority
              />
              <div>
                <span>Currently Learning</span>
                <b>Backend Development + AI Integration</b>
              </div>
            </div>
          </div>
        </section>

        <section
          id="certificates"
          className="section-block education-section text-cream"
        >
          <SectionTitle
            number="04"
            eyebrow="Certificates"
            title="Certificates"
            side="Learning Proof"
          />

          <div className="certificate-showcase">
            <div className="certificate-showcase-left">
              <div className="education-label scroll-fade">
                <span>Certificates</span>
                <p>
                  Learning proof, training activities, and project-based
                  portfolio experience.
                </p>
              </div>

              <article className="certificate-portfolio-card scroll-fade">
                <div className="certificate-preview large">
                  <Image
                    src={CERTIFICATES[0].image}
                    alt={CERTIFICATES[0].imageAlt}
                    width={900}
                    height={620}
                  />
                </div>

                <div className="certificate-meta">
                  <div>
                    <h3>{CERTIFICATES[0].title}</h3>
                    <p>{CERTIFICATES[0].label}</p>
                  </div>

                  <span className="certificate-arrow" aria-hidden="true"></span>
                </div>
              </article>
            </div>

            <div className="certificate-showcase-right">
              <div className="certificate-note scroll-fade">
                <span className="certificate-dot" />
                <p>
                  A collection of learning proof, training results, and
                  project-based achievements.
                </p>
              </div>

              {CERTIFICATES.slice(1).map((item) => (
                <article
                  key={item.title}
                  className="certificate-portfolio-card scroll-fade"
                >
                  <div className="certificate-preview small">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      width={900}
                      height={620}
                    />
                  </div>

                  <div className="certificate-meta">
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.label}</p>
                    </div>

                    <span
                      className="certificate-arrow"
                      aria-hidden="true"
                    ></span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="section-block bg-orange text-dark">
          <SectionTitle
            number="05"
            eyebrow="Services"
            title="What I Can Build"
            side="Fast Iteration"
          />

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
          <SectionTitle
            number="06"
            eyebrow="Stats"
            title="Fun Facts"
            side="Growing"
          />

          <div className="stats-grid">
            {[
              ["20", "Tools & Technologies"],
              ["3", "Core Interests"],
              ["100%", "Learning by Building"],
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
          <SectionTitle
            number="07"
            eyebrow="Experience"
            title="Learning Journey"
            side="Present"
          />

          <div className="experience-list">
            {EXPERIENCES.map((item) => {
              const images = item.images ?? [];
              const activeImageIndex =
                images.length > 0 ? activeExperienceImage % images.length : 0;

              return (
                <article
                  key={item.place}
                  className={`experience-row ${
                    images.length > 0 ? "experience-row-with-image" : ""
                  }`}
                >
                  <div>
                    <h3>{item.place}</h3>
                    <span>{item.role}</span>
                  </div>

                  <time>{item.date}</time>

                  <div className="experience-detail">
                    <p>{item.text}</p>

                    {images.length > 0 ? (
                      <div className="experience-slider">
                        <div
                          className="experience-track"
                          style={{
                            transform: `translateX(-${activeImageIndex * 100}%)`,
                          }}
                        >
                          {images.map((image) => (
                            <Image
                              key={image}
                              src={image}
                              alt={item.imageAlt ?? item.place}
                              width={720}
                              height={450}
                              className="experience-slide"
                            />
                          ))}
                        </div>

                        <div className="experience-dots">
                          {images.map((_, dotIndex) => (
                            <button
                              key={dotIndex}
                              type="button"
                              className={`experience-dot ${
                                dotIndex === activeImageIndex ? "is-active" : ""
                              }`}
                              aria-label={`Show image ${dotIndex + 1}`}
                              onClick={() => setActiveExperienceImage(dotIndex)}
                            />
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-card scroll-fade">
            <span>08 Contact</span>
            <h2>
              <SplitText text="Let's Build Something Useful." />
            </h2>
            <p>
              Interested to collaborate, discuss a project, or connect with me?
              Reach me through email, GitHub, or LinkedIn.
            </p>

            <div>
              <a href="mailto:ardianmaulana92251@gmail.com">Email Me</a>

              <a
                href="https://github.com/ardianmaulanaa"
                target="_blank"
                rel="noreferrer"
              >
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
          © 2026 Muhammad Ardian Maulana. Portfolio inspired layout, modified
          for developer identity.
        </footer>
      </div>
    </main>
  );
}
