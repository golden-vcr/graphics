<script lang="ts">
  import { onMount } from "svelte"

  let audio: HTMLAudioElement
  onMount(() => {
    audio.play()
  })

  export let username: string
</script>

<p class="osd-md">NEW FOLLOW FROM {username}!</p>
<audio src="tape_insert.mp3" bind:this={audio} />
