<script lang="ts">
  import { onMount, onDestroy } from "svelte"
  import { writable } from "svelte/store"
  
  import { AlertToaster, type OnscreenEvent } from "../alerts"
  import { TapeCache, type Tape } from "../tapes"
  
  import Toast from "../lib/Toast.svelte"
  import LowerThird from "../lib/LowerThird.svelte"

  const SIMULATE_ALERTS = true
  
  const tapes = new TapeCache()
  const tape = writable(null as Tape | null)
  const toast = writable(null as { alert: OnscreenEvent, durationMs: number } | null)

  const layer = new URLSearchParams(window.location.search).get('layer') || 'normal'

  let toaster = null as AlertToaster | null
  onMount(async () => {
    await tapes.init()

    toaster = new AlertToaster({
      onToast(alert, durationMs) {
        if (alert.type === 'status') {
          if (alert.payload.currentTapeId > 0) { 
            tapes.get(alert.payload.currentTapeId).then((value) => {
              tape.set(value)
              setTimeout(() => {
                tape.set(null)
              }, 10000)
            })
          } else {
            tape.set(null)
          }
        } else {
          toast.set({ alert, durationMs })
        }
      },
      onClear() {
        toast.set(null)
      },
    })

    if (SIMULATE_ALERTS) {
      setTimeout(() => {
        toaster?.simulateAlert({
          type: 'toast',
          payload: {
            type: 'followed',
            viewer: {twitchUserId: '90790024', twitchDisplayName: 'wasabimilkshake'}
          }
        })
      }, 50)
      setTimeout(() => {
        toaster?.simulateAlert({
          type: 'image',
          payload: {
            viewer: {twitchUserId: '90790024', twitchDisplayName: 'wasabimilkshake'},
            style: 'ghost',
            extra: '',
            description: 'This field is being used as a placeholder for a user message',
            imageUrl: '_PrayerBear',
          }
        })
      }, 55)
      setTimeout(() => {
        toaster?.simulateAlert({
          type: 'status',
          payload: {
            currentTapeId: 54,
          },
        })
      }, 60)
      setTimeout(() => {
        toaster?.simulateAlert({
          type: 'toast',
          payload: {
            type: 'raided',
            viewer: {twitchUserId: '1337', twitchDisplayName: 'BigJoeBob'},
            data: {numViewers: 23},
          },
        })
      }, 100)
      setTimeout(() => {
        toaster?.simulateAlert({
          type: 'image',
          payload: {
            viewer: {twitchUserId: '90790024', twitchDisplayName: 'wasabimilkshake'},
            style: 'ghost',
            extra: '',
            description: 'a trumpet sticking out a human tongue',
            imageUrl: 'https://golden-vcr-user-images.nyc3.digitaloceanspaces.com/f5f92208-0211-4b72-b3da-a747c2e9ada5/f5f92208-0211-4b72-b3da-a747c2e9ada5-00.jpg',
          }
        })
      }, 160)
    }
  })
  onDestroy(() => {
    if (toaster) {
      toaster.stop()
      toaster = null
    }
  })
</script>

<main>
  <div class="lower-third-layer">
{#if layer === 'normal'}
    <LowerThird tape={$tape} />
{/if}    
  </div>
  <div class="toast-layer">
{#if $toast}
    <Toast alert={$toast.alert} {layer} />
{/if}
  </div>
</main>

<style>
main {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  position: relative;
}
.lower-third-layer {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.toast-layer {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  pointer-events: none;
}
</style>
