import { useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useReducedMotion } from 'framer-motion';
import './registerMenuGsap';
import { gsap, ScrollTrigger } from './registerMenuGsap';
import {
  DESSERT_FILTER_OPTIONS,
  DESSERT_SECTIONS,
  DRINK_FILTER_OPTIONS,
  DRINK_SUBFILTER_ALL,
  DRINK_SUBSECTIONS,
  FOOD_FILTER_OPTIONS,
  FOOD_SECTIONS,
  FOOD_SUBFILTER_ALL,
  HEALTHY_FILTER_OPTIONS,
  HEALTHY_SECTIONS,
  HEALTHY_SUBFILTER_ALL,
  DESSERT_SUBFILTER_ALL,
  MAIN_MENU_TABS,
  formatItemPrice,
  getPriceTiers,
  type MainMenuTabId,
  type MenuLineItem,
  type MenuSubsection,
  type PriceTier,
} from '../../data/completeMenu';
import { media } from '../../data/pageContent';
import { getItemImage, getSectionCover, MENU_MAIN_TAB_IMAGE } from '../../data/menuMedia';
import { MenuFilterRail } from './MenuFilterRail';

function splitUsd(amount: number): { dollars: string; cents: string } {
  const [d, c] = amount.toFixed(2).split('.');
  return { dollars: d, cents: c };
}

/** Editorial price: currency + whole dollars + cents, aligned for scanability. */
function PriceFigure({ amount, size = 'md' }: { amount: number; size?: 'md' | 'lg' }) {
  const { dollars, cents } = splitUsd(amount);
  const wholeCls = size === 'lg' ? 'text-xl font-bold sm:text-2xl' : 'text-base font-bold sm:text-lg';
  const centCls = size === 'lg' ? 'text-sm font-semibold sm:text-base' : 'text-xs font-semibold sm:text-sm';
  return (
    <span className="inline-flex items-baseline justify-center gap-px tabular-nums tracking-tight text-brand">
      <span className="translate-y-px text-[0.7em] font-semibold text-brand/75">$</span>
      <span className={wholeCls}>{dollars}</span>
      <span className={`${centCls} text-brand/85`}>.{cents}</span>
    </span>
  );
}

const pricePillShell =
  'rounded-xl bg-neutral-50/90 px-3 py-3 text-center transition-colors duration-300 ease-out group-hover:bg-neutral-100/95 motion-reduce:transition-none';

function PricePill({
  tier,
  className = '',
  featured = false,
}: {
  tier: PriceTier;
  className?: string;
  featured?: boolean;
}) {
  if (featured) {
    return (
      <div
        className={`${pricePillShell} flex min-h-[5.25rem] w-full flex-row items-center justify-between gap-4 px-4 py-3 sm:px-5 ${className}`}
      >
        <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
          {tier.label}
        </span>
        <span className="shrink-0">
          <PriceFigure amount={tier.amount} size="lg" />
        </span>
      </div>
    );
  }
  return (
    <div
      className={`${pricePillShell} flex min-h-[5.25rem] flex-col items-center justify-center gap-1 px-2.5 py-3 text-center ${className}`}
    >
      <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
        {tier.label}
      </span>
      <span>
        <PriceFigure amount={tier.amount} />
      </span>
    </div>
  );
}

function PriceTierGrid({ tiers }: { tiers: PriceTier[] }) {
  if (tiers.length === 0) return null;

  const tray = (inner: ReactNode) => <div className="grid gap-2.5">{inner}</div>;

  if (tiers.length === 1) {
    return tray(
      <div className="flex justify-center">
        <PricePill tier={tiers[0]} className="w-full max-w-[12rem] sm:min-h-[5.5rem]" />
      </div>,
    );
  }
  if (tiers.length === 2) {
    return tray(
      <div className="grid grid-cols-2 gap-2">
        <PricePill tier={tiers[0]} />
        <PricePill tier={tiers[1]} />
      </div>,
    );
  }
  return tray(
    <div className="grid grid-cols-2 gap-2">
      <PricePill tier={tiers[0]} />
      <PricePill tier={tiers[1]} />
      <div className="col-span-2">
        <PricePill tier={tiers[2]} featured />
      </div>
    </div>,
  );
}

