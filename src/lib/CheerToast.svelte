<script lang="ts">
  import { onMount } from "svelte"
  import audioUrl from "../assets/tape_insert.mp3"

  export let username: string
  export let numBits: number
  export let message: string

  let audio: HTMLAudioElement
  onMount(() => {
    audio.play()
  })

  $: description = `${username} CHEERED ${numBits} BITS!`
</script>

<div class="osd-safe">
  <div class="osd-bg">
    <p class="osd-md">{description}</p>
  </div>
  <div class="spacer" />
{#if message !== ""}
  <div class="osd-bg" style="margin-top: 1rem">
    <p class="osd-md">&lt;&lt; {message} &gt;&gt;</p>
  </div>
{/if}
</div>
<audio src={audioUrl} bind:this={audio} />

<style>
  .osd-safe {
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: center;
  }
  .spacer {
    flex: 1;
  }
</style>
