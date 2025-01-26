export interface Item {
  id: number
  name: string
  category: string
  quantity: number
}

export type SortKey = "name" | "category" | "quantity"
export type SortOrder = "asc" | "desc"

