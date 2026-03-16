import { useState, useEffect, useCallback } from 'react';
import { useApi } from '../../hooks/useApi';
import { getLeadershipMembers, getMediaUrl } from '../../services/api';
import type { LeadershipMember, StrapiItem } from '../../services/api';

export default function Leadership() {
    const { data: leadersRes } = useApi(getLeadershipMembers);
    const leaders = leadersRes?.data || [];
    const [activeProfile, setActiveProfile] = useState<StrapiItem<LeadershipMember> | null>(null);

    const minister = leaders.find((l) => l.isMinister);
    const executiveTeam = leaders.filter((l) => l !== minister);

    const closeModal = useCallback(() => {
        setActiveProfile(null);
        document.body.style.overflow = '';
    }, []);

    const openModal = useCallback((leader: StrapiItem<LeadershipMember>) => {
        setActiveProfile(leader);
        document.body.style.overflow = 'hidden';
    }, []);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeModal();
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [closeModal]);

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
                                <button className="btn btn-primary btn-glow" onClick={() => openModal(minister)}>
                                    View Full Profile <i className="fas fa-arrow-right"></i>
                                </button>
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
                                        <button className="btn-profile" onClick={() => openModal(leader)}>
                                            View Profile <i className="fas fa-chevron-right"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Profile Modal */}
            <div
                className={`profile-modal-overlay ${activeProfile ? 'active' : ''}`}
                onClick={closeModal}
            >
                {activeProfile && (
                    <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal} aria-label="Close">
                            <i className="fas fa-times"></i>
                        </button>
                        <div className="modal-content">
                            <div className="modal-image">
                                <img
                                    src={activeProfile.image ? getMediaUrl(activeProfile.image) : 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop'}
                                    alt={activeProfile.name}
                                    onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop'}
                                />
                            </div>
                            <div className="modal-info">
                                <span className="modal-badge">{activeProfile.position}</span>
                                <h2>{activeProfile.name}</h2>
                                {activeProfile.credentials && (
                                    <p className="modal-credentials">{activeProfile.credentials}</p>
                                )}
                                <div className="modal-bio">{activeProfile.bio}</div>
                                <div className="modal-details">
                                    {activeProfile.education && (
                                        <div className="detail-item">
                                            <i className="fas fa-graduation-cap"></i>
                                            <div>
                                                <span className="detail-label">Education</span>
                                                <span className="detail-value">{activeProfile.education}</span>
                                            </div>
                                        </div>
                                    )}
                                    {activeProfile.experience && (
                                        <div className="detail-item">
                                            <i className="fas fa-briefcase"></i>
                                            <div>
                                                <span className="detail-label">Experience</span>
                                                <span className="detail-value">{activeProfile.experience}</span>
                                            </div>
                                        </div>
                                    )}
                                    {activeProfile.focusAreas && (
                                        <div className="detail-item">
                                            <i className="fas fa-award"></i>
                                            <div>
                                                <span className="detail-label">Focus Areas</span>
                                                <span className="detail-value">{activeProfile.focusAreas}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="modal-social">
                                    <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                                    <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                                    <a href="#" aria-label="Email"><i className="fas fa-envelope"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
