<script>
  import { playerData } from "../../stores/socketStore.js";
</script>

<svelte:head>
  <title>Player List</title>
</svelte:head>

<ul>
{#each $playerData as player}
   <li>{player.playerName}</li>
{/each}
</ul>
