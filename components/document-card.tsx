import Link from "next/link"
import { FileIcon, EyeIcon } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DocumentCard({ document }: { document: any }) {
  const { judul, dokumenUrl, konten } = document;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-4">
          <FileIcon className="h-8 w-8 text-primary" />
          <div>
            <CardTitle className="text-lg">{judul || "Tanpa Judul"}</CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">
          {konten ? konten.substring(0, 100) + "..." : "Dokumen resmi"}
        </p>
      </CardContent>

      <CardFooter>
        <Button
          asChild
          variant="outline"
          className="w-full"
          disabled={!dokumenUrl}
        >
          <Link href={dokumenUrl}>
            <EyeIcon className="mr-2 h-4 w-4" />
            Lihat Dokumen
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
