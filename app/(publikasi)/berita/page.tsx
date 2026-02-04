import type { Metadata } from "next"
import PageHeader from "@/components/page-header"
import BlogList from "@/components/blog-list"
import EmptyState from "@/components/empty-state"
import { getAllNews } from "@/lib/data"
import { getPostsByCategory,getGlobalPage } from "@/lib/data"

export async function generateMetadata(): Promise<Metadata> {
  const global = await getGlobalPage()
  const namaOPD = global?.namaOPD || "Dinas Pemuda dan Olahraga"

  return {
    title: "Berita - "+namaOPD,
    description: "Berita terbaru dari " + namaOPD,
  }
}

export default async function BeritaPage() {
  // Fetch posts with category "berita" sorted by latest date
  const news = await getPostsByCategory("berita")

  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title="Berita"
        description="Berita terbaru dari Dinas Pemuda dan Olahraga Pemerintah Provinsi Sulawesi Utara"
      />

      {news.length > 0 ? (
        <BlogList items={news} category="berita" />
      ) : (
        <EmptyState
          title="Belum Ada Berita"
          description="Belum ada berita yang tersedia saat ini. Silakan kunjungi kembali nanti."
          actionLabel="Kembali ke Beranda"
          actionHref="/"
        />
      )}
    </div>
  )
}

