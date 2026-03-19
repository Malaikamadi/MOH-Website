import { useMemo } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { useApi } from '../../hooks/useApi';
import { getDiseaseSurveillance } from '../../services/api';
import type { StrapiItem, DiseaseSurveillance } from '../../services/api';

/* ─── Sample Data ─── */
const maternalDeathsQuarterly = [
    { period: 'Q1', year: 2025, value: 27 },
    { period: 'Q2', year: 2025, value: 41 },
    { period: 'Q3', year: 2025, value: 43 },
    { period: 'Q4', year: 2025, value: 26 },
    { period: 'Q1', year: 2026, value: 0 },
    { period: 'Q2', year: 2026, value: 0 },
    { period: 'Q3', year: 2026, value: 0 },
    { period: 'Q4', year: 2026, value: 0 },
];

const maternalDeathsMonthly = [
    { month: 'Jan', value: 6 },
    { month: 'Feb', value: 11 },
    { month: 'Mar', value: 10 },
    { month: 'Apr', value: 14 },
    { month: 'May', value: 13 },
    { month: 'Jun', value: 14 },
    { month: 'Jul', value: 18 },
    { month: 'Aug', value: 18 },
    { month: 'Sep', value: 8 },
    { month: 'Oct', value: 11 },
    { month: 'Nov', value: 10 },
    { month: 'Dec', value: 5 },
];

const healthCoverage = [
    { label: 'Vaccination', value: 85, color: '#059669', icon: 'fa-syringe' },
    { label: 'PHU Coverage', value: 100, color: '#2563eb', icon: 'fa-clinic-medical' },
    { label: 'ANC Visits', value: 72, color: '#7c3aed', icon: 'fa-heartbeat' },
    { label: 'Birth Registration', value: 64, color: '#f59e0b', icon: 'fa-file-medical' },
];

const districtAlerts = [
    { district: 'Western Area Urban', status: 'normal', activeCases: 12, lastUpdate: '2 hrs ago' },
    { district: 'Kenema', status: 'warning', activeCases: 47, lastUpdate: '30 min ago' },
    { district: 'Bo', status: 'normal', activeCases: 8, lastUpdate: '1 hr ago' },
    { district: 'Bombali', status: 'critical', activeCases: 89, lastUpdate: '15 min ago' },
    { district: 'Port Loko', status: 'warning', activeCases: 34, lastUpdate: '45 min ago' },
    { district: 'Kailahun', status: 'normal', activeCases: 5, lastUpdate: '3 hrs ago' },
];

const diseaseOutbreaks = [
    { disease: 'Malaria', cases: 4523, region: 'Western Area', trend: 'down' as const },
    { disease: 'Cholera', cases: 312, region: 'Eastern Province', trend: 'up' as const },
    { disease: 'Measles', cases: 187, region: 'Northern Province', trend: 'down' as const },
    { disease: 'Typhoid', cases: 256, region: 'Southern Province', trend: 'stable' as const },
    { disease: 'Lassa Fever', cases: 43, region: 'Kenema District', trend: 'down' as const },
];

const facilityReports = [
    { district: 'Western Area Urban', facilities: 145, reporting: 138, rate: 95 },
    { district: 'Bo', facilities: 98, reporting: 89, rate: 91 },
    { district: 'Kenema', facilities: 112, reporting: 101, rate: 90 },
    { district: 'Bombali', facilities: 87, reporting: 76, rate: 87 },
    { district: 'Port Loko', facilities: 93, reporting: 79, rate: 85 },
    { district: 'Kono', facilities: 64, reporting: 52, rate: 81 },
];

const TOTAL_MATERNAL = 137;
const TOTAL_UNDER_FIVE = 292;
const DISTRICTS = 16;
const FACILITIES = 1200;

/* ─── Custom Tooltip ─── */
function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
    if (active && payload && payload.length) {
        return (
            <div className="hih-chart-tooltip">
                <span className="hih-tooltip-label">{label}</span>
                <span className="hih-tooltip-value">{payload[0].value}</span>
            </div>
        );
    }
    return null;
}

