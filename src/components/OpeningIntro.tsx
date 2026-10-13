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

      const signatureInitial =
        root.querySelector<HTMLElement>(".intro-script-initial");
      const wordRest = root.querySelector<HTMLElement>(".intro-word-rest");
      const penTip = root.querySelector<HTMLElement>(".intro-pen-tip");
      const underline = root.querySelector<HTMLElement>(".signature-underline");

      if (reduceMotion) {
        gsap.set([signatureInitial, wordRest, underline].filter(Boolean), {
          opacity: 1,
          "--script-reveal": 100,
          scaleX: 1,
          x: 0,
          y: 0,
        });
        gsap.set(root.querySelectorAll(".intro-reveal-item"), {
          opacity: 1,
          y: 0,
        });
        gsap.set(penTip, { opacity: 0 });
        window.setTimeout(() => finishIntro(false), 520);
        return;
      }

      const ctx = gsap.context(() => {
        gsap.set(signatureInitial, {
          opacity: 1,
          "--script-reveal": 0,
          "--script-shine": 0,
        });
        gsap.set(root.querySelectorAll(".intro-reveal-item"), {
          opacity: 0,
          y: 12,
        });
        gsap.set(wordRest, {
          opacity: 0,
          x: -10,
        });
        gsap.set(penTip, {
          opacity: 0,
          left: "8%",
          top: "60%",
          xPercent: 0,
        });
        gsap.set(underline, {
          opacity: 1,
          scaleX: 0,
          transformOrigin: "50% 50%",
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

        timeline
          .to(penTip, { opacity: 1, duration: 0.12 }, 0.38)
          .to(
            signatureInitial,
            {
              "--script-reveal": 100,
              "--script-shine": 1,
              duration: 0.98,
              ease: "sine.inOut",
            },
            0.42,
          )
          .to(
            penTip,
            {
              left: "82%",
              top: "34%",
              duration: 0.98,
              ease: "sine.inOut",
            },
            "<",
          );
        timeline.to(
          signatureInitial,
          {
            "--script-shine": 0,
            duration: 0.22,
            ease: "power1.out",
          },
          ">-0.08",
        );

        timeline.to(
          wordRest,
          {
            opacity: 1,
            x: 0,
            duration: 0.52,
            ease: "power2.out",
          },
          1.12,
        );

        if (underline) {
          timeline.to(
            underline,
            {
              scaleX: 1,
              duration: 0.44,
              ease: "power1.inOut",
            },
            ">-0.08",
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
            root.querySelector(".intro-signature-wordmark"),
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
        <div className="intro-signature-wordmark" aria-label="Ardian">
          <span
            className="intro-script-initial"
            data-script-initial="A"
            aria-hidden="true"
          >
            A
          </span>
          <span className="intro-pen-tip" aria-hidden="true" />
          <span className="intro-word-rest">rdian</span>
          <span className="signature-underline" aria-hidden="true" />
        </div>

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
