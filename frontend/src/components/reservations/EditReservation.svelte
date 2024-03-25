<script>
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
//
	const urlParams = new URLSearchParams(window.location.search);
	const reservationId = urlParams.get('id');

	// Define reactive variables to store reservation details
	let reservation = {};
	let vehicles = [];
	let isCheck1 = '';
	let isCheck2 = '';

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
			(reservation.isPaid == 'true' ) ? isCheck1 = true : isCheck1 = false; // Ensure isPaid matches the backend data type
			(reservation.isCheckedOut == 'true' ) ? isCheck2 = true : isCheck2 = false; // Ensure isCheckout matches the backend data type
			console.log(reservation);
		} catch (error) {
			console.error('Error fetching reservation details:', error);
		}
	}

	// Lifecycle hook to fetch reservation details when the component mounts
	onMount(async () => {
    await fetchReservationDetails(reservationId);
   
});

function handleUpdate() {
		updateReservation();
	}

// Update reservation
	async function updateReservation() {
    	try {
        // Get the updated values from the form
			const updatedEmail = document.getElementById('reservation_email').value;
			const updatedVehicleId = document.getElementById('vehicle_name').value;
			const updatedPickupDate = document.getElementById('pickup_date').value;
			const updatedDropoffDate = document.getElementById('dropoff_date').value;
			const updatedPickupTime = document.getElementById('pickup_time').value;
			const updatedDropoffTime = document.getElementById('dropoff_time').value;
			const updatedPickupLocation = document.getElementById('pickup_location').value;
			const updatedDropoffLocation = document.getElementById('dropoff_location').value;
			const updatedPrice = document.getElementById('reservation_price').value;
			const updatedExtras = document.getElementById('extras').value;

        if (updatedEmail && updatedVehicleId && updatedPickupDate && updatedDropoffDate && updatedPickupLocation && updatedDropoffLocation  && updatedPrice && updatedPickupTime && updatedDropoffTime && updatedExtras) {
            // Create the payload with the updated values
            const payload = {
				email: updatedEmail,
				vehicle_name: updatedVehicleId,
				pickup_date: updatedPickupDate,
				dropoff_date: updatedDropoffDate,
				pickup_time: updatedPickupTime,
				dropoff_time: updatedDropoffTime,
				pickup_location: updatedPickupLocation,
				dropoff_location: updatedDropoffLocation,
				price: parseInt(updatedPrice),
				extras: updatedExtras,
				isPaid: isCheck1 ? 'true' : 'false',
				isCheckedOut: isCheck2 ? 'true' : 'false',
			};

			console.log("Sending isPaid as:", isCheck1); // This should log true or false


			// Send a PATCH request to update the reservation
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

	function handlePaymentClick(){
		isCheck1 ? false : true;
		console.log("Checkbox clicked. Checked state:", isCheck1);
	}

	function handleCheckboxClick(){
		isCheck2 ? false : true;
		console.log("Checkbox clicked. Checked state:", isCheck2);
	}

	


</script>

<div class="mb-5 text-2xl font-medium text-gray-700">Details of Reservation: {reservationId}</div>
<div class="flex">
    <div class="text-lg font-medium text-gray-700 mr-4">Vehicle 1: {reservation.vehicle_name}</div>
    <div class="text-lg font-medium text-gray-700 ml-4">Pickup Time: {reservation.pickup_time}</div>
	<div class="text-lg font-medium text-gray-700 ml-4">Dropoff: {reservation.dropoff_time}</div>
	<div class="text-lg font-medium text-gray-700 ml-4">Reservation made by: {reservation.isMadeBy}</div>
</div>
<br>

<form class="mx-auto">
	<div class="grid md:grid-cols-2 md:gap-6">
		<div class="relative z-0 w-full mb-5 group">
			<label for="text" class="block mb-2 text-sm font-medium text-gray-900">Customer Email</label>
			<input type="text" id="reservation_email" value={reservation.email} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
		</div> 
		<div class="relative z-0 w-full mb-5 group">
			<label for="vehicle_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Vehicle's Name/Model</label>
			<select id="vehicle_name" bind:value={reservation.vehicle_name} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required>
				<option value="" disabled>Select a vehicle</option>
				{#each vehicles as vehicle}
					<option value={vehicle.name_vehicle}>{vehicle.name_vehicle}</option>
				{/each}
			</select>
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
			<label for="text" class="block mb-2 text-sm font-medium text-gray-900">Price</label>
			<input type="text" id="reservation_price" value={reservation.price} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
		</div>
		<div class="relative z-0 w-full mb-5 group">
			<label for="text" class="block mb-2 text-sm font-medium text-gray-900">Extras</label>
			<input type="text" id="extras" value={reservation.extras} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Additional services or items" />
		</div>
	</div>

	<div class="grid md:grid-cols-2 md:gap-6">
		<div class="relative z-0 w-full mb-5 group">
			<label class="inline-flex items-center mb-5 cursor-pointer">
				<input type="checkbox" bind:checked={isCheck1} on:change={handlePaymentClick} class="sr-only peer" />
				<div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
				<span class="ms-3 text-sm font-medium text-dark-900 dark:text-dark-300">isPaid ?</span>
			</label>			
		</div>
		<div class="relative z-0 w-full mb-5 group">
			<label class="inline-flex items-center mb-5 cursor-pointer">
				<input type="checkbox"	bind:checked={isCheck2} on:change={handleCheckboxClick} class="sr-only peer" />
				<div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
				<span class="ms-3 text-sm font-medium text-dark-900 dark:text-dark-300">isCheckout ?</span>
			</label>
		</div>
	</div>

	<div class="grid md:grid-cols-2 md:gap-4">
		<button type="button" on:click={handleUpdate} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Update reservation info</button>
		<button type="button" on:click={handleDelete} class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Delete reservation</button>
	</div>
</form>