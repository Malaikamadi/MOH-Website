import { useApi } from '../../hooks/useApi';
import { getAboutPage } from '../../services/api';

export default function MissionVision() {
    const { data: aboutRes } = useApi(getAboutPage);
    const a = aboutRes?.data;

    return (
        <section className="section mission-vision" id="mission">
            <div className="container">
                <div className="section-header">
                    <h2>Mission & Vision</h2>
                </div>
                <div className="mission-vision-grid">
                    <div className="mission-card">
                        <div className="mission-icon">
                            <i className="fas fa-bullseye"></i>
                        </div>
                        <h3>Our Mission</h3>
                        <p>{a?.missionText || 'To provide leadership and coordination for the health sector in Sierra Leone, ensuring the delivery of quality, accessible, and affordable healthcare services to all citizens through efficient management, regulation, and partnership with stakeholders.'}</p>
                    </div>
                    <div className="vision-card">
                        <div className="vision-icon">
                            <i className="fas fa-eye"></i>
                        </div>
                        <h3>Our Vision</h3>
                        <p>{a?.visionText || 'A healthy and productive Sierra Leone where every citizen has equitable access to quality healthcare services, enabling them to achieve their full potential and contribute to the socio-economic development of the nation.'}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
