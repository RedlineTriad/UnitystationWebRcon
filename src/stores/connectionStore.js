import localstore from './localstore';
import { derived } from 'svelte/store';

export const selected = localstore("selected", 0)
export const connections = localstore("connections", [])

export const selectedConnection = derived([selected, connections], ([$selected, $connections]) => {
    return $connections[$selected];
})