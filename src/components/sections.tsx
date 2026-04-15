import type { ReactNode } from 'react';
import { Badge, Button, Container, Panel } from './ui';
import ScrollReveal from './ScrollReveal';
import StaggeredMenu from './StaggeredMenu';
import { brandMotto, featureCards, media, menuAdditions, storyPoints } from '../data/pageContent';

function ContentSection({
  id,
  badge,
  title,
  body,
  logo,
  buttonLabel,
  buttonVariant,
  buttonHref = '#contact',
  badgeTone = 'dark',
  buttonClassName = '',
  children,
  meta,
}: {
  id: string;
  badge: string;
  title: string;
  body: string;
  logo: string;
  buttonLabel: string;
  buttonVariant: 'primary' | 'secondary';
  buttonHref?: string;
  badgeTone?: 'light' | 'dark';
  buttonClassName?: string;
  children?: ReactNode;
  meta?: string;
}) {
  return (
    <section className={`${id}-section editorial-section`} id={id}>
      <Container>
        <div className="editorial-section__layout">
          <div className="editorial-section__copy">
            <div className="editorial-section__head">
              <Badge tone={badgeTone}>{badge}</Badge>
              {meta ? <span className="editorial-section__meta">{meta}</span> : null}
            </div>
            <ScrollReveal as="h2" baseOpacity={0.28} baseRotation={0.8} blurStrength={2} scrub={1.45} containerClassName="editorial-section__reveal">
              {title}
            </ScrollReveal>
            <ScrollReveal as="p" baseOpacity={0.32} baseRotation={0.6} blurStrength={1.5} scrub={1.45} containerClassName="editorial-section__reveal">
              {body}
            </ScrollReveal>
            <ScrollReveal as="p" baseOpacity={0.22} baseRotation={0.2} blurStrength={0.7} scrub={1.15} containerClassName="brand-motto__reveal">
              {brandMotto}
            </ScrollReveal>
            {children}
            <Button href={buttonHref} variant={buttonVariant} className={buttonClassName}>
              {buttonLabel}
            </Button>
          </div>

          <ScrollReveal as="div" enableBlur={false} baseOpacity={0.4} baseRotation={0.6} scrub={1.45} containerClassName="editorial-section__mark">
            <img src={logo} alt="" aria-hidden="true" />
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}

const heroMenuItems = [
  { label: 'HOME +', ariaLabel: 'Go to top section', link: '#top' },
  { label: 'Franchise', ariaLabel: 'Open franchise page', link: '/franchise' },
  { label: 'Membership', ariaLabel: 'Open membership page', link: '/membership' },
  { label: 'Rewards Program', ariaLabel: 'Open rewards page', link: '/rewards' },
  { label: 'Menu', ariaLabel: 'Open menu page', link: '/menu' },
];

export function HeroSection() {
  return (
    <section className="hero">
      <video className="hero__video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
        <source src={media.heroVideo} type="video/mp4" />
      </video>
      <div className="hero__overlay" aria-hidden="true" />

      <Container className="hero__content">
        <header className="hero__topbar">
          <a href="#top" className="brand" aria-label="99 Cafe home">
            <img src={media.cafeMark} alt="" className="brand__logo" aria-hidden="true" />
          </a>

          <StaggeredMenu
            className="hero__menu"
            position="right"
            items={heroMenuItems}
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
        </header>

        <div className="hero__body">
          <Badge tone="dark">Franchise opportunity</Badge>
          <h1 className="hero__title">
            Scale with a brand built to win.
          </h1>
          <p className="hero__description">
            Proven system. Real support. Growth-ready markets. Your next move starts here.
          </p>
          <p className="hero__motto" aria-label="Brand motto">
            {brandMotto}
          </p>

          <div className="hero__actions">
            <Button href="/franchise" variant="primary">
              Apply to own a <span className="brand-red-number">99</span>
            </Button>
            <Button href="/membership" variant="secondary">
              See the opportunity
            </Button>
          </div>
        </div>

        <div className="hero__scroll" aria-hidden="true">
          <span>Scroll to discover</span>
          <span className="hero__scroll-arrow">↓</span>
        </div>
      </Container>
    </section>
  );
}

export function FranchiseSection() {
  return (
    <ContentSection
      id="franchise"
      badge="Franchise"
      title="Franchise built to scale."
      body="A clear model with premium standards and simple execution."
      logo={media.logoPrimary}
      buttonLabel="Join +"
      buttonVariant="primary"
      buttonHref="/franchise"
      buttonClassName="content-card__button content-card__button--dark"
      meta="Franchise"
    >
      <div className="content-card__details" aria-label="Franchise details">
        {featureCards.slice(0, 2).map((item) => (
          <Panel key={item.eyebrow} className="content-card__detail">
            <span className="content-card__detail-eyebrow">{item.eyebrow}</span>
            <strong className="content-card__detail-title">{item.title}</strong>
            <p className="content-card__detail-body">{item.body}</p>
          </Panel>
        ))}
      </div>
    </ContentSection>
  );
}

export function MembershipSection() {
  return (
    <ContentSection
      id="membership"
      badge="Membership"
      title="Membership made simple."
      body="A warm loyalty experience with clear benefits."
      logo={media.membershipLogo}
      buttonLabel="Join +"
      buttonVariant="primary"
      buttonHref="/membership"
      buttonClassName="content-card__button content-card__button--dark"
      meta="Membership"
    >
      <div className="content-card__story">
        {storyPoints.slice(0, 2).map((point) => (
          <div key={point} className="content-card__story-item">
            <span className="content-card__story-dot" aria-hidden="true" />
            <p>{point}</p>
          </div>
        ))}
      </div>
    </ContentSection>
  );
}

export function MenuSection() {
  return (
    <ContentSection
      id="menu"
      badge="Menu"
      title="One menu. Every store."
      body="Fresh, consistent, and easy to run."
      logo={media.logoPrimary}
      buttonLabel="View menu +"
      buttonVariant="primary"
      badgeTone="light"
      buttonHref="/menu"
      buttonClassName="content-card__button content-card__button--accent"
      meta="Menu"
    >
      <div className="content-card__menu-grid">
        <ul className="content-card__list content-card__list--grid" aria-label="Menu additions">
          {menuAdditions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="content-card__mini-grid" aria-label="Menu priorities">
          <div className="content-card__mini">
            <span>Quality</span>
            <strong>Consistent taste and clean execution.</strong>
          </div>
          <div className="content-card__mini">
            <span>Seasonal</span>
            <strong>Small updates that keep it fresh.</strong>
          </div>
        </div>
      </div>
    </ContentSection>
  );
}

export function RewardsSection() {
  return (
    <ContentSection
      id="rewards-program"
      badge="Rewards Program"
      title="Rewards that bring guests back."
      body="Simple, clear, and built for repeat visits."
      logo={media.logoPrimary}
      buttonLabel="Join +"
      buttonVariant="primary"
      buttonHref="/rewards"
      buttonClassName="content-card__button content-card__button--dark"
      meta="Rewards Program"
    >
      <div className="content-card__metrics" aria-label="Rewards highlights">
        <div className="content-card__metric">
          <strong>01</strong>
          <span>Easy sign-up</span>
        </div>
        <div className="content-card__metric">
          <strong>02</strong>
          <span>Repeat visits</span>
        </div>
      </div>
    </ContentSection>
  );
}

export function FooterSection() {
  return (
    <footer className="footer-section">
      <Container>
        <Panel className="footer-card">
          <div className="footer__layout">
            <div className="footer__brand">
              <a href="#top" className="footer__mark" aria-label="Go to top">
                <img src={media.logoPrimary} alt="" aria-hidden="true" />
              </a>
              <p>
                Clear brand. Calm presentation. Built to feel trustworthy and refined.
                <br />
                <span className="footer__motto">{brandMotto}</span>
              </p>
            </div>

            <nav className="footer__nav" aria-label="Footer navigation">
              <span className="footer__label">Quick links</span>
              <ul className="footer__links">
                <li>
                  <a href="#franchise">Franchise</a>
                </li>
                <li>
                  <a href="#membership">Membership</a>
                </li>
                <li>
                  <a href="/menu">Menu</a>
                </li>
                <li>
                  <a href="/rewards">Rewards Program</a>
                </li>
              </ul>
            </nav>

            <div className="footer__info">
              <span className="footer__label">Contact</span>
              <p>For franchise and brand inquiries, start with the rewards page.</p>
              <Button href="/rewards" variant="ghost" className="footer__link">
                Open rewards program
              </Button>
            </div>
          </div>

          <div className="footer__bottom">
            <span>
              © 2026 <span className="brand-red-number">99</span> Cafe
            </span>
            <span>Franchise, membership, menu, rewards</span>
          </div>
        </Panel>
      </Container>
    </footer>
  );
}
