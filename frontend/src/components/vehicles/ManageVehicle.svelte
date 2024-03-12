<style>
    th {
        font-family: 'Open Sans', sans-serif;
        font-weight: bold;
    }
</style>
<script>
	// @ts-ignore
	/**
	 * @type {any}
	 */
	 export let title;
    import { onMount } from 'svelte';
    // @ts-ignore
    import CreateVehicle from '../CRUDBigButtons.svelte';
    
    // @ts-ignore
    /**
	 * @type {any[]}
	 */
    let vehicles = [];
    /**
	 * @type {any[]}
	 */
    let filteredVehicles = [];
    let filterStatus = '';

    onMount(async () => {
        try {
            const response = await fetch('http://localhost:3002/vehicles');
            vehicles = await response.json();
            
            //filteredVehicles = vehicles; // Initialize filteredVehicles with all vehicles
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }
    });

    import { navigate } from 'svelte-routing';

    // @ts-ignore
    // function filterByStatus(status) {
    //     if (status == 'AVAILABLE' || status == 'UNAVAILABLE') {
    //         filterStatus = status;
    //         // @ts-ignore
    //         filteredVehicles = vehicles.filter(vehicle => vehicle.status === status);
    //     } else {
    //         filterStatus = '';
    //         // @ts-ignore
    //         filteredVehicles = vehicles;
    //     }
    // }
</script>

<div class="mb-5 text-2xl font-medium text-gray-700">{title}</div>

<CreateVehicle buttonname='Create Vehicle'/>

<div class="container mt-10 rounded-lg">
    <div class="py-8">
            <div class="max-w-full overflow-x-auto rounded-lg">
                <table class="w-full leading-normal text-black">
                    <thead>
                        <tr class="border-t border-r border-l p-5 bg-gray-50">
                            <th
                                scope="col"
                                class="border-b border-gray-200 px-5 py-3 text-left text-sm font-normal uppercase"
                            >
                                Model
                            </th>
                            <th
                                scope="col"
                                class="border-b border-gray-200 px-5 py-3 text-left text-sm font-normal uppercase"
                            >
                                Type
                            </th>
                            <th
                                scope="col"
                                class="border-b border-gray-200 px-5 py-3 text-left text-sm font-normal uppercase"
                            >
                                Status
                            </th>
                            <th
                                scope="col"
                                class="border-b border-gray-200 px-5 py-3 text-left text-sm font-normal uppercase"
                            >Details</th>
                        </tr>
                    </thead>
                    <tbody class="text-black">
                        {#each vehicles as vehicle}
                        <tr class="border-t border-r border-l p-4">
                            <td class="border-b border-gray-200 p-5 text-sm">
                                    <p class="whitespace-nowrap">{vehicle.name_vehicle}</p>
                            </td>
                            <td class="border-b border-gray-200 p-5 text-sm">
                                <p class="whitespace-nowrap">{vehicle.vehicle_type}</p>
                            </td>
                            <td class="border-b border-gray-200 p-5 text-sm">
                                <span class="relative inline-block rounded-full px-3 py-1 font-semibold leading-tight"
                                      class:bg-green-200={vehicle.status === 'AVAILABLE'}
                                      class:bg-red-500={vehicle.status !== 'AVAILABLE'}>
                                    <span aria-hidden="true"
                                          class="absolute inset-0 rounded-full opacity-50">
                                    </span>
                                    <span class="relative">{vehicle.status}</span>
                                </span>
                            </td>
                            
                            <td class="border-b border-gray-200 p-5 text-sm">
                                <a href="/admin/manage_vehicles/edit-vehicle?id={vehicle.id}" class="text-blue-600 hover:text-indigo-900 cursor-pointer">
                                    <svg class="w-6 h-6 text-gray-800 dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm9.4-5.5a1 1 0 1 0 0 2 1 1 0 1 0 0-2ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4c0-.6-.4-1-1-1h-2Z" clip-rule="evenodd"/>
                                    </svg>
                                </a>
                            </td>                                                     
                                                        
                        </tr>
                       
                        {/each} 
                        <tr class="bg-gray-50">
                            <td class="border-b p-5 text-sm font-bold">
                                    <p class="whitespace-nowrap">Total number of cars</p>
                            </td>
                            <td class="border-b p-5 text-sm">
                                <p class="whitespace-nowrap"></p>
                            </td>
                            <td class="border-b p-5 text-sm">
                                
                            </td>
                            
                            <td class="border-b p-5 text-sm font-bold">
                                {vehicles.length}
                            </td>                            
                        </tr>   
                    </tbody>
                </table>

                
            </div>
        </div>
</div>