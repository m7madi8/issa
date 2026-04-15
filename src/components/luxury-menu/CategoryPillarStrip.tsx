import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { luxuryMenuCategories } from '../../data/luxuryMenuCategories';
import { CategoryPillarCard } from './CategoryPillarCard';

type CategoryPillarStripProps = {
  reduceMotion: boolean;
};

export function CategoryPillarStrip({ reduceMotion }: CategoryPillarStripProps) {
  const containerVariants = useMemo(
    () => ({
      hidden: {},
      show: {
        transition: {
          staggerChildren: reduceMotion ? 0 : 0.11,
          delayChildren: reduceMotion ? 0 : 0.12,
        },
      },
    }),
    [reduceMotion]
  );

  return (
    <section className="relative -mt-16 px-0 pb-16 pt-4 sm:-mt-20 sm:pb-20" aria-labelledby="menu-categories-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 flex flex-col gap-2 sm:mb-10">
          <h2
            id="menu-categories-heading"
            className="font-inter text-2xl font-bold tracking-tight text-lux-ink sm:text-3xl"
          >
            Choose a category
          </h2>
          <p className="max-w-xl font-inter text-sm font-medium text-lux-stone">
            Scroll horizontally — each column is a doorway into the menu.
          </p>
        </div>
      </div>

      <div
        className="flex gap-4 overflow-x-auto px-4 pb-2 pt-1 [scrollbar-width:thin] sm:gap-5 sm:px-6 md:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <motion.div
          className="flex min-w-min flex-row gap-4 sm:gap-5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          variants={containerVariants}
        >
          {luxuryMenuCategories.map((cat) => (
            <CategoryPillarCard key={cat.id} category={cat} reduceMotion={reduceMotion} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
