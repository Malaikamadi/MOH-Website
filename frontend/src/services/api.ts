/**
 * Strapi API Service
 * 
 * Central service for all API calls to the Strapi backend.
 * All content types have public READ access configured via bootstrap.
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';
const API_TOKEN = import.meta.env.VITE_API_TOKEN || '53b5ea3f17b8f19ca86026640384ba5cd5314ace0fe90899f09437a1091601b0e5d34438315fa1f4ddd19bd63ea085fdad5a23a176fae8a3812a4b688e275c78f636a15028f08f77cc7cfccfbdf6bffa994941c2123d1d33f18f79e2255de67e8497b1d5257c7bfc3ab0f11f75b59b0cd7da2befaf8ce6ca68a2979e05647c6d';

// ─── Types ───────────────────────────────────────────────────────

export interface StrapiResponse<T> {
    data: StrapiItem<T>[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

export interface StrapiSingleResponse<T> {
    data: StrapiItem<T>;
    meta: {};
}

export interface StrapiItem<T> {
    id: number;
    attributes: T;
}

export interface StrapiMedia {
    data: {
        id: number;
        attributes: {
            url: string;
            name: string;
            alternativeText: string | null;
            width?: number;
            height?: number;
            formats?: {
                thumbnail?: { url: string };
                small?: { url: string };
                medium?: { url: string };
                large?: { url: string };
            };
        };
    } | null;
}

// ─── Content Type Interfaces ─────────────────────────────────────

export interface HeroSlide {
    title: string;
    description: string;
    image: StrapiMedia;
    badge: string;
    badgeIcon: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    primaryButtonIcon: string;
    secondaryButtonText: string;
    secondaryButtonLink: string;
    secondaryButtonIcon: string;
    order: number;
    isActive: boolean;
}

export interface NewsArticle {
    title: string;
    slug: string;
    summary: string;
    content: string;
    coverImage: StrapiMedia;
    gallery: { data: StrapiMedia['data'][] };
    category: 'Breaking News' | 'Latest News' | 'Press Release' | 'Public Notice' | 'Announcement' | 'Health Initiative';
    contentType: 'news' | 'video' | 'event' | 'publication';
    tags: string[];
    author: string;
    publishedDate: string;
    featured: boolean;
    videoUrl: string;
}

export interface Event {
    title: string;
    slug: string;
    description: string;
    summary: string;
    location: string;
    eventStartDate: string;
    eventEndDate: string;
    coverImage: StrapiMedia;
    registrationLink: string;
    organizer: string;
    featured: boolean;
}

export interface Publication {
    title: string;
    description: string;
    category: 'Policy' | 'Report' | 'Guideline' | 'Strategic Plan' | 'Annual Report' | 'Research' | 'Form' | 'Standard Operating Procedure' | 'Other';
    file: StrapiMedia;
    coverImage: StrapiMedia;
    publishDate: string;
    year: number;
    directorate: {
        data: StrapiItem<Directorate> | null;
    };
}

export interface Directorate {
    name: string;
    fullName: string;
    slug: string;
    icon: string;
    about: string;
    aboutExtra: string;
    statsUnits: number;
    statsDistricts: number;
    statsStaff: string;
    statsPartners: string;
    directorName: string;
    directorCredentials: string;
    directorImage: StrapiMedia;
    directorBio: string[];
    units: {
        id: string;
        name: string;
        icon: string;
        description: string;
        functions: string[];
    }[];
    contactEmail: string;
    contactPhone: string;
    contactLocation: string;
    publications: {
        data: StrapiItem<Publication>[];
    };
}

export interface DiseaseSurveillance {
    diseaseName: string;
    region: string;
    district: string;
    reportingPeriodStart: string;
    reportingPeriodEnd: string;
    totalCases: number;
    newCases: number;
    deaths: number;
    recovered: number;
    sourceSystem: string;
    status: 'Confirmed' | 'Suspected' | 'Projected';
}

// ─── Helper Functions ────────────────────────────────────────────

/**
 * Get the full URL for a Strapi media file
 */
export function getMediaUrl(media: StrapiMedia | null | undefined): string {
    if (!media?.data?.attributes?.url) return '';
    const url = media.data.attributes.url;
    // If the URL is already absolute, return as-is
    if (url.startsWith('http')) return url;
    // Otherwise, prepend the API URL
    return `${API_URL}${url}`;
}

/**
 * Get a specific format of a media file (thumbnail, small, medium, large)
 */
export function getMediaFormat(
    media: StrapiMedia | null | undefined,
    format: 'thumbnail' | 'small' | 'medium' | 'large'
): string {
    const formatUrl = media?.data?.attributes?.formats?.[format]?.url;
    if (!formatUrl) return getMediaUrl(media);
    if (formatUrl.startsWith('http')) return formatUrl;
    return `${API_URL}${formatUrl}`;
}

/**
 * Generic fetch wrapper for Strapi API
 */
