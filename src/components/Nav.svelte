<script>
  import { rconMonitor } from "../stores/socketStore"
  import { stores } from "@sapper/app";
  const { preloading, page, session } = stores();
  export let segment;

  let value = rconMonitor.value;


  $: match = /(\d+)\/(\w+)/.exec($page.path) || [];
  $: path = match[1] || "";
</script>

<style>
  div {
    border-bottom: 2px solid rgba(106, 90, 205, 0.3);
    font-weight: 300;
    padding: 0 0.5em;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  /* clearfix */
  ul::after {
    content: "";
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
    font-size: 1.5em;
  }

  .selected {
    position: relative;
    display: inline-block;
  }

  .selected::after {
    position: absolute;
    content: "";
    width: calc(100% - 1em);
    height: 2px;
    background-color: slateblue;
    display: block;
    bottom: -1px;
  }

  a {
    text-decoration: none;
    padding: 0.5em 0.5em;
    display: block;
  }
</style>

<div>
  <nav>
    <ul>
      <li>
        <a rel="prefetch" href="..">&lt;</a>
      </li>
      <li>
        <a
          rel="prefetch"
          class:selected={segment === 'players'}
          href="{path}/players">
          players
        </a>
      </li>
      <li>
        <a
          rel="prefetch"
          class:selected={segment === 'chat'}
          href="{path}/chat">
          chat
        </a>
      </li>
      <li>
        <a
          rel="prefetch"
          class:selected={segment === 'console'}
          href="{path}/console">
          console
        </a>
      </li>
    </ul>
  </nav>
	<pre>{$value}</pre>
</div>
