import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useApi } from '../hooks/useApi';
import { getAgencies } from '../services/api';
import { isRegulatorSlug } from '../data/regulators';

const fallbackAgencies = [
  {
    acronym: 'NMSA',
    name: 'National Medical Supplies Agency',
    icon: 'building',
    link: '/agencies/nmsa',
  },
  {
    acronym: 'NPHA',
    name: 'National Public Health Agency',
    icon: 'hospital',
    link: '/agencies/npha',
  },
  {
    acronym: 'NEMS',
    name: 'National Emergency Medical Services',
    icon: 'ambulance',
    link: '/agencies/nems',
  },
  {
    acronym: 'HSC',
    name: 'Health Service Commission',
    icon: 'clipboard-check',
    link: '/agencies/hsc',
  },
  {
    acronym: 'PCHF',
    name: 'Postgraduate College of Health Facilities',
    icon: 'graduation-cap',
    link: '/agencies/pchf',
  },
];
export default function AgencyPage() {
  const { data: agencyRes, loading } = useApi(getAgencies);

  const agencies = agencyRes?.data?.length
    ? agencyRes.data
        .filter((a) => !isRegulatorSlug(a.slug))
        .map((a) => ({
          acronym: a.name,
          name: a.fullName,
          icon: a.icon || 'building',
          link: `/agencies/${a.slug}`,
        }))
    : fallbackAgencies;

  return (
    <>
      <Header />
      <main>
        <section className="dir-page-hero agency-page-hero">
          <div className="container">
            <div className="dir-page-hero-content">
              <div className="dir-page-badge">
                <i className="fas fa-sitemap"></i>
                <span>Ministry Agencies</span>
              </div>
              <h1>Our Agencies</h1>
              <p className="dir-full-name">
                Boards, commissions, and agencies supporting health system
                delivery
              </p>
              <div className="dir-page-breadcrumb">
                <a href="/">
                  <i className="fas fa-home"></i> Home
                </a>
                <span>/</span>
                <span className="active">Agencies</span>
              </div>
            </div>
          </div>
        </section>

        <section className="overview-section">
          <div className="container">
            {loading ? (
              <p style={{ textAlign: 'center', color: '#64748b' }}>
                Loading agencies…
              </p>
            ) : (
              <div className="units-grid">
                {agencies.map((agency) => (
                  <a
                    key={agency.link}
                    href={agency.link}
                    className="unit-card"
                    style={{ textDecoration: 'none' }}
                  >
                    <i className={`fas fa-${agency.icon}`}></i>
                    <span>{agency.acronym}</span>
                    <small style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                      {agency.name}
                    </small>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
