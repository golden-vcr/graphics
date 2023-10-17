import { fetchCatalogListing, fetchCatalogItem, type CatalogItem } from "./api";

type CatalogItemLookup = { [key: string]: CatalogItem }

export type Tape = {
  id: number
  title: string
  year?: number
  runtime?: number
  color: string
  thumbnailUrl: string
  images: TapeImage[]
  tags: string[]
}

export type TapeImage = {
  url: string
  width: number
  height: number
  displayRotatedCW: boolean
}

export class TapeCache {
  private initialized: boolean = false
  private imageHost: string = ''
  private tapesById: CatalogItemLookup = {}

  async init() {
    const listing = await fetchCatalogListing()
    this.imageHost = listing.imageHost
    for (const item of listing.items) {
      this.tapesById[String(item.id)] = item
    }
    this.initialized = true
  }

  async get(tapeId: number): Promise<Tape> {
    if (!this.initialized) {
      throw new Error('TapeCache.get called before TapeCache.init completed!')
    }
    const found = this.tapesById[tapeId]
    if (found) {
      return this.buildTape(found)
    }
    const item = await fetchCatalogItem(tapeId)
    this.tapesById[item.id] = item
    return this.buildTape(item)
  }

  private buildTape(item: CatalogItem): Tape {
    const images: TapeImage[] = item.images.map((image) => ({
      url: `${this.imageHost}/${image.filename}`,
      width: image.width,
      height: image.height,
      displayRotatedCW: image.rotated,
    }))
    return {
      id: item.id,
      title: item.title,
      year: item.year || undefined,
      runtime: item.runtime || undefined,
      color: item.images.length > 0 ? item.images[0].color : '#cccccc',
      thumbnailUrl: `${this.imageHost}/${item.thumbnail}`,
      images,
      tags: item.tags,
    }
  } 
}
