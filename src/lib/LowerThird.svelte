<script lang="ts">
  import { slide } from 'svelte/transition'
  import { cubicInOut } from 'svelte/easing'
  
  import { state } from '../store'
  import { type Tape } from '../tapes'
  import Tag from './Tag.svelte'

  let tape: Tape | null = null
  let dismissed = false

  let dismissTimer = null as null | ReturnType<typeof setTimeout>
  state.subscribe((newState) => {
    if (newState.mode === 'screening') {
      tape = newState.tape
      dismissed = false

      if (dismissTimer) {
        clearTimeout(dismissTimer)
      }
      dismissTimer = setTimeout(() => {
        dismissed = true
      }, 8000)
    } else {
      tape = null
      dismissed = false
    }
  })
</script>

{#if tape && !dismissed}
<div
  transition:slide={{ duration: 500, easing: cubicInOut }}
  class="container"
  role="button"
  tabindex="0"
  on:click={() => {
    dismissed = true
  }}
  on:keypress={() => {
    dismissed = true
  }}
>
  <img src={tape.thumbnailUrl} alt={`Thumbnail for ${tape.title}`} />
  <div class="info">
    <p class="label">NOW PLAYING:</p>
    <h1 style={`border-color: ${tape.color}`}>{tape.title}</h1>
    <p class="stats">
      GVCR #{String(tape.id).padStart(3, '0')}{': '}
      {tape.runtime ? `${tape.runtime} minutes` : 'Unknown runtime'}
      {', '}
      {tape.year ? `${tape.year}` : 'unknown year'}
    </p>
    <div class="tags">
{#each tape.tags as tag}
      <Tag {tag} />
{/each}
    </div>
  </div>
</div>
{/if}

<style>
  .container {
    width: 100%;
    height: 25%;
    position: absolute;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 2%, rgba(0, 0, 0, 0.75) 5%, rgba(0, 0, 0, 0.75) 95%, rgba(0, 0, 0, 0) 98%);
    display: flex;
    user-select: none;
    cursor: pointer;
  }
  .container:hover {
    background: linear-gradient(to bottom, rgba(16, 16, 16, 0) 2%, rgba(16, 16, 16, 0.75) 5%, rgba(16, 16, 16, 0.75) 95%, rgba(16, 16, 16, 0) 98%);
  }
  .container:active {
    background: linear-gradient(to bottom, rgba(32, 32, 32, 0) 2%, rgba(32, 32, 32, 0.75) 5%, rgba(32, 32, 32, 0.75) 95%, rgba(32, 32, 32, 0) 98%);
  }
  img {
    height: fit-content;
    max-height: 25vh;
    margin: 0 1rem;
  }
  .info {
    margin-top: 1.8em;
    line-height: 1;
  }
  h1 {
    border-left: 0.2em solid;
    padding: 0.4em;
    margin-top: 0.2em;
    margin-bottom: 0.2em;
  }
  .tags {
    display: flex;
    padding: 0.75em 0;
    gap: 0.375em;
  }
</style>
