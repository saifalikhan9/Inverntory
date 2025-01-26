"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Item } from "../lib/types"

interface DeleteItemDialogProps {
  item: Item | null
  onClose: () => void
  onDelete: (id: number, quantity: number) => void
}

export function DeleteItemDialog({ item, onClose, onDelete }: DeleteItemDialogProps) {
  const [quantity, setQuantity] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (item && quantity) {
      const deleteQuantity = Math.min(Number.parseInt(quantity, 10), item.quantity)
      onDelete(item.id, deleteQuantity)
      setQuantity("")
    }
  }

  return (
    <Dialog open={!!item} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Item</DialogTitle>
        </DialogHeader>
        <div className="py-2">
          <p className="text-sm text-gray-500">
            Current quantity of {item?.name}: {item?.quantity}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="delete-quantity">Quantity to delete</Label>
            <Input
              id="delete-quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity to delete"
              min={1}
              max={item?.quantity}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="destructive"
              disabled={
                !quantity || Number.parseInt(quantity, 10) <= 0 || Number.parseInt(quantity, 10) > (item?.quantity ?? 0)
              }
            >
              Delete
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

