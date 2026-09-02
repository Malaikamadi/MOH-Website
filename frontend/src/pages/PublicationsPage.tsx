import { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageHero from '../components/common/PageHero';
import { useApi } from '../hooks/useApi';
import { getPublications, getMediaUrl } from '../services/api';
import type { Publication, StrapiItem } from '../services/api';

const categories = [
    { key: '', label: 'All' },
    { key: 'Policy', label: 'Policy' },
    { key: 'Report', label: 'Report' },
    { key: 'Guideline', label: 'Guideline' },
    { key: 'Strategic Plan', label: 'Strategic Plan' },
    { key: 'Annual Report', label: 'Annual Report' },
    { key: 'Research', label: 'Research' },
    { key: 'Form', label: 'Form' },
    { key: 'Standard Operating Procedure', label: 'SOP' },
    { key: 'Other', label: 'Other' },
];

function formatDate(dateStr: string) {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric',
    });
}

function PublicationCard({ item }: { item: StrapiItem<Publication> }) {
    const imageUrl = getMediaUrl(item.coverImage);
    const fileUrl = getMediaUrl(item.file);

    return (
        <a
            href={fileUrl || '#'}
            className="pr-card"
            {...(fileUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
            {imageUrl && (
                <div className="pr-card-image">
                    <img
                        src={imageUrl}
                        alt={item.title}
                        onError={(e) => {
                            e.currentTarget.src =
                                'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop';
                        }}
                    />
                </div>
            )}
            <div className="pr-card-body">
                <div className="pr-card-date">
                    <span className="nr-card-badge">{item.category}</span>
                    {item.publishDate && (
                        <span>
                            <i className="far fa-calendar-alt"></i> {formatDate(item.publishDate)}
                        </span>
                    )}
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="nr-read-more">
                    Download <i className="fas fa-download"></i>
                </span>
            </div>
        </a>
    );
}

export default function PublicationsPage() {
    const [activeCategory, setActiveCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const { data: pubsRes, loading } = useApi(
        () =>
            getPublications({
                category: activeCategory || undefined,
                limit: pageSize,
                page: currentPage,
            }),
        [activeCategory, currentPage]
    );

    const items = pubsRes?.data || [];
    const pagination = pubsRes?.meta?.pagination;
    const totalPages = pagination?.pageCount || 1;

    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Publications' },
    ];

    return (
        <>
            <Header />
            <main>
                <PageHero title="Publications" breadcrumbs={breadcrumbs} />

                <section className="pr-section section">
                    <div className="container">
                        <div className="pr-intro">
                            <p>
                                Official documents, reports, guidelines, and publications from the
                                Ministry of Health, Sierra Leone.
                            </p>
                        </div>

                        <div className="nr-filters">
                            {categories.map((cat) => (
                                <button
                                    key={cat.key}
                                    className={`nr-filter-btn ${activeCategory === cat.key ? 'active' : ''}`}
                                    onClick={() => {
                                        setActiveCategory(cat.key);
                                        setCurrentPage(1);
                                    }}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        {loading && (
                            <div className="nr-loading">
                                <i className="fas fa-spinner fa-spin"></i> Loading publications...
                            </div>
                        )}

                        {!loading && items.length > 0 && (
                            <div className="pr-list">
                                {items.map((item) => (
                                    <PublicationCard key={item.id} item={item} />
                                ))}
                            </div>
                        )}

                        {!loading && items.length === 0 && (
                            <div className="nr-empty">
                                <i className="fas fa-file-alt"></i>
                                <h3>No publications yet</h3>
                                <p>
                                    There are no publications to display at this time. Check back
                                    soon!
                                </p>
                            </div>
                        )}

                        {totalPages > 1 && (
                            <div className="nr-pagination">
                                <button
                                    className="nr-page-btn"
                                    disabled={currentPage <= 1}
                                    onClick={() => setCurrentPage((p) => p - 1)}
                                >
                                    <i className="fas fa-chevron-left"></i> Previous
                                </button>
                                <div className="nr-page-numbers">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                        (page) => (
                                            <button
                                                key={page}
                                                className={`nr-page-num ${currentPage === page ? 'active' : ''}`}
                                                onClick={() => setCurrentPage(page)}
                                            >
                                                {page}
                                            </button>
                                        )
                                    )}
                                </div>
                                <button
                                    className="nr-page-btn"
                                    disabled={currentPage >= totalPages}
                                    onClick={() => setCurrentPage((p) => p + 1)}
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
