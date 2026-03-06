import { useState } from "react";
import AdminLayout from "../components/adminlayout";

function LaundryOrder() {
  const [name, setName] = useState("");
  const [kg, setKg] = useState("");
  const [service, setService] = useState("wash-dry"); // wash, dry, wash-dry
  const [fold, setFold] = useState(false);

  const totalKg = Number(kg);
  const loads = totalKg > 0 ? Math.ceil(totalKg / 9) : 0;
  const isBig = totalKg >= 9;

  // Pricing per load
  const washPricePerLoad = isBig ? 200 : 160;
  const dryPricePerLoad = isBig ? 100 : 80; // separate dry price
  const foldPricePerLoad = isBig ? 60 : 30;

  // Calculate totals based on selected service
  let washTotal = 0, dryTotal = 0;

  if (service === "wash") washTotal = loads * washPricePerLoad;
  if (service === "dry") dryTotal = loads * dryPricePerLoad;
  if (service === "wash-dry") {
    washTotal = loads * washPricePerLoad;
    dryTotal = loads * dryPricePerLoad;
  }

  const foldTotal = fold ? loads * foldPricePerLoad : 0;
  const grandTotal = washTotal + dryTotal + foldTotal;

  return (
    <AdminLayout>
      <div className="card">
        <h2 style={{ marginBottom: "20px" }}>Add Laundry Order</h2>

        <div style={{ display: "grid", gap: "15px" }}>
          <input
            type="text"
            placeholder="Customer Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />

          <input
            type="number"
            placeholder="Total KG"
            value={kg}
            onChange={(e) => setKg(e.target.value)}
            className="input-field"
          />

          <label>
            <strong>Select Service:</strong>
          </label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="input-field"
          >
            <option value="wash">Wash Only</option>
            <option value="dry">Dry Only</option>
            <option value="wash-dry">Wash & Dry</option>
          </select>

          <label style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              type="checkbox"
              checked={fold}
              onChange={() => setFold(!fold)}
            />
            Add Folding Service on Collection
          </label>
        </div>
      </div>

      {totalKg > 0 && (
        <div className="card">
          <h3>Order Summary</h3>
          <p><strong>Total KG:</strong> {totalKg} kg</p>
          <p><strong>Load Type:</strong> {isBig ? "BIG Load" : "SMALL Load"}</p>
          <p><strong>Total Loads:</strong> {loads}</p>

          <hr style={{ margin: "15px 0" }} />

          {service === "wash" && <p>Wash: ₱{washPricePerLoad} × {loads} = ₱{washTotal}</p>}
          {service === "dry" && <p>Dry: ₱{dryPricePerLoad} × {loads} = ₱{dryTotal}</p>}
          {service === "wash-dry" && (
            <>
              <p>Wash: ₱{washPricePerLoad} × {loads} = ₱{washTotal}</p>
              <p>Dry: ₱{dryPricePerLoad} × {loads} = ₱{dryTotal}</p>
            </>
          )}

          {fold && <p>Folding: ₱{foldPricePerLoad} × {loads} = ₱{foldTotal}</p>}

          <hr style={{ margin: "15px 0" }} />

          <h3>Grand Total: ₱{grandTotal.toLocaleString()}</h3>
        </div>
      )}
    </AdminLayout>
  );
}

export default LaundryOrder;