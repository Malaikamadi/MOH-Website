import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageHero from '../components/common/PageHero';
import { useApi } from '../hooks/useApi';
import { getVideos, getMediaUrl } from '../services/api';
import type { Video, StrapiItem } from '../services/api';

function formatDate(dateStr: string) {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric',
    });
}

function VideoCard({ video }: { video: StrapiItem<Video> }) {
    const imageUrl =
        getMediaUrl(video.coverImage) ||
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop';
    const href = video.videoUrl || getMediaUrl(video.videoFile) || '#';

    return (
        <a
            href={href}
            className="nr-card"
            {...(href !== '#' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
            <div className="nr-card-image">
                <img
                    src={imageUrl}
                    alt={video.title}
                    onError={(e) => {
                        e.currentTarget.src =
                            'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop';
                    }}
                />
                <span className="nr-card-badge">Video</span>
                <div className="play-overlay">
                    <i className="fas fa-play"></i>
                </div>
            </div>
            <div className="nr-card-body">
                <div className="nr-card-meta">
                    {video.publishedDate && (
                        <span>
                            <i className="far fa-calendar-alt"></i> {formatDate(video.publishedDate)}
                        </span>
                    )}
                </div>
                <h3>{video.title}</h3>
                <p>{video.summary}</p>
                <span className="nr-read-more">
                    Watch Video <i className="fas fa-play"></i>
                </span>
            </div>
        </a>
    );
}

export default function VideosPage() {
    const { data: videosRes, loading } = useApi(() => getVideos({ limit: 24 }));
    const videos = videosRes?.data || [];

    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Videos' },
    ];

    return (
        <>
            <Header />
            <main>
                <PageHero title="Videos" breadcrumbs={breadcrumbs} />

                <section className="nr-section section">
                    <div className="container">
                        {loading && (
                            <div className="nr-loading">
                                <i className="fas fa-spinner fa-spin"></i> Loading videos...
                            </div>
                        )}

                        {!loading && videos.length > 0 && (
                            <div className="nr-grid">
                                {videos.map((video) => (
                                    <VideoCard key={video.id} video={video} />
                                ))}
                            </div>
                        )}

                        {!loading && videos.length === 0 && (
                            <div className="nr-empty">
                                <i className="fas fa-video"></i>
                                <h3>No videos yet</h3>
                                <p>
                                    There are no videos to display at this time. Check back soon!
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
