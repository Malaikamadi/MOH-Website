import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export default function DirectoratePage() {
    const directorates = [
        { acronym: 'DPPI', name: 'Policy, Planning & Information', icon: 'chart-line', link: '/directorates/dppi' },
        { acronym: 'RCH', name: 'Reproductive & Child Health', icon: 'baby', link: '/directorates/rch' },
        { acronym: 'PHC', name: 'Primary Health Care', icon: 'hospital', link: '/directorates/phc' },
        { acronym: 'DPC', name: 'Disease Prevention and Control', icon: 'virus', link: '/directorates/dpc' },
        { acronym: 'NEMS', name: 'National Emergency Medical Services', icon: 'ambulance', link: '/directorates/nems' },
        { acronym: 'SS', name: 'Support Services', icon: 'cogs', link: '/directorates/ss' },
        { acronym: 'NM', name: 'Nursing and Midwifery', icon: 'nurse', link: '/directorates/nm' },
        { acronym: 'NCD & MH', name: 'NCD and Mental Health', icon: 'brain', link: '/directorates/ncdandmh' },
        { acronym: 'PS', name: 'Pharmaceutical Services', icon: 'pharmacy', link: '/directorates/ps' },
        { acronym: 'HRM', name: 'Human Resource Management', icon: 'user-tie', link: '/directorates/hrm' },
        { acronym: 'EHC', name: 'Environmental Health and Sanitation', icon: 'sanitation', link: '/directorates/ehc' },
        { acronym: 'FN', name: 'Food and Nutrition', icon: 'food', link: '/directorates/fn' },
    ];

    return (
        <>
            <Header />
            <main>
                <section className="dir-page-hero">
                    <div className="container">
                        <div className="dir-page-hero-content">
                            <h1>Our Directorates</h1>
                            <p className="dir-full-name">Explore the directorates of the Ministry of Health</p>
                        </div>
                    </div>
                </section>

                <section className="overview-section">
                    <div className="container">
                        <div className="units-grid">
                            {directorates.map((dir) => (
                                <a key={dir.acronym} href={dir.link} className="unit-card" style={{ textDecoration: 'none' }}>
                                    <i className={`fas fa-${dir.icon}`}></i>
                                    <span>{dir.acronym}</span>
                                    <small style={{ fontSize: '0.75rem', opacity: 0.8 }}>{dir.name}</small>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
