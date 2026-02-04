import Image from "next/image"
import Link from "next/link"
import { CalendarIcon } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"

interface BlogCardProps {
  title: string
  excerpt: string
  date: string
  imageUrl: string
  slug: string
  category: "berita" | "infografis"
}

export default function BlogCard({ title, excerpt, date, imageUrl, slug, category }: BlogCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden">
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      <CardHeader className="flex-1">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <CalendarIcon className="h-4 w-4" />
          <time dateTime={date}>{formatDate(date)}</time>
        </div>
        <Link href={`/${category}/${slug}`} className="hover:underline">
          <h3 className="text-xl font-bold line-clamp-2">{title}</h3>
        </Link>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground line-clamp-3">{excerpt}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link href={`/${category}/${slug}`}>Baca Selengkapnya</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

