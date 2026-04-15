import { useLayoutEffect, useRef } from 'react';
import './registerMenuGsap';
import { gsap, ScrollTrigger } from './registerMenuGsap';
import { brandMotto } from '../../data/pageContent';

/** Place `homee.jpg` in `public/img/` (served as `/img/homee.jpg`). */
const HERO_IMAGE = '/img/homee.jpg';

type LuxuryMenuHeroProps = {
  reduceMotion: boolean;
};

export function LuxuryMenuHero({ reduceMotion }: LuxuryMenuHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const mottoRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (reduceMotion) {
      gsap.set([bgRef.current, contentRef.current, eyebrowRef.current, titleRef.current, subRef.current, mottoRef.current], {
        clearProps: 'all',
      });
      return;
    }

    const ctx = gsap.context(() => {
      const bg = bgRef.current;
      const content = contentRef.current;
      const lines = [eyebrowRef.current, titleRef.current, subRef.current, mottoRef.current].filter(Boolean);

      if (bg) {
        gsap.fromTo(bg, { scale: 1.12, opacity: 0.88 }, { scale: 1.04, opacity: 1, duration: 1.4, ease: 'power2.out' });
        gsap.fromTo(
          bg,
          { y: -26 },
          {
            y: 52,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.45,
            },
          },
        );
      }

      if (content) {
        gsap.fromTo(
          content,
          { y: 0 },
          {
            y: -36,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.65,
            },
          },
        );
      }

      gsap.from(lines, {
        opacity: 0,
        y: 36,
        duration: 0.75,
        stagger: 0.11,
        ease: 'power3.out',
        delay: 0.15,
      });
    }, section);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[62vh] overflow-hidden sm:min-h-[68vh]"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          ref={bgRef}
          className="absolute inset-[-12%] bg-cover bg-center will-change-transform"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-white" aria-hidden="true" />

      <div
        ref={contentRef}
        className="relative mx-auto flex min-h-[58vh] max-w-4xl flex-col items-center justify-center px-5 pb-14 pt-10 text-center sm:min-h-[64vh] sm:pb-16 sm:pt-14 will-change-transform"
      >
        <p
          ref={eyebrowRef}
          className="mb-3 font-inter text-[11px] font-semibold uppercase tracking-[0.35em] text-white/80"
        >
          <span className="text-brand">99</span> Cafe · Menu
        </p>

        <h1
          ref={titleRef}
          className="font-display text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          Browse first.
        </h1>

        <p
          ref={subRef}
          className="mt-5 max-w-sm font-inter text-sm font-medium text-white/85 sm:text-base"
        >
          Photos & prices — same standard, every store.
        </p>

        <p
          ref={mottoRef}
          className="mt-8 font-inter text-sm font-bold uppercase tracking-[0.12em] text-brand drop-shadow-sm sm:text-base"
          aria-label="Brand motto"
        >
          {brandMotto}
        </p>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white via-white/90 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
