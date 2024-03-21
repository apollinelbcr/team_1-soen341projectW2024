<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import Swal from 'sweetalert2';
    import CarDetails from "$lib/components/carDetails.svelte";

    const uid = "user007";

    let userDatas = writable([
        {
            id: "user007",
            name: "Asma",
            email: "asmaaimade@gmail.com",
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

	// Error alert
	function showAlert(title, text, icon, confirmButtonText) {
		Swal.fire({
			title: title,
			text: text,
			icon: icon,
			confirmButtonText: confirmButtonText,
			confirmButtonColor: '#3085d6'
		});
	}

	const urlParams = new URLSearchParams(window.location.search);
	const reservationId = urlParams.get('id');

	// Define reactive variables to store reservation details
	let reservation = {};
	let vehicles = [];

	async function fetchVehicles() {
    const response = await fetch('http://localhost:3002/vehicles'); // Adjust the URL to your backend endpoint
    const data = await response.json();
    vehicles = data; // Assuming the backend sends an array of vehicle names
}

		onMount(() => {
			fetchVehicles();
		});	

	// Function to fetch reservation details from the API
	async function fetchReservationDetails(reservationId) {
		try {
			const response = await fetch(`http://localhost:3002/reservations/${reservationId}`);
			const data = await response.json();
			reservation = data;
			console.log(reservation);
		} catch (error) {
			console.error('Error fetching reservation details:', error);
		}
	}

	

	// Lifecycle hook to fetch reservation details when the component mounts
	onMount(() => {
		fetchReservationDetails(reservationId);
	});

	// Update reservation
	// Update reservation
// Update reservation
async function updateReservation() {
    try {
        // Get the updated values from the form
        const updatedEmail = document.getElementById('reservation_email').value;
        const updatedVehicleId = document.getElementById('vehicle_name').value;
        const updatedPickupDate = document.getElementById('pickup_date').value;
        const updatedDropoffDate = document.getElementById('dropoff_date').value;
        const updatedPickupLocation = document.getElementById('pickup_location').value;
        const updatedDropoffLocation = document.getElementById('dropoff_location').value;
        const updatedPrice = document.getElementById('reservation_price').value;
        const updatedExtras = document.getElementById('extras').value;

        if (updatedEmail && updatedVehicleId && updatedPickupDate && updatedDropoffDate && updatedPickupLocation && updatedDropoffLocation  && updatedPrice) {
            // Create the payload with the updated values
            const payload = {
				email: updatedEmail,
				vehicle_name: updatedVehicleId,
				pickup_date: updatedPickupDate,
				dropoff_date: updatedDropoffDate,
				pickup_location: updatedPickupLocation,
				dropoff_location: updatedDropoffLocation,
				price: parseInt(updatedPrice),
				extras: updatedExtras,
			};


            const formData = new URLSearchParams();
            Object.keys(payload).forEach(key => {
                formData.append(key, payload[key]);
            });

            const response = await fetch(`http://localhost:3002/reservations/${reservationId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString(),
            });

            const responseData = await response.json(); // Assuming your server responds with JSON
            console.log("Response from the server:", responseData);

            if (response.ok) {
                console.log('Reservation updated successfully');
                showAlert("Reservation Updated", "", "success", "OK");

                // Update reservation details locally
                reservation = { ...reservation, ...payload };

                // Since you're updating the vehicle_id, ensure to update the vehicle_name too
                const updatedVehicle = vehicles.find(vehicle => vehicle.id === updatedVehicleId);
                if (updatedVehicle) {
                    reservation.vehicle_name = updatedVehicle.name_vehicle; // Make sure this matches how your vehicle names are stored
                }

                // Optionally, re-fetch reservation details if you need to ensure data consistency
                // fetchReservationDetails(reservationId);
            } else {
                console.error('Failed to update reservation:', responseData);
                showAlert("Cannot update reservation", "There was a problem updating the reservation: " + responseData.message, "error", "I understand");
            }
        } else {
            showAlert("Cannot update reservation", "All fields are required to update this reservation", "error", "I understand");
        }
    } catch (error) {
        console.error('Error updating reservation:', error);
        showAlert("Cannot update reservation", "An unexpected error occurred while updating the reservation", "error", "I understand");
    }
}



	// Delete reservation
	async function deleteReservation(reservationId) {
		try {
			const response = await fetch(`http://localhost:3002/reservations/${reservationId}`, {
				method: 'DELETE'
			});
			if(response.ok) {
				window.location.href = '/admin/reservations'; 
			}
		} catch (error) {
			console.error('Error deleting reservation:', error);
		}
	}

	// Function to handle delete button click
	function handleDelete() {
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

	function handleUpdateAdds() {
		updateReservationAdds();
	}
    async function updateReservationAdds() {
    try {
        // Get the updated values from the form
        const updatedExtras = document.querySelector('input[name="adds-on"]:checked');

        if (updatedExtras) {
            // Create the payload with the updated values
            const payload = {
				...reservation,
				extras: updatedExtras,
			};


            const formData = new URLSearchParams();
            Object.keys(payload).forEach(key => {
                formData.append(key, payload[key]);
            });

            const response = await fetch(`http://localhost:3002/reservations/${reservationId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString(),
            });

            const responseData = await response.json(); // Assuming your server responds with JSON
            console.log("Response from the server:", responseData);

            if (response.ok) {
                console.log('Reservation updated successfully');
                showAlert("Reservation Updated", "", "success", "OK");

                // Update reservation details locally
                reservation = { ...reservation, ...payload };

                // Optionally, re-fetch reservation details if you need to ensure data consistency
                // fetchReservationDetails(reservationId);
            } else {
                console.error('Failed to update reservation:', responseData);
                showAlert("Cannot update reservation", "There was a problem updating the reservation: " + responseData.message, "error", "I understand");
            }
        } else {
            showAlert("Cannot update reservation", "All fields are required to update this reservation", "error", "I understand");
        }
    } catch (error) {
        console.error('Error updating reservation:', error);
        showAlert("Cannot update reservation", "An unexpected error occurred while updating the reservation", "error", "I understand");
    }
}
function openFormAddOn(reservationId){
        const formChangeAddOn = document.getElementById("formChangeAddOn");
        if (formChangeAddOn) {
            console.log("id" + reservationId);
            formChangeAddOn.style.display = "flex";
        }
    }


</script>
<div class="fixed w-100% pt-4 px-16">
    <a href="">Logo here</a>
</div>


{#each $userDatas.filter((userData) => userData.id == uid) as userData}
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
        {#if reservation.email == userData.email}
        <table class="border-collapse">
            <tr>
                {#each vehicles.filter((vehicle) => vehicle.id == reservation.vehicle_name) as vehicle}
                <td class=" border w-2/3 border-slate-300">
                        <CarDetails details = {vehicle}/>
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
                            {#each reservation.extras as extra, i}
                            {extra}
                            <br>
                            {:else}
                            No adds-ons
                            {/each}
                        </div>
                        
                        <div class="w-1/3 border-r-2 pl-5 justify-center ">
                            <br>
                            <a class="underline text-blue-800 align-middle" href="" on:click={openFormAddOn(reservation.id)}>Add other</a>

                        </div>
                        
                        <div class="w-1/3 pl-5 justify-center">
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
            <button on:click={handleDelete} class=" w-44 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded">Delete Reservation</button> 
        </div>
        <br><br>
        <div id="formChangeAddOn" class="hidden p-10 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 z-50">
            <form on:submit={handleUpdateAdds}>
                <div class="font-bold text-lg text-center">Add new adds-on:</div>
                <br>
                <hr>
                <br>
                <div>
                    These are the available adds-on left that you can choose from:
                </div>
                <br>
                <label>
                    <input type="checkbox" name="adds-on" value="Baby seat" required>
                    Baby seat
                </label>
                <br>
                <label>
                    <input type="checkbox" name="adds-on" value="Cushion" required>
                    Cushion
                </label>
                <br>
                <label>
                    <input type="checkbox" name="adds-on" value="GPS" required>
                    GPS
                </label>
                <br>
                <label>
                    <input type="checkbox" name="adds-on" value="Roof Boxes" required>
                    Roof Boxes
                </label>
                <br>
                <label>
                    <input type="checkbox" name="adds-on" value="Extra Keys" required>
                    Extra Keys
                </label>
                <br>
                <label>
                    <input type="checkbox" name="adds-on" value="Windshield Washer" required>
                    Windshield Washer
                </label>
                <br>
                <label>
                    <input type="checkbox" name="adds-on" value="Jump Starter" required>
                    Jump Starter
                </label>
                <br><br>
                <button id="cancelButton" on:click={closeFormAddOn} class="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded">Cancel</button>
                <button type="submit" class="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded">Submit</button>
            </form>
            </div>
        {/if}
        {/each}
        
    </div>
</div>

<div id="formChange" class="hidden p-10 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 z-50">
    <form on:submit={handleUpdate}>
        <div class="font-bold text-lg text-center">Change Pick-up date</div>
        <br>
        <hr>
        <br>
        <div>
            These are the available dates you can choose from:
        </div>
        <br>
        <label>
            <input type="radio" name="pick-up_date" value="2024-03-06" required>
            2024-03-06
        </label>
        <br>
        <label>
            <input type="radio" name="pick-up_date" value="2024-03-21" required>
            2024-03-21
        </label>
        <br><br>
        <button id="cancelButton" on:click={closeForm} class="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded">Cancel</button>
        <button type="submit" class="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded">Submit</button>
    </form>
</div>

<div id="formChangeDropDate" class="hidden p-10 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 z-50">
    <form on:submit={saveInfoDropoff}>
        <div class="font-bold text-lg text-center">Change Drop-off date</div>
        <br>
        <hr>
        <br>
        <div>
            These are the available dates you can choose from:
        </div>
        <br>
        <label>
            <input type="radio" name="drop-off_date" value="2024-04-27" required>
            2024-04-27
        </label>
        <br>
        <label>
            <input type="radio" name="drop-off_date" value="2024-04-05" required>
            2024-04-05
        </label>
        <br><br>
        <button id="cancelButton" on:click={closeFormDD} class="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded">Cancel</button>
        <button type="submit" class="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded">Submit</button>
    </form>
</div>
{/each}
