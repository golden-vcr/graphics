<script lang="ts">
  export let layer: string
  export let username: string
  export let description: string
  export let imageUrls: string[]
</script>

<div class="container">
{#if layer === 'screen'}
  <img class="slide-up" src={imageUrls[0]} alt="foo" />
{:else}
<div class="osd-safe">
  <div class="osd-bg">
    <p class="osd-md">{username} WISHES TO SHARE:</p>
  </div>
  <div class="osd-bg" style="margin-top: 1rem">
    <p class="osd-md">{description}!</p>
  </div>
</div>
{/if}
</div>

<style>
  .container {
    flex: 1;
  }
  img {
    width: 110%;
    position: relative;
    right: 5%;
  }
  .slide-up {
    animation: slide-up 5s;
    animation-fill-mode: forwards;
  }
  @keyframes slide-up {
    from {
      bottom: 0%;
    }
    to {
      bottom: 47%;
    }
  }
</style>
