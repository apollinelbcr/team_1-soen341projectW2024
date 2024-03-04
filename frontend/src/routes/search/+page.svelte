<script lang="ts">
    import SearchFilter from "$lib/components/SearchBar.svelte";
    import JumpToTopButton from "$lib/components/Utils/JumpToTopButton.svelte";
    import FilterToggle from "$lib/components/Filter/FilterToggle.svelte";
    import ExploreFilter from "$lib/components/Filter/ExploreFilter.svelte";
    import Skeleton from "$lib/components/Utils/Skeleton.svelte";
    import Spinner from "$lib/components/Utils/Spinner.svelte";
    import InfiniteScroll from 'svelte-infinite-scroll';
    import CarCard from "$lib/components/Card/CarCard.svelte"
    import {type Car} from "$lib/model/Car";
    import {toast} from "svelte-sonner";
    import {writable} from "svelte/store";

    const limit = 20;
    let hasMore = true;
    let cars: Car[];
    let offset = limit;
    const selectedCarType = writable<string[]>([]);
    const selectedCapacity = writable<string[]>([]);
    const selectedTransmission = writable<string[]>([]);
    const selectedTotalPrice = writable<string[]>([]);
    const sortBy = writable<string>('');

    const fetchCars = async (reset = false) => {
        try {
            const data = [];//request to db
            if (reset) {
                cars = data;
                offset = limit; // Reset offset if it's a fresh fetch
            } else {
                cars = [...cars, ...data];
                offset += limit;
            }
            hasMore = true;
        } catch (error) {
            toast.error('Failed to fetch cars. Please try again later.');
        }
    };

    const fetchMore = async () => {
        const batch = []; //request to db

        if (!batch?.length) {
            hasMore = false;
        } else {
            cars = [...cars, ...batch];
            offset = offset + limit;
        }
    };
</script>
<SearchFilter/>
<div class='flex flex-col items-center py-8'>
    <div class='relative flex w-full max-w-xl flex-col lg:max-w-6xl lg:flex-row lg:justify-center'>
        <div class='sm:mx-2 lg:hidden'>
            <FilterToggle>
                <ExploreFilter
                        {selectedCarType}
                        {selectedCapacity}
                        {selectedTransmission}
                        {selectedTotalPrice}
                        {sortBy}
                        variant='mobile'
                />
            </FilterToggle>
        </div>
        <div class='m-2 mx-4 hidden lg:flex'>
            <ExploreFilter
                    {selectedCarType}
                    {selectedCapacity}
                    {selectedTransmission}
                    {selectedTotalPrice}
                    {sortBy}
                    variant='desktop'
            />
        </div>
        <div class='lg:flex-1'>
            <div class='mr-auto flex w-full max-w-xl flex-col overflow-y-hidden'>
                {#if cars !== undefined}
                    {#each cars as car}
                        <CarCard {...car}/>
                    {/each}
                    <InfiniteScroll hasMore={hasMore} threshold={cars?.length || 20} window={true}
                                    on:loadMore={() => fetchMore()}/>
                {:else }
                    <div class='mx-2 text-gray-50'>
                        <Skeleton className='mb-2 rounded-lg first:mt-2'
                                  color={'rgb(226 232 240)'}/>
                    </div>
                {/if}

                {#if !hasMore}
                    {#if cars?.length}
                        <div class='mx-auto mt-4 text-center'>
                            <p class='text-gray-500 dark:text-gray-400'>
                                No more cars to show
                            </p>
                        </div>
                    {:else }
                        <div class='mt-4 text-center'>
                            <Spinner/>
                        </div>
                    {/if}
                {/if}
            </div>
        </div>
    </div>
</div>
<JumpToTopButton/>