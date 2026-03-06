import { useEffect, useState } from "react";
import AdminLayout from "../components/adminlayout";
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
  ResponsiveContainer,
} from "recharts";

function LaundryAdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const storedInventory = JSON.parse(localStorage.getItem("inventory")) || [];

    setOrders(storedOrders);
    setInventory(storedInventory);
  }, []);

  /* =========================
     CALCULATIONS
  ============================*/

  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.amount || 0),
    0
  );

  // Low Stock = qty below 10
  const lowStock = inventory.filter((item) => item.qty < 10).length;

  // Count per Product Type
  const fabconCount = inventory
    .filter((item) => item.productType === "Fabcon")
    .reduce((sum, item) => sum + item.qty, 0);

  const detergentCount = inventory
    .filter((item) => item.productType === "Detergent")
    .reduce((sum, item) => sum + item.qty, 0);

  const bleachCount = inventory
    .filter((item) => item.productType === "Bleach")
    .reduce((sum, item) => sum + item.qty, 0);

  /* =========================
     CHART DATA
  ============================*/

  const monthlyRevenueMap = {};

  orders.forEach((order) => {
    const month = new Date(order.date).toLocaleString("default", {
      month: "short",
    });

    if (!monthlyRevenueMap[month]) {
      monthlyRevenueMap[month] = 0;
    }

    monthlyRevenueMap[month] += Number(order.amount || 0);
  });

  const monthlyRevenue = Object.keys(monthlyRevenueMap).map((month) => ({
    month,
    revenue: monthlyRevenueMap[month],
  }));

  const statusMap = {};

  orders.forEach((order) => {
    if (!statusMap[order.status]) {
      statusMap[order.status] = 0;
    }
    statusMap[order.status] += 1;
  });

  const statusData = Object.keys(statusMap).map((status) => ({
    name: status,
    value: statusMap[status],
  }));

  return (
    <AdminLayout>
      <h2 style={{ marginBottom: "25px" }}>
        Laundry Dashboard
      </h2>

      {/* SUMMARY */}
      <div className="summary-grid">
        <div className="summary-box">
          <h3>Total Orders</h3>
          <p>{totalOrders}</p>
        </div>

        <div className="summary-box">
          <h3>Total Revenue</h3>
          <p>₱{totalRevenue.toLocaleString()}</p>
        </div>

        <div className="summary-box">
          <h3>Low Stock Items</h3>
          <p>{lowStock}</p>
        </div>
      </div>

      {/* PRODUCT STOCK DISPLAY */}
      <div className="summary-grid" style={{ marginTop: "20px" }}>
        <div className="summary-box">
          <h3>Total Fabcon Stock</h3>
          <p>{fabconCount}</p>
        </div>

        <div className="summary-box">
          <h3>Total Detergent Stock</h3>
          <p>{detergentCount}</p>
        </div>

        <div className="summary-box">
          <h3>Total Bleach Stock</h3>
          <p>{bleachCount}</p>
        </div>
      </div>

      {/* MONTHLY REVENUE */}
      <div className="card">
        <h3>Monthly Revenue</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ORDER STATUS */}
      <div className="card">
        <h3>Order Status</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {statusData.map((_, index) => (
                <Cell key={index} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </AdminLayout>
  );
}

export default LaundryAdminDashboard;