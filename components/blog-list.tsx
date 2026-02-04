"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import BlogCard from "@/components/blog-card"

interface BlogListProps {
  items: any[]
  category: "berita" | "infografis"
}

const ITEMS_PER_PAGE = 6

export default function BlogList({ items, category }: BlogListProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE)

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentItems.map((item) => (
          <BlogCard
            key={item.id}
            title={item.title}
            excerpt={item.excerpt}
            date={item.date}
            imageUrl={item.imageUrl}
            slug={item.slug}
            category={category}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Sebelumnya
          </Button>

          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNum = index + 1
            return (
              <Button
                key={pageNum}
                variant={pageNum === currentPage ? "default" : "outline"}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </Button>
            )
          })}

          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Selanjutnya
          </Button>
        </div>
      </div>
    </div>
  )
}