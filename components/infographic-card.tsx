import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"

interface InfographicCardProps {
  title: string
  imageUrl: string
  slug: string
  category: "berita" | "infografis"
}

export default function InfographicCard({ title, imageUrl, slug }: InfographicCardProps) {
  return (
    <Card className="overflow-hidden group relative">
      <Link href={`/infografis/${slug}`}>
        <div className="relative w-full h-64 md:h-72 lg:h-80">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105 duration-300"
          />
        </div>
        {/* Optional overlay title */}
        {/* <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white p-2 text-sm md:text-base font-semibold line-clamp-1">
          {title}
        </div> */}
      </Link>
    </Card>
  )
}