function MenuItemCard({ item }: { item: MenuLineItem }) {
  const src = item.image ?? getItemImage(item.id);
  const tiers = getPriceTiers(item.prices);
  const fallbackPrice = item.prices.mini ?? item.prices.normal ?? item.prices.maxi ?? null;
  const isChocolateFreeze = item.id === 'chocolate-freeze';
  const isCloserFreeze = item.id === 'classic-coffee-freeze' || item.id === 'caramel-crunch-freeze';

  return (
    <article
      className="menu-browse-item group mx-auto flex h-full w-full max-w-[350px] flex-col overflow-hidden rounded-2xl bg-white shadow-[0_18px_44px_-26px_rgba(0,0,0,0.16),0_8px_22px_-16px_rgba(0,0,0,0.08)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_24px_54px_-24px_rgba(0,0,0,0.14)] motion-reduce:transition-none"
      data-menu-item
    >
      <div className="relative w-full shrink-0 overflow-hidden bg-neutral-50/40">
        <div className="relative h-[220px] w-full sm:h-[235px]">
          <img
            src={src}
            alt={item.name}
            className={`h-full w-full object-contain object-center transition-transform duration-500 ease-premium group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${
              isChocolateFreeze ? 'p-6 sm:p-7' : isCloserFreeze ? 'p-2 sm:p-3' : 'p-3 sm:p-4'
            }`}
            loading="lazy"
          />
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-4 pb-5 pt-4 sm:px-5 sm:pb-6 sm:pt-5">
        <div className="flex items-start justify-between gap-3">
          <h4 className="min-w-0 flex-1 line-clamp-2 min-h-[2.9rem] font-display text-[1.08rem] font-semibold leading-snug tracking-[-0.015em] text-lux-ink sm:text-[1.16rem]">
            {item.name}
          </h4>
          <img
            src={media.logoPrimary}
            alt=""
            className="h-7 w-auto shrink-0 object-contain opacity-90 sm:h-8"
            width={30}
            height={30}
          />
        </div>
        {item.notes ? (
          <p className="mt-2.5 line-clamp-2 min-h-[2.5rem] text-center font-display text-[0.8125rem] italic leading-relaxed text-lux-stone sm:text-sm">
            {item.notes}
          </p>
        ) : null}
        <div className={`mt-4 flex-1 ${item.notes ? '' : 'mt-5'}`}>
          {tiers.length > 0 ? (
            <PriceTierGrid tiers={tiers} />
          ) : (
            <div className="flex min-h-[4.4rem] items-center justify-center rounded-xl bg-neutral-50/90 py-4">
              {fallbackPrice != null ? (
                <PriceFigure amount={fallbackPrice} size="lg" />
              ) : (
                <span className="font-inter text-sm font-medium tabular-nums text-neutral-400">
                  {formatItemPrice(item.prices) || '—'}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function SectionBlock({ section }: { section: MenuSubsection }) {
  const cover = section.image ?? getSectionCover(section.id);

  return (
    <section className="scroll-mt-28" id={`section-${section.id}`} aria-labelledby={`heading-${section.id}`}>
      <header className="menu-section-header mb-8 flex items-start gap-4 sm:mb-10 sm:items-center sm:gap-5">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-neutral-100 shadow-md ring-2 ring-white sm:h-[4.75rem] sm:w-[4.75rem]">
          <img src={cover} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="min-w-0 flex-1 border-b border-neutral-200/90 pb-5 sm:pb-6">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3
              id={`heading-${section.id}`}
              className="font-inter text-xl font-semibold tracking-[-0.03em] text-neutral-900 sm:text-2xl"
            >
              {section.title}
            </h3>
            <span className="rounded-full bg-brand/10 px-2.5 py-0.5 font-inter text-xs font-semibold tabular-nums text-brand sm:text-sm">
              {section.items.length} items
            </span>
          </div>
          <p className="mt-2 text-sm font-medium tracking-[-0.01em] text-neutral-500">
            Crafted daily with the same 99 Cafe quality standard.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] md:gap-6 xl:gap-7">
        {section.items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

function MainHubCards({
  active,
  onSelect,
  reduceMotion: _reduceMotion,
}: {
  active: MainMenuTabId;
  onSelect: (id: MainMenuTabId) => void;
  reduceMotion: boolean;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-5 lg:gap-6">
      {MAIN_MENU_TABS.map((tab) => {
        const isActive = active === tab.id;
        const img = MENU_MAIN_TAB_IMAGE[tab.id];
        return (
          <button
            key={tab.id}
            type="button"
            className={`menu-hub-card group flex min-h-[19.5rem] flex-col overflow-hidden rounded-3xl text-left ring-1 transition-shadow duration-300 sm:min-h-[21rem] sm:rounded-[1.35rem] lg:min-h-[22rem] ${
              isActive
                ? 'bg-white shadow-[0_12px_48px_-16px_rgba(0,0,0,0.18)] ring-brand/25'
                : 'bg-neutral-50/90 shadow-sm ring-black/[0.08] hover:bg-white hover:shadow-md hover:ring-black/[0.12]'
            }`}
            onClick={() => onSelect(tab.id)}
          >
            <div className="relative aspect-[16/10] overflow-hidden lg:aspect-[4/3]">
              <img
                src={img}
                alt=""
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <div
                className={`pointer-events-none absolute inset-0 ${isActive ? 'bg-transparent' : 'bg-black/[0.1]'}`}
                aria-hidden
              />
            </div>
            <div className="flex flex-1 flex-col px-5 py-5 sm:px-6 sm:py-6">
              <span
                className={`font-inter text-xl font-semibold tracking-[-0.02em] sm:text-2xl ${
                  isActive ? 'text-brand' : 'text-neutral-900'
                }`}
              >
                {tab.title}
              </span>
              <span className="mt-2.5 font-inter text-sm leading-relaxed text-neutral-500 sm:text-[15px]">
                {tab.description}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export function FullMenuBrowse() {
  const reduceMotion = useReducedMotion() ?? false;
  const [mainTab, setMainTab] = useState<MainMenuTabId>('drinks');
  const [drinkFilter, setDrinkFilter] = useState<string>(DRINK_SUBFILTER_ALL);
  const [dessertFilter, setDessertFilter] = useState<string>(DESSERT_SUBFILTER_ALL);
  const [foodFilter, setFoodFilter] = useState<string>(FOOD_SUBFILTER_ALL);
  const [healthyFilter, setHealthyFilter] = useState<string>(HEALTHY_SUBFILTER_ALL);

  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const setMain = (id: MainMenuTabId) => {
    setMainTab(id);
    setDrinkFilter(DRINK_SUBFILTER_ALL);
    setDessertFilter(DESSERT_SUBFILTER_ALL);
    setFoodFilter(FOOD_SUBFILTER_ALL);
    setHealthyFilter(HEALTHY_SUBFILTER_ALL);
  };

  const visibleSections: MenuSubsection[] = useMemo(() => {
    if (mainTab === 'drinks') {
      if (drinkFilter === DRINK_SUBFILTER_ALL) return DRINK_SUBSECTIONS;
      return DRINK_SUBSECTIONS.filter((s) => s.id === drinkFilter);
    }
    if (mainTab === 'desserts') {
      if (dessertFilter === DESSERT_SUBFILTER_ALL) return DESSERT_SECTIONS;
      return DESSERT_SECTIONS.filter((s) => s.id === dessertFilter);
    }
    if (mainTab === 'food') {
      if (foodFilter === FOOD_SUBFILTER_ALL) return FOOD_SECTIONS;
      return FOOD_SECTIONS.filter((s) => s.id === foodFilter);
    }
    if (healthyFilter === HEALTHY_SUBFILTER_ALL) return HEALTHY_SECTIONS;
    return HEALTHY_SECTIONS.filter((s) => s.id === healthyFilter);
  }, [mainTab, drinkFilter, dessertFilter, foodFilter, healthyFilter]);

  const sectionsKey = visibleSections.map((s) => s.id).join('|');

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const title = root.querySelector('.menu-browse-title');
    const hubs = root.querySelectorAll('.menu-hub-card');
    const targets: Element[] = [title, ...hubs].filter(Boolean) as Element[];

    if (reduceMotion) {
      gsap.set(targets, { opacity: 1, y: 0, clearProps: 'all' });
      return;
    }

    gsap.set(targets, { opacity: 0, y: 28 });
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    if (title) tl.to(title, { opacity: 1, y: 0, duration: 0.55 }, 0);
    if (hubs.length) tl.to(hubs, { opacity: 1, y: 0, duration: 0.6, stagger: 0.09 }, 0.08);

    return () => {
      tl.kill();
      gsap.set(targets, { opacity: 1, y: 0, clearProps: 'opacity,transform' });
    };
  }, [reduceMotion]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (reduceMotion) {
      const panel = panelRef.current;
      if (panel) gsap.set(panel, { clearProps: 'opacity,transform' });
      gsap.set(root.querySelectorAll('.menu-browse-item, .menu-section-header'), { clearProps: 'all' });
      gsap.set(root.querySelectorAll('.menu-browse-below-fold'), { clearProps: 'transform' });
      return;
    }

    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      if (panel) {
        gsap.fromTo(
          panel,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: 'power2.out',
            onComplete: () => ScrollTrigger.refresh(),
          },
        );
      }

      const belowFold = root.querySelector('.menu-browse-below-fold');
      if (belowFold) {
        gsap.fromTo(
          belowFold,
          { y: 40 },
          {
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: belowFold,
              start: 'top 91%',
              end: 'top 62%',
              scrub: 1.22,
            },
          },
        );
      }

      const headers = root.querySelectorAll('.menu-section-header');
      const items = root.querySelectorAll('.menu-browse-item');
      gsap.set(headers, { autoAlpha: 0, x: -36 });
      gsap.set(items, { autoAlpha: 0, y: 48, scale: 0.96 });

      ScrollTrigger.batch(headers, {
        interval: 0.12,
        batchMax: 8,
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            x: 0,
            duration: 0.68,
            stagger: 0.1,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        },
        start: 'top 88%',
        once: true,
      });

      ScrollTrigger.batch(items, {
        interval: 0.06,
        batchMax: 10,
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: { each: 0.042 },
            ease: 'power2.out',
            overwrite: 'auto',
          });
        },
        start: 'top 92%',
        once: true,
      });
    }, root);

    return () => {
      ctx.revert();
    };
  }, [mainTab, sectionsKey, reduceMotion]);

  return (
    <div ref={rootRef} className="mx-auto max-w-6xl bg-white px-4 pb-20 pt-8 sm:px-6 sm:pb-24 sm:pt-10">
      <header className="mb-8 border-b border-neutral-200/80 pb-6 sm:mb-10 sm:pb-7">
        <p className="mb-2 font-inter text-[11px] font-semibold uppercase tracking-[0.24em] text-neutral-500">
          Signature menu
        </p>
        <h2 className="menu-browse-title font-inter text-2xl font-semibold tracking-[-0.04em] text-neutral-900 sm:text-3xl">
          <span className="text-brand">Menu</span>
        </h2>
        <p className="mt-2 max-w-2xl font-inter text-sm leading-relaxed text-neutral-500 sm:text-[15px]">
          Explore a refined selection of drinks, desserts, food and healthy options curated for a premium 99 Cafe
          experience.
        </p>
      </header>

      <MainHubCards active={mainTab} onSelect={setMain} reduceMotion={reduceMotion} />

      <div className="menu-browse-below-fold mt-12 border-t border-neutral-200/80 pt-10 sm:mt-14 sm:pt-12">
        <div key={mainTab} ref={panelRef} className="menu-tab-panel">
          {mainTab === 'drinks' ? (
            <div className="mb-10">
              <MenuFilterRail
                key="drinks-rail"
                options={DRINK_FILTER_OPTIONS}
                value={drinkFilter}
                onChange={setDrinkFilter}
                mainTab="drinks"
                reduceMotion={reduceMotion}
              />
            </div>
          ) : null}
          {mainTab === 'desserts' ? (
            <div className="mb-10">
              <MenuFilterRail
                key="desserts-rail"
                options={DESSERT_FILTER_OPTIONS}
                value={dessertFilter}
                onChange={setDessertFilter}
                mainTab="desserts"
                reduceMotion={reduceMotion}
              />
            </div>
          ) : null}
          {mainTab === 'food' ? (
            <div className="mb-10">
              <MenuFilterRail
                key="food-rail"
                options={FOOD_FILTER_OPTIONS}
                value={foodFilter}
                onChange={setFoodFilter}
                mainTab="food"
                reduceMotion={reduceMotion}
              />
            </div>
          ) : null}
          {mainTab === 'healthy' ? (
            <div className="mb-10">
              <MenuFilterRail
                key="healthy-rail"
                options={HEALTHY_FILTER_OPTIONS}
                value={healthyFilter}
                onChange={setHealthyFilter}
                mainTab="healthy"
                reduceMotion={reduceMotion}
              />
            </div>
          ) : null}

          <div className="flex flex-col gap-14 sm:gap-20">
            {visibleSections.map((section) => (
              <SectionBlock key={section.id} section={section} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
