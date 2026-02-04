import type { Metadata } from "next"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import PageHeader from "@/components/page-header"
import ContactForm from "@/components/contact-form"
import { getContactInfo } from "@/lib/data"
import { getGlobalPage } from "@/lib/data"

export async function generateMetadata(): Promise<Metadata> {
  const global = await getGlobalPage()
  const namaOPD = global?.namaOPD || "Dinas Pemuda dan Olahraga"

  return {
    title: "Kontak - "+namaOPD,
    description: "Informasi kontak " + namaOPD,
  }
}

export default async function KontakPage() {
  // Fetch contact info from Strapi
  const contactInfo = await getContactInfo()

  // Default values if data is not available
  const judul = contactInfo?.judul
  const address = contactInfo?.address || "Komplek Koni, Sario Utara, Kec. Sario, Kota Manado, Sulawesi Utara 95115"
  const phone = contactInfo?.phone || "+62 431 123456"
  const mapEmbedUrl = contactInfo?.googleMapsUrl

  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title="Kontak"
        description="Informasi kontak Dinas Pemuda dan Olahraga Pemerintah Provinsi Sulawesi Utara"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-6">Informasi {judul}</h2>

          <div className="space-y-6">
            <Card>
              <CardContent className="flex items-start gap-4 pt-6">
                <MapPin className="h-6 w-6 text-primary shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Alamat</h3>
                  <p className="text-muted-foreground">{address}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start gap-4 pt-6">
                <Phone className="h-6 w-6 text-primary shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Telepon</h3>
                  <p className="text-muted-foreground">{phone}</p>
                </div>
              </CardContent>
            </Card>

            {/* <Card>
              <CardContent className="flex items-start gap-4 pt-6">
                <Mail className="h-6 w-6 text-primary shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-muted-foreground">{email}</p>
                </div>
              </CardContent>
            </Card> */}

            {/* <Card>
              <CardContent className="flex items-start gap-4 pt-6">
                <Clock className="h-6 w-6 text-primary shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Jam Operasional</h3>
                  {operationalHours.split("\n").map((line, index) => (
                    <p key={index} className="text-muted-foreground">
                      {line}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-primary mb-6">Lokasi Kantor</h2>
          <div className="w-full h-[400px] bg-muted rounded-lg overflow-hidden">
            {mapEmbedUrl ? (
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Dinas Pemuda dan Olahraga"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                Google Maps Embed
              </div>
            )}
        </div>
          {/* <h2 className="text-2xl font-bold text-primary mb-6">Kirim Pesan</h2>
          <ContactForm /> */}
        </div>
      </div>

      {/* <div className="mt-12">
        
      </div> */}
    </div>
  )
}

