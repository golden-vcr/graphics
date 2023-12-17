<script lang="ts">
  import { onMount } from "svelte"
  import audioUrl from "../assets/tape_insert.mp3"

  export let username: string
  export let numSubscriptions: number

  let audio: HTMLAudioElement
  onMount(() => {
    audio.play()
  })

  $: description = numSubscriptions === 1 ? `${username} HAS GIFTED A SUB!` : (
    `${username} HAS GIFTED ${numSubscriptions} SUBS!`
  )
</script>

<div class="osd-safe">
  <div class="osd-bg">
    <p class="osd-md">{description}</p>
  </div>
</div>
<audio src={audioUrl} bind:this={audio} />
