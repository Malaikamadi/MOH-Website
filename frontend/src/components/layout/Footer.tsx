import { useApi } from '../../hooks/useApi';
import { getSiteSettings, getMediaUrl } from '../../services/api';

// Platform icon mapping
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

// Fallback data
const fallbackQuickLinks = [
    { label: 'About Us', url: '/about' },
    { label: 'Our Services', url: '/services' },
    { label: 'Newsroom', url: '/newsroom' },
    { label: 'Publications', url: '/publications' },
    { label: 'Careers', url: '/jobs' },
];

const fallbackServiceLinks = [
    { label: 'Hospital Services', url: '#' },
    { label: 'Emergency Services', url: '#' },
    { label: 'Maternal Health', url: '#' },
    { label: 'Child Health', url: '#' },
    { label: 'Disease Prevention', url: '#' },
];

const fallbackContacts = [
    { type: 'address', icon: 'fas fa-map-marker-alt', value: '4th & 5th Floors, Youyi Building\nFreetown, Sierra Leone' },
    { type: 'phone', icon: 'fas fa-phone', value: '+232 76 460 440' },
    { type: 'email', icon: 'fas fa-envelope', value: 'info@mohs.gov.sl' },
];

const fallbackSocials = [
    { platform: 'facebook', url: '#' },
    { platform: 'twitter', url: '#' },
    { platform: 'youtube', url: '#' },
    { platform: 'instagram', url: '#' },
    { platform: 'linkedin', url: '#' },
];

export default function Footer() {
    const { data: siteData } = useApi(getSiteSettings);

    // Extract site settings with fallbacks
    const site = siteData?.data;
    const siteName = site?.siteName || 'Ministry of Health';
    const logoWhiteUrl = site?.logoWhite ? getMediaUrl(site.logoWhite) : '/images/logo-white.png';
    const aboutText = site?.footerAboutText || 'The Ministry of Health is committed to ensuring accessible, equitable, and affordable healthcare for all Sierra Leoneans through efficient service delivery and strong health systems.';
    const copyrightText = site?.copyrightText || '© 2026 Ministry of Health, Sierra Leone. All rights reserved.';
    const privacyUrl = site?.privacyPolicyUrl || '#';
    const termsUrl = site?.termsOfUseUrl || '#';
    const accessibilityUrl = site?.accessibilityUrl || '#';

    // Links from backend or fallback
    const quickLinks = site?.footerQuickLinks && site.footerQuickLinks.length > 0
        ? site.footerQuickLinks.sort((a, b) => (a.order || 0) - (b.order || 0))
        : fallbackQuickLinks;

    const serviceLinks = site?.footerServiceLinks && site.footerServiceLinks.length > 0
        ? site.footerServiceLinks.sort((a, b) => (a.order || 0) - (b.order || 0))
        : fallbackServiceLinks;

    // Contact info from backend or fallback
    const contacts = site?.contactInfo && site.contactInfo.length > 0
        ? site.contactInfo.map(c => ({
            type: c.type,
            icon: c.icon ? `fas fa-${c.icon}` : contactTypeIcons[c.type] || 'fas fa-info-circle',
            value: c.value,
        }))
        : fallbackContacts;

    // Social links from backend or fallback
    const socials = site?.socialLinks && site.socialLinks.length > 0
        ? site.socialLinks.filter(s => s.isActive)
        : fallbackSocials;

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-about">
                        <div className="footer-brand">
                            <img
                                src={logoWhiteUrl}
                                alt={`${siteName} Logo`}
                                onError={(e) => e.currentTarget.style.display = 'none'}
                            />
                            <span className="footer-brand-name">{siteName}</span>
                        </div>
                        <p>{aboutText}</p>
                        <div className="footer-social">
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
                    </div>

                    <div>
                        <h4 className="footer-title">Quick Links</h4>
                        <ul className="footer-links">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.url}
                                        target={('openInNewTab' in link && link.openInNewTab) ? '_blank' : undefined}
                                        rel={('openInNewTab' in link && link.openInNewTab) ? 'noopener noreferrer' : undefined}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="footer-title">Health Services</h4>
                        <ul className="footer-links">
                            {serviceLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.url}
                                        target={('openInNewTab' in link && link.openInNewTab) ? '_blank' : undefined}
                                        rel={('openInNewTab' in link && link.openInNewTab) ? 'noopener noreferrer' : undefined}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="footer-title">Contact Us</h4>
                        {contacts.map((contact, index) => (
                            <div key={index} className="footer-contact-item">
                                <i className={contact.icon}></i>
                                <div>
                                    <p>{contact.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>{copyrightText}</p>
                    <div className="footer-bottom-links">
                        <a href={privacyUrl}>Privacy Policy</a>
                        <a href={termsUrl}>Terms of Use</a>
                        <a href={accessibilityUrl}>Accessibility</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
