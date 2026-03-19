import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import HeroSlider from '../components/home/HeroSlider'
import InfoHubDashboard from '../components/home/InfoHubDashboard'
import ServicesSection from '../components/home/ServicesSection'
import UpdatesSection from '../components/home/UpdatesSection'
import NewsletterSection from '../components/home/NewsletterSection'

export default function HomePage() {
    return (
        <>
            <Header />
            <main>
                <HeroSlider />
                <InfoHubDashboard />
                <ServicesSection />
                <UpdatesSection />
                <NewsletterSection />
            </main>
            <Footer />
        </>
    )
}
