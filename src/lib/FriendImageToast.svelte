<script lang="ts">
  import { onMount } from 'svelte'

  export let username: string
  export let description: string
  export let imageUrl: string
  export let name: string
  export let backgroundColor: string

  let bar: HTMLDivElement

  onMount(() => {
    let timer = null as null | ReturnType<typeof setTimeout>
    timer = setTimeout(() => {
      if (bar) {
        //bar.classList.add('bar-sliding-down')
      }
    }, 2000)
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  })
</script>

<div class="container">
  <div class="bar" bind:this={bar} style={`background-color: ${backgroundColor}`}>
    <div class="labels">
      <div class="friend-label">friend of <b>{username}</b></div>
      <div class="name-label">{name}</div>
      <div class="description-label">{description}</div>
    </div>
  </div>
  <img src={imageUrl} alt={description} />
</div>

<style>
  .container {
    width: 100%;
    height: 100%;
  }
  .bar {
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 540px;
    height: 0px;
    border-top: 0px solid black;
    border-bottom: 0px solid black;
    box-shadow: 0px 0px 0px white, 0px 0px 0px white;
    color: white;
    animation: bar-border-appear 0.25s ease-out 0s forwards, bar-appear 0.5s ease-out 0s forwards, bar-slide-down 1s ease-in-out 2.8s forwards, bar-disappear 0.5s ease-in 10.5s forwards;
  }
  .labels {
    display: flex;
    flex-direction: column;
    margin: 1em 25% 1em 1em;
    line-height: 0.95;
    font-family: 'Ubuntu', system-ui;
    text-shadow: 2px 2px black;
  }
  .friend-label {
    opacity: 0;
    font-size: 1.75rem;
    animation: text-appear 0.5s ease-out 0.25s forwards, text-disappear 0.5s ease-out 10.7s forwards;
  }
  .name-label {
    opacity: 0;
    margin: 0.75rem 0.5rem;
    font-size: 5rem;
    text-shadow: 4px 4px black;
    animation: text-appear 0.5s ease-out 3.55s forwards, text-disappear 0.5s ease-out 10.6s forwards;
  }
  .description-label {
    opacity: 0;
    font-size: 1.75rem;
    font-style: italic;
    white-space: nowrap;
    animation: text-appear 0.5s ease-out 4.3s forwards, text-disappear 0.5s ease-out 10.5s forwards;
  }
  img {
    position: absolute;
    right: 1640px;
    bottom: 284px;
    width: 512px;
    height: 512px;
    animation: image-slide-right 1s ease-out 1.3s forwards, image-slide-down 1s ease-in-out 2.8s forwards, image-slide-left 1.5s ease-in 9.8s forwards, image-fade-out 0.5s ease-in 10.6s forwards;
  }
  @keyframes text-appear {
    from {
      opacity: 0;
      transform: translateX(-64px);
    }
    to {
      opacity: 1;
      transform: translateX(0px);
    }
  }
  @keyframes text-disappear {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  @keyframes bar-border-appear {
    from {
      border-top-width: 0px;
      border-bottom-width: 0px;
      box-shadow: 0px 0px 0px white, 0px 0px 0px white;
    }
    to {
      border-top-width: 4px;
      border-bottom-width: 4px;
      box-shadow: 0px 4px 0px white, 0px -4px 0px white;
    }
  }
  @keyframes bar-appear {
    from {
      opacity: 0;
      bottom: 540px;
      height: 0px;
    }
    to {
      opacity: 1;
      bottom: 505px;
      height: 70px;
    }
  }
  @keyframes bar-slide-down {
    from {
      bottom: 505px;
      height: 70px;
    }
    to {
      bottom: 92px;
      height: 200px;
    }
  }
  @keyframes bar-disappear {
    from {
      bottom: 92px;
      height: 200px;
      opacity: 1;
    }
    to {
      bottom: 148px;
      height: 72px;
      opacity: 0;
    }
  }
  @keyframes image-slide-right {
    from {
      right: 1640px;
      bottom: 284px;
    }
    to {
      right: 464px;
      bottom: 284px;
    }
  }
  @keyframes image-slide-down {
    from {
      right: 464px;
      bottom: 284px;
      width: 512px;
      height: 512px;
    }
    to {
      right: 0px;
      bottom: 0px;
      width: 384px;
      height: 384px;
    }
  }
  @keyframes image-slide-left {
    from {
      right: 0px;
      bottom: 0px;
    }
    to {
      right: 1640px;
      bottom: 0px;
    }
  }
  @keyframes image-fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
</style>
