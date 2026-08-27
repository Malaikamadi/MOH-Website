import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import UnitProgramPanel from '../components/shared/UnitProgramPanel'
import { useApi } from '../hooks/useApi'
import { getAgencyBySlug, getMediaUrl } from '../services/api'
import type { AgencyUnit } from '../services/api'

export default function AgencyDetailPage() {
    const { slug } = useParams<{ slug: string }>()
    const { data: agencyRes, loading, error } = useApi(
        () => getAgencyBySlug(slug || ''),
        [slug]
    )

    const [activeUnit, setActiveUnit] = useState('')
    const agency = agencyRes?.data?.[0]

    useEffect(() => {
        if (agency?.units?.[0]?.id) {
            setActiveUnit(agency.units[0].id)
        } else {
            setActiveUnit('')
        }
    }, [agency])

    if (loading) {
        return (
            <>
                <Header />
                <main>
                    <section className="dir-page-hero agency-page-hero">
                        <div className="container">
                            <div className="dir-page-hero-content">
                                <h1>Loading…</h1>
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
            </>
        )
    }

    if (error || !agency) {
        return (
            <>
                <Header />
                <main>
                    <section className="dir-page-hero agency-page-hero">
                        <div className="container">
                            <div className="dir-page-hero-content">
                                <h1>Agency Not Found</h1>
                                <p className="dir-full-name">
                                    The requested agency could not be found.
                                </p>
                                <a
                                    href="/agencies"
                                    style={{
                                        color: 'white',
                                        textDecoration: 'underline',
                                        marginTop: '1rem',
                                        display: 'inline-block',
                                    }}
                                >
                                    Back to Agencies
                                </a>
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
            </>
        )
    }

    const headImageUrl = agency.headImage ? getMediaUrl(agency.headImage) : ''
    const headTitle = agency.headTitle || 'Leadership'
    const units = Array.isArray(agency.units) ? agency.units : []
    const bios = Array.isArray(agency.headBio) ? agency.headBio : []

    return (
        <>
            <Header />
            <main>
                <section className="dir-page-hero agency-page-hero">
                    <div className="container">
                        <div className="dir-page-hero-content">
                            <div className="dir-page-badge">
                                <i className={`fas fa-${agency.icon || 'building'}`}></i>
                                <span>Agency</span>
                            </div>
                            <h1>{agency.name}</h1>
                            <p className="dir-full-name">{agency.fullName}</p>
                            <div className="dir-page-breadcrumb">
                                <a href="/"><i className="fas fa-home"></i> Home</a>
                                <span>/</span>
                                <a href="/agencies">Agencies</a>
                                <span>/</span>
                                <span className="active">{agency.name}</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="overview-section">
                    <div className="container">
                        <h2 className="dir-section-title">
                            <i className="fas fa-info-circle"></i> About This Agency
                        </h2>
                        <div className="overview-grid">
                            <div className="overview-content">
                                {agency.mandate ? (
                                    <p className="agency-mandate">
                                        <strong>Mandate:</strong> {agency.mandate}
                                    </p>
                                ) : null}
                                {agency.about ? <p>{agency.about}</p> : null}
                                {agency.aboutExtra ? <p>{agency.aboutExtra}</p> : null}
                            </div>
                            <div className="overview-highlights">
                                <div className="highlight-card">
                                    <h4>{agency.statsUnits}</h4>
                                    <span>Units / Divisions</span>
                                </div>
                                <div className="highlight-card">
                                    <h4>{agency.statsDistricts}</h4>
                                    <span>Districts Covered</span>
                                </div>
                                <div className="highlight-card">
                                    <h4>{agency.statsStaff}</h4>
                                    <span>Staff Members</span>
                                </div>
                                <div className="highlight-card">
                                    <h4>{agency.statsPartners}</h4>
                                    <span>Partner Organizations</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {(agency.headName || headImageUrl) && (
                    <section className="director-section">
                        <div className="container">
                            <h2 className="dir-section-title">
                                <i className="fas fa-user-tie"></i> Leadership
                            </h2>
                            <div className="director-compact">
                                <div className="director-photo-small">
                                    {headImageUrl ? (
                                        <img
                                            src={headImageUrl}
                                            alt={agency.headName || headTitle}
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
                                    <h3>{agency.headName || 'Leadership TBD'}</h3>
                                    {agency.headCredentials ? (
                                        <p className="credentials">{agency.headCredentials}</p>
                                    ) : null}
                                    <span className="title-badge">{headTitle}</span>
                                    {bios.map((paragraph, index) => (
                                        <p key={index} className="bio">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {units.length > 0 && (
                    <section className="units-section">
                        <div className="container">
                            <h2 className="dir-section-title">
                                <i className="fas fa-th-large"></i> Units, Programmes &amp; Projects
                            </h2>
                            <p className="units-section-lead">
                                Select a division or funded programme to see mandate, delivery, and
                                impact in detail.
                            </p>
                            <div className="units-grid units-grid--picker">
                                {units.map((unit: AgencyUnit) => (
                                    <button
                                        type="button"
                                        key={unit.id}
                                        className={`unit-card unit-card--rich ${activeUnit === unit.id ? 'active' : ''}`}
                                        onClick={() => setActiveUnit(unit.id)}
                                    >
                                        <div className="unit-card-top">
                                            <i className={`fas fa-${unit.icon || 'folder'}`}></i>
                                        </div>
                                        <span className="unit-card-name">{unit.name}</span>
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
                            {units.find((u) => u.id === activeUnit) || units[0] ? (
                                <div
                                    key={activeUnit || units[0].id}
                                    className="unit-profile-wrap"
                                >
                                    <UnitProgramPanel
                                        unit={
                                            (units.find((u) => u.id === activeUnit) ||
                                                units[0]) as AgencyUnit
                                        }
                                    />
                                </div>
                            ) : null}
                        </div>
                    </section>
                )}

                {(agency.contactEmail ||
                    agency.contactPhone ||
                    agency.contactLocation ||
                    agency.websiteUrl) && (
                    <section className="contact-section">
                        <div className="container">
                            <div className="contact-row">
                                {agency.contactEmail ? (
                                    <div className="contact-item">
                                        <i className="fas fa-envelope"></i>
                                        <a href={`mailto:${agency.contactEmail}`}>
                                            {agency.contactEmail}
                                        </a>
                                    </div>
                                ) : null}
                                {agency.contactPhone ? (
                                    <div className="contact-item">
                                        <i className="fas fa-phone"></i>
                                        <span>{agency.contactPhone}</span>
                                    </div>
                                ) : null}
                                {agency.contactLocation ? (
                                    <div className="contact-item">
                                        <i className="fas fa-map-marker-alt"></i>
                                        <span>{agency.contactLocation}</span>
                                    </div>
                                ) : null}
                                {agency.websiteUrl ? (
                                    <div className="contact-item">
                                        <i className="fas fa-globe"></i>
                                        <a
                                            href={agency.websiteUrl}
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
            </main>
            <Footer />
        </>
    )
}
