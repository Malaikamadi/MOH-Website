import { useState } from 'react';

const newsItems = [
    {
        image: '/images/news-1.jpg',
        fallback: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=600&h=500&fit=crop',
        category: 'Health Initiative',
        title: 'New Maternal Health Program Launched Across All Districts',
        description: 'The Ministry has rolled out an enhanced maternal health program aimed at reducing maternal mortality rates nationwide. This comprehensive initiative includes training for midwives, new equipment for health facilities, and community outreach programs.',
        date: 'January 5, 2026',
        link: '#'
    },
    {
        image: '/images/news-2.jpg',
        fallback: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=500&fit=crop',
        category: 'Equipment',
        title: 'State-of-the-Art Medical Equipment Delivered',
        description: 'New diagnostic equipment has been distributed to regional hospitals, enhancing healthcare delivery across the country.',
        date: 'January 3, 2026',
        link: '#'
    }
];

const pressReleases = [
    {
        image: '/images/news-2.jpg',
        fallback: 'https://images.unsplash.com/photo-1632053003385-245e3897eeea?w=100&h=80&fit=crop',
        tag: 'Press Release',
        title: 'Child Immunization Drive Reaches Remote Communities',
        description: 'Healthcare workers delivered vaccines to over 50,000 children in hard-to-reach areas.'
    },
    {
        image: '/images/news-3.jpg',
        fallback: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=100&h=80&fit=crop',
        tag: 'Press Release',
        title: 'HMIS Platform Upgrade Improves Health Data Management',
        description: 'Real-time data collection across all health facilities now enabled.'
    },
    {
        image: '/images/minister.jpeg',
        fallback: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=80&fit=crop',
        tag: 'Announcement',
        title: 'Ministry Partners with WHO for Disease Prevention',
        description: 'New partnership to strengthen health systems nationwide.'
    }
];

export default function NewsSection() {
    const [currentNews, setCurrentNews] = useState(0);
    const [activeFilter, setActiveFilter] = useState('all');

    const nextNews = () => {
        setCurrentNews((prev) => (prev + 1) % newsItems.length);
    };

    const prevNews = () => {
        setCurrentNews((prev) => (prev - 1 + newsItems.length) % newsItems.length);
    };

    return (
        <section className="news-section section">
            <div className="container">
                <div className="section-header">
                    <h2>Latest News</h2>
                    <p>Stay informed about the latest health initiatives, announcements, and ministry activities</p>
                </div>

                {/* News Filter Tabs */}
                <div className="news-filter-tabs">
                    <button
                        className={`news-tab ${activeFilter === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={`news-tab ${activeFilter === 'breaking' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('breaking')}
                    >
                        Breaking News
                    </button>
                    <button
                        className={`news-tab ${activeFilter === 'latest' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('latest')}
                    >
                        Latest News
                    </button>
                    <button
                        className={`news-tab ${activeFilter === 'press' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('press')}
                    >
                        Press Release
                    </button>
                    <button
                        className={`news-tab ${activeFilter === 'public' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('public')}
                    >
                        Public Notice
                    </button>
                </div>

                <div className="news-layout">
                    {/* Featured Article Slider */}
                    <div className="featured-news">
                        <div className="featured-slider">
                            {newsItems.map((news, index) => (
                                <div
                                    key={index}
                                    className={`featured-slide ${index === currentNews ? 'active' : ''}`}
                                    style={{ display: index === currentNews ? 'block' : 'none' }}
                                >
                                    <div className="featured-image">
                                        <img
                                            src={news.image}
                                            alt={news.title}
                                            onError={(e) => e.currentTarget.src = news.fallback}
                                        />
                                    </div>
                                    <div className="featured-content">
                                        <span className="featured-category">{news.category}</span>
                                        <h3>{news.title}</h3>
                                        <p>{news.description}</p>
                                        <div className="featured-meta">
                                            <span><i className="far fa-calendar"></i> {news.date}</span>
                                        </div>
                                        <a href={news.link} className="btn btn-primary">
                                            Read Full Story <i className="fas fa-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="featured-nav">
                            <button className="featured-nav-btn prev" onClick={prevNews}>
                                <i className="fas fa-chevron-left"></i>
                            </button>
                            <button className="featured-nav-btn next" onClick={nextNews}>
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>

                    {/* Press Releases Sidebar */}
                    <div className="press-releases-sidebar">
                        <h3 className="sidebar-title">Press Releases</h3>

                        {pressReleases.map((release, index) => (
                            <div key={index} className="press-release-item">
                                <div className="press-thumbnail">
                                    <img
                                        src={release.image}
                                        alt={release.title}
                                        onError={(e) => e.currentTarget.src = release.fallback}
                                    />
                                </div>
                                <div className="press-content">
                                    <span className="press-tag">{release.tag}</span>
                                    <h4>{release.title}</h4>
                                    <p>{release.description}</p>
                                </div>
                            </div>
                        ))}

                        <a href="/newsroom" className="view-all-link">
                            View All Press Releases <i className="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
