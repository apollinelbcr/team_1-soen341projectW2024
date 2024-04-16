<script lang="ts">
    import VehicleComparison from '$lib/components/VehicleComparison.svelte';
    import type {Vehicle} from '$lib/model/Vehicle';
    import {writable} from "svelte/store";
    import {page} from "$app/stores";
    import {onMount} from "svelte";
    import {repo} from "$lib/repo";
    const dates = writable('');
    const locations = writable('');
    let id;
    let vehicle: Vehicle | null = null;
    let vehicle1: Vehicle;
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

    $: if ($page.url.searchParams) {
        dates.set($page.url.searchParams.get('d'));
        locations.set($page.url.searchParams.get('l'));
        id = $page.url.searchParams.get('id');
    }

    onMount(async () => {
        vehicle = id ? await repo.getVehicle(id) : null;
        vehicle1 = vehicle ?? {
            "id": "7befc065-2e0b-4066-89f6-536bcbea24b4",
            "name_vehicle": "Chevrolet Malibu Black 2023",
            "image": "https://mystrongad.com/HCN_RickHendrickChevroletNaples/HCN_Interactive/Malibu/2023/23-Chevrolet-Malibu-Black.png",
            "vehicle_type": "CAR",
            "vehicle_category": "COMPACT",
            "vehicle_transmission": "AUTOMATIC",
            "status": "AVAILABLE",
            "price": 40.00
        };
    });

</script>
{#if vehicle1 && vehicle2}
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <VehicleComparison {vehicle1} {vehicle2} compareFromReserve={vehicle != null} searchParam={`d=${$dates}&l=${$locations}`}/>
    </div>
{/if}