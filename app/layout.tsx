import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { getMenu } from "@/lib/navigation"
import { getGlobalPage } from "@/lib/data"

const inter = Inter({ subsets: ["latin"] })

// Dynamic Metadata
export async function generateMetadata(): Promise<Metadata> {
  const global = await getGlobalPage()
  const namaOPD = global?.namaOPD || ""

  return {
    title: namaOPD,
    description: "Website Resmi " + namaOPD,
    authors: {
      name: "DKIPS SULUT",
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-32x32.png",
      apple: "/apple-touch-icon.png",
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const mainMenu = await getMenu()
  const menuItems = mainMenu?.items || []

  const global = await getGlobalPage()
  const logo = global?.footer?.[0]?.logo?.[0]

  const logoText = logo?.logoText || ""
  const logoText2 = logo?.logoText2 || "Prov. Sulawesi Utara"
  const headerImage = logo?.url
    ? process.env.NEXT_PUBLIC_STRAPI_API_URL + logo.url
    : "/logo-sulut.png"

  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Navbar menuItems={menuItems} logoText={logoText} logoText2={logoText2} logo={headerImage} namaOPD={global.namaOPD}/>
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'