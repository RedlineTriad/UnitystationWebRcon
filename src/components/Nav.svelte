<script>
	import { stores } from '@sapper/app';
	const { preloading, page, session } = stores();
	export let segment;
	$: match = /(\d+)\/(\w+)/.exec($page.path) || [];
	$: path = match[1] || ''
</script>

<nav>
	<ul>
		<li><a rel=prefetch href='..'>&lt;</a></li>
		<li><a rel=prefetch class:selected='{segment === "players"}' href='{path}/players'>players</a></li>
		<li><a rel=prefetch class:selected='{segment === "chat"}' href='{path}/chat'>chat</a></li>
	</ul>
</nav>

<style>
	nav {
		border-bottom: 1px solid rgba(0,62,255,.1);
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
