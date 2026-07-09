import { useState, useMemo } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useApi } from '../hooks/useApi';
import { getJobs } from '../services/api';
import type { StrapiItem } from '../services/api';

const locations = ['All Locations', 'Freetown', 'Bo', 'Kenema', 'Makeni', 'Port Loko', 'Kono', 'Kambia', 'Kailahun', 'Tonkolili', 'Bombali', 'Moyamba', 'Pujehun', 'Bonthe', 'Western Area Urban', 'Western Area Rural', 'National'];

const filterGroups = {
    jobType: [
        { label: 'Full Time' },
        { label: 'Part Time' },
        { label: 'Contract' },
        { label: 'Internship' },
        { label: 'Consultancy' },
    ],
    sector: [
        { label: 'Medical' },
        { label: 'Nursing' },
        { label: 'Administration' },
        { label: 'Digital Health' },
        { label: 'Finance' },
        { label: 'Human Resources' },
    ],
    experience: [
        { label: 'Entry Level' },
        { label: 'Mid Level' },
        { label: 'Senior Level' },
    ],
};

const benefits = [
    { icon: 'graduation-cap', title: 'Professional Development', description: 'Access continuous training programs, workshops, and scholarships to advance your healthcare career.' },
    { icon: 'hand-holding-heart', title: 'Comprehensive Benefits', description: 'Competitive salary packages, health insurance coverage, and retirement benefits for all staff.' },
    { icon: 'globe-africa', title: 'Make an Impact', description: 'Directly contribute to improving healthcare delivery and health outcomes across Sierra Leone.' },
    { icon: 'users', title: 'Collaborative Culture', description: 'Work alongside leading organizations including WHO, UNICEF, and other global health partners.' },
];

function getTagClass(tag: string): string {
    if (tag === 'Urgent') return 'jp-tag-urgent';
    if (tag === 'Remote Friendly') return 'jp-tag-remote';
    return 'jp-tag-default';
}

const iconColors: Record<string, string> = {
    'laptop-medical': '#6366f1',
    'user-nurse': '#ec4899',
    'user-md': '#0ea5e9',
    'chart-line': '#10b981',
    'users-cog': '#f59e0b',
};

function formatDeadline(dateStr: string) {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
    });
}

function ensureTags(tags: unknown): string[] {
    if (Array.isArray(tags)) return tags;
    if (typeof tags === 'object' && tags !== null) return Object.values(tags) as string[];
    return [];
}

