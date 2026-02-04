export default function Footer() {
    return (
        <footer className="main-footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-column">
                        <div className="footer-brand">
                            <img src="/images/logo.png" alt="MoH Logo" className="footer-logo" onError={(e) => e.currentTarget.style.display = 'none'} />
                            <h3>Ministry of Health</h3>
                            <p>Sierra Leone</p>
                        </div>
                        <p className="footer-description">
                            Providing accessible, equitable and affordable healthcare for all Sierra Leoneans.
                        </p>
                        <div className="footer-social">
                            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                            <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                        </div>
                    </div>

                    <div className="footer-column">
                        <h4>Quick Links</h4>
                        <ul className="footer-links">
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/directorates">Directorates</a></li>
                            <li><a href="/services">Services</a></li>
                            <li><a href="/contact">Contact Us</a></li>
                            <li><a href="/jobs">Job Portal</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>Resources</h4>
                        <ul className="footer-links">
                            <li><a href="/publications">Publications</a></li>
                            <li><a href="/reports">Reports</a></li>
                            <li><a href="/policy-documents">Policy Documents</a></li>
                            <li><a href="/manuals-guidelines">Manuals & Guidelines</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>Contact Info</h4>
                        <div className="footer-contact">
                            <p><i className="fas fa-map-marker-alt"></i> 4th & 5th Floor, Youyi Building, Freetown</p>
                            <p><i className="fas fa-envelope"></i> info@mohs.gov.sl</p>
                            <p><i className="fas fa-phone"></i> +232 76 460 440</p>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2026 Ministry of Health, Sierra Leone. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
