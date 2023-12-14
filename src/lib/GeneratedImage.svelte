<script lang="ts">
  import { type Offset, type ImageProperties } from "../alerts/animation"

  export let url: string
  export let description: string
  export let properties: ImageProperties
  export let show: boolean

  function offsetToTranslate(offset: Offset): string {
    const xPercent = 200 * offset.x - 100
    const yPercent = 200 * offset.y - 100
    return `translateX(${xPercent}%) translateY(${yPercent}%)`
  }
</script>

<div>
  <img
    src={url}
    alt={`generated image of ${description}`}
    style={`opacity: ${show ? properties.opacity * 100 : 0}%; transform: scale(${properties.scale * 100}%) ${offsetToTranslate(properties.offset)}`}
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
    width: 100%;
    position: relative;
    bottom: 16.7%;
  }
</style>
