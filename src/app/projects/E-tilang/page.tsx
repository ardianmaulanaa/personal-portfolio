import Image from "next/image";
import Link from "next/link";

const FEATURES = [
  "Wrong-way vehicle detection using computer vision concept",
  "Image/video-based traffic violation analysis",
  "Bounding box detection result preview",
  "Dataset preparation and annotation workflow",
  "Model training experiment using Roboflow",
  "Simple violation monitoring dashboard concept",
];

const TECH_STACK = [
  "Python",
  "Computer Vision",
  "Roboflow",
  "Machine Learning",
  "Object Detection",
  "Dataset Annotation",
  "Next.js",
];

const GALLERY = [
  "/img/multimedia/4.JPG",
  "/img/multimedia/5.JPG",
  "/img/multimedia/6.JPG",
];

export default function ETilangPage() {
  return (
    <main className="min-h-screen bg-[#08090c] text-[#f7f1e3]">
      <section className="relative overflow-hidden px-6 py-8 md:px-12 lg:px-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(239,68,68,0.2),transparent_34%),radial-gradient(circle_at_80%_25%,rgba(59,130,246,0.14),transparent_32%)]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-12 flex items-center justify-between">
            <Link
              href="/"
              className="rounded-full border border-white/20 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white/80 transition hover:bg-white hover:text-black"
            >
              ← Back Home
            </Link>

            <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/40">
              Portfolio / Computer Vision
            </span>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-red-400">
                Computer Vision Project
              </p>

              <h1 className="max-w-4xl text-5xl font-black leading-none tracking-[-0.08em] md:text-7xl lg:text-8xl">
                E-Tilang
                <span className="block text-red-400">Wrong Way Detection</span>
              </h1>

              <p className="mt-8 max-w-2xl text-base leading-8 text-white/65 md:text-lg">
                E-Tilang is a computer vision exploration project focused on
                detecting wrong-way vehicle movement. This project was created
                to understand how object detection can be used to support smart
                traffic monitoring and digital violation detection systems.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://github.com/ardianmaulanaa"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-red-400 px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-black transition hover:bg-white"
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
              <div className="absolute -inset-5 rounded-[3rem] bg-red-400/20 blur-3xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur">
                <Image
                  src="/img/multimedia/4.JPG"
                  alt="E-Tilang preview"
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
            <h2 className="mt-4 text-2xl font-black">
              Computer Vision Explorer
            </h2>
            <p className="mt-4 leading-7 text-white/60">
              Worked on the detection concept, dataset workflow, model
              experiment, and project documentation.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
            <span className="text-sm font-bold uppercase tracking-[0.25em] text-white/40">
              Type
            </span>
            <h2 className="mt-4 text-2xl font-black">
              Traffic Detection System
            </h2>
            <p className="mt-4 leading-7 text-white/60">
              A smart traffic monitoring concept that focuses on detecting
              vehicles moving in the wrong direction.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
            <span className="text-sm font-bold uppercase tracking-[0.25em] text-white/40">
              Focus
            </span>
            <h2 className="mt-4 text-2xl font-black">Object Detection</h2>
            <p className="mt-4 leading-7 text-white/60">
              Focused on understanding detection flow, image annotation,
              training process, and prediction result analysis.
            </p>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="bg-[#f7f1e3] px-6 py-24 text-[#111] md:px-12 lg:px-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-sm font-black uppercase tracking-[0.3em] text-red-600">
                Main Features
              </span>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.06em] md:text-6xl">
                What E-Tilang Can Do
              </h2>
            </div>

            <p className="max-w-md leading-7 text-black/60">
              This project simulates how computer vision can help identify
              traffic violations through image or video-based detection.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature, index) => (
              <article
                key={feature}
                className="rounded-[1.5rem] border border-black/10 bg-white p-6 shadow-sm"
              >
                <span className="text-sm font-black text-red-600">
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
            <span className="text-sm font-black uppercase tracking-[0.3em] text-red-400">
              Technology
            </span>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.06em] md:text-6xl">
              Tech Stack
            </h2>
            <p className="mt-6 leading-8 text-white/60">
              E-Tilang combines computer vision, dataset preparation, object
              detection workflow, and project documentation as a learning-based
              AI project.
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

      <section className="border-t border-white/10 px-6 py-12 md:px-12 lg:px-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-black">E-Tilang</h2>
            <p className="mt-2 text-white/50">
              Computer vision project by MultiMedia Laboratory.
            </p>
          </div>

          <Link
            href="/"
            className="w-fit rounded-full bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-black transition hover:bg-red-400"
          >
            Back to Portfolio
          </Link>
        </div>
      </section>
    </main>
  );
}
