import Image from "next/image";
import Link from "next/link";

const FEATURES = [
  "User authentication flow for buyer and seller accounts",
  "Product catalog with product detail page",
  "Shopping cart concept and checkout flow",
  "Category-based product management",
  "Backend API structure using Java Servlet",
  "Database integration concept with PostgreSQL",
];

const TECH_STACK = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Java Servlet",
  "PostgreSQL",
  "REST API",
  "GitHub",
];

const GALLERY = [
  "/img/greenmarket/1.png",
  "/img/greenmarket/2.png",
  "/img/greenmarket/3.png",
];

export default function GreenMarketPage() {
  return (
    <main className="min-h-screen bg-[#0d0d0f] text-[#f7f1e3]">
      <section className="relative overflow-hidden px-6 py-8 md:px-12 lg:px-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,197,94,0.18),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.14),transparent_30%)]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-12 flex items-center justify-between">
            <Link
              href="/"
              className="rounded-full border border-white/20 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white/80 transition hover:bg-white hover:text-black"
            >
              ← Back Home
            </Link>

            <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/40">
              Portfolio / 2026
            </span>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-green-400">
                Marketplace Web Application
              </p>

              <h1 className="max-w-4xl text-5xl font-black leading-none tracking-[-0.08em] md:text-7xl lg:text-8xl">
                Green
                <span className="block text-green-400">Market</span>
              </h1>

              <p className="mt-8 max-w-2xl text-base leading-8 text-white/65 md:text-lg">
                GreenMarket is a marketplace web application project designed to support
                product browsing, user account flow, product management, and transaction
                features. This project was built as a fullstack learning project using
                modern frontend technology and Java-based backend architecture.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://github.com/ardianmaulanaa"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-green-400 px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-black transition hover:bg-white"
                >
                  View GitHub
                </a>

                <Link
                  href="#features"
                  className="rounded-full border border-white/20 px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-black"
                >
                  Explore Project
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-5 rounded-[3rem] bg-green-400/20 blur-3xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur">
                <Image
                  src="/img/greenmarket/1.png"
                  alt="GreenMarket preview"
                  width={1000}
                  height={700}
                  className="h-auto w-full rounded-[1.5rem] object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
            <span className="text-sm font-bold uppercase tracking-[0.25em] text-white/40">
              Role
            </span>
            <h2 className="mt-4 text-2xl font-black">Fullstack Developer</h2>
            <p className="mt-4 leading-7 text-white/60">
              Designed and developed the frontend structure, backend flow, API concept,
              and database-related logic.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
            <span className="text-sm font-bold uppercase tracking-[0.25em] text-white/40">
              Type
            </span>
            <h2 className="mt-4 text-2xl font-black">Marketplace System</h2>
            <p className="mt-4 leading-7 text-white/60">
              A web-based marketplace concept for product listing, account flow, cart,
              and transaction features.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
            <span className="text-sm font-bold uppercase tracking-[0.25em] text-white/40">
              Focus
            </span>
            <h2 className="mt-4 text-2xl font-black">Clean System Flow</h2>
            <p className="mt-4 leading-7 text-white/60">
              Focused on project structure, reusable logic, database relation, and
              clear separation between frontend and backend.
            </p>
          </div>
        </div>
      </section>

      <section id="features" className="bg-[#f7f1e3] px-6 py-24 text-[#111] md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-sm font-black uppercase tracking-[0.3em] text-green-700">
                Main Features
              </span>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.06em] md:text-6xl">
                What GreenMarket Can Do
              </h2>
            </div>

            <p className="max-w-md leading-7 text-black/60">
              The project was created to simulate how a real marketplace application
              works from frontend interaction to backend data processing.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature, index) => (
              <article
                key={feature}
                className="rounded-[1.5rem] border border-black/10 bg-white p-6 shadow-sm"
              >
                <span className="text-sm font-black text-green-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-5 text-lg font-bold leading-7">{feature}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="text-sm font-black uppercase tracking-[0.3em] text-green-400">
              Technology
            </span>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.06em] md:text-6xl">
              Tech Stack
            </h2>
            <p className="mt-6 leading-8 text-white/60">
              GreenMarket combines frontend interface development with backend API
              structure and database integration concept.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white/80"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <span className="text-sm font-black uppercase tracking-[0.3em] text-green-400">
              Gallery
            </span>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.06em] md:text-6xl">
              Project Preview
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {GALLERY.map((image, index) => (
              <div
                key={image}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-3"
              >
                <Image
                  src={image}
                  alt={`GreenMarket preview ${index + 1}`}
                  width={900}
                  height={600}
                  className="h-72 w-full rounded-[1.5rem] object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-12 md:px-12 lg:px-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-black">GreenMarket</h2>
            <p className="mt-2 text-white/50">
              Marketplace project by Muhammad Ardian Maulana.
            </p>
          </div>

          <Link
            href="/"
            className="w-fit rounded-full bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-black transition hover:bg-green-400"
          >
            Back to Portfolio
          </Link>
        </div>
      </section>
    </main>
  );
}