const services = [
    {
        icon: 'hospital',
        title: 'Hospital Services',
        description: 'Access quality care at government hospitals and health centers across all 16 districts.',
        link: '#'
    },
    {
        icon: 'ambulance',
        title: 'Emergency Response',
        description: '24/7 National Emergency Medical Service (NEMS) providing ambulance and emergency care.',
        link: '#'
    },
    {
        icon: 'user-md',
        title: 'Medical Licensing',
        description: 'Registration and licensing for healthcare professionals and medical facilities.',
        link: '#'
    },
    {
        icon: 'heartbeat',
        title: 'Health Programs',
        description: 'Maternal health, child immunization, disease prevention and community health initiatives.',
        link: '#'
    }
];

export default function ServicesSection() {
    return (
        <section className="services section">
            <div className="container">
                <div className="section-header">
                    <h2>Our Key Services</h2>
                    <p>Comprehensive healthcare services designed to meet the needs of every Sierra Leonean citizen</p>
                </div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <div key={index} className="service-card">
                            <div className="service-icon">
                                <i className={`fas fa-${service.icon}`}></i>
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <a href={service.link} className="service-link">
                                Learn More <i className="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
