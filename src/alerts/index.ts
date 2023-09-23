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

export type AlertToasterInit = {
  onToast: (alert: Alert, durationMs: number) => void
  onClear: () => void
}

export class AlertToaster {
  init: AlertToasterInit
  client: AlertClient
  bufferedAlerts: Alert[]

  clearToastTimer: ReturnType<typeof setTimeout> | null
  checkBufferTimer: ReturnType<typeof setTimeout> | null

  constructor(init: AlertToasterInit) {
    this.init = init
    this.client = new AlertClient((alert) => { this.onAlert(alert) })
    this.bufferedAlerts = []
    this.clearToastTimer = null
    this.checkBufferTimer = null
  }

  stop() {
    if (this.clearToastTimer) {
      clearTimeout(this.clearToastTimer)
      this.clearToastTimer = null
    }
    if (this.checkBufferTimer) {
      clearTimeout(this.checkBufferTimer)
      this.checkBufferTimer = null
    }
    this.client.stop()
  }
  
  simulateAlert(alert: Alert) {
    this.onAlert(alert)
  }

  private onAlert(alert: Alert) {
    // If we have no timer set, no toast is currently in progress
    if (this.checkBufferTimer === null) {
      // Show this alert immediately, and set a timer to check again when done
      this.fireToast(alert)
    } else {
      // An alert is currently being shown; buffer the new one
      this.bufferedAlerts.push(alert)
    }
  }

  private fireToast(alert: Alert) {
    // Fire an onToast notification so the app will display our alert
    const toastDuration = this.getToastDuration(alert)
    this.init.onToast(alert, toastDuration)

    // Set a timer to clear the toast as soon as its allotted duration is up, so we
    // don't leave old UI state lying around
    const clearToastTimerDuration = toastDuration + 10
    this.clearToastTimer = setTimeout(this.init.onClear, clearToastTimerDuration)

    // Set a timer to proc after that alert is finished, so that if any alerts were
    // received and buffered while we were waiting on it to finish, we can show the
    // next one
    const checkBufferTimerDuration = toastDuration + this.getToastInterval(alert)
    this.checkBufferTimer = setTimeout(() => {
      this.checkBufferTimer = null
      if (this.bufferedAlerts.length > 0) {
        const alert = this.bufferedAlerts[0]
        this.bufferedAlerts = this.bufferedAlerts.slice(1)
        this.fireToast(alert)
      }
    }, checkBufferTimerDuration)
  }

  private getToastDuration(alert: Alert): number {
    if (alert.type === 'raid') {
      return 12000
    }
    return 8000
  }

  private getToastInterval(alert: Alert): number {
    return 1000
  }
}
