const values = [
    {
        icon: 'heart',
        title: 'Compassion',
        description: 'We treat every citizen with dignity, empathy, and respect in all our healthcare interactions.'
    },
    {
        icon: 'shield-alt',
        title: 'Integrity',
        description: 'We uphold the highest ethical standards in healthcare delivery and resource management.'
    },
    {
        icon: 'award',
        title: 'Excellence',
        description: 'We strive for continuous improvement in the quality of healthcare services we provide.'
    },
    {
        icon: 'hands-helping',
        title: 'Collaboration',
        description: 'We work together with partners, communities, and stakeholders to achieve better health outcomes.'
    }
];

export default function CoreValues() {
    return (
        <section className="section core-values">
            <div className="container">
                <div className="section-header">
                    <h2>Our Core Values</h2>
                </div>
                <div className="values-grid">
                    {values.map((value, index) => (
                        <div key={index} className="value-card">
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
