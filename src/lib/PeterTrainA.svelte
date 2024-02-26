<script lang="ts">
  import { onMount } from 'svelte'
  import audioUrl from '../assets/petertrain-a.mp3'
  import imageUrl from '../assets/petertrain-a.webp'

  export let key: number

  const DURATION_UNTIL_JUMP_1 = 3166
  const DURATION_UNTIL_JUMP_2 = 2200
  const DURATION_UNTIL_JUMP_3 = 2100
  const DURATION_UNTIL_LEAVE = 2000

  let audio: HTMLAudioElement
  $: imageClass = 'arriving'

  onMount(() => {
    let timer = null as null | ReturnType<typeof setTimeout>
    audio.play()
    timer = setTimeout(() => {
      imageClass = 'jumping-1'
      timer = setTimeout(() => {
        imageClass = 'jumping-2'
        timer = setTimeout(() => {
          imageClass = 'jumping-3'
          timer = setTimeout(() => {
            imageClass = 'leaving'
          }, DURATION_UNTIL_LEAVE)
        }, DURATION_UNTIL_JUMP_3);
      }, DURATION_UNTIL_JUMP_2)
    }, DURATION_UNTIL_JUMP_1)
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  })
</script>

<div>
  <img class={imageClass} src={`${imageUrl}?k=${key}&t=${Date.now()}`} alt="Peter Gabriel Train" />
</div>
<audio src={audioUrl} bind:this={audio} />

<style>
  div {
    width: 100%;
    height: 100%;
  }
  img {
    position: absolute;
    right: 840px;
    bottom: 0px;
  }
  img.arriving {
    animation: arrive 1.0s ease-in-out 0.0s 1 normal forwards;
  }
  img.jumping-1 {
    animation: jump-1 1.0s ease-in-out 0.0s 1 normal forwards;
  }
  img.jumping-2 {
    animation: jump-2 1.0s ease-in-out 0.0s 1 normal forwards;
  }
  img.jumping-3 {
    animation: jump-3 1.0s ease-in-out 0.0s 1 normal forwards;
  }
  img.leaving {
    animation: leave 1.5s ease-in-out 0.0s 1 normal forwards;
  }
  @keyframes arrive {
    from { right: -515px; }
    to { right: 0px; }
  }
  @keyframes jump-1 {
    from { right: 0px; }
    to { right: 280px; }
  }
  @keyframes jump-2 {
    from { right: 280px; }
    to { right: 560px; }
  }
  @keyframes jump-3 {
    from { right: 560px; }
    to { right: 840px; }
  }
  @keyframes leave {
    from { right: 840px; }
    to { right: 1640px; }
  }
</style>
