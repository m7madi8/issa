import { useReducedMotion } from 'framer-motion';
import { Container } from '../components/ui';
import StaggeredMenu from '../components/StaggeredMenu';
import { FullMenuBrowse, LuxuryMenuHero } from '../components/luxury-menu';
import { media } from '../data/pageContent';

/** Same sections as the home hero StaggeredMenu, adapted for the menu route. */
const menuPageStaggeredItems = [
  { label: 'HOME +', ariaLabel: 'Go to home page', link: '/' },
  { label: 'Franchise', ariaLabel: 'Open franchise page', link: '/franchise' },
  { label: 'Membership', ariaLabel: 'Open membership page', link: '/membership' },
  { label: 'Rewards Program', ariaLabel: 'Open rewards page', link: '/rewards' },
  { label: 'Menu', ariaLabel: 'Top of menu page', link: '#top' },
] as const;

export default function MenuPage() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <main className="app-shell page-route page-route--menu bg-white" id="top" lang="en">
      <header className="page-shell page-shell--light">
        <Container>
          <div className="page-shell__bar">
            <a href="/" className="page-shell__brand" aria-label="Back to home">
              <img src={media.logoPrimary} alt="" aria-hidden="true" />
            </a>

            <StaggeredMenu
              className="hero__menu"
              position="right"
              items={[...menuPageStaggeredItems]}
              socialItems={[]}
              displaySocials={false}
              displayItemNumbering
              logoUrl={media.cafeMark}
              menuButtonColor="#111111"
              openMenuButtonColor="#111111"
              accentColor="#e11d2e"
              changeMenuColorOnOpen={false}
              isFixed={false}
            />
          </div>
        </Container>
      </header>

      <LuxuryMenuHero reduceMotion={reduceMotion} />

      <FullMenuBrowse />
    </main>
  );
}
