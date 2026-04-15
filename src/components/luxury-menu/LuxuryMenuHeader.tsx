import { media } from '../../data/pageContent';

export function LuxuryMenuHeader() {
  return (
    <header className="relative z-20 border-b border-black/[0.06] bg-white/75 backdrop-blur-xl">
      <div className="mx-auto grid max-w-6xl grid-cols-3 items-center gap-3 px-4 py-4 sm:px-6">
        <div className="flex justify-start">
          <a
            href="/"
            className="rounded-full border border-black/10 bg-white/80 px-4 py-2 text-xs font-inter font-medium text-lux-ink transition-colors hover:border-black/20 hover:bg-white"
          >
            Home
          </a>
        </div>

        <div className="flex justify-center">
          <a href="/" className="block" aria-label="99 Cafe — Home">
            <img
              src={media.logoPrimary}
              alt=""
              className="h-8 w-auto object-contain sm:h-9"
              width={120}
              height={36}
            />
          </a>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/90 text-lux-ink shadow-sm transition-transform hover:scale-105 active:scale-95"
            aria-label="Open menu"
          >
            <span className="flex flex-col gap-1.5" aria-hidden="true">
              <span className="block h-0.5 w-5 rounded-full bg-lux-ink" />
              <span className="block h-0.5 w-4 rounded-full bg-lux-ink opacity-70" />
              <span className="block h-0.5 w-5 rounded-full bg-lux-ink" />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
