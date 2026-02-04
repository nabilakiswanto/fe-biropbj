import { fetchAPI } from "./api"

export interface MenuItem {
  id: number
  title: string
  slug?: string
  order: number
  isExternal: boolean
  externalUrl?: string
  children: MenuItem[]
}

export interface Menu {
  id: number
  name: string
  slug: string
  items: MenuItem[]
}

export async function getMenu(): Promise<Menu | null> {
  try {
    // console.log("🔍 Fetching all menus")

    const data = await fetchAPI("menus", {
      populate: "*",
    })

    // console.log("📦 Raw menu response:", JSON.stringify(data, null, 2))

    if (!data.data || data.data.length === 0) {
      console.error("No menus found")
      return null
    }

    const items = transformMenuItems(data.data)

    const menu: Menu = {
      id: 1,
      name: "Main Menu",
      slug: "main-menu",
      items,
    }

    return menu
  } catch (error) {
    console.error("Error fetching menu:", error)
    return null
  }
}

function transformMenuItems(flatItems: any[]): MenuItem[] {
  if (!flatItems || flatItems.length === 0) return []

  const map: Record<number, MenuItem> = {}

  // First, build all items
  flatItems.forEach((item) => {
    map[item.id] = {
      id: item.id,
      title: item.title,
      slug: item.slug,
      order: item.order ?? 0,
      isExternal: item.isExternal ?? false,
      externalUrl: item.externalUrl ?? null,
      children: [],
    }
  })

  // Then assign children
  flatItems.forEach((item) => {
    const parentId = item.parent?.id ?? null
    if (parentId && map[parentId]) {
      map[parentId].children.push(map[item.id])
    }
  })

  // Only return top-level items (parent === null)
  const rootItems = flatItems
    .filter((item) => item.parent === null)
    .map((item) => map[item.id])

  // Sort by order
  const sortByOrder = (a: MenuItem, b: MenuItem) => a.order - b.order
  const sortMenu = (items: MenuItem[]): MenuItem[] =>
    items
      .sort(sortByOrder)
      .map((item) => ({
        ...item,
        children: sortMenu(item.children),
      }))

  return sortMenu(rootItems)
}
