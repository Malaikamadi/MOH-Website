import { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageHero from '../components/common/PageHero';
import { useApi } from '../hooks/useApi';
import { getNewsArticles, getMediaUrl } from '../services/api';
import type { NewsArticle, StrapiItem } from '../services/api';

function formatDate(dateStr: string) {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric',
    });
}

function PressCard({ article }: { article: StrapiItem<NewsArticle> }) {
    const imageUrl = getMediaUrl(article.coverImage);
    return (
        <a href={`/newsroom/${article.slug}`} className="pr-card">
            {imageUrl && (
                <div className="pr-card-image">
                    <img src={imageUrl} alt={article.title} onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1632053003385-245e3897eeea?w=400&h=200&fit=crop'; }} />
                </div>
            )}
            <div className="pr-card-body">
                <div className="pr-card-date">
                    <i className="far fa-calendar-alt"></i> {formatDate(article.publishedDate)}
                </div>
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
                <span className="nr-read-more">Read Full Release <i className="fas fa-arrow-right"></i></span>
            </div>
        </a>
    );
}

export default function PressReleasesPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const { data: pressRes, loading } = useApi(
        () => getNewsArticles({ category: 'Press Release', limit: pageSize, page: currentPage }),
        [currentPage]
    );

    const articles = pressRes?.data || [];
    const pagination = pressRes?.meta?.pagination;
    const totalPages = pagination?.pageCount || 1;

    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Press Releases' },
    ];

    return (
        <>
            <Header />
            <main>
                <PageHero title="Press Releases" breadcrumbs={breadcrumbs} />

                <section className="pr-section section">
                    <div className="container">
                        <div className="pr-intro">
                            <p>Official press releases and communications from the Ministry of Health, Sierra Leone.</p>
                        </div>

                        {loading && (
                            <div className="nr-loading"><i className="fas fa-spinner fa-spin"></i> Loading press releases...</div>
                        )}

                        {!loading && articles.length > 0 && (
                            <div className="pr-list">
                                {articles.map(article => (
                                    <PressCard key={article.id} article={article} />
                                ))}
                            </div>
                        )}

                        {!loading && articles.length === 0 && (
                            <div className="nr-empty">
                                <i className="fas fa-bullhorn"></i>
                                <h3>No press releases yet</h3>
                                <p>There are no press releases to display at this time. Check back soon!</p>
                            </div>
                        )}

                        {totalPages > 1 && (
                            <div className="nr-pagination">
                                <button className="nr-page-btn" disabled={currentPage <= 1} onClick={() => setCurrentPage(p => p - 1)}>
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
                                <button className="nr-page-btn" disabled={currentPage >= totalPages} onClick={() => setCurrentPage(p => p + 1)}>
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
