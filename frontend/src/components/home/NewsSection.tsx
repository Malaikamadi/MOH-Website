import { useState, useMemo } from 'react';
import { useApi } from '../../hooks/useApi';
import { getNewsArticles, getMediaUrl } from '../../services/api';
import type { NewsArticle } from '../../services/api';

// Static fallback data
const fallbackNewsItems = [
    {
        image: '/images/news-1.jpg',
        fallbackImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
        category: 'Health Initiative',
        title: 'New Maternal Health Program Launched Across All Districts',
        description: 'The Ministry of Health has officially launched the comprehensive maternal health program...',
        date: 'Jan 15, 2026',
        slug: '#'
    },
    {
        image: '/images/news-2.jpg',
        fallbackImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=300&fit=crop',
        category: 'Breaking News',
        title: 'Free Healthcare Initiative Expands to Cover Adolescents',
        description: 'The government extends the Free Healthcare Initiative to include adolescents aged 10-19...',
        date: 'Jan 12, 2026',
        slug: '#'
    },
    {
        image: '/images/slide-3.jpg',
        fallbackImage: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=300&fit=crop',
        category: 'Latest News',
        title: 'Community Health Workers Complete Advanced Training',
        description: '500 community health workers graduate from intensive primary healthcare training program...',
        date: 'Jan 10, 2026',
        slug: '#'
    }
];

const fallbackPressReleases = [
    {
        image: '/images/news-2.jpg',
        fallbackImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=300&h=200&fit=crop',
        tag: 'Press Release',
        title: 'Child Immunization Drive Reaches Remote Communities',
        description: 'Over 500,000 children vaccinated in nationwide immunization campaign...',
        date: 'Jan 8, 2026'
    },
    {
        image: '/images/slide-2.jpg',
        fallbackImage: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=300&h=200&fit=crop',
        tag: 'Public Notice',
        title: 'Updated Testing Guidelines for Healthcare Facilities',
        description: 'New protocols to improve diagnosis accuracy across all government hospitals...',
        date: 'Jan 5, 2026'
    }
];

function transformNewsItem(item: { id: number; attributes?: NewsArticle } & Partial<NewsArticle>) {
    const attrs = (item.attributes || item) as NewsArticle;
    const imageUrl = getMediaUrl(attrs.coverImage);
    const dateStr = attrs.publishedDate
        ? new Date(attrs.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : '';

    return {
        image: imageUrl || '/images/news-1.jpg',
        fallbackImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
        category: attrs.category || 'Latest News',
        title: attrs.title,
        description: attrs.summary || '',
        date: dateStr,
        slug: attrs.slug || '#',
        tag: attrs.category || 'Latest News',
    };
}

export default function NewsSection() {
    const [activeSlide, setActiveSlide] = useState(0);

    // Fetch featured/latest news
    const { data: newsData } = useApi(
        () => getNewsArticles({ limit: 5 })
    );

    // Fetch press releases
    const { data: pressData } = useApi(
        () => getNewsArticles({ category: 'Press Release', limit: 4 })
    );

    // Transform data or use fallback
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

    const nextNewsSlide = () => {
        setActiveSlide((prev) => (prev + 1) % newsItems.length);
    };

    const prevNewsSlide = () => {
        setActiveSlide((prev) => (prev - 1 + newsItems.length) % newsItems.length);
    };

    return (
        <section className="latest-news-section section">
            <div className="container">
                <div className="section-header">
                    <span className="section-badge">
                        <i className="fas fa-newspaper"></i> Press & Media
                    </span>
                    <h2>Latest News</h2>
                    <p>Breaking news, press releases, and public notices from the Ministry of Health</p>
                </div>

                <div className="news-layout">
                    {/* Featured News Slider */}
                    <div className="featured-news">
                        <div className="featured-news-slider">
                            {newsItems.map((item, index) => (
                                <div
                                    key={index}
                                    className={`featured-news-slide ${index === activeSlide ? 'active' : ''}`}
                                >
                                    <div className="featured-news-image">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            onError={(e) => e.currentTarget.src = item.fallbackImage}
                                        />
                                        <div className="featured-news-overlay">
                                            <span className="news-category-badge">{item.category}</span>
                                            <h3>{item.title}</h3>
                                            <p>{item.description}</p>
                                            <div className="featured-news-meta">
                                                <span><i className="fas fa-clock"></i> {item.date}</span>
                                                <a href={`/newsroom/${item.slug}`} className="read-more-link">
                                                    Read Full Story <i className="fas fa-arrow-right"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Slider Controls */}
                        <div className="featured-news-controls">
                            <button onClick={prevNewsSlide} aria-label="Previous news">
                                <i className="fas fa-chevron-left"></i>
                            </button>
                            <span className="slide-counter">
                                {activeSlide + 1} / {newsItems.length}
                            </span>
                            <button onClick={nextNewsSlide} aria-label="Next news">
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>

                    {/* Press Releases Sidebar */}
                    <div className="press-releases-sidebar">
                        <h3 className="sidebar-title">
                            <i className="fas fa-bullhorn"></i> Press Releases
                        </h3>
                        <div className="press-releases-list">
                            {pressReleases.map((item, index) => (
                                <div key={index} className="press-release-item">
                                    <div className="press-release-image">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            onError={(e) => e.currentTarget.src = item.fallbackImage}
                                        />
                                        <span className="press-tag">{item.tag}</span>
                                    </div>
                                    <div className="press-release-info">
                                        <h4>{item.title}</h4>
                                        <p>{item.description}</p>
                                        <span className="press-date">
                                            <i className="fas fa-clock"></i> {item.date}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
