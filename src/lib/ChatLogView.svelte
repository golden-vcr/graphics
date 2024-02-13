<script lang="ts">
  import { type ChatPayloadAppend } from "../chat"
  import ChatLogLine from "./ChatLogLine.svelte"

  export let messages: ChatPayloadAppend[]
</script>

<div class="container">
{#each messages as message}
  <ChatLogLine {message} />
{/each}
</div>

<style>
  .container {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
