import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { fallbackRegulators } from '../data/regulators';

export default function RegulatorsPage() {
  const regulators = fallbackRegulators.map((regulator) => ({
    ...regulator,
    link: `/regulators/${regulator.slug}`,
  }));

  return (
    <>
      <Header />
      <main>
        <section className="dir-page-hero agency-page-hero">
          <div className="container">
            <div className="dir-page-hero-content">
              <div className="dir-page-badge">
                <i className="fas fa-balance-scale"></i>
                <span>Health Regulators</span>
              </div>
              <h1>Our Regulators</h1>
              <p className="dir-full-name">
                Professional councils, boards, and secretariats that license,
                set standards, and protect the public
              </p>
              <div className="dir-page-breadcrumb">
                <a href="/">
                  <i className="fas fa-home"></i> Home
                </a>
                <span>/</span>
                <span className="active">Regulators</span>
              </div>
            </div>
          </div>
        </section>

        <section className="overview-section">
          <div className="container">
            <div className="units-grid">
              {regulators.map((regulator) => (
                <a
                  key={regulator.link}
                  href={regulator.link}
                  className="unit-card"
                  style={{ textDecoration: 'none' }}
                >
                  <i className={`fas fa-${regulator.icon}`}></i>
                  <span>{regulator.acronym}</span>
                  <small style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                    {regulator.name}
                  </small>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
