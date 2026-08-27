import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { useApi } from '../hooks/useApi'
import { getDirectorateBySlug, getMediaUrl } from '../services/api'
import type { DirectorateUnit } from '../services/api'

function kindLabel(kind?: DirectorateUnit['kind']) {
    if (kind === 'project') return 'Project'
    if (kind === 'program') return 'Programme'
    return 'Unit'
}

function statusLabel(status?: DirectorateUnit['status']) {
    if (status === 'completed') return 'Completed'
    if (status === 'planned') return 'Planned'
    return 'Ongoing'
}

function UnitDetailPanel({ unit }: { unit: DirectorateUnit }) {
    const kind = unit.kind || 'unit'
    const overview = unit.overview || unit.summary || unit.description
    const objectives = unit.objectives?.length ? unit.objectives : []
    const activities = unit.keyActivities?.length
        ? unit.keyActivities
        : unit.functions || []
    const achievements = unit.achievements || []
    const showFunding =
        Boolean(unit.fundingSource || unit.fundingPartners || unit.fundingAmount)
    const showMeta =
        showFunding ||
        Boolean(unit.coverage || unit.beneficiaries || unit.startDate || unit.endDate)

    return (
        <div className="unit-detail active" id={unit.id}>
            <div className="unit-detail-header">
                <div className="unit-detail-badges">
                    <span className={`unit-kind-badge unit-kind-${kind}`}>
                        {kindLabel(kind)}
                    </span>
                    <span className={`unit-status-badge unit-status-${unit.status || 'ongoing'}`}>
                        {statusLabel(unit.status)}
                    </span>
                </div>
                <h3>{unit.name}</h3>
            </div>

            {overview ? (
                <div className="unit-overview">
                    {overview.split(/\n\n+/).map((para, i) => (
                        <p key={i}>{para}</p>
                    ))}
                </div>
            ) : null}

            {showMeta ? (
                <div className="unit-meta-grid">
                    {unit.fundingSource ? (
                        <div className="unit-meta-item">
                            <span className="unit-meta-label">Funding source</span>
                            <span className="unit-meta-value">{unit.fundingSource}</span>
                        </div>
                    ) : null}
                    {unit.fundingPartners ? (
                        <div className="unit-meta-item">
                            <span className="unit-meta-label">Funding partners</span>
                            <span className="unit-meta-value">{unit.fundingPartners}</span>
                        </div>
                    ) : null}
                    {unit.fundingAmount ? (
                        <div className="unit-meta-item">
                            <span className="unit-meta-label">Investment</span>
                            <span className="unit-meta-value">{unit.fundingAmount}</span>
                        </div>
                    ) : null}
                    {unit.coverage ? (
                        <div className="unit-meta-item">
                            <span className="unit-meta-label">Coverage</span>
                            <span className="unit-meta-value">{unit.coverage}</span>
                        </div>
                    ) : null}
                    {unit.beneficiaries ? (
                        <div className="unit-meta-item">
                            <span className="unit-meta-label">Beneficiaries</span>
                            <span className="unit-meta-value">{unit.beneficiaries}</span>
                        </div>
                    ) : null}
                    {(unit.startDate || unit.endDate) ? (
                        <div className="unit-meta-item">
                            <span className="unit-meta-label">Timeline</span>
                            <span className="unit-meta-value">
                                {[unit.startDate, unit.endDate].filter(Boolean).join(' – ')}
                            </span>
                        </div>
                    ) : null}
                </div>
            ) : null}

            {objectives.length > 0 ? (
                <div className="unit-block">
                    <h4>Objectives</h4>
                    <ul className="unit-functions">
                        {objectives.map((item, index) => (
                            <li key={index}>
                                <i className="fas fa-bullseye"></i> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}

            {activities.length > 0 ? (
                <div className="unit-block">
                    <h4>
                        {kind === 'project' || kind === 'program'
                            ? 'What this programme / project is doing'
                            : 'Core functions'}
                    </h4>
                    <ul className="unit-functions">
                        {activities.map((item, index) => (
                            <li key={index}>
                                <i className="fas fa-check"></i> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}

            {unit.functions?.length &&
            unit.keyActivities?.length &&
            unit.functions !== unit.keyActivities ? (
                <div className="unit-block">
                    <h4>Operational responsibilities</h4>
                    <ul className="unit-functions">
                        {unit.functions.map((item, index) => (
                            <li key={index}>
                                <i className="fas fa-tasks"></i> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}

            {unit.outcomes ? (
                <div className="unit-block unit-outcomes">
                    <h4>Impact &amp; outcomes</h4>
                    <p>{unit.outcomes}</p>
                </div>
            ) : null}

            {achievements.length > 0 ? (
                <div className="unit-block">
                    <h4>Key achievements</h4>
                    <ul className="unit-functions">
                        {achievements.map((item, index) => (
                            <li key={index}>
                                <i className="fas fa-star"></i> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}
        </div>
    )
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
                                Select a unit or funded programme below to see what it does, who it
                                serves, and how it is supported.
                            </p>
                            <div className="units-grid">
                                {units.map((unit) => (
                                    <div
                                        key={unit.id}
                                        className={`unit-card ${activeUnit === unit.id ? 'active' : ''}`}
                                        onClick={() => setActiveUnit(unit.id)}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault()
                                                setActiveUnit(unit.id)
                                            }
                                        }}
                                    >
                                        <i className={`fas fa-${unit.icon || 'folder'}`}></i>
                                        <span>{unit.name}</span>
                                        {unit.kind && unit.kind !== 'unit' ? (
                                            <small className="unit-card-kind">
                                                {kindLabel(unit.kind)}
                                            </small>
                                        ) : null}
                                    </div>
                                ))}
                            </div>
                            {active ? <UnitDetailPanel unit={active} /> : null}
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
