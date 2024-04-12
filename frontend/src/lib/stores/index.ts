import {writable} from "svelte/store";
import { browser } from '$app/environment';

function createPersistentStore(key, startValue) {
    let data = startValue;

    if (browser) {
        const storedValue = localStorage.getItem(key);
        data = storedValue ? JSON.parse(storedValue) : startValue;
    }

    const store = writable(data);

    if (browser) {
        store.subscribe(value => {
            localStorage.setItem(key, JSON.stringify(value));
        });
    }

    return store;
}

export const selectedBranch = createPersistentStore('selectedBranch', null);