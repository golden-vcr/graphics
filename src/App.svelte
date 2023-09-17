<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { AlertClient, type Alert } from "./alerts"

  let alerts = [] as Alert[]

  let client = null as AlertClient | null
  onMount(() => {
    client = new AlertClient((alert) => {
      alerts = [...alerts].concat([alert])
    })
  })
  onDestroy(() => {
    if (client) {
      client.stop()
      client = null
    }
  })
</script>

<main>
  <div>
{#if alerts.length === 0}
    <p>No alerts.</p>
{:else}
    <p>Alerts:</p>
    <ul>
{#each alerts as alert}
      <li>{JSON.stringify(alert)}</li>
{/each}
    </ul>
{/if}
  </div>
</main>

<style>
  div {
    display: inline-block;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 2rem;
  }
  ul li {
    margin-left: 1rem;
  }
</style>