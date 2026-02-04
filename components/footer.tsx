import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube} from "lucide-react"
import { getGlobalPage } from "@/lib/data"
import { enhanceMarkdownContent, parseMarkdown } from "@/lib/markdown-parser"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";


export default async function Footer() {
  const currentYear = new Date().getFullYear()

  const global = await getGlobalPage()
  // console.log(global.footer)

  //extract the data
  const footer = Array.isArray(global.footer) ? global.footer[0] : null;
  // console.log(footer)
  const footerImage = footer?.image?.url 
  ? process.env.NEXT_PUBLIC_STRAPI_API_URL + footer.image.url 
  : "/logo-sulut.png"

  const socmed = footer?.socmed
  const fb = socmed[0]
  const ig = socmed[1]
  const yt = socmed[2]
  const t  = socmed[3]

  const address = footer?.address ?? ""
  const html = parseMarkdown(enhanceMarkdownContent(address))   
  

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src={footerImage}
                alt="Logo Pemerintah Sulawesi Utara"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <div>
                <p className="font-bold leading-tight">{footer?.logo?.[0]?.logoText}</p>
                <p className="text-xs leading-tight">{footer?.logo?.[0]?.logoText2}</p>
              </div>
            </div>
            {/* //TODO update the links directly from strapi */}
            <div className="flex items-center gap-4">
              <Link href={fb.href} target="_blank" className="hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">{fb.text}</span>
              </Link>
              <Link href={ig.href} target="_blank" className="hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">{ig.text}</span>
              </Link>
              <Link href={yt.href} target="_blank" className="hover:text-accent transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">{yt.text}</span>
              </Link>
              <Link href={t.href} target="_blank" className="hover:text-accent transition-colors">
                <FontAwesomeIcon icon={faTiktok} />
                <span className="sr-only">{t.text}</span>
              </Link>

            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              {footer?.links?.map((link: any) => (
                <li key={link.id}>
                  <Link href={`/${link.href}`} className="text-sm hover:text-accent transition-colors">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Kontak</h3>
            <address className="not-italic space-y-2 text-sm">
            <div dangerouslySetInnerHTML={{ __html: html }} suppressHydrationWarning />
              {/* <p>Email: info@disporasulut.go.id</p> */}
              {/* <p>Jam Operasional: Senin - Jumat, 08.00 - 16.30 WITA</p> */}
            </address>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm">
        <Link href="https://sulutprov.go.id"><p>&copy; {currentYear} {footer?.copyright}</p></Link>
        </div>
      </div>
    </footer>
  )
}

