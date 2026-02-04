import type { Metadata } from "next"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import PageHeader from "@/components/page-header"
import EmptyState from "@/components/empty-state"
import { enhanceMarkdownContent, parseMarkdown } from "@/lib/markdown-parser"
import { getStrapiPejabatList } from "@/lib/api"
import { getGlobalPage } from "@/lib/data"


export async function generateMetadata(): Promise<Metadata> {
  const global = await getGlobalPage()
  const namaOPD = global?.namaOPD || "Dinas Pemuda dan Olahraga"

  return {
    title: "Profil Pejabat - "+ namaOPD,
    description: "Informasi mengenai " + namaOPD,
  }
}

export default async function ProfilPejabatPage() {
  // Fetch pejabat list
  const pejabatList = await getStrapiPejabatList()

   const enhanced = enhanceMarkdownContent(pejabatList.konten)
   const html = parseMarkdown(enhanced)

  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title={pejabatList.judul}
        description={pejabatList.judul}
      />

      {pejabatList ? (
        <div className="flex justify-center">
            <Card key={pejabatList.id} className="w-full max-w-md flex flex-col">
              <CardHeader className="flex flex-col items-center text-center">
                <div className="relative w-48 h-48 rounded-full overflow-hidden mb-4">
                  <Image
                    src={pejabatList.imageUrl || "/placeholder.svg?height=200&width=200"}
                    alt={pejabatList.judul}
                    fill
                    className="object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2" dangerouslySetInnerHTML={{ __html: html }}>
                </div>
              </CardContent>
            </Card>
          
        </div>
      ) : (
        <EmptyState
          title="Data Pejabat Belum Tersedia"
          description="Data profil pejabat belum tersedia saat ini. Silakan kunjungi kembali nanti."
          actionLabel="Kembali ke Beranda"
          actionHref="/"
        />
      )}
    </div>
  )
}

