<script lang="ts">
  import { onMount, onDestroy } from "svelte"
  import { writable } from "svelte/store"
  
  import { ChatLog, type ChatPayloadAppend } from "../chat"
  
  import Toast from "../lib/Toast.svelte"
  import ChatLogView from "../lib/ChatLogView.svelte"
  import LowerThird from "../lib/LowerThird.svelte"

  const NUM_CHAT_LINES_TO_BUFFER = 50
  const SIMULATE_CHAT = false

  const chatMessages = writable([] as ChatPayloadAppend[])

  let chat = null as ChatLog | null
  onMount(() => {
    chat = new ChatLog(NUM_CHAT_LINES_TO_BUFFER, chatMessages)
    if (SIMULATE_CHAT) {
      chat.simulateEvent({type: 'append', payload: {messageId: '1', userId: '90790024', username: 'wasabimilkshake', color: '#ffcccc', text: 'hello, this is a message', emotes: []}})
      chat.simulateEvent({type: 'append', payload: {messageId: '2', userId: '90790024', username: 'wasabimilkshake', color: '#ffcccc', text: 'this is another message', emotes: []}})
      chat.simulateEvent({type: 'append', payload: {messageId: '3', userId: '1337', username: 'bigjoebob', color: '#ccffcc', text: 'Hooray, hello', emotes: []}})
      chat.simulateEvent({type: 'append', payload: {messageId: '4', userId: '1001', username: 'PersonMan', color: '#ccccff', text: 'I spent $$45 today $0', emotes: [{name: 'FrankerZ', url: 'https://static-cdn.jtvnw.net/emoticons/v2/65/default/dark/1.0'}]}})
      chat.simulateEvent({type: 'append', payload: {messageId: '5', userId: '1337', username: 'bigjoebob', color: '#ccffcc', text: 'This is a long message and it has a lot of words and it should be a message that wraps and does not expand the chat div', emotes: []}})
      chat.simulateEvent({type: 'append', payload: {messageId: '6', userId: '1001', username: 'PersonMan', color: '#ccccff', text: 'looooooooong message, like very looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong $0 $0 $0 $0', emotes: [{name: 'FrankerZ', url: 'https://static-cdn.jtvnw.net/emoticons/v2/65/default/dark/1.0'}]}})
      setTimeout(() => {
        chat?.simulateEvent({type: 'append', payload: {messageId: '7', userId: '90790024', username: 'wasabimilkshake', color: '#ffcccc', text: 'scroll 1', emotes: []}})
        chat?.simulateEvent({type: 'append', payload: {messageId: '8', userId: '90790024', username: 'wasabimilkshake', color: '#ffcccc', text: 'scroll 2', emotes: []}})
        chat?.simulateEvent({type: 'append', payload: {messageId: '9', userId: '90790024', username: 'wasabimilkshake', color: '#ffcccc', text: 'scroll 3', emotes: []}})
        chat?.simulateEvent({type: 'append', payload: {messageId: '10', userId: '90790024', username: 'wasabimilkshake', color: '#ffcccc', text: 'scroll 4', emotes: []}})
        chat?.simulateEvent({type: 'append', payload: {messageId: '11', userId: '90790024', username: 'wasabimilkshake', color: '#ffcccc', text: 'scroll 5', emotes: []}})
        chat?.simulateEvent({type: 'append', payload: {messageId: '12', userId: '90790024', username: 'wasabimilkshake', color: '#ffcccc', text: 'scroll 6', emotes: []}})
        chat?.simulateEvent({type: 'append', payload: {messageId: '13', userId: '90790024', username: 'wasabimilkshake', color: '#ffcccc', text: 'scroll 7', emotes: []}})
        chat?.simulateEvent({type: 'append', payload: {messageId: '14', userId: '90790024', username: 'wasabimilkshake', color: '#ffcccc', text: 'scroll 8', emotes: []}})
        chat?.simulateEvent({type: 'append', payload: {messageId: '15', userId: '90790024', username: 'wasabimilkshake', color: '#ffcccc', text: 'scroll 9', emotes: []}})
        chat?.simulateEvent({type: 'append', payload: {messageId: '16', userId: '90790024', username: 'wasabimilkshake', color: '#ffcccc', text: 'scroll 10', emotes: []}})
        chat?.simulateEvent({type: 'append', payload: {messageId: '17', userId: '1337', username: 'bigjoebob', color: '#ccffcc', text: 'keep it scrolling, keep it scrolling', emotes: []}})
        chat?.simulateEvent({type: 'append', payload: {messageId: '18', userId: '1337', username: 'bigjoebob', color: '#ccffcc', text: 'go on scroll it good', emotes: []}})
        chat?.simulateEvent({type: 'append', payload: {messageId: '19', userId: '1337', username: 'bigjoebob', color: '#ccffcc', text: 'go on scroll it good', emotes: []}})
      }, 600)
      setTimeout(() => {
        chat?.simulateEvent({type: 'append', payload: {messageId: '20', userId: '6969', username: 'offensive_jim', color: '#99ccff', text: 'hey guys hows it going', emotes: []}})
      }, 1500)
      setTimeout(() => {
        chat?.simulateEvent({type: 'append', payload: {messageId: '21', userId: '6969', username: 'offensive_jim', color: '#99ccff', text: 'my name is Offensive Jim', emotes: []}})
      }, 2100)
      setTimeout(() => {
        chat?.simulateEvent({type: 'append', payload: {messageId: '22', userId: '6969', username: 'offensive_jim', color: '#99ccff', text: "you're not my real dad", emotes: []}})
      }, 2500)
      setTimeout(() => {
        chat?.simulateEvent({type: 'delete', payload: {messageId: '22'}})
      }, 3500)
      setTimeout(() => {
        chat?.simulateEvent({type: 'append', payload: {messageId: '23', userId: '6969', username: 'offensive_jim', color: '#99ccff', text: "hey what gives, quit deleting my messages or I'll make you sorry", emotes: []}})
      }, 5000)
      setTimeout(() => {
        chat?.simulateEvent({type: 'append', payload: {messageId: '24', userId: '1337', username: 'bigjoebob', color: '#ccffcc', text: 'cool it, jim', emotes: []}})
      }, 6200)
      setTimeout(() => {
        chat?.simulateEvent({type: 'append', payload: {messageId: '25', userId: '6969', username: 'offensive_jim', color: '#99ccff', text: 'no', emotes: []}})
      }, 7300)
      setTimeout(() => {
        chat?.simulateEvent({type: 'ban', payload: {userId: '6969'}})
      }, 8000)
      setTimeout(() => {
        chat?.simulateEvent({type: 'clear'})
      }, 9000)
      setTimeout(() => {
        chat?.simulateEvent({type: 'append', payload: {messageId: '26', userId: '1337', username: 'bigjoebob', color: '#ccffcc', text: 'we did it $0 $1', emotes: [{name: 'tjsontMegaman', url: ''}]}})
      }, 9800)
    }
  })
  onDestroy(() => {
    if (chat) {
      chat.stop()
      chat = null
    }
  })
</script>

<main>
  <ChatLogView messages={$chatMessages} />
</main>

<style>
main {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column-reverse;
}
</style>
