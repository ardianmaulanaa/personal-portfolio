"use client";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import React, { useEffect, useRef } from "react";
import { scrollToSection } from "@/lib/navigation";

interface HomeScrollOrchestratorProps {
  banner: React.ReactNode;
  about: React.ReactNode;
  children: React.ReactNode;
}

export default function HomeScrollOrchestrator({
  banner,
  about,
  children,
}: HomeScrollOrchestratorProps) {
  const homeRef = useRef<HTMLDivElement>(null);
  const reuniteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const home = homeRef.current;
    if (!home) return;

    const updateStickyOffset = () => {
      if (window.innerWidth >= 1024) {
        home.style.removeProperty("--hero-sticky-offset");
        return;
      }

      const heroHeight = home.offsetHeight;
      const viewportHeight = window.innerHeight;

      const overflow = Math.max(0, heroHeight - viewportHeight);

      home.style.setProperty("--hero-sticky-offset", `${-overflow}px`);
    };

    const resizeObserver = new ResizeObserver(updateStickyOffset);

    resizeObserver.observe(home);
    window.addEventListener("resize", updateStickyOffset);

    updateStickyOffset();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateStickyOffset);
    };
  }, []);

  useEffect(() => {
    const home = homeRef.current;
    const reunite = reuniteRef.current;
    if (!home || !reunite) return;

    const ctx = gsap.context(() => {
      gsap.set(reunite, {
        zIndex: 2,
      });
      gsap.set(home, {
        zIndex: 1,
        y: 0,
        opacity: 1,
        pointerEvents: "auto",
      });

      const updatePointerEvents = (self: ScrollTrigger) => {
        // A scrubbed animation deliberately eases toward the scroll position.
        // At the absolute top, however, the hero must be in its exact resting
        // state immediately (especially after a fast jump from deep in-page).
        if (self.progress === 0) {
          self.getTween()?.progress(1);
          self.animation?.progress(0);
        }

        if (self.progress >= 0.85) {
          home.style.pointerEvents = "none";
          window.dispatchEvent(new CustomEvent("pause-ambient-geometry"));
        } else {
          home.style.pointerEvents = "auto";
          window.dispatchEvent(new CustomEvent("resume-ambient-geometry"));
        }
      };

      gsap
        .timeline({
          scrollTrigger: {
            trigger: reunite,
            start: "top bottom",
            end: "top 10%",
            scrub: 1.2,
            onUpdate: updatePointerEvents,
            onLeave: () => {
              home.style.pointerEvents = "none";
              window.dispatchEvent(new CustomEvent("pause-ambient-geometry"));
            },
            onEnterBack: () => {
              home.style.pointerEvents = "auto";
              window.dispatchEvent(new CustomEvent("resume-ambient-geometry"));
            },
            onRefresh: updatePointerEvents,
          },
        })
        .to(home, {
          opacity: 0,
          y: 50,
          scale: 0.95,
          ease: "power2.out",
        });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }

    try {
      const target = sessionStorage.getItem("nav_target_section");
      if (target) {
        sessionStorage.removeItem("nav_target_section");
        const timer = setTimeout(() => {
          scrollToSection(target);
        }, 350);
        return () => clearTimeout(timer);
      }
    } catch {}
  }, []);

  return (
    <div className="relative">
      <div
        ref={homeRef}
        className="home-hero-sticky sticky left-0 w-full min-h-[100dvh] lg:h-screen"
      >
        {banner}
      </div>

      <div id="about-section-wrapper" className="relative z-10 bg-black">
        <div
          ref={reuniteRef}
          className="relative z-10 bg-ink min-h-screen overflow-hidden"
        >
          {about}
        </div>
      </div>

      {children}
    </div>
  );
}
