import { type Writable, type Readable } from "svelte/store"

import { parseChatEvent, type ChatEvent, type ChatPayloadAppend } from "./types"

export { type ChatEvent, type ChatPayloadAppend } from "./types"

export class ChatClient {
  source: EventSource
  
  constructor(onEvent: (event: ChatEvent) => void) {
    this.source = new EventSource('/api/chatbot/chatlog')
    this.source.addEventListener('message', (ev) => {
      const data = JSON.parse(ev.data)
      const event = parseChatEvent(data)
      onEvent(event)
    })
  }
  
  stop() {
    this.source.close()
  }
}

export class ChatLog {
  private _client: ChatClient
  private _capacity: number
  private _messages: Writable<ChatPayloadAppend[]>

  constructor(capacity: number, messages: Writable<ChatPayloadAppend[]>) {
    this._capacity = capacity
    this._messages = messages
    this._client = new ChatClient((event) => { this.handleEvent(event) })
  }

  stop() {
    this._client.stop()
  }

  simulateEvent(event: ChatEvent) {
    this.handleEvent(event)
  }

  private handleEvent(event: ChatEvent) {
    switch (event.type) {
    case "append":
      this._messages.update((prev) => (
        prev.slice(prev.length - this._capacity - 1).concat([event.payload])
      ))
      break
    case "delete":
      this._messages.update((prev) => (
        prev.filter((x) => x.messageId !== event.payload.messageId)
      ))
      break
    case "ban":
      this._messages.update((prev) => (
        prev.filter((x) => x.userId !== event.payload.userId)
      ))
      break
    case "clear":
      this._messages.set([])
      break
    }
  }
}
