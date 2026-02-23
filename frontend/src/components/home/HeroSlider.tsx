import { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import { getHeroSlides, getMediaUrl } from '../../services/api';
import type { HeroSlide } from '../../services/api';

// Static fallback slides (used when API has no data or is unavailable)
const fallbackSlides = [
    {
        id: 1,
        image: '/images/hub2.png',
        badge: { icon: 'shield-heart', text: 'National Health Information Hub' },
        title: 'Revolutionizing Healthcare',
        description: 'MoH Unveils State-of-the-Art Health Information System.',
        primaryBtn: { text: 'View Details', link: '/services', icon: 'stethoscope' },
        secondaryBtn: { text: 'Contact Us', link: '/contact', icon: 'phone' }
    },
    {
        id: 2,
        image: '/images/slide-3.jpg',
        badge: { icon: 'baby', text: 'Maternal & Child Health' },
        title: 'Safe Motherhood for All',
        description: 'Comprehensive maternal health programs to ensure safe pregnancies, deliveries, and healthy babies across Sierra Leone.',
        primaryBtn: { text: 'Maternal Health', link: '#', icon: 'heart' },
        secondaryBtn: { text: 'Learn More', link: '/contact', icon: 'info-circle' }
    },
    {
        id: 3,
        image: '/images/hub.png',
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
    badge: { icon: string; text: string };
    title: string;
    description: string;
    primaryBtn: { text: string; link: string; icon: string };
    secondaryBtn: { text: string; link: string; icon: string };
}

export default function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const { data: apiData, loading } = useApi(getHeroSlides);

    // Transform API data to slide format, or use fallback
    const slides: SlideData[] = (() => {
        if (apiData?.data && apiData.data.length > 0) {
            return apiData.data.map((item) => {
                const attrs = item.attributes || item as unknown as HeroSlide;
                return {
                    id: item.id,
                    image: getMediaUrl((attrs as HeroSlide).image) || '/images/hub2.png',
                    badge: {
                        icon: (attrs as HeroSlide).badgeIcon || 'shield-heart',
                        text: (attrs as HeroSlide).badge || 'Ministry of Health',
                    },
                    title: (attrs as HeroSlide).title,
                    description: (attrs as HeroSlide).description || '',
                    primaryBtn: {
                        text: (attrs as HeroSlide).primaryButtonText || 'View Details',
                        link: (attrs as HeroSlide).primaryButtonLink || '/',
                        icon: (attrs as HeroSlide).primaryButtonIcon || 'stethoscope',
                    },
                    secondaryBtn: {
                        text: (attrs as HeroSlide).secondaryButtonText || 'Contact Us',
                        link: (attrs as HeroSlide).secondaryButtonLink || '/contact',
                        icon: (attrs as HeroSlide).secondaryButtonIcon || 'phone',
                    },
                };
            });
        }
        return fallbackSlides;
    })();

    useEffect(() => {
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
                        <img src="/images/hub2.png" alt="Loading" className="slide-bg" />
                        <div className="slide-overlay"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="hero-slider" id="heroSlider">
            {/* Floating Particles Animation */}
            <div className="floating-particles">
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
                        <img src={slide.image} alt={slide.title} className="slide-bg" />
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
            <button className="slider-nav slider-prev" onClick={prevSlide} aria-label="Previous slide">
                <i className="fas fa-chevron-left"></i>
            </button>
            <button className="slider-nav slider-next" onClick={nextSlide} aria-label="Next slide">
                <i className="fas fa-chevron-right"></i>
            </button>

            {/* Slider Dots */}
            <div className="slider-dots">
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
            <div className="slider-nav-vertical">
                <span className="nav-text" onClick={prevSlide}>PREV</span>
                <span className="nav-divider"></span>
                <span className="nav-text" onClick={nextSlide}>NEXT</span>
            </div>

            {/* Stats Bar */}
            <div className="hero-stats-bar">
                <a href="/about#districts" className="stat-item">
                    <span className="stat-value">16</span>
                    <span className="stat-label">Districts Served</span>
                </a>
                <a href="/health-facilities" className="stat-item">
                    <span className="stat-value">1,200+</span>
                    <span className="stat-label">Health Facilities</span>
                </a>
                <a href="/programs#phu" className="stat-item">
                    <span className="stat-value">100%</span>
                    <span className="stat-label">PHU Coverage</span>
                </a>
                <a href="/programs#vaccination" className="stat-item">
                    <span className="stat-value">85%</span>
                    <span className="stat-label">Vaccine Coverage</span>
                </a>
                <a href="/about#investments" className="stat-item">
                    <span className="stat-value">$150M+</span>
                    <span className="stat-label">Health Investment</span>
                </a>
                <a href="/directorates#workforce" className="stat-item">
                    <span className="stat-value">15K+</span>
                    <span className="stat-label">Healthcare Workers</span>
                </a>
                <a href="/programs" className="stat-item">
                    <span className="stat-value">8M+</span>
                    <span className="stat-label">Citizens Covered</span>
                </a>
            </div>
        </section>
    );
}
