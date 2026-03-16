import { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import { getHeroSlides, getHomepage, getMediaUrl } from '../../services/api';
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
    const { data: homepageRes } = useApi(getHomepage);
    const statsBar = homepageRes?.data?.statsBar;

    const slides: SlideData[] = (() => {
        if (apiData?.data && apiData.data.length > 0) {
            return apiData.data.map((item) => ({
                id: item.id,
                image: getMediaUrl(item.image) || '/images/hub2.png',
                badge: {
                    icon: item.badgeIcon || 'shield-heart',
                    text: item.badge || 'Ministry of Health',
                },
                title: item.title,
                description: item.description || '',
                primaryBtn: {
                    text: item.primaryButtonText || 'View Details',
                    link: item.primaryButtonLink || '/',
                    icon: item.primaryButtonIcon || 'stethoscope',
                },
                secondaryBtn: {
                    text: item.secondaryButtonText || 'Contact Us',
                    link: item.secondaryButtonLink || '/contact',
                    icon: item.secondaryButtonIcon || 'phone',
                },
            }));
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
