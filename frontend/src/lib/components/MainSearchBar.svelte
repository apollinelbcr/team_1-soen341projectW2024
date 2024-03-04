<script lang="ts">
    import SveltyPicker from 'svelty-picker';

    const today: string = new Date().toISOString();
    let pickupLocation = '';
    let dropOffLocation = 'Same as pick-up';
    let pickupDate = today.slice(0, 10); // default to today's date
    let dropOffDate = today.slice(0, 10);
    let pickupTime = "10:30";
    let dropOffTime = "10:30";

</script>

<div class="mt-5 sm:mt-10 sm:mx-10 sm:border border-gray-400 border-solid rounded-3xl p-5">

    <form class="flex flex-col" action="/search">
        <div class="grid grid-cols-6 gap-4 lg:grid-cols-4">
            <input type="text" placeholder="Pick-up"
                   class="focus:outline-none focus:border-blue-500 border rounded p-2 col-span-6 md:col-span-3 lg:col-span-2 h-12 border-gray-500"
                   bind:value={pickupLocation}/>
            <input type="text" placeholder="Drop-off"
                   class="focus:outline-none focus:border-blue-500 border rounded p-2 col-span-6 md:col-span-3 lg:col-span-2 h-12 border-gray-500"
                   value={dropOffLocation}/>

            <div class="border rounded p-2 col-span-3  lg:col-span-1 h-14 border-gray-500 relative">
                <div class="absolute top-0">
                    <span class="text-xs text-gray-600">Pick-up location</span>
                    <SveltyPicker clearBtn={false} bind:value={pickupDate} inputClasses="w-full h-full"/>
                </div>
            </div>
            <div class="border border-gray-500 rounded p-2 col-span-3  lg:col-span-1 h-14 relative">
                <div class="absolute top-0">
                    <span class="text-xs text-gray-600">Pick-up location</span>
                    <SveltyPicker clearBtn={false} bind:value={dropOffDate} inputClasses="w-full h-full"/>
                </div>
            </div>
            <div class="border border-gray-500 rounded p-2 col-span-3  lg:col-span-1 h-14 relative">
                <div class="absolute top-0">
                    <span class="text-xs text-gray-600">Pick-up time</span>
                    <SveltyPicker clearBtn={false} mode="time" format="hh:ii" bind:value={pickupTime} inputClasses="w-full h-full"/>
                </div>
            </div>
            <div class="border border-gray-500 rounded p-2 col-span-3  lg:col-span-1 h-14 relative">
                <div class="absolute top-0">
                    <span class="text-xs text-gray-600">Pick-up time</span>
                    <SveltyPicker clearBtn={false} mode="time" format="hh:ii" bind:value={dropOffTime} inputClasses="w-full h-full"/>
                </div>
            </div>
        </div>
        <button type="submit" class="mt-4 bg-blue-700 text-white p-4 rounded-full w-fit max-sm:w-full">Search</button>
    </form>
</div>

<style>
</style>
