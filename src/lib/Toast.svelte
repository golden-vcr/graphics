<script lang="ts">
  import { type Alert } from "../alerts"
  import FollowToast from "./FollowToast.svelte"
  import RaidToast from "./RaidToast.svelte"
  export let alert: Alert
</script>

<div class="text-bg">
{#if alert.type === 'follow'}
  <FollowToast username={alert.data.username} />
{:else if alert.type == 'raid'}
  <RaidToast username={alert.data.username} numViewers={alert.data.numViewers} />
{/if}
</div>

<style>
  .text-bg {
    padding: 0.5rem;
    background-color: rgba(0, 0, 0, 0.5);
    line-height: 1.0;
  }
</style>
