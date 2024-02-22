<script lang="ts">
  import { onMount } from 'svelte'
  import audioUrl from '../assets/stand-back.mp3'
  import imageUrl from '../assets/stand-back.webp'

  export let key: number

  const DURATION_MS = 2700

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
  <img class={imageClass} src={`${imageUrl}?k=${key}&t=${Date.now()}`} alt="Peter Gabriel" />
</div>
<audio src={audioUrl} bind:this={audio} />

<style>
  div {
    width: 100%;
    height: 100%;
  }
  img {
    position: absolute;
    right: 453px;
    bottom: 0px;
  }
  img.arriving {
    animation: arrive 0.1s ease-in-out 0.0s 1 normal forwards;
  }
  img.leaving {
    animation: leave 0.75s ease-in-out 0.0s 1 normal forwards;
  }
  @keyframes arrive {
    from { bottom: -402px; }
    to { bottom: 0px; }
  }
  @keyframes leave {
    from { bottom: 0px; }
    to { bottom: -402px; }
  }
</style>
