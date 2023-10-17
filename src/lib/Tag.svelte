<script lang="ts">
  import { formatTagName, getTagColor } from "../tags";

  export let tag: string
  $: color = getTagColor(tag)
</script>

<div style={`background-color: ${color}`}>
  {formatTagName(tag)}
</div>

<style>
  div {
    border-radius: 4px;
    font-size: 1.25em;
    line-height: 1;
    padding: 0.3em;
    font-weight: bold;
    text-shadow: rgba(0, 0, 0, 0.5) 1px 1px;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.25));
    white-space: nowrap;
  }
</style>
