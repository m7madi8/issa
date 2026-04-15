import { motion } from 'framer-motion';

const links = [
  { href: '/franchise', label: 'Franchise' },
  { href: '/membership', label: 'Membership' },
  { href: '/rewards', label: 'Rewards' },
];

type LuxuryMenuFooterStripProps = {
  reduceMotion: boolean;
};

export function LuxuryMenuFooterStrip({ reduceMotion }: LuxuryMenuFooterStripProps) {
  return (
    <footer className="border-t border-black/10 bg-lux-ink text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="font-display text-2xl text-white/95 sm:text-3xl">99 Cafe</p>
            <p className="mt-2 max-w-sm font-inter text-sm leading-relaxed text-white/60">
              Clear identity, calm presentation, and a guest experience built on trust.
            </p>
          </div>
          <nav className="flex flex-wrap gap-3" aria-label="Quick links">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-center font-inter text-sm font-medium text-white/90 transition-colors hover:border-white/30 hover:bg-white/10"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </motion.div>
        <p className="mt-10 border-t border-white/10 pt-8 text-center font-inter text-xs text-white/40">
          © {new Date().getFullYear()} 99 Cafe
        </p>
      </div>
    </footer>
  );
}
