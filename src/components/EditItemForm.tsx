import type React from "react"
import { useState } from "react"
import type { Item } from "../lib/types"

interface EditItemFormProps {
  item: Item
  updateItem: (item: Item) => void
  onCancel: () => void
}

const EditItemForm: React.FC<EditItemFormProps> = ({ item, updateItem, onCancel }) => {
  const [name, setName] = useState(item.name)
  const [category, setCategory] = useState(item.category)
  const [quantity, setQuantity] = useState(item.quantity.toString())

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && category && quantity) {
      updateItem({ ...item, name, category, quantity: Number.parseInt(quantity, 10) })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700">
          Item Name
        </label>
        <input
          type="text"
          id="edit-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="edit-category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <input
          type="text"
          id="edit-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="edit-quantity" className="block text-sm font-medium text-gray-700">
          Quantity
        </label>
        <input
          type="number"
          id="edit-quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update
        </button>
      </div>
    </form>
  )
}

export default EditItemForm

