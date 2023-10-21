<script lang="ts">
  import { onMount, onDestroy } from "svelte"
  import { writable } from "svelte/store"
  
  import { AlertToaster, type Alert } from "../alerts"
  import { initApplicationState } from "../store"
  
  import Toast from "../lib/Toast.svelte"
  import LowerThird from "../lib/LowerThird.svelte"

  const SIMULATE_ALERTS = true

  const toast = writable(null as { alert: Alert, durationMs: number } | null)

  const layer = new URLSearchParams(window.location.search).get('layer') || 'normal'

  let toaster = null as AlertToaster | null
  onMount(() => {
    initApplicationState()

    toaster = new AlertToaster({
      onToast(alert, durationMs) {
        toast.set({ alert, durationMs })
      },
      onClear() {
        toast.set(null)
      },
    })

    if (SIMULATE_ALERTS) {
      /*
      setTimeout(() => {
        toaster?.simulateAlert({ type: 'follow', data: { username: 'wasabimilkshake' }})
      }, 1000)
      setTimeout(() => {
        toaster?.simulateAlert({ type: 'raid', data: { username: 'bigjoebob', numViewers: 23 }})
      }, 1500)
      */
      setTimeout(() => {
        toaster?.simulateAlert({ type: 'generated-images', data: { username: 'wasabimilkshake', description: 'a seal', urls: [
          'https://golden-vcr-user-images.nyc3.digitaloceanspaces.com/0f201969-83c5-413b-8116-d50b60c451ec/0f201969-83c5-413b-8116-d50b60c451ec-00.jpg',
          'https://golden-vcr-user-images.nyc3.digitaloceanspaces.com/0f201969-83c5-413b-8116-d50b60c451ec/0f201969-83c5-413b-8116-d50b60c451ec-01.jpg',
          'https://golden-vcr-user-images.nyc3.digitaloceanspaces.com/0f201969-83c5-413b-8116-d50b60c451ec/0f201969-83c5-413b-8116-d50b60c451ec-02.jpg',
          'https://golden-vcr-user-images.nyc3.digitaloceanspaces.com/0f201969-83c5-413b-8116-d50b60c451ec/0f201969-83c5-413b-8116-d50b60c451ec-03.jpg',
        ]}})
      }, 1600)
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
    <LowerThird />
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
