import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import DirectorateTemplate from '../components/directorate/DirectorateTemplate'
import { directoratesData } from '../data/directoratesData'

export default function PrimaryHealthCarePage() {
    return (
        <>
            <Header />
            <main>
                <DirectorateTemplate data={directoratesData.pch} />
            </main>
            <Footer />
        </>
    );
}
