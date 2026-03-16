import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useApi } from '../hooks/useApi';
import { getDirectorateBySlug, getMediaUrl } from '../services/api';

export default function DirectorateDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const { data: dirRes, loading, error } = useApi(
        () => getDirectorateBySlug(slug || ''),
        [slug]
    );

    const [activeUnit, setActiveUnit] = useState('');
    const dir = dirRes?.data?.[0];

    if (!activeUnit && dir?.units?.[0]?.id) {
        setTimeout(() => setActiveUnit(dir.units[0].id), 0);
    }

    if (loading) {
        return (
            <>
                <Header />
                <main>
                    <section className="dir-page-hero">
                        <div className="container">
                            <div className="dir-page-hero-content">
                                <h1>Loading...</h1>
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
            </>
        );
    }

    if (error || !dir) {
        return (
            <>
                <Header />
                <main>
                    <section className="dir-page-hero">
                        <div className="container">
                            <div className="dir-page-hero-content">
                                <h1>Directorate Not Found</h1>
                                <p className="dir-full-name">The requested directorate could not be found.</p>
                                <a href="/directorates" style={{ color: 'white', textDecoration: 'underline', marginTop: '1rem', display: 'inline-block' }}>
                                    Back to Directorates
                                </a>
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
            </>
        );
    }

    const directorImageUrl = dir.directorImage ? getMediaUrl(dir.directorImage) : '';

    return (
        <>
            <Header />
            <main>
                <section className="dir-page-hero">
                    <div className="container">
                        <div className="dir-page-hero-content">
                            <div className="dir-page-badge">
                                <i className={`fas fa-${dir.icon}`}></i>
                                <span>Directorate</span>
                            </div>
                            <h1>{dir.name}</h1>
                            <p className="dir-full-name">{dir.fullName}</p>
                            <div className="dir-page-breadcrumb">
                                <a href="/"><i className="fas fa-home"></i> Home</a>
                                <span>/</span>
                                <a href="/directorates">Directorates</a>
                                <span>/</span>
                                <span className="active">{dir.name}</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="overview-section">
                    <div className="container">
                        <h2 className="dir-section-title"><i className="fas fa-info-circle"></i> About This Directorate</h2>
                        <div className="overview-grid">
                            <div className="overview-content">
                                <p>{dir.about}</p>
                                {dir.aboutExtra && <p>{dir.aboutExtra}</p>}
                            </div>
                            <div className="overview-highlights">
                                <div className="highlight-card"><h4>{dir.statsUnits}</h4><span>Specialized Units</span></div>
                                <div className="highlight-card"><h4>{dir.statsDistricts}</h4><span>Districts Covered</span></div>
                                <div className="highlight-card"><h4>{dir.statsStaff}</h4><span>Staff Members</span></div>
                                <div className="highlight-card"><h4>{dir.statsPartners}</h4><span>Partner Organizations</span></div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="director-section">
                    <div className="container">
                        <h2 className="dir-section-title"><i className="fas fa-user-tie"></i> Director</h2>
                        <div className="director-compact">
                            <div className="director-photo-small">
                                {directorImageUrl ? (
                                    <img
                                        src={directorImageUrl}
                                        alt={dir.directorName}
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                            const icon = document.createElement('i');
                                            icon.className = 'fas fa-user';
                                            e.currentTarget.parentElement?.appendChild(icon);
                                        }}
                                    />
                                ) : (
                                    <i className="fas fa-user" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
                                )}
                            </div>
                            <div className="director-info">
                                <h3>{dir.directorName}</h3>
                                {dir.directorCredentials && <p className="credentials">{dir.directorCredentials}</p>}
                                <span className="title-badge">Director</span>
                                {dir.directorBio?.map((paragraph, index) => (
                                    <p key={index} className="bio">{paragraph}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {dir.units && dir.units.length > 0 && (
                    <section className="units-section">
                        <div className="container">
                            <h2 className="dir-section-title"><i className="fas fa-th-large"></i> Our Units</h2>
                            <div className="units-grid">
                                {dir.units.map((unit) => (
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
                            {dir.units.map((unit) => (
                                <div
                                    key={unit.id}
                                    id={unit.id}
                                    className={`unit-detail ${activeUnit === unit.id ? 'active' : ''}`}
                                >
                                    <h3>{unit.name}</h3>
                                    <p>{unit.description}</p>
                                    <ul className="unit-functions">
                                        {unit.functions.map((func, index) => (
                                            <li key={index}><i className="fas fa-check"></i> {func}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {dir.contactEmail && (
                    <section className="contact-section">
                        <div className="container">
                            <div className="contact-row">
                                {dir.contactEmail && (
                                    <div className="contact-item">
                                        <i className="fas fa-envelope"></i>
                                        <span>{dir.contactEmail}</span>
                                    </div>
                                )}
                                {dir.contactPhone && (
                                    <div className="contact-item">
                                        <i className="fas fa-phone"></i>
                                        <span>{dir.contactPhone}</span>
                                    </div>
                                )}
                                {dir.contactLocation && (
                                    <div className="contact-item">
                                        <i className="fas fa-map-marker-alt"></i>
                                        <span>{dir.contactLocation}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}
            </main>
            <Footer />
        </>
    );
}
