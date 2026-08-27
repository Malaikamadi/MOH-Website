import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import UnitProgramPanel from '../components/shared/UnitProgramPanel'
import { useApi } from '../hooks/useApi'
import { getDirectorateBySlug, getMediaUrl } from '../services/api'
import type { DirectorateUnit } from '../services/api'

function kindLabel(kind?: DirectorateUnit['kind']) {
    if (kind === 'project') return 'Project'
    if (kind === 'program') return 'Programme'
    return 'Unit'
}

export default function DirectorateDetailPage() {
    const { slug } = useParams<{ slug: string }>()
    const { data: dirRes, loading, error } = useApi(
        () => getDirectorateBySlug(slug || ''),
        [slug]
    )

    const [activeUnit, setActiveUnit] = useState('')
    const dir = dirRes?.data?.[0]
    const units: DirectorateUnit[] = Array.isArray(dir?.units) ? dir.units : []

    useEffect(() => {
        if (units[0]?.id) setActiveUnit(units[0].id)
        else setActiveUnit('')
    }, [slug, units.length])

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
        )
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
                                <p className="dir-full-name">
                                    The requested directorate could not be found.
                                </p>
                                <a
                                    href="/directorates"
                                    style={{
                                        color: 'white',
                                        textDecoration: 'underline',
                                        marginTop: '1rem',
                                        display: 'inline-block',
                                    }}
                                >
                                    Back to Directorates
                                </a>
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
            </>
        )
    }

    const directorImageUrl = dir.directorImage ? getMediaUrl(dir.directorImage) : ''
    const active = units.find((u) => u.id === activeUnit) || units[0]

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
                                <a href="/">
                                    <i className="fas fa-home"></i> Home
                                </a>
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
                        <h2 className="dir-section-title">
                            <i className="fas fa-info-circle"></i> About This Directorate
                        </h2>
                        <div className="overview-grid">
                            <div className="overview-content">
                                <p>{dir.about}</p>
                                {dir.aboutExtra ? <p>{dir.aboutExtra}</p> : null}
                            </div>
                            <div className="overview-highlights">
                                <div className="highlight-card">
                                    <h4>{dir.statsUnits}</h4>
                                    <span>Specialized Units</span>
                                </div>
                                <div className="highlight-card">
                                    <h4>{dir.statsDistricts}</h4>
                                    <span>Districts Covered</span>
                                </div>
                                <div className="highlight-card">
                                    <h4>{dir.statsStaff}</h4>
                                    <span>Staff Members</span>
                                </div>
                                <div className="highlight-card">
                                    <h4>{dir.statsPartners}</h4>
                                    <span>Partner Organizations</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="director-section">
                    <div className="container">
                        <h2 className="dir-section-title">
                            <i className="fas fa-user-tie"></i> Director
                        </h2>
                        <div className="director-compact">
                            <div className="director-photo-small">
                                {directorImageUrl ? (
                                    <img
                                        src={directorImageUrl}
                                        alt={dir.directorName}
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none'
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
                                <h3>{dir.directorName}</h3>
                                {dir.directorCredentials ? (
                                    <p className="credentials">{dir.directorCredentials}</p>
                                ) : null}
                                <span className="title-badge">Director</span>
                                {dir.directorBio?.map((paragraph, index) => (
                                    <p key={index} className="bio">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {units.length > 0 ? (
                    <section className="units-section">
                        <div className="container">
                            <h2 className="dir-section-title">
                                <i className="fas fa-th-large"></i> Units, Programmes &amp; Projects
                            </h2>
                            <p className="units-section-lead">
                                Select a unit or funded programme to explore mandate, delivery work,
                                financing, and impact — not just a short summary.
                            </p>
                            <div className="units-grid units-grid--picker">
                                {units.map((unit) => (
                                    <button
                                        type="button"
                                        key={unit.id}
                                        className={`unit-card unit-card--rich ${activeUnit === unit.id ? 'active' : ''}`}
                                        onClick={() => setActiveUnit(unit.id)}
                                    >
                                        <div className="unit-card-top">
                                            <i className={`fas fa-${unit.icon || 'folder'}`}></i>
                                            <span
                                                className={`unit-card-status unit-status-${unit.status || 'ongoing'}`}
                                            >
                                                {unit.status === 'completed'
                                                    ? 'Done'
                                                    : unit.status === 'planned'
                                                      ? 'Planned'
                                                      : 'Active'}
                                            </span>
                                        </div>
                                        <span className="unit-card-name">{unit.name}</span>
                                        <small className="unit-card-kind">
                                            {kindLabel(unit.kind)}
                                        </small>
                                        {(unit.summary || unit.description) && (
                                            <p className="unit-card-blurb">
                                                {(unit.summary || unit.description).slice(0, 90)}
                                                {(unit.summary || unit.description).length > 90
                                                    ? '…'
                                                    : ''}
                                            </p>
                                        )}
                                    </button>
                                ))}
                            </div>
                            {active ? (
                                <div key={active.id} className="unit-profile-wrap">
                                    <UnitProgramPanel unit={active} />
                                </div>
                            ) : null}
                        </div>
                    </section>
                ) : null}

                {dir.contactEmail ? (
                    <section className="contact-section">
                        <div className="container">
                            <div className="contact-row">
                                {dir.contactEmail ? (
                                    <div className="contact-item">
                                        <i className="fas fa-envelope"></i>
                                        <span>{dir.contactEmail}</span>
                                    </div>
                                ) : null}
                                {dir.contactPhone ? (
                                    <div className="contact-item">
                                        <i className="fas fa-phone"></i>
                                        <span>{dir.contactPhone}</span>
                                    </div>
                                ) : null}
                                {dir.contactLocation ? (
                                    <div className="contact-item">
                                        <i className="fas fa-map-marker-alt"></i>
                                        <span>{dir.contactLocation}</span>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </section>
                ) : null}
            </main>
            <Footer />
        </>
    )
}
