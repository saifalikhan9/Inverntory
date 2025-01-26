"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Item } from "../lib/types"
interface EditItemDialogProps {
  item: Item | null
  onClose: () => void
  onUpdate: (item: Item) => void
}

export function EditItemDialog({ item, onClose, onUpdate }: EditItemDialogProps) {
  const [name, setName] = useState(item?.name ?? "")
  const [category, setCategory] = useState(item?.category ?? "")
  const [quantity, setQuantity] = useState(item?.quantity.toString() ?? "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (item && name && category && quantity) {
      onUpdate({
        ...item,
        name,
        category,
        quantity: Number.parseInt(quantity, 10),
      })
    }
  }

  return (
    <Dialog open={!!item} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Name</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter item name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-category">Category</Label>
            <Input
              id="edit-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter category"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-quantity">Quantity</Label>
            <Input
              id="edit-quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Update</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

