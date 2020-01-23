<script>
  import { goto } from "@sapper/app";
  import { selected, connections } from "../stores/connectionStore.js";
  let connectionsValue;
  let selectedValue;

  $: selectedConnection = connectionsValue[selectedValue];

  connections.subscribe(connections => connectionsValue = connections);
  selected.subscribe(selected => selectedValue = selected);

  function submit(event) {
    const newConn = {
      url: event.target.url.value,
      password: event.target.password.value
    };
    if (!selectedConnection) {
      connections.set([...connectionsValue, newConn]);
    }
    goto(`${selectedValue}/players`);
  }
</script>

<svelte:head>
  <title>Unitystation RCON</title>
</svelte:head>

<style>
  h1 {
    text-align: center;
    margin: 0 auto;
  }

  input,
  select,
  option {
    background: none;
    color: lightslategrey;
    font-size: 18px;
    padding: 10px 10px 10px 5px;
    margin: 1em auto;
    display: block;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid slateblue;
  }
  input:focus {
    outline: 0;
  }
  select:focus {
    outline: 0;
  }

  input[type="submit"] {
    border: 1px solid slateblue;
    color: slateblue;
  }

  input {
    width: 100%;
  }

  select {
    margin-right: 0;
    width: 50%;
  }

  form {
    width: 25em;
    margin: 0 auto;
  }
</style>

{#if process.browser}
  <div class="form">
    <h1>Connect</h1>
    <form on:submit|preventDefault={submit}>
      <select id="profile" bind:value={$selected}>
        {#each $connections as conn, value}
          <option {value}>{conn.url}</option>
        {/each}
        <option value={$connections.length + 1}>New...</option>
      </select>
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
      <input type="submit" value="Connect" />
    </form>
  </div>
{/if}
