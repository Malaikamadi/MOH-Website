import { useApi } from '../../hooks/useApi';
import { getSiteSettings, getMediaUrl } from '../../services/api';

export default function Footer() {
    const { data: settingsRes } = useApi(getSiteSettings);
    const s = settingsRes?.data;

    const logoWhiteUrl = s?.logoWhite ? getMediaUrl(s.logoWhite) : '/images/logo-white.png';
    const socialLinks = s?.socialLinks || [];
    const quickLinks = s?.footerQuickLinks || [
        { id: 1, label: 'About Us', url: '/about' },
        { id: 2, label: 'Our Services', url: '/services' },
        { id: 3, label: 'Newsroom', url: '/newsroom' },
        { id: 4, label: 'Publications', url: '/publications' },
        { id: 5, label: 'Careers', url: '/jobs' },
    ];
    const serviceLinks = s?.footerServiceLinks || [
        { id: 1, label: 'Hospital Services', url: '#' },
        { id: 2, label: 'Emergency Services', url: '#' },
        { id: 3, label: 'Maternal Health', url: '#' },
        { id: 4, label: 'Child Health', url: '#' },
        { id: 5, label: 'Disease Prevention', url: '#' },
    ];
    const legalLinks = s?.legalLinks || [
        { id: 1, label: 'Privacy Policy', url: '#' },
        { id: 2, label: 'Terms of Use', url: '#' },
        { id: 3, label: 'Accessibility', url: '#' },
    ];

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-about">
                        <div className="footer-brand">
                            <img src={logoWhiteUrl} alt="MOH Logo" onError={(e) => e.currentTarget.style.display = 'none'} />
                            <span className="footer-brand-name">{s?.ministryName || 'Ministry of Health'}</span>
                        </div>
                        <p>{s?.footerAboutText || 'The Ministry of Health is committed to ensuring accessible, equitable, and affordable healthcare for all Sierra Leoneans through efficient service delivery and strong health systems.'}</p>
                        <div className="footer-social">
                            {socialLinks.length > 0 ? socialLinks.map((link) => (
                                <a key={link.id} href={link.url} aria-label={link.platform} target="_blank" rel="noopener noreferrer">
                                    <i className={`fab fa-${link.icon}`}></i>
                                </a>
                            )) : (
                                <>
                                    <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                                    <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                                    <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                                    <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                                    <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                                </>
                            )}
                        </div>
                    </div>

                    <div>
                        <h4 className="footer-title">Quick Links</h4>
                        <ul className="footer-links">
                            {quickLinks.map((link) => (
                                <li key={link.id}><a href={link.url}>{link.label}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="footer-title">Health Services</h4>
                        <ul className="footer-links">
                            {serviceLinks.map((link) => (
                                <li key={link.id}><a href={link.url}>{link.label}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="footer-title">Contact Us</h4>
                        <div className="footer-contact-item">
                            <i className="fas fa-map-marker-alt"></i>
                            <div><p>{s?.contactAddress || '4th & 5th Floors, Youyi Building\nFreetown, Sierra Leone'}</p></div>
                        </div>
                        <div className="footer-contact-item">
                            <i className="fas fa-phone"></i>
                            <div><p>{s?.contactPhone || '+232 76 460 440'}</p></div>
                        </div>
                        <div className="footer-contact-item">
                            <i className="fas fa-envelope"></i>
                            <div><p>{s?.contactEmail || 'info@mohs.gov.sl'}</p></div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>{s?.copyrightText || '© 2026 Ministry of Health, Sierra Leone. All rights reserved.'}</p>
                    <div className="footer-bottom-links">
                        {legalLinks.map((link) => (
                            <a key={link.id} href={link.url}>{link.label}</a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
