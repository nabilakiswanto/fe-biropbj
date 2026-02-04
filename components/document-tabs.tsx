"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PaginatedDocumentList from "@/components/paginated-document-list"

interface DocumentTabsProps {
  categories: [string, any[]][]
}

export default function DocumentTabs({ categories }: DocumentTabsProps) {
  const defaultCategory = categories[0]?.[0] || "uncategorized"

  return (
    <Tabs defaultValue={defaultCategory} className="w-full">
      <div className="flex justify-center mb-8">
        <TabsList className="inline-flex gap-2 rounded-md bg-gray-100 p-1">
          {categories.map(([key, docs]) => (
            <TabsTrigger
              key={key}
              value={key}
              className="px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-primary rounded-md transition"
            >
              {docs[0].category?.name || "Uncategorized"} ({docs.length})
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {categories.map(([key, docs]) => (
        <TabsContent key={key} value={key}>
          <PaginatedDocumentList documents={docs} categoryKey={key} />
        </TabsContent>
      ))}
    </Tabs>
  )
}
