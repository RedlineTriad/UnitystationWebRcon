import sockette from "sockette";

export const generateWS = (connection, channel, params) => {
    return sockette(`ws://${connection.password}@${connection.url}/${channel}`, params);
}