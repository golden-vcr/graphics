<script lang="ts">
  import { Router, Route } from "svelte-routing"
  
  import ChatPage from "./pages/ChatPage.svelte"
  import OverlayPage from "./pages/OverlayPage.svelte"

  export let url = ""
</script>

<Router {url}>
  <Route path="/graphics/chat" component={ChatPage} />
  <Route path="/graphics/overlay" component={OverlayPage} />
</Router>
