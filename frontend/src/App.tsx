import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import DirectoratePage from './pages/DirectoratePage'
import DPPIPage from './pages/DPPIPage'
import RCHPage from './pages/RCHPage'
import PrimaryHealthCarePage from './pages/PrimaryHealthCarePage'
import DiseasePreventionPage from './pages/DiseasePreventionPage'
import NEMSPage from './pages/NEMSPage'
import SupportServicePage from './pages/SupportServicesPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/directorates" element={<DirectoratePage />} />
        <Route path="/directorates/dppi" element={<DPPIPage />} />
        <Route path="/directorates/rch" element={<RCHPage />} />
        <Route path="/directorates/phc" element={<PrimaryHealthCarePage />} />
        <Route path="/directorates/dpc" element={<DiseasePreventionPage />} />
        <Route path="/directorates/nems" element={<NEMSPage />} />
        <Route path="/directorates/ss" element={<SupportServicePage />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App


