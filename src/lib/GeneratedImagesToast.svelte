<script lang="ts">
  import { onMount } from "svelte"

  import { computeImageProgress, IMAGE_DURATION_MS } from "../alerts/images"
  import GeneratedImage from "./GeneratedImage.svelte";

  export let layer: string
  export let username: string
  export let description: string
  export let imageUrls: string[]

  let currentImageIndex = 0
  let currentImageElapsed: DOMHighResTimeStamp = 0.0
  let currentImageProgress = 0.0

  let rid: number
  let lastUpdateTimestamp: DOMHighResTimeStamp = 0.0
  function update(timestamp: DOMHighResTimeStamp) {
    const deltaTime = lastUpdateTimestamp ? (timestamp - lastUpdateTimestamp) : 0.0
    currentImageElapsed += deltaTime
    lastUpdateTimestamp = timestamp

    if (currentImageElapsed < IMAGE_DURATION_MS) {
      currentImageProgress = computeImageProgress(currentImageElapsed)
    } else if (currentImageIndex < imageUrls.length - 1) {
      currentImageElapsed = 0.0
      currentImageProgress = 0.0
      currentImageIndex++
    } else {
      return
    }
    rid = requestAnimationFrame(update)
  }

  onMount(() => {
    if (layer === 'screen') {
      rid = requestAnimationFrame(update)
      return () => cancelAnimationFrame(rid)
    }
  })
</script>

<div class="container">
{#if layer === 'screen'}
  <GeneratedImage
    url={imageUrls[currentImageIndex]}
    {description}
    progress={currentImageProgress}
    scrollDirection={currentImageIndex % 2 === 0 ? 'down' : 'up'}
  />
{:else}
<div class="osd-safe">
  <div class="osd-bg">
    <p class="osd-md">{username} WISHES TO SHARE:</p>
  </div>
  <div class="osd-bg" style="margin-top: 1rem">
    <p class="osd-md">{description}!</p>
  </div>
</div>
{/if}
</div>

<style>
  .container {
    flex: 1;
  }
  img {
    width: 105%;
    position: relative;
    right: 5%;
    bottom: 0%;
  }
</style>
