<script lang="ts">
    
    import CarDetails from "$lib/components/carDetails.svelte";
    import {writable} from "svelte/store";

    let resDetails = writable([
        {
            id: "101",
            vehicle_name: "vehi1234",
            id_user: "user007",
            pickupDate: "2024-03-15",
            pickupTime: "7:30 AM",
            pickupLoc: "Montreal, QC",
            dropoffDate: "2024-04-01",
            dropoffTime: "8:00 AM",
            dropoffLoc: "Montreal, QC",
            price: "$210",
            extra_things:[],
        },

        {
            id: "107",
            vehicle_name: "vehi1234",
            id_user: "user882",
            pickupDate: "2024-02-01",
            pickupTime: "7:30 AM",
            pickupLoc: "Montreal, QC",
            dropoffDate: "2024-02-28",
            dropoffTime: "8:00 AM",
            dropoffLoc: "Montreal, QC",
            price: "$210",
            extra_things: ["baby seat", "Extra keys", "Windshield washer", "Jump Starter"],
        },

        {
            id: "121",
            vehicle_name: "vehi87438",
            id_user: "user007",
            pickupDate: "2024-06-03",
            pickupTime: "7:30 AM",
            pickupLoc: "Montreal, QC",
            dropoffDate: "2024-06-13",
            dropoffTime: "8:00 AM",
            dropoffLoc: "Montreal, QC",
            price: "$210",
            extra_things : ["Cushion", "Extra keys","Jump Starter"],
        }
    ]);


    let userDatas = writable([
        {
            id: "user007",
            name: "Asma",
            email: "user7@example.com",
            password: "abc123",
            role: "client",
            driver_license: "YYYY 9876 5432",
        },
        {
            id: "user882",
            name: "Zineb",
            email: "zinebbamouh@gmail.com",
            password: "abc123",
            role: "client",
            driver_license: "XXXX 1234 5678",
        },
    ]);

    const email = "user7@example.com";

    const extras = ["baby seat", "Cushion", "GPS", "Roof boxes", "Extra keys", "Windshield washer", "Jump Starter"];

    function openForm(resDetail:any){
        const formChange = document.getElementById("formChange") as HTMLElement;
        if (formChange) {
            formChange.style.display = "flex";
        }
    }

    function closeForm(): void {
        const formChange = document.getElementById("formChange") as HTMLElement;
        if (formChange) {
            formChange.style.display = "none";
        }
    }

    function saveInfoPickup(resDetail:any, event: Event){
        event.preventDefault();

        const newDateInput = document.querySelector('input[name="pick-up_date"]:checked') as HTMLInputElement;
        const newDate = newDateInput ? newDateInput.value : null;

        resDetails.update(resdets => 
            resdets.map(resdet => 
            resdet.id == resDetail.id ? {... resdet, pickupDate: newDate as string}: resdet)
        
        
        );
        const form = event.target as HTMLFormElement;
        form.reset();
        closeForm();

    }

    function openFormDD(resDetail:any){
        const formChangeDropDate = document.getElementById("formChangeDropDate") as HTMLElement;
        if (formChangeDropDate) {
            formChangeDropDate.style.display = "flex";
        }
    }

    function closeFormDD(): void {
        const formChangeDropDate = document.getElementById("formChangeDropDate") as HTMLElement;
        if (formChangeDropDate) {
            formChangeDropDate.style.display = "none";
        }
    }
    function saveInfoDropoff(resDetail:any, event: Event){
        event.preventDefault();

        const newDateInput = document.querySelector('input[name="drop-off_date"]:checked') as HTMLInputElement;
        const newDate = newDateInput ? newDateInput.value : null;

        resDetails.update(resdets => 
            resdets.map(resdet => 
            resdet.id == resDetail.id ? {... resdet, dropoffDate: newDate as string}: resdet)
        
        
        );
        const form = event.target as HTMLFormElement;
        form.reset();
        closeFormDD();

    }

    function openFormAddOn(resDetail:any){
        const formChangeAddOn = document.getElementById("formChangeAddOn") as HTMLElement;
        if (formChangeAddOn) {
            console.log("id" + resDetail.id);
            formChangeAddOn.style.display = "flex";
        }
    }

    function closeFormAddOn(): void {
        const formChangeAddOn = document.getElementById("formChangeAddOn") as HTMLElement;
        if (formChangeAddOn) {
            formChangeAddOn.style.display = "none";
        }
    }
    function saveInfoAddOn(resDetail:any, event: Event){

        event.preventDefault();

        const newAddOnInput = document.querySelector('input[name="adds-on"]:checked') as HTMLInputElement;
        const newAddOn = newAddOnInput ? newAddOnInput.value : null;
        resDetails.update(resdets => 
        
            resdets.map(resdet => 
            resdet.id == resDetail.id ? {... resdet, extra_things: [...resdet.extra_things, newAddOn as string]}: resdet)
        );
        const form = event.target as HTMLFormElement;
        form.reset();
        closeFormAddOn();

    }

    function deleteRes(id_res: any){
        if (confirm("are you sure?")){
            resDetails.update(resdets => 
                resdets.filter(resdet => resdet.id !==id_res));

        }
    }

    import { onMount } from 'svelte';
    
    // @ts-ignore
    /**
	 * @type {any[]}
	 */
    let vehicles: any[] = [];
    /**
	 * @type {any[]}
	 */
     let reservations: any[] = [];


    onMount(async () => {
        try {
            const response = await fetch('http://localhost:3002/vehicles');
            vehicles = await response.json();
            
            //filteredVehicles = vehicles; // Initialize filteredVehicles with all vehicles
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }
    });
    onMount(async () => {
        try {
            const response = await fetch('http://localhost:3002/reservations');
            reservations = await response.json();
            
            //filteredVehicles = vehicles; // Initialize filteredVehicles with all vehicles
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    });
</script>
<div class="fixed w-100% pt-4 px-16">
    <a href="">Logo here</a>
</div>


{#each $userDatas.filter((userData) => userData.email == email) as userData}
<div class="flex w-[95%] m-auto">
    
    <div class=" min-w-[300px]">
            <div class="w-[250px] p-[15px] bg-[#f5f5f5] mt-[50px] rounded-lg">
                <header class="text-xl text-[#2f373d] text-center leading-[70px]">Welcome, {userData.name}!</header>
                <ul>
                    <li>
                        <a class="block w-full h-full leading-[65px] text-xl pl-10 box-border no-underline transition-[.4s] text-[#2f373d] hover:pl-[50px]" href="account.html" id="profileLink">Profile</a>
                    </li>
                    <li>
                        <a class="block w-full h-full leading-[65px] text-xl pl-10 box-border no-underline transition-[.4s] text-[#2f373d] hover:pl-[50px]" href="account.html" id="contactLink">Contact</a>
                    </li>
                    <li>
                        <a class="block w-full h-full leading-[65px] text-xl pl-10 box-border no-underline transition-[.4s] text-[#2f373d] hover:pl-[50px]" href="account.html" id="paymentLink">Payment</a>
                    </li>
                    <li>
                        <a class="block w-full h-full leading-[65px] text-xl pl-10 box-border no-underline transition-[.4s] text-[#2f373d] hover:pl-[50px]" href="account.html" id="reviewLink">Review</a>
                    </li>
                    <li>
                        <a class="block w-full h-full leading-[65px] text-xl pl-10 box-border no-underline transition-[.4s] text-[#2f373d] hover:pl-[50px]" href="/manageRes">My Reservation</a>
                    </li>
                </ul>
            </div>
        
    </div>
    <div class=" mt-[50px] rounded-lg">
        {#each reservations as reservation}
        {#if reservation.email == email}
        <table class="border-collapse">
            <tr>
                {#each vehicles.filter((vehicle) => vehicle.name_vehicle == reservation.vehicle_name) as carData}
                <td class=" border w-2/3 border-slate-300">
                        <CarDetails details = {carData}/>
                        <a href="/manage?id={reservation.id}" class="text-blue-600 hover:text-indigo-900 cursor-pointer">
                            <svg class="w-6 h-6 text-gray-800 dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm9.4-5.5a1 1 0 1 0 0 2 1 1 0 1 0 0-2ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4c0-.6-.4-1-1-1h-2Z" clip-rule="evenodd"/>
                            </svg>
                        </a>
                </td>
                {/each}
                <td class="border w-1/3 border-slate-300 mt-20">
                    <div  class="w-full align-top p-5">
                        
                        <table class="w-full">
                            <tr>
                                <td>
                                    <div class="font-bold text-base">Pick-up information:</div>
                                    <div class="text-sm">
                                        {reservation.pickup_date}
                                        <br>
                                        {reservation.pickup_time}
                                        <br>
                                        {reservation.pickup_location}
                                        <br>
                                    </div>
                                </td>
                                <td class="flex justify-end ">
                                    <a class="underline text-blue-800" href="" on:click={openForm}>Change</a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="font-bold text-base">Drop-off information:</div>
                                    <div class="text-sm">
                                        {reservation.dropoff_date}
                                        <br>
                                        {reservation.dropoff_time}
                                        <br>
                                        {reservation.dropoff_location}
                                        <br>
                                    </div>
                                </td>
                                <td class="flex justify-end">
                                    <a class="underline text-blue-800" href="" on:click={openFormDD}>Change</a>
                                </td>
                            </tr>    
                        </table>
                        
                        
                    </div>
                    
                </td>
            </tr>  
            <tr>
                <td colspan="2" class="border border-slate-300">
                    <div class="flex justify center p-5">
                        <div class="w-1/3 border-r-2">
                            <div class="font-bold text-base">Adds-on:</div>
                            {#if reservation.extras == 'None'}
                                No adds-ons
                            {:else}
                            {#each reservation.extras.split(',') as extra}
                                <p>{extra.trim()}</p>
                            {/each}
                            {/if}
                            <br>
                            
                            
                            
                        </div>
                        
                        <div class="w-1/3 border-r-2 pl-5 justify-center ">
                            <br>
                            <a class="underline text-blue-800 align-middle" href="" on:click={()=>openFormAddOn(reservation)}>Add other</a>

                        </div>
                        
                        <div class="w-1/3 pl-5">
                            <br>
                            <div class="font-bold text-base">Price:</div>
                            <br>
                            {reservation.price}
                            <br>
            
                        </div>
                    </div>
                </td>
            </tr>
            
        </table>
        <br>
        <div class="items-center justify-between flex">
            <p class=" text-xs ">**You can cancel at any time your reservation without any charge.</p>
            <button on:click={()=>deleteRes(reservation.id)} class=" w-44 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded">Delete Reservation</button> 
        </div>
        <br><br>
        {/if}
        {/each}
        
    </div>
</div>


{/each}
