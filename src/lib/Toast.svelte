<script lang="ts">
  import { type Alert } from "../alerts"
  import FollowToast from "./FollowToast.svelte"
  import RaidToast from "./RaidToast.svelte"
  import GeneratedImagesToast from "./GeneratedImagesToast.svelte"
  export let alert: Alert
  export let layer: string
</script>

{#if alert.type === 'follow'}
{#if layer === 'normal'}
<FollowToast username={alert.data.username} />
{/if}
{:else if alert.type == 'raid'}
{#if layer === 'normal'}
<RaidToast username={alert.data.username} numViewers={alert.data.numViewers} />
{/if}
{:else if alert.type == 'generated-images'}
<GeneratedImagesToast {layer} username={alert.data.username} description={alert.data.description} imageUrls={alert.data.urls} />
{/if}
