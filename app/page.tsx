import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Jumbotron from "@/components/jumbotron"
import BlogCard from "@/components/blog-card"
import EmptyState from "@/components/empty-state"
import LatestNewsSlider from "@/components/latest-news"
import LatestInfographicsSlider from "@/components/latest-infografis"
import PopupModal from "@/components/popup-modal"
import AppsCarousel from "@/components/apps-carousel"
import { getHomePage, getLatestNews, getLatestInfographics } from "@/lib/data"

import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
config.autoAddCss = false

export default async function Home() {
  const homepage = await getHomePage()
  const latestNews = await getLatestNews(3)
  const latestInfographics = await getLatestInfographics(5)

  // Extract blocks
  const popupBlock = homepage.blocks?.find((block: any) => block.__component === "blocks.popup")
  const heroBlock = homepage.blocks.find((block: any) => block.__component === "blocks.hero-section")
  const pimpinanBlock = homepage.blocks.find((block: any) => block.__component === "blocks.pimpinan-opd")

  // Get API source for image URLs
  const apiSource = homepage.apiSource || process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"

  // Popup image
  const popupImages = popupBlock?.image?.map((img: any) => 
    `${apiSource}${img.url}`
  ) || []

  // Hero image
  const heroImage = heroBlock?.image?.url
    ? heroBlock.image.url.startsWith("http")
      ? heroBlock.image.url
      : `${apiSource}${heroBlock.image.url}`
    : "/bg1.jpg"

  // Pimpinan image
  const pimpinanImage = pimpinanBlock?.image?.url
    ? pimpinanBlock.image.url.startsWith("http")
      ? pimpinanBlock.image.url
      : `${apiSource}${pimpinanBlock.image.url}`
    : "/placeholder.svg?height=200&width=200"

  // Extract ListApps
   const listApps = homepage.ListApps?.link || []

  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Popup Modal */}
      {popupImages.length > 0 && <PopupModal images={popupImages} />}

      {/* Hero section with jumbotron */}
      <Jumbotron
        title={heroBlock?.heading || ""}
        subtitle={heroBlock?.subheading || "Selamat Datang"}
        imageUrl={heroImage}
      />

      {/* Officials section */}
      <section className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-primary mb-2">
            Kepala<br />
            {heroBlock?.heading || ""}
          </h2>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 gap-8 justify-items-center w-full">
            {/* Kepala Dinas */}
            <Card className="flex flex-col items-center text-center w-full max-w-md">
              <CardHeader>
                <div className="relative w-48 h-48 rounded-full overflow-hidden mb-4 mx-auto">
                  <Image
                    src={pimpinanImage}
                    alt="Kepala Dinas"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardTitle>{pimpinanBlock?.namalengkap || "Nama Kepala Dinas"}</CardTitle>
                <CardDescription>{pimpinanBlock?.pangkat || "Pangkat/Golongan"}</CardDescription>
                {pimpinanBlock?.motto && (
                  <CardDescription className="mt-2 italic">
                    {pimpinanBlock.motto}
                  </CardDescription>
                )}
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Apps Carousel Section */}
    {listApps.length > 0 && (
      <AppsCarousel apps={listApps} apiSource={apiSource} />
    )}

      {/* Latest news section */}
      <LatestNewsSlider latestNews={latestNews} />

      {/* Latest infographics section */}
      <LatestInfographicsSlider latestInfographics={latestInfographics} />
    </div>
  )
}
