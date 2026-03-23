import { useApi } from '../../hooks/useApi';
import {
    getAnnualHealthcareReview,
    toYouTubeEmbedUrl,
} from '../../services/api';
import type { AnnualHealthcareReview, ReviewBullet } from '../../services/api';

const FALLBACK: AnnualHealthcareReview = {
    isVisible: true,
    badgeLabel: 'Annual Healthcare Review',
    badgeIcon: 'book',
    heading: 'End of Year Healthcare Reflection',
    bodyParagraph1:
        "The Health sector in Sierra Leone is on a transformative journey, one that is centered around the innovative 'life stages approach.' This concept prioritizes the human being as the center of focus in service provision; tailoring care across all stages of life.",
    bodyParagraph2:
        'Through the leadership of Dr. Austin Demby as Minister of Health, we reflect on the achievements, challenges, and the way forward for healthcare in Sierra Leone.',
    highlights: [
        { id: 1, text: 'Major health infrastructure improvements' },
        { id: 2, text: 'Enhanced maternal and child health programs' },
        { id: 3, text: 'Digital health transformation initiatives' },
    ],
    youtubeUrl: '',
    videoCaption: 'Final End of Year Healthcare Reflection Video',
    reportButtonText: 'Read Full Report',
    reportButtonUrl: '/publications',
    reportButtonIcon: 'book-open',
};

function faClass(icon: string, fallback: string) {
    const i = (icon || fallback).trim();
    if (i.startsWith('fa-')) return `fas ${i}`;
    return `fas fa-${i}`;
}

function strOrNull(v: unknown): string | null {
    if (v == null) return null;
    if (typeof v !== 'string') return null;
    const t = v.trim();
    return t || null;
}

function normalizeHighlights(raw: unknown): ReviewBullet[] {
    if (!Array.isArray(raw) || raw.length === 0) return FALLBACK.highlights;
    const out: ReviewBullet[] = [];
    raw.forEach((item: unknown, index: number) => {
        if (item && typeof item === 'object' && 'text' in item) {
            const t = String((item as { text: string }).text || '').trim();
            if (t) {
                out.push({
                    id: (item as { id?: number }).id ?? index,
                    text: t,
                });
            }
        }
    });
    return out.length ? out : FALLBACK.highlights;
}

function mergeFromApi(row: Partial<AnnualHealthcareReview> & Record<string, unknown>): AnnualHealthcareReview {
    return {
        isVisible: row.isVisible !== false,
        badgeLabel: (row.badgeLabel as string) || FALLBACK.badgeLabel,
        badgeIcon: (row.badgeIcon as string) || FALLBACK.badgeIcon,
        heading: (row.heading as string) || FALLBACK.heading,
        bodyParagraph1:
            typeof row.bodyParagraph1 === 'string' && row.bodyParagraph1.trim()
                ? row.bodyParagraph1
                : FALLBACK.bodyParagraph1,
        bodyParagraph2:
            typeof row.bodyParagraph2 === 'string' && row.bodyParagraph2.trim()
                ? row.bodyParagraph2
                : FALLBACK.bodyParagraph2,
        highlights: normalizeHighlights(row.highlights),
        youtubeUrl: strOrNull(row.youtubeUrl),
        videoCaption: strOrNull(row.videoCaption) ?? FALLBACK.videoCaption,
        reportButtonText:
            (row.reportButtonText as string) || FALLBACK.reportButtonText,
        reportButtonUrl:
            strOrNull(row.reportButtonUrl) ?? FALLBACK.reportButtonUrl,
        reportButtonIcon:
            (row.reportButtonIcon as string) || FALLBACK.reportButtonIcon,
    };
}

export default function AnnualHealthcareReviewSection() {
    const { data, error } = useApi(getAnnualHealthcareReview);
    const row = data?.data as
        | (Partial<AnnualHealthcareReview> & Record<string, unknown>)
        | undefined;

    if (row && row.isVisible === false) return null;

    const c =
        row && !error ? mergeFromApi(row) : FALLBACK;

    const embedSrc = toYouTubeEmbedUrl(c.youtubeUrl);
    const reportHref = c.reportButtonUrl || '/publications';
    const reportExternal = /^https?:\/\//i.test(reportHref);

    return (
        <section
            className="video-reflection section-sm"
            aria-labelledby="annual-healthcare-review-heading"
        >
            <div className="container">
                <div className="video-reflection-grid">
                    <div className="video-reflection-content">
                        <p className="video-reflection-badge">
                            <i className={faClass(c.badgeIcon, 'book')} aria-hidden />
                            {c.badgeLabel}
                        </p>
                        <h2 id="annual-healthcare-review-heading">
                            {c.heading}
                        </h2>
                        {c.bodyParagraph1 ? (
                            <p>{c.bodyParagraph1}</p>
                        ) : null}
                        {c.bodyParagraph2 ? (
                            <p>{c.bodyParagraph2}</p>
                        ) : null}
                        <div className="video-highlights">
                            {c.highlights.map((h) => (
                                <div
                                    key={h.id}
                                    className="video-highlight-item"
                                >
                                    <i
                                        className="fas fa-check-circle"
                                        aria-hidden
                                    />
                                    <span>{h.text}</span>
                                </div>
                            ))}
                        </div>
                        <a
                            href={reportHref}
                            className="video-reflection-cta"
                            {...(reportExternal
                                ? {
                                      target: '_blank',
                                      rel: 'noopener noreferrer',
                                  }
                                : {})}
                        >
                            <i
                                className={faClass(
                                    c.reportButtonIcon,
                                    'book-open'
                                )}
                                aria-hidden
                            />
                            {c.reportButtonText}
                        </a>
                    </div>
                    <div className="video-reflection-player">
                        <div className="video-wrapper">
                            {embedSrc ? (
                                <iframe
                                    title={c.videoCaption || 'Annual healthcare review video'}
                                    src={embedSrc}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                            ) : (
                                <div
                                    className="video-reflection-placeholder"
                                    role="img"
                                    aria-label="Video not configured"
                                >
                                    <span>
                                        Add a YouTube URL in Strapi → Annual
                                        Healthcare Review
                                    </span>
                                </div>
                            )}
                        </div>
                        {c.videoCaption ? (
                            <p className="video-caption">
                                <i
                                    className="fab fa-youtube"
                                    aria-hidden
                                />
                                {c.videoCaption}
                            </p>
                        ) : null}
                    </div>
                </div>
            </div>
        </section>
    );
}
