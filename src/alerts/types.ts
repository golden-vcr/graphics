export type Alert = 
    { type: 'follow', data: AlertDataFollow }
  | { type: 'raid', data: AlertDataRaid }
  | { type: 'generated-images', data: AlertDataGeneratedImages }

export type AlertDataFollow = {
  username: string
}

export type AlertDataRaid = {
  username: string
  numViewers: number
}

export type AlertDataGeneratedImages = {
  username: string
  description: string
  urls: string[]
}

export function parseAlert(data: unknown): Alert {
  if (typeof data !== "object") {
    throw new Error("invalid alert: data is not an object")
  }
  const obj = data as { [key: string]: unknown }

  // Alert.type
  if (typeof obj["type"] !== "string" || obj["type"] === "") {
    throw new Error("invalid alert: non-empty 'type' field is required")
  }
  const type = obj["type"]

  // Alert.data
  switch (type) {
    case 'follow':
      return { type, data: parseAlertDataFollow(obj["data"]) }
    case 'raid':
      return { type, data: parseAlertDataRaid(obj["data"]) }
    case 'generated-images':
      return { type, data: parseAlertDataGeneratedImages(obj["data"]) }
  }
  throw new Error(`invalid alert: unrecognized type '${type}'`)
}

function parseAlertDataFollow(data: unknown): AlertDataFollow {
  if (typeof data !== "object") {
    throw new Error("invalid data for follow alert: data is not an object")
  }
  const obj = data as { [key: string]: unknown }

  // AlertDataFollow.username
  if (typeof obj["username"] !== "string" || obj["username"] === "") {
    throw new Error("invalid data for follow alert: non-empty 'username' field is required")
  }
  const username = obj["username"]
  
  return { username }
}

function parseAlertDataRaid(data: unknown): AlertDataRaid {
  if (typeof data !== "object") {
    throw new Error("invalid data for raid alert: data is not an object")
  }
  const obj = data as { [key: string]: unknown }

  // AlertDataRaid.username
  if (typeof obj["username"] !== "string" || obj["username"] === "") {
    throw new Error("invalid data for raid alert: non-empty 'username' field is required")
  }
  const username = obj["username"]

  // AlertDataRaid.numViewers
  if (typeof obj["numViewers"] !== "number") {
    throw new Error("invalid data for raid alert: numreic 'numViewers' field is required")
  }
  const numViewers = obj["numViewers"]
  
  return { username, numViewers }
}

function parseAlertDataGeneratedImages(data: unknown): AlertDataGeneratedImages {
  if (typeof data !== "object") {
    throw new Error("invalid data for generated images alert: data is not an object")
  }
  const obj = data as { [key: string]: unknown }

  // AlertDataGeneratedImages.username
  if (typeof obj["username"] !== "string" || obj["username"] === "") {
    throw new Error("invalid data for generated images alert: non-empty 'username' field is required")
  }
  const username = obj["username"]

  // AlertDataGeneratedImages.description
  if (typeof obj["description"] !== "string" || obj["description"] === "") {
    throw new Error("invalid data for generated images alert: non-empty 'description' field is required")
  }
  const description = obj["description"]

  // AlertDataGeneratedImages.urls
  const urls = [] as string[]
  if (!Array.isArray(obj["urls"])) {
    throw new Error("invalid data for generated images alert: 'urls' array is required")
  }
  for (const url of obj["urls"]) {
    if (typeof url !== "string" || !url) {
      throw new Error("invalid data for generated images alert: all items in 'urls' array must be non-empty strings")
    }
    urls.push(url)
  }
  if (urls.length === 0) {
    throw new Error("invalid data for generated images alert: 'urls' array must have at least one item")
  }
  
  return { username, description, urls }
}
