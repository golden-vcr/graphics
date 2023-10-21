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
    } else {
      currentImageElapsed = 0.0
      currentImageProgress = 0.0
      currentImageIndex++
    }

    if (currentImageIndex < imageUrls.length) {
      rid = requestAnimationFrame(update)
    }
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
  <div class="frame">
{#each imageUrls as url, i}
    <GeneratedImage
      url={url}
      {description}
      fadeOpacity={i === currentImageIndex ? 100.0 : 0.0}
      progress={
        i < currentImageIndex
          ? computeImageProgress(IMAGE_DURATION_MS)
          : (i > currentImageIndex ? 0.0 : currentImageProgress)
      }
      scrollDirection={i % 2 === 0 ? 'down' : 'up'}
    />
{/each}
  </div>
{:else}
<div class="osd-safe">
  <div class="osd-bg">
    <p class="osd-md">INCOMING TRANSMISSION FROM:<br />{username}</p>
  </div>
  <div class="spacer" />
  <div class="osd-bg" style="margin-top: 1rem">
    <p class="osd-md">&lt;&lt; {description} &gt;&gt;</p>
  </div>
</div>
{/if}
</div>

<style>
  .container {
    flex: 1;
    display: flex;
  }
  .frame {
    flex: 1;
    position: relative;
  }
  .osd-safe {
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: center;
  }
  .spacer {
    flex: 1;
  }
</style>
