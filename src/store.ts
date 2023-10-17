import { writable } from "svelte/store"

import { TapeCache, type Tape } from "./tapes"
import { BroadcastStateEventSource, type BroadcastState } from "./state"

export type Mode = 'offline' | 'idle' | 'screening'

export type State = (
  {error?: string} & (
    {mode: 'offline'} | (
      {onlineSince: Date} & ({mode: 'idle'} | {mode: 'screening', screeningSince: Date, tape: Tape})
    )
  )
)

export const state = writable<State>({ mode: 'offline' })

function handleError(err: unknown) {
  const message = (err instanceof Error) ? err.message : String(err)
  state.update((prev) => ({
    ...prev,
    error: message,
  }))
}

export async function initApplicationState() {
  // Initialize our TapeCache, which uses the tapes API to populate data about tapes,
  // and which allows us to look up the details for any tape ID
  const tapes = new TapeCache()
  try {
    await tapes.init()
  } catch (err) {
    handleError(err)
    return
  }

  // Prepare an on-broadcast-state-changed callback that will let us update our
  // application state in response to changes in broadcast state
  const onBroadcastStateChange = async (newState: BroadcastState) => {
    if (!newState.isLive) {
      state.set({ mode: 'offline' })
      return
    }

    if (!newState.screeningTapeId || !newState.screeningStartedAt) {
      state.set({ mode: 'idle', onlineSince: newState.broadcastStartedAt })
      return
    }

    try {
      const tape = await tapes.get(newState.screeningTapeId)
      state.set({
        mode: 'screening',
        onlineSince: newState.broadcastStartedAt,
        screeningSince: newState.screeningStartedAt,
        tape,
      })
    } catch (err) {
      handleError(err)
    }
  }

  // Create an EventSource which will receive updates from the showtime API whenever our
  // broadcast state changes (i.e. going online, going offline, changing tapes, etc.),
  // triggering our state-change routine
  new BroadcastStateEventSource(onBroadcastStateChange, handleError)
}
