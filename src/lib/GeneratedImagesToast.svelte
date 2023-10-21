<script lang="ts">
  import { onMount } from "svelte"

  export let layer: string
  export let username: string
  export let description: string
  export let imageUrls: string[]

  const imageDuration = 0.5
  const imageDurationTail = 0.1

  let currentImageIndex = 0
  let currentImageElapsed: DOMHighResTimeStamp = 0.0
  $: currentImageUrl = imageUrls[currentImageIndex]

  let img: HTMLImageElement
  let rid: number
  let lastUpdateTimestamp: DOMHighResTimeStamp = 0.0
  function update(timestamp: DOMHighResTimeStamp) {
    const deltaTime = lastUpdateTimestamp ? (timestamp - lastUpdateTimestamp) : 0.0
    lastUpdateTimestamp = timestamp
    currentImageElapsed += (deltaTime / 1000.0)
    const t = Math.abs(Math.sin((0.5 * Math.PI * currentImageElapsed) / (imageDuration - imageDurationTail)))

    if (currentImageElapsed > imageDuration) {
      currentImageElapsed = 0.0
      currentImageIndex++
    }

    const scrollDirection = currentImageIndex % 2 === 0 ? 'down' : 'up'
    
    const xJitter = Math.random() * 5.0 * t
    const yScroll = 40.0 * (scrollDirection === 'up' ? t : (1.0 - t))

    img.style.setProperty('right', `${xJitter}%`)
    img.style.setProperty('bottom', `${yScroll}%`)
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
  <img bind:this={img} src={currentImageUrl} alt="foo" />
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
