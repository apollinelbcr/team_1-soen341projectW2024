<script>
    import {Calendar, Gauge, PlaneTakeoff} from "lucide-svelte";
    import PriceDetails from "$lib/components/Card/PriceDetails.svelte";

    let vehicle = {
        name_vehicle: "ford",
        vehicle_category: "suv",
        vehicle_type: "Test",
        vehicle_transmission: "automatic",
        image: "/car_pictures/ford_F150_2018.jpeg",
        price: "40"
    }

    let extras = [
        {name: 'Booster seat', price: 23, checked: true},
        {name: 'Toddler seat', price: 23, checked: true},
        {name: 'Infant seat', price: 23, checked: true},
        {name: 'Left hand control', price: 0, checked: false},
        {name: 'Right hand control', price: 0, checked: false},
        {name: 'Spinner knob', price: 0, checked: false},
        {name: 'Seat belt extensions', price: 0, checked: false},
    ];

    //className="max-w-sm mx-auto"
</script>

<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="overflow-hidden my-5">
        <div class="flex flex-col lg:flex-row justify-between lg:gap-5">
            <div class="lg:w-2/3 shadow-lg rounded-lg bg-white border">
                <button class="flex items-center justify-between border-b p-4 rounded-lg relative w-full">
                    <div class="flex flex-col items-start">
                        <h2 class="text-2xl font-bold">{vehicle.name_vehicle}</h2>
                        <p class="text-sm">{`${vehicle.vehicle_category} ${vehicle.vehicle_type}`}</p>
                        <p class="my-2 flex items-center gap-2 text-sm">
                            <svg width="15" height="15" viewBox="0 0 24 24" role="img"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 4c0 .7-.4 1.38-1 1.73V10h6V5.73c-.62-.36-1-1.03-1-1.73 0-1.08.92-2 2-2s2 .92 2 2c0 .7-.38 1.37-1 1.73V10h6V5.73c-.62-.36-1-1.03-1-1.73 0-1.08.92-2 2-2s2 .92 2 2c0 .7-.38 1.37-1 1.73V10c0 1.09-.91 2-2 2h-6v6.27c.62.36 1 1.03 1 1.73 0 1.08-.92 2-2 2s-2-.92-2-2c0-.7.38-1.37 1-1.73V12H5v6.27c.62.36 1 1.03 1 1.73 0 1.08-.92 2-2 2s-2-.92-2-2c0-.7.38-1.37 1-1.73V5.73C2.4 5.38 2 4.7 2 4c0-1.09.92-2 2-2 1.09 0 2 .92 2 2z"></path>
                            </svg>
                            {vehicle.vehicle_transmission}
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
                        <img src={vehicle.image} alt="Car preview" class="w-40">
                        <div class="flex flex-col items-end">
                            <p class="text-xl font-bold">CA ${vehicle.price}</p>
                            <p class="text-xs">total</p>
                        </div>
                    </div>

                </button>

                <div class="p-4 md:p-8 border-b">
                    <div class="flex flex-col gap-2 justify-between text-sm">
                        <h3 class="font-semibold mb-2">Car rental location</h3>
                        <div class="text-sm mb-1">
                            Pick-up & Drop-off
                        </div>
                        <div class="flex gap-1">
                            <Calendar/>
                            Sat, Apr 6, 10:30 a.m. - Sun, Apr 7, 10:30 a.m.
                        </div>
                        <div class="flex gap-2 items-center">
                            <PlaneTakeoff/>
                            JAX Airport <br>
                            2400 Jacksonville Intl Airport, Yankee Clipper Drive, Jacksonville, Florida, USA 32218
                        </div>
                        <!-- Other location details -->
                    </div>
                </div>

                <!-- Rental policies -->
                <div class="p-4 md:p-8 border-b">
                    <h3 class="font-semibold mb-2">Rental policies</h3>
                    <ul class="text-sm list-disc list-inside">
                        <li>Drivers under 25 years of age may need to pay an extra fee.</li>
                        <li>For additional driver charges, mileage and fuel policy, extra hours or other important
                            information,
                            read rules and restrictions.
                        </li>
                    </ul>
                    <!-- Other policies details -->
                </div>

                <!-- Extras -->
                <div class="p-4 md:p-8 max-lg:border-b">
                    <h3 class="font-semibold mb-4">Extras</h3>
                    <div class="grid grid-cols-1 gap-4">
                        {#each extras as extra}
                            <div class="flex items-center">
                                <input type="checkbox" checked={extra.checked}
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
                <PriceDetails className="lg:hidden"/>
            </div>

            <div class="hidden lg:block lg:w-1/3">
                <div class="flex flex-col items-start justify-between bg-white rounded-lg border p-4 relative w-full ">
                    <div class="flex gap-1 items-end">
                        <p class="text-xl font-bold">CA ${vehicle.price}</p>
                        <p class="text-xs">total</p>
                    </div>
                    <div class="my-2 flex flex-col items-start gap-2 text-sm">
                        <p class="text-xs text-green-900">Free cancellation</p>
                    </div>
                </div>

                <PriceDetails className="border mt-3 text-sm"/>
            </div>
        </div>
    </div>

    <div class="px-4 py-2 flex flex-col justify-center items-center">
        <p class="text-gray-600 text-sm mr-3">Your opinion matters. Tell us what's missing on this page</p>
        <button class="bg-white hover:bg-blue-100 text-blue-400 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow">
            Share feedback
        </button>
    </div>
</div>