import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import DPPIPage from './pages/DPPIPage'
import RCHPage from './pages/RCHPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/directorates/dppi" element={<DPPIPage />} />
        <Route path="/directorates/rch" element={<RCHPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
