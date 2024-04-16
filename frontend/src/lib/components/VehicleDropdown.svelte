<script lang="ts">
    import type { Vehicle } from '$lib/model/Vehicle';
    import {onMount} from "svelte";
    import {repo} from "$lib/repo";

     let vehicles: Vehicle[];
     let selectedVehicle: Vehicle;
    export let onSelectVehicle: (vehicle: Vehicle) => void;
    export let showDropdown: boolean = true;

    onMount(async () => {
        vehicles = await repo.getVehicles();
        selectedVehicle = vehicles[0];
        console.log(selectedVehicle)
    });
</script>

<div class="relative mb-4" class:invisible={!showDropdown}>
    <select
            bind:value={selectedVehicle}
            on:change={() => onSelectVehicle(selectedVehicle)}
            class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
    >
        {#if !vehicles}
            <option value="">Loading...</option>
        {/if}
        {#if vehicles?.length > 0}
            {#each vehicles as vehicle}
                <option value={vehicle}>
                    {vehicle.name_vehicle}
                </option>
            {/each}
        {/if}
    </select>

    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M5.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.576 0 0.436 0.445 0.408 1.197 0 1.615l-4.415 4.242c-0.408 0.392-1.041 0.392-1.449 0l-4.415-4.242c-0.408-0.418-0.436-1.17 0-1.615z"/>
        </svg>
    </div>
</div>

<style>
    select:invalid { color: gray; }
</style>
