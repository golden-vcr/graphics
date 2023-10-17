export type ChatEvent = {
  type: 'message'
  message: ChatMessage
} | {
  type: 'deletion'
  deletion: ChatDeletion
} | {
  type: 'clear'
}

export type ChatMessage = {
  id: string
  username: string
  color: string
  text: string
  emotes: EmoteDetails[]
}

type EmoteDetails = {
  name: string
  url: string
}

type ChatDeletion = {
  messageIds: string[]
}

export function parseChatEvent(data: unknown): ChatEvent {
  if (typeof data !== "object") {
    throw new Error("invalid chat event: data is not an object")
  }
  const obj = data as { [key: string]: unknown }

  // ChatEvent.type
  if (typeof obj["type"] !== "string" || obj["type"] === "") {
    throw new Error("invalid chat event: non-empty 'type' field is required")
  }
  const eventType = obj["type"]

  switch (eventType) {
    case "message":
      return { type: eventType, message: parseChatMessage(obj["message"]) }
    case "deletion":
      return { type: eventType, deletion: parseChatDeletion(obj["deletion"] )}
    case "clear":
      return { type: eventType }
  }
  throw new Error(`invalid chat event: unrecognized type '${eventType}'`)
}

function parseChatMessage(data: unknown): ChatMessage {
  if (typeof data !== "object") {
    throw new Error("invalid chat message: data is not an object")
  }
  const obj = data as { [key: string]: unknown }

  // ChatMessage.id
  if (typeof obj["id"] !== "string" || obj["id"] === "") {
    throw new Error("invalid chat message: non-empty 'id' field is required")
  }
  const id = obj["id"]
  
  // ChatMessage.username
  if (typeof obj["username"] !== "string" || obj["username"] === "") {
    throw new Error("invalid chat message: non-empty 'username' field is required")
  }
  const username = obj["username"]
  
  // ChatMessage.color
  let color = "#eeeeee"
  if (typeof obj["color"] === "string" && obj["color"] !== "") {
    color = obj["color"]
  }
  
  // ChatMessage.text
  if (typeof obj["text"] !== "string" || obj["text"] === "") {
    throw new Error("invalid chat message: non-empty 'text' field is required")
  }
  const text = obj["text"]

  // ChatMessage.emotes
  const emotes = [] as EmoteDetails[]
  if (!Array.isArray(obj["emotes"])) {
    throw new Error("invalid chat message: 'emotes' array is required")
  }
  for (const emoteData of obj["emotes"]) {
    emotes.push(parseEmoteDetails(emoteData))
  }

  return { id, username, color, text, emotes }
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

function parseChatDeletion(data: unknown): ChatDeletion {
  if (typeof data !== "object") {
    throw new Error("invalid chat deletion: data is not an object")
  }
  const obj = data as { [key: string]: unknown }

  // ChatDeletion.messageIds
  const messageIds = [] as string[]
  if (!Array.isArray(obj["messageIds"])) {
    throw new Error("invalid chat deletion: 'messageIds' array is required")
  }
  for (const messageId of obj["messageIds"]) {
    if (typeof messageId !== "string" || messageId === "") {
      throw new Error("invalid chat deletion: 'messageIds' array must contain non-empty strings")
    }
    messageIds.push(messageId)
  }

  return { messageIds }
}
