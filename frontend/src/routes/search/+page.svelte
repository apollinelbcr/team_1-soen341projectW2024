<script lang="ts">
    import SearchFilter from "$lib/components/SearchBar.svelte";
    import JumpToTopButton from "$lib/components/Utils/JumpToTopButton.svelte";
    import FilterToggle from "$lib/components/Filter/FilterToggle.svelte";
    import ExploreFilter from "$lib/components/Filter/ExploreFilter.svelte";
    import Skeleton from "$lib/components/Utils/Skeleton.svelte";
    import CarCard from "$lib/components/Card/CarCard.svelte"
    import {toast} from "svelte-sonner";
    import {writable} from "svelte/store";
    import {repo} from "$lib/repo";
    import {onMount} from "svelte";
    import {type Vehicle} from "$lib/model/Vehicle";
    import {page} from "$app/stores";

    let cars: Vehicle[];
    const selectedCarType = writable<string[]>([]);
    const selectedCapacity = writable<string[]>([]);
    const selectedTransmission = writable<string[]>([]);
    const selectedTotalPrice = writable<string[]>([]);
    const sortBy = writable<string>('');
    let isMounted = false;
    let previousState = '';

    const pickupLocation = writable('');
    const dropOffLocation = writable('');
    const pickupDate = writable('');
    const dropOffDate = writable('');
    const pickupTime = writable('');
    const dropOffTime = writable('');

    $: if ($page.url.searchParams) {
        pickupLocation.set($page.url.searchParams.get('pickup_location'));
        dropOffLocation.set($page.url.searchParams.get('dropoff_location'));
        pickupDate.set($page.url.searchParams.get('start_date'));
        dropOffDate.set($page.url.searchParams.get('end_date'));
        pickupTime.set($page.url.searchParams.get('start_time'));
        dropOffTime.set($page.url.searchParams.get('end_time'));
    }

    const nullable = (arr: string[]) => (arr.length === 0 ? null : arr);

    $: filters = {
        type: nullable($selectedCarType),
        capacity: nullable($selectedCapacity),
        transmission: nullable($selectedTransmission),
        price: nullable($selectedTotalPrice),
        sortBy: $sortBy,
    };

    const fetchCars = async () => {
        try {
            cars = await repo.getVehicles();
        } catch (error) {
            toast.error('Failed to fetch cars. Please try again later.');
        }
    };

    onMount(() => {
        fetchCars();
        isMounted = true;
    });

    function filterCars(filters: any) {

    }

    $: {
        const currentState = JSON.stringify([$selectedCarType, $selectedCapacity, $selectedTransmission, $selectedTotalPrice, $sortBy]);

        if (isMounted && (currentState !== previousState)) {
            filterCars(filters);
            previousState = currentState;
        }
    }

</script>
<SearchFilter pickupLocation={$pickupLocation} dropOffLocation={$dropOffLocation} pickupDate={new Date($pickupDate).toISOString().slice(0, 10)}
dropOffDate={new Date($pickupDate).toISOString().slice(0, 10)} pickupTime={$pickupTime}  dropOffTime={$dropOffTime}
/>
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
                {:else }
                    <div class='mx-2 text-gray-50'>
                        <Skeleton className='mb-2 rounded-lg first:mt-2'
                                  color={'rgb(226 232 240)'}/>
                    </div>
                {/if}

                {#if cars?.length}
                    <div class='mx-auto mt-4 text-center'>
                        <p class='text-gray-500 dark:text-gray-400'>
                            No more cars to show
                        </p>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>
<JumpToTopButton/>