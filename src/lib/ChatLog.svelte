<script lang="ts">
  import { type ChatLine } from "../chat"

  export let lines: ChatLine[]
</script>

<div class="container">
{#each lines as line}
  <div class="line">
    <b style={`color: ${line.color}`}>{line.name}:</b> {line.text}
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
