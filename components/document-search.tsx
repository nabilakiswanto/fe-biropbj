"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface DocumentSearchProps {
  onSearch: (query: string) => void
}

export default function DocumentSearch({ onSearch }: DocumentSearchProps) {
  const [query, setQuery] = useState("")

  const handleSearch = (value: string) => {
    setQuery(value)
    onSearch(value)
  }

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Cari dokumen berdasarkan judul atau konten..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-4 py-6 text-base"
        />
      </div>
      {query && (
        <p className="text-sm text-muted-foreground mt-2">
          Mencari: <span className="font-medium">{query}</span>
        </p>
      )}
    </div>
  )
}
