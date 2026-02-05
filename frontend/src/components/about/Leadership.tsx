const executiveTeam = [
    {
        name: 'Dr. Charlé J. Senessie',
        position: 'Deputy Minister 1',
        image: '/images/deputy.jpeg',
        fallback: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
        bio: 'Leading policy implementation and strategic health initiatives across Sierra Leone.'
    },
    {
        name: 'Dr. Jalikatu Mustapha',
        position: 'Deputy Minister 2',
        image: '/images/dm2.jpeg',
        fallback: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
        bio: 'Leading policy implementation and strategic health initiatives across Sierra Leone.'
    },
    {
        name: 'Dr. Sartie Kenneh',
        position: 'Chief Medical Officer',
        image: '/images/CMO (1).jpg',
        fallback: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
        bio: 'Overseeing clinical standards and medical protocols for national healthcare delivery.'
    },
    {
        name: 'Mr. Andrew L. Sorie',
        position: 'Senior Permanent Secretary',
        image: '/images/sps.jpeg',
        fallback: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop',
        bio: 'Managing administrative operations and coordinating ministry functions.'
    },
    {
        name: 'Dr. Mustapha Kabba',
        position: 'Deputy CMO',
        image: '/images/deputy cmo.webp',
        fallback: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
        bio: 'Supporting clinical leadership and healthcare quality improvement programs.'
    }
];

export default function Leadership() {
    return (
        <section className="leadership-section section" id="leadership">
            <div className="container">
                <div className="section-header">
                    <span className="section-badge">Our Team</span>
                    <h2>Leadership</h2>
                    <p>Meet the dedicated leaders driving healthcare transformation in Sierra Leone</p>
                </div>

                {/* Featured Leader - Minister */}
                <div className="featured-leader-modern">
                    <div className="featured-leader-card">
                        <div className="featured-leader-image-wrapper">
                            <div className="featured-leader-image">
                                <img
                                    src="/images/minister.jpeg"
                                    alt="Austin Demby, PhD, MSc, BSc"
                                    onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop'}
                                />
                            </div>
                            <div className="flag-stripe"></div>
                        </div>
                        <div className="featured-leader-info">
                            <div className="leader-badge">Minister of Health</div>
                            <h3>Dr. Austin Demby</h3>
                            <span className="leader-credentials">PhD, MSc, BSc</span>
                            <p>
                                Dr. Austin Demby serves as the Minister of Health for Sierra Leone. With extensive experience
                                in public health and international development, he leads the country's health initiatives
                                and policies aimed at improving healthcare access and quality for all Sierra Leoneans.
                            </p>
                            <div className="leader-stats">
                                <div className="stat">
                                    <span className="stat-value">15+</span>
                                    <span className="stat-label">Years Experience</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-value">100+</span>
                                    <span className="stat-label">Initiatives Led</span>
                                </div>
                            </div>
                            <div className="leader-social">
                                <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                                <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                                <a href="#" aria-label="Email"><i className="fas fa-envelope"></i></a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Executive Leadership Team */}
                <div className="leadership-team-header">
                    <h3>Executive Leadership Team</h3>
                    <div className="header-line"></div>
                </div>

                <div className="leadership-grid-modern">
                    {executiveTeam.map((leader, index) => (
                        <div key={index} className="leader-card-modern">
                            <div className="card-glow"></div>
                            <div className="leader-image-container">
                                <img
                                    src={leader.image}
                                    alt={leader.name}
                                    onError={(e) => e.currentTarget.src = leader.fallback}
                                />
                                <div className="image-overlay">
                                    <div className="overlay-icons">
                                        <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                                        <a href="#" aria-label="Email"><i className="fas fa-envelope"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div className="leader-card-content">
                                <span className="position-badge">{leader.position}</span>
                                <h4>{leader.name}</h4>
                                <p className="leader-bio-short">{leader.bio}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
