import { useEffect, useMemo, useRef, type ReactNode, type ElementType } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

type ScrollRevealProps = {
  children: ReactNode;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  scrub?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
  as?: ElementType;
};

export default function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.24,
  baseRotation = 1,
  blurStrength = 2.5,
  scrub = 1.25,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom 40%',
  wordAnimationEnd = 'bottom 55%',
  as: Tag = 'div',
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  const isText = typeof children === 'string';

  const splitText = useMemo(() => {
    if (!isText) return children;

    return children.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={index}>
          {word}
        </span>
      );
    });
  }, [children, isText]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;
    const ctx = gsap.context(() => {
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const baseFrom = prefersReducedMotion
        ? { opacity: 1, y: 0, rotate: 0, filter: 'blur(0px)' }
        : { opacity: baseOpacity, y: 24, rotate: baseRotation, filter: enableBlur ? `blur(${blurStrength}px)` : 'none' };

      const baseTo = prefersReducedMotion
        ? { opacity: 1, y: 0, rotate: 0, filter: 'blur(0px)' }
        : { opacity: 1, y: 0, rotate: 0, filter: 'blur(0px)' };

      gsap.fromTo(
        el,
        baseFrom,
        {
          ...baseTo,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top 92%',
            end: rotationEnd,
            scrub,
          },
        }
      );

      if (!isText) return;

      const wordElements = el.querySelectorAll('.word');

      if (!wordElements.length) return;

      const wordFrom = prefersReducedMotion
        ? { opacity: 1, y: 0, filter: 'blur(0px)' }
        : { opacity: baseOpacity, y: 16, filter: enableBlur ? `blur(${blurStrength}px)` : 'none', willChange: 'opacity, transform, filter' };

      const wordTo = prefersReducedMotion
        ? { opacity: 1, y: 0, filter: 'blur(0px)' }
        : { opacity: 1, y: 0, filter: 'blur(0px)' };

      gsap.fromTo(
        wordElements,
        wordFrom,
        {
          ...wordTo,
          ease: 'power3.out',
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top 92%',
            end: wordAnimationEnd,
            scrub,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
    isText,
  ]);

  return (
    <Tag ref={containerRef as never} className={`scroll-reveal ${containerClassName}`.trim()}>
      {isText ? <span className={`scroll-reveal-text ${textClassName}`.trim()}>{splitText}</span> : splitText}
    </Tag>
  );
}
