<script lang="ts">
    import {Calendar, Gauge, PlaneTakeoff} from "lucide-svelte";
    import {repo} from "$lib/repo.js";
    import {page} from "$app/stores";
    import {onMount} from "svelte";
    import {writable} from "svelte/store";
    import type {Vehicle} from "$lib/model/Vehicle";
    import {calculateDaysBetween} from "$lib/utils";
    let showModal = false;

    function toggleModal() {
        showModal = !showModal;
    }

    $: extras = [
        {name: 'Booster seat', price: 23.00, checked: false},
        {name: 'Toddler seat', price: 23.00, checked: false},
        {name: 'Infant seat', price: 23.00, checked: false},
        {name: 'Cushion', price: 20.00, checked: false},
        {name: 'GPS', price: 20.00, checked: false},
        {name: 'Roof Boxes', price: 23.00, checked: false},
        {name: 'Extra Keys', price: 20.00, checked: false},
        {name: 'Windshield Washer', price: 21.00, checked: false},
        {name: 'Jump Starter', price: 21.00, checked: false},
    ];

    const dates = writable('');
    const locations = writable('');
    let id;
    let vehicle: Vehicle | null = null;
    $: basePrice = vehicle ? vehicle.price : 0;

    $: taxes = 0.15 * (selectedExtras.map(extra => extra.price).reduce((acc, extra) => acc + extra, 0) + (calculateDaysBetween($dates) * Number(basePrice)));
    $: total = selectedExtras.map(extra => extra.price).reduce((acc, extra) => acc + extra, 0) + (calculateDaysBetween($dates) * Number(basePrice)) + Number(taxes);
    $: selectedExtras = extras.filter(extra => extra.checked);


    $: if ($page.url.searchParams) {
        dates.set($page.url.searchParams.get('d'));
        locations.set($page.url.searchParams.get('l'));
        id = $page.url.searchParams.get('id');
    }

    onMount(async () => {
        vehicle = await repo.getVehicle(id);
    });

    function toggleExtra(index) {
        extras = extras.map((extra, i) => ({
            ...extra,
            checked: i === index ? !extra.checked : extra.checked
        }));
    }
</script>

