
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
			const createdFirstName = document.getElementById('first_name').value;
			// @ts-ignore
			const createdLastName = document.getElementById('last_name').value;
			// @ts-ignore
			const createdDriverLicense = document.getElementById('driver_license').value;
			// @ts-ignore
			const createdEmail = document.getElementById('email').value;
			// @ts-ignore
			const createdRole = document.getElementById('role').value;
			// @ts-ignore
			const createdPhoneNumber = document.getElementById('phone_number').value;
			// @ts-ignore
			const createdPassword = document.getElementById('password').value;

			// Create the payload with the created values
				//-- values should not be blank 
			
			if(createdLastName != "" && createdFirstName != "" && createdEmail != "" && createdPassword != "" && createdDriverLicense != "" &&createdPhoneNumber != ""){
				const payload = {
				first_name: createdFirstName,
				last_name: createdLastName,
				driver_license: createdDriverLicense,
				email: createdEmail,
				phone_number: createdPhoneNumber,
				role: createdRole,
				password: createdPassword,
				};

				console.log(payload);

				const formData = new URLSearchParams();

				// fomData -> encoded URL
				Object.keys(payload).forEach(key => {
				// @ts-ignore
					formData.append(key, payload[key]);
				});

				const response = await fetch(`http://localhost:3000/users`, {
				method: 'POST',
				headers: {
					'Content-Email': 'application/x-www-form-urlencoded',
				},
				body: formData.toString(), // Convert form data 
				});
				console.log(response);

				if (response.ok) {
					console.log('User added successfully');
					// @ts-ignore
					showAlert("User created", "", "success", "OK");
				} else {
				console.error('Failed to add user');
				}
			} else {
				// @ts-ignore
				showAlert("Cannot create user", "One or many fields are required to create a user", "error", "I understand");
			}
		
		} catch (error) {
			console.error('Error creating the user:', error);
		}
		}
	
</script>

<div class="mb-5 text-2xl font-medium text-gray-700 p-4">{title}</div>

<p class="text-gray-500 text-sm p-4">By default, every new user is set to be active. If you want to change the status, you can do so by selecting a specific user.</p>
<br />

<form class="mx-auto">
	<div class="grid md:grid-cols-2 md:gap-6 p-4 ">
		<div class="relative z-0 w-full mb-5 group">
			<label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">First Name</label>
			<input type="text" id="first_name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Ex. Bob " required />
		</div> 
		<div class="relative z-0 w-full mb-5 group">
			<label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Last Name</label>
			<input type="text" id="last_name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Ex. Smith" required />
		</div> 
		<div class="relative z-0 w-full mb-5 group">
			<label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Driver's License</label>
			<input type="text" id="driver_license" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="" required />
		</div>
		<div class="relative z-0 w-full mb-5 group">
			<label for="role" class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Role</label>
			<select id="role" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500">
				<option value="CUSTOMER">CUSTOMER</option>
				<option value="ADMIN">ADMIN</option>
				<option value="CUSTOMER_SERVICE">CUSTOMER_SERVICE</option>
			</select>
		</div>
	</div>

	<div class="grid md:grid-cols-4 md:gap-6 p-4">
		<div class="relative z-0 w-full mb-5 group">
			<label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Email</label>
			<input type="text" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Ex. bob.smith@gmail.com" required />
			
		</div> 
		<div class="relative z-0 w-full mb-5 group">
			<label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Phone Number</label>
			<input type="text" id="phone_number" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Ex. +1234567891" required />
			
		</div>
		<div class="relative z-0 w-full mb-5 group">
			<label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Password</label>
			<input type="text" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="smith123456" required />
			
		</div>
		<div class="relative z-0 w-full mb-5 group">
			<label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">ReType Password</label>
			<input type="text" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="smith123456" required />
		</div>
	</div>


<button type="button" on:click={handleCreate} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new user</button>


</form>
	
  
  