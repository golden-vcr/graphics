<script lang="ts">
  import { onMount } from "svelte"

  import { type ImageProperties } from "../alerts/animation"
  import { INTRO_DURATION_MS, IMAGE_ANIMATIONS, IMAGE_ANIMATION_CURVES } from "../alerts/images"
  import GeneratedImage from "./GeneratedImage.svelte"

  export let description: string
  export let imageUrls: string[]

  let currentImageIndex = -1
  let currentAnimationIndex = -1
  let currentAnimationElapsed: DOMHighResTimeStamp = 0.0

  let properties: ImageProperties = {
    scale: 1,
    offset: {x: 0.5, y: 0.5},
    opacity: 0,
    background: 0.5,
  }
  let rid: number
  let lastUpdateTimestamp: DOMHighResTimeStamp = 0.0
  function update(timestamp: DOMHighResTimeStamp) {
    const deltaTime = lastUpdateTimestamp ? (timestamp - lastUpdateTimestamp) : 0.0
    currentAnimationElapsed += deltaTime
    lastUpdateTimestamp = timestamp

    const anim = IMAGE_ANIMATIONS[currentAnimationIndex]
    const curves = IMAGE_ANIMATION_CURVES[currentAnimationIndex]
    if (currentAnimationElapsed < anim.durationMs) {
      properties = curves.sample(currentAnimationElapsed)
    } else {
      if (currentAnimationIndex + 1 == IMAGE_ANIMATIONS.length) {
        currentImageIndex++
        currentAnimationIndex = 0
        currentAnimationElapsed = 0.0
      } else {
        currentAnimationIndex++
        currentAnimationElapsed = 0.0
      }
    }

    if (currentImageIndex < imageUrls.length) {
      rid = requestAnimationFrame(update)
    }
  }

  onMount(() => {
    const timer = setTimeout(() => {
      currentImageIndex++
      currentAnimationIndex = 0
      currentAnimationElapsed = 0.0
      rid = requestAnimationFrame(update)
    }, INTRO_DURATION_MS)
    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(rid)
    }
  })
</script>

<div class="frame">
{#each imageUrls as url, i}
  <GeneratedImage
    url={url}
    {description}
    {properties}
    show={i === currentImageIndex}
  />
{/each}
</div>

<style>
  .frame {
    flex: 1;
    position: relative;
  }
</style>
