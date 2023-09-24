import { type Writable, type Readable } from "svelte/store"

import { parseChatEvent, type ChatEvent, type ChatMessage } from "./types"

export { type ChatEvent, type ChatMessage } from "./types"

export class ChatClient {
  source: EventSource
  
  constructor(onEvent: (event: ChatEvent) => void) {
    this.source = new EventSource('/api/showtime/chat')
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
  private _messages: Writable<ChatMessage[]>

  constructor(capacity: number, messages: Writable<ChatMessage[]>) {
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
    case "message":
      this._messages.update((prev) => (
        prev.slice(prev.length - this._capacity - 1).concat([event.message])
      ))
      break
    case "deletion":
      this._messages.update((prev) => (
        prev.filter((x) => !event.deletion.messageIds.includes(x.id))
      ))
      break
    case "clear":
      this._messages.set([])
      break
    }
  }
}
