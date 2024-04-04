<script lang="ts">
    import SveltyPicker from 'svelty-picker';
    import {MapPin} from "lucide-svelte";
    import AutocompleteInput from "../../components/AutocompleteInput.svelte";
    import {clickOutside} from '../clickOutside';
    import {showAlert} from "$lib/utils";
    import {goto} from "$app/navigation";

    export let vehicleId = "";
    const today: string = new Date().toISOString();
    let pickupLocation = '';
    let dropOffLocation = '';
    let pickupDate = today.slice(0, 10);
    let dropOffDate = today.slice(0, 10);
    let pickupTime = "10:30";
    let dropOffTime = "10:30";

    function handleSubmit() {
        const newSearch = {
            pickupLocation,
            dropOffLocation,
            pickupDate,
            dropOffDate,
        };

        const searches = JSON.parse(localStorage.getItem('recentSearches') || '[]');

        // Add the new search to the beginning of the array and limit the total number of stored searches
        searches.unshift(newSearch);
        searches.splice(5); // Keep only the latest 5 searches, adjust the number as needed

        // Store the updated searches back into localStorage
        localStorage.setItem('recentSearches', JSON.stringify(searches));
    }

    const locations = [
        'Honolulu (HNL - Daniel K. Inouye Intl.)', // Honolulu International Airport
        'Seattle (SEA - Seattle-Tacoma Intl.)', // Seattle-Tacoma International Airport
        'Denver (DEN - Denver Intl.)', // Denver International Airport
        'New York (JFK - John F. Kennedy Intl.)', // John F. Kennedy International Airport
        'Las Vegas (LAS - McCarran Intl.)', // McCarran International Airport
        'Toronto (YYZ - Toronto Pearson Intl.)', // Toronto Pearson International Airport
        'Los Angeles (LAX - Los Angeles Intl.)', // Los Angeles International Airport
        "Chicago (ORD - O'Hare Intl.)", // O'Hare International Airport
        'San Francisco (SFO - San Francisco Intl.)', // San Francisco International Airport
        'Miami (MIA - Miami Intl.)', // Miami International Airport
        'Orlando (MCO - Orlando Intl.)', // Orlando International Airport
        'Atlanta (ATL - Hartsfield-Jackson Atlanta Intl.)', // Hartsfield-Jackson Atlanta International Airport
        'Dallas (DFW - Dallas/Fort Worth Intl.)', // Dallas/Fort Worth International Airport
        'Boston (BOS - Logan Intl.)', // Logan International Airport
        'London (LHR - Heathrow Airport)', // Heathrow Airport
        'Paris (CDG - Charles de Gaulle Airport)', // Charles de Gaulle Airport
        'Tokyo (HND - Haneda Airport)', // Haneda Airport
        'Sydney (SYD - Sydney Airport)', // Sydney Airport
        'Berlin (BER - Berlin Brandenburg Airport)', // Berlin Brandenburg Airport
        'Dubai (DXB - Dubai International Airport)', // Dubai International Airport
    ];

    let pickUpVisible = false;
    let dropOffVisible = false;

    function handlePickUpToggle() {
        pickUpVisible = true;
        dropOffVisible = false;
    }
    function handleDropOffToggle() {
        pickUpVisible = false;
        dropOffVisible = true;
    }

    function handleClickOutside() {
        pickUpVisible = false;
        dropOffVisible = false;
    }

</script>