<div id="whole-page" class="max-w-4xl mx-auto">
    <a href="/search" class="text-blue-900 text-xl font-bold mt-2 hover:underline">
        {'<-'} See all cars
    </a>

    <div class="flex max-lg:flex-wrap gap-5 justify-between mt-4">
        <div class="lg:w-3/5">
            <div class="box4">
                    <div class="flex flex-col items-start">
                        <h2 class="text-2xl font-bold">{vehicle?.name_vehicle}</h2>
                        <p class="text-sm">{`${vehicle?.vehicle_category} ${vehicle?.vehicle_type}`}</p>
                        <p class="my-2 flex items-center gap-2 text-sm">
                            <svg width="15" height="15" viewBox="0 0 24 24" role="img"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 4c0 .7-.4 1.38-1 1.73V10h6V5.73c-.62-.36-1-1.03-1-1.73 0-1.08.92-2 2-2s2 .92 2 2c0 .7-.38 1.37-1 1.73V10h6V5.73c-.62-.36-1-1.03-1-1.73 0-1.08.92-2 2-2s2 .92 2 2c0 .7-.38 1.37-1 1.73V10c0 1.09-.91 2-2 2h-6v6.27c.62.36 1 1.03 1 1.73 0 1.08-.92 2-2 2s-2-.92-2-2c0-.7.38-1.37 1-1.73V12H5v6.27c.62.36 1 1.03 1 1.73 0 1.08-.92 2-2 2s-2-.92-2-2c0-.7.38-1.37 1-1.73V5.73C2.4 5.38 2 4.7 2 4c0-1.09.92-2 2-2 1.09 0 2 .92 2 2z"></path>
                            </svg>
                            {vehicle?.vehicle_transmission}
                        </p>
                        <p class="my-2 flex items-center gap-2 text-sm">
                            <Gauge class="inline size-4"/>
                            Unlimited mileage
                        </p>
                        <p class="my-2 flex items-center gap-2 text-sm">
                            <PlaneTakeoff class="inline size-4"/>
                            Counter and car in terminal
                        </p>
                    </div>
                    <div class="flex flex-col gap-14 items-end">
                        <img src={vehicle?.image} alt="Car preview" class="w-40">
                        <div class="flex flex-col items-end">
                            <p class="text-xl font-bold">CA ${vehicle?.price}</p>
                            <p class="text-xs">total</p>
                        </div>
                    </div>

            </div>

            <div class="box5">
                    <div class="flex flex-col gap-2 justify-between text-sm">
                        <h3 class=" mb-2">Car rental location</h3>
                        <div class="text-sm mb-1">
                            Pick-up & Drop-off
                        </div>
                        <div class="flex gap-1">
                            <Calendar/>
                            {$dates}
                        </div>
                        <div class="flex gap-2 items-center">
                            <PlaneTakeoff/>
                            {$locations}
                        </div>
                    </div>
            </div>

            <div class="box6">
                <h3 class="mb-2">Rental policies</h3>
                <ul class="text-sm list-disc list-inside">
                    <li>Drivers under 25 years of age may need to pay an extra fee.</li>
                    <li>For additional driver charges, mileage and fuel policy, extra hours or other important
                        information,
                        read rules and restrictions.
                    </li>
                </ul>
            </div>

            <div class="box5">
                <h3 class="mb-4">Extras</h3>
                <div class="grid grid-cols-1 gap-4">
                    {#each extras as extra, i (extra.name)}
                        <div class="flex items-center">
                            <input type="checkbox" bind:checked={extras[i].checked}
                                   on:click={() => toggleExtra(i)}
                                   class="form-checkbox h-5 w-5 text-blue-600"/>
                            <label class="ml-2 text-sm font-medium text-gray-700">
                                {extra.name}
                            </label>
                            <span class="ml-auto text-sm text-gray-500">
                                    CA ${extra.price.toFixed(2)} per day
                                </span>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
        <div class="lg:w-2/5">
            <div class="box7 hidden lg:block p-2 rounded-md">
                <div class="flex gap-1 items-end">
                    <p class="text-xl font-bold">CA ${vehicle?.price}</p>
                    <p class="text-xs">total</p>
                </div>
                <div class="my-2 flex flex-col items-start gap-2 text-sm">
                    <p class="text-xs text-green-900">Free cancellation</p>
                </div>
            </div>

            <div class="box6 rounded-md">
                <div class="mb-6">
                    <h2 class="text-xl font-bold text-gray-800">Price details</h2>
                </div>
                <div class="mb-4">
                    <div class="flex justify-between items-center">
                        <div>Car rental fee x {calculateDaysBetween($dates)} day</div>
                        <div>CA ${calculateDaysBetween($dates) * Number(basePrice)}</div>
                    </div>
                    {#each selectedExtras as extra}
                        <div class="flex justify-between items-center mt-2">
                            <div>{extra.name}</div>
                            <div>CA ${extra.price.toFixed(2)}</div>
                        </div>
                    {/each}
                    <div class="flex justify-between items-center mt-2">
                        <div>Taxes and fees</div>
                        <div>CA ${taxes.toFixed(2)}</div>
                    </div>
                </div>
                <div class="border-t border-gray-200 my-4"></div>
                <div class="flex justify-between items-center font-bold mb-4">
                    <div>Total</div>
                    <div>CA ${total.toFixed(2)}</div>
                </div>
                <a href={`/payment?id=${vehicle?.id}&d=${$dates}&l=${$locations}&extras=${JSON.stringify(selectedExtras)}`} class="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out">
                    Reserve
                </a>
            </div>
        </div>
    </div>

    <div class="my-4 px-4 py-2 flex flex-col justify-center items-center">
        <p class="text-gray-600 text-sm mr-3">Your opinion matters. Tell us what's missing on this page</p>
        <button on:click={toggleModal} class="bg-white hover:bg-blue-100 text-blue-400 py-2 px-4 border border-gray-400 rounded-lg shadow">
            Share feedback
        </button>
    </div>
</div>

{#if showModal}
    <div class="modal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center;">
        <div class="modal-content" style="background: white; padding: 20px; border-radius: 8px; max-width: 500px; width: 100%;">
            <iframe src="https://forms.gle/SmZDDjh2XwAXpbD48" width="100%" height="500" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
            <button on:click={toggleModal} class="bg-red-500 text-white font-semibold py-2 px-4 border border-red-700 rounded hover:bg-red-400 mt-2">
                Close
            </button>

        </div>
    </div>
{/if}