export default function JobPortalPage() {
    const [keyword, setKeyword] = useState('');
    const [locationFilter, setLocationFilter] = useState('All Locations');
    const [sortBy, setSortBy] = useState('newest');
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
    const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
    const [alertEmail, setAlertEmail] = useState('');

    const { data: jobsRes, loading } = useApi(
        () => getJobs({ limit: 100 }),
        []
    );

    const jobs = jobsRes?.data || [];

    const filteredJobs = useMemo(() => {
        let result = jobs.filter((job: StrapiItem<{ title: string; sector: string; location: string; jobType: string; tags: unknown; experienceLevel: string }>) => {
            const tags = ensureTags(job.tags);
            const matchKeyword = !keyword || job.title.toLowerCase().includes(keyword.toLowerCase()) || job.sector.toLowerCase().includes(keyword.toLowerCase()) || tags.some((t: string) => t.toLowerCase().includes(keyword.toLowerCase()));
            const matchLocation = locationFilter === 'All Locations' || job.location === locationFilter;
            const matchType = selectedTypes.length === 0 || selectedTypes.includes(job.jobType);
            const matchSector = selectedSectors.length === 0 || selectedSectors.includes(job.sector);
            const matchExperience = selectedExperience.length === 0 || !job.experienceLevel || selectedExperience.includes(job.experienceLevel);
            return matchKeyword && matchLocation && matchType && matchSector && matchExperience;
        });
        if (sortBy === 'deadline') {
            result = [...result].sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
        } else if (sortBy === 'title') {
            result = [...result].sort((a, b) => a.title.localeCompare(b.title));
        } else {
            result = [...result].sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        }
        return result;
    }, [jobs, keyword, locationFilter, selectedTypes, selectedSectors, selectedExperience, sortBy]);

    function toggleFilter(_list: string[], item: string, setter: React.Dispatch<React.SetStateAction<string[]>>) {
        setter(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
    }

    function clearAllFilters() {
        setSelectedTypes([]);
        setSelectedSectors([]);
        setSelectedExperience([]);
        setKeyword('');
        setLocationFilter('All Locations');
    }

    return (
        <>
            <Header />
            <main>
                {/* Hero Section */}
                <section className="jp-hero">
                    <div className="jp-hero-dots"></div>
                    <div className="container">
                        <div className="jp-hero-content">
                            <span className="jp-hero-badge">
                                <i className="fas fa-briefcase"></i> Career Opportunities
                            </span>
                            <h1 className="jp-hero-title">
                                Find Your <span className="jp-gold">Dream Job</span> in Healthcare
                            </h1>
                            <p className="jp-hero-subtitle">
                                Join Sierra Leone's Ministry of Health and make a difference in public healthcare delivery across all 16 districts.
                            </p>

                            <div className="jp-search-card">
                                <div className="jp-search-grid">
                                    <div className="jp-search-field">
                                        <i className="fas fa-search"></i>
                                        <input
                                            type="text"
                                            placeholder="Job title, keyword, or sector..."
                                            value={keyword}
                                            onChange={e => setKeyword(e.target.value)}
                                        />
                                    </div>
                                    <div className="jp-search-field">
                                        <i className="fas fa-map-marker-alt"></i>
                                        <select value={locationFilter} onChange={e => setLocationFilter(e.target.value)}>
                                            {locations.map(loc => (
                                                <option key={loc} value={loc}>{loc}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <button className="jp-search-btn">
                                        <i className="fas fa-search"></i> Search Jobs
                                    </button>
                                </div>
                            </div>

                            <div className="jp-stats-bar">
                                <div className="jp-stat">
                                    <span className="jp-stat-number">{loading ? '...' : jobs.length}</span>
                                    <span className="jp-stat-label">Open Positions</span>
                                </div>
                                <div className="jp-stat-divider"></div>
                                <div className="jp-stat">
                                    <span className="jp-stat-number">16</span>
                                    <span className="jp-stat-label">Districts</span>
                                </div>
                                <div className="jp-stat-divider"></div>
                                <div className="jp-stat">
                                    <span className="jp-stat-number">8</span>
                                    <span className="jp-stat-label">Sectors</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Jobs Content */}
                <section className="jp-content">
                    <div className="container">
                        <div className="jp-content-grid">
                            {/* Sidebar */}
                            <aside className="jp-sidebar">
                                <div className="jp-sidebar-header">
                                    <h3><i className="fas fa-sliders-h"></i> Filters</h3>
                                    <button className="jp-clear-btn" onClick={clearAllFilters}>Clear All</button>
                                </div>

                                <div className="jp-filter-group">
                                    <h4 className="jp-filter-title">Job Type</h4>
                                    {filterGroups.jobType.map(item => (
                                        <label key={item.label} className="jp-filter-option">
                                            <input
                                                type="checkbox"
                                                checked={selectedTypes.includes(item.label)}
                                                onChange={() => toggleFilter(selectedTypes, item.label, setSelectedTypes)}
                                            />
                                            <span className="jp-checkbox"></span>
                                            <span className="jp-filter-label">{item.label}</span>
                                        </label>
                                    ))}
                                </div>

                                <div className="jp-filter-group">
                                    <h4 className="jp-filter-title">Sector</h4>
                                    {filterGroups.sector.map(item => (
                                        <label key={item.label} className="jp-filter-option">
                                            <input
                                                type="checkbox"
                                                checked={selectedSectors.includes(item.label)}
                                                onChange={() => toggleFilter(selectedSectors, item.label, setSelectedSectors)}
                                            />
                                            <span className="jp-checkbox"></span>
                                            <span className="jp-filter-label">{item.label}</span>
                                        </label>
                                    ))}
                                </div>

                                <div className="jp-filter-group">
                                    <h4 className="jp-filter-title">Experience Level</h4>
                                    {filterGroups.experience.map(item => (
                                        <label key={item.label} className="jp-filter-option">
                                            <input
                                                type="checkbox"
                                                checked={selectedExperience.includes(item.label)}
                                                onChange={() => toggleFilter(selectedExperience, item.label, setSelectedExperience)}
                                            />
                                            <span className="jp-checkbox"></span>
                                            <span className="jp-filter-label">{item.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </aside>

                            {/* Main Jobs List */}
                            <div className="jp-jobs-main">
                                <div className="jp-jobs-header">
                                    <p className="jp-jobs-count">
                                        Showing <strong>{filteredJobs.length}</strong> available positions
                                    </p>
                                    <div className="jp-sort">
                                        <label>Sort by:</label>
                                        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                                            <option value="newest">Newest First</option>
                                            <option value="deadline">Deadline</option>
                                            <option value="title">Title A-Z</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="jp-jobs-list">
                                    {loading && (
                                        <div className="jp-no-results">
                                            <i className="fas fa-spinner fa-spin"></i>
                                            <h3>Loading jobs...</h3>
                                        </div>
                                    )}
                                    {!loading && filteredJobs.map((job, index) => (
                                        <div
                                            key={job.id}
                                            className={`jp-job-card ${job.featured ? 'jp-featured' : ''}`}
                                            style={{ animationDelay: `${index * 0.1}s` }}
                                        >
                                            <div className="jp-job-card-grid">
                                                <div
                                                    className="jp-job-icon"
                                                    style={{ background: iconColors[job.icon] || '#6366f1' }}
                                                >
                                                    <i className={`fas fa-${job.icon || 'briefcase'}`}></i>
                                                </div>

                                                <div className="jp-job-info">
                                                    <h3 className="jp-job-title">{job.title}</h3>
                                                    <div className="jp-job-meta">
                                                        <span><i className="fas fa-building"></i> {job.sector}</span>
                                                        <span><i className="fas fa-map-marker-alt"></i> {job.location}</span>
                                                        <span><i className="fas fa-clock"></i> {job.jobType}</span>
                                                    </div>
                                                    <div className="jp-job-tags">
                                                        {ensureTags(job.tags).map(tag => (
                                                            <span key={tag} className={`jp-tag ${getTagClass(tag)}`}>{tag}</span>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="jp-job-actions">
                                                    <span className="jp-deadline">
                                                        <i className="fas fa-calendar-alt"></i> Deadline: {formatDeadline(job.deadline)}
                                                    </span>
                                                    <a
                                                        href={job.applyLink || `mailto:jobs@mohs.gov.sl?subject=Application: ${encodeURIComponent(job.title)}`}
                                                        target={job.applyLink ? '_blank' : undefined}
                                                        rel={job.applyLink ? 'noopener noreferrer' : undefined}
                                                        className="jp-apply-btn"
                                                    >
                                                        Apply Now <i className="fas fa-arrow-right"></i>
                                                    </a>
                                                    <button className="jp-save-btn">
                                                        <i className="far fa-bookmark"></i> Save
                                                    </button>
                                                </div>
                                            </div>
                                            {job.featured && (
                                                <span className="jp-featured-badge">
                                                    <i className="fas fa-star"></i> Featured
                                                </span>
                                            )}
                                        </div>
                                    ))}

                                    {!loading && filteredJobs.length === 0 && (
                                        <div className="jp-no-results">
                                            <i className="fas fa-search"></i>
                                            <h3>No positions found</h3>
                                            <p>Try adjusting your search criteria or filters.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Work With Us */}
                <section className="jp-why-section">
                    <div className="container">
                        <div className="jp-section-header">
                            <span className="jp-section-badge">
                                <i className="fas fa-heart"></i> Why Choose Us
                            </span>
                            <h2 className="jp-section-title">Why Work at the Ministry of Health?</h2>
                        </div>
                        <div className="jp-benefits-grid">
                            {benefits.map((b, i) => (
                                <div key={i} className="jp-benefit-card">
                                    <div className="jp-benefit-icon">
                                        <i className={`fas fa-${b.icon}`}></i>
                                    </div>
                                    <h3>{b.title}</h3>
                                    <p>{b.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Job Alerts */}
                <section className="jp-alerts-section">
                    <div className="container">
                        <div className="jp-alerts-box">
                            <div className="jp-alerts-icon">
                                <i className="fas fa-bell"></i>
                            </div>
                            <h2>Get Job Alerts</h2>
                            <p>Stay updated with the latest career opportunities at the Ministry of Health. Subscribe to receive notifications directly in your inbox.</p>
                            <div className="jp-alerts-form">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={alertEmail}
                                    onChange={e => setAlertEmail(e.target.value)}
                                />
                                <button className="jp-subscribe-btn">
                                    <i className="fas fa-paper-plane"></i> Subscribe
                                </button>
                            </div>
                            <span className="jp-alerts-privacy">
                                <i className="fas fa-lock"></i> We respect your privacy. Unsubscribe at any time.
                            </span>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
