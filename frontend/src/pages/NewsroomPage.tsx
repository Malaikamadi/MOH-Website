import { useState, useMemo } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageHero from '../components/common/PageHero';
import { useApi } from '../hooks/useApi';
import { getNewsArticles, getMediaUrl } from '../services/api';
import type { NewsArticle, StrapiItem } from '../services/api';

const categories = [
    { key: '', label: 'All' },
    { key: 'Breaking News', label: 'Breaking News' },
    { key: 'Latest News', label: 'Latest News' },
    { key: 'Press Release', label: 'Press Release' },
    { key: 'Public Notice', label: 'Public Notice' },
    { key: 'Announcement', label: 'Announcement' },
    { key: 'Health Initiative', label: 'Health Initiative' },
];

function formatDate(dateStr: string) {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric',
    });
}

function ArticleCard({ article }: { article: StrapiItem<NewsArticle> }) {
    const imageUrl = getMediaUrl(article.coverImage) || 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=250&fit=crop';
    return (
        <a href={`/newsroom/${article.slug}`} className="nr-card">
            <div className="nr-card-image">
                <img src={imageUrl} alt={article.title} onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=250&fit=crop'; }} />
                <span className="nr-card-badge">{article.category}</span>
            </div>
            <div className="nr-card-body">
                <div className="nr-card-meta">
                    <span><i className="far fa-calendar-alt"></i> {formatDate(article.publishedDate)}</span>
                    {article.author && <span><i className="far fa-user"></i> {article.author}</span>}
                </div>
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
                <span className="nr-read-more">Read More <i className="fas fa-arrow-right"></i></span>
            </div>
        </a>
    );
}

export default function NewsroomPage() {
    const [activeCategory, setActiveCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 9;

    const { data: newsRes, loading } = useApi(
        () => getNewsArticles({
            category: activeCategory || undefined,
            limit: pageSize,
            page: currentPage,
        }),
        [activeCategory, currentPage]
    );

    const articles = newsRes?.data || [];
    const pagination = newsRes?.meta?.pagination;
    const totalPages = pagination?.pageCount || 1;

    const featured = useMemo(() => {
        return articles.find(a => a.featured) || articles[0];
    }, [articles]);

    const gridArticles = articles.filter(a => a !== featured);

    const handleCategoryChange = (key: string) => {
        setActiveCategory(key);
        setCurrentPage(1);
    };

    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Newsroom' },
    ];

    return (
        <>
            <Header />
            <main>
                <PageHero title="Newsroom" breadcrumbs={breadcrumbs} />

                <section className="nr-section section">
                    <div className="container">
                        <div className="nr-filters">
                            {categories.map(cat => (
                                <button
                                    key={cat.key}
                                    className={`nr-filter-btn ${activeCategory === cat.key ? 'active' : ''}`}
                                    onClick={() => handleCategoryChange(cat.key)}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        {loading && (
                            <div className="nr-loading">
                                <i className="fas fa-spinner fa-spin"></i> Loading articles...
                            </div>
                        )}

                        {!loading && featured && (
                            <a href={`/newsroom/${featured.slug}`} className="nr-featured">
                                <div className="nr-featured-image">
                                    <img
                                        src={getMediaUrl(featured.coverImage) || 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&h=450&fit=crop'}
                                        alt={featured.title}
                                        onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&h=450&fit=crop'; }}
                                    />
                                </div>
                                <div className="nr-featured-content">
                                    <span className="nr-card-badge">{featured.category}</span>
                                    <h2>{featured.title}</h2>
                                    <p>{featured.summary}</p>
                                    <div className="nr-card-meta">
                                        <span><i className="far fa-calendar-alt"></i> {formatDate(featured.publishedDate)}</span>
                                        {featured.author && <span><i className="far fa-user"></i> {featured.author}</span>}
                                    </div>
                                </div>
                            </a>
                        )}

                        {!loading && gridArticles.length > 0 && (
                            <div className="nr-grid">
                                {gridArticles.map(article => (
                                    <ArticleCard key={article.id} article={article} />
                                ))}
                            </div>
                        )}

                        {!loading && articles.length === 0 && (
                            <div className="nr-empty">
                                <i className="fas fa-newspaper"></i>
                                <h3>No articles found</h3>
                                <p>There are no articles in this category yet. Check back soon!</p>
                            </div>
                        )}

                        {totalPages > 1 && (
                            <div className="nr-pagination">
                                <button
                                    className="nr-page-btn"
                                    disabled={currentPage <= 1}
                                    onClick={() => setCurrentPage(p => p - 1)}
                                >
                                    <i className="fas fa-chevron-left"></i> Previous
                                </button>
                                <div className="nr-page-numbers">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <button
                                            key={page}
                                            className={`nr-page-num ${currentPage === page ? 'active' : ''}`}
                                            onClick={() => setCurrentPage(page)}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    className="nr-page-btn"
                                    disabled={currentPage >= totalPages}
                                    onClick={() => setCurrentPage(p => p + 1)}
                                >
                                    Next <i className="fas fa-chevron-right"></i>
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
