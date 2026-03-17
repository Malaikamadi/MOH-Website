import { useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { getSiteSettings, getMediaUrl } from '../../services/api';
import type { SiteSettings, NavItem } from '../../services/api';

const fallbackNav: NavItem[] = [
    { label: 'Home', url: '/', children: [] },
    { label: 'About MOH', url: '/about', children: [
        { label: 'Our History', url: '/about', icon: 'landmark' },
        { label: 'Leadership', url: '/about#leadership', icon: 'users-cog' },
        { label: 'Mission & Vision', url: '/about#mission', icon: 'bullseye' },
    ]},
    { label: 'Directorates', url: '/directorates', children: [
        { label: 'DPPI', url: '/directorates/dppi', icon: 'chart-line' },
        { label: 'Reproductive & Child Health', url: '/directorates/rch', icon: 'baby' },
        { label: 'Primary Health Care', url: '/directorates/phc', icon: 'heartbeat' },
        { label: 'Disease Prevention & Control', url: '/directorates/dpc', icon: 'virus-slash' },
        { label: 'Emergency Medical Services', url: '/directorates/nems', icon: 'ambulance' },
        { label: 'Support Services', url: '/directorates/ss', icon: 'cogs' },
        { label: 'Nursing & Midwifery', url: '/directorates/nm', icon: 'user-nurse' },
        { label: 'NCD & Mental Health', url: '/directorates/ncdandmh', icon: 'brain' },
        { label: 'Pharmaceutical Services', url: '/directorates/ps', icon: 'pills' },
        { label: 'Human Resource Management', url: '/directorates/hrm', icon: 'users' },
        { label: 'Training & Research', url: '/directorates/tr', icon: 'book' },
        { label: 'Environmental Health', url: '/directorates/ehc', icon: 'leaf' },
        { label: 'Food & Nutrition', url: '/directorates/fn', icon: 'utensils' },
    ]},
    { label: 'Media', url: '/media', children: [
        { label: 'Newsroom', url: '/newsroom', icon: 'rss' },
        { label: 'Events', url: '/events', icon: 'calendar-alt' },
        { label: 'Press Releases', url: '/press-releases', icon: 'bullhorn' },
    ]},
    { label: 'Contact Us', url: '/contact' },
    { label: 'Job Portal', url: '/jobs' },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);
    const { data: settingsRes } = useApi(getSiteSettings);

    const s: Partial<SiteSettings> = settingsRes?.data || {};
    const nav = s.mainNavigation?.length ? s.mainNavigation : fallbackNav;
    const socialLinks = s.socialLinks || [];
    const logoUrl = s.logo ? getMediaUrl(s.logo) : '/images/logo.png';

    return (
        <header className="header-wrapper">
            <div className="header-top-bar">
                <div className="container">
                    <div className="header-top-content">
                        <a href="/" className="header-brand">
                            <img src={logoUrl} alt="MoH Logo" className="header-logo" onError={(e) => e.currentTarget.style.display = 'none'} />
                            <div className="header-brand-text">
                                <span className="header-brand-name">{s.ministryName || 'MINISTRY OF HEALTH'}</span>
                                <span className="header-brand-subtitle">{s.ministryTagline || 'SIERRA LEONE'}</span>
                            </div>
                        </a>

                        <div className="header-contact-info">
                            <div className="header-contact-item">
                                <i className="fas fa-map-marker-alt"></i>
                                <span>{s.contactAddress || '4th & 5th Floor, Youyi Building, Freetown'}</span>
                            </div>
                            <div className="header-contact-item">
                                <i className="fas fa-envelope"></i>
                                <span>{s.contactEmail || 'info@mohs.gov.sl'}</span>
                            </div>
                            <div className="header-contact-item">
                                <i className="fas fa-phone"></i>
                                <span>{s.contactPhone || '+232 76 460 440'}</span>
                            </div>
                        </div>

                        <div className="header-social-icons">
                            {socialLinks.length > 0 ? socialLinks.map((link) => (
                                <a key={link.id} href={link.url} aria-label={link.platform} target="_blank" rel="noopener noreferrer">
                                    <i className={`fab fa-${link.icon}`}></i>
                                </a>
                            )) : (
                                <>
                                    <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                                    <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                                    <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                                    <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                                    <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                                </>
                            )}
                        </div>

                        <div className="language-switcher">
                            <button className="lang-btn" onClick={() => setLangDropdownOpen(!langDropdownOpen)}>
                                <i className="fas fa-globe"></i>
                                <span>EN</span>
                                <i className="fas fa-chevron-down"></i>
                            </button>
                            {langDropdownOpen && (
                                <div className="lang-dropdown">
                                    <a href="#" className="lang-option active" data-lang="en"><span className="lang-flag">🇬🇧</span><span>English</span></a>
                                    <a href="#" className="lang-option" data-lang="fr"><span className="lang-flag">🇫🇷</span><span>Français</span></a>
                                    <a href="#" className="lang-option" data-lang="ar"><span className="lang-flag">🇸🇦</span><span>العربية</span></a>
                                    <a href="#" className="lang-option" data-lang="kr"><span className="lang-flag">🇸🇱</span><span>Krio</span></a>
                                </div>
                            )}
                        </div>

                        <button
                            className="navbar-toggle topbar-toggle"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle navigation"
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </div>

            <nav className="header-nav">
                <div className="container">
                    <div className="header-nav-content">
                        <ul className={`nav-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                            {nav.map((item, idx) => {
                                const hasChildren = item.children && item.children.length > 0;
                                const isMega = item.children && item.children.length > 4;

                                return (
                                    <li key={idx} className={`nav-menu-item ${hasChildren ? 'has-dropdown' : ''} ${isMega ? 'has-mega' : ''}`}>
                                        <a href={item.url} className="nav-menu-link">
                                            {item.label} {hasChildren && <i className="fas fa-caret-down"></i>}
                                        </a>
                                        {hasChildren && (
                                            <div className={`dropdown-menu ${isMega ? 'dropdown-mega' : 'dropdown-standard'}`}>
                                                <div className={isMega ? 'mega-grid' : 'dropdown-content'}>
                                                    {item.children!.map((child, ci) => (
                                                        <a key={ci} href={child.url} className="dropdown-item">
                                                            {child.icon && <i className={`fas fa-${child.icon}`}></i>}
                                                            <span>{child.label}</span>
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>

                    </div>
                </div>
            </nav>
        </header>
    );
}
