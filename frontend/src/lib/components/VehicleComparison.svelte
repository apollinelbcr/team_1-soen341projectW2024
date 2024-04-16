<script lang="ts">
    import type {Vehicle} from '$lib/model/Vehicle';
    import VehicleCardForComparison from "$lib/components/VehicleCardForComparison.svelte";
    import Booksearch from "$lib/components/Booksearch.svelte";
    import Modal from "$lib/components/Modal.svelte";
    import {goto} from "$app/navigation";

    export let vehicle1: Vehicle;
    export let vehicle2: Vehicle;
    export let compareFromReserve: boolean = false;
    export let searchParam: string;

    let vehicleId = "";
    let showBookSearchModal = false;

    function handleBookVehicle(id: string) {
        vehicleId = id;
        if (compareFromReserve) {
            goto(`/reserve?id=${vehicleId}&${searchParam}`, {invalidateAll: true})
        } else {
            showBookSearchModal = !showBookSearchModal;
        }
    }
</script>

<div class="relative">
<div class="flex flex-col md:flex-row bg-white text-black">
    <div class="flex-1">
        <VehicleCardForComparison vehicle={vehicle1} onBookVehicle={handleBookVehicle} showDropdown={!compareFromReserve}/>
    </div>
    <div class="flex-1">
        <VehicleCardForComparison vehicle={vehicle2} onBookVehicle={handleBookVehicle}/>
    </div>
</div>
<Modal isOpen={showBookSearchModal} on:click={() => (showBookSearchModal = !showBookSearchModal)}>
    <Booksearch vehicleId={vehicleId} />
</Modal>
</div>
