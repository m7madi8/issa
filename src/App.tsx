import {
  FranchiseSection,
  MembershipSection,
  MenuSection,
  RewardsSection,
  HeroSection,
  FooterSection,
} from './components/sections';
import FranchisePage from './components/FranchisePage';
import MembershipPage from './components/MembershipPage';
import RewardsPage from './components/RewardsPage';
import MenuPage from './منيو/MenuPage';

const getPathname = () => decodeURI(window.location.pathname.replace(/\/$/, ''));

export default function App() {
  if (typeof window !== 'undefined') {
    const pathname = getPathname();

    if (pathname === '/franchise') {
      return <FranchisePage />;
    }

    if (pathname === '/membership') {
      return <MembershipPage />;
    }

    if (pathname === '/rewards') {
      return <RewardsPage />;
    }

    if (pathname === '/menu' || pathname === '/منيو') {
      return <MenuPage />;
    }
  }

  return (
    <main className="app-shell app-home" id="top">
      <HeroSection />
      <FranchiseSection />
      <MembershipSection />
      <MenuSection />
      <RewardsSection />
      <FooterSection />
    </main>
  );
}