async function fetchAPI<T>(
    endpoint: string,
    params: Record<string, string> = {}
): Promise<T> {
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_URL}/api/${endpoint}${queryString ? `?${queryString}` : ''}`;

    const headers: Record<string, string> = {};
    if (API_TOKEN) {
        headers['Authorization'] = `Bearer ${API_TOKEN}`;
    }

    const response = await fetch(url, { headers });

    if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

// ─── API Functions ───────────────────────────────────────────────

/**
 * Fetch hero slides (sorted by order, only active)
 */
export async function getHeroSlides(): Promise<StrapiResponse<HeroSlide>> {
    return fetchAPI<StrapiResponse<HeroSlide>>('hero-slides', {
        'populate': '*',
        'filters[isActive][$eq]': 'true',
        'sort': 'order:asc',
    });
}

/**
 * Fetch news articles with optional filters
 */
export async function getNewsArticles(options?: {
    category?: string;
    contentType?: string;
    featured?: boolean;
    limit?: number;
    page?: number;
}): Promise<StrapiResponse<NewsArticle>> {
    const params: Record<string, string> = {
        'populate': '*',
        'sort': 'publishedDate:desc',
    };

    if (options?.category) {
        params['filters[category][$eq]'] = options.category;
    }
    if (options?.contentType) {
        params['filters[contentType][$eq]'] = options.contentType;
    }
    if (options?.featured !== undefined) {
        params['filters[featured][$eq]'] = String(options.featured);
    }
    if (options?.limit) {
        params['pagination[pageSize]'] = String(options.limit);
    }
    if (options?.page) {
        params['pagination[page]'] = String(options.page);
    }

    return fetchAPI<StrapiResponse<NewsArticle>>('news-articles', params);
}

/**
 * Fetch a single news article by slug
 */
export async function getNewsArticleBySlug(slug: string): Promise<StrapiResponse<NewsArticle>> {
    return fetchAPI<StrapiResponse<NewsArticle>>('news-articles', {
        'populate': '*',
        'filters[slug][$eq]': slug,
    });
}

/**
 * Fetch events with optional filters
 */
export async function getEvents(options?: {
    upcoming?: boolean;
    featured?: boolean;
    limit?: number;
}): Promise<StrapiResponse<Event>> {
    const params: Record<string, string> = {
        'populate': '*',
        'sort': 'eventStartDate:asc',
    };

    if (options?.upcoming) {
        params['filters[eventStartDate][$gte]'] = new Date().toISOString();
    }
    if (options?.featured !== undefined) {
        params['filters[featured][$eq]'] = String(options.featured);
    }
    if (options?.limit) {
        params['pagination[pageSize]'] = String(options.limit);
    }

    return fetchAPI<StrapiResponse<Event>>('events', params);
}

/**
 * Fetch publications with optional filters
 */
export async function getPublications(options?: {
    category?: string;
    directorate?: string;
    year?: number;
    limit?: number;
    page?: number;
}): Promise<StrapiResponse<Publication>> {
    const params: Record<string, string> = {
        'populate': '*',
        'sort': 'publishDate:desc',
    };

    if (options?.category) {
        params['filters[category][$eq]'] = options.category;
    }
    if (options?.directorate) {
        params['filters[directorate][slug][$eq]'] = options.directorate;
    }
    if (options?.year) {
        params['filters[year][$eq]'] = String(options.year);
    }
    if (options?.limit) {
        params['pagination[pageSize]'] = String(options.limit);
    }
    if (options?.page) {
        params['pagination[page]'] = String(options.page);
    }

    return fetchAPI<StrapiResponse<Publication>>('publications', params);
}

/**
 * Fetch all directorates
 */
export async function getDirectorates(): Promise<StrapiResponse<Directorate>> {
    return fetchAPI<StrapiResponse<Directorate>>('directorates', {
        'populate': 'directorImage,publications',
    });
}

/**
 * Fetch a single directorate by slug (with all relations)
 */
export async function getDirectorateBySlug(slug: string): Promise<StrapiResponse<Directorate>> {
    return fetchAPI<StrapiResponse<Directorate>>('directorates', {
        'populate[directorImage]': '*',
        'populate[publications][populate]': '*',
        'filters[slug][$eq]': slug,
    });
}

/**
 * Fetch disease surveillance data
 */
export async function getDiseaseSurveillance(options?: {
    disease?: string;
    region?: string;
    status?: string;
    limit?: number;
}): Promise<StrapiResponse<DiseaseSurveillance>> {
    const params: Record<string, string> = {
        'sort': 'reportingPeriodEnd:desc',
    };

    if (options?.disease) {
        params['filters[diseaseName][$eq]'] = options.disease;
    }
    if (options?.region) {
        params['filters[region][$eq]'] = options.region;
    }
    if (options?.status) {
        params['filters[status][$eq]'] = options.status;
    }
    if (options?.limit) {
        params['pagination[pageSize]'] = String(options.limit);
    }

    return fetchAPI<StrapiResponse<DiseaseSurveillance>>('disease-surveillances', params);
}

/**
 * Subscribe to newsletter
 */
export async function subscribeNewsletter(email: string): Promise<StrapiSingleResponse<{ email: string }>> {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };
    if (API_TOKEN) {
        headers['Authorization'] = `Bearer ${API_TOKEN}`;
    }

    const response = await fetch(`${API_URL}/api/newsletter-subscribers`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            data: {
                email,
                subscribedAt: new Date().toISOString(),
                isActive: true,
            },
        }),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        if (response.status === 400) {
            throw new Error('This email is already subscribed!');
        }
        throw new Error(error?.error?.message || 'Subscription failed');
    }

    return response.json();
}

/**
 * Fetch latest updates for homepage (combines news, events, publications)
 */
export async function getLatestUpdates(options?: {
    type?: 'news' | 'video' | 'event' | 'publication' | 'all';
    limit?: number;
}): Promise<StrapiResponse<NewsArticle>> {
    const params: Record<string, string> = {
        'populate': '*',
        'sort': 'publishedDate:desc',
        'pagination[pageSize]': String(options?.limit || 6),
    };

    if (options?.type && options.type !== 'all') {
        params['filters[contentType][$eq]'] = options.type;
    }

    return fetchAPI<StrapiResponse<NewsArticle>>('news-articles', params);
}
