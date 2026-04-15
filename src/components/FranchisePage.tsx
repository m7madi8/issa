import { Badge, Button, Container, Panel } from './ui';
import ScrollReveal from './ScrollReveal';
import { brandMotto, media } from '../data/pageContent';

const franchiseHighlights = [
  {
    label: 'Site planning',
    value: 'Focused location logic for strong visibility and strong daily flow.',
  },
  {
    label: 'Operating system',
    value: 'A repeatable setup designed to stay elegant as the brand grows.',
  },
  {
    label: 'Support model',
    value: 'Clear launch guidance, simple standards, and calm long-term support.',
  },
];

function FranchiseHeader() {
  return (
    <header className="page-shell page-shell--light">
      <Container>
        <div className="page-shell__bar">
          <a href="/" className="page-shell__brand" aria-label="Back to home">
            <img src={media.logoPrimary} alt="" aria-hidden="true" />
          </a>

          <nav className="page-shell__nav" aria-label="Franchise page navigation">
            <a href="/membership">Membership</a>
            <a href="/">Home</a>
          </nav>
        </div>

        <div className="page-hero page-hero--light">
          <Badge tone="light">Franchise</Badge>
          <ScrollReveal as="h1" baseOpacity={0.24} baseRotation={0.45} blurStrength={1.2} scrub={1.25} containerClassName="page-hero__title">
            A clean franchise page built for trust.
          </ScrollReveal>
          <ScrollReveal as="p" baseOpacity={0.28} baseRotation={0.28} blurStrength={1} scrub={1.25} containerClassName="page-hero__body">
            This page is dedicated to franchise visitors only. It keeps the story simple, the layout calm,
            and the business message easy to understand.
          </ScrollReveal>
          <p className="page-motto" aria-label="Brand motto">
            {brandMotto}
          </p>

          <div className="page-hero__actions">
            <Button href="#franchise-overview" variant="primary">
              Explore Overview
            </Button>
            <Button href="/membership" variant="secondary">
              View Membership
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}

function FranchiseOverview() {
  return (
    <section className="page-section" id="franchise-overview">
      <Container>
        <div className="page-grid">
          <div className="page-copy">
            <Badge tone="light">Why it works</Badge>
            <ScrollReveal as="h2" baseOpacity={0.24} baseRotation={0.35} blurStrength={1} scrub={1.25} containerClassName="page-copy__title">
              Built for consistent, premium growth.
            </ScrollReveal>
            <ScrollReveal as="p" baseOpacity={0.26} baseRotation={0.24} blurStrength={0.9} scrub={1.25} containerClassName="page-copy__body">
              The franchise story should feel calm and credible. We keep the visual tone light, reduce
              clutter, and show the essentials first.
            </ScrollReveal>

            <div className="page-stack" aria-label="Franchise highlights">
              {franchiseHighlights.map((item) => (
                <Panel key={item.label} className="page-card">
                  <span className="page-card__label">{item.label}</span>
                  <p className="page-card__value">{item.value}</p>
                </Panel>
              ))}
            </div>

            <Button href="/membership" variant="primary" className="page-copy__cta">
              Next: Membership
            </Button>
          </div>

          <Panel className="page-visual page-visual--light franchise-visual" aria-hidden="true">
            <div className="page-visual__mark">
              <img src={media.logoPrimary} alt="" aria-hidden="true" />
            </div>
            <div className="page-visual__panel franchise-visual__panel">
              <div className="page-visual__row">
                <span>Entry point</span>
                <strong>Simple setup</strong>
              </div>
              <div className="page-visual__row">
                <span>Brand feel</span>
                <strong>Soft, premium, precise</strong>
              </div>
              <div className="page-visual__row">
                <span>Intent</span>
                <strong>Grow without noise</strong>
              </div>
            </div>
          </Panel>
        </div>
      </Container>
    </section>
  );
}

export default function FranchisePage() {
  return (
    <main className="app-shell page-route page-route--franchise" id="top">
      <FranchiseHeader />
      <FranchiseOverview />
    </main>
  );
}
