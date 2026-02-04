import qs from "qs";

// Define the Strapi API URL and token from environment variables
const STRAPI_API_URL_PRIMARY = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
const STRAPI_API_URL_FALLBACK = process.env.NEXT_PUBLIC_STRAPI_API_SULUT || ""
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN
const STRAPI_API_TOKEN_SULUT = process.env.STRAPI_API_TOKEN_SULUT

// Update the fetchAPI function to include dynamic zone components
async function fetchAPI(endpoint: string, params?: Record<string, any>, useFallback = false) {
  const BASE_URL = useFallback ? STRAPI_API_URL_FALLBACK : STRAPI_API_URL_PRIMARY
  const TOKEN = useFallback ? STRAPI_API_TOKEN_SULUT : STRAPI_API_TOKEN
  
  const queryString = params ? qs.stringify(params, { encodeValuesOnly: true }) : ""
  const url = `${BASE_URL}/api/${endpoint}${queryString ? `?${queryString}` : ""}`

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  }

  // Only add Authorization header if token exists
  if (TOKEN) {
    headers["Authorization"] = `Bearer ${TOKEN}`
  }

  const res = await fetch(url, {
    headers,
    next: { revalidate: 5 },
  })

  if (!res.ok) {
    const errorText = await res.text()
    console.error(`Failed to fetch from ${useFallback ? 'fallback' : 'primary'} API:`, errorText)
    throw new Error(`Failed to fetch data from Strapi API: ${res.status}`)
  }

  return res.json()
}
async function fetchAPIWithFallback(endpoint: string, params?: Record<string, any>) {
  try {
    const data = await fetchAPI(endpoint, params, false)
    
    if (!data.data || (Array.isArray(data.data) && data.data.length === 0)) {
      console.log(`No data from primary API for ${endpoint}, trying fallback...`)
      const fallbackData = await fetchAPI(endpoint, params, true)
      // Mark data as coming from fallback
      fallbackData._apiSource = STRAPI_API_URL_FALLBACK
      return fallbackData
    }
    
    // Mark data as coming from primary
    data._apiSource = STRAPI_API_URL_PRIMARY
    return data
  } catch (error) {
    console.error(`Primary API failed for ${endpoint}, trying fallback...`, error)
    try {
      const fallbackData = await fetchAPI(endpoint, params, true)
      fallbackData._apiSource = STRAPI_API_URL_FALLBACK
      return fallbackData
    } catch (fallbackError) {
      console.error(`Fallback API also failed for ${endpoint}`, fallbackError)
      throw fallbackError
    }
  }
}

// Update getStrapiPostsByCategory to pass API source
export async function getStrapiPostsByCategory(category: string, limit?: number) {
  const params: Record<string, any> = {
    sort: "id:desc",
    populate: "*",
  }

  if (category === "berita") {
    params["filters[category][seoUrl][$eq]"] = "berita"
  } else if (category === "infografis") {
    params["filters[category][seoUrl][$eq]"] = "infografis"
  }

  if (limit) {
    params["pagination[limit]"] = limit
  }

  const data = await fetchAPIWithFallback("posts", params)
  const apiSource = data._apiSource || STRAPI_API_URL_PRIMARY
  
  return data.data.map((item: any) => transformStrapiPostData(item, apiSource))
}

// Update transformStrapiPostData to accept apiSource parameter
function transformStrapiPostData(item: any, apiSource: string = STRAPI_API_URL_PRIMARY) {
  const data = item

  // Handle image URL
  let imageUrl = "/placeholder.svg?height=400&width=600"
  if (data.thumbnail) {
    const imageData = data.thumbnail
    const mediumUrl = imageData.formats?.medium?.url
    const url = mediumUrl || imageData.url

    // Use the apiSource parameter
    imageUrl = url.startsWith("http") ? url : `${apiSource}${url}`
  }

  const categoryValue = data.category?.seoUrl || "uncategorized"
  const dynamicComponents = data.attachment || []

  return {
    id: data.id,
    title: data.judul,
    slug: data.seoUrl,
    excerpt: data.konten?.substring(0, 150) + "..." || "",
    content: data.konten,
    date: data.tanggal_postingan || data.publishedAt,
    imageUrl,
    category: categoryValue,
    dynamicComponents,
  }
}


