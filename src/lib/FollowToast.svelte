<script lang="ts">
  import { onMount } from "svelte"
  import audioUrl from "../assets/tape_insert.mp3"

  let audio: HTMLAudioElement
  onMount(() => {
    audio.play()
  })

  export let username: string
</script>

<p class="osd-md">NEW FOLLOW FROM {username}!</p>
<audio src={audioUrl} bind:this={audio} />
