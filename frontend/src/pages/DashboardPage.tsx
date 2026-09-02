import { useMemo } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
} from 'recharts';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useApi } from '../hooks/useApi';
import { getDiseaseSurveillance, getHealthInformationHub } from '../services/api';
import type { StrapiItem, DiseaseSurveillance } from '../services/api';

const DISTRICT_COUNT = 16;

const FALLBACK_QUARTERLY = [
    { period: 'Q1', year: 2025, value: 27 },
    { period: 'Q2', year: 2025, value: 41 },
    { period: 'Q3', year: 2025, value: 43 },
    { period: 'Q4', year: 2025, value: 26 },
];

const FALLBACK_MONTHLY = [
    { month: 'Jan', value: 6 }, { month: 'Feb', value: 11 }, { month: 'Mar', value: 10 },
    { month: 'Apr', value: 14 }, { month: 'May', value: 13 }, { month: 'Jun', value: 14 },
];

const FALLBACK_COVERAGE = [
    { label: 'Vaccination', value: 85, color: '#0d9488', icon: 'fa-syringe' },
    { label: 'PHU Coverage', value: 100, color: '#2563eb', icon: 'fa-clinic-medical' },
    { label: 'ANC Visits', value: 72, color: '#7c3aed', icon: 'fa-heartbeat' },
];

const FALLBACK_ALERTS = [
    { district: 'Western Area Urban', status: 'normal', activeCases: 12, lastUpdate: '2 hrs ago' },
    { district: 'Kenema', status: 'warning', activeCases: 47, lastUpdate: '30 min ago' },
    { district: 'Bombali', status: 'critical', activeCases: 89, lastUpdate: '15 min ago' },
];

const FALLBACK_FACILITY = [
    { district: 'Western Area Urban', facilities: 145, reporting: 138, rate: 95 },
    { district: 'Bo', facilities: 98, reporting: 89, rate: 91 },
    { district: 'Kenema', facilities: 112, reporting: 101, rate: 90 },
    { district: 'Bombali', facilities: 87, reporting: 76, rate: 87 },
    { district: 'Port Loko', facilities: 93, reporting: 79, rate: 85 },
    { district: 'Kono', facilities: 64, reporting: 52, rate: 81 },
];

function monitoringLabel(status: string): string {
    if (status === 'critical') return 'Intensified';
    if (status === 'warning') return 'Heightened';
    return 'Standard';
}

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
    if (active && payload && payload.length) {
        return (
            <div className="hidash-tooltip">
                <span className="hidash-tooltip-label">{label}</span>
                <span className="hidash-tooltip-value">{payload[0].value}</span>
            </div>
        );
    }
    return null;
}

function CircleProgress({ value, color }: { value: number; color: string }) {
    const size = 76;
    const strokeWidth = 6;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;
    return (
        <svg width={size} height={size} className="hidash-circle-svg">
            <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(148,163,184,0.25)" strokeWidth={strokeWidth} />
            <circle
                cx={size / 2} cy={size / 2} r={radius}
                fill="none" stroke={color} strokeWidth={strokeWidth}
                strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
            <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fill="#0f172a" fontSize={15} fontWeight="800">
                {value}%
            </text>
        </svg>
    );
}

