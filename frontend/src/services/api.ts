/**
 * Strapi API Service
 * 
 * Central service for all API calls to the Strapi backend.
 * All content types have public READ access configured via bootstrap.
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

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

export type StrapiItem<T> = {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
} & T;

export interface StrapiMedia {
    id: number;
    documentId: string;
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
}

// ─── Content Type Interfaces ─────────────────────────────────────

export interface HeroSlide {
    title: string;
    description: string;
    image: StrapiMedia | null;
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
    gallery: StrapiMedia[];
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
    file: StrapiMedia | null;
    coverImage: StrapiMedia | null;
    publishDate: string;
    year: number;
    directorate: StrapiItem<Directorate> | null;
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
    directorImage: StrapiMedia | null;
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
    publications: StrapiItem<Publication>[];
}

// ─── Single Type Interfaces ──────────────────────────────────────

export interface LinkItem {
    id: number;
    label: string;
    url: string;
}

export interface SocialLink {
    id: number;
    platform: string;
    url: string;
    icon: string;
}

export interface StatItem {
    id: number;
    value: string;
    label: string;
    link?: string;
}

export interface ServiceCard {
    id: number;
    icon: string;
    title: string;
    description: string;
    link?: string;
}

export interface Highlight {
    id: number;
    icon: string;
    title: string;
    description: string;
}

export interface NavItem {
    label: string;
    url: string;
    children?: { label: string; url: string; icon?: string }[];
}

export interface SiteSettings {
    ministryName: string;
    ministryTagline: string;
    logo: StrapiMedia | null;
    logoWhite: StrapiMedia | null;
    contactAddress: string;
    contactEmail: string;
    contactPhone: string;
    socialLinks: SocialLink[];
    mainNavigation: NavItem[];
    footerAboutText: string;
    footerQuickLinks: LinkItem[];
    footerServiceLinks: LinkItem[];
    copyrightText: string;
    legalLinks: LinkItem[];
}

export interface Homepage {
    statsBar: StatItem[];
    services: ServiceCard[];
    newsletterTitle: string;
    newsletterSubtitle: string;
    newsletterButtonText: string;
    newsletterPlaceholder: string;
}

export interface AboutPage {
    overviewBadge: string;
    overviewHeadline: string;
    overviewLeadText: string;
    overviewBodyText: string;
    overviewImage: StrapiMedia | null;
    highlights: Highlight[];
    stats: StatItem[];
    missionText: string;
    visionText: string;
    coreValues: Highlight[];
}

export interface LeadershipMember {
    name: string;
    position: string;
    credentials: string;
    bio: string;
    image: StrapiMedia | null;
    order: number;
    isMinister: boolean;
    stats: StatItem[];
    education: string;
    experience: string;
    focusAreas: string;
}

export interface Job {
    title: string;
    slug: string;
    description: string;
    summary: string;
    sector: string;
    location: string;
    jobType: string;
    experienceLevel: string;
    icon: string;
    tags: string[];
    deadline: string;
    featured: boolean;
    applyLink: string;
    directorate: StrapiItem<Directorate> | null;
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
    if (!media?.url) return '';
    const url = media.url;
    if (url.startsWith('http')) return url;
    return `${API_URL}${url}`;
}

/**
 * Get a specific format of a media file (thumbnail, small, medium, large)
 */
export function getMediaFormat(
    media: StrapiMedia | null | undefined,
    format: 'thumbnail' | 'small' | 'medium' | 'large'
): string {
    const formatUrl = media?.formats?.[format]?.url;
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

    const response = await fetch(url);

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
        'populate': '*',
    });
}

/**
 * Fetch a single directorate by slug (with all relations)
 */
export async function getDirectorateBySlug(slug: string): Promise<StrapiResponse<Directorate>> {
    return fetchAPI<StrapiResponse<Directorate>>('directorates', {
        'populate': '*',
        'filters[slug][$eq]': slug,
    });
}

/**
 * Fetch jobs with optional filters
 */
export async function getJobs(options?: {
    sector?: string;
    location?: string;
    jobType?: string;
    experienceLevel?: string;
    featured?: boolean;
    limit?: number;
    page?: number;
}): Promise<StrapiResponse<Job>> {
    const params: Record<string, string> = {
        'populate': '*',
        'sort': 'deadline:asc',
    };

    if (options?.sector) {
        params['filters[sector][$eq]'] = options.sector;
    }
    if (options?.location) {
        params['filters[location][$eq]'] = options.location;
    }
    if (options?.jobType) {
        params['filters[jobType][$eq]'] = options.jobType;
    }
    if (options?.experienceLevel) {
        params['filters[experienceLevel][$eq]'] = options.experienceLevel;
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

    return fetchAPI<StrapiResponse<Job>>('jobs', params);
}

/**
 * Fetch a single job by slug
 */
export async function getJobBySlug(slug: string): Promise<StrapiResponse<Job>> {
    return fetchAPI<StrapiResponse<Job>>('jobs', {
        'populate': '*',
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
    const response = await fetch(`${API_URL}/api/newsletter-subscribers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
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

// ─── Single Type & New Collection API Functions ──────────────────

export async function getSiteSettings(): Promise<StrapiSingleResponse<SiteSettings>> {
    return fetchAPI<StrapiSingleResponse<SiteSettings>>('site-setting', {
        'populate': '*',
    });
}

export async function getHomepage(): Promise<StrapiSingleResponse<Homepage>> {
    return fetchAPI<StrapiSingleResponse<Homepage>>('homepage', {
        'populate': '*',
    });
}

export async function getAboutPage(): Promise<StrapiSingleResponse<AboutPage>> {
    return fetchAPI<StrapiSingleResponse<AboutPage>>('about-page', {
        'populate': '*',
    });
}

export async function getLeadershipMembers(): Promise<StrapiResponse<LeadershipMember>> {
    return fetchAPI<StrapiResponse<LeadershipMember>>('leadership-members', {
        'populate': '*',
        'sort': 'order:asc',
    });
}
