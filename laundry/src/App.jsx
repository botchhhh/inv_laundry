import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import About from './pages/About'
import Home from './pages/Home'
import { Dashboard } from './pages/Dashboard'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export { App }