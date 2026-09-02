import { Navigate, useParams } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import RegulatorTemplate from '../components/regulator/RegulatorTemplate'
import { isRegulatorSlug, regulatorsData } from '../data/regulators'

export default function RegulatorDetailPage() {
    const { slug } = useParams<{ slug: string }>()

    if (isRegulatorSlug(slug)) {
        return (
            <>
                <Header />
                <main>
                    <RegulatorTemplate data={regulatorsData[slug]} />
                </main>
                <Footer />
            </>
        )
    }

    if (!slug) {
        return <Navigate to="/regulators" replace />
    }

    return (
        <>
            <Header />
            <main>
                <section className="dir-page-hero agency-page-hero">
                    <div className="container">
                        <div className="dir-page-hero-content">
                            <h1>Regulator Not Found</h1>
                            <p className="dir-full-name">
                                The requested regulator could not be found.
                            </p>
                            <a
                                href="/regulators"
                                style={{
                                    color: 'white',
                                    textDecoration: 'underline',
                                    marginTop: '1rem',
                                    display: 'inline-block',
                                }}
                            >
                                Back to Regulators
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
