import type { Metadata } from "next"
import Image from "next/image"
import { CalendarIcon } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { getStrapiPostDetail } from "@/lib/api"
import { getGlobalPage } from "@/lib/data"
import PageHeader from "@/components/page-header"
import { enhanceMarkdownContent, parseMarkdown } from "@/lib/markdown-parser"


// Generate metadata for each news detail page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string }
}): Promise<Metadata> {
  try {
    // Await the params object to get the slug
    const resolvedParams = await params
    const post = await getStrapiPostDetail(resolvedParams.slug)
    // console.log(post)
    // Ensure the image URL is absolute (required for OG images)
    const imageUrl = post.imageUrl.startsWith("http")
      ? post.imageUrl
      : `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"}${post.imageUrl}`

    return {
      title: `${post.title}`,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        type: "article",
        publishedTime: post.date,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt,
        images: [imageUrl],
      },
    }
  } catch (error) {
    // console.error("Error generating metadata:", error)
    const global = await getGlobalPage()
    const namaOPD = global?.namaOPD || "Dinas Pemuda dan Olahraga"
    return {
      title: "Berita - "+namaOPD,
      description: "Detail berita "+ namaOPD
    }
  }
}

export default async function BeritaDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  // Fetch news detail based on slug
  const post = await getStrapiPostDetail(params.slug)

  const enhanced = enhanceMarkdownContent(post.content)
  const html = parseMarkdown(enhanced)

  return (
    <div className="container mx-auto px-4 py-12">
      <article className="max-w-4xl mx-auto">
        <PageHeader title={post.title} description={post.excerpt} category={post.category}/>

        <div className="flex justify-center gap-2 text-muted-foreground mb-8">
          <CalendarIcon className="h-4 w-4" />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>

        <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image src={post.imageUrl || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
        </div>

        {/* Content rendered with ReactMarkdown for images and our enhanced content for text formatting */}
        <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-blue-600 prose-strong:font-bold prose-img:rounded-md" dangerouslySetInnerHTML={{ __html: html }}>
        </div>
      </article>
    </div>
  )
}