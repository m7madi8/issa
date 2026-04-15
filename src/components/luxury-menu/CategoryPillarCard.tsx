import { motion, type Variants } from 'framer-motion';
import type { LuxuryCategory } from '../../data/luxuryMenuCategories';

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const instantVariants: Variants = {
  hidden: { opacity: 1, y: 0, scale: 1 },
  show: { opacity: 1, y: 0, scale: 1 },
};

export type CategoryPillarCardProps = {
  category: LuxuryCategory;
  reduceMotion: boolean;
  onExplore?: (id: string) => void;
};

export function CategoryPillarCard({ category, reduceMotion, onExplore }: CategoryPillarCardProps) {
  const variants = reduceMotion ? instantVariants : cardVariants;

  return (
    <motion.article
      variants={variants}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -10,
              scale: 1.02,
              transition: { type: 'spring', stiffness: 380, damping: 26 },
            }
      }
      className="group relative flex w-[200px] shrink-0 flex-col overflow-hidden rounded-[2rem] border border-white/10 shadow-luxcard sm:w-[228px] md:w-[248px]"
      style={{ background: category.gradient }}
    >
      <div className="relative z-[1] flex flex-1 flex-col px-5 pb-4 pt-7">
        <h2 className="font-inter text-2xl font-bold leading-tight text-white sm:text-[1.65rem]">
          {category.title}
        </h2>
        <p className="mt-1.5 font-inter text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">
          {category.tagline}
        </p>
      </div>

      <div className="relative flex flex-1 items-end justify-center px-3 pb-6 pt-2">
        <div
          className="pointer-events-none absolute inset-x-4 bottom-8 h-24 rounded-[100%] bg-black/25 blur-2xl"
          aria-hidden="true"
        />
        <img
          src={category.image}
          alt={category.title}
          className="relative z-[1] max-h-[200px] w-full object-contain object-bottom drop-shadow-[0_24px_48px_rgba(0,0,0,0.35)] transition-transform duration-500 ease-premium group-hover:scale-[1.06] group-hover:-translate-y-1 sm:max-h-[220px]"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="relative z-[2] p-4 pt-0">
        <button
          type="button"
          onClick={() => onExplore?.(category.id)}
          className="w-full rounded-full border border-white/25 bg-white/15 px-4 py-2.5 text-center font-inter text-sm font-semibold text-white shadow-sm backdrop-blur-md transition-colors hover:bg-white/25"
        >
          {category.cta}
        </button>
      </div>
    </motion.article>
  );
}
