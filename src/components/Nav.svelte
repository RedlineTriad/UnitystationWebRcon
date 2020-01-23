<script context="module">
	export async function preload(page, session) {
		return { path: page.path };
	}
</script>

<script>
	export let path;
	export let segment;
	//$: match = /(\d+)\/(\w+)/.exec(path);
	$: console.log(path);
</script>

<style>
	nav {
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 300;
		padding: 0 1em;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	.selected {
		position: relative;
		display: inline-block;
	}

	.selected::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: slateblue;
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
</style>

<nav>
	<ul>
		<li><a rel=prefetch class:selected='{segment === "players"}' href='${1}/players'>players</a></li>
		<li><a rel=prefetch class:selected='{segment === "chat"}' href='${1}/chat'>chat</a></li>
	</ul>
</nav>
