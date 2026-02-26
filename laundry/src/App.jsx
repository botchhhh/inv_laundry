import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import About from './pages/About'
import Home from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import LaundryAdminDashboard from './pages/LaundryAdminDashboard'


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<LaundryAdminDashboard />} />
      </Routes>
    </>
  )
}

export { App }