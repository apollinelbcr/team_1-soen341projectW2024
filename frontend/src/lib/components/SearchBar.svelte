<script lang="ts">
    import SveltyPicker from 'svelty-picker';

    const today: string = new Date().toISOString();
    let pickupLocation = '';
    let dropOffLocation = '';
    let pickupDate = today.slice(0, 10); // default to today's date
    let dropOffDate = today.slice(0, 10);
    let pickupTime = "10:30";
    let dropOffTime = "10:30";
    let differentDropOff = false;

</script>

<div class="mt-1 p-5 mx-auto">
    <form class="flex flex-col" action="/search">
        <div class="grid grid-cols-6 gap-4 lg:grid-cols-7">

            <div class="border rounded p-2 col-span-6 lg:col-span-2 h-14 border-gray-500 relative">
                <div class="absolute top-0">
                    <span class="text-xs text-gray-600">{differentDropOff ? 'Pick-up' : 'Pick-up and Drop-off'}</span>
                    <input type="text" placeholder="search..." class="text-black focus:outline-none h-full w-full"
                           bind:value={pickupLocation}/>
                </div>
            </div>

            <div class="border rounded p-2 col-span-3  lg:col-span-1 h-14 border-gray-500 relative">
                <div class="absolute top-0">
                    <span class="text-xs text-gray-600"> Pick-up date</span>
                    <SveltyPicker clearBtn={false} bind:value={pickupDate} inputClasses="w-full h-full"/>
                </div>
            </div>
            <div class="border border-gray-500 rounded p-2 col-span-3  lg:col-span-1 h-14 relative">
                <div class="absolute top-0">
                    <span class="text-xs text-gray-600">Drop-off date</span>
                    <SveltyPicker clearBtn={false} bind:value={dropOffDate} inputClasses="w-full h-full"/>
                </div>
            </div>
            <div class="border border-gray-500 rounded p-2 col-span-3  lg:col-span-1 h-14 relative">
                <div class="absolute top-0">
                    <span class="text-xs text-gray-600">Pick-up time</span>
                    <SveltyPicker clearBtn={false} mode="time" format="hh:ii" bind:value={pickupTime} inputClasses="w-full h-full"/>
                </div>
            </div>
            <div class="border border-gray-500 rounded p-2 col-span-3 lg:col-span-1 h-14 relative">
                <div class="absolute top-0">
                    <span class="text-xs text-gray-600">Drop-off time</span>
                    <SveltyPicker clearBtn={false} mode="time" format="hh:ii" bind:value={dropOffTime} inputClasses="w-full h-full"/>
                </div>
            </div>
            <button type="submit"
                    class="max-sm:mt-4 col-span-6 bg-blue-700 text-white p-4 rounded-full w-full sm:w-fit sm:col-span-1">Search
            </button>
        </div>
        <label class="flex flex-row items-center gap-3 mt-3 w-fit">
            <input type="checkbox" bind:checked={differentDropOff}/>
            <span class="text-sm text-gray-600">Add a different drop-off location</span>
        </label>
        {#if differentDropOff}
            <div class="border mt-3 rounded p-2 w-full lg:w-[28%] h-14 border-gray-500 relative">
                <div class="absolute top-0">
                    <span class="text-xs text-gray-600">Drop-off</span>
                    <input type="text" placeholder="search..." class="text-black focus:outline-none h-full w-full"
                           bind:value={dropOffLocation}/>
                </div>
            </div>
        {/if}
    </form>
</div>