<div class="mt-5 sm:mt-10 sm:mx-10 sm:border border-gray-400 border-solid rounded-3xl p-5 z-10 bg-white absolute top-1/3 w-11/12">
    <form class="flex flex-col" action="/search" on:submit={handleSubmit}>
        <div class="w-full bg-red-800 h-full rounded-xl mx-auto mb-2 text-white p-4 hidden">Please correct the errors to continue</div>
        <div class="grid grid-cols-6 gap-4 lg:grid-cols-4">
            <button use:clickOutside on:click_outside={handleClickOutside} on:click={handlePickUpToggle} type="button" class="col-span-6 md:col-span-3 lg:col-span-2 border rounded h-12 border-gray-500 flex {!pickUpVisible ? 'items-center' : ''} gap-3">
                <MapPin class="ml-2 {pickUpVisible ? 'hidden' : 'block'}"/>
                <span class="{pickUpVisible ? 'hidden' : 'block'}" >{pickupLocation.trim() === '' ? 'Pick-up Location' : pickupLocation}</span>
                <AutocompleteInput name="pickup_location" bind:value={pickupLocation} {locations} placeholder="Pick-up Location" class="{pickUpVisible ? 'block' : 'hidden'}"/>
            </button>
            <button use:clickOutside on:click_outside={handleClickOutside} on:click={handleDropOffToggle} type="button" class="col-span-6 md:col-span-3 lg:col-span-2 border rounded h-12 border-gray-500 flex {!dropOffVisible ? 'items-center' : ''} gap-3">
                <MapPin class="ml-2 {dropOffVisible ? 'hidden' : 'block'}"/>
                <span class="{dropOffVisible ? 'hidden' : 'block'}" >{dropOffLocation.trim() === '' ? 'Drop-off Location' : dropOffLocation}</span>
                <AutocompleteInput name="dropoff_location" bind:value={dropOffLocation} {locations} placeholder="Drop-off Location" class="{dropOffVisible ? 'block' : 'hidden'}"/>
            </button>
            <div class="border rounded p-2 col-span-3  lg:col-span-1 h-14 border-gray-500 relative">
                <div class="absolute top-0">
                    <span class="text-xs text-gray-600">Pick-up Date</span>
                    <SveltyPicker clearBtn={false} mode="date" name="start_date" bind:value={pickupDate}
                                  inputClasses="w-full h-full"/>
                </div>
            </div>
            <div class="border border-gray-500 rounded p-2 col-span-3  lg:col-span-1 h-14 relative">
                <div class="absolute top-0">
                    <span class="text-xs text-gray-600">Drop-off Date</span>
                    <SveltyPicker clearBtn={false} mode="date" name="end_date" bind:value={dropOffDate}
                                  inputClasses="w-full h-full"/>
                </div>
            </div>
            <div class="border border-gray-500 rounded p-2 col-span-3  lg:col-span-1 h-14 relative">
                <div class="absolute top-0">
                    <span class="text-xs text-gray-600">Pick-up time</span>
                    <SveltyPicker clearBtn={false} mode="time" name="start_time" format="hh:ii" bind:value={pickupTime}
                                  inputClasses="w-full h-full"/>
                </div>
            </div>
            <div class="border border-gray-500 rounded p-2 col-span-3  lg:col-span-1 h-14 relative">
                <div class="absolute top-0">
                    <span class="text-xs text-gray-600">Drop-off time</span>
                    <SveltyPicker clearBtn={false} mode="time" name="end_time" format="hh:ii" bind:value={dropOffTime}
                                  inputClasses="w-full h-full"/>
                </div>
            </div>
        </div>
        <button type="button" on:click|preventDefault={() => {
            if (!pickupLocation.trim() || !dropOffLocation.trim() || !pickupDate.trim() || !dropOffDate.trim() || !pickupTime.trim() || !dropOffTime.trim()) {
            showAlert('Humm Big NO NO!', 'All fields must be filled out', 'danger', 'Got it');
            return;
        }
            goto(`/reserve?id=${vehicleId}&d=${pickupDate}, ${pickupTime} to ${dropOffDate}, ${dropOffTime}&l=${pickupLocation} ${dropOffLocation ? '->' : ''} ${dropOffLocation ?? ''}`, {invalidateAll: true})
        }} class="mt-4 bg-blue-700 text-white p-4 rounded-full w-fit max-sm:w-full">Book</button>
    </form>
</div>