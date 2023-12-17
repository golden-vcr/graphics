<script lang="ts">
  import { type Alert } from "../alerts"
  import FollowToast from "./FollowToast.svelte"
  import SubscribeToast from "./SubscribeToast.svelte"
  import GitfSubToast from "./GiftSubToast.svelte"
  import RaidToast from "./RaidToast.svelte"
  import GeneratedImagesToast from "./GeneratedImagesToast.svelte"
  export let alert: Alert
  export let layer: string
</script>

{#if alert.type === 'follow'}
{#if layer === 'normal'}
<FollowToast {...alert.data} />
{/if}

{:else if alert.type == 'subscribe'}
{#if layer === 'normal'}
<SubscribeToast {...alert.data} />
{/if}

{:else if alert.type == 'gift-sub'}
{#if layer === 'normal'}
<GitfSubToast {...alert.data} />
{/if}

{:else if alert.type == 'raid'}
{#if layer === 'normal'}
<RaidToast {...alert.data} />
{/if}

{:else if alert.type == 'generated-images'}
<GeneratedImagesToast {layer} username={alert.data.username} description={alert.data.description} imageUrls={alert.data.urls} />
{/if}
