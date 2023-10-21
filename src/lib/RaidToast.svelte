<script lang="ts">
  import { onMount } from "svelte"
  import audioUrl from "../assets/vcr_seek.mp3"

  export let username: string
  export let numViewers: number

  let audio: HTMLAudioElement
  onMount(() => {
    audio.play()
  })
</script>

<div class="osd-safe">
  <div class="osd-bg">
    <p class="osd-md">INCOMING RAID FROM {username}!</p>
    <p class="osd-md">WELCOME, {numViewers} VIEWERS.</p>
  </div>
</div>
<audio src={audioUrl} bind:this={audio} />
