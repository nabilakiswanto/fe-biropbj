import type { Metadata } from "next"
import Image from "next/image"
import PageHeader from "@/components/page-header"
import { enhanceMarkdownContent, parseMarkdown } from "@/lib/markdown-parser"
import { getStrapiStrukturOrganisasi } from "@/lib/api"
import { getGlobalPage } from "@/lib/data"

export async function generateMetadata(): Promise<Metadata> {
  const global = await getGlobalPage()
  const namaOPD = global?.namaOPD || "Dinas Pemuda dan Olahraga"

  return {
    title: "Struktur Organisasi - "+ namaOPD,
    description: "Informasi mengenai " + namaOPD,
  }
}

export default async function StrukturOrganisasiPage() {
    const post = await getStrapiStrukturOrganisasi()
  
    const enhanced = enhanceMarkdownContent(post.deskripsi)
    const html = parseMarkdown(enhanced)
  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title={post.judul}
        description={post.judul}
      />

      <div className="flex justify-center mb-12">
        <div className="relative w-full max-w-4xl h-[600px] rounded-lg overflow-hidden">
          <Image
            src={post.imageUrl || "/placeholder.svg?height=600&width=1000"}
            alt={post.judul}
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: html }}>
      </div>
    </div>
  )
}

