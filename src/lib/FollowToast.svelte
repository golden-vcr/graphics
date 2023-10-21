<script lang="ts">
  import { onMount } from "svelte"
  import audioUrl from "../assets/tape_insert.mp3"

  export let username: string

  let audio: HTMLAudioElement
  onMount(() => {
    audio.play()
  })
</script>

<div class="osd-safe">
  <div class="osd-bg">
    <p class="osd-md">NEW FOLLOW FROM {username}!</p>
  </div>
</div>
<audio src={audioUrl} bind:this={audio} />
