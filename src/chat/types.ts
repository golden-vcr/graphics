export type ChatLine = {
  name: string
  color: string
  text: string
  emotes: EmoteDetails[]
}

export type EmoteDetails = {
  name: string
  url: string
}

export function parseChatLine(data: unknown): ChatLine {
  if (typeof data !== "object") {
    throw new Error("invalid chat line: data is not an object")
  }
  const obj = data as { [key: string]: unknown }
  
  // ChatLine.name
  if (typeof obj["name"] !== "string" || obj["name"] === "") {
    throw new Error("invalid chat line: non-empty 'name' field is required")
  }
  const name = obj["name"]
  
  // ChatLine.color
  if (typeof obj["color"] !== "string" || obj["color"] === "") {
    throw new Error("invalid chat line: non-empty 'color' field is required")
  }
  const color = obj["color"]
  
  // ChatLine.text
  if (typeof obj["text"] !== "string" || obj["text"] === "") {
    throw new Error("invalid chat line: non-empty 'text' field is required")
  }
  const text = obj["text"]

  // ChatLine.emotes
  const emotes = [] as EmoteDetails[]
  if (!Array.isArray(obj["emotes"])) {
    throw new Error("invalid chat line: 'emotes' array is required")
  }
  for (const emoteData of obj["emotes"]) {
    emotes.push(parseEmoteDetails(emoteData))
  }

  return { name, color, text, emotes }
}

function parseEmoteDetails(data: unknown): EmoteDetails {
  if (typeof data !== "object") {
    throw new Error("invalid emote details: data is not an object")
  }
  const obj = data as { [key: string]: unknown }

  // EmoteDetails.name
  if (typeof obj["name"] !== "string" || obj["name"] === "") {
    throw new Error("invalid emote details: non-empty 'name' field is required")
  }
  const name = obj["name"]

  // EmoteDetails.url
  let url = ""
  if (typeof obj["url"] === "string") {
    url = obj["url"]
  }

  return { name, url }
}
