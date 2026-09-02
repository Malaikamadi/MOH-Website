import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import DirectoratePage from './pages/DirectoratePage'
import DirectorateDetailPage from './pages/DirectorateDetailPage'
import AgencyPage from './pages/AgencyPage'
import AgencyDetailPage from './pages/AgencyDetailPage'
import EmergencyPage from './pages/EmergencyPage'
import FindFacilityPage from './pages/FindFacilityPage'
import ContactPage from './pages/ContactPage'
import JobPortalPage from './pages/JobPortalPage'
import NewsroomPage from './pages/NewsroomPage'
import NewsArticlePage from './pages/NewsArticlePage'
import EventsPage from './pages/EventsPage'
import VideosPage from './pages/VideosPage'
import PublicationsPage from './pages/PublicationsPage'
import PressReleasesPage from './pages/PressReleasesPage'
import DashboardPage from './pages/DashboardPage'
import FloatingButtons from './components/layout/FloatingButtons'

function App() {
  return (
    <BrowserRouter>
      <FloatingButtons />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/directorates" element={<DirectoratePage />} />
        <Route path="/directorates/:slug" element={<DirectorateDetailPage />} />
        <Route path="/agencies" element={<AgencyPage />} />
        <Route path="/agencies/:slug" element={<AgencyDetailPage />} />
        <Route path="/newsroom" element={<NewsroomPage />} />
        <Route path="/newsroom/:slug" element={<NewsArticlePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/publications" element={<PublicationsPage />} />
        <Route path="/press-releases" element={<PressReleasesPage />} />
        <Route path="/emergency" element={<EmergencyPage />} />
        <Route path="/find-facility" element={<FindFacilityPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/jobs" element={<JobPortalPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
