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
    import VehicleCard from "$lib/components/Card/VehicleCard.svelte";

    let cars: Vehicle[];
    const selectedCarType = writable<string[]>([]);
    const selectedCategory = writable<string[]>([]);
    const selectedTransmission = writable<string[]>([]);
    const sortBy = writable<string>('');
    let isMounted = false;
    let showingVehicles: Vehicle[];
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
        type: nullable($selectedCarType?.map(t => t.toUpperCase())),
        category: nullable($selectedCategory?.map(t => t.toUpperCase())),
        transmission: nullable($selectedTransmission?.map(t => t.toUpperCase())),
        sortBy: $sortBy,
    };

    const fetchCars = async () => {
        try {
            cars = await repo.getVehicles();
            showingVehicles = cars
        } catch (error) {
            toast.error('Failed to fetch cars. Please try again later.');
        }
    };

    onMount(() => {
        fetchCars();
        isMounted = true;
    });

    function filterCars(filters: any) {
    let filteredCars = cars;

    // Filter by car type if specified
    if (filters.type && filters.type.length > 0) {
        filteredCars = filteredCars.filter(car =>
            filters.type.includes(car.vehicle_type));
    }

    // Filter by category if specified
    if (filters.category && filters.category.length > 0) {
        filteredCars = filteredCars.filter(car =>
            filters.category.includes(car.vehicle_category));
    }

    // Filter by transmission if specified
    if (filters.transmission && filters.transmission.length > 0) {
        filteredCars = filteredCars.filter(car =>
            filters.transmission.includes(car.vehicle_transmission));
    }

    // Sort cars if specified
    if (filters.sortBy) {
        if (filters.sortBy === 'Total price') {
            filteredCars.sort((a, b) => a.price - b.price);
        }
    }

    showingVehicles = filteredCars;
    }

    $: {
        const currentState = JSON.stringify([$selectedCarType, $selectedCategory, $selectedTransmission, $sortBy]);

        if (isMounted && (currentState !== previousState)) {
            filterCars(filters);
            previousState = currentState;
        }
    }

</script>
<SearchFilter differentDropOff={pickupLocation !== dropOffLocation} pickupLocation={$pickupLocation} dropOffLocation={$dropOffLocation} pickupDate={new Date($pickupDate).toISOString().slice(0, 10)}
dropOffDate={new Date($dropOffDate).toISOString().slice(0, 10)} pickupTime={$pickupTime}  dropOffTime={$dropOffTime}
/>
<div class='flex flex-col items-center py-8'>
    <div class='relative flex w-full max-w-xl flex-col lg:max-w-6xl lg:flex-row lg:justify-center'>
        <div class='sm:mx-2 lg:hidden'>
            <FilterToggle>
                <ExploreFilter
                        {selectedCarType}
                        {selectedCategory}
                        {selectedTransmission}
                        {sortBy}
                        variant='mobile'
                />
            </FilterToggle>
        </div>
        <div class='m-2 mx-4 hidden lg:flex'>
            <ExploreFilter
                    {selectedCarType}
                    {selectedCategory}
                    {selectedTransmission}
                    {sortBy}
                    variant='desktop'
            />
        </div>
        <div class='lg:flex-1'>
            <div class='mr-auto flex w-full max-w-xl flex-col overflow-y-hidden'>
                {#if cars !== undefined}
                    {#each showingVehicles as vehicle}
                        <VehicleCard {vehicle}/>
                    {/each}
                {:else }
                    <div class='mx-2 text-gray-50'>
                        <Skeleton className='mb-2 rounded-lg first:mt-2'
                                  color={'rgb(226 232 240)'}/>
                    </div>
                {/if}

                {#if showingVehicles?.length}
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