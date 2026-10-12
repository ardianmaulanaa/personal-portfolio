"use client";

import { useEffect, useRef, useState } from "react";

const WORDS = ["Hello,", "this", "is", "Ardian's", "Portfolio."];

type IntroPhase = "entering" | "waiting" | "leaving" | "hidden";

interface OpeningIntroProps {
  onRevealStart?: () => void;
  onComplete?: () => void;
}

export default function OpeningIntro({
  onRevealStart,
  onComplete,
}: OpeningIntroProps) {
  const [phase, setPhase] = useState<IntroPhase>("entering");

  const onRevealStartRef = useRef(onRevealStart);

  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onRevealStartRef.current = onRevealStart;
  }, [onRevealStart]);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;

    const previousScrollbarGutter =
      document.documentElement.style.scrollbarGutter;

    document.body.style.overflow = "hidden";

    document.documentElement.style.scrollbarGutter = "stable";

    const waitingTimer = setTimeout(() => {
      setPhase("waiting");
    }, 2200);

    const leavingTimer = setTimeout(() => {
      setPhase("leaving");

      onRevealStartRef.current?.();
    }, 3000);

    const closingTimer = setTimeout(() => {
      setPhase("hidden");

      document.body.style.overflow = previousBodyOverflow;

      document.documentElement.style.scrollbarGutter = previousScrollbarGutter;

      onCompleteRef.current?.();
    }, 4100);

    return () => {
      clearTimeout(waitingTimer);
      clearTimeout(leavingTimer);
      clearTimeout(closingTimer);

      document.body.style.overflow = previousBodyOverflow;

      document.documentElement.style.scrollbarGutter = previousScrollbarGutter;
    };
  }, []);

  if (phase === "hidden") {
    return null;
  }

  const isLeaving = phase === "leaving";

  return (
    <div
      className={`portfolio-opening-root ${isLeaving ? "is-leaving" : ""}`}
      role="status"
      aria-label="Portfolio opening animation"
    >
      {/* PANEL KIRI */}
      <div className="intro-panel intro-panel-left" />

      {/* PANEL KANAN */}
      <div className="intro-panel intro-panel-right" />

      {/* GRID */}
      <div className="ardian-intro-grid" aria-hidden="true" />

      {/* ORANGE GLOW */}
      <div className="ardian-intro-glow" aria-hidden="true" />

      {/* CONTENT */}
      <div className="ardian-intro-content">
        <p className="ardian-intro-label">Muhammad Ardian Maulana</p>

        <h1 className="ardian-intro-title">
          {WORDS.map((word, index) => (
            <span key={`${word}-${index}`} className="ardian-word-mask">
              <span
                className="ardian-word"
                style={{
                  animationDelay: `${500 + index * 130}ms`,
                }}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>

        <span className="ardian-intro-line" aria-hidden="true" />
      </div>

      <style jsx>{`
        .portfolio-opening-root {
          position: fixed;
          inset: 0;
          z-index: 999999;

          display: flex;
          align-items: center;
          justify-content: center;

          width: 100vw;
          height: 100dvh;

          overflow: hidden;

          color: #f7f1e3;

          pointer-events: auto;
        }

        /* ============================
           PANEL
        ============================ */

        .intro-panel {
          position: absolute;
          top: 0;
          bottom: 0;

          z-index: 0;

          width: 50%;

          background: #0d0d0f;

          transition: transform 1000ms cubic-bezier(0.76, 0, 0.24, 1);
        }

        .intro-panel-left {
          left: 0;
        }

        .intro-panel-right {
          right: 0;
        }

        .is-leaving .intro-panel-left {
          transform: translateX(-100%);
        }

        .is-leaving .intro-panel-right {
          transform: translateX(100%);
        }

        /* ============================
           GRID
        ============================ */

        .ardian-intro-grid {
          position: absolute;
          inset: 0;

          z-index: 1;

          pointer-events: none;

          opacity: 0.18;

          background-image:
            linear-gradient(rgba(247, 241, 227, 0.06) 1px, transparent 1px),
            linear-gradient(
              90deg,
              rgba(247, 241, 227, 0.06) 1px,
              transparent 1px
            );

          background-size: 72px 72px;

          mask-image: radial-gradient(circle at center, black, transparent 78%);

          transition: opacity 400ms ease;
        }

        .is-leaving .ardian-intro-grid {
          opacity: 0;
        }

        /* ============================
           GLOW
        ============================ */

        .ardian-intro-glow {
          position: absolute;

          left: 50%;
          top: 50%;

          z-index: 1;

          width: 440px;
          height: 440px;

          border-radius: 50%;

          background: radial-gradient(
            circle,
            rgba(249, 115, 22, 0.24) 0%,
            rgba(249, 115, 22, 0.08) 38%,
            transparent 70%
          );

          filter: blur(46px);

          transform: translate(-50%, -50%) scale(1);

          animation: introGlowBreath 3.5s ease-in-out infinite;

          transition: opacity 450ms ease;
        }

        .is-leaving .ardian-intro-glow {
          opacity: 0;
        }

        /* ============================
           CONTENT
        ============================ */

        .ardian-intro-content {
          position: relative;

          z-index: 3;

          display: flex;

          width: min(100%, 1100px);

          flex-direction: column;
          align-items: center;

          padding: 24px;

          text-align: center;

          transition:
            opacity 380ms ease,
            transform 500ms cubic-bezier(0.22, 1, 0.36, 1),
            filter 380ms ease;
        }

        .is-leaving .ardian-intro-content {
          opacity: 0;

          filter: blur(8px);

          transform: translateY(-12px) scale(0.97);
        }

        /* ============================
           NAME
        ============================ */

        .ardian-intro-label {
          margin: 0 0 24px;

          color: rgba(247, 241, 227, 0.48);

          font-size: 10px;
          font-weight: 900;

          line-height: 1.4;

          letter-spacing: 0.3em;

          text-transform: uppercase;

          opacity: 0;

          animation: introNameReveal 800ms cubic-bezier(0.16, 1, 0.3, 1) 180ms
            forwards;
        }

        /* ============================
           TITLE
        ============================ */

        .ardian-intro-title {
          display: flex;

          flex-wrap: wrap;
          justify-content: center;

          max-width: 1000px;

          margin: 0;

          color: #f7f1e3;

          font-family: inherit;

          font-size: clamp(2rem, 5vw, 4.9rem);

          font-weight: 400;

          line-height: 1.13;

          letter-spacing: -0.055em;

          text-align: center;
        }

        .ardian-word-mask {
          display: inline-block;

          overflow: hidden;

          padding: 0 0.08em 0.1em;
        }

        .ardian-word {
          display: inline-block;

          opacity: 0;

          transform: translateY(110%);

          animation: introWordReveal 850ms cubic-bezier(0.16, 1, 0.3, 1)
            forwards;
        }

        /* ============================
           ORANGE LINE
        ============================ */

        .ardian-intro-line {
          display: block;

          width: 2px;
          height: 48px;

          margin: 30px auto 0;

          border-radius: 999px;

          background: linear-gradient(
            to bottom,
            rgba(249, 115, 22, 0.1),
            #f97316,
            rgba(249, 115, 22, 0.1)
          );

          box-shadow: 0 0 18px rgba(249, 115, 22, 0.4);

          opacity: 0;

          transform: scaleY(0);

          transform-origin: top center;

          animation: introLineReveal 750ms cubic-bezier(0.16, 1, 0.3, 1) 1350ms
            forwards;
        }

        /* ============================
           ANIMATIONS
        ============================ */

        @keyframes introNameReveal {
          from {
            opacity: 0;

            filter: blur(8px);

            transform: translateY(12px);
          }

          to {
            opacity: 1;

            filter: blur(0);

            transform: translateY(0);
          }
        }

        @keyframes introWordReveal {
          from {
            opacity: 0;

            transform: translateY(110%);
          }

          to {
            opacity: 1;

            transform: translateY(0);
          }
        }

        @keyframes introLineReveal {
          from {
            opacity: 0;

            transform: scaleY(0);
          }

          to {
            opacity: 1;

            transform: scaleY(1);
          }
        }

        @keyframes introGlowBreath {
          0%,
          100% {
            opacity: 0.55;

            transform: translate(-50%, -50%) scale(0.95);
          }

          50% {
            opacity: 1;

            transform: translate(-50%, -50%) scale(1.12);
          }
        }

        /* ============================
           MOBILE
        ============================ */

        @media (max-width: 640px) {
          .ardian-intro-glow {
            width: 300px;
            height: 300px;
          }

          .ardian-intro-label {
            margin-bottom: 16px;

            font-size: 8px;

            letter-spacing: 0.22em;
          }

          .ardian-intro-title {
            max-width: 350px;

            font-size: clamp(1.75rem, 8.7vw, 2.65rem);

            line-height: 1.18;

            letter-spacing: -0.04em;
          }

          .ardian-intro-line {
            height: 38px;

            margin-top: 22px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .intro-panel,
          .ardian-intro-grid,
          .ardian-intro-glow,
          .ardian-intro-content,
          .ardian-intro-label,
          .ardian-word,
          .ardian-intro-line {
            animation-duration: 1ms !important;

            animation-iteration-count: 1 !important;

            transition-duration: 1ms !important;
          }
        }
      `}</style>
    </div>
  );
}
