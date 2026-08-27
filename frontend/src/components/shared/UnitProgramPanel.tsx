import { useEffect, useState } from 'react'
import type { DirectorateUnit } from '../../services/api'

export type UnitProgram = DirectorateUnit

function kindLabel(kind?: UnitProgram['kind']) {
    if (kind === 'project') return 'Project'
    if (kind === 'program') return 'Programme'
    return 'Unit'
}

function statusLabel(status?: UnitProgram['status']) {
    if (status === 'completed') return 'Completed'
    if (status === 'planned') return 'Planned'
    return 'Ongoing'
}

type PanelTab = 'overview' | 'delivery' | 'impact'

function SnapshotItem({
    icon,
    label,
    value,
}: {
    icon: string
    label: string
    value: string
}) {
    return (
        <div className="unit-snapshot-item">
            <div className="unit-snapshot-icon" aria-hidden>
                <i className={`fas fa-${icon}`}></i>
            </div>
            <div>
                <span className="unit-snapshot-label">{label}</span>
                <span className="unit-snapshot-value">{value}</span>
            </div>
        </div>
    )
}

export default function UnitProgramPanel({ unit }: { unit: UnitProgram }) {
    const [tab, setTab] = useState<PanelTab>('overview')
    const kind = unit.kind || 'unit'
    const overview = unit.overview || unit.summary || unit.description
    const objectives = unit.objectives?.length ? unit.objectives : []
    const activities = unit.keyActivities?.length
        ? unit.keyActivities
        : unit.functions || []
    const achievements = unit.achievements || []
    const hasImpact = Boolean(unit.outcomes) || achievements.length > 0
    const timeline = [unit.startDate, unit.endDate].filter(Boolean).join(' – ')

    useEffect(() => {
        setTab('overview')
    }, [unit.id])

    const snapshots: { icon: string; label: string; value: string }[] = []
    if (unit.coverage) {
        snapshots.push({ icon: 'map-marked-alt', label: 'Coverage', value: unit.coverage })
    }
    if (unit.beneficiaries) {
        snapshots.push({
            icon: 'users',
            label: 'Who benefits',
            value: unit.beneficiaries,
        })
    }
    if (unit.fundingSource) {
        snapshots.push({
            icon: 'hand-holding-usd',
            label: 'Funding',
            value: unit.fundingSource,
        })
    }
    if (timeline) {
        snapshots.push({ icon: 'calendar-alt', label: 'Timeline', value: timeline })
    } else if (unit.fundingAmount) {
        snapshots.push({
            icon: 'coins',
            label: 'Investment',
            value: unit.fundingAmount,
        })
    }

    return (
        <article
            className={`unit-profile unit-profile--${kind}`}
            id={unit.id}
            aria-labelledby={`unit-title-${unit.id}`}
        >
            <header className="unit-profile-hero">
                <div className="unit-profile-hero-icon" aria-hidden>
                    <i className={`fas fa-${unit.icon || 'folder'}`}></i>
                </div>
                <div className="unit-profile-hero-copy">
                    <div className="unit-detail-badges">
                        <span className={`unit-kind-badge unit-kind-${kind}`}>
                            {kindLabel(kind)}
                        </span>
                        <span
                            className={`unit-status-badge unit-status-${unit.status || 'ongoing'}`}
                        >
                            <span className="unit-status-dot" aria-hidden />
                            {statusLabel(unit.status)}
                        </span>
                    </div>
                    <h3 id={`unit-title-${unit.id}`}>{unit.name}</h3>
                    {unit.summary || unit.description ? (
                        <p className="unit-profile-lead">
                            {unit.summary || unit.description}
                        </p>
                    ) : null}
                </div>
            </header>

            {snapshots.length > 0 ? (
                <div className="unit-snapshot-strip" role="list">
                    {snapshots.slice(0, 4).map((s) => (
                        <div key={s.label} role="listitem">
                            <SnapshotItem {...s} />
                        </div>
                    ))}
                </div>
            ) : null}

            <div className="unit-profile-tabs" role="tablist" aria-label="Unit sections">
                <button
                    type="button"
                    role="tab"
                    aria-selected={tab === 'overview'}
                    className={tab === 'overview' ? 'active' : ''}
                    onClick={() => setTab('overview')}
                >
                    Overview
                </button>
                <button
                    type="button"
                    role="tab"
                    aria-selected={tab === 'delivery'}
                    className={tab === 'delivery' ? 'active' : ''}
                    onClick={() => setTab('delivery')}
                >
                    What we deliver
                </button>
                <button
                    type="button"
                    role="tab"
                    aria-selected={tab === 'impact'}
                    className={tab === 'impact' ? 'active' : ''}
                    onClick={() => setTab('impact')}
                    disabled={!hasImpact && objectives.length === 0}
                >
                    Impact
                </button>
            </div>

            <div className="unit-profile-body" role="tabpanel">
                {tab === 'overview' ? (
                    <div className="unit-profile-layout">
                        <div className="unit-profile-main">
                            <h4 className="unit-profile-section-title">
                                <i className="fas fa-align-left" aria-hidden></i>
                                What this {kindLabel(kind).toLowerCase()} does
                            </h4>
                            {overview ? (
                                <div className="unit-overview">
                                    {overview.split(/\n\n+/).map((para, i) => (
                                        <p key={i}>{para}</p>
                                    ))}
                                </div>
                            ) : (
                                <p className="unit-empty-note">
                                    Full narrative coming soon. Add an overview in Strapi.
                                </p>
                            )}

                            {objectives.length > 0 ? (
                                <div className="unit-block">
                                    <h4 className="unit-profile-section-title">
                                        <i className="fas fa-bullseye" aria-hidden></i>
                                        Objectives
                                    </h4>
                                    <ol className="unit-objectives">
                                        {objectives.map((item, index) => (
                                            <li key={index}>
                                                <span className="unit-obj-num">{index + 1}</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            ) : null}
                        </div>

                        <aside className="unit-profile-aside">
                            <div className="unit-aside-card">
                                <h4>
                                    <i className="fas fa-info-circle" aria-hidden></i>
                                    At a glance
                                </h4>
                                <dl className="unit-aside-dl">
                                    <div>
                                        <dt>Type</dt>
                                        <dd>{kindLabel(kind)}</dd>
                                    </div>
                                    <div>
                                        <dt>Status</dt>
                                        <dd>{statusLabel(unit.status)}</dd>
                                    </div>
                                    {unit.fundingAmount ? (
                                        <div>
                                            <dt>Investment</dt>
                                            <dd>{unit.fundingAmount}</dd>
                                        </div>
                                    ) : null}
                                    {unit.fundingPartners ? (
                                        <div>
                                            <dt>Partners</dt>
                                            <dd>{unit.fundingPartners}</dd>
                                        </div>
                                    ) : null}
                                    {unit.coverage ? (
                                        <div>
                                            <dt>Coverage</dt>
                                            <dd>{unit.coverage}</dd>
                                        </div>
                                    ) : null}
                                    {unit.beneficiaries ? (
                                        <div>
                                            <dt>Beneficiaries</dt>
                                            <dd>{unit.beneficiaries}</dd>
                                        </div>
                                    ) : null}
                                    {timeline ? (
                                        <div>
                                            <dt>Timeline</dt>
                                            <dd>{timeline}</dd>
                                        </div>
                                    ) : null}
                                </dl>
                            </div>

                            {(unit.fundingSource || unit.fundingPartners) && (
                                <div className="unit-aside-card unit-aside-funding">
                                    <h4>
                                        <i className="fas fa-handshake" aria-hidden></i>
                                        Financing &amp; partners
                                    </h4>
                                    {unit.fundingSource ? (
                                        <p>
                                            <strong>Source:</strong> {unit.fundingSource}
                                        </p>
                                    ) : null}
                                    {unit.fundingPartners ? (
                                        <p>
                                            <strong>Partners:</strong> {unit.fundingPartners}
                                        </p>
                                    ) : null}
                                    {unit.fundingAmount ? (
                                        <p className="unit-funding-amount">
                                            {unit.fundingAmount}
                                        </p>
                                    ) : null}
                                </div>
                            )}
                        </aside>
                    </div>
                ) : null}

                {tab === 'delivery' ? (
                    <div>
                        <h4 className="unit-profile-section-title">
                            <i className="fas fa-cogs" aria-hidden></i>
                            {kind === 'project' || kind === 'program'
                                ? 'Activities & delivery work'
                                : 'Core functions'}
                        </h4>
                        {activities.length > 0 ? (
                            <div className="unit-activity-grid">
                                {activities.map((item, index) => (
                                    <div key={index} className="unit-activity-card">
                                        <span className="unit-activity-index" aria-hidden>
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <p>{item}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="unit-empty-note">
                                No delivery activities listed yet.
                            </p>
                        )}

                        {unit.functions?.length &&
                        unit.keyActivities?.length &&
                        JSON.stringify(unit.functions) !==
                            JSON.stringify(unit.keyActivities) ? (
                            <div className="unit-block">
                                <h4 className="unit-profile-section-title">
                                    <i className="fas fa-tasks" aria-hidden></i>
                                    Operational responsibilities
                                </h4>
                                <ul className="unit-functions">
                                    {unit.functions.map((item, index) => (
                                        <li key={index}>
                                            <i className="fas fa-check" aria-hidden></i>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : null}
                    </div>
                ) : null}

                {tab === 'impact' ? (
                    <div>
                        {unit.outcomes ? (
                            <div className="unit-impact-banner">
                                <div className="unit-impact-banner-icon" aria-hidden>
                                    <i className="fas fa-chart-line"></i>
                                </div>
                                <div>
                                    <h4>Impact &amp; outcomes</h4>
                                    <p>{unit.outcomes}</p>
                                </div>
                            </div>
                        ) : null}

                        {achievements.length > 0 ? (
                            <div className="unit-block">
                                <h4 className="unit-profile-section-title">
                                    <i className="fas fa-flag-checkered" aria-hidden></i>
                                    Key achievements
                                </h4>
                                <ul className="unit-milestones">
                                    {achievements.map((item, index) => (
                                        <li key={index}>
                                            <span className="unit-milestone-marker" aria-hidden />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : null}

                        {!unit.outcomes && achievements.length === 0 ? (
                            <p className="unit-empty-note">
                                Impact details will appear here once outcomes or achievements are
                                added in Strapi.
                            </p>
                        ) : null}

                        {objectives.length > 0 && !unit.outcomes ? (
                            <div className="unit-block">
                                <h4 className="unit-profile-section-title">
                                    <i className="fas fa-bullseye" aria-hidden></i>
                                    Objectives guiding this work
                                </h4>
                                <ol className="unit-objectives">
                                    {objectives.map((item, index) => (
                                        <li key={index}>
                                            <span className="unit-obj-num">{index + 1}</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        ) : null}
                    </div>
                ) : null}
            </div>
        </article>
    )
}
