import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const emergencyNumbers = [
    { icon: 'ambulance', color: 'red', name: 'National Ambulance Service', phone: '117', phoneLink: 'tel:117', available: 'Available 24/7' },
    { icon: 'shield-alt', color: 'blue', name: 'Police Emergency', phone: '999', phoneLink: 'tel:999', available: 'Available 24/7' },
    { icon: 'fire', color: 'orange', name: 'Fire Service', phone: '019', phoneLink: 'tel:019', available: 'Available 24/7' },
    { icon: 'hospital', color: 'green', name: 'Connaught Hospital', phone: '+232 22 222 500', phoneLink: 'tel:+23222222500', available: 'Emergency Room 24/7' },
    { icon: 'baby', color: 'purple', name: 'PCMH Maternity Emergencies', phone: '+232 22 223 456', phoneLink: 'tel:+23222223456', available: 'Available 24/7' },
    { icon: 'virus', color: 'red', name: 'Disease Outbreak Hotline', phone: '117', phoneLink: 'tel:117', available: 'Report outbreaks' },
];

const hospitals = [
    { icon: 'hospital', name: 'Connaught Hospital', location: 'Lightfoot Boston Street, Freetown', services: ['Emergency', 'Surgery', 'ICU', 'Trauma'], phone: 'tel:+23222222500', mapLink: 'https://maps.google.com/?q=8.4657,-13.2317' },
    { icon: 'baby', name: 'Princess Christian Maternity Hospital', location: 'Fourah Bay Road, Freetown', services: ['Maternity', 'Labor & Delivery', 'NICU'], phone: 'tel:+23222223456', mapLink: 'https://maps.google.com/?q=8.4723,-13.2343' },
    { icon: 'child', name: "Ola During Children's Hospital", location: 'Freetown', services: ['Pediatric Emergency', 'Pediatric ICU', 'Nutrition'], phone: 'tel:+23222224567', mapLink: 'https://maps.google.com/?q=8.4589,-13.2156' },
    { icon: 'hospital-alt', name: '34 Military Hospital', location: 'Wilkinson Road, Freetown', services: ['Emergency', 'Surgery', 'Orthopedics'], phone: 'tel:+23222225678', mapLink: 'https://maps.google.com/?q=8.4512,-13.2678' },
];

const firstAidTips = [
    { icon: 'heartbeat', title: 'CPR', desc: 'Push hard and fast in the center of the chest at 100-120 compressions per minute.' },
    { icon: 'tint', title: 'Bleeding', desc: 'Apply direct pressure with a clean cloth. Elevate the injured area if possible.' },
    { icon: 'burn', title: 'Burns', desc: 'Cool the burn under running water for at least 10 minutes. Do not use ice.' },
    { icon: 'lungs', title: 'Choking', desc: 'Perform back blows followed by abdominal thrusts (Heimlich maneuver).' },
];