// Function to get all posts from Strapi
export async function getStrapiAllPosts() {
  const data = await fetchAPI("posts", {
    sort: "tanggal_postingan:desc",
    populate: "*",
  })

  return data.data.map(transformStrapiPostData)
}

// Update the getStrapiPostDetail function to include dynamic zone components
export async function getStrapiPostDetail(slug: string) {
  const data = await fetchAPIWithFallback("posts", {
    "filters[seoUrl][$eq]": slug,
    "populate[0]": "thumbnail",
    "populate[1]": "category",
  })

  if (!data.data || data.data.length === 0) {
    throw new Error(`Post with slug "${slug}" not found`)
  }

  const apiSource = data._apiSource || STRAPI_API_URL_PRIMARY
  return transformStrapiPostData(data.data[0], apiSource)
}

// Function to get latest posts from Strapi
export async function getStrapiLatestPosts(limit = 3) {
  const data = await fetchAPI("posts", {
    sort: "tanggal_postingan:desc",
    "pagination[limit]": limit,
    populate: "*",
  })

  return data.data.map(transformStrapiPostData)
}

// Legacy functions for backward compatibility
export const getStrapiLatestNews = (limit = 3) => getStrapiPostsByCategory("berita", limit)

export const getStrapiAllNews = () => getStrapiPostsByCategory("berita")

export const getStrapiNewsDetail = (slug: string) => getStrapiPostDetail(slug)

export const getStrapiLatestInfographics = (limit = 3) => getStrapiPostsByCategory("infografis", limit)

export const getStrapiAllInfographics = () => getStrapiPostsByCategory("infografis")

export const getStrapiInfographicDetail = (slug: string) => getStrapiPostDetail(slug)

// Function to get pejabat list from Strapi
export async function getStrapiPejabatList() {
  const data = await fetchAPI("profil-pejabat", {
    populate: "*",
  });

  const pejabat = data.data;

  if (!pejabat) throw new Error("Profil Pejabat not found");

  const { id, judul, konten, attachment } = pejabat;

  // Default image placeholder
  let imageUrl = "/placeholder.svg?height=200&width=200";

  // Check if attachment exists and has a valid URL
  if (attachment) {
    const mediumUrl = attachment.formats?.medium?.url;
    const fallbackUrl = attachment.url;
    const selectedUrl = mediumUrl || fallbackUrl;

    imageUrl = selectedUrl.startsWith("http")
      ? selectedUrl
      : `${STRAPI_API_URL_PRIMARY}${selectedUrl}`;
  }

  return {
    id,
    judul,
    konten,
    imageUrl,
  };
}

// Function to get contact information from Strapi
export async function getStrapiContactInfo() {
  const data = await fetchAPI("kontak")

  if (!data?.data) {
    throw new Error("Contact information not found")
  }

  const contact = data.data

  return {
    judul: contact.judul,
    address: contact.address,
    phone: contact.phone,
    googleMapsUrl: contact.googleMapsUrl,
  }
}

// Function to get documents from Strapi
export async function getStrapiDocuments() {
  const data = await fetchAPI("documents", {
    sort: "publishedAt:desc",
    populate: "file",
  })

  return data.data.map((item: any) => {
    const { id, attributes } = item

    // Handle file URL
    let fileUrl = "#"
    if (attributes.file && attributes.file.data) {
      const { url } = attributes.file.data.attributes
      fileUrl = url.startsWith("http") ? url : `${STRAPI_API_URL_PRIMARY}${url}`
    }

    return {
      id,
      title: attributes.title,
      description: attributes.description,
      category: attributes.category,
      date: attributes.publishedAt || attributes.createdAt,
      fileUrl,
    }
  })
}
//fetch home page
// Function to get home page data with dynamic zone blocks
export async function getStrapiHomePage() {
  const params = {
    populate: {
      blocks: {
        populate: "*",
      },
      ListApps: {
        populate: {
          link: {
            populate: {
              logo: {
                populate: "*", // This populates the logo media field
              },
            },
          },
        },
      },
    },
  }

  const data = await fetchAPIWithFallback("home-page", params)

  if (!data.data) {
    throw new Error("Home page data not found")
  }

  const apiSource = data._apiSource || STRAPI_API_URL_PRIMARY

  return {
    id: data.data.id,
    documentId: data.data.documentId,
    title: data.data.title,
    description: data.data.description,
    createdAt: data.data.createdAt,
    updatedAt: data.data.updatedAt,
    publishedAt: data.data.publishedAt,
    blocks: data.data.blocks || [],
    ListApps: data.data.ListApps || { link: [], list_app: [] },
    apiSource,
  }
}


