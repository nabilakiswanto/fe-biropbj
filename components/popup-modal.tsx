"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface PopupModalProps {
  images: string[]
  autoPlayDelay?: number
}

export default function PopupModal({ images, autoPlayDelay = 4000 }: PopupModalProps) {
  const [open, setOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!images || images.length === 0) return
    
    const timer = setTimeout(() => {
      setOpen(true)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [images])

  useEffect(() => {
    if (!open || images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, autoPlayDelay)

    return () => clearInterval(interval)
  }, [open, images.length, autoPlayDelay])

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  if (!images || images.length === 0 || !open) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop/Overlay */}
      <div 
        className="absolute inset-0 bg-black/90 animate-in fade-in duration-300"
        onClick={() => setOpen(false)}
      />

      {/* Content Container */}
      <div className="relative z-10 w-[95vw] max-w-5xl h-auto max-h-[90vh] bg-black/95 rounded-lg overflow-hidden animate-in zoom-in-95 fade-in duration-300">
        
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute right-2 top-2 sm:right-4 sm:top-4 z-50 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
          aria-label="Tutup"
        >
          <X className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800" />
        </button>

        {/* Image Container */}
        <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh]">
          <Image
            src={images[currentIndex]}
            alt={`Pengumuman ${currentIndex + 1} dari ${images.length}`}
            fill
            className="object-contain p-4"
            priority={currentIndex === 0}
            sizes="(max-width: 768px) 95vw, (max-width: 1200px) 80vw, 1200px"
          />
        </div>

        {/* Navigation - Only show if multiple images */}
        {images.length > 1 && (
          <>
            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-50 bg-white/90 hover:bg-white p-2 sm:p-3 rounded-full shadow-lg transition-all"
              aria-label="Gambar sebelumnya"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800" />
            </button>
            
            {/* Next Button */}
            <button
              onClick={goToNext}
              className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-50 bg-white/90 hover:bg-white p-2 sm:p-3 rounded-full shadow-lg transition-all"
              aria-label="Gambar selanjutnya"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800" />
            </button>

            {/* Indicator Dots */}
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-1.5 sm:gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 sm:h-2.5 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'bg-white w-6 sm:w-8' 
                      : 'bg-white/50 hover:bg-white/75 w-2 sm:w-2.5'
                  }`}
                  aria-label={`Ke gambar ${index + 1}`}
                />
              ))}
            </div>

            {/* Counter */}
            <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 bg-black/50 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
