import { writable } from 'svelte/store';

export const selected = writable((typeof window !== "undefined" ? localStorage.getItem("selected") : null) || 0);

if (typeof window !== "undefined") {
    selected.subscribe(val => {
        localStorage.setItem("selected", val)
    });
}

export const connections = writable(
    (typeof window !== "undefined" ? JSON.parse(localStorage.getItem("connections")) : null) || []
);

if (typeof window !== "undefined") {
    connections.subscribe(val => {
        localStorage.setItem("connections", JSON.stringify(val))
    });
}