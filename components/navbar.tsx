"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import DynamicNavigation from "@/components/dynamic-navigation"
import type { MenuItem } from "@/lib/navigation"

interface NavbarProps {
  menuItems: MenuItem[]
  logoText?: string
  logoText2?: string
  logo?: string
  namaOPD?: string // Add this
}

export default function Navbar({ 
  menuItems, 
  logoText = "BALITBANGDA", 
  logoText2 = "Prov. Sulawesi Utara", 
  logo = "/apple-touch-icon.png",
  namaOPD = "Menu" // Add default
}: NavbarProps) {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm dark:bg-gray-950/95" : "bg-white dark:bg-gray-950",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logo}
              alt="Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <div className="hidden sm:block">
              <p className="font-bold text-primary leading-tight">{logoText}</p>
              <p className="text-xs leading-tight">{logoText2}</p>
            </div>
          </Link>

          {/* Pass namaOPD to DynamicNavigation */}
          <DynamicNavigation items={menuItems} namaOPD={namaOPD} />
        </div>
      </div>
    </header>
  )
}
