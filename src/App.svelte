<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { writable } from "svelte/store";
  import { AlertToaster, type Alert } from "./alerts"
  import Toast from "./lib/Toast.svelte";

  const toast = writable(null as { alert: Alert, durationMs: number } | null)

  let toaster = null as AlertToaster | null
  onMount(() => {
    toaster = new AlertToaster({
      onToast(alert, durationMs) {
        toast.set({ alert, durationMs })
      },
      onClear() {
        toast.set(null)
      },
    })

    /*
    setTimeout(() => {
      toaster?.simulateAlert({ type: 'follow', data: { username: 'wasabimilkshake' }})
    }, 500)
    setTimeout(() => {
      toaster?.simulateAlert({ type: 'raid', data: { username: 'bigjoebob', numViewers: 23 }})
    }, 1500)
    */
  })
  onDestroy(() => {
    if (toaster) {
      toaster.stop()
      toaster = null
    }
  })
</script>

<main>
{#if $toast}
  <Toast alert={$toast.alert} />
{/if}
</main>

<style>
main {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>