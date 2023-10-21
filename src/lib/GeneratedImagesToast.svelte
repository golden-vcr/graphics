<script lang="ts">
  import GeneratedImagesNormalLayer from "./GeneratedImagesNormalLayer.svelte"
  import GeneratedImagesScreenLayer from "./GeneratedImagesScreenLayer.svelte"

  export let layer: string
  export let username: string
  export let description: string
  export let imageUrls: string[]
</script>

<div class="container">
{#if layer === 'screen'}
  <GeneratedImagesScreenLayer {description} {imageUrls} />
{:else}
  <GeneratedImagesNormalLayer {username} {description} numImages={imageUrls.length} />
{/if}
</div>

<style>
  .container {
    flex: 1;
    display: flex;
  }
</style>
