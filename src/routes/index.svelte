<script>
  import { goto } from "@sapper/app";
  import { selected, connections } from "../stores/connectionStore.js";

  $: selectedConnection = $connections[$selected];

  function add(event) {
    const newConn = {
      url: event.target.url.value,
      password: event.target.password.value
    };
    if (!selectedConnection) {
      connections.update(c => [...c, newConn]);
    }
  }

  function deleteSelected(event) {
    connections.update(cs => cs.filter(c => c != selectedConnection));
  }
</script>

<svelte:head>
  <title>Unitystation RCON</title>
</svelte:head>

<div class="form">
  <h1>Connect</h1>
  <form on:submit|preventDefault={add}>
    <div class="selection">
      <select id="profile" class="inline" bind:value={$selected}>
        {#each $connections as conn, value}
          <option {value}>{conn.url}</option>
        {/each}
        <option value={$connections.length}>New...</option>
      </select>
      <button type="button" on:click={deleteSelected} class="inline">X </button>
    </div>
    {#if selectedConnection == null}
      <input type="text" id="url" placeholder="address:port" />
      <input type="password" id="password" placeholder="password" />
    {:else}
      <input
        type="text"
        id="url"
        placeholder="address:port"
        bind:value={selectedConnection.url} />
      <input
        type="password"
        id="password"
        placeholder="password"
        bind:value={selectedConnection.password} />
    {/if}
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
    width: 80%;
    margin: 0;
  }

  .selection {
    padding: 0;
  }

  button {
    margin: 0;
    float: right;
    width: 2.5em;
    padding: 0.5em;
  }

  .inline {
    display: inline-flex;
    justify-content: flex-end;
    align-items: center;
  }

  .form {
    width: 25em;
    margin: 0 auto;
  }
</style>