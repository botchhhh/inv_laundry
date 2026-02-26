import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-gray-900 p-4 flex gap-6">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/dashboard">Dashboard</Link>

      {/* Laundry System Pages */}
      <Link to="/orders">Orders</Link>
      <Link to="/inventory">Inventory</Link>
      <Link to="/reports">Reports</Link>
      <Link to="/admin-dashboard">Admin Dashboard</Link>
    </nav>
  )
}

export { Navbar }