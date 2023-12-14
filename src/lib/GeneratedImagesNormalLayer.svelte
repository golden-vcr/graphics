<script lang="ts">
  import { onMount } from "svelte"

  import { type ImageProperties } from "../alerts/animation"
  import { INTRO_DURATION_MS, IMAGE_DURATION_MS, OUTRO_DURATION_MS } from "../alerts/images"
  import { IMAGE_ANIMATIONS, IMAGE_ANIMATION_CURVES } from "../alerts/images"
  import audioUrl from "../assets/vcr_hum_vocoder.mp3"

  export let username: string
  export let description: string
  export let numImages: number

  let showAlertText = true
  let showDescription = false

  let audio: HTMLAudioElement
  onMount(() => {
    audio.play()
  })

  onMount(() => {
    const showDescriptionAfter = INTRO_DURATION_MS + (IMAGE_DURATION_MS * (numImages - 1)) + (IMAGE_ANIMATIONS.slice(0, IMAGE_ANIMATIONS.length - 1).reduce((acc, x) => acc + x.durationMs, 0)) + OUTRO_DURATION_MS
    const clearAlertTextAfter = INTRO_DURATION_MS + (IMAGE_ANIMATIONS[0].durationMs) + 500

    const clearAlertTextTimer = setTimeout(() => { showAlertText = false }, clearAlertTextAfter)
    const showDescriptionTimer = setTimeout(() => { showDescription = true }, showDescriptionAfter)
    return () => {
      clearTimeout(clearAlertTextTimer)
      clearTimeout(showDescriptionTimer)
    }
  })

  let currentImageIndex = -1
  let currentAnimationIndex = -1
  let currentAnimationElapsed: DOMHighResTimeStamp = 0.0

  let properties: ImageProperties = {
    scale: 1,
    offset: {x: 0.5, y: 0.5},
    opacity: 0,
    background: 0,
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

    if (currentImageIndex < numImages) {
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

<div class="osd-safe" style={`background-color: rgba(0, 0, 0, ${properties.background})`}>
{#if showAlertText}
  <div class="osd-bg">
    <p class="osd-md">INCOMING TRANSMISSION FROM:<br />{username}</p>
  </div>
{/if}
  <div class="spacer" />
{#if showDescription}
  <div class="osd-bg" style="margin-top: 1rem">
    <p class="osd-md">&lt;&lt; {description} &gt;&gt;</p>
  </div>
{/if}
</div>
<audio src={audioUrl} bind:this={audio} />

<style>
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
