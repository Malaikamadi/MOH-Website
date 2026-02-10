import { useState } from 'react';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);

    return (
        <header className="header-wrapper">
            {/* Header Top Bar */}
            <div className="header-top-bar">
                <div className="container">
                    <div className="header-top-content">
                        {/* Logo and Ministry Name */}
                        <a href="/" className="header-brand">
                            <img src="/images/logo.png" alt="MoH Logo" className="header-logo" onError={(e) => e.currentTarget.style.display = 'none'} />
                            <div className="header-brand-text">
                                <span className="header-brand-name">MINISTRY OF HEALTH</span>
                                <span className="header-brand-subtitle">SIERRA LEONE</span>
                            </div>
                        </a>

                        {/* Contact Info */}
                        <div className="header-contact-info">
                            <div className="header-contact-item">
                                <i className="fas fa-map-marker-alt"></i>
                                <span>4th & 5th Floor, Youyi Building, Freetown</span>
                            </div>
                            <div className="header-contact-item">
                                <i className="fas fa-envelope"></i>
                                <span>info@mohs.gov.sl</span>
                            </div>
                            <div className="header-contact-item">
                                <i className="fas fa-phone"></i>
                                <span>+232 76 460 440</span>
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="header-social-icons">
                            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                            <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
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
