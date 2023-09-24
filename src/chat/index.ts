import { parseChatLine, type ChatLine } from "./types"

export { type ChatLine } from "./types"

export class ChatClient {
  source: EventSource
  
  constructor(onChatLine: (line: ChatLine) => void) {
    this.source = new EventSource('/api/showtime/chat')
    this.source.addEventListener('message', (ev) => {
      const data = JSON.parse(ev.data)
      const line = parseChatLine(data)
      onChatLine(line)
    })
  }
  
  stop() {
    this.source.close()
  }
}
