import { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import { getHeroSlides, getNewsArticles, getHomepage, getHeroImageUrl, getHeroImageSrcSet } from '../../services/api';
import type { NewsArticle } from '../../services/api';

const categoryToIcon: Record<string, string> = {
    'Breaking News': 'newspaper',
    'Latest News': 'rss',
    'Press Release': 'bullhorn',
    'Public Notice': 'bullhorn',
    'Announcement': 'bullhorn',
    'Health Initiative': 'heart',
};

// Static fallback slides (used when no featured news in backend)
const fallbackSlides = [
    {
        id: 1,
        image: '/images/slide-1.jpg',
        badge: { icon: 'shield-heart', text: 'National Health Information Hub' },
        title: 'Revolutionizing Healthcare',
        description: 'MoH Unveils State-of-the-Art Health Information System.',
        primaryBtn: { text: 'View Details', link: '/services', icon: 'stethoscope' },
        secondaryBtn: { text: 'Contact Us', link: '/contact', icon: 'phone' }
    },
    {
        id: 2,
        image: '/images/slide-2.jpg',
        badge: { icon: 'baby', text: 'Maternal & Child Health' },
        title: 'Safe Motherhood for All',
        description: 'Comprehensive maternal health programs to ensure safe pregnancies, deliveries, and healthy babies across Sierra Leone.',
        primaryBtn: { text: 'Maternal Health', link: '#', icon: 'heart' },
        secondaryBtn: { text: 'Learn More', link: '/contact', icon: 'info-circle' }
    },
    {
        id: 3,
        image: '/images/slide-3.jpg',
        badge: { icon: 'syringe', text: 'National Immunization Program' },
        title: "Protecting Our Children's Future",
        description: 'Free vaccination programs reaching every child in Sierra Leone. Protecting communities through immunization.',
        primaryBtn: { text: 'Immunization Info', link: '#', icon: 'syringe' },
        secondaryBtn: { text: 'Find a Clinic', link: '/contact', icon: 'calendar' }
    }
];

interface SlideData {
    id: number;
    image: string;
    srcSet?: string;
    badge: { icon: string; text: string };
    title: string;
    description: string;
    primaryBtn: { text: string; link: string; icon: string };
    secondaryBtn: { text: string; link: string; icon: string };
}

export default function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const { data: heroData, loading: heroLoading } = useApi(getHeroSlides);
    const { data: newsData, loading: newsLoading } = useApi(() => getNewsArticles({ featured: true, limit: 5 }));
    const { data: homepageRes } = useApi(getHomepage);
    const statsBar = homepageRes?.data?.statsBar;
    const hasHero = Boolean(heroData?.data?.length);
    const hasNews = Boolean(newsData?.data?.length);
    const loading = (heroLoading || newsLoading) && !hasHero && !hasNews;

    const slides: SlideData[] = (() => {
        const achievements = heroData?.data;
        if (achievements && achievements.length > 0) {
            return achievements.map((item, index) => ({
                id: item.id,
                image: getHeroImageUrl(item.image) || `/images/slide-${(index % 3) + 1}.jpg`,
                srcSet: getHeroImageSrcSet(item.image),
                badge: {
                    icon: item.badgeIcon || 'trophy',
                    text: item.badge || 'Latest Achievement',
                },
                title: item.title,
                description: item.description || '',
                primaryBtn: {
                    text: item.primaryButtonText || 'View Details',
                    link: item.primaryButtonLink || '/',
                    icon: item.primaryButtonIcon || 'arrow-right',
                },
                secondaryBtn: {
                    text: item.secondaryButtonText || 'Learn More',
                    link: item.secondaryButtonLink || '/about',
                    icon: item.secondaryButtonIcon || 'info-circle',
                },
            }));
        }

        const items = newsData?.data;
        if (items && items.length > 0) {
            return items.map((item: { id: number } & NewsArticle, index: number) => ({
                id: item.id,
                image: getHeroImageUrl(item.coverImage) || `/images/slide-${(index % 3) + 1}.jpg`,
                srcSet: getHeroImageSrcSet(item.coverImage),
                badge: {
                    icon: categoryToIcon[item.category] || 'rss',
                    text: item.category || 'Latest News',
                },
                title: item.title,
                description: item.summary || '',
                primaryBtn: {
                    text: 'Read Article',
                    link: `/newsroom/${item.slug}`,
                    icon: 'arrow-right',
                },
                secondaryBtn: {
                    text: 'Learn More',
                    link: `/newsroom/${item.slug}`,
                    icon: 'info-circle',
                },
            }));
        }
        return fallbackSlides;
    })();

    useEffect(() => {
        if (slides.length === 0) return;
        setCurrentSlide((prev) => prev % slides.length);
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    if (loading) {
        return (
            <section className="hero-slider" id="heroSlider">
                <div className="slides-container">
                    <div className="slide active">
                        <img src="/images/slide-1.jpg" alt="Loading" className="slide-bg" decoding="async" fetchPriority="high" />
                        <div className="slide-overlay"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="hero-slider" id="heroSlider">
            {/* Floating Particles Animation */}
            <div className="floating-particles notranslate" translate="no">
                {[...Array(16)].map((_, i) => (
                    <div key={i} className={`particle particle-${i + 1}`}>
                        <i className={`fas fa-${['plus', 'stethoscope', 'heartbeat', 'syringe', 'shield-heart', 'heart'][i % 6]}`}></i>
                    </div>
                ))}
            </div>

            {/* Slides */}
            <div className="slides-container">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`slide ${index === currentSlide ? 'active' : ''}`}
                        data-slide={slide.id}
                    >
                        <img
                            src={slide.image}
                            srcSet={slide.srcSet}
                            sizes="100vw"
                            alt={slide.title}
                            className="slide-bg"
                            loading={index === 0 ? 'eager' : 'lazy'}
                            decoding="async"
                            fetchPriority={index === currentSlide ? 'high' : 'low'}
                            onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = `/images/slide-${(index % 3) + 1}.jpg`;
                                e.currentTarget.removeAttribute('srcset');
                            }}
                        />
                        <div className="slide-overlay"></div>
                        <div className="container">
                            <div className="hero-content">
                                <div className="hero-badge">
                                    <i className={`fas fa-${slide.badge.icon}`}></i>
                                    <span>{slide.badge.text}</span>
                                </div>
                                <h1>{slide.title}</h1>
                                <p>{slide.description}</p>
                                <div className="hero-buttons">
                                    <a href={slide.primaryBtn.link} className="btn btn-primary btn-lg">
                                        <i className={`fas fa-${slide.primaryBtn.icon}`}></i>
                                        {slide.primaryBtn.text}
                                    </a>
                                    <a href={slide.secondaryBtn.link} className="btn btn-outline-white btn-lg">
                                        <i className={`fas fa-${slide.secondaryBtn.icon}`}></i>
                                        {slide.secondaryBtn.text}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Slider Navigation Arrows */}
            <button className="slider-nav slider-prev notranslate" translate="no" onClick={prevSlide} aria-label="Previous slide">
                <i className="fas fa-chevron-left"></i>
            </button>
            <button className="slider-nav slider-next notranslate" translate="no" onClick={nextSlide} aria-label="Next slide">
                <i className="fas fa-chevron-right"></i>
            </button>

            {/* Slider Dots */}
            <div className="slider-dots notranslate" translate="no">
                {slides.map((slide, index) => (
                    <button
                        key={slide.id}
                        className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${slide.id}`}
                    ></button>
                ))}
            </div>

            {/* Vertical PREV/NEXT Navigation */}
            <div className="slider-nav-vertical notranslate" translate="no">
                <span className="nav-text" onClick={prevSlide}>PREV</span>
                <span className="nav-divider"></span>
                <span className="nav-text" onClick={nextSlide}>NEXT</span>
            </div>

            {/* Stats Bar */}
            <div className="hero-stats-bar">
                {(statsBar && statsBar.length > 0 ? statsBar : [
                    { id: 1, value: '16', label: 'Districts Served', link: '/about#districts' },
                    { id: 2, value: '1,200+', label: 'Health Facilities', link: '/health-facilities' },
                    { id: 3, value: '100%', label: 'PHU Coverage', link: '/programs#phu' },
                    { id: 4, value: '85%', label: 'Vaccine Coverage', link: '/programs#vaccination' },
                    { id: 5, value: '$150M+', label: 'Health Investment', link: '/about#investments' },
                    { id: 6, value: '15K+', label: 'Healthcare Workers', link: '/directorates#workforce' },
                    { id: 7, value: '8M+', label: 'Citizens Covered', link: '/programs' },
                ]).map((stat) => (
                    <a key={stat.id} href={stat.link || '#'} className="stat-item">
                        <span className="stat-value">{stat.value}</span>
                        <span className="stat-label">{stat.label}</span>
                    </a>
                ))}
            </div>
        </section>
    );
}
