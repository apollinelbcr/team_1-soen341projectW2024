
<script>
	// @ts-ignore
	/**
	 * @type {any}
	 */
	 export let title;
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


	 // @ts-ignore
	 async function handleCreate() {
		try {
			// Get the updated values from the input fields
			// @ts-ignore
			const createdName = document.getElementById('vehicle_name').value;
			// @ts-ignore
			const createdImage = document.getElementById('vehicle_image').value;
			// @ts-ignore
			const createdType = document.getElementById('types').value;
			// @ts-ignore
			const createdCategory = document.getElementById('categories').value;
			// @ts-ignore
			const createdTransmission = document.getElementById('transmissions').value;
			// @ts-ignore
			const createdPrice = document.getElementById('vehicle_price').value;

			// Create the payload with the created values
				//-- values should not be blank 
			
			if(createdName != "" && createdImage != "" && createdPrice != ""){
				const payload = {
				name_vehicle: createdName,
				image: createdImage,
				vehicle_type: createdType,
				vehicle_category: createdCategory,
				vehicle_transmission: createdTransmission,
				price: parseInt(createdPrice) 
				};

				console.log(payload);

				const formData = new URLSearchParams();

				// fomData -> encoded URL
				Object.keys(payload).forEach(key => {
				// @ts-ignore
					formData.append(key, payload[key]);
				});

				const response = await fetch(`http://localhost:3000/vehicles`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: formData.toString(), // Convert form data to URL-encoded string
				});

				if (response.ok) {
					console.log('Vehicle added successfully');
					// @ts-ignore
					showAlert("Vehicle created", "", "success", "OK");
				} else {
				console.error('Failed to add vehicle');
				}
			} else {
				// @ts-ignore
				showAlert("Cannot create vehicle", "One or many fields are required to create a vehicle", "error", "I understand");
			}
		
		} catch (error) {
			console.error('Error creating the vehicle:', error);
		}
		}
	
</script>

<div class="mb-5 text-2xl font-medium text-gray-700">{title}</div>

<p class="text-gray-500 text-sm">By default, every new vehicle is set to be available. If you want to change the status, you can do so by selecting a specific vehicle.</p>
<br />

<form class="mx-auto">
	<div class="grid md:grid-cols-2 md:gap-6">
		<div class="relative z-0 w-full mb-5 group">
			<label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Name/Model</label>
			<input type="text" id="vehicle_name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Ex. Toyota Camry" required />
		</div> 
		<div class="relative z-0 w-full mb-5 group">
			<label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Image Link</label>
			<input type="text" id="vehicle_image" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Paste URL here" required />
		</div>
	</div>

	<div class="grid md:grid-cols-4 md:gap-6">
		<div class="relative z-0 w-full mb-5 group">
			<label for="types" class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Type</label>
			<select id="types" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500">
				<option value="CAR">CAR</option>
				<option value="SUV">SUV</option>
				<option value="TRUCK">TRUCK</option>
				<option value="VAN">VAN</option>
			</select>
		</div> 
		<div class="relative z-0 w-full mb-5 group">
			<label for="categories" class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Category</label>
			<select id="categories" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
			<label for="transmissions" class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Transmission type</label>
			<select id="transmissions" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500">
				<option value="MANUAL">MANUAL</option>
				<option value="AUTOMATIC">AUTOMATIC</option>
			</select>
		</div>
		<div class="relative z-0 w-full mb-5 group">
			<label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Price per day</label>
			<input type="text" id="vehicle_price" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="$200,00" required />
		</div>
	</div>
	
	<button type="button" on:click={handleCreate} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new vehicle</button>
  </form>
  
  