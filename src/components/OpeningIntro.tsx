"use client";

import { useEffect, useId, useRef, useState } from "react";
import styles from "./OpeningIntro.module.css";

export const INTRO_SESSION_KEY = "ardn-signature-intro-played";

interface OpeningIntroProps {
  onRevealStart?: () => void;
  onComplete?: () => void;
}

type KillableTimeline = { kill: () => void };

/**
 * ARDIAN painted intro.
 * The A is a real SVG stroke drawing. RDIAN remains a single typographic run
 * to preserve the font's natural kerning (unlike one-span-per-letter layouts).
 *
 * Requires `gsap` and OpeningIntro.module.css. The site font is inherited via
 * --font-primary; no commercial font binaries are included.
 */
export default function OpeningIntro({
  onRevealStart,
  onComplete,
}: OpeningIntroProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<KillableTimeline | null>(null);
  const closeIntroRef = useRef<(fast?: boolean) => void>(() => {});
  const closingRef = useRef(false);
  const onRevealStartRef = useRef(onRevealStart);
  const onCompleteRef = useRef(onComplete);
  const [isClosing, setIsClosing] = useState(false);
  const [isFastClosing, setIsFastClosing] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // Unique gradient ID: multiple instances won't collide in the DOM.
  const paintGradientId = `intro-paint-${useId().replace(/:/g, "")}`;
  const underlineGradientId = `${paintGradientId}-underline`;

  useEffect(() => {
    onRevealStartRef.current = onRevealStart;
  }, [onRevealStart]);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let mounted = true;
    let cleanupGsap = () => {};
    let exitTimer: number | null = null;
    let reducedMotionTimer: number | null = null;

    const previousBodyOverflow = document.body.style.overflow;
    const previousScrollbarGutter =
      document.documentElement.style.scrollbarGutter;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const restoreScroll = () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.scrollbarGutter =
        previousScrollbarGutter;
    };

    const finishIntro = (fast = false) => {
      if (!mounted || closingRef.current) return;
      closingRef.current = true;
      timelineRef.current?.kill();

      if (reducedMotionTimer !== null) {
        window.clearTimeout(reducedMotionTimer);
        reducedMotionTimer = null;
      }

      try {
        window.sessionStorage.setItem(INTRO_SESSION_KEY, "true");
      } catch {
        // Storage may be unavailable; the animation can still finish.
      }

      onRevealStartRef.current?.();
      setIsFastClosing(fast);
      setIsClosing(true);

      exitTimer = window.setTimeout(() => {
        if (!mounted) return;
        restoreScroll();
        setIsHidden(true);
        onCompleteRef.current?.();
        if (previouslyFocused?.isConnected) {
          previouslyFocused.focus({ preventScroll: true });
        }
      }, fast ? 420 : 760);
    };

    closeIntroRef.current = finishIntro;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") finishIntro(true);
    };

    document.body.style.overflow = "hidden";
    document.documentElement.style.scrollbarGutter = "stable";
    window.addEventListener("keydown", handleKeyDown);
    skipRef.current?.focus({ preventScroll: true });

    const setupIntro = async () => {
      try {
        // Prevent visible font swaps halfway through the wordmark animation.
        if (document.fonts) await document.fonts.ready;
        if (!mounted || closingRef.current) return;

        const { gsap } = await import("gsap");
        if (!mounted || closingRef.current) return;

        const paintPaths = Array.from(
          root.querySelectorAll<SVGPathElement>(`.${styles.inkStroke}`),
        );
        const underlinePath = root.querySelector<SVGPathElement>(
          `.${styles.underlineStroke}`,
        );
        const rest = root.querySelector<HTMLElement>(`.${styles.rest}`);
        const dot = root.querySelector<HTMLElement>(`.${styles.dot}`);
        const wordmark = root.querySelector<HTMLElement>(`.${styles.wordmark}`);
        const revealItems = root.querySelectorAll<HTMLElement>(
          `.${styles.revealItem}`,
        );
        const grid = root.querySelector<HTMLElement>(`.${styles.grid}`);
        const glow = root.querySelector<HTMLElement>(`.${styles.glow}`);
        const orbit = root.querySelector<HTMLElement>(`.${styles.orbit}`);
        const inkFlecks = root.querySelectorAll<SVGCircleElement>(
          `.${styles.inkFleck}`,
        );

        const revealPathInstantly = (path: SVGPathElement) => {
          gsap.set(path, {
            strokeDasharray: "none",
            strokeDashoffset: 0,
            opacity: 1,
          });
        };

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          paintPaths.forEach(revealPathInstantly);
          if (underlinePath) revealPathInstantly(underlinePath);
          gsap.set(rest, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" });
          gsap.set(dot, { opacity: 1, scale: 1, y: 0 });
          gsap.set(revealItems, { opacity: 1, y: 0 });
          gsap.set(inkFlecks, { opacity: 1 });
          reducedMotionTimer = window.setTimeout(() => finishIntro(true), 450);
          return;
        }

        const ctx = gsap.context(() => {
          const prepareStroke = (path: SVGPathElement | null) => {
            if (!path) return;
            const length = path.getTotalLength() + 2;
            gsap.set(path, {
              strokeDasharray: `${length} ${length}`,
              strokeDashoffset: length,
              opacity: 1,
            });
          };

          paintPaths.forEach(prepareStroke);
          prepareStroke(underlinePath);
          gsap.set(rest, { opacity: 1, clipPath: "inset(0% 100% 0% 0%)" });
          gsap.set(dot, { opacity: 0, y: 12, scale: 0.4 });
          gsap.set(revealItems, { opacity: 0, y: 14 });
          gsap.set(inkFlecks, { opacity: 0, scale: 0.25, transformOrigin: "center" });
          gsap.set(grid, { opacity: 0 });
          gsap.set(glow, { opacity: 0, scale: 0.92 });
          gsap.set(orbit, { opacity: 0, rotation: -15, scale: 0.94 });

          const timeline = gsap.timeline({
            defaults: { ease: "power2.out" },
            onComplete: () => finishIntro(false),
          });

          timeline
            .to(grid, { opacity: 1, duration: 0.65 }, 0)
            .to(glow, { opacity: 1, scale: 1, duration: 1.1 }, 0.05)
            .to(orbit, { opacity: 1, rotation: -6, scale: 1, duration: 1.1 }, 0.1);

          // Paint the A in three ordered strokes: main diagonal, crossbar, tail.
          if (paintPaths[0]) {
            timeline.to(
              paintPaths[0],
              { strokeDashoffset: 0, duration: 1.35, ease: "power1.inOut" },
              0.3,
            );
          }
          if (paintPaths[1]) {
            timeline.to(
              paintPaths[1],
              { strokeDashoffset: 0, duration: 0.58, ease: "power2.inOut" },
              1.12,
            );
          }
          if (paintPaths[2]) {
            timeline.to(
              paintPaths[2],
              { strokeDashoffset: 0, duration: 0.36 },
              1.46,
            );
          }

          timeline
            // Mask reveal does NOT break the kerning of RDIAN into spans.
            .to(
              rest,
              {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 0.84,
                ease: "power3.inOut",
              },
              1.23,
            )
            .to(
              dot,
              { opacity: 1, y: 0, scale: 1, duration: 0.38, ease: "back.out(1.5)" },
              1.98,
            )
            .to(
              inkFlecks,
              { opacity: 0.78, scale: 1, stagger: 0.06, duration: 0.25 },
              1.66,
            );

          if (underlinePath) {
            timeline.to(
              underlinePath,
              { strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut" },
              2.04,
            );
          }

          timeline
            .to(
              revealItems,
              { opacity: 1, y: 0, duration: 0.48, stagger: 0.1 },
              2.38,
            )
            .to(
              wordmark,
              { scale: 0.99, duration: 0.48, ease: "sine.inOut" },
              3.02,
            );

          timelineRef.current = timeline;
        }, root);

        cleanupGsap = () => ctx.revert();
      } catch (error) {
        console.error("OpeningIntro animation could not start:", error);
        if (mounted) finishIntro(true);
      }
    };

    void setupIntro();

    return () => {
      mounted = false;
      timelineRef.current?.kill();
      cleanupGsap();
      if (exitTimer !== null) window.clearTimeout(exitTimer);
      if (reducedMotionTimer !== null) window.clearTimeout(reducedMotionTimer);
      closeIntroRef.current = () => {};
      window.removeEventListener("keydown", handleKeyDown);
      restoreScroll();
    };
  }, []);

  if (isHidden) return null;

  return (
    <div
      ref={rootRef}
      className={[
        styles.root,
        isClosing ? styles.isClosing : "",
        isFastClosing ? styles.fastClosing : "",
      ]
        .filter(Boolean)
        .join(" ")}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ardian-intro-heading"
    >
      <h2 className={styles.srOnly} id="ardian-intro-heading">
        Ardian portfolio introduction
      </h2>

      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.orbit} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.signature} role="img" aria-label="ARDIAN.">
          <div className={styles.wordmark} aria-hidden="true">
            <svg
              className={styles.initial}
              viewBox="10 0 92 104"
              aria-hidden="true"
              focusable="false"
            >
              <defs>
                <linearGradient id={paintGradientId} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fcf4d9" />
                  <stop offset="50%" stopColor="#dfb780" />
                  <stop offset="100%" stopColor="#fff5e8" />
                </linearGradient>
              </defs>
              <path
                className={styles.inkStroke}
                d="M 17 92 C 30 64, 43 30, 52 12 C 55 6, 58 10, 61 17 C 70 39, 79 73, 94 93"
                fill="none"
                stroke={`url(#${paintGradientId})`}
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className={styles.inkStroke}
                d="M 30 65 C 42 62, 60 61, 78 65"
                fill="none"
                stroke={`url(#${paintGradientId})`}
                strokeWidth="5.8"
                strokeLinecap="round"
              />
              <path
                className={styles.inkStroke}
                d="M 13 96 C 16 96, 20 94, 23 91"
                fill="none"
                stroke={`url(#${paintGradientId})`}
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              <circle className={styles.inkFleck} cx="96" cy="94" r="1.6" fill="#dfb780" />
              <circle className={styles.inkFleck} cx="25" cy="89" r="1.1" fill="#f1d8b3" />
            </svg>

            <span className={styles.rest}>RDIAN</span>
            <span className={styles.dot}>.</span>
          </div>

          <svg
            className={styles.underline}
            viewBox="0 0 700 24"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={underlineGradientId} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#d49c63" />
                <stop offset="52%" stopColor="#f9e3bc" />
                <stop offset="100%" stopColor="#d49c63" />
              </linearGradient>
            </defs>
            <path
              className={styles.underlineStroke}
              d="M 12 14 C 130 17, 245 12, 351 14 S 561 17, 690 11"
              fill="none"
              stroke={`url(#${underlineGradientId})`}
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className={`${styles.label} ${styles.revealItem}`}>
          ARDN. / PORTFOLIO
        </div>
        <p className={`${styles.caption} ${styles.revealItem}`}>
          DESIGNED &amp; DEVELOPED WITH PURPOSE
        </p>
      </div>

      <button
        ref={skipRef}
        type="button"
        className={styles.skip}
        onClick={() => closeIntroRef.current(true)}
        aria-label="Skip portfolio introduction"
      >
        SKIP INTRO <span aria-hidden="true">↗</span>
      </button>
    </div>
  );
}