export default function EmergencyPage() {
    return (
        <>
            <Header />
            <main>
                {/* Emergency Header */}
                <section className="emergency-header">
                    <div className="container">
                        <div className="emergency-header-content">
                            <div className="emergency-icon-circle">
                                <i className="fas fa-ambulance"></i>
                            </div>
                            <h1>Emergency Health Services</h1>
                            <p>Get immediate help during medical emergencies. Call our 24/7 hotline or find the nearest emergency facility.</p>
                            <div className="emergency-hotline">
                                <span className="hotline-label">National Emergency Hotline</span>
                                <a href="tel:117" className="hotline-number">
                                    <i className="fas fa-phone-alt"></i> 117
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quick Actions */}
                <section className="em-quick-actions">
                    <div className="container">
                        <div className="em-actions-grid">
                            <a href="tel:117" className="em-action-card">
                                <div className="em-action-icon ambulance"><i className="fas fa-ambulance"></i></div>
                                <h3>Call Ambulance</h3>
                                <p>Request emergency medical transport</p>
                            </a>
                            <a href="/find-facility" className="em-action-card">
                                <div className="em-action-icon hospital"><i className="fas fa-hospital"></i></div>
                                <h3>Find Hospital</h3>
                                <p>Locate nearest emergency room</p>
                            </a>
                            <a href="tel:+23299117117" className="em-action-card">
                                <div className="em-action-icon poison"><i className="fas fa-skull-crossbones"></i></div>
                                <h3>Poison Control</h3>
                                <p>Get help for poisoning cases</p>
                            </a>
                            <a href="tel:019" className="em-action-card">
                                <div className="em-action-icon fire"><i className="fas fa-fire-extinguisher"></i></div>
                                <h3>Fire Emergency</h3>
                                <p>Report fires, request rescue</p>
                            </a>
                        </div>
                    </div>
                </section>

                {/* Emergency Numbers */}
                <section className="em-numbers-section">
                    <div className="container">
                        <div className="section-header">
                            <h2>Emergency Contact Numbers</h2>
                            <p>Important numbers to save for emergencies</p>
                        </div>
                        <div className="em-numbers-grid">
                            {emergencyNumbers.map((item, i) => (
                                <div key={i} className="em-number-card">
                                    <div className={`em-number-icon ${item.color}`}><i className={`fas fa-${item.icon}`}></i></div>
                                    <div className="em-number-content">
                                        <h4>{item.name}</h4>
                                        <a href={item.phoneLink} className="em-phone"><i className="fas fa-phone"></i> {item.phone}</a>
                                        <span className="em-available"><i className="fas fa-circle"></i> {item.available}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Emergency Hospitals */}
                <section className="em-hospitals-section">
                    <div className="container">
                        <div className="section-header">
                            <h2>24/7 Emergency Hospitals</h2>
                            <p>Major hospitals with round-the-clock emergency services</p>
                        </div>
                        <div className="em-hospitals-grid">
                            {hospitals.map((h, i) => (
                                <div key={i} className="em-hospital-card">
                                    <div className="em-hospital-icon"><i className={`fas fa-${h.icon}`}></i></div>
                                    <div className="em-hospital-info">
                                        <h3>{h.name}</h3>
                                        <div className="em-location"><i className="fas fa-map-marker-alt"></i> {h.location}</div>
                                        <div className="em-hospital-services">
                                            {h.services.map((s, j) => <span key={j} className="em-service-tag">{s}</span>)}
                                        </div>
                                        <div className="em-hospital-actions">
                                            <a href={h.phone} className="em-hospital-btn call"><i className="fas fa-phone"></i> Call</a>
                                            <a href={h.mapLink} target="_blank" rel="noopener noreferrer" className="em-hospital-btn directions"><i className="fas fa-directions"></i> Directions</a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Emergency Steps */}
                <section className="em-steps-section">
                    <div className="container">
                        <div className="section-header">
                            <h2>What To Do In An Emergency</h2>
                            <p>Follow these steps to get help quickly</p>
                        </div>
                        <div className="em-steps-container">
                            {['Stay Calm', 'Call 117', 'Give First Aid', 'Wait for Help'].map((title, i) => (
                                <div key={i} className="em-step-item">
                                    <div className="em-step-number">{i + 1}</div>
                                    <h4>{title}</h4>
                                    <p>{[
                                        'Take a deep breath. Assess the situation and ensure your safety first.',
                                        'Dial the emergency number. Provide your location and describe the emergency.',
                                        'If trained, provide basic first aid while waiting for help to arrive.',
                                        'Stay with the patient. Follow instructions from the emergency dispatcher.',
                                    ][i]}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* First Aid Tips */}
                <section className="em-firstaid-section">
                    <div className="container">
                        <div className="section-header">
                            <h2>Basic First Aid Tips</h2>
                            <p>Know what to do while waiting for emergency services</p>
                        </div>
                        <div className="em-tips-grid">
                            {firstAidTips.map((tip, i) => (
                                <div key={i} className="em-tip-card">
                                    <div className="em-tip-icon"><i className={`fas fa-${tip.icon}`}></i></div>
                                    <h4>{tip.title}</h4>
                                    <p>{tip.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="em-cta-section">
                    <div className="container">
                        <div className="em-cta-content">
                            <h2>Need Immediate Medical Help?</h2>
                            <p>Don't wait — every second counts in an emergency</p>
                            <div className="em-cta-buttons">
                                <a href="tel:117" className="em-cta-btn primary"><i className="fas fa-phone-alt"></i> Call 117 Now</a>
                                <a href="/find-facility" className="em-cta-btn secondary"><i className="fas fa-hospital"></i> Find Nearest Hospital</a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
