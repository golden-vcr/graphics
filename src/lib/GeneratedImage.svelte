<script lang="ts">
  export let url: string
  export let description: string
  export let progress: number
  export let scrollDirection: 'up' | 'down'

  $: opacity = 100.0 - (Math.random() * 20 + (progress * 0.001))
  $: xJitter = Math.random() * 5.0 * progress
  $: yScroll = 40.0 * (scrollDirection === 'up' ? progress : (1.0 - progress))
</script>

<div>
  <img
    src={url}
    alt={`generated image of ${description}`}
    style={`opacity: ${opacity}%; right: ${xJitter}%; bottom: ${yScroll}%`}
  />
</div>

<style>
  div {
    width: 100%;
    height: 100%;
  }
  img {
    width: 105%;
    position: relative;
    right: 5%;
    bottom: 0%;
  }
</style>
