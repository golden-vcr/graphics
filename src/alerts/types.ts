export type OnscreenEvent =
    { type: 'status', payload: PayloadStatus }
  | { type: 'toast', payload: PayloadToast }
  | { type: 'image', payload: PayloadImage }

export type PayloadStatus = {
  currentTapeId: number
}

export type PayloadToast = 
    { type: 'followed', viewer: Viewer }
  | { type: 'raided', viewer: Viewer, data: ToastDataRaided }
  | { type: 'cheered', viewer: Viewer | null, data: ToastDataCheered }
  | { type: 'subscribed', viewer: Viewer }
  | { type: 'resubscribed', viewer: Viewer, data: ToastDataResubscribed }
  | { type: 'gifted-subs', viewer: Viewer | null, data: ToastDataGiftedSubs }

export type Viewer = {
  twitchUserId: string
  twitchDisplayName: string
}

export type ToastDataRaided = {
  numViewers: number
}

export type ToastDataCheered = {
  numBits: number
  message: string
}

export type ToastDataResubscribed = {
  numCumulativeMonths: number
  message: string
}

export type ToastDataGiftedSubs = {
  numSubscriptions: number
}

export type PayloadImage = {
  viewer: Viewer
  style: 'ghost'
  description: string
  imageUrl: string
}

export function parseOnscreenEvent(data: unknown): OnscreenEvent {
  if (typeof data !== "object") {
    throw new Error("invalid onscreen event: data is not an object")
  }
  const obj = data as { [key: string]: unknown }

  // OnscreenEvent.type
  if (typeof obj["type"] !== "string" || obj["type"] === "") {
    throw new Error("invalid onscreen event: non-empty 'type' field is required")
  }
  const type = obj["type"]

  // OnscreenEvent.payload
  switch (type) {
    case 'status':
      return { type, payload: parsePayloadStatus(obj["payload"]) }
    case 'toast':
      return { type, payload: parsePayloadToast(obj["payload"]) }
    case 'image':
      return { type, payload: parsePayloadImage(obj["payload"]) }
  }
  throw new Error(`invalid onscreen event: unrecognized type '${type}'`)
}

function parsePayloadStatus(data: unknown): PayloadStatus {
  if (typeof data !== "object") {
    throw new Error("invalid status event payload: data is not an object")
  }
  const obj = data as { [key: string]: unknown }

  // PayloadStatus.current_tape_id
  if (typeof obj["current_tape_id"] !== "number") {
    throw new Error("invalid status event payload: numeric 'current_tape_id' field is required")
  }
  const currentTapeId = obj["current_tape_id"]

  return { currentTapeId }
}

function parsePayloadToast(data: unknown): PayloadToast {
  if (typeof data !== "object") {
    throw new Error("invalid toast event payload: data is not an object")
  }
  const obj = data as { [key: string]: unknown }

  // PayloadToast.type
  if (typeof obj["type"] !== "string" || obj["type"] === "") {
    throw new Error("invalid toast event payload: non-empty 'type' field is required")
  }
  const type = obj["type"]

  // PayloadToast.viewer | PayloadToast.data
  switch (type) {
    case 'followed':
      return { type, viewer: parseViewer(obj["viewer"]) }
    case 'raided':
      return { type, viewer: parseViewer(obj["viewer"]), data: parseToastDataRaided(obj["data"]) }
    case 'cheered':
      return { type, viewer: !!obj["viewer"] ? parseViewer(obj["viewer"]) : null, data: parseToastDataCheered(obj["data"]) }
    case 'subscribed':
      return { type, viewer: parseViewer(obj["viewer"]) }
    case 'resubscribed':
      return { type, viewer: parseViewer(obj["viewer"]), data: parseToastDataResubscribed(obj["data"]) }
    case 'gifted-subs':
      return { type, viewer: !!obj["viewer"] ? parseViewer(obj["viewer"]) : null, data: parseToastDataGiftedSubs(obj["data"]) }
  }
  throw new Error(`invalid toast event payload: unrecognized type '${type}'`)
}

