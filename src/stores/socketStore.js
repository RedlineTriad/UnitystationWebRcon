import sockette from "sockette";
import { selectedConnection, connections } from "./connectionStore";
import { writable, derived } from "svelte/store";

export const generateWS = (connection, channel, params) =>
    sockette(`ws://${connection.password}@${connection.url}/${channel}`, params)

export const generateDefaultWS = (connection, channel, params) =>
    generateWS(connection, channel, { ...{ timeout: Infinity, maxAttempts: 10 }, ...params });

export const generateConnection = ({ channel, defaultValue, openMessage, update }) => {
    let value = writable(defaultValue);
    let socket = derived(selectedConnection, con => {
        if (!con) return null;
        const ws = generateDefaultWS(con, channel, {
            onopen: _ => { if (openMessage) ws.send(openMessage) },
            onmessage: e => value.update(v => update(v, e))
        });
        return ws;
    });
    let oldSocket;
    if (process.browser) socket.subscribe(s => {
        if (oldSocket) oldSocket.close();
        oldSocket = s;
        value.set(defaultValue);
    });
    return {
        value,
        socket
    };
}

export const rconConsole = generateConnection({
    channel: "rconconsole",
    defaultValue: [],
    openMessage: "logfull",
    update: (v, e) => [...v, e.data]
})

export const rconChat = generateConnection({
    channel: "rconchat",
    defaultValue: "",
    openMessage: "chatfull",
    update: (v, e) => v + e.data
})

export const rconPlayers = generateConnection({
    channel: "rconplayerlist",
    defaultValue: [],
    openMessage: "players",
    update: (v, e) => JSON.parse(e.data).players
})

export const rconMonitor = generateConnection({
    channel: "rconmonitor",
    defaultValue: [],
    update: (v, e) => e.data
})