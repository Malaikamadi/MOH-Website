import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import DirectoratePage from './pages/DirectoratePage'
import DirectorateDetailPage from './pages/DirectorateDetailPage'
import EmergencyPage from './pages/EmergencyPage'
import FindFacilityPage from './pages/FindFacilityPage'
import ContactPage from './pages/ContactPage'
import JobPortalPage from './pages/JobPortalPage'
import FloatingButtons from './components/layout/FloatingButtons'

function App() {
  return (
    <BrowserRouter>
      <FloatingButtons />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/directorates" element={<DirectoratePage />} />
        <Route path="/directorates/:slug" element={<DirectorateDetailPage />} />
        <Route path="/emergency" element={<EmergencyPage />} />
        <Route path="/find-facility" element={<FindFacilityPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/jobs" element={<JobPortalPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
