export async function fetchCatalogListing(): Promise<CatalogListing> {
  const url = '/api/tapes/catalog'
  const r = await fetch(url)
  if (!r.ok) {
    let suffix = ''
    try {
      const message = await r.text()
      suffix = `: ${message}`
    } catch (ignored) {
    }
    throw new Error(`Got ${r.status} response from ${url}${suffix}`)
  }
  const data = await r.json()
  return parseCatalogListing(data)
}

export async function fetchCatalogItem(tapeId: number): Promise<CatalogItem> {
  const url = `/api/tapes/catalog/${parseInt(String(tapeId))}`
  const r = await fetch(url)
  if (!r.ok) {
    let suffix = ''
    try {
      const message = await r.text()
      suffix = `: ${message}`
    } catch (ignored) {
    }
    throw new Error(`Got ${r.status} response from ${url}${suffix}`)
  }
  const data = await r.json()
  return parseCatalogItem(data)
}

export type CatalogListing = {
  imageHost: string
  items: CatalogItem[]
}

export type CatalogItem = {
  id: number
  title: string
  year: number
  runtime: number
  thumbnail: string
  images: GalleryImage[]
  tags: string[]
}

export type GalleryImage = {
  filename: string
  width: number
  height: number
  color: string
  rotated: boolean
}

const HEX_COLOR_REGEX = /^#[a-zA-Z0-9]{3}(?:[a-zA-Z0-9]{3})?$/

function parseCatalogListing(data: unknown): CatalogListing {
  if (typeof data !== "object") {
    throw new Error("invalid tape listing: data is not an object")
  }
  const obj = data as { [key: string]: unknown }

  // CatalogListing.items
  if (!Array.isArray(obj["items"])) {
    throw new Error("invalid tape listing: 'items' array is required")
  }
  const items = [] as CatalogItem[]
  for (const itemData of obj["items"]) {
    items.push(parseCatalogItem(itemData))
  }

  // CatalogListing.imageHost
  if (typeof obj["imageHost"] !== "string" || obj["imageHost"] === "") {
    throw new Error("invalid tape: non-empty 'imageHost' field is required")
  }
  const imageHost = obj["imageHost"]

  return { items, imageHost }
}

function parseCatalogItem(data: unknown): CatalogItem {
  if (typeof data !== "object") {
    throw new Error("invalid tape: data is not an object")
  }
  const obj = data as { [key: string]: unknown }

  // CatalogItem.id
  if (typeof obj["id"] !== "number") {
    throw new Error("invalid tape: numeric 'id' field is required")
  }
  const id = Math.trunc(obj["id"]);
  if (id <= 0) { 
    throw new Error("invalid tape: 'id' value must be greater than zero")
  }

  // CatalogItem.title
  if (typeof obj["title"] !== "string" || obj["title"] === "") {
    throw new Error("invalid tape: non-empty 'title' field is required")
  }
  const title = obj["title"]

  // CatalogItem.year
  if (typeof obj["year"] !== "number") {
    throw new Error("invalid tape: numeric 'year' field is required")
  }
  const year = obj["year"]

  // CatalogItem.runtime
  if (typeof obj["runtime"] !== "number") {
    throw new Error("invalid tape: numeric 'runtime' field is required")
  }
  const runtime = obj["runtime"]

  // CatalogItem.thumbnail
  if (typeof obj["thumbnail"] !== "string" || obj["thumbnail"] === "") {
    throw new Error("invalid tape: non-empty 'thumbnail' field is required")
  }
  const thumbnail = obj["thumbnail"]

  // CatalogItem.images
  const images = [] as GalleryImage[]
  if (!Array.isArray(obj["images"])) {
    throw new Error("invalid tape: 'images' array is required")
  }
  for (let i = 0; i < obj["images"].length; i++) {
    images.push(parseGalleryImage(obj["images"][i]))
  }

  // CatalogItem.tags
  const tags = [] as string[]
  if (!Array.isArray(obj["tags"])) {
    throw new Error("invalid tape: 'tags' array is required")
  }
  for (let i = 0; i < obj["tags"].length; i++) {
    const tag = obj["tags"][i]
    if (typeof tag !== "string" || tag === "") {
      throw new Error(`invalid tape: 'tags' item at index ${i} must be a non-empty string`)
    }
    tags.push(tag)
  }

  return { id, title, year, runtime, thumbnail, images, tags }
}

function parseGalleryImage(data: unknown): GalleryImage {
  if (typeof data !== "object") {
    throw new Error("invalid image data: data is not an object")
  }
  const obj = data as { [key: string]: unknown }

  // GalleryImage.filename
  if (typeof obj["filename"] !== "string" || obj["filename"] === "") {
    throw new Error("invalid image data: non-empty 'filename' field is required")
  }
  const filename = obj["filename"]

  // GalleryImage.width
  if (typeof obj["width"] !== "number") {
    throw new Error("invalid image data: numeric 'width' field is required")
  }
  const width = obj["width"]
  if (width <= 0) {
    throw new Error(`invalid image data: 'width' value must be positive (got ${width})`)
  }

  // GalleryImage.height
  if (typeof obj["height"] !== "number") {
    throw new Error("invalid image data: numeric 'height' field is required")
  }
  const height = obj["height"]
  if (height <= 0) {
    throw new Error(`invalid image data: 'height' value must be positive (got ${height})`)
  }

  // GalleryImage.color
  if (typeof obj["color"] !== "string" || obj["color"] === "") {
    throw new Error("invalid image data: non-empty 'color' field is required")
  }
  if (!obj["color"].match(HEX_COLOR_REGEX)) {
    throw new Error("invalid image data: 'color' must be a hex-formatted RGB value")
  }
  const color = obj["color"]

  // GalleryImage.rotated
  if (typeof obj["rotated"] !== "boolean") {
    throw new Error("invalid image data: boolean 'rotated' field is required")
  }
  const rotated = obj["rotated"]

  return {
    filename,
    width,
    height,
    color,
    rotated,
  }
}
