import { memo, useCallback, useEffect, useId, useRef, useState } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import type { HotDrinkItem } from '../../data/hotDrinksCatalog';
import {
  PULL_THRESHOLD,
  blendNext,
  blendPrev,
  clampPull,
  easeOutCubic,
  easeOutQuart,
  shouldCommitNext,
  shouldCommitPrev,
  splitPriceForDisplay,
} from './focalShelfMath';
import './FocalParallaxShelf.css';

export type FocalParallaxShelfProps = {
  items: readonly HotDrinkItem[];
  className?: string;
};

const DRAG_SLOP_PX = 12;
const WHEEL_GAIN = 0.46;

function FocalParallaxShelfInner({ items, className = '' }: FocalParallaxShelfProps) {
  const uid = useId();
  const stageRef = useRef<HTMLDivElement>(null);
  const pullRef = useRef(0);
  const pointerIdRef = useRef<number | null>(null);
  const startRef = useRef({ x: 0, y: 0 });
  const axisRef = useRef<'none' | 'horizontal' | 'vertical'>('none');
  const wheelResetTimerRef = useRef<number | undefined>(undefined);
  const animRafRef = useRef<number | null>(null);

  const [index, setIndex] = useState(0);
  const [pull, setPull] = useState(0);
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const n = items.length;
  const safeIndex = n > 0 ? index % n : 0;
  const current = n > 0 ? items[safeIndex] : null;
  const nextItem = n > 0 ? items[(safeIndex + 1) % n] : null;
  const prevItem = n > 0 ? items[(safeIndex - 1 + n) % n] : null;

  const pNext = blendNext(pull);
  const pPrev = blendPrev(pull);

  useEffect(() => {
    pullRef.current = pull;
  }, [pull]);

  useEffect(() => {
    if (n === 0) return;
    setIndex((i) => Math.min(i, n - 1));
  }, [n]);

  const applyPull = useCallback((value: number) => {
    const c = clampPull(value);
    pullRef.current = c;
    setPull(c);
  }, []);

  const cancelPullAnimation = useCallback(() => {
    if (animRafRef.current !== null) {
      cancelAnimationFrame(animRafRef.current);
      animRafRef.current = null;
    }
  }, []);

  const animatePull = useCallback(
    (from: number, to: number, durationMs: number, ease: (t: number) => number, onComplete?: () => void) => {
      if (reduceMotion) {
        applyPull(to);
        onComplete?.();
        return;
      }
      cancelPullAnimation();
      applyPull(from);
      const t0 = performance.now();
      const tick = (now: number) => {
        const u = Math.min(1, (now - t0) / durationMs);
        const v = from + (to - from) * ease(u);
        applyPull(v);
        if (u < 1) {
          animRafRef.current = requestAnimationFrame(tick);
        } else {
          animRafRef.current = null;
          applyPull(to);
          onComplete?.();
        }
      };
      animRafRef.current = requestAnimationFrame(tick);
    },
    [applyPull, cancelPullAnimation, reduceMotion],
  );

  const clearWheelResetTimer = useCallback(() => {
    if (wheelResetTimerRef.current !== undefined) {
      window.clearTimeout(wheelResetTimerRef.current);
      wheelResetTimerRef.current = undefined;
    }
  }, []);

  const scheduleWheelPullReset = useCallback(() => {
    clearWheelResetTimer();
    wheelResetTimerRef.current = window.setTimeout(() => {
      const from = pullRef.current;
      if (Math.abs(from) < 1.25) {
        applyPull(0);
      } else {
        animatePull(from, 0, 340, easeOutQuart);
      }
      wheelResetTimerRef.current = undefined;
    }, 260);
  }, [animatePull, applyPull, clearWheelResetTimer]);

  const advanceNext = useCallback(() => {
    if (n < 2) return;
    setIndex((i) => (i + 1) % n);
  }, [n]);

  const advancePrev = useCallback(() => {
    if (n < 2) return;
    setIndex((i) => (i - 1 + n) % n);
  }, [n]);

  const runCommitNextSequence = useCallback(() => {
    const from = clampPull(pullRef.current);
    cancelPullAnimation();
    const outTarget = -PULL_THRESHOLD * 1.02;
    animatePull(from, outTarget, 220, easeOutCubic, () => {
      advanceNext();
      // keep same pull direction to avoid a visual "flip" on peeks/blur
      const settle = -PULL_THRESHOLD * 0.08;
      applyPull(settle);
      animatePull(settle, 0, 360, easeOutQuart);
    });
  }, [advanceNext, animatePull, applyPull, cancelPullAnimation]);

  const runCommitPrevSequence = useCallback(() => {
    const from = clampPull(pullRef.current);
    cancelPullAnimation();
    const outTarget = PULL_THRESHOLD * 1.02;
    animatePull(from, outTarget, 220, easeOutCubic, () => {
      advancePrev();
      // keep same pull direction to avoid a visual "flip" on peeks/blur
      const settle = PULL_THRESHOLD * 0.08;
      applyPull(settle);
      animatePull(settle, 0, 360, easeOutQuart);
    });
  }, [advancePrev, animatePull, applyPull, cancelPullAnimation]);

  const releasePointer = useCallback(() => {
    const pid = pointerIdRef.current;
    if (pid !== null && stageRef.current?.hasPointerCapture(pid)) {
      try {
        stageRef.current.releasePointerCapture(pid);
      } catch {
        /* قد يكون المؤشر مُطلَقاً مسبقاً */
      }
    }
    pointerIdRef.current = null;
    axisRef.current = 'none';
  }, []);

  const endHorizontalDrag = useCallback(() => {
    const p = pullRef.current;
    releasePointer();
    if (shouldCommitNext(p)) {
      runCommitNextSequence();
    } else if (shouldCommitPrev(p)) {
      runCommitPrevSequence();
    } else {
      animatePull(p, 0, 460, easeOutQuart);
    }
  }, [animatePull, releasePointer, runCommitNextSequence, runCommitPrevSequence]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (n < 2 || e.button !== 0) return;
      cancelPullAnimation();
      pointerIdRef.current = e.pointerId;
      startRef.current = { x: e.clientX, y: e.clientY };
      axisRef.current = 'none';
      clearWheelResetTimer();
    },
    [n, cancelPullAnimation, clearWheelResetTimer],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (pointerIdRef.current !== e.pointerId || n < 2) return;
      const dx = e.clientX - startRef.current.x;
      const dy = e.clientY - startRef.current.y;

      if (axisRef.current === 'none') {
        if (Math.abs(dx) < DRAG_SLOP_PX && Math.abs(dy) < DRAG_SLOP_PX) return;
        if (Math.abs(dy) >= Math.abs(dx)) {
          axisRef.current = 'vertical';
          pointerIdRef.current = null;
          return;
        }
        axisRef.current = 'horizontal';
        stageRef.current?.setPointerCapture(e.pointerId);
      }

      if (axisRef.current !== 'horizontal') return;
      applyPull(e.clientX - startRef.current.x);
    },
    [n, applyPull],
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (pointerIdRef.current !== e.pointerId) return;
      if (axisRef.current === 'horizontal') {
        endHorizontalDrag();
      } else {
        releasePointer();
      }
    },
    [endHorizontalDrag, releasePointer],
  );

  const onPointerCancel = useCallback(
    (e: React.PointerEvent) => {
      if (pointerIdRef.current !== e.pointerId) return;
      releasePointer();
      const p = pullRef.current;
      cancelPullAnimation();
      animatePull(p, 0, 300, easeOutQuart);
    },
    [animatePull, cancelPullAnimation, releasePointer],
  );

  useEffect(() => {
    const el = stageRef.current;
    if (!el || n < 2) return;

    const onWheel = (e: WheelEvent) => {
      const dominant = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(dominant) < 0.35) return;
      e.preventDefault();
      cancelPullAnimation();

      const next = clampPull(pullRef.current + dominant * WHEEL_GAIN);
      pullRef.current = next;
      setPull(next);

      if (shouldCommitNext(next)) {
        clearWheelResetTimer();
        runCommitNextSequence();
        return;
      }
      if (shouldCommitPrev(next)) {
        clearWheelResetTimer();
        runCommitPrevSequence();
        return;
      }
      scheduleWheelPullReset();
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      clearWheelResetTimer();
    };
  }, [n, cancelPullAnimation, clearWheelResetTimer, runCommitNextSequence, runCommitPrevSequence, scheduleWheelPullReset]);

  useEffect(() => () => cancelPullAnimation(), [cancelPullAnimation]);

  const priceParts = current ? splitPriceForDisplay(current.price) : { main: '', cents: '' };
  const arcCurrent = current?.arcColor ?? 'rgba(225,29,46,0.35)';
  const arcNext = nextItem?.arcColor ?? arcCurrent;
  const arcPrev = prevItem?.arcColor ?? arcCurrent;

  const peekNextStyle = reduceMotion
    ? undefined
    : {
        transform: `
          translate3d(
            calc(${8 - 58 * pNext}% + ${pull * 0.26}px),
            calc(${14 - 36 * pNext}%),
            0
          )
          scale(${0.42 + 0.58 * pNext})
        `,
        filter: `blur(${12.5 * (1 - pNext)}px) grayscale(${0.65 * (1 - pNext)}) saturate(${0.3 + 0.7 * pNext})`,
        opacity: 0.62 + 0.38 * pNext,
      };

  const peekPrevStyle = reduceMotion
    ? undefined
    : {
        transform: `
          translate3d(
            calc(${-12 + 50 * pPrev}% + ${pull * 0.2}px),
            calc(${10 - 28 * pPrev}%),
            0
          )
          scale(${0.44 + 0.56 * pPrev})
        `,
        filter: `blur(${10.5 * (1 - pPrev)}px) grayscale(${0.68 * (1 - pPrev)}) saturate(${0.32 + 0.68 * pPrev})`,
        opacity: 0.55 + 0.45 * pPrev,
      };

  const currentStyle = reduceMotion
    ? undefined
    : {
        transform: `
          translate3d(${pull * 0.46}px, ${6 * pNext + 5 * pPrev}px, 0)
          scale(${1 - 0.11 * pNext - 0.09 * pPrev})
        `,
        filter: `blur(${6.5 * Math.max(pNext, pPrev)}px) grayscale(${0.5 * Math.max(pNext, pPrev)}) saturate(${1 - 0.42 * Math.max(pNext, pPrev)})`,
      };

  return (
    <div className={`focal-shelf ${className}`.trim()}>
      <div
        ref={stageRef}
        className="focal-shelf__stage"
        tabIndex={n > 1 ? 0 : undefined}
        role="region"
        aria-roledescription="carousel"
        aria-label="Product shelf, drag horizontally for next or previous"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        {n > 1 && prevItem && pPrev > 0.02 && (
          <div className="focal-shelf__peek focal-shelf__peek--prev" aria-hidden="true" style={peekPrevStyle}>
            <div
              className="focal-shelf__peek-arch"
              style={{
                background: `linear-gradient(180deg, ${arcPrev} 0%, ${arcPrev}cc 50%, transparent 100%)`,
                opacity: 0.35 + 0.45 * pPrev,
              }}
            />
            <img src={prevItem.imageSrc} alt="" draggable={false} loading="lazy" />
          </div>
        )}

        {current && (
          <div
            className="focal-shelf__current"
            id={`${uid}-slide-${current.id}`}
            style={currentStyle}
          >
            <div className="focal-shelf__arch-wrap" aria-hidden="true">
              <div
                className="focal-shelf__arch"
                style={{
                  background: `linear-gradient(180deg, ${arcCurrent} 0%, ${arcCurrent}dd 55%, transparent 100%)`,
                  opacity: 0.88 - 0.33 * Math.max(pNext, pPrev),
                  transform: `scaleX(${0.95 + 0.05 * (1 - Math.max(pNext, pPrev))}) scaleY(${0.96 + 0.04 * (1 - Math.max(pNext, pPrev))})`,
                }}
              />
            </div>
            <div className="focal-shelf__img-wrap">
              <img className="focal-shelf__img" src={current.imageSrc} alt="" draggable={false} loading="eager" />
            </div>
          </div>
        )}

        {n > 1 && nextItem && (
          <div className="focal-shelf__peek focal-shelf__peek--next" aria-hidden="true" style={peekNextStyle}>
            <div
              className="focal-shelf__peek-arch"
              style={{
                background: `linear-gradient(180deg, ${arcNext} 0%, ${arcNext}cc 50%, transparent 100%)`,
                opacity: 0.28 + 0.55 * pNext,
              }}
            />
            <img src={nextItem.imageSrc} alt="" draggable={false} loading="lazy" />
          </div>
        )}
      </div>

      {current && (
        <div className="focal-shelf__caption" aria-live="polite" key={current.id}>
          <div className="focal-shelf__caption-inner">
            <p className="focal-shelf__name">{(current.shelfTitle ?? current.title).toUpperCase()}</p>
            <p className="focal-shelf__price-row">
              <span className="focal-shelf__price-main">{priceParts.main}</span>
              {priceParts.cents ? <span className="focal-shelf__price-cents">{priceParts.cents}</span> : null}
              <span className="focal-shelf__each"> EACH</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

const FocalParallaxShelf = memo(FocalParallaxShelfInner);
export default FocalParallaxShelf;
