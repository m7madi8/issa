import { Badge, Button, Container, Panel } from './ui';
import ScrollReveal from './ScrollReveal';
import { media } from '../data/pageContent';

function PageMasthead() {
  return (
    <header className="fm-masthead">
      <Container>
        <div className="fm-masthead__bar">
          <a href="/" className="fm-masthead__brand" aria-label="Back to home">
            <img src={media.logoPrimary} alt="" aria-hidden="true" />
          </a>

          <nav className="fm-masthead__nav" aria-label="Franchise and membership page navigation">
            <a href="#franchise">Franchise</a>
            <a href="#membership">Membership</a>
          </nav>
        </div>

        <div className="fm-page-hero">
          <Badge tone="light">Franchise + Membership</Badge>
          <ScrollReveal as="h1" baseOpacity={0.24} baseRotation={0.5} blurStrength={1.4} scrub={1.35} containerClassName="fm-page-hero__title">
            A luxury operating page for growth and loyalty.
          </ScrollReveal>
          <ScrollReveal as="p" baseOpacity={0.3} baseRotation={0.35} blurStrength={1.1} scrub={1.35} containerClassName="fm-page-hero__body">
            Built for investors, operators, and guests who expect precision. This page focuses only on the
            brand engine, the business model, and the membership ecosystem.
          </ScrollReveal>

          <div className="fm-page-hero__actions">
            <Button href="#franchise" variant="primary">
              Explore Franchise
            </Button>
            <Button href="#membership" variant="secondary">
              Explore Membership
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}

function FranchiseSection() {
  return (
    <section className="fm-section fm-section--franchise" id="franchise">
      <Container>
        <div className="fm-franchise">
          <div className="fm-franchise__copy">
            <Badge tone="light">Franchise</Badge>
            <ScrollReveal as="h2" baseOpacity={0.25} baseRotation={0.45} blurStrength={1.2} scrub={1.35} containerClassName="fm-franchise__title">
              Cinematic business luxury.
            </ScrollReveal>
            <ScrollReveal as="p" baseOpacity={0.28} baseRotation={0.3} blurStrength={1} scrub={1.35} containerClassName="fm-franchise__body">
              A flagship franchise system shaped like an editorial product launch. Clean architecture, warm
              latte shadows, and a calm operating model that feels expensive without noise.
            </ScrollReveal>

            <div className="fm-points" aria-label="Franchise highlights">
              <div className="fm-point">
                <span className="fm-point__label">Site strategy</span>
                <span className="fm-point__value">Precise location planning with brand-first visibility.</span>
              </div>
              <div className="fm-point">
                <span className="fm-point__label">Brand system</span>
                <span className="fm-point__value">Premium materials, disciplined menus, and repeatable standards.</span>
              </div>
              <div className="fm-point">
                <span className="fm-point__label">Operator support</span>
                <span className="fm-point__value">A calm growth model designed for long-term scale.</span>
              </div>
            </div>

            <Button href="#membership" variant="primary" className="fm-franchise__cta">
              Continue to Membership
            </Button>
          </div>

          <div className="fm-franchise__visual" aria-hidden="true">
            <div className="fm-arch-frame">
              <div className="fm-arch-frame__glow" />
              <div className="fm-arch-frame__building" />
              <div className="fm-arch-frame__floor" />
              <div className="fm-arch-card fm-arch-card--one">
                <span>Flagship</span>
                <strong>Urban café architecture</strong>
              </div>
              <div className="fm-arch-card fm-arch-card--two">
                <span>Operations</span>
                <strong>Calm, repeatable, premium</strong>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function MembershipSection() {
  return (
    <section className="fm-section fm-section--membership" id="membership">
      <Container>
        <Panel className="fm-membership">
          <div className="fm-membership__spotlight" aria-hidden="true" />

          <div className="fm-membership__layout">
            <div className="fm-membership__copy">
              <Badge tone="dark">Membership</Badge>
              <ScrollReveal as="h2" baseOpacity={0.26} baseRotation={0.3} blurStrength={1} scrub={1.35} containerClassName="fm-membership__title">
                Dark premium experience.
              </ScrollReveal>
              <ScrollReveal as="p" baseOpacity={0.3} baseRotation={0.25} blurStrength={0.95} scrub={1.35} containerClassName="fm-membership__body">
                Membership here feels like a luxury magazine launch: minimal, warm, and designed to create
                loyalty without noise. One elegant CTA. Strong contrast. Quiet confidence.
              </ScrollReveal>

              <div className="fm-membership__stats" aria-label="Membership benefits">
                <div>
                  <strong>1</strong>
                  <span>Elegant tier experience</span>
                </div>
                <div>
                  <strong>2</strong>
                  <span>Warm loyalty touchpoints</span>
                </div>
                <div>
                  <strong>3</strong>
                  <span>High-retention guest loop</span>
                </div>
              </div>

              <Button href="#top" variant="secondary" className="fm-membership__cta">
                Back to Home
              </Button>
            </div>

            <div className="fm-membership__visual" aria-hidden="true">
              <div className="fm-membership__editorial">
                <span className="fm-membership__eyebrow">Loyalty system</span>
                <h3>Membership built like a luxury publication spread.</h3>
                <div className="fm-membership__cardRow">
                  <div className="fm-membership__card">
                    <span>Access</span>
                    <strong>Priority perks</strong>
                  </div>
                  <div className="fm-membership__card">
                    <span>Emotion</span>
                    <strong>Human-centered warmth</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Panel>
      </Container>
    </section>
  );
}

export default function FranchiseMembershipPage() {
  return (
    <main className="app-shell fm-page" id="top">
      <PageMasthead />
      <FranchiseSection />
      <MembershipSection />
    </main>
  );
}
