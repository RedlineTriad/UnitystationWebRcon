<script context="module">
  export async function preload(page, session) {
    return { selectedValue: page.params.serverIndex };
  }
</script>

<script>
  import { beforeUpdate, afterUpdate, onMount } from "svelte";
  import { rconConsole } from "../stores/socketStore.js";
  let socket = rconConsole.socket;
  let value = rconConsole.value;

  let form;

  function submit(event) {
    $socket.send("1" + event.target.command.value);
    form.reset();
  }

  let div;
  let autoscroll;

  onMount(() => {
    div.scrollTo(0, div.scrollHeight);
  });

  beforeUpdate(() => {
    autoscroll =
      div && div.offsetHeight + div.scrollTop > div.scrollHeight - 20;
  });

  afterUpdate(() => {
    if (autoscroll) div.scrollTo(0, div.scrollHeight);
  });
</script>

<style>
  .log {
    height: 80vh;
    overflow: auto;
  }

  input {
    width: 100%;
  }
</style>

<svelte:head>
  <title>Player List</title>
</svelte:head>

<div class="console">
  <div bind:this={div} class="log">
    {#each $value as data}
      <div>
        {@html data}
      </div>
    {/each}
  </div>
  <form bind:this={form} on:submit|preventDefault={submit}>
    <input type="text" id="command" placeholder="Type command here..." />
  </form>
</div>
