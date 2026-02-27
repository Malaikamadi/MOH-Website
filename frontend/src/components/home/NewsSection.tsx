import { useState, useMemo } from 'react';
import { useApi } from '../../hooks/useApi';
import { getNewsArticles, getMediaUrl } from '../../services/api';
import type { NewsArticle } from '../../services/api';



function transformNewsItem(item: NewsArticle & { id: number; documentId: string }) {
    const imageUrl = getMediaUrl(item.coverImage);
    const dateStr = item.publishedDate
        ? new Date(item.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : '';

    return {
        image: imageUrl || '/images/news-1.jpg',
        fallbackImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
        category: item.category || 'Latest News',
        title: item.title,
        description: item.summary || '',
        date: dateStr,
        slug: item.slug || '#',
        tag: item.category || 'Latest News',
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

    const newsItems = useMemo(() => {
        if (newsData?.data && newsData.data.length > 0) {
            return newsData.data.map(transformNewsItem);
        }
        return [];
    }, [newsData]);

    const pressReleases = useMemo(() => {
        if (pressData?.data && pressData.data.length > 0) {
            return pressData.data.map(transformNewsItem);
        }
        return [];
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
