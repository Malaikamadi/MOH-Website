import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageHero from '../components/common/PageHero';
import { useApi } from '../hooks/useApi';
import { getNewsArticleBySlug, getNewsArticles, getMediaUrl } from '../services/api';
import type { NewsArticle, StrapiItem } from '../services/api';

function formatDate(dateStr: string) {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric',
    });
}

function RelatedCard({ article }: { article: StrapiItem<NewsArticle> }) {
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
                </div>
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
            </div>
        </a>
    );
}

export default function NewsArticlePage() {
    const { slug } = useParams<{ slug: string }>();

    const { data: articleRes, loading, error } = useApi(
        () => getNewsArticleBySlug(slug || ''),
        [slug]
    );

    const article = articleRes?.data?.[0] || null;

    const { data: relatedRes } = useApi(
        () => getNewsArticles({ limit: 3, category: article?.category }),
        [article?.category]
    );

    const relatedArticles = useMemo(() => {
        if (!relatedRes?.data || !article) return [];
        return relatedRes.data.filter(a => a.id !== article.id).slice(0, 3);
    }, [relatedRes, article]);

    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Newsroom', href: '/newsroom' },
        { label: article?.title || 'Article' },
    ];

    if (loading) {
        return (
            <>
                <Header />
                <main>
                    <PageHero title="Loading..." breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Newsroom', href: '/newsroom' }, { label: '...' }]} />
                    <section className="na-section section">
                        <div className="container">
                            <div className="nr-loading"><i className="fas fa-spinner fa-spin"></i> Loading article...</div>
                        </div>
                    </section>
                </main>
                <Footer />
            </>
        );
    }

    if (error || !article) {
        return (
            <>
                <Header />
                <main>
                    <PageHero title="Article Not Found" breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Newsroom', href: '/newsroom' }, { label: 'Not Found' }]} />
                    <section className="na-section section">
                        <div className="container">
                            <div className="nr-empty">
                                <i className="fas fa-exclamation-triangle"></i>
                                <h3>Article not found</h3>
                                <p>The article you're looking for doesn't exist or has been removed.</p>
                                <a href="/newsroom" className="btn btn-primary">Back to Newsroom</a>
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
            </>
        );
    }

    const coverUrl = getMediaUrl(article.coverImage) || 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=1200&h=600&fit=crop';
    const gallery = article.gallery?.filter(m => m?.url) || [];

    return (
        <>
            <Header />
            <main>
                <PageHero title={article.category || 'News'} breadcrumbs={breadcrumbs} />

                <section className="na-section section">
                    <div className="container">
                        <article className="na-article">
                            <div className="na-header">
                                <span className="nr-card-badge">{article.category}</span>
                                <h1>{article.title}</h1>
                                <div className="na-meta">
                                    <span><i className="far fa-calendar-alt"></i> {formatDate(article.publishedDate)}</span>
                                    {article.author && <span><i className="far fa-user"></i> {article.author}</span>}
                                    {article.contentType && <span><i className="far fa-folder"></i> {article.contentType}</span>}
                                </div>
                            </div>

                            <div className="na-cover">
                                <img
                                    src={coverUrl}
                                    alt={article.title}
                                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=1200&h=600&fit=crop'; }}
                                />
                            </div>

                            {article.videoUrl && (
                                <div className="na-video">
                                    <iframe
                                        src={article.videoUrl.replace('watch?v=', 'embed/')}
                                        title={article.title}
                                        allowFullScreen
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    />
                                </div>
                            )}

                            <div className="na-content" dangerouslySetInnerHTML={{ __html: article.content || article.summary || '' }} />

                            {gallery.length > 0 && (
                                <div className="na-gallery">
                                    <h3>Gallery</h3>
                                    <div className="na-gallery-grid">
                                        {gallery.map((img, i) => (
                                            <div key={i} className="na-gallery-item">
                                                <img
                                                    src={getMediaUrl(img)}
                                                    alt={img.alternativeText || `Gallery image ${i + 1}`}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {article.tags && article.tags.length > 0 && (
                                <div className="na-tags">
                                    {article.tags.map((tag, i) => (
                                        <span key={i} className="na-tag"><i className="fas fa-tag"></i> {tag}</span>
                                    ))}
                                </div>
                            )}

                            <div className="na-share">
                                <span>Share this article:</span>
                                <div className="na-share-links">
                                    <a href={`https://www.facebook.com/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook"><i className="fab fa-facebook-f"></i></a>
                                    <a href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${article.title}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter"><i className="fab fa-twitter"></i></a>
                                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                                    <a href={`mailto:?subject=${article.title}&body=${window.location.href}`} aria-label="Share via Email"><i className="fas fa-envelope"></i></a>
                                </div>
                            </div>
                        </article>

                        {relatedArticles.length > 0 && (
                            <div className="na-related">
                                <h2>Related Articles</h2>
                                <div className="nr-grid">
                                    {relatedArticles.map(a => (
                                        <RelatedCard key={a.id} article={a} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
