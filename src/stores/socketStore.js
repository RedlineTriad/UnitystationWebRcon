import sockette from "sockette";
import { connections, selected } from "./connectionStore";
import { writable, derived } from "svelte/store";

export const generateWS = (connection, channel, params) => 
    sockette(`ws://${connection.password}@${connection.url}/${channel}`, params)

export const updateWithConnection = func => 
    derived([connections, selected], ([$con, $sel]) => process.browser ? func($con[$sel]) : null);



export const consoleData = writable([]);

export const consoleSocket = updateWithConnection(con => {
    const ws = generateWS(con, "rconconsole", {
        timeout: Infinity,
        maxAttempts: 10,
        onopen: e => ws.send("logfull"),
        onmessage: e => consoleData.update(d => [...d, e.data])
      });
    return ws;
});
if(process.browser) consoleSocket.subscribe(() => {});



export const chatData = writable("");

export const chatSocket = updateWithConnection(con => {
    const ws = generateWS(con, "rconchat", {
        timeout: Infinity,
        maxAttempts: 10,
        onopen: e => ws.send("chatfull"),
        onmessage: e => chatData.update(d => d + e.data)
      });
    return ws;
});
if(process.browser) chatSocket.subscribe(() => {});



export const playerData = writable([]);

export const playerSocket = updateWithConnection(con => {
    const ws = generateWS(con, "rconplayerlist", {
        timeout: Infinity,
        maxAttempts: 10,
        onopen: e => ws.send("players"),
        onmessage: e => {playerData.set(JSON.parse(e.data).players)}
      });
    return ws;
});
if(process.browser) playerSocket.subscribe(() => {});



export const rconData = writable();

export const rconSocket = updateWithConnection(con => {
    const ws = generateWS(con, "rconmonitor", {
        timeout: Infinity,
        maxAttempts: 10,
        onmessage: e => {rconData.set(e.data)}
      });
    return ws;
});
if(process.browser) rconSocket.subscribe(() => {});