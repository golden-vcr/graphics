<script lang="ts">
  import { type ChatMessage } from '../chat'
  import ChatLogLineTextSpan from './ChatLogLineTextSpan.svelte'
  import ChatLogLineEmoteImage from './ChatLogLineEmoteImage.svelte'

  export let message: ChatMessage

  type LineElement = {
    type: 'text'
    text: string
    isMissingEmote?: boolean
  } | {
    type: 'emote'
    url: string
    name: string
  }

  function renderMessage(m: ChatMessage): LineElement[] {
    // Build an array of elements making up our message: i.e. spans of text
    // interspersed with emote images
    const elems = [] as LineElement[]

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
          elems.push({ type: 'text', text: s.replaceAll('\ufffd', '$') })
        }
        break
      }

      // If we found an emote placeholder, chop off any preceding plain text and add it
      // as a span
      const prefix = s.slice(0, match.index)
      if (prefix.length > 0) {
        elems.push({ type: 'text', text: prefix.replaceAll('\ufffd', '$') })
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
          elems.push({ type: 'emote', url: emote.url, name: emote.name })
        } else {
          // We know the emote name but we failed to resolve an image URL, so render
          // the emote name in a span
          elems.push({ type: 'text', text: `{${emote.name}}`, isMissingEmote: true })
        }
      } else {
        // The placeholder indicates an invalid emote index
        elems.push({ type: 'text', text: `{{bad emote}}`, isMissingEmote: true })
      }
    }
    return elems
  }
</script>

<div class="line">
  <b style={`color: ${message.color}`}>{message.username}:</b>
  <span>
{#each renderMessage(message) as elem}
{#if elem.type === 'text'}
    <ChatLogLineTextSpan text={elem.text} isMissingEmote={!!elem.isMissingEmote} />
{:else if elem.type === 'emote'}
    <ChatLogLineEmoteImage url={elem.url} name={elem.name} />
{:else}
    <b>Unrecognized chat line element: {JSON.stringify(elem)}</b>
{/if}
{/each}
  </span>
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
