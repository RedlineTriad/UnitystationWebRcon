<script>
  import { goto } from "@sapper/app";
  import { selected, connections } from "../stores/connectionStore.js";

  $: selectedConnection = $connections[$selected];

  function submit(event) {
    const newConn = {
      url: event.target.url.value,
      password: event.target.password.value
    };
    if (!selectedConnection) {
      connections.update(c => [...c, newConn]);
    }
    goto(`${$selected}/players`);
  }

  function deleteSelected(event){
    connections.update(cs => cs.filter(c => c != $selected));
  }
</script>

<svelte:head>
  <title>Unitystation RCON</title>
</svelte:head>

{#if process.browser}
  <div class="form">
    <h1>Connect</h1>
    <form on:submit|preventDefault={submit}>
      <div class="right">
        <select id="profile" class="inline" bind:value={$selected}>
          {#each $connections as conn, value}
            <option {value}>{conn.url}</option>
          {/each}
          <option value={$connections.length + 1}>New...</option>
        </select>
        <button onclick={deleteSelected} class="inline">X</button>
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
      <input type="submit" value="Connect" />
    </form>
  </div>
{/if}


<style>
  h1 {
    text-align: center;
    margin: 0 auto;
  }

  input {
    width: 100%;
  }

  select {
    width: 50%;
    margin-left: 8em;
  }

  button {
  }

  .inline {
    display: inline-flex;
    justify-content: flex-end;
    align-items: center;
  }

  form {
    width: 25em;
    margin: 0 auto;
  }
</style>