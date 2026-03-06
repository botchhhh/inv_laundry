import { useState, useEffect } from "react";

function InventoryForms({ addItem, updateItem, editItem }) {
  const [form, setForm] = useState({
    productType: "Fabcon",
    category: "Normal",
    brand: "",
    qty: ""
  });

  useEffect(() => {
    if (editItem) {
      setForm(editItem);
    }
  }, [editItem]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (!form.brand || !form.qty) {
      alert("Please complete all fields");
      return;
    }

    const itemData = {
      ...form,
      id: editItem ? editItem.id : Date.now(),
      qty: Number(form.qty)
    };

    if (editItem) {
      updateItem(itemData);
    } else {
      addItem(itemData);
    }

    setForm({
      productType: "Fabcon",
      category: "Normal",
      brand: "",
      qty: ""
    });
  };

  return (
    <div>
      <h3>{editItem ? "Edit Item" : "Add Inventory"}</h3>

      {/* PRODUCT TYPE */}
      <select
        name="productType"
        value={form.productType}
        onChange={handleChange}
      >
        <option value="Fabcon">Fabcon</option>
        <option value="Detergent">Detergent</option>
        <option value="Bleach">Bleach</option>
      </select>

      {/* CATEGORY (NOT FOR BLEACH) */}
      {form.productType !== "Bleach" && (
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          <option value="Normal">Normal</option>
          <option value="Premium">Premium</option>
        </select>
      )}

      {/* BRAND */}
      <input
        type="text"
        name="brand"
        placeholder="Brand Name (e.g. Downy, Ariel)"
        value={form.brand}
        onChange={handleChange}
      />

      {/* STOCK */}
      <input
        type="number"
        name="qty"
        placeholder="Stock Quantity"
        value={form.qty}
        onChange={handleChange}
      />

     <button onClick={handleSubmit} className="add-btn">
  {editItem ? "Update Item" : "Add Item"}
</button>
    </div>
  );
}

export { InventoryForms };