"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

const INTRO_SESSION_KEY = "ardn-signature-intro-played";

interface OpeningIntroProps {
  onRevealStart?: () => void;
  onComplete?: () => void;
}

export default function OpeningIntro({
  onRevealStart,
  onComplete,
}: OpeningIntroProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<{ kill: () => void } | null>(null);
  const closeIntroRef = useRef<(fast?: boolean) => void>(() => {});
  const closingRef = useRef(false);
  const onRevealStartRef = useRef(onRevealStart);
  const onCompleteRef = useRef(onComplete);
  const [isClosing, setIsClosing] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    onRevealStartRef.current = onRevealStart;
  }, [onRevealStart]);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) return;

    let isMounted = true;
    let cleanupGsap = () => {};
    const previousBodyOverflow = document.body.style.overflow;
    const previousScrollbarGutter = document.documentElement.style.scrollbarGutter;

    const finishIntro = (fast = false) => {
      if (closingRef.current) return;

      closingRef.current = true;
      timelineRef.current?.kill();

      try {
        window.sessionStorage.setItem(INTRO_SESSION_KEY, "true");
      } catch {
        // Storage can be unavailable in private contexts; the intro still exits.
      }

      onRevealStartRef.current?.();
      setIsClosing(true);

      window.setTimeout(
        () => {
          if (!isMounted) return;

          document.body.style.overflow = previousBodyOverflow;
          document.documentElement.style.scrollbarGutter =
            previousScrollbarGutter;
          setIsHidden(true);
          onCompleteRef.current?.();
        },
        fast ? 420 : 760,
      );
    };

    closeIntroRef.current = finishIntro;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        finishIntro(true);
      }
    };

    document.body.style.overflow = "hidden";
    document.documentElement.style.scrollbarGutter = "stable";
    window.addEventListener("keydown", handleKeyDown);

    const setupIntro = async () => {
      const { gsap } = await import("gsap");

      if (!isMounted) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const signaturePaths = Array.from(
        root.querySelectorAll<SVGPathElement>("[data-signature-path]"),
      );
      const underline = root.querySelector<SVGPathElement>(
        "[data-signature-underline]",
      );
      const penTip = root.querySelector<SVGCircleElement>(".intro-pen-tip");

      const preparePath = (path: SVGPathElement) => {
        const length = path.getTotalLength();

        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;

        return length;
      };

      const pathLengths = signaturePaths.map(preparePath);
      const underlineLength = underline ? preparePath(underline) : 0;

      const setPenPosition = (path: SVGPathElement, progress: number) => {
        if (!penTip) return;

        const point = path.getPointAtLength(
          path.getTotalLength() * Math.min(Math.max(progress, 0), 1),
        );

        gsap.set(penTip, {
          attr: {
            cx: point.x,
            cy: point.y,
          },
        });
      };

      if (reduceMotion) {
        gsap.set([...signaturePaths, underline].filter(Boolean), {
          strokeDashoffset: 0,
        });
        gsap.set(root.querySelectorAll(".intro-reveal-item"), {
          opacity: 1,
          y: 0,
        });
        window.setTimeout(() => finishIntro(false), 520);
        return;
      }

      const ctx = gsap.context(() => {
        gsap.set(root.querySelector(".signature-svg"), {
          opacity: 1,
        });
        gsap.set(root.querySelectorAll(".intro-reveal-item"), {
          opacity: 0,
          y: 12,
        });
        gsap.set(penTip, {
          opacity: 0,
        });

        const timeline = gsap.timeline({
          defaults: { ease: "power2.out" },
          onComplete: () => finishIntro(false),
        });

        timeline
          .fromTo(
            root.querySelector(".opening-intro-grid"),
            { opacity: 0 },
            { opacity: 1, duration: 0.42 },
            0,
          )
          .fromTo(
            root.querySelector(".opening-intro-glow"),
            { opacity: 0, scale: 0.86 },
            { opacity: 1, scale: 1, duration: 0.72, ease: "power2.out" },
            0.08,
          )
          .fromTo(
            root.querySelector(".opening-intro-orbit"),
            { opacity: 0, rotate: -16 },
            { opacity: 1, rotate: 0, duration: 0.8 },
            0.18,
          );

        const totalSignatureLength = pathLengths.reduce(
          (total, length) => total + length,
          0,
        );

        signaturePaths.forEach((path, index) => {
          const proxy = { progress: 0 };
          const duration = Math.max(
            0.2,
            (pathLengths[index] / totalSignatureLength) * 2.12,
          );

          timeline
            .to(
              penTip,
              { opacity: 1, duration: 0.12 },
              index === 0 ? 0.38 : ">-0.02",
            )
            .to(
              path,
              {
                strokeDashoffset: 0,
                duration,
                ease: "sine.inOut",
              },
              index === 0 ? 0.42 : ">-0.03",
            )
            .to(
              proxy,
              {
                progress: 1,
                duration,
                ease: "sine.inOut",
                onStart: () => setPenPosition(path, 0),
                onUpdate: () => setPenPosition(path, proxy.progress),
              },
              `<`,
            );
        });

        if (underline) {
          const underlineProxy = { progress: 0 };

          timeline
            .to(
              underline,
              {
                strokeDashoffset: 0,
                duration: 0.48,
                ease: "power1.inOut",
              },
              ">-0.08",
            )
            .to(
              underlineProxy,
              {
                progress: 1,
                duration: 0.48,
                ease: "power1.inOut",
                onStart: () => underline && setPenPosition(underline, 0),
                onUpdate: () =>
                  underline && setPenPosition(underline, underlineProxy.progress),
              },
              "<",
            );
        }

        timeline
          .to(penTip, { opacity: 0, duration: 0.2 }, ">-0.04")
          .to(
            root.querySelectorAll(".intro-reveal-item"),
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.08,
              ease: "power2.out",
            },
            ">-0.02",
          )
          .to(
            root.querySelector(".signature-svg"),
            {
              scale: 0.985,
              duration: 0.58,
              transformOrigin: "50% 50%",
              ease: "power2.inOut",
            },
            ">+0.2",
          )
          .to(root, { "--intro-exit-progress": 1, duration: 0.5 }, "<");

        timelineRef.current = timeline;
      }, root);

      cleanupGsap = () => ctx.revert();

      pathLengths.forEach((length, index) => {
        signaturePaths[index].style.strokeDasharray = `${length}`;
      });

      if (underline && underlineLength) {
        underline.style.strokeDasharray = `${underlineLength}`;
      }
    };

    setupIntro();

    return () => {
      isMounted = false;
      timelineRef.current?.kill();
      cleanupGsap();
      closeIntroRef.current = () => {};
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.scrollbarGutter = previousScrollbarGutter;
    };
  }, []);

  if (isHidden) {
    return null;
  }

  return (
    <div
      ref={rootRef}
      className={`opening-intro-root ${isClosing ? "is-closing" : ""}`}
      aria-label="ARDN portfolio signature intro"
      role="dialog"
      aria-modal="true"
      style={{ "--intro-exit-progress": 0 } as CSSProperties}
    >
      <div className="opening-intro-grid" aria-hidden="true" />
      <div className="opening-intro-glow" aria-hidden="true" />
      <div className="opening-intro-orbit" aria-hidden="true" />

      <div className="opening-intro-content">
        <svg
          className="signature-svg"
          viewBox="0 0 760 260"
          role="img"
          aria-label="Ardian handwritten signature"
        >
          <path
            data-signature-path
            className="signature-path signature-path-main"
            d="M86 176 C111 124 134 82 158 68 C174 59 190 70 197 93 C209 130 193 170 169 177 C145 184 125 166 135 144 C144 124 174 121 209 140"
          />
          <path
            data-signature-path
            className="signature-path signature-path-main"
            d="M224 176 C231 144 244 124 258 123 C272 122 276 136 264 148 C256 155 243 160 238 176 C254 144 278 125 302 128"
          />
          <path
            data-signature-path
            className="signature-path signature-path-main"
            d="M350 134 C330 121 306 132 302 154 C298 177 321 186 340 170 C358 154 355 129 334 128 C365 135 374 156 369 176 C362 131 372 86 398 67"
          />
          <path
            data-signature-path
            className="signature-path signature-path-main"
            d="M430 128 C415 151 416 176 434 176 C448 176 460 157 467 141"
          />
          <path
            data-signature-path
            className="signature-path signature-path-dot"
            d="M443 95 C448 89 456 92 455 99 C454 106 444 107 441 102 C439 99 440 97 443 95"
          />
          <path
            data-signature-path
            className="signature-path signature-path-main"
            d="M522 130 C495 117 472 130 469 154 C465 177 491 186 509 168 C526 151 526 127 508 130 C538 130 549 149 547 176"
          />
          <path
            data-signature-path
            className="signature-path signature-path-main"
            d="M566 176 C580 137 603 118 625 127 C649 140 622 176 649 176 C674 176 689 146 707 126"
          />
          <path
            data-signature-underline
            className="signature-path signature-path-underline"
            d="M116 204 C258 221 466 217 686 198"
          />
          <circle className="intro-pen-tip" cx="66" cy="176" r="4" />
        </svg>

        <div className="opening-intro-label intro-reveal-item">
          ARDN. / PORTFOLIO
        </div>
        <p className="opening-intro-caption intro-reveal-item">
          DESIGNED &amp; DEVELOPED WITH PURPOSE
        </p>
      </div>

      <button
        type="button"
        className="opening-intro-skip"
        onClick={() => closeIntroRef.current(true)}
      >
        SKIP INTRO
      </button>
    </div>
  );
}

export { INTRO_SESSION_KEY };
