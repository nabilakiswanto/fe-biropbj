import type { Metadata } from "next"
import PageHeader from "@/components/page-header"
import { getStrapiDokumen } from "@/lib/api"
import { getGlobalPage } from "@/lib/data"
import DocumentTabs from "@/components/document-tabs"

export async function generateMetadata(): Promise<Metadata> {
  const global = await getGlobalPage()
  const namaOPD = global?.namaOPD || ""

  return {
    title: "Dokumen - " + namaOPD,
    description: "Dokumen resmi " + namaOPD,
  }
}

export default async function DokumenPage() {
  const documents = await getStrapiDokumen()

  // Group documents by category
  const groupedByCategory: Record<string, any[]> = {}
  documents.forEach((doc: any) => {
    const cat = doc.category?.seoUrl || "uncategorized"
    if (!groupedByCategory[cat]) groupedByCategory[cat] = []
    groupedByCategory[cat].push(doc)
  })

  const categories = Object.entries(groupedByCategory)

  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title="Dokumen"
        description="Dokumen resmi yang dapat diunduh"
        category=""
      />

      <DocumentTabs categories={categories} />
    </div>
  )
}
