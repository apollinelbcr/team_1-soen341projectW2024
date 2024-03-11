<script lang="ts">
    import {createEventDispatcher} from 'svelte';
    import {twMerge} from "tailwind-merge";

    export let placeholder = '';
    export let locations: string[] = [];
    export let value = '';
    export let name = '';

    const dispatch = createEventDispatcher();

    function selectLocation(location) {
        value = location;
        dispatch('select', {location});
    }

    $: shownLocations = locations.filter(location => location.toLowerCase().includes(value?.toLowerCase()))
</script>

<div class={twMerge("relative w-full", $$props.class)}>
    <input {name} type="text" placeholder={placeholder} bind:value
           class="w-full border border-gray-300 p-2 z-30 h-12 text-lg font-medium focus:outline-none"/>
    <ul class="absolute z-20 w-full bg-white border rounded-b-md border-gray-300 h-60 overflow-auto text-left">
        {#if value}
            {#each shownLocations as location}
                <li on:click={() => selectLocation(location)} class="p-2 hover:bg-gray-100 cursor-pointer">
                    {location}
                </li>
            {/each}
        {/if}
    </ul>
</div>
