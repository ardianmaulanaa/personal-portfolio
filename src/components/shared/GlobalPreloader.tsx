'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';

export default function GlobalPreloader({ onComplete }: { onComplete?: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const started = performance.now();
    let frame = 0;
    const tick = () => {
      const value = Math.min(100, ((performance.now() - started) / 950) * 100);
      setProgress(value);
      if (value < 100) frame = requestAnimationFrame(tick);
      else if (root.current) {
        try { sessionStorage.setItem('preloader-seen', '1'); } catch {}
        gsap.timeline({ onComplete }).to('.preloader-node', { scale: 1, duration: .25, stagger: .08, ease: 'back.out(2)' }).to(root.current, { clipPath: 'inset(0 0 100% 0)', duration: .8, ease: 'power4.inOut' }, '+=.12');
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onComplete]);
  return <div ref={root} className="fixed inset-0 z-[99999] bg-[#0D1525] text-[#F3F6FA] flex flex-col items-center justify-center" style={{clipPath:'inset(0 0 0 0)'}}>
    <div className="relative w-48 h-28" aria-label="Loading Ardian portfolio">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 192 112"><path d="M24 80 L74 30 L116 74 L168 24" fill="none" stroke="#293B55"/><path d="M24 80 L74 30 L116 74 L168 24" fill="none" stroke="#93C5FD" strokeDasharray="220" strokeDashoffset={220-(220*progress/100)}/></svg>
      {[[24,80],[74,30],[116,74],[168,24]].map(([x,y],i)=><i key={i} className="preloader-node absolute w-2 h-2 bg-[#93C5FD] rounded-full opacity-0" style={{left:x-4,top:y-4}}/>)}
      <strong className="absolute inset-0 grid place-items-center font-display text-4xl tracking-[-.08em]">AM<span className="text-[#93C5FD]">.</span></strong>
    </div>
    <div className="mt-6 w-48 flex justify-between font-mono text-[10px] tracking-[.15em] text-[#A2B3C8]"><span>SYSTEM BOOT</span><span>{Math.round(progress).toString().padStart(3,'0')}%</span></div>
  </div>;
}
