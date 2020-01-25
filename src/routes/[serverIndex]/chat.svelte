<script>
	import { beforeUpdate, afterUpdate, onMount } from 'svelte';
    import { chatData, chatSocket } from "../../stores/socketStore.js";

	let div;
	let autoscroll;
  
  	onMount(() => {
    	div.scrollTo(0, div.scrollHeight);
  	})

	beforeUpdate(() => {
		autoscroll = div && (div.offsetHeight + div.scrollTop) > (div.scrollHeight - 20);
	});

	afterUpdate(() => {
		if (autoscroll) div.scrollTo(0, div.scrollHeight);
	});
</script>

<svelte:head>
  <title>Chat</title>
</svelte:head>

<pre bind:this={div}>{@html $chatData}</pre>

<style>
  pre {
    display: block;
    box-sizing: border-box;
    overflow: scroll;
    height: 70vh;
  }
</style>