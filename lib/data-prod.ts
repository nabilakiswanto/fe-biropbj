// Update the data.ts file to use Strapi API functions

import {
  getStrapiLatestNews,
  getStrapiAllNews,
  getStrapiNewsDetail,
  getStrapiLatestInfographics,
  getStrapiAllInfographics,
  getStrapiInfographicDetail,
  getStrapiPejabatList,
  getStrapiContactInfo,
} from "./api"

// Types
export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  date: string
  imageUrl: string
}

export interface Pejabat {
  id: string
  name: string
  position: string
  nip: string
  education: string
  email: string
  imageUrl: string
}

export interface Document {
  id: string
  title: string
  description: string
  category: "peraturan" | "laporan" | "pedoman"
  date: string
  fileUrl: string
}

export interface ContactInfo {
  address: string
  phone: string
  email: string
  operationalHours: string
  mapEmbedUrl?: string
}

// Mock data for documents (keep this until you have a Strapi API for documents)
const documentData: Document[] = [
  {
    id: "1",
    title: "Peraturan Daerah Provinsi Sulawesi Utara Nomor 4 Tahun 2023 tentang Pembinaan dan Pengembangan Olahraga",
    description:
      "Peraturan daerah yang mengatur tentang pembinaan dan pengembangan olahraga di Provinsi Sulawesi Utara.",
    category: "peraturan",
    date: "2023-05-15",
    fileUrl: "#",
  },
  {
    id: "2",
    title:
      "Peraturan Gubernur Sulawesi Utara Nomor 12 Tahun 2024 tentang Tata Cara Pemberian Penghargaan bagi Atlet Berprestasi",
    description:
      "Peraturan gubernur yang mengatur tentang tata cara pemberian penghargaan bagi atlet yang berprestasi di tingkat nasional dan internasional.",
    category: "peraturan",
    date: "2024-02-20",
    fileUrl: "#",
  },
  {
    id: "3",
    title: "Laporan Kinerja Dinas Pemuda dan Olahraga Provinsi Sulawesi Utara Tahun 2024",
    description: "Laporan kinerja Dinas Pemuda dan Olahraga Provinsi Sulawesi Utara selama tahun 2024.",
    category: "laporan",
    date: "2025-01-15",
    fileUrl: "#",
  },
  {
    id: "4",
    title: "Laporan Pelaksanaan Pekan Olahraga Provinsi (Porprov) Sulawesi Utara 2024",
    description:
      "Laporan pelaksanaan Pekan Olahraga Provinsi (Porprov) Sulawesi Utara yang diselenggarakan pada tahun 2024.",
    category: "laporan",
    date: "2024-12-10",
    fileUrl: "#",
  },
  {
    id: "5",
    title: "Pedoman Pembinaan Atlet Berbakat di Provinsi Sulawesi Utara",
    description: "Pedoman yang berisi tentang tata cara pembinaan atlet berbakat di Provinsi Sulawesi Utara.",
    category: "pedoman",
    date: "2024-06-05",
    fileUrl: "#",
  },
  {
    id: "6",
    title: "Pedoman Penyelenggaraan Kompetisi Olahraga Tingkat Provinsi",
    description: "Pedoman yang berisi tentang tata cara penyelenggaraan kompetisi olahraga di tingkat provinsi.",
    category: "pedoman",
    date: "2024-08-20",
    fileUrl: "#",
  },
]

// Functions to get data from Strapi API

// Get latest news
export async function getLatestNews(limit = 3): Promise<BlogPost[]> {
  try {
    return await getStrapiLatestNews(limit)
  } catch (error) {
    console.error("Error fetching latest news:", error)
    return []
  }
}

// Get latest infographics
export async function getLatestInfographics(limit = 3): Promise<BlogPost[]> {
  try {
    return await getStrapiLatestInfographics(limit)
  } catch (error) {
    console.error("Error fetching latest infographics:", error)
    return []
  }
}

// Get all news
export async function getAllNews(): Promise<BlogPost[]> {
  try {
    return await getStrapiAllNews()
  } catch (error) {
    console.error("Error fetching all news:", error)
    return []
  }
}

// Get all infographics
export async function getAllInfographics(): Promise<BlogPost[]> {
  try {
    return await getStrapiAllInfographics()
  } catch (error) {
    console.error("Error fetching all infographics:", error)
    return []
  }
}

// Get news detail by slug
export async function getNewsDetail(slug: string): Promise<BlogPost> {
  return await getStrapiNewsDetail(slug)
}

// Get infographic detail by slug
export async function getInfographicDetail(slug: string): Promise<BlogPost> {
  return await getStrapiInfographicDetail(slug)
}

// Get pejabat list
export async function getPejabatList(): Promise<Pejabat[]> {
  try {
    return await getStrapiPejabatList()
  } catch (error) {
    console.error("Error fetching pejabat list:", error)
    return []
  }
}

// Get contact info
export async function getContactInfo(): Promise<ContactInfo | null> {
  try {
    return await getStrapiContactInfo()
  } catch (error) {
    console.error("Error fetching contact info:", error)
    return null
  }
}

// Get documents (still using mock data)
export async function getDocuments(): Promise<Document[]> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  // Sort by date (newest first)
  return documentData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

