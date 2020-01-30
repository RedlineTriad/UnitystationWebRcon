<script>
  import { goto } from "@sapper/app";
  import { selected, connections } from "../stores/connectionStore.js";

  let newConnection = {url: "", password: ""}
  $: selectedConnection = $connections[$selected] || newConnection;

  function add(event) {
    if (selectedConnection === newConnection) {
      connections.update(c => [...c, newConnection]);
      console.log(`Setting selected to: ${$connections.length - 1}`);
      selected.set($connections.length - 1);
      newConnection = {url: "", password: ""};
    }
  }

  function deleteSelected(event) {
    connections.update(cs => cs.filter(c => c != selectedConnection));
    selected.set(Math.max(0, $selected - 1))
  }
</script>

<svelte:head>
  <title>Unitystation RCON</title>
</svelte:head>

<div class="form">
  <h1>Connect</h1>
  <form on:submit|preventDefault={add}>
    <div class="selection group">
      <div>
      <label for="connection">Connection:</label>
      </div>
      <select id="connection" class="inline" bind:value={$selected}>
        {#each $connections as conn, value}
          <option {value}>{conn.url}</option>
        {/each}
        <option value="-1">New...</option>
      </select>
      <button type="button" on:click={deleteSelected} class="inline">X</button>
    </div>
    <div class="group">
      <label for="url">URL:</label>
      <input
        type="text"
        id="url"
        placeholder="address:port"
        bind:value={selectedConnection.url} />
    </div>
    <div class="group">
      <label for="password">Password:</label>
      <input
        type="password"
        id="password"
        placeholder="password"
        bind:value={selectedConnection.password} />
    </div>
    <input type="submit" value="Add" />
  </form>
</div>


<style>
  h1 {
    text-align: center;
    margin: 0 auto;
  }

  input {
    width: 100%;
  }

  select {
    margin: 0;
    width: 85%;
    box-sizing: border-box;
  }

  .selection {
    padding: 0;
    margin-bottom: 3em;
  }

  button {
    float: right;
    height: 100%;
  }

  .inline {
    display: inline-flex;
    justify-content: flex-end;
    align-items: center;
  }

  .form {
    max-width: 25em;
    margin: 0 auto;
  }
</style>