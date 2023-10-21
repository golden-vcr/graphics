<script lang="ts">
  import { onMount } from "svelte"
  import { type ChatMessage } from "../chat";
  export let message: ChatMessage
  let textSpan: HTMLSpanElement

  onMount(() => {
    // Build an array of elements making up our message: i.e. spans of text
    // interspersed with emote images
    const elems = [] as HTMLElement[]

    // Sanitize any literal dollar signs which have been escaped as double-dollar
    let s = message.text.replaceAll('$$', '\ufffd')

    // Process our string, splitting on emote placeholders ('$0', '$1', etc.) and
    // appending to elems while iteratively reducing s in the process
    for (;;) {
      // Check for the first occurrence of an emote placeholder: if not found, add a
      // span containing all remaining text and break out of the loop
      const match = s.match(/\$(\d+)/)
      if (!match) {
        if (s.length > 0) {
          const span: HTMLSpanElement = document.createElement('span')
          span.innerText = s.replaceAll('\ufffd', '$')
          elems.push(span)
        }
        break
      }

      // If we found an emote placeholder, chop off any preceding plain text and add it
      // as a span
      const prefix = s.slice(0, match.index)
      if (prefix.length > 0) {
        const span: HTMLSpanElement = document.createElement('span')
        span.innerText = prefix.replaceAll('\ufffd', '$')
        elems.push(span)
      }

      // Update our string to chop off any prefix along with the placeholder we found
      s = s.slice((match.index || 0) + match[0].length)

      // The number in the placeholder indicates an array into our message's emotes
      // array: identify the emote and render it
      const emoteIndex = parseInt(match[1])
      const emote = message.emotes[emoteIndex]
      if (emote) {
        if (emote.url) {
          // If we have a URL for the emote, render it as an image
          const img: HTMLImageElement = document.createElement('img')
          img.src = emote.url
          img.alt = emote.name
          elems.push(img)
        } else {
          // We know the emote name but we failed to resolve an image URL, so render
          // the emote name in a span
          const span: HTMLSpanElement = document.createElement('span')
          span.className = 'missing-emote'
          span.innerText = `{${emote.name}}`
          elems.push(span)
        }
      } else {
        // The placeholder indicates an invalid emote index
        const span: HTMLSpanElement = document.createElement('span')
        span.className = 'missing-emote'
        span.innerText = '{{bad emote}}'
        elems.push(span)
      }
    }

    // Add all the elements that make up our message
    for (const elem of elems) {
      textSpan.appendChild(elem)
    }
  })
</script>

<div class="line">
  <b style={`color: ${message.color}`}>{message.username}:</b> <span bind:this={textSpan} />
</div>

<style>
  .line {
    background-color: rgba(0, 0, 0, 0.7);
    border-bottom: 2px solid rgba(0, 0, 0, 0.375);
    border-left: 2px solid rgba(0, 0, 0, 0.375);
    font-size: 22px;
    line-height: 1.25;
    padding: 0.25rem;
  }
  .line:last-child {
    padding-bottom: 1rem;
  }
</style>
