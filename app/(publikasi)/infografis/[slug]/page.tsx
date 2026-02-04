import type { Metadata } from "next"
import Image from "next/image"
import { CalendarIcon } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { getStrapiPostDetail } from "@/lib/api"
import { getGlobalPage } from "@/lib/data"
import PageHeader from "@/components/page-header"
import ReactMarkdown from "react-markdown"
import { enhanceMarkdownContent, parseMarkdown } from "@/lib/markdown-parser"

interface InfografisDetailPageProps {
  params: {
    slug: string
  }
}

// Generate metadata for each infographic detail page
export async function generateMetadata({ params }: InfografisDetailPageProps): Promise<Metadata> {
  try {
    const post = await getStrapiPostDetail(params.slug)

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
    //globaldata
    const global = await getGlobalPage()
    const namaOPD = global?.namaOPD || "Dinas Pemuda dan Olahraga"
    return {
      title: "Infografis - " +namaOPD,
      description: "Detail infografis "+namaOPD,
    }
  }
}

export default async function InfografisDetailPage({ params }: InfografisDetailPageProps) {
  // Fetch infographic detail based on slug
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

        <div className="relative w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.imageUrl || "/placeholder.svg"}
            alt={post.title}
            width={1200}
            height={800}
            className="w-full h-auto"
            priority
          />
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-blue-600 prose-strong:font-bold prose-img:rounded-md" dangerouslySetInnerHTML={{ __html: html }}>
        </div>
      </article>
    </div>
  )
}