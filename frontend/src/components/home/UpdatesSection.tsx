import { useState, useMemo } from 'react';
import { useApi } from '../../hooks/useApi';
import { getLatestUpdates, getMediaUrl } from '../../services/api';
import type { NewsArticle } from '../../services/api';

type UpdateType = 'all' | 'news' | 'videos' | 'events' | 'publications';

/** Set VITE_UPDATES_DEMO_FALLBACK=true in .env only for local UI demos without Strapi. */
const DEMO_FALLBACK =
    import.meta.env.VITE_UPDATES_DEMO_FALLBACK === 'true'
        ? [
              {
                  type: 'news' as const,
                  image: '/images/news-1.jpg',
                  fallbackImage:
                      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop',
                  date: 'Demo',
                  title: 'Demo: Minister Launches New Healthcare Initiative',
                  description:
                      'Enable Strapi news-articles or turn off VITE_UPDATES_DEMO_FALLBACK.',
                  link: '#',
                  linkText: 'Read More',
              },
          ]
        : [];

function transformApiData(item: NewsArticle & { id: number }) {
    const contentType = item.contentType || 'news';
    const imageUrl = getMediaUrl(item.coverImage);
    const dateStr = item.publishedDate
        ? new Date(item.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : '';

    return {
        type: contentType === 'video' ? 'videos' : contentType === 'event' ? 'events' : contentType === 'publication' ? 'publications' : 'news',
        image: imageUrl || '/images/news-1.jpg',
        fallbackImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop',
        date: dateStr,
        title: item.title,
        description: item.summary || '',
        link: `/newsroom/${item.slug}`,
        linkText: contentType === 'video' ? 'Watch Video' : contentType === 'publication' ? 'Download' : 'Read More',
        hasPlayButton: contentType === 'video',
        isPDF: contentType === 'publication',
        dateIcon: contentType === 'event' ? 'map-marker-alt' : contentType === 'publication' ? 'file' : 'clock',
    };
}

export default function UpdatesSection() {
    const [activeTab, setActiveTab] = useState<UpdateType>('all');
    const { data: apiData, loading, error, refetch } = useApi(() =>
        getLatestUpdates({ limit: 12 })
    );

    /** Real data from Strapi `news-articles` (contentType: news | video | event | publication). */
    const updates = useMemo(() => {
        if (apiData?.data && apiData.data.length > 0) {
            return apiData.data.map(transformApiData);
        }
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
                                <strong>No updates published yet.</strong> Add and publish entries
                                in Strapi → <strong>News Articles</strong> (set content type:
                                News, Video, Event, or Publication).
                            </p>
                            <a href="/newsroom" className="btn btn-outline">
                                Go to Newsroom
                            </a>
                        </div>
                    ) : null}

                    {!loading && !error && filteredUpdates.length > 0 ? (
                    <div className="updates-grid">
                        {filteredUpdates.map((update, index) => (
                            <div key={index} className="update-card" data-type={update.type}>
                                <div className={`update-type-badge ${update.type}`}>
                                    <i className={`fas fa-${update.type === 'news' ? 'newspaper' : update.type === 'videos' ? 'video' : update.type === 'events' ? 'calendar-alt' : 'file-alt'}`}></i>
                                    {' '}
                                    {update.type.charAt(0).toUpperCase() + update.type.slice(1, -1)}
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
                                    <a href={update.link} className="update-link">
                                        {update.linkText} <i className={`fas fa-${update.linkText.includes('Download') ? 'download' : 'arrow-right'}`}></i>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                    ) : null}

                    {!loading && !error && filteredUpdates.length > 0 ? (
                    <div className="updates-view-all">
                        <a href="/newsroom" className="btn btn-outline">
                            View All Updates <i className="fas fa-arrow-right"></i>
                        </a>
                    </div>
                    ) : null}
                </div>
            </div>
        </section>
    );
}
