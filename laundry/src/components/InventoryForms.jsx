import { useEffect, useState } from 'react'

function InventoryForms({ addItem, updateItem, editItem }) {
  const [name, setName] = useState('')
  const [qty, setQty] = useState('')

  useEffect(() => {
    if (editItem) {
      setName(editItem.name)
      setQty(editItem.qty)
    }
  }, [editItem])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name || !qty) return

    if (editItem) {
      updateItem({ ...editItem, name, qty })
    } else {
      addItem({
        id: Date.now(),
        name,
        qty,
      })
    }

    setName('')
    setQty('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="text-black px-2"
        placeholder="Item name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        className="text-black px-2"
        placeholder="Qty"
        value={qty}
        onChange={e => setQty(e.target.value)}
      />
      <button className="bg-blue-600 px-4">
        {editItem ? 'Update' : 'Add'}
      </button>
    </form>
  )
}

export { InventoryForms }