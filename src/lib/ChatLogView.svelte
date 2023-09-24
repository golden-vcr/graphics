<script lang="ts">
  import { type ChatMessage } from "../chat"
  import ChatLogLine from "./ChatLogLine.svelte"

  export let messages: ChatMessage[]
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
