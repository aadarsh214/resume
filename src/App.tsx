import Header from './components/Header'
import About from './components/About'
import Work from './components/Work'
import SkillWall from './components/SkillWall'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'
import CursorAura from './components/CursorAura'

function App() {
  return (
    <div className="min-h-screen text-zinc-200 bg-[radial-gradient(1200px_600px_at_50%_-10%,#1a0b2e,transparent_60%),linear-gradient(#000,#000)]">
      <Header />
      <CursorAura />
      <main>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/skill-wall" element={<SkillWall />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