// Function to get global site data (header and footer)
export async function getStrapiGlobal() {
  const data = await fetchAPI("global", {
    populate: {
      header: {
        populate: {
          logo: {
            populate: "image",
          },
        },
      },
      footer: {
        populate: {
          logo: {
            populate: "image",
          },
          links: true,
          socmed:true,
        },
      },
    },
  })

  if (!data.data) {
    throw new Error("Global data not found")
  }

  const { id, documentId, title, description, namaOPD, header, footer, createdAt, updatedAt, publishedAt } = data.data

  return {
    id,
    documentId,
    title,
    description,
    namaOPD,
    createdAt,
    updatedAt,
    publishedAt,
    header,
    footer,
  }
}
// Function to get visi dan misi information from Strapi
export async function getStrapiVisiMisi() {
  const data = await fetchAPI("visi-dan-misi")

  if (!data?.data) {
    throw new Error("information not found")
  }

  const visimisi = data.data

  return {
    judul: visimisi.judul,
    konten: visimisi.konten,
  }
}
// Function to get struktur organisasi information from Strapi
export async function getStrapiStrukturOrganisasi() {
  const data = await fetchAPI("struktur-organisasi", {
    populate: "*"
  });

  let imageUrl = "/placeholder.svg?height=400&width=600";

  if (!data?.data) {
    throw new Error("information not found");
  }

  const so = data.data;

  // Ensure attachments exist and pick the first one
  const firstAttachment = so.attachment?.[0];

  if (firstAttachment?.url) {
    const imageData = firstAttachment;
    const mediumUrl = imageData.formats?.medium?.url;
    const url = mediumUrl || imageData.url;

    imageUrl = url.startsWith("http") ? url : `${STRAPI_API_URL_PRIMARY}${url}`;
  }

  return {
    judul: so.judul,
    deskripsi: so.deskripsi,
    imageUrl
  };
}
// Function to get dokumen information from Strapi
export async function getStrapiDokumen() {
  const data = await fetchAPI("dokumens", {
    populate: "*"
  });

  if (!data?.data) {
    throw new Error("Dokumen tidak ditemukan");
  }

  return data.data.map((item: any) => {
    const { id, judul, seoUrl, konten, category, attachment } = item;

    let dokumenUrl = "";

    if (attachment && attachment.length > 0) {
      const firstAttachment = attachment[0];
      const url = firstAttachment.url;
      dokumenUrl = url.startsWith("http") ? url : `${STRAPI_API_URL_PRIMARY}${url}`;
    }

    return {
      id,
      judul,
      seoUrl,
      category,
      konten,
      dokumenUrl
    };
  });
}
// Get all pages (for static params or menu rendering)
export async function getStrapiPages() {
  const data = await fetchAPI("pages", {
    populate: "*",
  });

  if (!data?.data) {
    throw new Error("Pages not found");
  }

  return data.data.map((item: any) => {
    const { title, slug, image, description } = item;

    return {
      title : title,
      slug: slug,
      image: image,
      desc : description
    };
  });
}

// Get single page by slug
export async function getStrapiPageBySlug(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/pages?filters[slug][$eq]=${slug}&populate=*`,
    { next: { revalidate: 60 } }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch page")
  }

  const data = await res.json()
  const pageData = data.data[0]

  if (!pageData) return null

  const { title, slug: pageSlug, content, image, description } = pageData

  // Only set imageUrl if image exists, otherwise null
  let imageUrl = null
  if (image?.url) {
    imageUrl = image.url.startsWith("http")
      ? image.url
      : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${image.url}`
  }

  return {
    title: title,
    slug: pageSlug,
    content: content, 
    image: image,
    desc: description,
    imageUrl: imageUrl // Now returns null if no image
  }
}


export { fetchAPI }