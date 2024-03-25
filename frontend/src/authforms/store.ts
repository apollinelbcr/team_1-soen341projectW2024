import { writable } from 'svelte/store';

export const userinfo = writable({
    id: '',
    email: '',
    password:''
});


