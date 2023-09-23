<script lang="ts">
  import { onMount } from "svelte"

  let audio: HTMLAudioElement
  onMount(() => {
    audio.play()
  })

  export let username: string
  export let numViewers: number
</script>

<p class="osd-md">INCOMING RAID FROM {username}!</p>
<p class="osd-md">WELCOME, {numViewers} VIEWERS.</p>
<audio src="vcr_seek.mp3" bind:this={audio} />
