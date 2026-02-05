import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import DirectorateTemplate from '../components/directorate/DirectorateTemplate'
import { directoratesData } from '../data/directoratesData'

export default function RCHPage() {
    return (
        <>
            <Header />
            <main>
                <DirectorateTemplate data={directoratesData.rch} />
            </main>
            <Footer />
        </>
    );
}
