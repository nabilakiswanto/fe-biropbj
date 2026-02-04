import Image from "next/image"
import { cn } from "@/lib/utils"

interface JumbotronProps {
  title: string
  subtitle?: string
  imageUrl: string
  className?: string
}

export default function Jumbotron({ title, subtitle, imageUrl, className }: JumbotronProps) {
  return (
    <section className={cn("relative w-full h-[500px] md:h-[600px]", className)}>
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image src={imageUrl || "/placeholder.svg"} alt="Hero background" fill priority className="object-cover" />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        {subtitle && <p className="text-lg md:text-xl text-white/90 max-w-2xl">{subtitle}</p>}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white max-w-4xl mb-4">{title}</h1>
      </div>
    </section>
  )
}

