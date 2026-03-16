import { useApi } from '../../hooks/useApi';
import { getAboutPage } from '../../services/api';

const fallbackValues = [
    { id: 1, icon: 'heart', title: 'Compassion', description: 'We treat every citizen with dignity, empathy, and respect in all our healthcare interactions.' },
    { id: 2, icon: 'shield-alt', title: 'Integrity', description: 'We uphold the highest ethical standards in healthcare delivery and resource management.' },
    { id: 3, icon: 'award', title: 'Excellence', description: 'We strive for continuous improvement in the quality of healthcare services we provide.' },
    { id: 4, icon: 'hands-helping', title: 'Collaboration', description: 'We work together with partners, communities, and stakeholders to achieve better health outcomes.' }
];

export default function CoreValues() {
    const { data: aboutRes } = useApi(getAboutPage);
    const values = aboutRes?.data?.coreValues?.length ? aboutRes.data.coreValues : fallbackValues;

    return (
        <section className="section core-values">
            <div className="container">
                <div className="section-header">
                    <h2>Our Core Values</h2>
                </div>
                <div className="values-grid">
                    {values.map((value) => (
                        <div key={value.id} className="value-card">
                            <div className="value-icon">
                                <i className={`fas fa-${value.icon}`}></i>
                            </div>
                            <h3>{value.title}</h3>
                            <p>{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
