<script lang="ts">
    import VehicleComparison from '$lib/components/VehicleComparison.svelte';
    import type {Vehicle} from '$lib/model/Vehicle';
    import {onMount} from "svelte";
    
    let id;
    let vehicle: Vehicle | null = null;
    
     onMount(async () => {
        vehicle = await repo.getVehicle(id);
    });
    let vehicle1: Vehicle = {
        "id": "7befc065-2e0b-4066-89f6-536bcbea24b4",
        "name_vehicle": "Chevrolet Malibu Black 2023",
        "image": "https://mystrongad.com/HCN_RickHendrickChevroletNaples/HCN_Interactive/Malibu/2023/23-Chevrolet-Malibu-Black.png",
        "vehicle_type": "CAR",
        "vehicle_category": "COMPACT",
        "vehicle_transmission": "AUTOMATIC",
        "status": "AVAILABLE",
        "price": 40.00
    };
    let vehicle2: Vehicle = {
        "id": "7befc065-2e0b-4066-89f6-536bcbea24b4",
        "name_vehicle": "Chevrolet Malibu Black 2023",
        "image": "https://mystrongad.com/HCN_RickHendrickChevroletNaples/HCN_Interactive/Malibu/2023/23-Chevrolet-Malibu-Black.png",
        "vehicle_type": "CAR",
        "vehicle_category": "COMPACT",
        "vehicle_transmission": "AUTOMATIC",
        "status": "AVAILABLE",
        "price": 40.00
    };
</script>
<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
    <VehicleComparison {vehicle1} {vehicle2}/>
</div>