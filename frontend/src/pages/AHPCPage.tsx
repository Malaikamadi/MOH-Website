import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import RegulatorTemplate from '../components/regulator/RegulatorTemplate'
import { regulatorsData } from '../data/regulators'

export default function AHPCPage() {
    return (
        <>
            <Header />
            <main>
                <RegulatorTemplate data={regulatorsData.ahpc} />
            </main>
            <Footer />
        </>
    );
}
