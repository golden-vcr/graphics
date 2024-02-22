<script lang="ts">
  import { onMount } from 'svelte'
  import audioUrl from '../assets/gonna-get-dark.mp3'
  import imageUrl from '../assets/gonna-get-dark.webp'

  export let key: number

  const DURATION_MS = 2900

  let audio: HTMLAudioElement
  $: imageClass = 'arriving'

  onMount(() => {
    audio.play()
    const timer = setTimeout(() => {
      imageClass = 'leaving'
    }, DURATION_MS)
    return () => {
      clearTimeout(timer)
    }
  })
</script>

<div>
  <img class={imageClass} src={`${imageUrl}?k=${key}&t=${Date.now()}`} alt="Prayer Bear" />
</div>
<audio src={audioUrl} bind:this={audio} />

<style>
  div {
    width: 100%;
    height: 100%;
  }
  img {
    position: absolute;
    right: 0px;
    bottom: 0px;
  }
  img.arriving {
    animation: arrive 0.5s ease-in-out 0.0s 1 normal forwards;
  }
  img.leaving {
    animation: leave 0.5s ease-in-out 0.0s 1 normal forwards;
  }
  @keyframes arrive {
    from { bottom: -381px; }
    to { bottom: 0px; }
  }
  @keyframes leave {
    from { bottom: 0px; }
    to { bottom: -381px; }
  }
</style>
