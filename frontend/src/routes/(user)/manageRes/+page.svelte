<script lang="ts">
    
    import CarDetails from "$lib/components/carDetails.svelte";
    import {writable} from "svelte/store";
    import Swal from 'sweetalert2';



    const email = "user7@example.com";
    //at the moment it is hard coded, but i have to wait for the log in page to be linked
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
     /**
	 * @type {any[]}
	 */
     let users: any[] = [];


    onMount(async () => {
        try {
            const response = await fetch('http://localhost:3000/vehicles');
            vehicles = await response.json();
            
            //filteredVehicles = vehicles; // Initialize filteredVehicles with all vehicles
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }
    });
    onMount(async () => {
        try {
            const response = await fetch('http://localhost:3000/reservations');
            reservations = await response.json();
            
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    });
    onMount(async () => {
        try {
            const response = await fetch('http://localhost:3000/users');
            users = await response.json();
            
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    });

    // Delete reservation
	async function deleteReservation(reservationId:any) {
		try {
			const response = await fetch(`http://localhost:3000/reservations/${reservationId}`, {
				method: 'DELETE'
			});
			if(response.ok) {
				window.location.href = '/manageRes'; 
			}
		} catch (error) {
			console.error('Error deleting reservation:', error);
		}
	}

	// Function to handle delete button click
	function deleteRes(reservationId:any) {
		Swal.fire({
			title: 'Are you sure?',
			text: 'Once deleted, you will not be able to recover this reservation!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'No, cancel!',
			reverseButtons: true
		}).then((result) => {
			if (result.isConfirmed) {
				deleteReservation(reservationId);
			} else if (result.dismiss === Swal.DismissReason.cancel) {
				Swal.fire('Cancelled', 'Deletion cancelled', 'info');
			}
		});
	}
</script>
<div class="fixed w-100% pt-4 px-16">
    <a href="">Logo here</a>
</div>


{#each users.filter((userData) => userData.email == email) as userData}
<div class="flex w-[95%] m-auto">
    
    <div class=" min-w-[300px]">
            <div class="w-[250px] p-[15px] bg-[#f5f5f5] mt-[50px] rounded-lg">
                <header class="text-xl text-[#2f373d] text-center leading-[70px]">Welcome, {userData.first_name}!</header>
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
                        
                        
                </td>
                
                    
                
                {/each}
                <td class="border w-1/3 border-slate-300 mt-20">
                    <div  class="w-full align-top p-5">
                        <a href="/editRes?id={reservation.id}" class="flex justify-end text-blue-600 hover:text-indigo-900 cursor-pointer">
                            <svg class="w-6 h-6 text-gray-800 dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm9.4-5.5a1 1 0 1 0 0 2 1 1 0 1 0 0-2ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4c0-.6-.4-1-1-1h-2Z" clip-rule="evenodd"/>
                            </svg>
                        </a>
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
                            CHECK IN
                            <br>
                            <br>
                            CHECK OUT
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
