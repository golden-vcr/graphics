<script lang="ts">
  export let text: string
  export let isMissingEmote = false
</script>

<span class={isMissingEmote ? 'missing-emote' : ''}>{text}</span>

<style>
  .missing-emote {
    font-style: italic;
  }
</style>
