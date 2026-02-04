"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface SliderImage {
  id?: string | number
  url: string
  alternativeText?: string
  width?: number
  height?: number
  formats?: any
}

interface SliderComponent {
  __component: string
  images: SliderImage[]
}

interface DynamicComponent {
  __component: string
  [key: string]: any
}

interface DynamicZoneRendererProps {
  components: DynamicComponent[]
}

export default function DynamicZoneRenderer({ components }: DynamicZoneRendererProps) {
  console.log("Dynamic components to render:", components)
  console.log("Dynamic components JSON:", JSON.stringify(components, null, 2))

  if (!components || components.length === 0) {
    console.log("No components to render")
    return null
  }

  return (
    <div className="space-y-8 my-8">
      {components.map((component, index) => {
        console.log(`Rendering component at index ${index}:`, component)
        return <DynamicComponent key={index} component={component} />
      })}
    </div>
  )
}

function DynamicComponent({ component }: { component: DynamicComponent }) {
  // Check the component type and render accordingly
  const componentType = component.__component
  console.log("Rendering component type:", componentType, component)

  switch (componentType) {
    case "shared.slider":
      console.log("Rendering slider component")
      return <SliderComponent data={component as SliderComponent} />
    // Add more component types as needed
    default:
      console.log("Unsupported component type:", componentType)
      return (
        <Card className="p-4">
          <p className="text-muted-foreground">Unsupported component type: {componentType}</p>
        </Card>
      )
  }
}

function SliderComponent({ data }: { data: SliderComponent }) {
  console.log("SliderComponent data:", data)

  const [currentIndex, setCurrentIndex] = useState(0)
  const images = data.images || []

  console.log("Slider images:", images)
  console.log("Slider images JSON:", JSON.stringify(images, null, 2))

  if (images.length === 0) {
    console.log("Slider has no images")
    return (
      <Card className="p-4">
        <p className="text-muted-foreground">Slider has no images</p>
      </Card>
    )
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      <div className="relative aspect-[16/9] w-full">
        {images.map((image: SliderImage, index: number) => {
          // Make sure we have a valid image URL
          let imageUrl = "/placeholder.svg?height=600&width=1200"

          if (image.url) {
            imageUrl = image.url.startsWith("http")
              ? image.url
              : `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"}${image.url}`
          }

          console.log(`Image ${index} URL:`, imageUrl)

          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={image.alternativeText || `Slide ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          )
        })}
      </div>

      {images.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous slide</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next slide</span>
          </Button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {images.map((image: SliderImage, index: number) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-primary" : "bg-white/50"}`}
                onClick={() => setCurrentIndex(index)}
              >
                <span className="sr-only">Go to slide {index + 1}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}