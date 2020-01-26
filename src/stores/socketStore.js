import sockette from "sockette";
import { selectedConnection, connections } from "./connectionStore";
import { writable, derived } from "svelte/store";

export const generateWS = (connection, channel, params) =>
  sockette(`ws://${connection.password}@${connection.url}/${channel}`, params)

export const generateDefaultWS = (connection, channel, params) =>
  generateWS(connection, channel, { ...{ timeout: Infinity, maxAttempts: 10 }, ...params });


export const consoleData = writable([]);

export const consoleSocket = derived(selectedConnection, con => {
  if (!con) return null;
  const ws = generateDefaultWS(con, "rconconsole", {
    onopen: e => ws.send("logfull"),
    onmessage: e => consoleData.update(d => [...d, e.data])
  });
  return ws;
});
if (process.browser) consoleSocket.subscribe(() => {
  consoleData.set([]);
});



export const chatData = writable("");

export const chatSocket = derived(selectedConnection, con => {
  if (!con) return null;
  const ws = generateDefaultWS(con, "rconchat", {
    onopen: e => ws.send("chatfull"),
    onmessage: e => chatData.update(d => d + e.data)
  });
  return ws;
});
if (process.browser) chatSocket.subscribe(() => {
  chatData.set("");
});



export const playerData = writable([]);

export const playerSocket = derived(selectedConnection, con => {
  if (!con) return null;
  const ws = generateDefaultWS(con, "rconplayerlist", {
    onopen: e => ws.send("players"),
    onmessage: e => { playerData.set(JSON.parse(e.data).players) }
  });
  return ws;
});
if (process.browser) playerSocket.subscribe(() => {
  playerData.set([]);
});



export const rconData = writable();

export const rconSocket = derived(selectedConnection, con => {
  if (!con) return null;
  const ws = generateDefaultWS(con, "rconmonitor", {
    onmessage: e => { rconData.set(e.data) }
  });
  return ws;
});
if (process.browser) rconSocket.subscribe(() => {
  rconData.set();
});