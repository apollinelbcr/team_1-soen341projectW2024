<script lang="ts">
    import SveltyPicker from 'svelty-picker';
    import {MapPin} from "lucide-svelte";
    import AutocompleteInput from "../../components/AutocompleteInput.svelte";
    import {clickOutside} from '../clickOutside';
    import {showAlert} from "$lib/utils";

    const today: string = new Date().toISOString();
    let pickupLocation = '';
    let dropOffLocation = '';
    let pickupDate = today.slice(0, 10);
    let dropOffDate = today.slice(0, 10);
    let pickupTime = "10:30";
    let dropOffTime = "10:30";

    function handleSubmit(event) {
        if (!pickupLocation.trim() || !dropOffLocation.trim() || !pickupDate.trim() || !dropOffDate.trim() || !pickupTime.trim() || !dropOffTime.trim()) {
            showAlert('Humm Big NO NO!', 'All fields must be filled out', 'danger', 'Got it');
            event.preventDefault();
            return; // Stop the function if any field is empty
        }

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
        // Canadian Airports
        'Toronto (YYZ - Toronto Pearson Intl.)', // Toronto Pearson International Airport
        'Vancouver (YVR - Vancouver Intl.)', // Vancouver International Airport
        'Montreal (YUL - Montréal–Pierre Elliott Trudeau Intl.)', // Montréal–Pierre Elliott Trudeau International Airport
        'Calgary (YYC - Calgary Intl.)', // Calgary International Airport
        'Ottawa (YOW - Ottawa Macdonald–Cartier Intl.)', // Ottawa Macdonald–Cartier International Airport
        'Edmonton (YEG - Edmonton Intl.)', // Edmonton International Airport
        'Halifax (YHZ - Halifax Stanfield Intl.)', // Halifax Stanfield International Airport
        'Winnipeg (YWG - Winnipeg James Armstrong Richardson Intl.)', // Winnipeg James Armstrong Richardson International Airport

        // Canadian Hotels
        'Fairmont Le Château Frontenac (Quebec City)', // Fairmont Le Château Frontenac
        'The Ritz-Carlton (Toronto)', // The Ritz-Carlton, Toronto
        'Hotel Fairmont Pacific Rim (Vancouver)', // Hotel Fairmont Pacific Rim
        'Shangri-La Hotel (Toronto)', // Shangri-La Hotel, Toronto
        'The Banff Springs Hotel (Banff)', // The Banff Springs Hotel
        'Four Seasons Hotel (Toronto)', // Four Seasons Hotel, Toronto
        'The Westin Harbour Castle Hotel (Toronto)', // The Westin Harbour Castle, Toronto
        'Hotel Fairmont Royal York (Toronto)', // Hotel Fairmont Royal York
        'The Pan Pacific Hotel (Vancouver)', // The Pan Pacific Hotel, Vancouver
        'JW Marriott Parq (Vancouver)', // JW Marriott Parq Vancouver
        'The Sutton Place Hotel (Vancouver)', // The Sutton Place Hotel, Vancouver
        'Le Germain Hotel (Montreal)', // Le Germain Hotel, Montreal
        'Hotel Le Crystal (Montreal)', // Hotel Le Crystal, Montreal
        'The Ritz-Carlton (Montreal)', // The Ritz-Carlton, Montreal
        'Delta Hotels by Marriott Bessborough (Saskatoon)', // Delta Hotels by Marriott Bessborough
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

<div class="mt-5 sm:mt-10 sm:mx-10 sm:border border-gray-400 border-solid rounded-3xl p-5">
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
        <button type="submit" class="mt-4 bg-blue-700 text-white p-4 rounded-full w-fit max-sm:w-full">Search</button>
    </form>
</div>