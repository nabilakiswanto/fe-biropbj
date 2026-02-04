"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

interface AppLink {
  id: number
  text: string
  href: string
  isExternal?: boolean
  logo?: any // Strapi media field
}

interface AppsCarouselProps {
  apps: AppLink[]
  apiSource: string
}

export default function AppsCarousel({ apps = [], apiSource }: AppsCarouselProps) {
  if (!apps || apps.length === 0) return null

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
          Aplikasi Terkait
        </h2>
      </div>

      <div className="w-full max-w-6xl mx-auto">
        <Carousel
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnInteraction: true,
            }),
          ]}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-1 md:-ml-2">
            {apps.map((app) => {
              // Get logo URL from Strapi
              const logoUrl = app.logo?.url 
                ? `${apiSource}${app.logo.url}`
                : null

              return (
                <CarouselItem key={app.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Link
                      href={app.href}
                      target={app.isExternal ? "_blank" : "_self"}
                      rel={app.isExternal ? "noopener noreferrer" : undefined}
                      className="block h-full"
                    >
                      <Card className="h-[280px] hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 hover:border-primary/50 bg-gradient-to-br from-card to-muted/20 cursor-pointer">
                        <CardHeader className="pb-3 pt-6">
                          <div className="relative w-24 h-24 mx-auto mb-4 bg-white rounded-2xl overflow-hidden shadow-md flex items-center justify-center">
                            {logoUrl ? (
                              <Image
                                src={logoUrl}
                                alt={`${app.text} logo`}
                                fill
                                className="object-contain p-3"
                                sizes="96px"
                              />
                            ) : (
                              // Fallback SVG icon
                              <svg 
                                className="w-12 h-12 text-primary" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  strokeWidth={2} 
                                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" 
                                />
                              </svg>
                            )}
                          </div>
                          <CardTitle className="text-lg font-bold text-center line-clamp-2 min-h-[3.5rem] flex items-center justify-center px-2">
                            {app.text}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 px-4 pb-4 flex flex-col items-center">
                          <div className="mt-auto pt-4">
                            <span className="inline-flex items-center gap-2 text-primary font-semibold hover:underline text-sm">
                              Buka Aplikasi 
                              <svg 
                                className="w-4 h-4" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  strokeWidth={2} 
                                  d="M14 5l7 7m0 0l-7 7m7-7H3" 
                                />
                              </svg>
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious className="left-4 bg-primary/10 hover:bg-primary/20 border-primary/20" />
          <CarouselNext className="right-4 bg-primary/10 hover:bg-primary/20 border-primary/20" />
        </Carousel>
      </div>
    </section>
  )
}
