import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import HeroSlider from '../components/home/HeroSlider'
import ServicesSection from '../components/home/ServicesSection'
import AnnualHealthcareReviewSection from '../components/home/AnnualHealthcareReviewSection'
import UpdatesSection from '../components/home/UpdatesSection'
import NewsletterSection from '../components/home/NewsletterSection'

export default function HomePage() {
    return (
        <>
            <Header />
            <main>
                <HeroSlider />
                <ServicesSection />
                <AnnualHealthcareReviewSection />
                <UpdatesSection />
                <NewsletterSection />
            </main>
            <Footer />
        </>
    )
}
