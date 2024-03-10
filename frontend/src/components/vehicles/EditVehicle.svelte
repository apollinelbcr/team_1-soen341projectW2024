
<script>
// @ts-nocheck

	// @ts-ignore
	/**
	 * @type {any}
	 */
	export let title;
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

    const urlParams = new URLSearchParams(window.location.search);
    const vehicleId = urlParams.get('id');
    // Define reactive variables to store vehicle details
    let vehicle = {};
	let isChecked = '';

    // Function to fetch vehicle details from the API
    /**
	 * @param {string | null} vehicleId
	 */
    async function fetchVehicleDetails(vehicleId) {
        try {
            const response = await fetch(`http://localhost:3000/vehicles/${vehicleId}`);
            const data = await response.json();
            vehicle = data;
			(vehicle.status == 'AVAILABLE') ? isChecked = true : isChecked = false;
			console.log(vehicle.status);
        } catch (error) {
            console.error('Error fetching vehicle details:', error);
        }
    }

    // Lifecycle hook to fetch vehicle details when the component mounts
    onMount(() => {
        // Extract vehicle ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const vehicleId = urlParams.get('id');

        // Fetch vehicle details
        fetchVehicleDetails(vehicleId);
    });

	function handleUpdate() {
    	//console.log("Update button clicked");
		updateVehicle();
  	}

	//checking isChecked value after update
	function handleCheckboxClick(){
		isChecked ? false : true;
		console.log("Checkbox clicked. Checked state:", isChecked);
	}

	//update a vehicle
	async function updateVehicle() {
	try {
		// Get the updated values from the input fields
		const updatedName = document.getElementById('vehicle_name').value;
		const updatedImage = document.getElementById('vehicle_image').value;
		const updatedType = document.getElementById('types').value;
		const updatedCategory = document.getElementById('categories').value;
		const updatedTransmission = document.getElementById('transmissions').value;
		const updatedPrice = document.getElementById('vehicle_price').value;

		if(updatedName != "" && updatedImage != "" && updatedPrice != ""){
			// Create the payload with the updated values
			const payload = {
			id: vehicleId,
			name_vehicle: updatedName,
			image: updatedImage,
			vehicle_type: updatedType,
			vehicle_category: updatedCategory,
			vehicle_transmission: updatedTransmission,
			price: parseInt(updatedPrice),
			status: isChecked ? 'AVAILABLE' : 'UNAVAILABLE',
			};

			console.log(payload);

			const formData = new URLSearchParams();

			// Assuming payload is an object containing key-value pairs
			Object.keys(payload).forEach(key => {
			formData.append(key, payload[key]);
			});

			const response = await fetch(`http://localhost:3000/vehicles/${vehicleId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: formData.toString(), // Convert form data to URL-encoded string
			});

			if (response.ok) {
				console.log('Vehicle updated successfully');
				showAlert("Vehicle Updated", "", "success", "OK");
			} else {
				console.error('Failed to update vehicle');
			}
		} else {
			// @ts-ignore
			showAlert("Cannot update vehicle", "One or many fields are required to update this vehicle", "error", "I understand");
		}

		} catch (error) {
			console.error('Error updating vehicle:', error);
		}
	}

	//delete a vehicle
	// Function to delete a vehicle
	async function deleteVehicle(vehicleId) {
    try {
		const response = await fetch(`http://localhost:3000/vehicles/${vehicleId}`, {
			method: 'DELETE'
		});
		const data = await response.text();
		window.location.href = '/admin/vehicles'; 
		} catch (error) {
		console.error('Error deleting vehicle:', error);
		}
	}
  
	// Function to handle delete button click
	function handleDelete() {
		Swal.fire({
		title: 'Are you sure?',
		text: 'Once deleted, you will not be able to recover this vehicle!',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonText: 'Yes, delete it!',
		cancelButtonText: 'No, cancel!',
		reverseButtons: true
		}).then((result) => {
		if (result.isConfirmed) {
			deleteVehicle(vehicleId); // Call delete function if confirmed
		} else if (result.dismiss === Swal.DismissReason.cancel) {
			Swal.fire(
			'Cancelled',
			'Deletion cancelled',
			'info'
			);
		}
		});
	}

</script>


<div class="mb-5 text-2xl font-medium text-gray-700">{title} of vehicle : {vehicleId}</div>

<div class="flex justify-center items-center mt-5 mb-5 md:mb-10">
	<!-- svelte-ignore a11y-img-redundant-alt -->
	<img id="vehicleimg" src="{vehicle.image}" class="max-w-xs h-auto" alt="Oups! It seems like there's no image here.">
</div>


<form class="mx-auto">
	<div class="grid md:grid-cols-2 md:gap-6">
		<div class="relative z-0 w-full mb-5 group">
			<label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Vehicle's Name/Model</label>
			<input type="text" id="vehicle_name" value={vehicle.name_vehicle} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Ex. Toyota Camry" required />
		</div> 
		<div class="relative z-0 w-full mb-5 group">
			<label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Vehicle's Image Link</label>
			<input type="text" id="vehicle_image" value={vehicle.image} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Paste URL here" required />
		</div>
	</div>

	<div class="grid md:grid-cols-4 md:gap-6">
		<div class="relative z-0 w-full mb-5 group">
			<label for="types" class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Select the vehicle's type</label>
			<select id="types" bind:value={vehicle.vehicle_type} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500">
				<option value="CAR">CAR</option>
				<option value="SUV">SUV</option>
				<option value="TRUCK">TRUCK</option>
				<option value="VAN">VAN</option>
			</select>
		</div> 
		<div class="relative z-0 w-full mb-5 group">
			<label for="categories" class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Select the vehicle's category</label>
			<select id="categories" bind:value={vehicle.vehicle_category} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500">
				<option value="COMPACT">COMPACT</option>
				<option value="STANDARD">STANDARD</option>
				<option value="INTERMEDIATE">INTERMEDIATE</option>
				<option value="CLASS 1">CLASS 1</option>
				<option value="CLASS 1">CLASS 2</option>
				<option value="MINI">MINI</option>
				<option value="LARGE">LARGE</option>
			</select>
		</div>
		<div class="relative z-0 w-full mb-5 group">
			<label for="transmissions" class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Select the transmission type</label>
			<select id="transmissions" bind:value={vehicle.vehicle_transmission} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500">
				<option value="MANUAL">MANUAL</option>
				<option value="AUTOMATIC">AUTOMATIC</option>
			</select>
		</div>
		<div class="relative z-0 w-full mb-5 group">
			<label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Vehicle's price per day</label>
			<input type="text" id="vehicle_price" value={vehicle.price} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="$200,00" required />
		</div>
	</div>
	<div class="grid md:grid-cols-2 md:gap-6">
		<label class="inline-flex items-center mb-5 cursor-pointer">
			<input type="checkbox" bind:checked={isChecked} on:change={handleCheckboxClick} class="sr-only peer" />
			<div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
			<span class="ms-3 text-sm font-medium text-dark-900 dark:text-dark-300">Available/Unavailable</span>
		</label>
	</div>
	<div class="grid md:grid-cols-2 md:gap-4">
		<button type="button" on:click={handleUpdate} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update vehicle's info</button>
		<button type="button" on:click={handleDelete} class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Delete vehicle</button>
	</div>
</form>
  