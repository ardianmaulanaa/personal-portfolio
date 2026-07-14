"use client";

import { useEffect, useRef, useState } from "react";

const INTRO_TEXT = "Hello, this is Ardian's Portfolio.";

type IntroPhase = "typing" | "waiting" | "leaving" | "hidden";

interface OpeningIntroProps {
  onRevealStart?: () => void;
  onComplete?: () => void;
}

export default function OpeningIntro({
  onRevealStart,
  onComplete,
}: OpeningIntroProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [phase, setPhase] = useState<IntroPhase>("typing");

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
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    let currentIndex = 0;
    let waitingTimer: ReturnType<typeof setTimeout> | undefined;
    let closingTimer: ReturnType<typeof setTimeout> | undefined;

    const typingTimer = window.setInterval(() => {
      currentIndex += 1;
      setDisplayedText(INTRO_TEXT.slice(0, currentIndex));

      if (currentIndex >= INTRO_TEXT.length) {
        window.clearInterval(typingTimer);
        setPhase("waiting");

        waitingTimer = setTimeout(() => {
          setPhase("leaving");
          onRevealStartRef.current?.();

          closingTimer = setTimeout(() => {
            setPhase("hidden");
            document.body.style.overflow = previousBodyOverflow;
            document.documentElement.style.overflow = previousHtmlOverflow;
            onCompleteRef.current?.();
          }, 1000);
        }, 850);
      }
    }, 52);

    return () => {
      window.clearInterval(typingTimer);

      if (waitingTimer) clearTimeout(waitingTimer);
      if (closingTimer) clearTimeout(closingTimer);

      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, []);

  if (phase === "hidden") return null;

  const isLeaving = phase === "leaving";

  return (
    <div
      className="portfolio-opening-root"
      role="status"
      aria-label="Portfolio opening animation"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100dvh",
        padding: "24px",
        overflow: "hidden",
        background:
          "radial-gradient(circle at 50% 45%, rgba(249,115,22,0.14), transparent 36%), #0d0d0f",
        color: "#f7f1e3",
        opacity: isLeaving ? 0 : 1,
        pointerEvents: isLeaving ? "none" : "auto",
        transform: isLeaving
          ? "translate3d(0,-18px,0) scale(1.035)"
          : "translate3d(0,0,0) scale(1)",
        transition:
          "opacity 1000ms cubic-bezier(0.22, 1, 0.36, 1), transform 1000ms cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "opacity, transform",
      }}
    >
      <div className="ardian-intro-grid" aria-hidden="true" />

      <div
        className={`ardian-intro-content ${
          isLeaving ? "ardian-intro-content-leaving" : ""
        }`}
      >
        <p className="ardian-intro-label">Muhammad Ardian Maulana</p>

        <h1 className="ardian-intro-title" aria-live="polite">
          {displayedText}
          <span className="ardian-intro-cursor" aria-hidden="true" />
        </h1>

        <span className="ardian-intro-line" aria-hidden="true" />
      </div>

      <style jsx>{`
        .ardian-intro-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.2;
          background-image:
            linear-gradient(rgba(247, 241, 227, 0.06) 1px, transparent 1px),
            linear-gradient(
              90deg,
              rgba(247, 241, 227, 0.06) 1px,
              transparent 1px
            );
          background-size: 72px 72px;
          -webkit-mask-image: radial-gradient(
            circle at center,
            black,
            transparent 78%
          );
          mask-image: radial-gradient(circle at center, black, transparent 78%);
        }

        .ardian-intro-content {
          position: relative;
          z-index: 1;
          width: min(100%, 1100px);
          text-align: center;
          transform: translate3d(0, -2vh, 0) scale(1);
          transition:
            transform 1000ms cubic-bezier(0.22, 1, 0.36, 1),
            opacity 700ms ease;
          will-change: transform, opacity;
        }

        .ardian-intro-content-leaving {
          opacity: 0;
          transform: translate3d(0, -8vh, 0) scale(0.98);
        }

        .ardian-intro-label {
          margin: 0 0 22px;
          color: rgba(247, 241, 227, 0.48);
          font-size: 10px;
          font-weight: 900;
          line-height: 1.4;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          animation: introLabelReveal 600ms ease forwards;
        }

        .ardian-intro-title {
          min-height: 1.2em;
          margin: 0 auto;
          max-width: 1000px;
          color: #f7f1e3;
          font-family: inherit;
          font-size: clamp(2rem, 5vw, 4.9rem);
          font-weight: 400;
          line-height: 1.13;
          letter-spacing: -0.055em;
          text-align: center;
        }

        .ardian-intro-cursor {
          display: inline-block;
          width: 2px;
          height: 0.9em;
          margin-left: 8px;
          background: #f97316;
          vertical-align: -0.06em;
          animation: introCursorBlink 700ms steps(1, end) infinite;
        }

        .ardian-intro-line {
          display: block;
          width: 2px;
          height: 48px;
          margin: 28px auto 0;
          border-radius: 999px;
          background: linear-gradient(
            to bottom,
            rgba(249, 115, 22, 0.1),
            #f97316,
            rgba(249, 115, 22, 0.1)
          );
          transform-origin: top center;
          animation: introLinePulse 1.25s ease-in-out infinite;
        }

        @keyframes introCursorBlink {
          0%,
          45% {
            opacity: 1;
          }

          46%,
          100% {
            opacity: 0;
          }
        }

        @keyframes introLinePulse {
          0%,
          100% {
            opacity: 0.3;
            transform: scaleY(0.65);
          }

          50% {
            opacity: 1;
            transform: scaleY(1);
          }
        }

        @keyframes introLabelReveal {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 640px) {
          .ardian-intro-content {
            transform: translate3d(0, -1vh, 0) scale(1);
          }

          .ardian-intro-content-leaving {
            transform: translate3d(0, -6vh, 0) scale(0.98);
          }

          .ardian-intro-label {
            margin-bottom: 16px;
            font-size: 8px;
            letter-spacing: 0.22em;
          }

          .ardian-intro-title {
            max-width: 340px;
            font-size: clamp(1.75rem, 8.7vw, 2.65rem);
            line-height: 1.2;
            letter-spacing: -0.04em;
          }

          .ardian-intro-line {
            height: 38px;
            margin-top: 22px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ardian-intro-content,
          .ardian-intro-label,
          .ardian-intro-cursor,
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
