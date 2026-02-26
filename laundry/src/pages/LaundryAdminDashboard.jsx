import { useState } from "react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts"

function LaundryAdminDashboard() {
  const [view, setView] = useState("admin")

  // Monthly Revenue (Laundry)
  const monthlyRevenue = [
    { month: "Jan", revenue: 45000 },
    { month: "Feb", revenue: 52000 },
    { month: "Mar", revenue: 61000 },
    { month: "Apr", revenue: 48000 },
    { month: "May", revenue: 70000 },
    { month: "Jun", revenue: 85000 },
  ]

  // Service Breakdown
  const serviceData = [
    { name: "Wash & Fold", value: 120 },
    { name: "Dry Cleaning", value: 80 },
    { name: "Wash & Iron", value: 95 },
  ]

  // Order Status
  const statusData = [
    { name: "Pending", value: 15 },
    { name: "Washing", value: 10 },
    { name: "Drying", value: 8 },
    { name: "Ready", value: 12 },
    { name: "Completed", value: 50 },
  ]

  // Agent Commissions (Laundry Context)
  const commissions = [
    {
      name: "Maria Garcia",
      role: "Laundry Staff",
      orders: 45,
      revenue: 35000,
      commissionRate: 0.1,
      totalCommission: 3500,
      status: "Paid",
    },
    {
      name: "Juan Dela Cruz",
      role: "Laundry Staff",
      orders: 38,
      revenue: 28000,
      commissionRate: 0.1,
      totalCommission: 2800,
      status: "Pending",
    },
    {
      name: "Anna Santos",
      role: "Senior Staff",
      orders: 60,
      revenue: 50000,
      commissionRate: 0.15,
      totalCommission: 7500,
      status: "Paid",
    },
  ]

  const totalCommission = commissions.reduce(
    (sum, c) => sum + c.totalCommission,
    0
  )

  return (
    <div>
      {/* SIDEBAR */}
      <div>
        <h2>Laundry Management System</h2>
        <ul>
          <li>Dashboard</li>
          <li>Orders</li>
          <li>Appointments</li>
          <li>Inventory</li>
          <li>Commissions</li>
          <li>Reports</li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div>
        {/* TOP BAR */}
        <div>
          <input placeholder="Search..." />
          <button onClick={() => setView("client")}>Client View</button>
          <button onClick={() => setView("admin")}>Admin View</button>
        </div>

        <h2>Laundry Dashboard - January 2026</h2>

        {/* SUMMARY */}
        <div>
          <p>Total Orders: 150</p>
          <p>Total Revenue: ₱185,000</p>
          <p>Total Commission: ₱{totalCommission.toLocaleString()}</p>
          <p>Low Stock Items: 3</p>
        </div>

        {/* REVENUE LINE CHART */}
        <h3>Monthly Revenue</h3>
        <LineChart width={600} height={300} data={monthlyRevenue}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" />
        </LineChart>

        {/* SERVICE BAR CHART */}
        <h3>Service Breakdown</h3>
        <BarChart width={600} height={300} data={serviceData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" />
        </BarChart>

        {/* STATUS PIE CHART */}
        <h3>Order Status Distribution</h3>
        <PieChart width={400} height={300}>
          <Pie
            data={statusData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {statusData.map((entry, index) => (
              <Cell key={index} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        {/* COMMISSIONS TABLE */}
        <h3>Staff Commissions</h3>
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Orders Handled</th>
              <th>Revenue Generated</th>
              <th>Commission Rate</th>
              <th>Total Commission</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {commissions.map((staff, index) => (
              <tr key={index}>
                <td>{staff.name}</td>
                <td>{staff.role}</td>
                <td>{staff.orders}</td>
                <td>₱{staff.revenue.toLocaleString()}</td>
                <td>{staff.commissionRate * 100}%</td>
                <td>₱{staff.totalCommission.toLocaleString()}</td>
                <td>{staff.status}</td>
              </tr>
            ))}

            <tr>
              <td colSpan="5"><strong>Total</strong></td>
              <td>₱{totalCommission.toLocaleString()}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LaundryAdminDashboard