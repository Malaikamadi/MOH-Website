import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import HeroSlider from '../components/home/HeroSlider'
import ServicesSection from '../components/home/ServicesSection'
import UpdatesSection from '../components/home/UpdatesSection'
import NewsSection from '../components/home/NewsSection'
import NewsletterSection from '../components/home/NewsletterSection'

export default function HomePage() {
    return (
        <>
            <Header />
            <main>
                <HeroSlider />
                <ServicesSection />
                <UpdatesSection />
                <NewsSection />
                <NewsletterSection />
            </main>
            <Footer />
        </>
    )
}
