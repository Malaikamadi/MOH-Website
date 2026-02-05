import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import PageHero from '../components/common/PageHero'
import AboutOverview from '../components/about/AboutOverview'
import MissionVision from '../components/about/MissionVision'
import CoreValues from '../components/about/CoreValues'
import Leadership from '../components/about/Leadership'

export default function AboutPage() {
    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'About Us' }
    ];

    return (
        <>
            <Header />
            <main>
                <PageHero title="About Us" breadcrumbs={breadcrumbs} />
                <AboutOverview />
                <MissionVision />
                <CoreValues />
                <Leadership />
            </main>
            <Footer />
        </>
    );
}


