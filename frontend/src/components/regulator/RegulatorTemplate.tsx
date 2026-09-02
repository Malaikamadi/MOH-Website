import { useState } from 'react';
import type { RegulatorData } from '../../data/regulators';

interface RegulatorTemplateProps {
  data: RegulatorData;
}

export default function RegulatorTemplate({ data }: RegulatorTemplateProps) {
  const [activeUnit, setActiveUnit] = useState(data.units[0]?.id || '');
  const active = data.units.find((unit) => unit.id === activeUnit) || data.units[0];

  return (
    <>
      <section className="dir-page-hero agency-page-hero">
        <div className="container">
          <div className="dir-page-hero-content">
            <div className="dir-page-badge">
              <i className={`fas fa-${data.icon}`}></i>
              <span>Regulator</span>
            </div>
            <h1>{data.acronym}</h1>
            <p className="dir-full-name">{data.fullName}</p>
            <div className="dir-page-breadcrumb">
              <a href="/">
                <i className="fas fa-home"></i> Home
              </a>
              <span>/</span>
              <a href="/regulators">Regulators</a>
              <span>/</span>
              <span className="active">{data.acronym}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="overview-section">
        <div className="container">
          <h2 className="dir-section-title">
            <i className="fas fa-info-circle"></i> About This Regulator
          </h2>
          <div className="overview-grid">
            <div className="overview-content">
              <p className="agency-mandate">
                <strong>Mandate:</strong> {data.mandate}
              </p>
              <p>{data.about}</p>
              {data.aboutExtra ? <p>{data.aboutExtra}</p> : null}
            </div>
            <div className="overview-highlights">
              <div className="highlight-card">
                <h4>{data.stats.units}</h4>
                <span>Units / Divisions</span>
              </div>
              <div className="highlight-card">
                <h4>{data.stats.districts}</h4>
                <span>Districts Covered</span>
              </div>
              <div className="highlight-card">
                <h4>{data.stats.staff}</h4>
                <span>Staff Members</span>
              </div>
              <div className="highlight-card">
                <h4>{data.stats.partners}</h4>
                <span>Partner Organizations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="director-section">
        <div className="container">
          <h2 className="dir-section-title">
            <i className="fas fa-user-tie"></i> Leadership
          </h2>
          <div className="director-compact">
            <div className="director-photo-small">
              {data.head.image ? (
                <img
                  src={data.head.image}
                  alt={data.head.name}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <i
                  className="fas fa-user"
                  style={{ fontSize: '3rem', color: '#6c757d' }}
                ></i>
              )}
            </div>
            <div className="director-info">
              <h3>{data.head.name}</h3>
              {data.head.credentials ? (
                <p className="credentials">{data.head.credentials}</p>
              ) : null}
              <span className="title-badge">{data.head.title}</span>
              {data.head.bio.map((paragraph, index) => (
                <p key={index} className="bio">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {data.units.length > 0 && active ? (
        <section className="units-section">
          <div className="container">
            <h2 className="dir-section-title">
              <i className="fas fa-th-large"></i> Units &amp; Functions
            </h2>
            <div className="units-grid">
              {data.units.map((unit) => (
                <div
                  key={unit.id}
                  className={`unit-card ${activeUnit === unit.id ? 'active' : ''}`}
                  onClick={() => setActiveUnit(unit.id)}
                >
                  <i className={`fas fa-${unit.icon}`}></i>
                  <span>{unit.name}</span>
                </div>
              ))}
            </div>
            <div className="unit-detail active">
              <h3>{active.name}</h3>
              <p>{active.description}</p>
              <ul className="unit-functions">
                {active.functions.map((func) => (
                  <li key={func}>
                    <i className="fas fa-check"></i> {func}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ) : null}

      {(data.contact.email ||
        data.contact.phone ||
        data.contact.location ||
        data.contact.website) && (
        <section className="contact-section">
          <div className="container">
            <div className="contact-row">
              {data.contact.email ? (
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <a href={`mailto:${data.contact.email}`}>{data.contact.email}</a>
                </div>
              ) : null}
              {data.contact.phone ? (
                <div className="contact-item">
                  <i className="fas fa-phone"></i>
                  <span>{data.contact.phone}</span>
                </div>
              ) : null}
              {data.contact.location ? (
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{data.contact.location}</span>
                </div>
              ) : null}
              {data.contact.website ? (
                <div className="contact-item">
                  <i className="fas fa-globe"></i>
                  <a
                    href={data.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit website
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
