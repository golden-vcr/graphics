<script lang="ts">
  import { type ChatMessage } from "../chat"

  export let messages: ChatMessage[]
</script>

<div class="container">
{#each messages as message}
  <div class="line">
    <b style={`color: ${message.color}`}>{message.username}:</b> {message.text}
  </div>
{/each}
</div>

<style>
  .container {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .line {
    background-color: rgba(0, 0, 0, 0.7);
    font-size: 22px;
  }
</style>
