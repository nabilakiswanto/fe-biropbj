import type { Metadata } from "next"
import PageHeader from "@/components/page-header"
import BlogList from "@/components/blog-list"
import EmptyState from "@/components/empty-state"
import { getPostsByCategory,getGlobalPage  } from "@/lib/data"

export async function generateMetadata(): Promise<Metadata> {
  const global = await getGlobalPage()
  const namaOPD = global?.namaOPD || "Dinas Pemuda dan Olahraga"

  return {
    title: "Infografis - "+namaOPD,
    description: "Infografis terbaru dari " + namaOPD,
  }
}

export default async function InfografisPage() {
  // Fetch posts with category "infografis" sorted by latest date
  const infographics = await getPostsByCategory("infografis");

  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title="Infografis"
        description="Infografis terbaru dari Dinas Pemuda dan Olahraga Pemerintah Provinsi Sulawesi Utara"
      />

      {infographics.length > 0 ? (
        <BlogList items={infographics} category="infografis" />
      ) : (
        <EmptyState
          title="Belum Ada Infografis"
          description="Belum ada infografis yang tersedia saat ini. Silakan kunjungi kembali nanti."
          actionLabel="Kembali ke Beranda"
          actionHref="/"
        />
      )}
    </div>
  )
}


