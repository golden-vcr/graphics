<script lang="ts">
  import { onMount, onDestroy } from "svelte"
  import { writable } from "svelte/store"
  import { AlertToaster, type Alert } from "./alerts"
  import { ChatClient, type ChatLine } from "./chat"
  import Toast from "./lib/Toast.svelte"
  import ChatLog from "./lib/ChatLog.svelte"

  const NUM_CHAT_LINES_TO_BUFFER = 50
  const SIMULATE_ALERTS = false
  const SIMULATE_CHAT = false

  const toast = writable(null as { alert: Alert, durationMs: number } | null)
  const chatLines = writable([] as ChatLine[])

  let toaster = null as AlertToaster | null
  let chat = null as ChatClient | null
  onMount(() => {
    toaster = new AlertToaster({
      onToast(alert, durationMs) {
        toast.set({ alert, durationMs })
      },
      onClear() {
        toast.set(null)
      },
    })
    chat = new ChatClient((line) => {
      chatLines.update((prev) =>
        prev.slice(prev.length - NUM_CHAT_LINES_TO_BUFFER - 1).concat([line])
      )
    })

    if (SIMULATE_ALERTS) {
      setTimeout(() => {
        toaster?.simulateAlert({ type: 'follow', data: { username: 'wasabimilkshake' }})
      }, 1000)
      setTimeout(() => {
        toaster?.simulateAlert({ type: 'raid', data: { username: 'bigjoebob', numViewers: 23 }})
      }, 1500)
    }
    if (SIMULATE_CHAT) {
      chatLines.set([
        {name: 'wasabimilkshake', color: '#ffcccc', text: 'hello, this is a message', emotes: []},
        {name: 'wasabimilkshake', color: '#ffcccc', text: 'this is another message', emotes: []},
        {name: 'bigjoebob', color: '#ccffcc', text: 'Hooray, hello', emotes: []},
        {name: 'PersonMan', color: '#ccccff', text: 'I spent $$45 today $0', emotes: [
          {name: 'FrankerZ', url: 'https://static-cdn.jtvnw.net/emoticons/v2/65/default/dark/2.0'},
        ]},
        {name: 'bigjoebob', color: '#ccffcc', text: 'This is a long message and it has a lot of words and it should be a message that wraps and does not expand the chat div', emotes: []},
        {name: 'PersonMan', color: '#ccccff', text: 'looooooooong message, like very looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong $0 $0 $0 $0', emotes: [
          {name: 'FrankerZ', url: 'https://static-cdn.jtvnw.net/emoticons/v2/65/default/dark/2.0'},
        ]},
        {name: 'wasabimilkshake', color: '#ffcccc', text: 'scroll 1', emotes: []},
        {name: 'wasabimilkshake', color: '#ffcccc', text: 'scroll 2', emotes: []},
        {name: 'wasabimilkshake', color: '#ffcccc', text: 'scroll 3', emotes: []},
        {name: 'wasabimilkshake', color: '#ffcccc', text: 'scroll 4', emotes: []},
        {name: 'wasabimilkshake', color: '#ffcccc', text: 'scroll 5', emotes: []},
        {name: 'wasabimilkshake', color: '#ffcccc', text: 'scroll 6', emotes: []},
        {name: 'wasabimilkshake', color: '#ffcccc', text: 'scroll 7', emotes: []},
        {name: 'wasabimilkshake', color: '#ffcccc', text: 'scroll 8', emotes: []},
        {name: 'wasabimilkshake', color: '#ffcccc', text: 'scroll 9', emotes: []},
        {name: 'wasabimilkshake', color: '#ffcccc', text: 'scroll 10', emotes: []},
        {name: 'bigjoebob', color: '#ccffcc', text: 'keep it scrolling, keep it scrolling', emotes: []},
        {name: 'bigjoebob', color: '#ccffcc', text: 'go on scroll it good', emotes: []},
        {name: 'bigjoebob', color: '#ccffcc', text: 'go on scroll it good', emotes: []},
      ])
    }
  })
  onDestroy(() => {
    if (toaster) {
      toaster.stop()
      toaster = null
    }
    if (chat) {
      chat.stop()
      chat = null
    }
  })
</script>

<main>
  <div class="video-overlay">
{#if $toast}
    <Toast alert={$toast.alert} />
{/if}
  </div>
  <div class="sidebar">
    <div class="camera-overlay">
    </div>
    <div class="chat-container">
      <ChatLog lines={$chatLines} />
    </div>
  </div>
</main>

<style>
main {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
}
.video-overlay {
  flex: 1 0 0;
  padding: 4rem;
  overflow: hidden;
}
.sidebar {
  flex: 0 0 480px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.camera-overlay {
  flex: 1;
}
.chat-container {
  flex: 2;
  display: flex;
  flex-direction: column-reverse;
  overflow: hidden;
  margin: 20px 0;
  margin-left: 10px;
}
</style>
