<script lang="ts">
  export let username: string
  export let description: string
  export let imageUrls: string[]
</script>

<div class="container">
  <img class="slide-up" src={imageUrls[0]} alt="foo" />
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
  .slide-up, .slide-down {
    animation: slide-up 2s cubic-bezier(0, 1, 0, 1, 0, 1, 0, 1);
    animation-fill-mode: forwards;
  }
  .slide-down {
    animation-direction: reverse;
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
