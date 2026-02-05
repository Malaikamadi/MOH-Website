import { useState } from 'react';
import type { DirectorateData } from '../../data/directoratesData';

interface DirectorateTemplateProps {
    data: DirectorateData;
}

export default function DirectorateTemplate({ data }: DirectorateTemplateProps) {
    const [activeUnit, setActiveUnit] = useState(data.units[0]?.id || '');

    return (
        <>
            {/* Directorate Hero */}
            <section className="dir-page-hero">
                <div className="container">
                    <div className="dir-page-hero-content">
                        <div className="dir-page-badge">
                            <i className={`fas fa-${data.icon}`}></i>
                            <span>Directorate</span>
                        </div>
                        <h1>{data.acronym}</h1>
                        <p className="dir-full-name">{data.fullName}</p>
                        <div className="dir-page-breadcrumb">
                            <a href="/"><i className="fas fa-home"></i> Home</a>
                            <span>/</span>
                            <a href="/directorates">Directorates</a>
                            <span>/</span>
                            <span className="active">{data.acronym}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Overview Section */}
            <section className="overview-section">
                <div className="container">
                    <div className="overview-grid">
                        <div className="overview-content">
                            <h2>
                                <i className="fas fa-info-circle"></i> About This Directorate
                            </h2>
                            <p>{data.about}</p>
                            {data.aboutExtra && <p>{data.aboutExtra}</p>}
                        </div>
                        <div className="overview-highlights">
                            <div className="highlight-card">
                                <h4>{data.stats.units}</h4>
                                <span>Specialized Units</span>
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

            {/* Director Section */}
            <section className="director-section">
                <div className="container">
                    <h2 className="section-header">
                        <i className="fas fa-user-tie"></i> Director
                    </h2>
                    <div className="director-compact">
                        <div className="director-photo-small">
                            <img
                                src={data.director.image}
                                alt={data.director.name}
                                onError={(e) => {
                                    const target = e.currentTarget;
                                    target.style.display = 'none';
                                    const icon = document.createElement('i');
                                    icon.className = 'fas fa-user';
                                    target.parentElement?.appendChild(icon);
                                }}
                            />
                        </div>
                        <div className="director-info">
                            <h3>{data.director.name}</h3>
                            {data.director.credentials && (
                                <p className="credentials">{data.director.credentials}</p>
                            )}
                            <span className="title-badge">Director</span>
                            {data.director.bio.map((paragraph, index) => (
                                <p key={index} className="bio">{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Units Section */}
            {data.units.length > 0 && (
                <section className="units-section">
                    <div className="container">
                        <h2 className="section-header">
                            <i className="fas fa-th-large"></i> Our Units
                        </h2>

                        {/* Units Grid */}
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

                        {/* Unit Details */}
                        {data.units.map((unit) => (
                            <div
                                key={unit.id}
                                id={unit.id}
                                className={`unit-detail ${activeUnit === unit.id ? 'active' : ''}`}
                            >
                                <h3>{unit.name}</h3>
                                <p>{unit.description}</p>
                                <ul className="unit-functions">
                                    {unit.functions.map((func, index) => (
                                        <li key={index}>
                                            <i className="fas fa-check"></i> {func}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Documents Section */}
            {data.documents && data.documents.length > 0 && (
                <section className="documents-section">
                    <div className="container">
                        <h2>Key Documents & Resources</h2>
                        <div className="documents-grid">
                            {data.documents.map((doc, index) => (
                                <a key={index} href={doc.link} className="doc-card">
                                    <div className="doc-icon">
                                        <i className="fas fa-file-pdf"></i>
                                    </div>
                                    <div className="doc-info">
                                        <h4>{doc.title}</h4>
                                        <div className="doc-meta">{doc.type} • {doc.size}</div>
                                        <span className="doc-download">
                                            <i className="fas fa-download"></i> Download
                                        </span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Contact Section */}
            {data.contact && (
                <section className="contact-section">
                    <div className="container">
                        <div className="contact-row">
                            {data.contact.email && (
                                <div className="contact-item">
                                    <i className="fas fa-envelope"></i>
                                    <span>{data.contact.email}</span>
                                </div>
                            )}
                            {data.contact.phone && (
                                <div className="contact-item">
                                    <i className="fas fa-phone"></i>
                                    <span>{data.contact.phone}</span>
                                </div>
                            )}
                            {data.contact.location && (
                                <div className="contact-item">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <span>{data.contact.location}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
