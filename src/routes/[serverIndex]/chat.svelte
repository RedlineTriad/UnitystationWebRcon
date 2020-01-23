<script context="module">
	export async function preload(page, session) {
		return { selectedValue: page.params.serverIndex };
	}
</script>

<script>
  import { connections } from "../../stores/connectionStore.js";
  import { generateWS } from "../../stores/socketStore.js";
  export let selectedValue;
  let connectionsValue;

  $: selectedConnection = connectionsValue[selectedValue];
  $: ws = generateWS(selectedConnection, "rconchat", {
        timeout: Infinity,
        maxAttempts: 10,
        onopen: e => ws.send("chatfull"),
        onmessage: e => response = e.data
      });
  let response;

  connections.subscribe(connections => connectionsValue = connections);
</script>

<svelte:head>
  <title>Player List</title>
</svelte:head>

<pre>{@html response}</pre>
