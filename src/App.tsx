import { useState } from "react";
import "./App.css";
import type { Item, SortKey, SortOrder } from "./lib/types";
import { InventoryTable } from "./components/InventoryTable";
import { AddItemDialog } from "./components/AddItemDialog";
import { EditItemDialog } from "./components/EditItemDialog";
import { DeleteItemDialog } from "./components/DeleteItemDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const initialItems: Item[] = [
  { id: 1, name: "Laptop", category: "Electronics", quantity: 50 },
  { id: 2, name: "Desk Chair", category: "Furniture", quantity: 30 },
  { id: 3, name: "Notebook", category: "Stationery", quantity: 100 },
  { id: 4, name: "Printer", category: "Electronics", quantity: 5 },
  { id: 4, name: "Printer", category: "Electronics", quantity: 5 },
  { id: 4, name: "Printer", category: "Electronics", quantity: 5 },
  { id: 4, name: "Printer", category: "Electronics", quantity: 5 },
  { id: 4, name: "Printer", category: "Electronics", quantity: 5 },
  { id: 4, name: "Printer", category: "Electronics", quantity: 5 },
  { id: 4, name: "Printer", category: "Electronics", quantity: 5 },
  { id: 4, name: "Printer", category: "Electronics", quantity: 5 },
  { id: 4, name: "Printer", category: "Electronics", quantity: 5 },
];

export default function App() {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [deletingItem, setDeletingItem] = useState<Item | null>(null);

  const addItem = (newItem: Omit<Item, "id">) => {
    const id = Math.max(...items.map((item) => item.id), 0) + 1;
    setItems([...items, { ...newItem, id }]);
  };

  const updateItem = (updatedItem: Item) => {
    setItems(
      items.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setEditingItem(null);
  };

  const deleteItem = (id: number, quantityToDelete: number) => {
    setItems(
      items
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity - quantityToDelete;
            return newQuantity <= 0
              ? null // Will be filtered out below
              : { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item): item is Item => item !== null)
    );
    setDeletingItem(null);
  };

  const filteredItems = items.filter((item) =>
    item.category.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    const compareValue = sortOrder === "asc" ? 1 : -1;
    if (a[sortKey] < b[sortKey]) return -1 * compareValue;
    if (a[sortKey] > b[sortKey]) return 1 * compareValue;
    return 0;
  });

  return (
    <div className="absolute bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]">
      <div className="relative h-screen w-screen ">
      <h1 className="flex justify-center text-4xl font-semibold pt-5 underline">
            Inventory Management
          </h1>
        <div className="absolute overflow-auto inset-20 shadow-md p-10">
         
          <div className="flex items-center gap-4 mb-6">
            <Input
              placeholder="Filter by category"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="max-w-xs"
            />
            <Select
              value={sortKey}
              onValueChange={(value) => setSortKey(value as SortKey)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="category">Category</SelectItem>
                <SelectItem value="quantity">Quantity</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="secondary"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="gap-2"
            >
              {sortOrder === "asc" ? (
                <>
                  Ascending
                  <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Descending
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
          <InventoryTable 
            items={sortedItems}
            onEdit={setEditingItem}
            onDelete={setDeletingItem}
          />
          <AddItemDialog addItem={addItem} />
          <EditItemDialog
            item={editingItem}
            onClose={() => setEditingItem(null)}
            onUpdate={updateItem}
          />
          <DeleteItemDialog
            item={deletingItem}
            onClose={() => setDeletingItem(null)}
            onDelete={deleteItem}
          />
        </div>
      </div>
    </div>
  );
}
