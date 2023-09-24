<script lang="ts">
  import { onMount } from "svelte"
  import audioUrl from "../assets/vcr_seek.mp3"

  let audio: HTMLAudioElement
  onMount(() => {
    audio.play()
  })

  export let username: string
  export let numViewers: number
</script>

<p class="osd-md">INCOMING RAID FROM {username}!</p>
<p class="osd-md">WELCOME, {numViewers} VIEWERS.</p>
<audio src={audioUrl} bind:this={audio} />
