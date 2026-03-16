import { useApi } from '../../hooks/useApi';
import { getAboutPage, getMediaUrl } from '../../services/api';

export default function AboutOverview() {
    const { data: aboutRes } = useApi(getAboutPage);
    const a = aboutRes?.data;

    const highlights = a?.highlights?.length ? a.highlights : [
        { id: 1, icon: 'check-circle', title: 'Universal Coverage', description: 'Healthcare accessible to all citizens across 16 districts' },
        { id: 2, icon: 'users', title: 'Community Health', description: '15,000+ grassroots health workers serving communities' },
        { id: 3, icon: 'laptop-medical', title: 'Digital Transformation', description: 'Modern health technology and data-driven decisions' },
    ];

    const stats = a?.stats?.length ? a.stats : [
        { id: 1, value: '1,200+', label: 'Health Facilities' },
        { id: 2, value: '8M+', label: 'Citizens Served' },
        { id: 3, value: '85%', label: 'Vaccine Coverage' },
        { id: 4, value: '100+', label: 'Health Programs' },
    ];

    const imageUrl = a?.overviewImage ? getMediaUrl(a.overviewImage) : '/images/IMG_0100.avif';

    return (
        <section className="section about-overview-modern">
            <div className="container">
                <div className="about-modern-grid">
                    <div className="about-modern-content">
                        <div className="about-badge">
                            <i className="fas fa-shield-heart"></i>
                            <span>{a?.overviewBadge || 'Serving Sierra Leone Since 1961'}</span>
                        </div>
                        <h2>{a?.overviewHeadline || 'Building a Healthier'} <span className="text-gradient">Sierra Leone</span></h2>
                        <p className="lead-text">
                            {a?.overviewLeadText || 'The Ministry of Health believes that access to sound health is a human right. Our vision is to ensure a functional national health system delivering efficient, high quality healthcare services.'}
                        </p>
                        <p>{a?.overviewBodyText || 'We work in partnership with regulatory agencies, healthcare professionals, and international partners to provide effective health services and improve the health of our citizens.'}</p>

                        <div className="about-highlights">
                            {highlights.map((h) => (
                                <div key={h.id} className="highlight-item">
                                    <div className="highlight-icon">
                                        <i className={`fas fa-${h.icon}`}></i>
                                    </div>
                                    <div className="highlight-text">
                                        <h4>{h.title}</h4>
                                        <p>{h.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <a href="#leadership" className="btn btn-primary btn-lg">
                            <i className="fas fa-users"></i>
                            Meet Our Leadership
                        </a>
                    </div>

                    <div className="about-modern-visual">
                        <div className="about-image-wrapper">
                            <img
                                src={imageUrl}
                                alt="Healthcare in Sierra Leone"
                                onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=700&fit=crop'}
                            />
                            <div className="image-accent"></div>
                        </div>

                        <div className="about-stats-card">
                            <div className="stats-header">
                                <i className="fas fa-chart-line"></i>
                                <span>Key Achievements</span>
                            </div>
                            <div className="stats-grid">
                                {stats.map((stat) => (
                                    <div key={stat.id} className="stat-box">
                                        <span className="stat-number">{stat.value}</span>
                                        <span className="stat-text">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
