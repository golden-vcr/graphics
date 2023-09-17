export type Alert = 
    { type: 'follow', data: AlertDataFollow }
  | { type: 'raid', data: AlertDataRaid }

export type AlertDataFollow = {
  username: string
}

export type AlertDataRaid = {
  username: string
  numViewers: number
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
