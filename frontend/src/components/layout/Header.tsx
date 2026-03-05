import { useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { getSiteSettings, getMediaUrl } from '../../services/api';

// Platform icon mapping for social links
const platformIcons: Record<string, string> = {
    facebook: 'fab fa-facebook-f',
    twitter: 'fab fa-twitter',
    instagram: 'fab fa-instagram',
    linkedin: 'fab fa-linkedin-in',
    youtube: 'fab fa-youtube',
    tiktok: 'fab fa-tiktok',
    whatsapp: 'fab fa-whatsapp',
    telegram: 'fab fa-telegram-plane',
};

// Contact type icon mapping
const contactTypeIcons: Record<string, string> = {
    address: 'fas fa-map-marker-alt',
    email: 'fas fa-envelope',
    phone: 'fas fa-phone',
    fax: 'fas fa-fax',
    website: 'fas fa-globe',
};

// Fallback contact info
const fallbackContacts = [
    { icon: 'fas fa-map-marker-alt', value: '4th & 5th Floor, Youyi Building, Freetown' },
    { icon: 'fas fa-envelope', value: 'info@mohs.gov.sl' },
    { icon: 'fas fa-phone', value: '+232 76 460 440' },
];

// Fallback social links
const fallbackSocials = [
    { platform: 'facebook', url: '#' },
    { platform: 'twitter', url: '#' },
    { platform: 'instagram', url: '#' },
    { platform: 'linkedin', url: '#' },
    { platform: 'youtube', url: '#' },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);
    const { data: siteData } = useApi(getSiteSettings);

    // Extract site settings with fallbacks
    const site = siteData?.data;
    const siteName = site?.siteName || 'MINISTRY OF HEALTH';
    const siteTagline = site?.siteTagline || 'SIERRA LEONE';
    const logoUrl = site?.logo ? getMediaUrl(site.logo) : '/images/logo.png';

    // Contact info from backend or fallback
    const contacts = site?.contactInfo && site.contactInfo.length > 0
        ? site.contactInfo.map(c => ({
            icon: c.icon ? `fas fa-${c.icon}` : contactTypeIcons[c.type] || 'fas fa-info-circle',
            value: c.value,
        }))
        : fallbackContacts;

    // Social links from backend or fallback
    const socials = site?.socialLinks && site.socialLinks.length > 0
        ? site.socialLinks.filter(s => s.isActive)
        : fallbackSocials;

    return (
        <header className="header-wrapper">
            {/* Header Top Bar */}
            <div className="header-top-bar">
                <div className="container">
                    <div className="header-top-content">
                        {/* Logo and Ministry Name */}
                        <a href="/" className="header-brand">
                            <img
                                src={logoUrl}
                                alt={`${siteName} Logo`}
                                className="header-logo"
                                onError={(e) => e.currentTarget.style.display = 'none'}
                            />
                            <div className="header-brand-text">
                                <span className="header-brand-name">{siteName}</span>
                                <span className="header-brand-subtitle">{siteTagline}</span>
                            </div>
                        </a>

                        {/* Contact Info — driven by Strapi */}
                        <div className="header-contact-info">
                            {contacts.map((contact, index) => (
                                <div key={index} className="header-contact-item">
                                    <i className={contact.icon}></i>
                                    <span>{contact.value}</span>
                                </div>
                            ))}
                        </div>

                        {/* Social Icons — driven by Strapi */}
                        <div className="header-social-icons">
                            {socials.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    aria-label={social.platform}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className={platformIcons[social.platform] || 'fas fa-link'}></i>
                                </a>
                            ))}
                        </div>

                        {/* Language Switcher */}
                        <div className="language-switcher">
                            <button
                                className="lang-btn"
                                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                            >
                                <i className="fas fa-globe"></i>
                                <span>EN</span>
                                <i className="fas fa-chevron-down"></i>
                            </button>
                            {langDropdownOpen && (
                                <div className="lang-dropdown">
                                    <a href="#" className="lang-option active" data-lang="en">
                                        <span className="lang-flag">🇬🇧</span>
                                        <span>English</span>
                                    </a>
                                    <a href="#" className="lang-option" data-lang="fr">
                                        <span className="lang-flag">🇫🇷</span>
                                        <span>Français</span>
                                    </a>
                                    <a href="#" className="lang-option" data-lang="ar">
                                        <span className="lang-flag">🇸🇦</span>
                                        <span>العربية</span>
                                    </a>
                                    <a href="#" className="lang-option" data-lang="kr">
                                        <span className="lang-flag">🇸🇱</span>
                                        <span>Krio</span>
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Bar */}
            <nav className="header-nav">
                <div className="container">
                    <div className="header-nav-content">
                        <ul className={`nav-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                            <li className="nav-menu-item">
                                <a href="/" className="nav-menu-link active">Home</a>
                            </li>

                            <li className="nav-menu-item has-dropdown">
                                <a href="/about" className="nav-menu-link">
                                    About MOH <i className="fas fa-caret-down"></i>
                                </a>
                                <div className="dropdown-menu dropdown-standard">
                                    <div className="dropdown-content">
                                        <a href="/about" className="dropdown-item">
                                            <i className="fas fa-landmark"></i>
                                            <span>Our History</span>
                                        </a>
                                        <a href="/about#leadership" className="dropdown-item">
                                            <i className="fas fa-users-cog"></i>
                                            <span>Leadership</span>
                                        </a>
                                        <a href="/about#mission" className="dropdown-item">
                                            <i className="fas fa-bullseye"></i>
                                            <span>Mission & Vision</span>
                                        </a>
                                    </div>
                                </div>
                            </li>

                            <li className="nav-menu-item has-dropdown">
                                <a href="/directorates" className="nav-menu-link">
                                    Directorates <i className="fas fa-caret-down"></i>
                                </a>
                                <div className="dropdown-menu dropdown-wide">
                                    <div className="dropdown-columns">
                                        <div className="dropdown-column">
                                            <a href="/directorates/dppi" className="dropdown-item">
                                                <i className="fas fa-chart-line"></i>
                                                <span>DPPI</span>
                                            </a>
                                            <a href="/directorates/phc" className="dropdown-item">
                                                <i className="fas fa-heartbeat"></i>
                                                <span>Primary Health Care</span>
                                            </a>
                                            <a href="/directorates/rch" className="dropdown-item">
                                                <i className="fas fa-baby"></i>
                                                <span>Reproductive & Child Health</span>
                                            </a>
                                        </div>
                                        <div className="dropdown-column">
                                            <a href="/directorates/dpc" className="dropdown-item">
                                                <i className="fas fa-virus-slash"></i>
                                                <span>Disease Prevention</span>
                                            </a>
                                            <a href="#" className="dropdown-item">
                                                <i className="fas fa-shield-virus"></i>
                                                <span>DHSE</span>
                                            </a>
                                            <a href="/directorates/nems" className="dropdown-item">
                                                <i className="fas fa-ambulance"></i>
                                                <span>Emergency Medical Services</span>
                                            </a>
                                            <a href="/directorates/ss" className="dropdown-item">
                                                <i className="fas fa-cogs"></i>
                                                <span>Support Services</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li className="nav-menu-item has-dropdown">
                                <a href="#" className="nav-menu-link">
                                    Emergency <i className="fas fa-caret-down"></i>
                                </a>
                                <div className="dropdown-menu dropdown-standard">
                                    <div className="dropdown-content">
                                        <a href="#" className="dropdown-item">
                                            <i className="fas fa-ambulance"></i>
                                            <span>Emergency Response</span>
                                        </a>
                                        <a href="#" className="dropdown-item">
                                            <i className="fas fa-phone-alt"></i>
                                            <span>Emergency Hotlines</span>
                                        </a>
                                    </div>
                                </div>
                            </li>

                            <li className="nav-menu-item has-dropdown">
                                <a href="/media" className="nav-menu-link">
                                    Media <i className="fas fa-caret-down"></i>
                                </a>
                                <div className="dropdown-menu dropdown-standard">
                                    <div className="dropdown-content">
                                        <a href="/newsroom" className="dropdown-item">
                                            <i className="fas fa-rss"></i>
                                            <span>Newsroom</span>
                                        </a>
                                        <a href="/events" className="dropdown-item">
                                            <i className="fas fa-calendar-alt"></i>
                                            <span>Events</span>
                                        </a>
                                        <a href="/press-releases" className="dropdown-item">
                                            <i className="fas fa-bullhorn"></i>
                                            <span>Press Releases</span>
                                        </a>
                                    </div>
                                </div>
                            </li>

                            <li className="nav-menu-item">
                                <a href="/contact" className="nav-menu-link">Contact Us</a>
                            </li>

                            <li className="nav-menu-item">
                                <a href="/jobs" className="nav-menu-link">Job Portal</a>
                            </li>
                        </ul>

                        <button
                            className="navbar-toggle"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle navigation"
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}
