<script lang="ts">
    import { onMount } from 'svelte';
	import Swal from 'sweetalert2';

    // Error alert
	function showAlert(title:any, text:any, icon:any, confirmButtonText:any) {
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

    /**
	 * @type {any[]}
	 */
     let users: any[] = [];
     
    onMount(async () => {
        try {
            const response = await fetch('http://localhost:3002/users');
            users = await response.json();
            
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    });

let reservations:[];
let user={
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  role: '',
  phone_number: '',
  driver_license: '',
  status: ''
};


	// Function to fetch user details from the API
	async function fetchUserDetails(userId:any) {
		try {
			const response = await fetch(`http://localhost:3002/users/${userId}`);
			const data = await response.json();
			user = data;
			console.log(user);
		} catch (error) {
			console.error('Error fetching user details:', error);
		}
	}

	

	// Lifecycle hook to fetch user details when the component mounts
	onMount(() => {
		fetchUserDetails(userId);
	});

	// Update user
async function updateUser() {
    try {
        const oldEmail = user.email;
        // Get the updated values from the form
        const updatedFirstName = (document.getElementById('fname') as HTMLInputElement).value;
        const updatedLastName = (document.getElementById('last_name') as HTMLInputElement).value;
        const updatedEmail = (document.getElementById('email') as HTMLInputElement).value;
        const updatedPhoneNumber = (document.getElementById('phone') as HTMLInputElement).value;
        const updatedDriverLicense = (document.getElementById('license') as HTMLInputElement).value;
        
            const payload= {
				first_name: updatedFirstName,
                last_name: updatedLastName,
				email: updatedEmail,
				password: user.password,
				role: user.role,
				phone_number: updatedPhoneNumber,
                driver_license: updatedDriverLicense,
				status: user.status,
			};
            

            const formData = new URLSearchParams();
            for (const [key, value] of Object.entries(payload)) {
                formData.append(key, value);
            }
            const response = await fetch(`http://localhost:3002/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString(),
            });

            const responseData = await response.json(); // Assuming your server responds with JSON
            console.log("Response from the server:", responseData);

            if (response.ok) {
                console.log('User updated successfully');
                showAlert("User Updated", "", "success", "OK");
                // Update user details locally
                user = {...user, ...payload };
                // Optionally, re-fetch user details if you need to ensure data consistency
                fetchUserDetails(userId);
            } else {
                console.error('Failed to update user:', responseData);
                showAlert("Cannot update user", "There was a problem updating the user: " + responseData.message, "error", "I understand");
            
            }
    
        
    } catch (error) {
        console.error('Error updating user:', error);
        showAlert("Cannot update user", "An unexpected error occurred while updating the user", "error", "I understand");
    }

}

	function handleUpdate() {
		updateUser();
	}

    const email = "user7@example.com";
    //at the moment it is hard coded, but i have to wait for the log in page to be linked

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
                        <a class="block w-full h-full leading-[65px] text-xl pl-10 box-border no-underline transition-[.4s] text-[#2f373d] hover:pl-[50px]" href="/accountUser" id="profileLink">Profile</a>
                    </li>
                    <li>
                        <a class="block w-full h-full leading-[65px] text-xl pl-10 box-border no-underline transition-[.4s] text-[#2f373d] hover:pl-[50px]" href="/accountUser" id="contactLink">Contact</a>
                    </li>
                    <li>
                        <a class="block w-full h-full leading-[65px] text-xl pl-10 box-border no-underline transition-[.4s] text-[#2f373d] hover:pl-[50px]" href="/accountUser" id="paymentLink">Payment</a>
                    </li>
                    <li>
                        <a class="block w-full h-full leading-[65px] text-xl pl-10 box-border no-underline transition-[.4s] text-[#2f373d] hover:pl-[50px]" href="/accountUser" id="reviewLink">Review</a>
                    </li>
                    <li>
                        <a class="block w-full h-full leading-[65px] text-xl pl-10 box-border no-underline transition-[.4s] text-[#2f373d] hover:pl-[50px]" href="/manageRes">My Reservation</a>
                    </li>
                </ul>
            </div>
        
    </div>
    <div class=" mt-[50px] rounded-lg">
        <div class="mb-5 text-2xl font-medium text-gray-700">Modify Information:</div>
        <br>

        <form class="mx-auto">
            

            <div class="grid md:grid-cols-2 md:gap-6">
                <div class="relative z-0 w-full mb-5 group">
                    <label for="fname" class="block mb-2 text-sm font-medium text-gray-900">First Name</label>
                    <input type="text" id="fname" value={user.first_name} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>
                <div class="relative z-0 w-full mb-5 group">
                    <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
                    <input type="text" id="last_name" value={user.last_name} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>
            </div>
            <div class="grid md:grid-cols-1 md:gap-6">
                <div class="relative z-0 w-full mb-5 group">
                    <label for="license" class="block mb-2 text-sm font-medium text-gray-900">License Number</label>
                    <input type="text" id="license" value={user.driver_license} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div> 		
            </div>
            <div class="grid md:grid-cols-2 md:gap-6">
                <div class="relative z-0 w-full mb-5 group">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
                    <input type="text" id="email" value={user.email} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>
                <div class="relative z-0 w-full mb-5 group">
                    <label for="phone" class="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
                    <input type="text" id="phone" value={user.phone_number} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>
            </div>

            <div class="grid md:grid md:gap-4">
                <button type="button" on:click={handleUpdate} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Update reservation info</button>
            </div>
        </form>
    </div>
</div>
{/each}

