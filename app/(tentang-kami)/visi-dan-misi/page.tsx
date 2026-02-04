import type { Metadata } from "next"
import Image from "next/image"
import PageHeader from "@/components/page-header"
import { enhanceMarkdownContent, parseMarkdown } from "@/lib/markdown-parser"
import { getStrapiVisiMisi } from "@/lib/api"
import { getGlobalPage } from "@/lib/data"

export async function generateMetadata(): Promise<Metadata> {
    const global = await getGlobalPage()
    const namaOPD = global?.namaOPD || "Dinas Pemuda dan Olahraga"
  
    return {
      title: "Visi dan Misi - "+namaOPD,
      description: "Informasi mengenai " + namaOPD,
    }
  }

export default async function VisiMisiPage() {
  const post = await getStrapiVisiMisi()

  const enhanced = enhanceMarkdownContent(post.konten)
  const html = parseMarkdown(enhanced)
  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title={post.judul}
        description={post.judul}
      />

      <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: html }}>
      </div>
    </div>
  )
}

