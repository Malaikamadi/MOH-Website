export default function AboutOverview() {
    return (
        <section className="section about-overview-modern">
            <div className="container">
                <div className="about-modern-grid">
                    {/* Left Content */}
                    <div className="about-modern-content">
                        <div className="about-badge">
                            <i className="fas fa-shield-heart"></i>
                            <span>Serving Sierra Leone Since 1961</span>
                        </div>
                        <h2>Building a Healthier <span className="text-gradient">Sierra Leone</span></h2>
                        <p className="lead-text">
                            The Ministry of Health believes that access to sound health is a human right.
                            Our vision is to ensure a functional national health system delivering efficient, high quality
                            healthcare services.
                        </p>
                        <p>
                            We work in partnership with regulatory agencies, healthcare professionals, and international
                            partners to provide effective health services and improve the health of our citizens.
                        </p>

                        {/* Feature Highlights */}
                        <div className="about-highlights">
                            <div className="highlight-item">
                                <div className="highlight-icon">
                                    <i className="fas fa-check-circle"></i>
                                </div>
                                <div className="highlight-text">
                                    <h4>Universal Coverage</h4>
                                    <p>Healthcare accessible to all citizens across 16 districts</p>
                                </div>
                            </div>
                            <div className="highlight-item">
                                <div className="highlight-icon">
                                    <i className="fas fa-users"></i>
                                </div>
                                <div className="highlight-text">
                                    <h4>Community Health</h4>
                                    <p>15,000+ grassroots health workers serving communities</p>
                                </div>
                            </div>
                            <div className="highlight-item">
                                <div className="highlight-icon">
                                    <i className="fas fa-laptop-medical"></i>
                                </div>
                                <div className="highlight-text">
                                    <h4>Digital Transformation</h4>
                                    <p>Modern health technology and data-driven decisions</p>
                                </div>
                            </div>
                        </div>

                        <a href="#leadership" className="btn btn-primary btn-lg">
                            <i className="fas fa-users"></i>
                            Meet Our Leadership
                        </a>
                    </div>

                    {/* Right Image with Stats */}
                    <div className="about-modern-visual">
                        <div className="about-image-wrapper">
                            <img
                                src="/images/IMG_0100.avif"
                                alt="Healthcare in Sierra Leone"
                                onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=700&fit=crop'}
                            />
                            <div className="image-accent"></div>
                        </div>

                        {/* Floating Stats Card */}
                        <div className="about-stats-card">
                            <div className="stats-header">
                                <i className="fas fa-chart-line"></i>
                                <span>Key Achievements</span>
                            </div>
                            <div className="stats-grid">
                                <div className="stat-box">
                                    <span className="stat-number">1,200+</span>
                                    <span className="stat-text">Health Facilities</span>
                                </div>
                                <div className="stat-box">
                                    <span className="stat-number">8M+</span>
                                    <span className="stat-text">Citizens Served</span>
                                </div>
                                <div className="stat-box">
                                    <span className="stat-number">85%</span>
                                    <span className="stat-text">Vaccine Coverage</span>
                                </div>
                                <div className="stat-box">
                                    <span className="stat-number">100+</span>
                                    <span className="stat-text">Health Programs</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
