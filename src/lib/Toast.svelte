<script lang="ts">
  import { type Alert } from "../alerts"
  import FollowToast from "./FollowToast.svelte"
  import RaidToast from "./RaidToast.svelte"
  export let alert: Alert
</script>

{#if alert.type === 'follow'}
<FollowToast username={alert.data.username} />
{:else if alert.type == 'raid'}
<RaidToast username={alert.data.username} numViewers={alert.data.numViewers} />
{/if}
