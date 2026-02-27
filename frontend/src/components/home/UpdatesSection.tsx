import { useState, useMemo } from 'react';
import { useApi } from '../../hooks/useApi';
import { getLatestUpdates, getMediaUrl } from '../../services/api';
import type { NewsArticle } from '../../services/api';

type UpdateType = 'all' | 'news' | 'videos' | 'events' | 'publications';



function transformApiData(item: NewsArticle & { id: number; documentId: string }) {
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
    const { data: apiData } = useApi(() => getLatestUpdates({ limit: 12 }));

    const updates = useMemo(() => {
        if (apiData?.data && apiData.data.length > 0) {
            return apiData.data.map(transformApiData);
        }
        return [];
    }, [apiData]);

    const filteredUpdates = activeTab === 'all'
        ? updates
        : updates.filter(update => update.type === activeTab);

    return (
        <section className="latest-updates-section section">
            <div className="container">
                <div className="section-header">
                    <span className="section-badge">
                        <i className="fas fa-bell"></i> Stay Informed
                    </span>
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
                                        onError={(e) => e.currentTarget.src = update.fallbackImage}
                                    />
                                    {update.hasPlayButton && (
                                        <div className="play-overlay">
                                            <i className="fas fa-play"></i>
                                        </div>
                                    )}
                                    {update.isPDF && (
                                        <div className="pdf-overlay">
                                            <i className="fas fa-file-pdf"></i>
                                        </div>
                                    )}
                                </div>
                                <div className="update-info">
                                    <span className="update-date">
                                        <i className={`fas fa-${update.dateIcon || 'clock'}`}></i> {update.date}
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
                </div>
            </div>
        </section>
    );
}
