<script lang="ts">
    import {twMerge} from "tailwind-merge";
    import FilterButton from "./FilterButton.svelte";
    import {sortByOptions, carTypes, categories, transmissions} from "$lib/filters";
    import type {Writable} from "svelte/store";
    import {RefreshCw} from "lucide-svelte";
    import ResetButton from "./ResetButton.svelte";
    import Autocomplete from "./Autocomplete.svelte";

    export let selectedCarType: Writable<string[]>;
    export let selectedCategory: Writable<string[]>;
    export let selectedTransmission: Writable<string[]>;
    export let sortBy: Writable<string>;
    export let variant: 'mobile' | 'desktop';


    let rotate = false;

    function resetFilters() {
        selectedCarType.set([]);
        selectedCategory.set([]);
        selectedTransmission.set([])
        sortBy.set('')
        rotate = true;

        setTimeout(() => {
            rotate = false;
        }, 500);
    }
</script>

<div class={twMerge(
        variant === 'mobile' ? 'w-full' : 'w-[340px]',
        'relative flex h-fit flex-col flex-wrap rounded-lg bg-slate-50 px-8 py-6'
      )}>
    <ResetButton className='absolute right-4 top-4'>
        <button on:click={resetFilters} class:rotate-once={rotate}>
            <RefreshCw class={'h-5 w-5 text-gray-500'}/>
        </button>
    </ResetButton>

    <h1 class='text-sm font-semibold text-gray-600'>Sort By</h1>
    <div class='py-1'/>
    <div class='relative z-20'>
        <Autocomplete reset={rotate} options={sortByOptions} storeValue={sortBy}/>
    </div>

    <div class='py-2.5'/>
    <h1 class='text-sm font-semibold text-gray-600'>Car Type</h1>
    <div class='py-1'/>
    <div class='flex flex-wrap gap-2 py-1'>
        {#each carTypes as type, i (i)}
            <FilterButton name={type}
                    isSelected={$selectedCarType.includes(type)}
                    selections={selectedCarType}
            />
        {/each}
    </div>

    <div class='py-2.5'/>
    <h1 class='text-sm font-semibold text-gray-600'>Capacity</h1>
    <div class='py-1'/>
    <div class='flex flex-wrap gap-2'>
        {#each categories as category, i (i)}
            <FilterButton
                    name={category}
                    isSelected={$selectedCategory.includes(category)}
                    selections={selectedCategory}
            />
        {/each}
    </div>

    <div class='py-2.5'/>
    <h1 class='text-sm font-semibold text-gray-600'>Transmission</h1>
    <div class='py-1'/>
    <div class='flex flex-wrap gap-2'>
        {#each transmissions as transmission, i (i)}
            <FilterButton
                    name={transmission}
                    isSelected={$selectedTransmission.includes(transmission)}
                    selections={selectedTransmission}
            />
        {/each}
    </div>

</div>