export default function DashboardPage() {
    const { data: surveillanceData } = useApi(() => getDiseaseSurveillance({ limit: 20 }));
    const { data: hubRes } = useApi(getHealthInformationHub);

    const hubData = hubRes?.data;
    const quarterly = hubData?.maternalDeathsQuarterly?.length ? hubData.maternalDeathsQuarterly : FALLBACK_QUARTERLY;
    const monthly = hubData?.maternalDeathsMonthly?.length ? hubData.maternalDeathsMonthly : FALLBACK_MONTHLY;
    const coverage = hubData?.healthCoverage?.length ? hubData.healthCoverage : FALLBACK_COVERAGE;
    const alerts = hubData?.districtAlerts?.length ? hubData.districtAlerts : FALLBACK_ALERTS;
    const facilityRows = hubData?.facilityReports?.length ? hubData.facilityReports : FALLBACK_FACILITY;

    const facilityChartData = useMemo(
        () =>
            facilityRows.map((r) => ({
                name: r.district.length > 14 ? `${r.district.slice(0, 12)}…` : r.district,
                fullName: r.district,
                rate: r.rate,
                reporting: r.reporting,
                facilities: r.facilities,
            })),
        [facilityRows]
    );

    const diseaseTableData = useMemo(() => {
        const items = surveillanceData?.data || [];
        return items.slice(0, 8).map((d: StrapiItem<DiseaseSurveillance>) => ({
            disease: d.diseaseName,
            region: d.region,
            cases: d.totalCases ?? 0,
            deaths: d.deaths ?? 0,
        }));
    }, [surveillanceData]);

    const totalMaternal = hubData?.totalMaternalDeaths ?? 137;
    const totalUnderFive = hubData?.totalUnderFiveDeaths ?? 292;
    const facilities = hubData?.facilitiesReportingCount ?? 1200;
    const diseaseLines = hubData?.diseaseReportsActive ?? surveillanceData?.data?.length ?? 0;

    const barColors = ['#0c4a6e', '#0369a1', '#0284c7', '#0d9488', '#059669', '#ca8a04'];

    const uniqueDistricts = useMemo(() => {
        const s = new Set<string>();
        facilityRows.forEach((r) => s.add(r.district));
        alerts.forEach((a: { district: string }) => s.add(a.district));
        return Array.from(s);
    }, [facilityRows, alerts]);

    return (
        <>
            <Header />
            <main className="hidash-page">
                {/* Hero */}
                <section className="hidash-hero">
                    <div className="hidash-hero-bg" aria-hidden="true" />
                    <div className="container hidash-hero-inner">
                        <nav className="hidash-breadcrumb" aria-label="Breadcrumb">
                            <a href="/">Home</a>
                            <span>/</span>
                            <span>Health Information Hub</span>
                        </nav>
                        <p className="hidash-eyebrow">
                            <i className="fas fa-network-wired"></i> National aggregate view
                        </p>
                        <h1 className="hidash-title">Health Information Hub</h1>
                        <p className="hidash-lead">
                            District-level and facility-network indicators across Sierra Leone. Data is integrated from the Ministry
                            information pipeline (including DHIS2-derived aggregates).
                        </p>
                        <div className="hidash-hero-actions">
                            <a href="/" className="hidash-btn-outline">
                                <i className="fas fa-arrow-left"></i> Back to site
                            </a>
                            <span className="hidash-hero-meta">
                                <span className="hidash-live">
                                    <span className="hidash-live-dot"></span> Synced view
                                </span>
                                <time dateTime={new Date().toISOString()}>
                                    {new Date().toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                                </time>
                            </span>
                        </div>
                    </div>
                </section>

                <section className="hidash-body">
                    <div className="container">
                        {/* Confidentiality */}
                        <div className="hidash-confidential" role="note">
                            <div className="hidash-confidential-icon">
                                <i className="fas fa-shield-alt"></i>
                            </div>
                            <div>
                                <strong>Public transparency, protected detail</strong>
                                <p>
                                    This dashboard shows <em>aggregated</em> national and district-level indicators only. It does not include
                                    patient-identifiable information, facility-level clinical detail, or other restricted data. Authorised
                                    Ministry systems retain full operational datasets.
                                </p>
                            </div>
                        </div>

                        {/* Network strip */}
                        <div className="hidash-strip">
                            <div className="hidash-strip-item">
                                <span className="hidash-strip-value">{DISTRICT_COUNT}</span>
                                <span className="hidash-strip-label">Districts in network</span>
                            </div>
                            <div className="hidash-strip-divider" />
                            <div className="hidash-strip-item">
                                <span className="hidash-strip-value">{facilities}+</span>
                                <span className="hidash-strip-label">Health facilities reporting</span>
                            </div>
                            <div className="hidash-strip-divider" />
                            <div className="hidash-strip-item">
                                <span className="hidash-strip-value">{diseaseLines}</span>
                                <span className="hidash-strip-label">Active surveillance lines (agg.)</span>
                            </div>
                            <div className="hidash-strip-divider" />
                            <div className="hidash-strip-item hidash-strip-wide">
                                <span className="hidash-strip-label">Source pipeline</span>
                                <span className="hidash-strip-pipeline">HMIS · DHIS2 aggregates · Ministry hub</span>
                            </div>
                        </div>

                        {/* KPIs */}
                        <div className="hidash-kpi-grid">
                            <article className="hidash-kpi">
                                <div className="hidash-kpi-top">
                                    <span className="hidash-kpi-icon hidash-kpi-maternal"><i className="fas fa-female"></i></span>
                                    <span className="hidash-kpi-tag">National aggregate · 2025</span>
                                </div>
                                <span className="hidash-kpi-value">{totalMaternal}</span>
                                <span className="hidash-kpi-label">Maternal deaths (reported total)</span>
                            </article>
                            <article className="hidash-kpi">
                                <div className="hidash-kpi-top">
                                    <span className="hidash-kpi-icon hidash-kpi-child"><i className="fas fa-baby"></i></span>
                                    <span className="hidash-kpi-tag">National aggregate · 2025</span>
                                </div>
                                <span className="hidash-kpi-value">{totalUnderFive}</span>
                                <span className="hidash-kpi-label">Under-five deaths (reported total)</span>
                            </article>
                            <article className="hidash-kpi">
                                <div className="hidash-kpi-top">
                                    <span className="hidash-kpi-icon hidash-kpi-facility"><i className="fas fa-hospital"></i></span>
                                    <span className="hidash-kpi-tag">Reporting network</span>
                                </div>
                                <span className="hidash-kpi-value">{facilities}+</span>
                                <span className="hidash-kpi-label">Facilities submitting routine data</span>
                            </article>
                            <article className="hidash-kpi">
                                <div className="hidash-kpi-top">
                                    <span className="hidash-kpi-icon hidash-kpi-district"><i className="fas fa-map"></i></span>
                                    <span className="hidash-kpi-tag">Geographic coverage</span>
                                </div>
                                <span className="hidash-kpi-value">{DISTRICT_COUNT}</span>
                                <span className="hidash-kpi-label">Districts represented</span>
                            </article>
                        </div>

                        {/* District dots */}
                        <div className="hidash-districts-card">
                            <div className="hidash-section-head">
                                <h2>District coverage</h2>
                                <p>
                                    All {DISTRICT_COUNT} districts are on the national reporting network. Below are districts with published aggregate
                                    indicators in this view; others remain connected with data held for official use only.
                                </p>
                            </div>
                            <div className="hidash-district-pills">
                                {uniqueDistricts.map((name) => (
                                    <span key={name} className="hidash-district-pill" title={`${name} — aggregate reporting`}>
                                        {name.length > 18 ? `${name.slice(0, 16)}…` : name}
                                    </span>
                                ))}
                                {uniqueDistricts.length < DISTRICT_COUNT && (
                                    <span className="hidash-district-pill hidash-district-pill-more" title="Additional districts on network">
                                        +{DISTRICT_COUNT - uniqueDistricts.length} districts
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Charts */}
                        <div className="hidash-charts">
                            <article className="hidash-panel">
                                <header className="hidash-panel-head">
                                    <div>
                                        <h3>Maternal mortality trend</h3>
                                        <p className="hidash-panel-sub">Quarterly national aggregates</p>
                                    </div>
                                    <span className="hidash-chip">2025</span>
                                </header>
                                <div className="hidash-panel-body">
                                    <ResponsiveContainer width="100%" height={240}>
                                        <LineChart data={quarterly} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.35)" vertical={false} />
                                            <XAxis dataKey="period" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                                            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                                            <Tooltip content={<ChartTooltip />} />
                                            <Line type="monotone" dataKey="value" stroke="#0c4a6e" strokeWidth={3} dot={{ r: 4, fill: '#0c4a6e' }} activeDot={{ r: 6 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </article>
                            <article className="hidash-panel">
                                <header className="hidash-panel-head">
                                    <div>
                                        <h3>Monthly pattern</h3>
                                        <p className="hidash-panel-sub">Same indicator, monthly resolution</p>
                                    </div>
                                    <span className="hidash-chip hidash-chip-teal">Monthly</span>
                                </header>
                                <div className="hidash-panel-body">
                                    <ResponsiveContainer width="100%" height={240}>
                                        <LineChart data={monthly} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.35)" vertical={false} />
                                            <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                                            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                                            <Tooltip content={<ChartTooltip />} />
                                            <Line type="monotone" dataKey="value" stroke="#0d9488" strokeWidth={3} dot={{ r: 4, fill: '#0d9488' }} activeDot={{ r: 6 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </article>
                        </div>

                        {/* Facility reporting by district */}
                        <article className="hidash-panel hidash-panel-wide">
                            <header className="hidash-panel-head">
                                <div>
                                    <h3>Facility reporting by district</h3>
                                    <p className="hidash-panel-sub">
                                        Share of facilities submitting routine returns (aggregate). No patient or case-level detail.
                                    </p>
                                </div>
                            </header>
                            <div className="hidash-panel-body hidash-bar-wrap">
                                <ResponsiveContainer width="100%" height={Math.max(220, facilityChartData.length * 36)}>
                                    <BarChart data={facilityChartData} layout="vertical" margin={{ left: 8, right: 24, top: 8, bottom: 8 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.25)" horizontal={false} />
                                        <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                                        <YAxis type="category" dataKey="name" width={100} tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
                                        <Tooltip
                                            content={({ active, payload }) =>
                                                active && payload?.[0] ? (
                                                    <div className="hidash-tooltip">
                                                        <span className="hidash-tooltip-label">{(payload[0].payload as { fullName: string }).fullName}</span>
                                                        <span className="hidash-tooltip-value">{payload[0].value}% reporting</span>
                                                        <span className="hidash-tooltip-extra">
                                                            {(payload[0].payload as { reporting: number; facilities: number }).reporting} /{' '}
                                                            {(payload[0].payload as { facilities: number }).facilities} facilities
                                                        </span>
                                                    </div>
                                                ) : null
                                            }
                                        />
                                        <Bar dataKey="rate" radius={[0, 6, 6, 0]} maxBarSize={22}>
                                            {facilityChartData.map((_, i) => (
                                                <Cell key={i} fill={barColors[i % barColors.length]} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </article>

                        {/* Full-width strip so all four indicators sit in one row (desktop) */}
                        <article className="hidash-panel hidash-panel-wide">
                            <header className="hidash-panel-head">
                                <div>
                                    <h3>National programme coverage</h3>
                                    <p className="hidash-panel-sub">Public programme indicators (%)</p>
                                </div>
                            </header>
                            <div className="hidash-coverage-rings">
                                {coverage.map((item: { label: string; value: number; color: string; icon: string }, i: number) => (
                                    <div key={i} className="hidash-ring-item">
                                        <CircleProgress value={item.value} color={item.color} />
                                        <div className="hidash-ring-label">
                                            <i className={`fas ${item.icon}`} style={{ color: item.color }}></i>
                                            <span>{item.label}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </article>

                        <article className="hidash-panel hidash-panel-wide">
                                <header className="hidash-panel-head">
                                    <div>
                                        <h3>District surveillance posture</h3>
                                        <p className="hidash-panel-sub">Operational status — not individual health records</p>
                                    </div>
                                    <span className="hidash-chip hidash-chip-amber">
                                        {alerts.filter((a: { status: string }) => a.status !== 'normal').length} elevated
                                    </span>
                                </header>
                                <ul className="hidash-status-list">
                                    {alerts.map((alert: { district: string; status: string; activeCases: number; lastUpdate: string }, i: number) => (
                                        <li key={i} className={`hidash-status-row hidash-status-${alert.status}`}>
                                            <span className={`hidash-status-dot hidash-sdot-${alert.status}`} />
                                            <div className="hidash-status-main">
                                                <span className="hidash-status-district">{alert.district}</span>
                                                <span className="hidash-status-meta">
                                                    {monitoringLabel(alert.status)} monitoring · {alert.lastUpdate}
                                                </span>
                                            </div>
                                            <div className="hidash-status-agg" title="District-level aggregate indicator only">
                                                <span className="hidash-agg-label">Agg. index</span>
                                                <span className="hidash-agg-val">{alert.activeCases}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <p className="hidash-footnote">
                                    <i className="fas fa-info-circle"></i> “Agg. index” is a district-level summary figure for public dashboards; it is not a patient count.
                                </p>
                            </article>

                        {/* Disease summary */}
                        {diseaseTableData.length > 0 && (
                            <article className="hidash-panel hidash-panel-table">
                                <header className="hidash-panel-head">
                                    <div>
                                        <h3>Regional disease summary</h3>
                                        <p className="hidash-panel-sub">Aggregated surveillance — no identifiable cases</p>
                                    </div>
                                    <a href="/emergency" className="hidash-link">
                                        Emergency info <i className="fas fa-arrow-right"></i>
                                    </a>
                                </header>
                                <div className="hidash-table-scroll">
                                    <table className="hidash-table">
                                        <thead>
                                            <tr>
                                                <th>Condition</th>
                                                <th>Region</th>
                                                <th>Cases (agg.)</th>
                                                <th>Deaths (agg.)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {diseaseTableData.map((row, i) => (
                                                <tr key={i}>
                                                    <td className="hidash-td-strong">{row.disease}</td>
                                                    <td>{row.region}</td>
                                                    <td>{row.cases.toLocaleString()}</td>
                                                    <td>{row.deaths.toLocaleString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </article>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
