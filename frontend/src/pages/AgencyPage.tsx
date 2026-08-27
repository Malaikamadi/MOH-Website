import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { useApi } from '../hooks/useApi'
import { getAgencies } from '../services/api'

const fallbackAgencies = [
    { acronym: 'NMSA', name: 'National Medical Supplies Agency', icon: 'building', link: '/agencies/nmsa' },
    { acronym: 'NPHA', name: 'National Public Health Agency', icon: 'hospital', link: '/agencies/npha' },
    { acronym: 'NEMS', name: 'National Emergency Medical Services', icon: 'ambulance', link: '/agencies/nems' },
    { acronym: 'HSC', name: 'Health Service Commission', icon: 'clipboard-check', link: '/agencies/hsc' },
    { acronym: 'PCHF', name: 'Postgraduate College of Health Facilities', icon: 'graduation-cap', link: '/agencies/pchf' },
    { acronym: 'NHS', name: 'National Health Secretariat', icon: 'landmark', link: '/agencies/nhs' },
    { acronym: 'MDC', name: 'Medical and Dental Council', icon: 'stethoscope', link: '/agencies/mdc' },
    { acronym: 'Pharmacy Board', name: 'Pharmacy Board of Sierra Leone', icon: 'pills', link: '/agencies/pharmacy-board' },
    { acronym: 'SL Nursing & Midwifery', name: 'Sierra Leone Nurses and Midwives', icon: 'user-nurse', link: '/agencies/sl-nursing-midwifery' },
    { acronym: 'AHPC', name: 'Allied Health Professional Councils', icon: 'users-cog', link: '/agencies/ahpc' },
]

export default function AgencyPage() {
    const { data: agencyRes, loading } = useApi(getAgencies)

    const agencies = agencyRes?.data?.length
        ? agencyRes.data.map((a) => ({
            acronym: a.name,
            name: a.fullName,
            icon: a.icon || 'building',
            link: `/agencies/${a.slug}`,
        }))
        : fallbackAgencies

    return (
        <>
            <Header />
            <main>
                <section className="dir-page-hero agency-page-hero">
                    <div className="container">
                        <div className="dir-page-hero-content">
                            <div className="dir-page-badge">
                                <i className="fas fa-sitemap"></i>
                                <span>Ministry Agencies</span>
                            </div>
                            <h1>Our Agencies</h1>
                            <p className="dir-full-name">
                                Boards, councils, commissions, and agencies supporting health system delivery and regulation
                            </p>
                            <div className="dir-page-breadcrumb">
                                <a href="/"><i className="fas fa-home"></i> Home</a>
                                <span>/</span>
                                <span className="active">Agencies</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="overview-section">
                    <div className="container">
                        {loading ? (
                            <p style={{ textAlign: 'center', color: '#64748b' }}>Loading agencies…</p>
                        ) : (
                            <div className="units-grid">
                                {agencies.map((agency) => (
                                    <a
                                        key={agency.link}
                                        href={agency.link}
                                        className="unit-card"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <i className={`fas fa-${agency.icon}`}></i>
                                        <span>{agency.acronym}</span>
                                        <small style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                                            {agency.name}
                                        </small>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
