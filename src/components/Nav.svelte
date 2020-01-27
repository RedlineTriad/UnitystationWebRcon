<script>
  import { rconMonitor } from "../stores/socketStore";
  export let segment;

  let value = rconMonitor.value;
  let socket = rconMonitor.socket;
</script>

<div class="header">
<div class="container">
  <nav>
    <ul>
      <li>
        <a rel="prefetch" class:selected={segment === undefined} href=".">connect</a>
      </li>
        <li>
          <a
            rel="prefetch"
            class:selected={segment === 'players'}
            class:disabled={!$socket}
            href="players">
            players
          </a>
        </li>
        <li>
          <a 
            rel="prefetch" 
            class:selected={segment === 'chat'}
            class:disabled={!$socket}
            href="chat">
            chat
          </a>
        </li>
        <li>
          <a
            rel="prefetch"
            class:selected={segment === 'console'}
            class:disabled={!$socket}
            href="console">
            console
          </a>
        </li>
    </ul>
  </nav>
  <pre>{$value}</pre>
</div>
</div>

<style>
  .header {
    border-bottom: 2px solid rgba(106, 90, 205, 0.3);
  }

  .container {
    font-weight: 300;
    padding: 0 0.5em;
    margin: 0 auto;
    max-width: 80%;
    margin: 0 auto;
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
    bottom: -8px;
  }

  a {
    text-decoration: none;
    padding: 0.25em 0.5em;
    display: block;
  }
  
  a.disabled {
    pointer-events: none;
    color: #777;
  }

  nav {
    display: inline-block;
  }

  pre {
    padding: 0.25em 0.5em;
    float: right;
  }
</style>