function parseViewer(data: unknown): Viewer {
  if (typeof data !== "object") {
    throw new Error("invalid viewer: data is not an object")
  }
  const obj = data as { [key: string]: unknown }

  // Viewer.twitch_user_id
  if (typeof obj["twitch_user_id"] !== "string" || obj["twitch_user_id"] === "") {
    throw new Error("invalid viewer: non-empty 'twitch_user_id' field is required")
  }
  const twitchUserId = obj["twitch_user_id"]

  // Viewer.twitch_display_name
  if (typeof obj["twitch_display_name"] !== "string" || obj["twitch_display_name"] === "") {
    throw new Error("invalid viewer: non-empty 'twitch_display_name' field is required")
  }
  const twitchDisplayName = obj["twitch_display_name"]

  return { twitchUserId, twitchDisplayName }
}

function parseToastDataRaided(data: unknown): ToastDataRaided {
  if (typeof data !== "object") {
    throw new Error("invalid 'raided' toast: data is not an object")
  }
  const obj = data as { [key: string]: unknown }

  // ToastDataRaided.num_viewers
  if (typeof obj["num_viewers"] !== "number") {
    throw new Error("invalid 'raided' toast: numeric 'num_viewers' field is required")
  }
  const numViewers = obj["num_viewers"]

  return { numViewers }
}

function parseToastDataCheered(data: unknown): ToastDataCheered {
  if (typeof data !== "object") {
    throw new Error("invalid 'cheered' toast: data is not an object")
  }
  const obj = data as { [key: string]: unknown }

  // ToastDataCheered.num_bits
  if (typeof obj["num_bits"] !== "number") {
    throw new Error("invalid 'cheered' toast: numeric 'num_bits' field is required")
  }
  const numBits = obj["num_bits"]

  // ToastDataCheered.message
  if (typeof obj["message"] !== "string") {
    throw new Error("invalid 'cheered' toast: string 'message' field is required")
  }
  const message = obj["message"]

  return { numBits, message }
}

function parseToastDataResubscribed(data: unknown): ToastDataResubscribed {
  if (typeof data !== "object") {
    throw new Error("invalid 'resubscribed' toast: data is not an object")
  }
  const obj = data as { [key: string]: unknown }

  // ToastDataResubscribed.num_cumulative_months
  if (typeof obj["num_cumulative_months"] !== "number") {
    throw new Error("invalid 'resubscribed' toast: numeric 'num_cumulative_months' field is required")
  }
  const numCumulativeMonths = obj["num_cumulative_months"]

  // ToastDataResubscribed.message
  if (typeof obj["message"] !== "string") {
    throw new Error("invalid 'resubscribed' toast: string 'message' field is required")
  }
  const message = obj["message"]

  return { numCumulativeMonths, message }
}

function parseToastDataGiftedSubs(data: unknown): ToastDataGiftedSubs {
  if (typeof data !== "object") {
    throw new Error("invalid 'gifted-subs' toast: data is not an object")
  }
  const obj = data as { [key: string]: unknown }

  // ToastDataResubscribed.num_subscriptions
  if (typeof obj["num_subscriptions"] !== "number") {
    throw new Error("invalid 'gifted-subs' toast: numeric 'num_subscriptions' field is required")
  }
  const numSubscriptions = obj["num_subscriptions"]

  return { numSubscriptions }
}

function parsePayloadImage(data: unknown): PayloadImage {
  if (typeof data !== "object") {
    throw new Error("invalid image event payload: data is not an object")
  }
  const obj = data as { [key: string]: unknown }

  // PayloadImage.viewer
  const viewer = parseViewer(obj["viewer"])

  // PayloadImage.style
  if (typeof obj["style"] !== "string") {
    throw new Error("invalid image event payload: non-empty 'style' field is required")
  }
  const style = obj["style"]
  if (style !== "ghost") {
    throw new Error(`invalid image event payload: unexpected 'style' value '${style}'`)
  }

  // PayloadImage.description
  if (typeof obj["description"] !== "string") {
    throw new Error("invalid image event payload: non-empty 'description' field is required")
  }
  const description = obj["description"]

  // PayloadImage.image_url
  if (typeof obj["image_url"] !== "string") {
    throw new Error("invalid image event payload: non-empty 'image_url' field is required")
  }
  const imageUrl = obj["image_url"]

  return { viewer, style, description, imageUrl }
}
