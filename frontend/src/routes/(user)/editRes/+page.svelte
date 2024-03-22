<script lang="ts">
	// @ts-nocheck
	import { onMount } from 'svelte';
	import Swal from 'sweetalert2';



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
    const response = await fetch('http://localhost:3000/vehicles'); // Adjust the URL to your backend endpoint
    const data = await response.json();
    vehicles = data; // Assuming the backend sends an array of vehicle names
}

		onMount(() => {
			fetchVehicles();
		});	

	// Function to fetch reservation details from the API
	async function fetchReservationDetails(reservationId) {
		try {
			const response = await fetch(`http://localhost:3000/reservations/${reservationId}`);
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
        const updatedPickupDate = document.getElementById('pickup_date').value;
        const updatedDropoffDate = document.getElementById('dropoff_date').value;
        const updatedPickupLocation = document.getElementById('pickup_location').value;
        const updatedDropoffLocation = document.getElementById('dropoff_location').value;
        const updatedExtras = document.getElementById('extras').value;

        if (updatedEmail && updatedPickupDate && updatedDropoffDate && updatedPickupLocation && updatedDropoffLocation) {
            // Create the payload with the updated values
            const payload = {
				email: updatedEmail,
                vehicle_name: reservation.vehicle_name,
				pickup_date: updatedPickupDate,
				dropoff_date: updatedDropoffDate,
				pickup_location: updatedPickupLocation,
				dropoff_location: updatedDropoffLocation,
                price: reservation.price,
				extras: updatedExtras,
			};


            const formData = new URLSearchParams();
            Object.keys(payload).forEach(key => {
                formData.append(key, payload[key]);
            });

            const response = await fetch(`http://localhost:3000/reservations/${reservationId}`, {
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

	function handleUpdate() {
		updateReservation();
	}

    /**
	 * @type {any[]}
	 */
     let users: any[] = [];
     
    onMount(async () => {
        try {
            const response = await fetch('http://localhost:3000/users');
            users = await response.json();
            
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    });
    const email = "user7@example.com";
    //at the moment it is hard coded, but i have to wait for the log in page to be linked

</script>

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
        <div class="mb-5 text-2xl font-medium text-gray-700">Details of Reservation:</div>
        <div class="flex">
            <div class="text-lg font-medium text-gray-700 mr-4">Vehicle : {reservation.vehicle_name}</div>
            <div class="text-lg font-medium text-gray-700 ml-4">Pickup Time: {reservation.pickup_time}</div>
            <div class="text-lg font-medium text-gray-700 ml-4">Dropoff: {reservation.dropoff_time}</div>
        </div>
        <br>

        <form class="mx-auto">
            <div class="grid md:grid-cols-2 md:gap-6">
                <div class="relative z-0 w-full mb-5 group">
                    <label for="text" class="block mb-2 text-sm font-medium text-gray-900">Customer Email</label>
                    <input type="text" id="reservation_email" value={reservation.email} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div> 		
            </div>

            <div class="grid md:grid-cols-2 md:gap-6">
                <div class="relative z-0 w-full mb-5 group">
                    <label for="date" class="block mb-2 text-sm font-medium text-gray-900">Pickup Date</label>
                    <input type="date" id="pickup_date" value={reservation.pickup_date} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>
                <div class="relative z-0 w-full mb-5 group">
                    <label for="date" class="block mb-2 text-sm font-medium text-gray-900">Dropoff Date</label>
                    <input type="date" id="dropoff_date" value={reservation.dropoff_date} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>
            </div>

            <div class="grid md:grid-cols-2 md:gap-6">
                <div class="relative z-0 w-full mb-5 group">
                    <label for="text" class="block mb-2 text-sm font-medium text-gray-900">Pickup Location</label>
                    <input type="text" id="pickup_location" value={reservation.pickup_location} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>
                <div class="relative z-0 w-full mb-5 group">
                    <label for="text" class="block mb-2 text-sm font-medium text-gray-900">Dropoff Location</label>
                    <input type="text" id="dropoff_location" value={reservation.dropoff_location} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>
            </div>

            <div class="grid md:grid-cols-2 md:gap-6">
                <div class="relative z-0 w-full mb-5 group">
                    <label class="block mb-2 text-sm font-medium text-gray-900" for="pickup_time">Pickup Time</label>
                    <input type="time" id="pickup_time" bind:value="{reservation.pickup_time}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="relative z-0 w-full mb-5 group">
                    <label class="block mb-2 text-sm font-medium text-gray-900" for="dropoff_time">Dropoff Time</label>
                    <input type="time" id="dropoff_time" bind:value="{reservation.dropoff_time}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
            </div>
            

            <div class="grid md:grid-cols-2 md:gap-6">
                <div class="relative z-0 w-full mb-5 group">
                    <label for="text" class="block mb-2 text-sm font-medium text-gray-900">Extras</label>
                    <input type="text" id="extras" value={reservation.extras} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Additional services or items" />
                </div>
            </div>

            <div class="grid md:grid md:gap-4">
                <button type="button" on:click={handleUpdate} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Update reservation info</button>
            </div>
        </form>
    </div>
</div>
{/each}

