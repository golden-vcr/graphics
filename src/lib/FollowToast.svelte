<script lang="ts">
  import { onMount } from "svelte"
  import audioUrl from "../assets/tape_insert.mp3"

  let audio: HTMLAudioElement
  onMount(() => {
    audio.play()
  })

  export let username: string
</script>

<div class="osd-safe">
  <div class="osd-bg">
    <p class="osd-md">NEW FOLLOW FROM {username}!</p>
  </div>
</div>
<audio src={audioUrl} bind:this={audio} />
