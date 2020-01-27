<script>
  import { rconPlayers } from "../stores/socketStore.js";
  let value = rconPlayers.value
</script>

<svelte:head>
  <title>Player List</title>
</svelte:head>

<ul>
{#each $value as player}
   <li>{player.playerName}</li>
{/each}
</ul>
