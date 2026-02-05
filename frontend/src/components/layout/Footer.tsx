export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-about">
                        <div className="footer-brand">
                            <img src="/images/logo-white.png" alt="MOH Logo" onError={(e) => e.currentTarget.style.display = 'none'} />
                            <span className="footer-brand-name">Ministry of Health</span>
                        </div>
                        <p>
                            The Ministry of Health is committed to ensuring accessible, equitable, and affordable healthcare for all
                            Sierra Leoneans through efficient service delivery and strong health systems.
                        </p>
                        <div className="footer-social">
                            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                            <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="footer-title">Quick Links</h4>
                        <ul className="footer-links">
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/services">Our Services</a></li>
                            <li><a href="/newsroom">Newsroom</a></li>
                            <li><a href="/publications">Publications</a></li>
                            <li><a href="/jobs">Careers</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="footer-title">Health Services</h4>
                        <ul className="footer-links">
                            <li><a href="#">Hospital Services</a></li>
                            <li><a href="#">Emergency Services</a></li>
                            <li><a href="#">Maternal Health</a></li>
                            <li><a href="#">Child Health</a></li>
                            <li><a href="#">Disease Prevention</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="footer-title">Contact Us</h4>
                        <div className="footer-contact-item">
                            <i className="fas fa-map-marker-alt"></i>
                            <div>
                                <p>4th & 5th Floors, Youyi Building<br />Freetown, Sierra Leone</p>
                            </div>
                        </div>
                        <div className="footer-contact-item">
                            <i className="fas fa-phone"></i>
                            <div>
                                <p>+232 76 460 440</p>
                            </div>
                        </div>
                        <div className="footer-contact-item">
                            <i className="fas fa-envelope"></i>
                            <div>
                                <p>info@mohs.gov.sl</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2026 Ministry of Health, Sierra Leone. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Use</a>
                        <a href="#">Accessibility</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
