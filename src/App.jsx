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

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MarqueeBand />
        <Services />
        <Stats />
        <Work />
        <Process />
        <Testimonials />
        <DynamicTypography text="SKYWEB" />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
