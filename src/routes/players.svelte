<script>
  import { connections, selected } from "../stores/connectionStore.js";
  import { generateWS } from "../stores/socketStore.js";
  let connectionsValue;
  let selectedValue;

  $: selectedConnection = connectionsValue[selectedValue];
  $: ws = generateWS(selectedConnection, "rconplayerlist", {
        timeout: Infinity,
        maxAttempts: 10,
        onopen: e => ws.send("players"),
        onmessage: e => response = e.data
      });
  let response;

  connections.subscribe(connections => connectionsValue = connections);
  selected.subscribe(selected => selectedValue = selected);
</script>

<svelte:head>
  <title>Player List</title>
</svelte:head>

<pre>{response}</pre>
