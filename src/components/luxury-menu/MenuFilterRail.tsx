import { useLayoutEffect, useRef, useEffect } from 'react';
import './registerMenuGsap';
import gsap from 'gsap';
import { Draggable, InertiaPlugin, Observer } from 'gsap/all';
import { getAllFilterCover, getSectionCover } from '../../data/menuMedia';
import type { MainMenuTabId } from '../../data/completeMenu';

gsap.registerPlugin(Draggable, InertiaPlugin, Observer);

type FilterOption = { id: string; label: string };

type MenuFilterRailProps = {
  options: FilterOption[];
  value: string;
  onChange: (id: string) => void;
  mainTab: MainMenuTabId;
  reduceMotion: boolean;
};

function centerTrackOnCard(
  viewport: HTMLElement,
  track: HTMLElement,
  button: HTMLElement | undefined,
  draggable: Draggable | undefined,
  instant: boolean,
) {
  const minX = Math.min(0, viewport.clientWidth - track.scrollWidth);
  let targetX = 0;
  if (button) {
    const vRect = viewport.getBoundingClientRect();
    const bRect = button.getBoundingClientRect();
    const curX = (gsap.getProperty(track, 'x') as number) || 0;
    const diff = bRect.left + bRect.width / 2 - (vRect.left + vRect.width / 2);
    targetX = gsap.utils.clamp(minX, 0, curX - diff);
  }
  gsap.to(track, {
    x: targetX,
    duration: instant ? 0 : 0.55,
    ease: 'power3.out',
    onUpdate: () => {
      draggable?.update(true);
    },
  });
}

export function MenuFilterRail({ options, value, onChange, mainTab, reduceMotion }: MenuFilterRailProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const draggersRef = useRef<Draggable[]>([]);
  const wheelTweenRef = useRef<gsap.core.Tween | null>(null);
  const skipNextValueAnim = useRef(true);

  useLayoutEffect(() => {
    const vp = viewportRef.current;
    const tr = trackRef.current;
    if (!vp || !tr) return;

    gsap.set(tr, { x: 0 });
    skipNextValueAnim.current = true;

    const minXInit = Math.min(0, vp.clientWidth - tr.scrollWidth);
    const d = Draggable.create(tr, {
      type: 'x',
      inertia: !reduceMotion,
      bounds: { minX: minXInit, maxX: 0 },
      edgeResistance: 0.72,
      allowNativeTouchScrolling: true,
      minimumMovement: 5,
      zIndexBoost: false,
    });
    draggersRef.current = d;
    const inst = d[0];

    const obs = Observer.create({
      target: vp,
      type: 'wheel',
      preventDefault: true,
      tolerance: 8,
      onWheel: (self) => {
        const combined = self.deltaY + self.deltaX;
        if (Math.abs(combined) < 0.5) return;
        wheelTweenRef.current?.kill();
        const cur = (gsap.getProperty(tr, 'x') as number) || 0;
        const minX = Math.min(0, vp.clientWidth - tr.scrollWidth);
        const factor = reduceMotion ? 0.85 : 0.5;
        const next = gsap.utils.clamp(minX, 0, cur - combined * factor);
        if (reduceMotion) {
          gsap.set(tr, { x: next });
          inst.update(true);
          return;
        }
        wheelTweenRef.current = gsap.to(tr, {
          x: next,
          duration: 0.45,
          ease: 'power3.out',
          overwrite: 'auto',
          onUpdate: () => {
            inst.update(true);
          },
        });
      },
    });
    const applyBounds = () => {
      const minX = Math.min(0, vp.clientWidth - tr.scrollWidth);
      inst.applyBounds({ minX, maxX: 0 });
      const x = (gsap.getProperty(tr, 'x') as number) || 0;
      if (x < minX) gsap.set(tr, { x: minX });
      if (x > 0) gsap.set(tr, { x: 0 });
      inst.update(true);
    };

    const ro = new ResizeObserver(() => applyBounds());
    ro.observe(vp);
    ro.observe(tr);
    applyBounds();

    queueMicrotask(() => {
      const btn = cardRefs.current.get(value);
      centerTrackOnCard(vp, tr, btn, inst, true);
    });

    return () => {
      ro.disconnect();
      obs.kill();
      d.forEach((dr) => dr.kill());
      wheelTweenRef.current?.kill();
      wheelTweenRef.current = null;
      gsap.set(tr, { clearProps: 'transform' });
      draggersRef.current = [];
    };
    // `value` is centered in a separate effect so Draggable is not recreated on each selection
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, mainTab, reduceMotion]);

  useEffect(() => {
    if (skipNextValueAnim.current) {
      skipNextValueAnim.current = false;
      return;
    }
    const vp = viewportRef.current;
    const tr = trackRef.current;
    const inst = draggersRef.current[0];
    if (!vp || !tr) return;
    const btn = cardRefs.current.get(value);
    centerTrackOnCard(vp, tr, btn, inst, reduceMotion);
  }, [value, reduceMotion]);

  return (
    <div className="relative -mx-4 sm:mx-0">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent sm:w-12"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent sm:w-12"
        aria-hidden
      />

      <div
        ref={viewportRef}
        className="touch-pan-y overflow-hidden px-4 sm:px-0"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
        }}
      >
        <div
          ref={trackRef}
          className="flex w-max cursor-grab gap-4 pb-2 pt-1 active:cursor-grabbing sm:gap-5"
          role="tablist"
          aria-label="Section filters"
        >
          {options.map((opt) => {
            const active = value === opt.id;
            const src = opt.id === 'all' ? getAllFilterCover(mainTab) : getSectionCover(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                role="tab"
                aria-selected={active}
                ref={(el) => {
                  if (el) cardRefs.current.set(opt.id, el);
                  else cardRefs.current.delete(opt.id);
                }}
                onClick={() => onChange(opt.id)}
                className={`group flex w-[9.75rem] shrink-0 flex-col overflow-hidden rounded-[1.2rem] bg-white text-left shadow-[0_10px_26px_-16px_rgba(0,0,0,0.12)] transition-[transform,box-shadow,ring-color] duration-300 sm:w-[10.75rem] sm:rounded-[1.3rem] ${
                  active
                    ? 'ring-[3px] ring-brand ring-offset-2 ring-offset-white'
                    : 'ring-1 ring-neutral-200/90 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-16px_rgba(0,0,0,0.15)]'
                }`}
              >
                <div className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden bg-gradient-to-b from-neutral-100/95 via-white to-neutral-100/90 p-2.5 sm:p-3">
                  <img
                    src={src}
                    alt=""
                    className="max-h-full max-w-full object-contain object-center transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    loading="lazy"
                  />
                </div>
                <div className="border-t border-neutral-100/90 bg-white px-2.5 py-2.5 sm:px-3 sm:py-3">
                  <span className="line-clamp-2 min-h-[2rem] text-left font-inter text-[11px] font-semibold leading-[1.3] tracking-[-0.015em] text-neutral-900 sm:text-[12px]">
                    {opt.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
