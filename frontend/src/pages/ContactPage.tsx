import { useState, FormEvent } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const departments = [
    { icon: 'user-md', name: 'Primary Health Care', desc: 'Community health services, health centers, and preventive care programs across Sierra Leone.', email: 'phc@mohs.gov.sl', phone: '+232 76 460 441' },
    { icon: 'hospital', name: 'Hospital Services', desc: 'Government hospitals, specialist referral services, and inpatient care management.', email: 'hospitals@mohs.gov.sl', phone: '+232 76 460 442' },
    { icon: 'shield-virus', name: 'Disease Prevention', desc: 'Surveillance, outbreak response, immunization programs, and epidemic preparedness.', email: 'dpc@mohs.gov.sl', phone: '+232 76 460 443' },
    { icon: 'baby', name: 'Reproductive Health', desc: 'Maternal health, family planning, newborn care, and reproductive health services.', email: 'rh@mohs.gov.sl', phone: '+232 76 460 444' },
    { icon: 'bullhorn', name: 'Media & Communications', desc: 'Public health campaigns, media relations, press releases, and public awareness.', email: 'media@mohs.gov.sl', phone: '+232 76 460 445' },
    { icon: 'briefcase', name: 'Human Resources', desc: 'Recruitment, workforce development, training programs, and career opportunities.', email: 'hr@mohs.gov.sl', phone: '+232 76 460 446' },
];

const subjectOptions = [
    'General Inquiry',
    'Health Services',
    'Feedback',
    'Complaint',
    'Partnership Inquiry',
    'Media & Press',
    'Careers',
    'Other',
];

