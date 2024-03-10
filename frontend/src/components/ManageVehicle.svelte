<style>
    th {
        font-family: 'Open Sans', sans-serif;
        font-weight: bold;
    }
</style>
<script>
	// @ts-ignore
	export let title;

    import { onMount } from 'svelte';
    
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
            const response = await fetch('http://localhost:3000/vehicles');
            vehicles = await response.json();
            
            //filteredVehicles = vehicles; // Initialize filteredVehicles with all vehicles
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }
    });

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

<div class="container mt-10 border">
    <div class="py-8">
        <div class="py-4">
            <div class="max-w-full overflow-x-auto rounded-lg">
                <table class="w-full leading-normal text-black">
                    <thead>
                        <tr>
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
                                Image
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
                            >Editing</th>
                        </tr>
                    </thead>
                    <tbody class="text-black">
                        {#each vehicles as vehicle}
                        <tr>
                            <td class="border-b border-gray-200 p-2 text-sm">
                                <div class="ml-3">
                                    <p class="whitespace-nowrap">{vehicle.name_vehicle}</p>
                                </div>
                            </td>
                            <td class="border-b border-gray-200 p-5 text-sm">
                                <p class="whitespace-nowrap">{vehicle.image}</p>
                            </td>
                            <td class="border-b border-gray-200 p-5 text-sm">
                                <p class="whitespace-nowrap">{vehicle.vehicle_type}</p>
                            </td>
                            <td class="border-b border-gray-200 p-5 text-sm">
                                <span class="relative inline-block px-3 py-1 font-semibold leading-tight">
                                    <span
                                        aria-hidden="true"
                                        class="absolute inset-0 rounded-full bg-green-200 opacity-50"
                                    />
                                    <span class="relative">{vehicle.status}</span>
                                </span>
                            </td>
                            <td class="border-b border-gray-200 p-5 text-sm">
                                <span class="text-blue-600 hover:text-indigo-900"> Edit </span>
                            </td>
                        </tr>
                       
                        {/each}    
                    </tbody>
                </table>

                <div class="xs:flex-row xs:justify-between flex flex-col items-center p-5">
                    <div class="flex items-center">
                        <button
                            type="button"
                            class="w-full rounded-l-xl border bg-white p-4 text-base text-gray-600 hover:bg-gray-100"
                        >
                            <svg
                                width="9"
                                fill="currentColor"
                                height="8"
                                class=""
                                viewBox="0 0 1792 1792"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"
                                />
                            </svg>
                        </button>
                        <button
                            type="button"
                            class="w-full border-y bg-white px-4 py-2 text-base text-indigo-500 hover:bg-gray-100"
                        >
                            1
                        </button>
                        <button
                            type="button"
                            class="w-full border bg-white px-4 py-2 text-base text-gray-600 hover:bg-gray-100"
                        >
                            2
                        </button>
                        <button
                            type="button"
                            class="w-full border-y bg-white px-4 py-2 text-base text-gray-600 hover:bg-gray-100"
                        >
                            3
                        </button>
                        <button
                            type="button"
                            class="w-full border bg-white px-4 py-2 text-base text-gray-600 hover:bg-gray-100"
                        >
                            4
                        </button>
                        <button
                            type="button"
                            class="w-full rounded-r-xl border-y border-r bg-white p-4 text-base text-gray-600 hover:bg-gray-100"
                        >
                            <svg
                                width="9"
                                fill="currentColor"
                                height="8"
                                class=""
                                viewBox="0 0 1792 1792"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>