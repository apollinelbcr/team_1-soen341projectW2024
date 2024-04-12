<script lang="ts">
    import type {Vehicle} from '$lib/model/Vehicle';
    import VehicleDropdown from "$lib/components/VehicleDropdown.svelte";
    export let onBookVehicle: (vehicleId: string) => void;
    export let vehicle: Vehicle;
</script>

<div class="flex flex-col items-center p-6">
    <VehicleDropdown onSelectVehicle={(v) => vehicle = v}/>

    <div class="w-50 h-32 overflow-hidden">
        <img src={vehicle.image} alt={vehicle.name_vehicle} class="w-full h-full mb-6"/>
    </div>
        
    <hr class="border border-gray-300 w-full my-3"/>

    <div class="text-center mb-4">
        <div class="text-base text-blue-600">Type</div>
        <div class="text-3m font-bold">{vehicle.vehicle_type}</div>
    </div>
    <div class="text-center mb-4">
        <div class="text-base text-blue-600">Category</div>
        <div class="text-3m font-bold">{vehicle.vehicle_category}</div>
    </div>

    <div class="text-center mb-4">
        <div class="text-base text-blue-600">Transmission</div>
        <div class="text-3m font-bold">{vehicle.vehicle_transmission}</div>
    </div>

    <div class="text-center mb-6">
        <div class="text-base text-blue-600">Status</div>
        <div class="text-3m font-bold">{vehicle.status}</div>
    </div>

    <div class="flex justify-center items-center mb-6">
        <span class="text-3xl font-bold text-blue-600">$ {vehicle.price}</span>
        <span class="text-blue-600 text-s"> &nbsp; /day</span>
    </div>

    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={() => onBookVehicle(vehicle.id)}>
        Book Now
    </button>
</div>
