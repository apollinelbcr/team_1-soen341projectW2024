
<script>
// @ts-nocheck

	// @ts-ignore
	/**
	 * @type {any}
	 */
	export let title;
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

    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');
    // Define reactive variables to store user details
    let user = {};
	let isChecked = '';

    // Function to fetch user details from the API
    /**
	 * @param {string | null} userId
	 */
    async function fetchUserDetails(userId) {
        try {
            const response = await fetch(`http://localhost:3000/users/${userId}`);
            const data = await response.json();
            user = data;
			(user.status == 'ACTIVE') ? isChecked = true : isChecked = false;
			console.log(user.status);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    }

    // Lifecycle hook to fetch user details when the component mounts
    onMount(() => {
        // Extract user ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('id');

        // Fetch user details
        fetchUserDetails(userId);
    });

	function handleUpdate() {
    	//console.log("Update button clicked");
		updateUser();
  	}

	//checking isChecked value after update
	function handleCheckboxClick(){
		isChecked ? false : true;
		console.log("Checkbox clicked. Checked state:", isChecked);
	}

	//update a user
	async function updateUser() {
	try {
		// Get the updated values from the input fields
		const updatedName = document.getElementById('name_user').value;
		const updatedImage = document.getElementById('user_image').value;
		const updatedEmail = document.getElementById('user_email').value;
		const updatedPhone = document.getElementById('user_phone').value;
		const updatedPassword = document.getElementById('user_password').value;

		if(updatedName != "" && updatedImage != "" && updatedPrice != ""){
			// Create the payload with the updated values
			const payload = {
			id: userId,
			name_user: updatedName,
			image: updatedImage,
			user_email: updatedEmail,
			user_phone: updatedPhone,
			user_email: updatedPassword,
			price: parseInt(updatedPrice),
			status: isChecked ? 'ACTIVE' : 'INACTIVE',
			};

			console.log(payload);

			const formData = new URLSearchParams();

			// Assuming payload is an object containing key-value pairs
			Object.keys(payload).forEach(key => {
			formData.append(key, payload[key]);
			});

			const response = await fetch(`http://localhost:3000/users/${userId}`, {
			method: 'PATCH',
			headers: {
				'Content-Email': 'application/x-www-form-urlencoded',
			},
			body: formData.toString(), // Convert form data to URL-encoded string
			});

			if (response.ok) {
				console.log('User updated successfully');
				showAlert("User Updated", "", "success", "OK");
			} else {
				console.error('Failed to update user');
			}
		} else {
			// @ts-ignore
			showAlert("Cannot update user", "One or many fields are required to update this user", "error", "I understand");
		}

		} catch (error) {
			console.error('Error updating user:', error);
		}
	}

	//delete a user
	// Function to delete a user
	async function deleteUser(userId) {
    try {
		const response = await fetch(`http://localhost:3000/users/${userId}`, {
			method: 'DELETE'
		});
		const data = await response.text();
		window.location.href = '/admin/users'; 
		} catch (error) {
		console.error('Error deleting user:', error);
		}
	}
  
	// Function to handle delete button click
	function handleDelete() {
		Swal.fire({
		title: 'Are you sure?',
		text: 'Once deleted, you will not be able to recover this user!',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonText: 'Yes, delete it!',
		cancelButtonText: 'No, cancel!',
		reverseButtons: true
		}).then((result) => {
		if (result.isConfirmed) {
			deleteUser(userId); // Call delete function if confirmed
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


<div class="mb-5 text-2xl font-medium text-gray-700">{title} of user : {userId}</div>

<div class="flex justify-center items-center mt-5 mb-5 md:mb-10">
	<!-- svelte-ignore a11y-img-redundant-alt -->
	<img id="userimg" src="{user.image}" class="max-w-xs h-auto" alt="Oups! It seems like there's no image here.">
</div>


<form class="mx-auto">
	<div class="grid md:grid-cols-2 md:gap-6">
		<div class="relative z-0 w-full mb-5 group">
			<label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">User's Name (First, Last)</label>
			<input type="text" id="user_name" value={user.name_user} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Ex. Toyota Camry" required />
		</div> 
		<div class="relative z-0 w-full mb-5 group">
			<label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">User's Profile Picture</label>
			<input type="text" id="user_image" value={user.image} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Paste URL here" required />
		</div>
	</div>

	<div class="grid md:grid-cols-4 md:gap-6">
		<div class="relative z-0 w-full mb-5 group">
			<label for="user_email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">User's Email</label>
			<input type="text" id="user_email" value={user.user_email} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Ex. bob.smith@gmail.com" required />
		</div> 
		<div class="relative z-0 w-full mb-5 group">
			<label for="user_phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">Select the user's phone</label>
			<input type="text" id="user_phone" value={user.user_phone} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Ex. bob.smith@gmail.com" required />
		</div>
		<div class="relative z-0 w-full mb-5 group">
			<label for="id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">User's Id</label>
			<input type="text" id="id" value={user.id} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Ex. 1234" required />
		</div>
		<div class="relative z-0 w-full mb-5 group">
			<label for="user_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">User's password</label>
			<input type="text" id="user_password" value={user.user_password} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="smith1234" required />
		</div>
	</div>
	<div class="grid md:grid-cols-2 md:gap-6">
		<label class="inline-flex items-center mb-5 cursor-pointer">
			<input type="checkbox" bind:checked={isChecked} on:change={handleCheckboxClick} class="sr-only peer" />
			<div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
			<span class="ms-3 text-sm font-medium text-dark-900 dark:text-dark-300">Active/Inactive</span>
		</label>
	</div>
	<div class="grid md:grid-cols-2 md:gap-4">
		<button type="button" on:click={handleUpdate} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update user's info</button>
		<button type="button" on:click={handleDelete} class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Delete user</button>
	</div>
</form>
  