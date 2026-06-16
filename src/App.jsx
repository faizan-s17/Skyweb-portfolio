import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MarqueeBand from './components/MarqueeBand'
import Services from './components/Services'
import Stats from './components/Stats'
import Work from './components/Work'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import DynamicTypography from './components/DynamicTypography'
import CTA from './components/CTA'
import Footer from './components/Footer'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsOfService from './components/TermsOfService'

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const handleNavigate = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Navbar />
      <main>
        {currentPage === 'home' && (
          <>
            <Hero />
            <MarqueeBand />
            <Services />
            <Stats />
            <Work />
            <Process />
            <Testimonials />
            <DynamicTypography text="SKYWEB" />
            <CTA />
          </>
        )}
        {currentPage === 'privacy' && <PrivacyPolicy onBack={() => handleNavigate('home')} />}
        {currentPage === 'terms' && <TermsOfService onBack={() => handleNavigate('home')} />}
      </main>
      <Footer onNavigate={handleNavigate} />
    </>
  )
}
