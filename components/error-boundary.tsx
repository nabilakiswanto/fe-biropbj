"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

interface ErrorBoundaryProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-4">
      <h2 className="text-2xl font-bold text-primary mb-4">Terjadi Kesalahan</h2>
      <p className="text-muted-foreground mb-6">Maaf, terjadi kesalahan saat memuat konten. Silakan coba lagi nanti.</p>
      <Button onClick={reset}>Coba Lagi</Button>
    </div>
  )
}

