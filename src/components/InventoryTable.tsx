import type { Item } from "../lib/types"
import { Button } from "@/components/ui/button"

interface InventoryTableProps {
  items: Item[]
  onEdit: (item: Item) => void
  onDelete: (item: Item) => void
}

export function InventoryTable({ items, onEdit, onDelete }: InventoryTableProps) {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-left">
          <tr className="border-b">
            <th className="px-4 py-3 font-medium text-gray-500">NAME</th>
            <th className="px-4 py-3 font-medium text-gray-500">CATEGORY</th>
            <th className="px-4 py-3 font-medium text-gray-500">QUANTITY</th>
            <th className="px-4 py-3 font-medium text-gray-500">ACTIONS</th>
     
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className={`border-b ${item.quantity < 10 ? "bg-red-50" : "hover:bg-gray-50"}`}>
              <td className="px-4 py-3 font-medium">{item.name}</td>
              <td className="px-4 py-3 text-gray-500">{item.category}</td>
              <td className="px-4 py-3 text-gray-500">{item.quantity}</td>
              <td className="px-4 py-3 space-x-2">
                <Button
                  variant="ghost"
                  className="text-purple-600 hover:text-purple-900 hover:bg-purple-50"
                  onClick={() => onEdit(item)}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  className="text-red-600 hover:text-red-900 hover:bg-red-50"
                  onClick={() => onDelete(item)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

