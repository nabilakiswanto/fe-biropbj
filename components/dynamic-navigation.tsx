"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ChevronDown, Menu, ExternalLink } from "lucide-react"
import type { MenuItem } from "@/lib/navigation"

interface DynamicNavigationProps {
  items: MenuItem[]
  className?: string
  namaOPD?: string // Add this prop
}

export default function DynamicNavigation({ items, className, namaOPD = "Menu" }: DynamicNavigationProps) {
  const pathname = usePathname()

  const isActive = (item: MenuItem): boolean => {
    const currentPath = pathname === "/" ? "/" : pathname.replace(/\/+$/, "")
    const itemPath = `/${item.slug ?? ""}`.replace(/\/+$/, "")

    if (currentPath === itemPath) return true
    if (currentPath === "/") return false

    return item.children?.some((child) => isActive(child)) ?? false
  }

  return (
    <div className={cn("flex items-center", className)}>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-1">
        {items.map((item) =>
          item.children.length > 0 ? (
            <DropdownMenu key={item.id}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={cn("flex items-center gap-1", isActive(item) && "text-primary")}>
                  {item.title} <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                {item.children.map((child) => (
                  <DropdownMenuItem key={child.id} asChild>
                    {child.isExternal ? (
                      <a
                        href={child.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center cursor-pointer"
                      >
                        {child.title}
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    ) : (
                      <Link href={`/${child.slug ?? ""}`} className="cursor-pointer">
                        {child.title}
                      </Link>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              key={item.id}
              variant="ghost"
              asChild
              className={cn("flex items-center", isActive(item) && "text-primary")}
            >
              {item.isExternal ? (
                <a href={item.externalUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                  {item.title}
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              ) : (
                <Link href={`/${item.slug ?? ""}`}>{item.title}</Link>
              )}
            </Button>
          ),
        )}
      </nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
            {/* Dynamic title from namaOPD */}
            <SheetHeader>
              <SheetTitle>{namaOPD}</SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col gap-3 mt-8">
              {items
                .filter((item) => item.slug !== undefined || item.isExternal)
                .map((item) => (
                  <div key={item.id} className="flex flex-col">
                    {item.isExternal ? (
                      <a
                        href={item.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "py-2.5 px-3 text-base font-medium flex items-center rounded-md transition-colors",
                          pathname === `/${item.slug ?? ""}`
                            ? "text-primary bg-primary/10"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800"
                        )}
                      >
                        {item.title}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    ) : (
                      <Link
                        href={`/${item.slug ?? ""}`}
                        className={cn(
                          "py-2.5 px-3 text-base font-medium rounded-md transition-colors",
                          pathname === `/${item.slug ?? ""}`
                            ? "text-primary bg-primary/10"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800"
                        )}
                      >
                        {item.title}
                      </Link>
                    )}

                    {item.children.length > 0 && (
                      <div className="ml-4 flex flex-col gap-1.5 mt-2 border-l-2 border-primary/20 pl-3">
                        {item.children
                          .filter((child) => child.slug !== undefined || child.isExternal)
                          .map((child) =>
                            child.isExternal ? (
                              <a
                                key={child.id}
                                href={child.externalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                  "py-1.5 px-2 flex items-center text-sm rounded-md transition-colors",
                                  pathname === `/${child.slug}`
                                    ? "text-primary bg-primary/10 font-medium"
                                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                                )}
                              >
                                {child.title}
                                <ExternalLink className="ml-1.5 h-3 w-3" />
                              </a>
                            ) : (
                              <Link
                                key={child.id}
                                href={`/${child.slug ?? ""}`}
                                className={cn(
                                  "py-1.5 px-2 text-sm rounded-md transition-colors",
                                  pathname === `/${child.slug ?? ""}`
                                    ? "text-primary bg-primary/10 font-medium"
                                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                                )}
                              >
                                {child.title}
                              </Link>
                            )
                          )}
                      </div>
                    )}
                  </div>
                ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
