import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-gray-900 p-4 flex gap-6">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
  )
}

export { Navbar }