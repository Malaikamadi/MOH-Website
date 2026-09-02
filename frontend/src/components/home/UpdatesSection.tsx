import { useState, useMemo } from 'react';
import { useApi } from '../../hooks/useApi';
import { getLatestUpdates } from '../../services/api';
import type { UpdateCardType } from '../../services/api';

type TabType = 'all' | UpdateCardType;

/** Set VITE_UPDATES_DEMO_FALLBACK=true in .env only for local UI demos without Strapi. */
const DEMO_FALLBACK =
    import.meta.env.VITE_UPDATES_DEMO_FALLBACK === 'true'
        ? [
              {
                  id: 'demo-1',
                  type: 'news' as const,
                  image: '/images/news-1.jpg',
                  fallbackImage:
                      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop',
                  date: 'Demo',
                  dateRaw: 0,
                  title: 'Demo: Minister Launches New Healthcare Initiative',
                  description:
                      'Enable Strapi news, videos, events, or publications or turn off VITE_UPDATES_DEMO_FALLBACK.',
                  link: '#',
                  linkText: 'Read More',
                  dateIcon: 'clock',
              },
          ]
        : [];

const TYPE_LABEL: Record<UpdateCardType, string> = {
    news: 'News',
    videos: 'Video',
    events: 'Event',
    publications: 'Publication',
};

const TYPE_ICON: Record<UpdateCardType, string> = {
    news: 'newspaper',
    videos: 'video',
    events: 'calendar-alt',
    publications: 'file-alt',
};

const VIEW_ALL: Record<TabType, { href: string; label: string }> = {
    all: { href: '/newsroom', label: 'View All Updates' },
    news: { href: '/newsroom', label: 'View All News' },
    videos: { href: '/videos', label: 'View All Videos' },
    events: { href: '/events', label: 'View All Events' },
    publications: { href: '/publications', label: 'View All Publications' },
};

export default function UpdatesSection() {
    const [activeTab, setActiveTab] = useState<TabType>('all');
    const { data: apiData, loading, error, refetch } = useApi(() =>
        getLatestUpdates({ limit: 12 })
    );

    const updates = useMemo(() => {
        if (apiData && apiData.length > 0) return apiData;
        if (DEMO_FALLBACK.length > 0) return DEMO_FALLBACK;
        return [];
    }, [apiData]);

    const filteredUpdates = activeTab === 'all'
        ? updates
        : updates.filter(update => update.type === activeTab);

    return (
        <section className="latest-updates-section section">
            <div className="container">
                <div className="section-header">
                    <h2>Latest Updates</h2>
                    <p>Stay connected with the latest news, events, videos, and publications from the Ministry</p>
                </div>

                {/* Tab Navigation */}
                <div className="updates-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveTab('all')}
                    >
                        <i className="fas fa-th-large"></i>
                        <span>All</span>
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'news' ? 'active' : ''}`}
                        onClick={() => setActiveTab('news')}
                    >
                        <i className="fas fa-newspaper"></i>
                        <span>News</span>
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'videos' ? 'active' : ''}`}
                        onClick={() => setActiveTab('videos')}
                    >
                        <i className="fas fa-video"></i>
                        <span>Videos</span>
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'events' ? 'active' : ''}`}
                        onClick={() => setActiveTab('events')}
                    >
                        <i className="fas fa-calendar-alt"></i>
                        <span>Events</span>
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'publications' ? 'active' : ''}`}
                        onClick={() => setActiveTab('publications')}
                    >
                        <i className="fas fa-file-alt"></i>
                        <span>Publications</span>
                    </button>
                </div>

                {/* Tab Content */}
                <div className="updates-content">
                    {loading ? (
                        <div className="updates-grid updates-grid--loading" aria-busy="true">
                            {[0, 1, 2].map((i) => (
                                <div key={i} className="update-card update-card--skeleton">
                                    <div className="update-skeleton-image" />
                                    <div className="update-skeleton-body">
                                        <div className="update-skeleton-line short" />
                                        <div className="update-skeleton-line" />
                                        <div className="update-skeleton-line" />
                                        <div className="update-skeleton-line long" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : error ? (
                        <div className="updates-state updates-state--error" role="alert">
                            <p>
                                <strong>Could not load updates.</strong> Check that Strapi is
                                running and <code>VITE_API_URL</code> is set correctly.
                            </p>
                            <p className="updates-state-detail">{error}</p>
                            <button
                                type="button"
                                className="btn btn-outline"
                                onClick={() => refetch()}
                            >
                                Try again
                            </button>
                        </div>
                    ) : filteredUpdates.length === 0 ? (
                        <div className="updates-state updates-state--empty">
                            <p>
                                <strong>No updates published yet.</strong> In Strapi, the
                                Communications team can add and publish{' '}
                                <strong>News</strong>, <strong>Videos</strong>,{' '}
                                <strong>Events</strong>, and <strong>Publications</strong>.
                            </p>
                            <a href="/newsroom" className="btn btn-outline">
                                Go to Newsroom
                            </a>
                        </div>
                    ) : null}

                    {!loading && !error && filteredUpdates.length > 0 ? (
                    <div className="updates-grid">
                        {filteredUpdates.map((update) => (
                            <div key={update.id} className="update-card" data-type={update.type}>
                                <div className={`update-type-badge ${update.type}`}>
                                    <i className={`fas fa-${TYPE_ICON[update.type]}`}></i>
                                    {' '}
                                    {TYPE_LABEL[update.type]}
                                </div>
                                <div className="update-image">
                                    <img
                                        src={update.image}
                                        alt={update.title}
                                        onError={(e) => { e.currentTarget.src = update.fallbackImage; }}
                                    />
                                    {'hasPlayButton' in update && update.hasPlayButton && (
                                        <div className="play-overlay">
                                            <i className="fas fa-play"></i>
                                        </div>
                                    )}
                                    {'isPDF' in update && update.isPDF && (
                                        <div className="pdf-overlay">
                                            <i className="fas fa-file-pdf"></i>
                                        </div>
                                    )}
                                </div>
                                <div className="update-info">
                                    <span className="update-date">
                                        <i className={`fas fa-${'dateIcon' in update ? update.dateIcon : 'clock'}`}></i> {update.date}
                                    </span>
                                    <h4>{update.title}</h4>
                                    <p>{update.description}</p>
                                    <a
                                        href={update.link}
                                        className="update-link"
                                        {...('openInNewTab' in update && update.openInNewTab
                                            ? { target: '_blank', rel: 'noopener noreferrer' }
                                            : {})}
                                    >
                                        {update.linkText} <i className={`fas fa-${update.linkText.includes('Download') ? 'download' : 'arrow-right'}`}></i>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                    ) : null}

                    {!loading && !error && filteredUpdates.length > 0 ? (
                    <div className="updates-view-all">
                        <a href={VIEW_ALL[activeTab].href} className="btn btn-outline">
                            {VIEW_ALL[activeTab].label} <i className="fas fa-arrow-right"></i>
                        </a>
                    </div>
                    ) : null}
                </div>
            </div>
        </section>
    );
}