/* ─── Custom Dot ─── */
function CustomDot(props: { cx?: number; cy?: number; value?: number }) {
    const { cx, cy, value } = props;
    if (cx === undefined || cy === undefined) return null;
    return (
        <g>
            <circle cx={cx} cy={cy} r={4} fill="#2563eb" stroke="#fff" strokeWidth={2} />
            <text x={cx} y={cy - 12} textAnchor="middle" fill="#334155" fontSize={11} fontWeight={600}>
                {value}
            </text>
        </g>
    );
}

/* ─── SVG Circular Progress ─── */
function CircleProgress({ value, color, size = 80, strokeWidth = 7 }: {
    value: number; color: string; size?: number; strokeWidth?: number;
}) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;
    return (
        <svg width={size} height={size} className="hih-circle-svg">
            <circle
                cx={size / 2} cy={size / 2} r={radius}
                fill="none" stroke="#f1f5f9" strokeWidth={strokeWidth}
            />
            <circle
                cx={size / 2} cy={size / 2} r={radius}
                fill="none" stroke={color} strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                className="hih-circle-progress"
            />
            <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle"
                fill="#0f172a" fontSize={size * 0.2} fontWeight="800">
                {value}%
            </text>
        </svg>
    );
}

export default function InfoHubDashboard() {
    const { data: surveillanceData } = useApi(() => getDiseaseSurveillance({ limit: 5 }));

    const surveillanceSummary = useMemo(() => {
        const items = surveillanceData?.data || [];
        const totalCases = items.reduce(
            (sum: number, d: StrapiItem<DiseaseSurveillance>) => sum + (d.totalCases || 0),
            0
        );
        return { count: items.length, totalCases };
    }, [surveillanceData]);

    const quarterlyLabels = maternalDeathsQuarterly.map(
        (d) => `${d.period}\n${d.year}`
    );
    void quarterlyLabels;

    return (
        <section className="hih-section" id="health-information-hub">
            <div className="container">
                {/* Section Header */}
                <div className="hih-header">
                    <h2 className="hih-title">Health Information Hub</h2>
                    <p className="hih-subtitle">
                        Real-time health data collected across Sierra Leone's {DISTRICTS} districts and {FACILITIES}+ health facilities.
                    </p>
                </div>

                {/* Summary Stat Cards */}
                <div className="hih-summary-row">
                    <div className="hih-summary-card">
                        <div className="hih-summary-icon hih-icon-maternal">
                            <i className="fas fa-female"></i>
                        </div>
                        <div className="hih-summary-info">
                            <span className="hih-summary-label">Maternal Deaths</span>
                            <span className="hih-summary-value">{TOTAL_MATERNAL}</span>
                        </div>
                        <span className="hih-summary-badge hih-badge-caution">2025 Total</span>
                    </div>
                    <div className="hih-summary-card">
                        <div className="hih-summary-icon hih-icon-child">
                            <i className="fas fa-baby"></i>
                        </div>
                        <div className="hih-summary-info">
                            <span className="hih-summary-label">Under-Five Deaths</span>
                            <span className="hih-summary-value">{TOTAL_UNDER_FIVE}</span>
                        </div>
                        <span className="hih-summary-badge hih-badge-caution">2025 Total</span>
                    </div>
                    <div className="hih-summary-card">
                        <div className="hih-summary-icon hih-icon-disease">
                            <i className="fas fa-virus"></i>
                        </div>
                        <div className="hih-summary-info">
                            <span className="hih-summary-label">Disease Reports</span>
                            <span className="hih-summary-value">{surveillanceSummary.count || diseaseOutbreaks.length}</span>
                        </div>
                        <span className="hih-summary-badge hih-badge-info">Active</span>
                    </div>
                    <div className="hih-summary-card">
                        <div className="hih-summary-icon hih-icon-facility">
                            <i className="fas fa-hospital"></i>
                        </div>
                        <div className="hih-summary-info">
                            <span className="hih-summary-label">Facilities Reporting</span>
                            <span className="hih-summary-value">{FACILITIES}+</span>
                        </div>
                        <span className="hih-summary-badge hih-badge-success">Online</span>
                    </div>
                </div>

                {/* Charts Grid */}
                <div className="hih-section-label">
                    <h3>Data Representation</h3>
                    <p>Detailed mortality trends across quarters and months.</p>
                </div>

                <div className="hih-charts-grid">
                    {/* Maternal Deaths Quarterly */}
                    <div className="hih-chart-card">
                        <div className="hih-chart-header">
                            <h4>Maternal Deaths Report by Quarter</h4>
                            <span className="hih-chart-badge">Quarterly</span>
                        </div>
                        <div className="hih-chart-body">
                            <ResponsiveContainer width="100%" height={240}>
                                <LineChart data={maternalDeathsQuarterly} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                    <XAxis
                                        dataKey="period"
                                        tick={{ fill: '#64748b', fontSize: 12 }}
                                        axisLine={{ stroke: '#cbd5e1' }}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        tick={{ fill: '#64748b', fontSize: 12 }}
                                        axisLine={{ stroke: '#cbd5e1' }}
                                        tickLine={false}
                                    />
                                    <Tooltip content={<ChartTooltip />} />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#2563eb"
                                        strokeWidth={2.5}
                                        dot={<CustomDot />}
                                        activeDot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                            <div className="hih-chart-years">
                                <span>2025</span>
                                <span>2026</span>
                            </div>
                        </div>
                    </div>

                    {/* Health Coverage at a Glance */}
                    <div className="hih-coverage-card">
                        <div className="hih-coverage-header">
                            <div>
                                <h4>Health Coverage at a Glance</h4>
                                <p>National coverage indicators for 2025</p>
                            </div>
                            <span className="hih-live-dot"><span></span> Live</span>
                        </div>
                        <div className="hih-coverage-rings">
                            {healthCoverage.map((item, i) => (
                                <div className="hih-ring-item" key={i}>
                                    <CircleProgress value={item.value} color={item.color} />
                                    <div className="hih-ring-label">
                                        <i className={`fas ${item.icon}`} style={{ color: item.color }}></i>
                                        <span>{item.label}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="hih-coverage-footer">
                            <div className="hih-coverage-stat">
                                <span className="hih-cov-num">8M+</span>
                                <span className="hih-cov-label">Citizens Covered</span>
                            </div>
                            <div className="hih-coverage-divider"></div>
                            <div className="hih-coverage-stat">
                                <span className="hih-cov-num">1,200+</span>
                                <span className="hih-cov-label">Health Facilities</span>
                            </div>
                            <div className="hih-coverage-divider"></div>
                            <div className="hih-coverage-stat">
                                <span className="hih-cov-num">16</span>
                                <span className="hih-cov-label">Districts</span>
                            </div>
                        </div>
                    </div>

                    {/* Maternal Deaths Monthly */}
                    <div className="hih-chart-card">
                        <div className="hih-chart-header">
                            <h4>Maternal Death Reported by Months</h4>
                            <span className="hih-chart-badge">Monthly</span>
                        </div>
                        <div className="hih-chart-body">
                            <ResponsiveContainer width="100%" height={240}>
                                <LineChart data={maternalDeathsMonthly} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                    <XAxis
                                        dataKey="month"
                                        tick={{ fill: '#64748b', fontSize: 11 }}
                                        axisLine={{ stroke: '#cbd5e1' }}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        tick={{ fill: '#64748b', fontSize: 12 }}
                                        axisLine={{ stroke: '#cbd5e1' }}
                                        tickLine={false}
                                    />
                                    <Tooltip content={<ChartTooltip />} />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#2563eb"
                                        strokeWidth={2.5}
                                        dot={<CustomDot />}
                                        activeDot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* District Health Alerts */}
                    <div className="hih-alerts-card">
                        <div className="hih-alerts-header">
                            <div>
                                <h4><i className="fas fa-bell"></i> District Health Alerts</h4>
                                <p>Real-time surveillance status by district</p>
                            </div>
                            <span className="hih-alerts-count">
                                {districtAlerts.filter(a => a.status !== 'normal').length} Active
                            </span>
                        </div>
                        <div className="hih-alerts-list">
                            {districtAlerts.map((alert, i) => (
                                <div className={`hih-alert-row hih-alert-${alert.status}`} key={i}>
                                    <div className="hih-alert-status">
                                        <span className={`hih-status-dot hih-dot-${alert.status}`}></span>
                                    </div>
                                    <div className="hih-alert-info">
                                        <span className="hih-alert-district">{alert.district}</span>
                                        <span className="hih-alert-time">{alert.lastUpdate}</span>
                                    </div>
                                    <div className="hih-alert-cases">
                                        <span className="hih-alert-num">{alert.activeCases}</span>
                                        <span className="hih-alert-label">cases</span>
                                    </div>
                                    <span className={`hih-priority-badge hih-priority-${alert.status}`}>
                                        {alert.status === 'critical' ? 'Critical' : alert.status === 'warning' ? 'Warning' : 'Normal'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Disease Surveillance + Facility Reporting */}
                <div className="hih-data-grid">
                    {/* Disease Surveillance Table */}
                    <div className="hih-table-card">
                        <div className="hih-table-header">
                            <h4><i className="fas fa-shield-virus"></i> Disease Surveillance</h4>
                            <a href="/emergency" className="hih-view-link">View All <i className="fas fa-arrow-right"></i></a>
                        </div>
                        <table className="hih-table">
                            <thead>
                                <tr>
                                    <th>Disease</th>
                                    <th>Region</th>
                                    <th>Cases</th>
                                    <th>Trend</th>
                                </tr>
                            </thead>
                            <tbody>
                                {diseaseOutbreaks.map((d, i) => (
                                    <tr key={i}>
                                        <td className="hih-disease-name">{d.disease}</td>
                                        <td>{d.region}</td>
                                        <td className="hih-cases-cell">{d.cases.toLocaleString()}</td>
                                        <td>
                                            <span className={`hih-trend hih-trend-${d.trend}`}>
                                                <i className={`fas fa-arrow-${d.trend === 'up' ? 'up' : d.trend === 'down' ? 'down' : 'right'}`}></i>
                                                {d.trend.charAt(0).toUpperCase() + d.trend.slice(1)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Facility Reporting Table */}
                    <div className="hih-table-card">
                        <div className="hih-table-header">
                            <h4><i className="fas fa-hospital-alt"></i> Facility Reporting Rates</h4>
                            <a href="/emergency" className="hih-view-link">View All <i className="fas fa-arrow-right"></i></a>
                        </div>
                        <table className="hih-table">
                            <thead>
                                <tr>
                                    <th>District</th>
                                    <th>Facilities</th>
                                    <th>Reporting</th>
                                    <th>Rate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {facilityReports.map((f, i) => (
                                    <tr key={i}>
                                        <td className="hih-disease-name">{f.district}</td>
                                        <td>{f.facilities}</td>
                                        <td>{f.reporting}</td>
                                        <td>
                                            <div className="hih-rate-cell">
                                                <div className="hih-rate-bar">
                                                    <div
                                                        className="hih-rate-fill"
                                                        style={{ width: `${f.rate}%` }}
                                                    ></div>
                                                </div>
                                                <span className="hih-rate-text">{f.rate}%</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* CTA */}
                <div className="hih-cta">
                    <a href="/emergency" className="hih-cta-btn">
                        <i className="fas fa-chart-line"></i>
                        Explore Full Dashboard
                    </a>
                </div>
            </div>
        </section>
    );
}
