import { getStrapiPageBySlug, getStrapiPages } from "@/lib/api";
import { notFound } from "next/navigation";
import { enhanceMarkdownContent, parseMarkdown } from "@/lib/markdown-parser"
import { getGlobalPage } from "@/lib/data"
import { Metadata } from "next";
import PageHeader from "@/components/page-header"
import Image from "next/image"

// Generate metadata for each page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string }
}): Promise<Metadata> {
  try {
    const resolvedParams = await params
    const slug = resolvedParams.slug
    
    const global = await getGlobalPage()
    const namaOPD = global?.namaOPD || ""
    
    const formatSlugToTitle = (slug: string) => {
      return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    }

    try {
      const post = await getStrapiPageBySlug(slug)
      
      if (!post) {
        return {
          title: `${formatSlugToTitle(slug)} - ${namaOPD}`,
          description: `Halaman ${formatSlugToTitle(slug)} - ${namaOPD}`,
        }
      }

      // Only process imageUrl if it exists
      let imageUrl = null
      if (post.imageUrl) {
        imageUrl = post.imageUrl.startsWith("http")
          ? post.imageUrl
          : `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"}${post.imageUrl}`
      }

      // Base metadata
      const metadata: Metadata = {
        title: `${post.title} - ${namaOPD}`,
        description: post.desc || post.title,
      }

      // Only add OpenGraph and Twitter if image exists
      if (imageUrl) {
        metadata.openGraph = {
          title: `${post.title} - ${namaOPD}`,
          description: post.desc || post.title,
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ],
          type: "article",
        }
        
        metadata.twitter = {
          card: "summary_large_image",
          title: `${post.title} - ${namaOPD}`,
          description: post.desc || post.title,
          images: [imageUrl],
        }
      }

      return metadata
    } catch (pageError) {
      console.error("Error fetching page:", pageError)
      return {
        title: `${formatSlugToTitle(slug)} - ${namaOPD}`,
        description: `Halaman ${formatSlugToTitle(slug)} - ${namaOPD}`,
      }
    }
  } catch (error) {
    console.error("Error in generateMetadata:", error)
    const global = await getGlobalPage()
    const namaOPD = global?.namaOPD || ""
    
    return {
      title: `Halaman - ${namaOPD}`,
      description: `Halaman ${namaOPD}`
    }
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await getStrapiPageBySlug(params.slug);

  if (!page) {
    return notFound();
  }

  const enhanced = enhanceMarkdownContent(page?.content || "")
  const html = parseMarkdown(enhanced)

  return (
    <div className="container mx-auto px-4 py-12">
      <article className="max-w-4xl mx-auto">
        <PageHeader title={page.title} description={page.desc || ""} category="" />

        {page.desc && (
          <div className="flex justify-center gap-2 text-muted-foreground mb-8">
            <p>{page.desc}</p>
          </div>
        )}

        {/* Only render image if imageUrl exists */}
        {page.imageUrl && (
          <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
            <Image 
              src={page.imageUrl} 
              alt={page.title} 
              fill 
              className="object-cover" 
              priority 
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>
        )}

        {/* Content rendered with our enhanced markdown parser */}
        <div 
          className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-blue-600 prose-strong:font-bold prose-img:rounded-md" 
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  try {
    const pages = await getStrapiPages();
    
    return pages.map((page: { slug: string }) => ({
      slug: page.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}
