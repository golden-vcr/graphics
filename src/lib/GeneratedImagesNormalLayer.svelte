<script lang="ts">
  export let username: string
  export let description: string
</script>

<div class="osd-safe">
  <div class="osd-bg">
    <p class="osd-md">INCOMING TRANSMISSION FROM:<br />{username}</p>
  </div>
  <div class="spacer" />
  <div class="osd-bg" style="margin-top: 1rem">
    <p class="osd-md">&lt;&lt; {description} &gt;&gt;</p>
  </div>
</div>

<style>
  .osd-safe {
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: center;
  }
  .spacer {
    flex: 1;
  }
</style>
