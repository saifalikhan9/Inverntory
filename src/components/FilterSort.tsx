import type React from "react"
import type { SortKey } from "../types"

interface FilterSortProps {
  filter: string
  setFilter: (filter: string) => void
  sortKey: SortKey
  setSortKey: (key: SortKey) => void
  sortOrder: "asc" | "desc"
  setSortOrder: (order: "asc" | "desc") => void
}

const FilterSort: React.FC<FilterSortProps> = ({ filter, setFilter, sortKey, setSortKey, sortOrder, setSortOrder }) => {
  return (
    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 items-center">
      <div className="relative rounded-md shadow-sm">
        <input
          type="text"
          placeholder="Filter by category"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md"
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <label htmlFor="sort" className="sr-only">
            Sort
          </label>
          <select
            id="sort"
            name="sort"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
          >
            <option value="name">Name</option>
            <option value="category">Category</option>
            <option value="quantity">Quantity</option>
          </select>
        </div>
      </div>
      <button
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {sortOrder === "asc" ? "▲ Ascending" : "▼ Descending"}
      </button>
    </div>
  )
}

export default FilterSort

