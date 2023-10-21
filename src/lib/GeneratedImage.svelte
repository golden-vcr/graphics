<script lang="ts">
  export let url: string
  export let description: string
  export let fadeOpacity: number
  export let progress: number
  export let scrollDirection: 'up' | 'down'

  $: opacity = (100.0 - (Math.random() * 20 + (progress * 0.001))) * fadeOpacity
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
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    mix-blend-mode: screen;
  }
  img {
    width: 105%;
    position: relative;
    right: 5%;
    bottom: 0%;
  }
</style>
