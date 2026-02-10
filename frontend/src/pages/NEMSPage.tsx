import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import DirectorateTemplate from '../components/directorate/DirectorateTemplate'
import { directoratesData } from '../data/directoratesData'

export default function NEMSPage() {
    return (
        <>
            <Header />
            <main>
                <DirectorateTemplate data={directoratesData.nems} />
            </main>
            <Footer />
        </>
    );
}
