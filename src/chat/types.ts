export type ChatEvent = {
  type: 'append'
  payload: ChatPayloadAppend
} | {
  type: 'delete'
  payload: ChatPayloadDelete
} | {
  type: 'ban'
  payload: ChatPayloadBan
} | {
  type: 'clear'
}

export type ChatPayloadAppend = {
  messageId: string
  userId: string
  username: string
  color: string
  text: string
  emotes: EmoteDetails[]
}

type EmoteDetails = {
  name: string
  url: string
}

type ChatPayloadDelete = {
  messageId: string
}

type ChatPayloadBan = {
  userId: string
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
    case "append":
      return { type: eventType, payload: parseChatPayloadAppend(obj["payload"]) }
    case "delete":
      return { type: eventType, payload: parseChatPayloadDelete(obj["payload"] )}
    case "ban":
      return { type: eventType, payload: parseChatPayloadBan(obj["payload"]) }
    case "clear":
      return { type: eventType }
  }
  throw new Error(`invalid chat event: unrecognized type '${eventType}'`)
}

function parseChatPayloadAppend(data: unknown): ChatPayloadAppend {
  if (typeof data !== "object") {
    throw new Error("invalid payload for append event: data is not an object")
  }
  const obj = data as { [key: string]: unknown }

  // ChatPayloadAppend.messageId
  if (typeof obj["messageId"] !== "string" || obj["messageId"] === "") {
    throw new Error("invalid payload for append event: non-empty 'messageId' field is required")
  }
  const messageId = obj["messageId"]

  // ChatPayloadAppend.userId
  if (typeof obj["userId"] !== "string" || obj["userId"] === "") {
    throw new Error("invalid payload for append event: non-empty 'userId' field is required")
  }
  const userId = obj["userId"]
  
  // ChatPayloadAppend.username
  if (typeof obj["username"] !== "string" || obj["username"] === "") {
    throw new Error("invalid payload for append event: non-empty 'username' field is required")
  }
  const username = obj["username"]
  
  // ChatPayloadAppend.color
  let color = "#eeeeee"
  if (typeof obj["color"] === "string" && obj["color"] !== "") {
    color = obj["color"]
  }
  
  // ChatPayloadAppend.text
  if (typeof obj["text"] !== "string" || obj["text"] === "") {
    throw new Error("invalid payload for append event: non-empty 'text' field is required")
  }
  const text = obj["text"]

  // ChatPayloadAppend.emotes
  const emotes = [] as EmoteDetails[]
  if (!Array.isArray(obj["emotes"])) {
    throw new Error("invalid payload for append event: 'emotes' array is required")
  }
  for (const emoteData of obj["emotes"]) {
    emotes.push(parseEmoteDetails(emoteData))
  }

  return { messageId, userId, username, color, text, emotes }
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

function parseChatPayloadDelete(data: unknown): ChatPayloadDelete {
  if (typeof data !== "object") {
    throw new Error("invalid payload for delete event: data is not an object")
  }
  const obj = data as { [key: string]: unknown }

  // ChatPayloadDelete.messageId
  if (typeof obj["messageId"] !== "string" || obj["messageId"] === "") {
    throw new Error("invalid payload for delete event: non-empty 'messageId' field is required")
  }
  const messageId = obj["messageId"]

  return { messageId }
}

function parseChatPayloadBan(data: unknown): ChatPayloadBan {
  if (typeof data !== "object") {
    throw new Error("invalid payload for ban event: data is not an object")
  }
  const obj = data as { [key: string]: unknown }

  // ChatPayloadBan.userId
  if (typeof obj["userId"] !== "string" || obj["userId"] === "") {
    throw new Error("invalid payload for ban event: non-empty 'userId' field is required")
  }
  const userId = obj["userId"]

  return { userId }
}
