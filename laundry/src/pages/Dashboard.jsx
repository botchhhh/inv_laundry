import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { InventoryForms } from "../components/InventoryForms";
import AdminLayout from "../components/adminlayout";

function Dashboard() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const [inventory, setInventory] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [editOrderId, setEditOrderId] = useState(null);

  const [newOrder, setNewOrder] = useState({
    serviceType: "wash-dry",
    deliveryType: "Pickup",
    qty: 1,
    fold: false,
    date: "",
    address: "",
    contact: "",
    fabcon: false,
    fabconCategory: "Normal",
    fabconBrand: "",
    detergent: false,
    detergentCategory: "Normal",
    detergentBrand: "",
    bleach: false,
    bleachBrand: "",
    status: "Pending",
  });

  if (!loggedInUser) return <Navigate to="/login" replace />;

  useEffect(() => {
    const storedInventory = JSON.parse(localStorage.getItem("inventory")) || [];
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];

    setInventory(storedInventory);

    if (loggedInUser?.role === "admin") {
      setOrders(storedOrders);
    } else {
      setOrders(storedOrders.filter((o) => o.username === loggedInUser?.username));
    }
  }, []);

  const saveInventory = (data) => {
    setInventory(data);
    localStorage.setItem("inventory", JSON.stringify(data));
  };

  const addItem = (item) => {
    saveInventory([...inventory, item]);
  };

  const updateItem = (updatedItem) => {
    const updated = inventory.map((i) => (i.id === updatedItem.id ? updatedItem : i));
    saveInventory(updated);
    setEditItem(null);
  };

  const deleteItem = (id) => {
    const updated = inventory.filter((i) => i.id !== id);
    saveInventory(updated);
  };

  const deductStock = (type, category, brand) => {
    const index = inventory.findIndex(
      (i) =>
        i.productType === type &&
        (type === "Bleach" || i.category === category) &&
        i.brand === brand
    );

    if (index === -1 || inventory[index].qty <= 0) {
      alert(`${brand} (${category}) OUT OF STOCK`);
      return false;
    }

    const updated = [...inventory];
    updated[index].qty -= 1;
    saveInventory(updated);
    return true;
  };

  const calculateTotal = () => {
    const loads = Math.ceil(newOrder.qty / 9);
    let total = 0;

    if (newOrder.serviceType === "wash") total += loads * 160;
    if (newOrder.serviceType === "dry") total += loads * 80;
    if (newOrder.serviceType === "wash-dry") total += loads * (160 + 80);

    if (newOrder.fold) total += loads * 30;

    if (newOrder.fabcon) total += newOrder.fabconCategory === "Premium" ? 35 : 25;
    if (newOrder.detergent) total += newOrder.detergentCategory === "Premium" ? 45 : 35;
    if (newOrder.bleach) total += 20;
    if (newOrder.deliveryType === "Delivery") total += 50;

    return total;
  };

  const placeOrder = () => {
    if (!newOrder.address || !newOrder.contact || !newOrder.date)
      return alert("Fill required fields");

    if (newOrder.fabcon && !deductStock("Fabcon", newOrder.fabconCategory, newOrder.fabconBrand))
      return;

    if (newOrder.detergent && !deductStock("Detergent", newOrder.detergentCategory, newOrder.detergentBrand))
      return;

    if (newOrder.bleach && !deductStock("Bleach", "Standard", newOrder.bleachBrand))
      return;

    const order = {
      id: editOrderId || Date.now(),
      username: loggedInUser.username,
      ...newOrder,
      amount: calculateTotal(),
      status: newOrder.status || "Pending",
    };

    let allOrders = JSON.parse(localStorage.getItem("orders")) || [];

    if (editOrderId) {
      allOrders = allOrders.map((o) => (o.id === editOrderId ? order : o));
      setEditOrderId(null);
    } else {
      allOrders.push(order);
    }

    localStorage.setItem("orders", JSON.stringify(allOrders));

    setOrders(
      loggedInUser.role === "admin"
        ? allOrders
        : allOrders.filter((o) => o.username === loggedInUser.username)
    );

    alert(editOrderId ? "Order Updated!" : "Booking Confirmed!");
    setNewOrder({
      ...newOrder,
      qty: 1,
      fold: false,
      fabcon: false,
      detergent: false,
      bleach: false,
      fabconBrand: "",
      detergentBrand: "",
      bleachBrand: "",
    });
  };

  const generateReceipt = (order) => {
    alert(`LAUNDRY RECEIPT

Customer: ${order.username}
Address: ${order.address}
Contact: ${order.contact}

Service: ${order.serviceType}
Delivery: ${order.deliveryType}
KG: ${order.qty}

Fabcon: ${order.fabcon ? order.fabconCategory + " - " + order.fabconBrand : "No"}
Detergent: ${order.detergent ? order.detergentCategory + " - " + order.detergentBrand : "No"}
Bleach: ${order.bleach ? order.bleachBrand : "No"}

TOTAL: ₱${order.amount}`);
  };

  return (
    <AdminLayout>
      {loggedInUser.role === "admin" ? (
        <>
          <div className="table-card">
            <InventoryForms addItem={addItem} updateItem={updateItem} editItem={editItem} />
          </div>

          <div className="table-card" style={{ marginTop: 20 }}>
            <h3>Inventory</h3>
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Brand</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.id}>
                    <td>{item.productType}</td>
                    <td>{item.productType === "Bleach" ? "Standard" : item.category}</td>
                    <td>{item.brand}</td>
                    <td>
                      {item.qty}
                      {item.qty <= 5 && <span style={{ color: "red" }}> (Low)</span>}
                    </td>
                    <td>
                      <button onClick={() => setEditItem(item)} className="edit-btn">Edit</button>
                      <button onClick={() => deleteItem(item.id)} className="delete-btn">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-card" style={{ marginTop: 20 }}>
            <h3>All Orders</h3>
            {orders.length === 0 ? (
              <p>No orders yet.</p>
            ) : (
              <table className="inventory-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Address</th>
                    <th>Contact</th>
                    <th>Service</th>
                    <th>KG</th>
                    <th>Delivery</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.username}</td>
                      <td>{order.address}</td>
                      <td>{order.contact}</td>
                      <td>{order.serviceType}</td>
                      <td>{order.qty}</td>
                      <td>{order.deliveryType}</td>
                      <td>₱{order.amount}</td>
                      <td>
                        <select
                          value={order.status}
                          onChange={(e) => {
                            const updatedOrders = orders.map((o) =>
                              o.id === order.id ? { ...o, status: e.target.value } : o
                            );
                            setOrders(updatedOrders);
                            localStorage.setItem("orders", JSON.stringify(updatedOrders));
                          }}
                          className="status-select"
                        >
                          <option>Pending</option>
                          <option>In Progress</option>
                          <option>Completed</option>
                          <option>Cancelled</option>
                        </select>
                      </td>
                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => {
                            setNewOrder(order);
                            setEditOrderId(order.id);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => {
                            if (window.confirm("Delete this order?")) {
                              const updatedOrders = orders.filter((o) => o.id !== order.id);
                              setOrders(updatedOrders);
                              localStorage.setItem("orders", JSON.stringify(updatedOrders));
                            }
                          }}
                        >
                          Delete
                        </button>
                        <button className="view-btn" onClick={() => generateReceipt(order)}>View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="client-dashboard">
            <h2>Welcome, {loggedInUser.username}!</h2>
            <p>Place your laundry order below:</p>

            <div className="order-form">
              <label>Service Type:</label>
              <select
                value={newOrder.serviceType}
                onChange={(e) => setNewOrder({ ...newOrder, serviceType: e.target.value })}
              >
                <option value="wash">Wash</option>
                <option value="dry">Dry</option>
                <option value="wash-dry">Wash & Dry</option>
              </select>

              <label>KG:</label>
              <input
                type="number"
                min={1}
                value={newOrder.qty}
                onChange={(e) => setNewOrder({ ...newOrder, qty: Number(e.target.value) })}
              />

              <label>Delivery Type:</label>
              <select
                value={newOrder.deliveryType}
                onChange={(e) => setNewOrder({ ...newOrder, deliveryType: e.target.value })}
              >
                <option>Pickup</option>
                <option>Delivery</option>
              </select>

              <label>Date:</label>
              <input
                type="date"
                value={newOrder.date}
                onChange={(e) => setNewOrder({ ...newOrder, date: e.target.value })}
              />

              <label>Address:</label>
              <input
                type="text"
                value={newOrder.address}
                onChange={(e) => setNewOrder({ ...newOrder, address: e.target.value })}
              />

              <label>Contact:</label>
              <input
                type="text"
                value={newOrder.contact}
                onChange={(e) => setNewOrder({ ...newOrder, contact: e.target.value })}
              />

              {/* ======================= DYNAMIC SOAP OPTIONS ======================= */}
              <div>
                {/* Fabcon */}
                <input
                  type="checkbox"
                  checked={newOrder.fabcon}
                  onChange={(e) => setNewOrder({ ...newOrder, fabcon: e.target.checked })}
                  id="fabcon"
                />
                <label htmlFor="fabcon">Fabcon</label>
                {newOrder.fabcon && (
                  <div className="soap-options">
                    <select
                      value={newOrder.fabconCategory}
                      onChange={(e) => setNewOrder({ ...newOrder, fabconCategory: e.target.value })}
                    >
                      <option value="Normal">Normal</option>
                      <option value="Premium">Premium</option>
                    </select>
                    <select
                      value={newOrder.fabconBrand}
                      onChange={(e) => setNewOrder({ ...newOrder, fabconBrand: e.target.value })}
                    >
                      <option value="">Select Brand</option>
                      {inventory
                        .filter(
                          (item) =>
                            item.productType === "Fabcon" &&
                            item.category === newOrder.fabconCategory &&
                            item.qty > 0
                        )
                        .map((item) => (
                          <option key={item.id} value={item.brand}>
                            {item.brand} ({item.qty})
                          </option>
                        ))}
                    </select>
                  </div>
                )}
              </div>

              <div>
                {/* Detergent */}
                <input
                  type="checkbox"
                  checked={newOrder.detergent}
                  onChange={(e) => setNewOrder({ ...newOrder, detergent: e.target.checked })}
                  id="detergent"
                />
                <label htmlFor="detergent">Detergent</label>
                {newOrder.detergent && (
                  <div className="soap-options">
                    <select
                      value={newOrder.detergentCategory}
                      onChange={(e) => setNewOrder({ ...newOrder, detergentCategory: e.target.value })}
                    >
                      <option value="Normal">Normal</option>
                      <option value="Premium">Premium</option>
                    </select>
                    <select
                      value={newOrder.detergentBrand}
                      onChange={(e) => setNewOrder({ ...newOrder, detergentBrand: e.target.value })}
                    >
                      <option value="">Select Brand</option>
                      {inventory
                        .filter(
                          (item) =>
                            item.productType === "Detergent" &&
                            item.category === newOrder.detergentCategory &&
                            item.qty > 0
                        )
                        .map((item) => (
                          <option key={item.id} value={item.brand}>
                            {item.brand} ({item.qty})
                          </option>
                        ))}
                    </select>
                  </div>
                )}
              </div>

              <div>
                {/* Bleach */}
                <input
                  type="checkbox"
                  checked={newOrder.bleach}
                  onChange={(e) => setNewOrder({ ...newOrder, bleach: e.target.checked })}
                  id="bleach"
                />
                <label htmlFor="bleach">Bleach</label>
                {newOrder.bleach && (
                  <div className="soap-options">
                    <select
                      value={newOrder.bleachBrand}
                      onChange={(e) => setNewOrder({ ...newOrder, bleachBrand: e.target.value })}
                    >
                      <option value="">Select Brand</option>
                      {inventory
                        .filter((item) => item.productType === "Bleach" && item.qty > 0)
                        .map((item) => (
                          <option key={item.id} value={item.brand}>
                            {item.brand} ({item.qty})
                          </option>
                        ))}
                    </select>
                  </div>
                )}
              </div>

              <button className="auth-btn" onClick={placeOrder} style={{ marginTop: 10 }}>
                Place Order (₱{calculateTotal()})
              </button>
            </div>

            <div className="user-orders">
              <h3>Your Orders</h3>
              {orders.length === 0 ? (
                <p>No orders yet.</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>KG</th>
                      <th>Delivery</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.serviceType}</td>
                        <td>{order.qty}</td>
                        <td>{order.deliveryType}</td>
                        <td>{order.status}</td>
                        <td>
                          <button className="view-btn" onClick={() => generateReceipt(order)}>
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
}

export { Dashboard };