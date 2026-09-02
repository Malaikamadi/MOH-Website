import { useState, useEffect, useRef } from 'react';
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
    { label: 'Agencies', url: '/agencies', children: [
        { label: 'NMSA', url: '/agencies/nmsa', icon: 'building' },
        { label: 'NPHA', url: '/agencies/npha', icon: 'hospital' },
        { label: 'NEMS', url: '/agencies/nems', icon: 'ambulance' },
        { label: 'Health Service Commission', url: '/agencies/hsc', icon: 'clipboard-check' },
        { label: 'Postgraduate College of Health Facilities', url: '/agencies/pchf', icon: 'graduation-cap' },
        { label: 'SL Nursing and Midwifery', url: '/agencies/sl-nursing-midwifery', icon: 'user-nurse' },
    ]},
    { label: 'Regulators', url: '/regulators', children: [
        { label: 'National Health Secretariat', url: '/regulators/nhs', icon: 'landmark' },
        { label: 'Pharmacy Board', url: '/regulators/pharmacy-board', icon: 'pills' },
        { label: 'Medical and Dental Council', url: '/regulators/mdc', icon: 'stethoscope' },
        { label: 'Allied Health Professional Council', url: '/regulators/ahpc', icon: 'users-cog' },
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
        { label: 'Videos', url: '/videos', icon: 'video' },
        { label: 'Events', url: '/events', icon: 'calendar-alt' },
        { label: 'Publications', url: '/publications', icon: 'file-alt' },
        { label: 'Press Releases', url: '/press-releases', icon: 'bullhorn' },
    ]},
    { label: 'Contact Us', url: '/contact' },
    { label: 'Job Portal', url: '/jobs' },
];

const REGULATOR_NAV_URLS = new Set([
    '/agencies/nhs',
    '/agencies/mdc',
    '/agencies/pharmacy-board',
    '/agencies/ahpc',
    '/regulators/nhs',
    '/regulators/mdc',
    '/regulators/pharmacy-board',
    '/regulators/ahpc',
]);

function withRegulatorsNav(items: NavItem[]): NavItem[] {
    const regulatorsItem = fallbackNav.find((item) => item.url === '/regulators');
    const nav = items.map((item) => {
        if (item.label === 'Agencies' || item.url === '/agencies') {
            return {
                ...item,
                children: (item.children || []).filter(
                    (child) => !REGULATOR_NAV_URLS.has(child.url)
                ),
            };
        }
        if ((item.label === 'Regulators' || item.url === '/regulators') && regulatorsItem) {
            return regulatorsItem;
        }
        return item;
    });

    const hasRegulators = nav.some(
        (item) => item.label === 'Regulators' || item.url === '/regulators'
    );
    if (!hasRegulators && regulatorsItem) {
        const agenciesIdx = nav.findIndex(
            (item) => item.label === 'Agencies' || item.url === '/agencies'
        );
        const insertAt = agenciesIdx >= 0 ? agenciesIdx + 1 : Math.min(3, nav.length);
        nav.splice(insertAt, 0, regulatorsItem);
    }

    return nav;
}

interface LangOption {
    code: string;
    label: string;
    flag: string;
}

const LANGUAGES: LangOption[] = [
    { code: 'en', label: 'English', flag: '\u{1F1EC}\u{1F1E7}' },
    { code: 'fr', label: 'Fran\u00e7ais', flag: '\u{1F1EB}\u{1F1F7}' },
    { code: 'ar', label: '\u0627\u0644\u0639\u0631\u0628\u064A\u0629', flag: '\u{1F1F8}\u{1F1E6}' },
    { code: 'kr', label: 'Krio', flag: '\u{1F1F8}\u{1F1F1}' },
];

function triggerGoogleTranslate(langCode: string) {
    const gtCombo = document.querySelector<HTMLSelectElement>('.goog-te-combo');
    if (gtCombo) {
        gtCombo.value = langCode === 'kr' ? 'en' : langCode;
        gtCombo.dispatchEvent(new Event('change'));
    }
}

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState('en');
    const langRef = useRef<HTMLDivElement>(null);
    const { data: settingsRes } = useApi(getSiteSettings);

    const s: Partial<SiteSettings> = settingsRes?.data || {};
    const nav = withRegulatorsNav(s.mainNavigation?.length ? s.mainNavigation : fallbackNav);
    const socialLinks = s.socialLinks || [];
    const logoUrl = s.logo ? getMediaUrl(s.logo) : '/images/logo.png';

    const currentMeta = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (langRef.current && !langRef.current.contains(e.target as Node)) {
                setLangDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    function handleLangChange(code: string) {
        setCurrentLang(code);
        setLangDropdownOpen(false);
        triggerGoogleTranslate(code);
    }

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

                        <div className={`language-switcher notranslate ${langDropdownOpen ? 'active' : ''}`} ref={langRef} translate="no">
                            <button className="lang-btn" onClick={() => setLangDropdownOpen(!langDropdownOpen)}>
                                <i className="fas fa-globe"></i>
                                <span>{currentMeta.code.toUpperCase()}</span>
                                <i className="fas fa-chevron-down"></i>
                            </button>
                            {langDropdownOpen && (
                                <div className="lang-dropdown">
                                    {LANGUAGES.map((l) => (
                                        <button
                                            key={l.code}
                                            className={`lang-option ${currentLang === l.code ? 'active' : ''}`}
                                            onClick={() => handleLangChange(l.code)}
                                        >
                                            <span className="lang-flag">{l.flag}</span>
                                            <span>{l.label}</span>
                                        </button>
                                    ))}
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
