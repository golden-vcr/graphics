<script lang="ts">
  import { type OnscreenEvent } from "../alerts"
  import FollowToast from "./FollowToast.svelte"
  import RaidToast from "./RaidToast.svelte"
  import CheerToast from "./CheerToast.svelte"
  import SubscribeToast from "./SubscribeToast.svelte"
  import GiftSubToast from "./GiftSubToast.svelte"
  import GeneratedImagesToast from "./GeneratedImagesToast.svelte"
  import FriendImageToast from "./FriendImageToast.svelte"
  import PrayerBear from "./PrayerBear.svelte"
  import StandBack from "./StandBack.svelte"
  import PeterTrainA from "./PeterTrainA.svelte"
  export let alert: OnscreenEvent
  export let layer: string
  export let key: number
</script>

{#if alert.type === 'toast' && alert.payload.type === 'followed'}
{#if layer === 'normal'}
<FollowToast
  username={alert.payload.viewer.twitchDisplayName}
/>
{/if}

{:else if alert.type === 'toast' && alert.payload.type === 'raided'}
{#if layer === 'normal'}
<RaidToast
  username={alert.payload.viewer.twitchDisplayName}
  numViewers={alert.payload.data.numViewers}
/>
{/if}

{:else if alert.type === 'toast' && alert.payload.type === 'cheered'}
{#if layer === 'normal'}
<CheerToast
  username={alert.payload.viewer?.twitchDisplayName || 'Anonymous'}
  numBits={alert.payload.data.numBits}
  message={alert.payload.data.message}
/>
{/if}

{:else if alert.type === 'toast' && alert.payload.type === 'subscribed'}
{#if layer === 'normal'}
<SubscribeToast
  username={alert.payload.viewer.twitchDisplayName}
  isGift={false}
  numCumulativeMonths={1}
  message={""}
/>
{/if}

{:else if alert.type === 'toast' && alert.payload.type === 'resubscribed'}
{#if layer === 'normal'}
<SubscribeToast
  username={alert.payload.viewer.twitchDisplayName}
  isGift={false}
  numCumulativeMonths={alert.payload.data.numCumulativeMonths}
  message={alert.payload.data.message}
/>
{/if}

{:else if alert.type === 'toast' && alert.payload.type === 'gifted-subs'}
{#if layer === 'normal'}
<GiftSubToast
  username={alert.payload.viewer?.twitchDisplayName || 'Anonymous'}
  numSubscriptions={alert.payload.data.numSubscriptions}
/>
{/if}


{:else if alert.type === 'image' && alert.payload.type === 'static' && alert.payload.details.imageId === 'prayer-bear'}
{#if layer == 'normal'}
<PrayerBear {key} />
{/if}

{:else if alert.type === 'image' && alert.payload.type === 'static' && alert.payload.details.imageId === 'stand-back'}
{#if layer == 'normal'}
<StandBack {key} />
{/if}

{:else if alert.type === 'image' && alert.payload.type === 'static' && alert.payload.details.imageId === 'petertrain-a'}
{#if layer == 'normal'}
<PeterTrainA {key} />
{/if}

{:else if alert.type === 'image' && alert.payload.type === 'friend'}
{#if layer == 'normal'}
<FriendImageToast
  username={alert.payload.viewer.twitchDisplayName}
  description={alert.payload.details.description}
  imageUrl={alert.payload.details.imageUrl}
  name={alert.payload.details.name}
  backgroundColor={alert.payload.details.backgroundColor}
/>
{/if}

{:else if alert.type === 'image' && alert.payload.type === 'ghost'}
<GeneratedImagesToast
  {layer}
  username={alert.payload.viewer.twitchDisplayName}
  description={alert.payload.details.description}
  imageUrls={[alert.payload.details.imageUrl]}
/>
{/if}
