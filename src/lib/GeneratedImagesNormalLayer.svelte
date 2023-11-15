<script lang="ts">
  import { onMount } from "svelte"

  import { INTRO_DURATION_MS, IMAGE_DURATION_MS, IMAGE_DURATION_TAIL_MS } from "../alerts/images"
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
    const showDescriptionAfter = INTRO_DURATION_MS + (IMAGE_DURATION_MS * numImages)
    const clearAlertTextAfter = showDescriptionAfter - IMAGE_DURATION_TAIL_MS

    const clearAlertTextTimer = setTimeout(() => { showAlertText = false }, clearAlertTextAfter)
    const showDescriptionTimer = setTimeout(() => { showDescription = true }, showDescriptionAfter)
    return () => {
      clearTimeout(clearAlertTextTimer)
      clearTimeout(showDescriptionTimer)
    }
  })

  let currentImageIndex = -1
  let currentImageElapsed: DOMHighResTimeStamp = 0.0
  let currentImageBackgroundOpacity = 0.0

  let rid: number
  let lastUpdateTimestamp: DOMHighResTimeStamp = 0.0
  function update(timestamp: DOMHighResTimeStamp) {
    const deltaTime = lastUpdateTimestamp ? (timestamp - lastUpdateTimestamp) : 0.0
    currentImageElapsed += deltaTime
    lastUpdateTimestamp = timestamp

    if (currentImageElapsed < IMAGE_DURATION_MS) {
      currentImageBackgroundOpacity = (currentImageElapsed / IMAGE_DURATION_MS) * 0.8
    } else {
      currentImageBackgroundOpacity = 0.0
      currentImageElapsed = 0.0
      currentImageIndex++
    }

    if (currentImageIndex < numImages) {
      rid = requestAnimationFrame(update)
    }
  }
  onMount(() => {
    const timer = setTimeout(() => {
      currentImageIndex++
      rid = requestAnimationFrame(update)
    }, INTRO_DURATION_MS)
    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(rid)
    }
  })
</script>

<div class="osd-safe" style={`background-color: rgba(0, 0, 0, ${currentImageBackgroundOpacity})`}>
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
