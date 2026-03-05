import { useApi } from '../../hooks/useApi';
import { getKeyServices, getHomepageSettings } from '../../services/api';

// Static fallback services
const fallbackServices = [
    {
        icon: 'hospital',
        title: 'Hospital Services',
        description: 'Access quality care at government hospitals and health centers across all 16 districts.',
        link: '#',
        linkText: 'Learn More',
        color: '',
    },
    {
        icon: 'ambulance',
        title: 'Emergency Response',
        description: '24/7 National Emergency Medical Service (NEMS) providing ambulance and emergency care.',
        link: '#',
        linkText: 'Learn More',
        color: '',
    },
    {
        icon: 'user-md',
        title: 'Medical Licensing',
        description: 'Registration and licensing for healthcare professionals and medical facilities.',
        link: '#',
        linkText: 'Learn More',
        color: '',
    },
    {
        icon: 'heartbeat',
        title: 'Health Programs',
        description: 'Maternal health, child immunization, disease prevention and community health initiatives.',
        link: '#',
        linkText: 'Learn More',
        color: '',
    }
];

export default function ServicesSection() {
    const { data: servicesData } = useApi(getKeyServices);
    const { data: homepageData } = useApi(getHomepageSettings);

    // Check if section should be visible
    const showSection = homepageData?.data?.showServicesSection !== false;
    if (!showSection) return null;

    // Get section header from backend or use defaults
    const sectionHeader = homepageData?.data?.servicesHeader;
    const sectionTitle = sectionHeader?.title || 'Our Key Services';
    const sectionSubtitle = sectionHeader?.subtitle || 'Comprehensive healthcare services designed to meet the needs of every Sierra Leonean citizen';

    // Use API data or fallback
    const services = (() => {
        if (servicesData?.data && servicesData.data.length > 0) {
            return servicesData.data.map((item) => ({
                icon: item.icon || 'heartbeat',
                title: item.title,
                description: item.description,
                link: item.link || '#',
                linkText: item.linkText || 'Learn More',
                color: item.color || '',
            }));
        }
        return fallbackServices;
    })();

    return (
        <section className="services section">
            <div className="container">
                <div className="section-header">
                    <h2>{sectionTitle}</h2>
                    <p>{sectionSubtitle}</p>
                </div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="service-card"
                            style={service.color ? { '--service-accent': service.color } as React.CSSProperties : undefined}
                        >
                            <div className="service-icon">
                                <i className={`fas fa-${service.icon}`}></i>
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <a href={service.link} className="service-link">
                                {service.linkText} <i className="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
