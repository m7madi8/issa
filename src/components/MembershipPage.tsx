import { Badge, Button, Container, Panel } from './ui';
import ScrollReveal from './ScrollReveal';
import { brandMotto, media } from '../data/pageContent';

const membershipBenefits = [
  {
    label: 'Simple by design',
    value: 'Clear, frictionless rewards that do not interrupt the guest experience.',
  },
  {
    label: 'Return with intent',
    value: 'A calm loyalty loop that encourages repeat visits without noise.',
  },
  {
    label: 'Premium tone',
    value: 'Classic, refined presentation aligned with a global brand feel.',
  },
];

function MembershipHeader() {
  return (
    <header className="page-shell page-shell--light membership-shell">
      <Container>
        <div className="page-shell__bar">
          <a href="/" className="page-shell__brand membership-shell__brand" aria-label="Back to home">
            <img src={media.logoPrimary} alt="" aria-hidden="true" />
          </a>

          <nav className="page-shell__nav membership-shell__nav" aria-label="Membership page navigation">
            <a href="/franchise">Franchise</a>
            <a href="/">Home</a>
          </nav>
        </div>

        <div className="page-hero membership-hero">
          <Badge tone="light">Membership</Badge>
          <ScrollReveal as="h1" baseOpacity={0.24} baseRotation={0.35} blurStrength={1.05} scrub={1.25} containerClassName="page-hero__title">
            A classic membership experience.
          </ScrollReveal>
          <ScrollReveal as="p" baseOpacity={0.28} baseRotation={0.24} blurStrength={0.9} scrub={1.25} containerClassName="page-hero__body">
            Calm rewards. Clean benefits. A premium rhythm that keeps guests returning.
          </ScrollReveal>
          <p className="page-motto" aria-label="Brand motto">
            {brandMotto}
          </p>

          <div className="page-hero__actions">
            <Button href="#membership-benefits" variant="primary">
              View benefits
            </Button>
            <Button href="/franchise" variant="secondary">
              Franchise
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}

function MembershipBenefits() {
  return (
    <section className="page-section" id="membership-benefits">
      <Container>
        <Panel className="membership-panel">
          <div className="membership-layout">
            <div className="membership-copy">
              <Badge tone="light">Loyalty</Badge>
              <ScrollReveal as="h2" baseOpacity={0.24} baseRotation={0.28} blurStrength={0.95} scrub={1.25} containerClassName="membership-copy__title">
                Refined, readable, and premium.
              </ScrollReveal>
              <ScrollReveal as="p" baseOpacity={0.26} baseRotation={0.22} blurStrength={0.85} scrub={1.25} containerClassName="membership-copy__body">
                Membership should feel timeless. This layout stays clean, with quiet details and classic spacing.
              </ScrollReveal>

              <div className="membership-actions">
                <Button href="/" variant="secondary">
                  Back to home
                </Button>
                <Button href="/franchise" variant="primary">
                  View franchise
                </Button>
              </div>
            </div>

            <div className="membership-list" aria-label="Membership benefits">
              {membershipBenefits.map((item) => (
                <div key={item.label} className="membership-item">
                  <span className="membership-item__label">{item.label}</span>
                  <p className="membership-item__value">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </Container>
    </section>
  );
}

export default function MembershipPage() {
  return (
    <main className="app-shell page-route page-route--membership" id="top">
      <MembershipHeader />
      <MembershipBenefits />
    </main>
  );
}
