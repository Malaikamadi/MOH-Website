import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import HeroSlider from '../components/home/HeroSlider'
import ServicesSection from '../components/home/ServicesSection'
import UpdatesSection from '../components/home/UpdatesSection'

export default function HomePage() {
    return (
        <>
            <Header />
            <main>
                <HeroSlider />
                <ServicesSection />
                <UpdatesSection />
            </main>
            <Footer />
        </>
    )
}
