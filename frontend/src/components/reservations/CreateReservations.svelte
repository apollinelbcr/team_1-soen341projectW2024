<script>
	// @ts-nocheck
	
		// @ts-ignore
		/**
		 * @type {any}
		 */
		 // @ts-ignore
		 import { onMount } from 'svelte';
		 import Swal from 'sweetalert2';
	
		 //Error alert
		 /**
		 * @param {undefined} [title]
		 * @param {undefined} [text]
		 * @param {undefined} [icon]
		 * @param {undefined} [confirmButtonText]
		 */
		 function showAlert(title, text, icon, confirmButtonText) {
			Swal.fire({
			title: title,
			text: text,
			icon: icon,
			confirmButtonText: confirmButtonText,
			confirmButtonColor: '#3085d6'
			});
		}
	
		let reservation = {};
		let vehicles = [];
		let users = [];
	
		async function fetchVehicles() {
		const response = await fetch('http://localhost:3002/vehicles'); // Adjust the URL to your backend endpoint
		const data = await response.json();
		vehicles = data; // Assuming the backend sends an array of vehicle names
	}
	
			onMount(() => {
				fetchVehicles();
			});	

			async function fetchUsers() {
		const response = await fetch('http://localhost:3002/users'); // Adjust the URL to your backend endpoint
		const data = await response.json();
		users = data; // Assuming the backend sends an array of vehicle names
	}
	
			onMount(() => {
				fetchUsers();
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
	
		 async function handleCreate() {
    try {
        const updatedEmail = document.getElementById('email').value;
        const updatedVehicleId = document.getElementById('vehicle_name').value;
        const updatedPickupDate = document.getElementById('pickup_date').value;
        const updatedDropoffDate = document.getElementById('dropoff_date').value;
        const updatedPickupLocation = document.getElementById('pickup_location').value;
        const updatedDropoffLocation = document.getElementById('dropoff_location').value;
        const updatedPickupTime = document.getElementById('pickup_time').value;
        const updatedDropoffTime = document.getElementById('dropoff_time').value;
        const updatedPrice = document.getElementById('reservation_price').value;
        const updatedExtras = document.getElementById('extras').value;

        if (updatedEmail && updatedVehicleId && updatedPickupDate && updatedDropoffDate && updatedPickupLocation && updatedDropoffLocation && updatedPrice) {
            const payload = {
                email: updatedEmail,
                vehicle_name: updatedVehicleId,
                pickup_date: updatedPickupDate,
                dropoff_date: updatedDropoffDate,
                pickup_location: updatedPickupLocation,
                dropoff_location: updatedDropoffLocation,
                pickup_time: updatedPickupTime,
                dropoff_time: updatedDropoffTime,
                price: parseInt(updatedPrice, 10), // Ensure price is an integer
                extras: updatedExtras,
                isMadeBy: 'admin', 
				isPaid: 'false',
				isCheckedOut: 'false'
            };

            console.log(payload);

            const formData = new URLSearchParams();
            Object.keys(payload).forEach(key => {
                formData.append(key, payload[key]);
            });

            const response = await fetch(`http://localhost:3002/reservations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString(),
            });

            if (response.ok) {
                console.log('Reservation added successfully');
                showAlert("Reservation created", "", "success", "OK");
            } else {
                const errorResponse = await response.json();
                console.error('Failed to add reservation', errorResponse);
                showAlert("Failed to create reservation", errorResponse.message || "An unknown error occurred", "error", "I understand");
            }
        } else {
            showAlert("Cannot create reservations", "One or many fields are required to create a reservations", "error", "I understand");
        }
    } catch (error) {
        console.error('Error creating the reservations:', error);
    }
}

		
	</script>
	
	<div class="mb-5 text-2xl font-medium text-gray-700">Create a reservation</div>
	
	<form class="mx-auto">
		<div class="grid md:grid-cols-2 md:gap-6">
			<div class="relative z-0 w-full mb-5 group">
				<label for="text" class="block mb-2 text-sm font-medium text-gray-900">Customer Email</label>
				<select id="email" bind:value={reservation.email} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required>
					<option value="" disabled>Select a email</option>
					{#each users as user}
						<option value={user.email}>{user.email}</option>
					{/each}	
			
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
				<input type="date" id="pickup_date"  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
			</div>
			<div class="relative z-0 w-full mb-5 group">
				<label for="date" class="block mb-2 text-sm font-medium text-gray-900">Dropoff Date</label>
				<input type="date" id="dropoff_date"  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
			</div>
		</div>
	
		<div class="grid md:grid-cols-2 md:gap-6">
			<div class="relative z-0 w-full mb-5 group">
				<label for="text" class="block mb-2 text-sm font-medium text-gray-900">Pickup Location</label>
				<input type="text" id="pickup_location" placeholder="Enter the pickup location" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
			</div>
			<div class="relative z-0 w-full mb-5 group">
				<label for="text" class="block mb-2 text-sm font-medium text-gray-900">Dropoff Location</label>
				<input type="text" id="dropoff_location" placeholder="Enter the dropoff location" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
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
				<input type="text" id="reservation_price" placeholder="100.00" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
			</div>
			<div class="relative z-0 w-full mb-5 group">
				<label for="text" class="block mb-2 text-sm font-medium text-gray-900">Extras</label>
				<input type="text" id="extras" placeholder="None,Booster Seat, Toddler Seat, Infant Seat"  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"  />
			</div>
		</div>
	
		<div class="grid md:grid-cols-2 md:gap-4">
			<button type="button" on:click={() => handleCreate()} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create a reservation</button>
			</div>
	</form>