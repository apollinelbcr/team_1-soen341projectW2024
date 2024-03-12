
<script>
	// @ts-ignore
	/**
	 * @type {any}
	 */
	 export let title;
	 // @ts-ignore
	 import { onMount } from 'svelte';
	 //import Swal from 'sweetalert2';

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
			const createdName = document.getElementById('user_name').value;
			// @ts-ignore
			const createdImage = document.getElementById('user_image').value;
			// @ts-ignore
			const createdEmail = document.getElementById('user_email').value;
			// @ts-ignore
			const createdPhone = document.getElementById('user_phone').value;
			// @ts-ignore
			const createdPassword = document.getElementById('user_password').value;

			// Create the payload with the created values
				//-- values should not be blank 
			
			if(createdName != "" && createdEmail != "" && createdPassword != ""){
				const payload = {
				name_user: createdName,
				image: createdImage,
				user_email: createdEmail,
				user_phone: createdPhone,
				user_password: createdPassword,
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
				body: formData.toString(), // Convert form data to URL-encoded string
				});

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

<div class="mb-5 text-2xl font-medium text-gray-700">{title}</div>

<p class="text-gray-500 text-sm">By default, every new user is set to be active. If you want to change the status, you can do so by selecting a specific user.</p>
<br />

<form class="mx-auto">
	<div class="grid md:grid-cols-2 md:gap-6">
		<div class="relative z-0 w-full mb-5 group">
			<label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Name (First, Last)</label>
			<input type="text" id="name_user" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Ex. Bob Smith" required />
		</div> 
		<div class="relative z-0 w-full mb-5 group">
			<label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Profile Picture</label>
			<input type="text" id="user_image" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Paste URL here" required />
		</div>
	</div>

	<div class="grid md:grid-cols-4 md:gap-6">
		<div class="relative z-0 w-full mb-5 group">
			<label for="user_email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Email</label>
			<input type="text" id="user_email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Ex. bob.smith@gmail.com" required />
			
		</div> 
		<div class="relative z-0 w-full mb-5 group">
			<label for="user_phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Phone</label>
			<input type="text" id="user_phone" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Ex. +1234567891" required />
			
		</div>
		<div class="relative z-0 w-full mb-5 group">
			<label for="user_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Password</label>
			<input type="text" id="user_password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="smith123456" required />
			
		</div>
		<div class="relative z-0 w-full mb-5 group">
			<label for="user_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">ReType Password</label>
			<input type="text" id="user_password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="smith123456" required />
		</div>
	</div>


<button type="button" on:click={handleCreate} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new user</button>


</form>
	
  
  