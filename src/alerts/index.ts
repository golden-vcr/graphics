import { parseAlert, type Alert } from "./types"

export { type Alert } from "./types"

export class AlertClient {
  source: EventSource

  constructor(onAlert: (alert: Alert) => void) {
    this.source = new EventSource('/api/showtime/alerts')
    this.source.addEventListener('message', (ev) => {
      const data = JSON.parse(ev.data)
      const alert = parseAlert(data)
      onAlert(alert)
    })
  }

  stop() {
    this.source.close()
  }
}
