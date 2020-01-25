import { writable } from 'svelte/store';

export default (key, defaultValue) => {
    const store = writable(
        (process.browser ? JSON.parse(localStorage.getItem(key)) : null) 
            || defaultValue
        );
    
    if(process.browser){
        store.subscribe(val => {
            localStorage.setItem(key, JSON.stringify(val))
        });
    }
    return store;
}