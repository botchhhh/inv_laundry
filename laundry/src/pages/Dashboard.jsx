import { useEffect, useState } from 'react'
import {InventoryForms} from "../components/InventoryForms"
function Dashboard() {
  const [items, setItems] = useState([])
  const [editItem, setEditItem] = useState(null)

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('laundry')) || []
    setItems(stored)
  }, [])

  const saveItems = (data) => {
    setItems(data)
    localStorage.setItem('laundry', JSON.stringify(data))
  }

  const addItem = (item) => {
    saveItems([...items, item])
  }

  const updateItem = (updated) => {
    saveItems(items.map(i => i.id === updated.id ? updated : i))
    setEditItem(null)
  }

  const deleteItem = (id) => {
    saveItems(items.filter(i => i.id !== id))
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <InventoryForms
        addItem={addItem}
        updateItem={updateItem}
        editItem={editItem}
      />

      <table className="w-full border mt-4">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Qty</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id} className="text-center">
              <td className="p-2 border">{item.name}</td>
              <td className="p-2 border">{item.qty}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => setEditItem(item)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteItem(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export { Dashboard }