export default function ContactPage() {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            setSubmitted(true);
            setForm({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' });
            setTimeout(() => setSubmitted(false), 4000);
        }, 1500);
    };

    return (
        <>
            <Header />
            <main>
                {/* Contact Hero */}
                <section className="ct-hero">
                    <div className="container">
                        <div className="ct-hero-content">
                            <div className="ct-hero-text">
                                <div className="ct-hero-badge">
                                    <i className="fas fa-headset"></i>
                                    <span>We're Here To Help</span>
                                </div>
                                <h1>Get In <span>Touch</span> With Us</h1>
                                <p>Have questions about our health services, programs, or policies? We're here to assist you. Reach out to us through any of our communication channels.</p>
                                <div className="ct-quick-info">
                                    <div className="ct-quick-info-item">
                                        <i className="fas fa-clock"></i>
                                        <div>
                                            <span>Business Hours</span>
                                            <strong>Monday - Friday: 8:00 AM - 5:00 PM</strong>
                                        </div>
                                    </div>
                                    <div className="ct-quick-info-item">
                                        <i className="fas fa-phone-volume"></i>
                                        <div>
                                            <span>Response Time</span>
                                            <strong>Within 24-48 hours</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ct-hero-visual">
                                <div className="ct-hero-cards">
                                    <div className="ct-hero-card">
                                        <i className="fas fa-phone-alt"></i>
                                        <h4>Call Us</h4>
                                        <p>+232 76 460 440</p>
                                    </div>
                                    <div className="ct-hero-card">
                                        <i className="fas fa-envelope"></i>
                                        <h4>Email Us</h4>
                                        <p>info@mohs.gov.sl</p>
                                    </div>
                                    <div className="ct-hero-card">
                                        <i className="fas fa-map-marker-alt"></i>
                                        <h4>Visit Us</h4>
                                        <p>Youyi Building, Freetown</p>
                                    </div>
                                    <div className="ct-hero-card">
                                        <i className="fas fa-clock"></i>
                                        <h4>Office Hours</h4>
                                        <p>Mon-Fri: 8AM - 5PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Main */}
                <section className="ct-main">
                    <div className="container">
                        <div className="ct-section-header">
                            <span className="ct-section-badge">Contact Form</span>
                            <h2>Send Us a Message</h2>
                            <p>Fill out the form below and we'll get back to you as soon as possible.</p>
                        </div>
                        <div className="ct-grid">
                            <div className="ct-form-wrapper">
                                <form className="ct-form" onSubmit={handleSubmit}>
                                    <div className="ct-form-row">
                                        <div className="ct-form-group">
                                            <label htmlFor="ct-firstName">First Name</label>
                                            <input type="text" id="ct-firstName" name="firstName" value={form.firstName} onChange={handleChange} placeholder="Enter your first name" required />
                                        </div>
                                        <div className="ct-form-group">
                                            <label htmlFor="ct-lastName">Last Name</label>
                                            <input type="text" id="ct-lastName" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Enter your last name" required />
                                        </div>
                                    </div>
                                    <div className="ct-form-row">
                                        <div className="ct-form-group">
                                            <label htmlFor="ct-email">Email Address</label>
                                            <input type="email" id="ct-email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" required />
                                        </div>
                                        <div className="ct-form-group">
                                            <label htmlFor="ct-phone">Phone Number</label>
                                            <input type="tel" id="ct-phone" name="phone" value={form.phone} onChange={handleChange} placeholder="Enter your phone number" />
                                        </div>
                                    </div>
                                    <div className="ct-form-group">
                                        <label htmlFor="ct-subject">Subject</label>
                                        <select id="ct-subject" name="subject" value={form.subject} onChange={handleChange} required>
                                            <option value="">Select a subject</option>
                                            {subjectOptions.map(opt => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="ct-form-group">
                                        <label htmlFor="ct-message">Message</label>
                                        <textarea id="ct-message" name="message" value={form.message} onChange={handleChange} placeholder="Write your message here..." rows={6} required></textarea>
                                    </div>
                                    <button type="submit" className="ct-submit-btn" disabled={submitting}>
                                        {submitting ? (
                                            <><i className="fas fa-spinner fa-spin"></i> Sending...</>
                                        ) : submitted ? (
                                            <><i className="fas fa-check-circle"></i> Message Sent!</>
                                        ) : (
                                            <><i className="fas fa-paper-plane"></i> Send Message</>
                                        )}
                                    </button>
                                    {submitted && (
                                        <div className="ct-success-msg">
                                            <i className="fas fa-check-circle"></i>
                                            <span>Thank you! Your message has been sent successfully. We'll get back to you within 24-48 hours.</span>
                                        </div>
                                    )}
                                </form>
                            </div>
                            <div className="ct-info-section">
                                <div className="ct-map-container">
                                    <iframe
                                        title="Ministry of Health Location"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.6431088168095!2d-13.232879!3d8.4656729!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xf04c2a09c7d8a4f%3A0x21a75e1b04f5e1b4!2sYouyi%20Building!5e0!3m2!1sen!2ssl!4v1704931200000!5m2!1sen!2ssl"
                                        width="100%"
                                        height="280"
                                        style={{ border: 0, borderRadius: '12px' }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </div>
                                <div className="ct-location-cards">
                                    <div className="ct-location-card">
                                        <i className="fas fa-building"></i>
                                        <div>
                                            <h4>Head Office</h4>
                                            <p>Youyi Building, 4th Floor, Brookfields, Freetown, Sierra Leone</p>
                                        </div>
                                    </div>
                                    <div className="ct-location-card">
                                        <i className="fas fa-directions"></i>
                                        <div>
                                            <h4>How to Find Us</h4>
                                            <p>Located near Congo Cross, along Jomo Kenyatta Road</p>
                                        </div>
                                    </div>
                                    <div className="ct-location-card">
                                        <i className="fas fa-clock"></i>
                                        <div>
                                            <h4>Office Hours</h4>
                                            <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                                        </div>
                                    </div>
                                    <div className="ct-location-card">
                                        <i className="fas fa-car"></i>
                                        <div>
                                            <h4>Parking</h4>
                                            <p>Free visitor parking available at the main entrance</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Departments Section */}
                <section className="ct-departments">
                    <div className="container">
                        <div className="ct-section-header">
                            <span className="ct-section-badge">Departments</span>
                            <h2>Contact Our Departments</h2>
                            <p>Reach out directly to the department that can best assist you with your inquiry.</p>
                        </div>
                        <div className="ct-dept-grid">
                            {departments.map((dept) => (
                                <div className="ct-dept-card" key={dept.email}>
                                    <div className="ct-dept-icon">
                                        <i className={`fas fa-${dept.icon}`}></i>
                                    </div>
                                    <h3>{dept.name}</h3>
                                    <p>{dept.desc}</p>
                                    <div className="ct-dept-contact">
                                        <a href={`mailto:${dept.email}`}>
                                            <i className="fas fa-envelope"></i> {dept.email}
                                        </a>
                                        <a href={`tel:${dept.phone.replace(/\s/g, '')}`}>
                                            <i className="fas fa-phone-alt"></i> {dept.phone}
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Social Connect */}
                <section className="ct-social">
                    <div className="container">
                        <h2>Connect With Us On Social Media</h2>
                        <p>Follow us for the latest health updates, news, and announcements.</p>
                        <div className="ct-social-links">
                            <a href="#" className="ct-social-link" aria-label="Facebook">
                                <i className="fab fa-facebook-f"></i>
                                <span>Facebook</span>
                            </a>
                            <a href="#" className="ct-social-link" aria-label="Twitter">
                                <i className="fab fa-twitter"></i>
                                <span>Twitter</span>
                            </a>
                            <a href="#" className="ct-social-link" aria-label="Instagram">
                                <i className="fab fa-instagram"></i>
                                <span>Instagram</span>
                            </a>
                            <a href="#" className="ct-social-link" aria-label="LinkedIn">
                                <i className="fab fa-linkedin-in"></i>
                                <span>LinkedIn</span>
                            </a>
                            <a href="#" className="ct-social-link" aria-label="YouTube">
                                <i className="fab fa-youtube"></i>
                                <span>YouTube</span>
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
