import { useApi } from '../../hooks/useApi';
import { getLeadershipMembers, getMediaUrl } from '../../services/api';
import type { LeadershipMember, StrapiItem } from '../../services/api';

export default function Leadership() {
    const { data: leadersRes } = useApi(getLeadershipMembers);
    const leaders = leadersRes?.data || [];

    const minister = leaders.find((l) => l.isMinister);
    const executiveTeam = leaders.filter((l) => !l.isMinister);

    return (
        <section className="leadership-section section" id="leadership">
            <div className="container">
                <div className="section-header">
                    <span className="section-badge">Our Team</span>
                    <h2>Leadership</h2>
                    <p>Meet the dedicated leaders driving healthcare transformation in Sierra Leone</p>
                </div>

                {minister && (
                    <div className="featured-leader-modern">
                        <div className="featured-leader-card">
                            <div className="featured-leader-image-wrapper">
                                <div className="featured-leader-image">
                                    <img
                                        src={minister.image ? getMediaUrl(minister.image) : '/images/minister.jpeg'}
                                        alt={minister.name}
                                        onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop'}
                                    />
                                </div>
                                <div className="flag-stripe"></div>
                            </div>
                            <div className="featured-leader-info">
                                <div className="leader-badge">{minister.position}</div>
                                <h3>{minister.name}</h3>
                                {minister.credentials && <span className="leader-credentials">{minister.credentials}</span>}
                                <p>{minister.bio}</p>
                                {minister.stats && minister.stats.length > 0 && (
                                    <div className="leader-stats">
                                        {minister.stats.map((stat) => (
                                            <div key={stat.id} className="stat">
                                                <span className="stat-value">{stat.value}</span>
                                                <span className="stat-label">{stat.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className="leader-social">
                                    <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                                    <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                                    <a href="#" aria-label="Email"><i className="fas fa-envelope"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {executiveTeam.length > 0 && (
                    <>
                        <div className="leadership-team-header">
                            <h3>Executive Leadership Team</h3>
                            <div className="header-line"></div>
                        </div>

                        <div className="leadership-grid-modern">
                            {executiveTeam.map((leader: StrapiItem<LeadershipMember>) => (
                                <div key={leader.id} className="leader-card-modern">
                                    <div className="card-glow"></div>
                                    <div className="leader-image-container">
                                        <img
                                            src={leader.image ? getMediaUrl(leader.image) : ''}
                                            alt={leader.name}
                                            onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop'}
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
                    </>
                )}
            </div>
        </section>
    );
}
