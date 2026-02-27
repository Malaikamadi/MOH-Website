import { useState, useMemo } from 'react';
import { useApi } from '../../hooks/useApi';
import { getNewsArticles, getMediaUrl } from '../../services/api';
import type { NewsArticle } from '../../services/api';

// Static fallback data
const fallbackNewsItems = [
    {
        image: '/images/news-1.jpg',
        fallbackImage: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=600&h=500&fit=crop',
        category: 'Health Initiative',
        title: 'New Maternal Health Program Launched Across All Districts',
        description: 'The Ministry has rolled out an enhanced maternal health program aimed at reducing maternal mortality rates nationwide. This comprehensive initiative includes training for midwives, new equipment for health facilities, and community outreach programs.',
        date: 'January 5, 2026',
        slug: '#'
    }
];

const fallbackPressReleases = [
    {
        image: '/images/news-2.jpg',
        fallbackImage: 'https://images.unsplash.com/photo-1632053003385-245e3897eeea?w=100&h=80&fit=crop',
        tag: 'Press Release',
        title: 'Child Immunization Drive Reaches Remote Communities',
        description: 'Healthcare workers delivered vaccines to over 50,000 children in hard-to-reach areas.',
    },
    {
        image: '/images/slide-3.jpg',
        fallbackImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=100&h=80&fit=crop',
        tag: 'Press Release',
        title: 'HMIS Platform Upgrade Improves Health Data Management',
        description: 'Real-time data collection across all health facilities now enabled.',
    },
    {
        image: '/images/minister.jpg',
        fallbackImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=80&fit=crop',
        tag: 'Announcement',
        title: 'Ministry Partners with WHO for Disease Prevention',
        description: 'New partnership to strengthen health systems nationwide.',
    }
];

function transformNewsItem(item: NewsArticle & { id: number; documentId: string }) {
    const imageUrl = getMediaUrl(item.coverImage);
    const dateStr = item.publishedDate
        ? new Date(item.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        : '';

    return {
        image: imageUrl || '/images/news-1.jpg',
        fallbackImage: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=600&h=500&fit=crop',
        category: item.category || 'Latest News',
        title: item.title,
        description: item.summary || item.content?.substring(0, 200) + '...' || '',
        date: dateStr,
        slug: item.slug || '#',
        tag: item.category || 'Latest News',
    };
}

export default function NewsSection() {
    const [activeSlide, setActiveSlide] = useState(0);
    const [activeFilter, setActiveFilter] = useState('all');

    // Fetch all news
    const { data: newsData } = useApi(
        () => getNewsArticles({ limit: 5 })
    );

    // Fetch press releases
    const { data: pressData } = useApi(
        () => getNewsArticles({ category: 'Press Release', limit: 4 })
    );

    const newsItems = useMemo(() => {
        if (newsData?.data && newsData.data.length > 0) {
            return newsData.data.map(transformNewsItem);
        }
        return fallbackNewsItems;
    }, [newsData]);

    const pressReleases = useMemo(() => {
        if (pressData?.data && pressData.data.length > 0) {
            return pressData.data.map(transformNewsItem);
        }
        return fallbackPressReleases;
    }, [pressData]);

    const nextSlide = () => {
        setActiveSlide((prev) => (prev + 1) % newsItems.length);
    };

    const prevSlide = () => {
        setActiveSlide((prev) => (prev - 1 + newsItems.length) % newsItems.length);
    };

    const filters = ['all', 'breaking', 'latest', 'press', 'public'];
    const filterLabels: Record<string, string> = {
        all: 'All',
        breaking: 'Breaking News',
        latest: 'Latest News',
        press: 'Press Release',
        public: 'Public Notice',
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
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            className={`news-tab ${activeFilter === filter ? 'active' : ''}`}
                            onClick={() => setActiveFilter(filter)}
                        >
                            {filterLabels[filter]}
                        </button>
                    ))}
                </div>

                <div className="news-layout">
                    {/* Featured Article Slider */}
                    <div className="featured-news">
                        <div className="featured-slider">
                            {newsItems.map((item, index) => (
                                <div
                                    key={index}
                                    className={`featured-slide ${index === activeSlide ? 'active' : ''}`}
                                >
                                    <div className="featured-image">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            onError={(e) => e.currentTarget.src = item.fallbackImage}
                                        />
                                    </div>
                                    <div className="featured-content">
                                        <span className="featured-category">{item.category}</span>
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                        <div className="featured-meta">
                                            <span><i className="far fa-calendar"></i> {item.date}</span>
                                        </div>
                                        <a href={`/newsroom/${item.slug}`} className="btn btn-primary">
                                            Read Full Story <i className="fas fa-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="featured-nav">
                            <button className="featured-nav-btn prev" onClick={prevSlide}>
                                <i className="fas fa-chevron-left"></i>
                            </button>
                            <button className="featured-nav-btn next" onClick={nextSlide}>
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>

                    {/* Press Releases Sidebar */}
                    <div className="press-releases-sidebar">
                        <h3 className="sidebar-title">Press Releases</h3>

                        {pressReleases.map((item, index) => (
                            <div key={index} className="press-release-item">
                                <div className="press-thumbnail">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        onError={(e) => e.currentTarget.src = item.fallbackImage}
                                    />
                                </div>
                                <div className="press-content">
                                    <span className="press-tag">{item.tag}</span>
                                    <h4>{item.title}</h4>
                                    <p>{item.description}</p>
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
