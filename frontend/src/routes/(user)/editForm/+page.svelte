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


	// Define reactive variables to store user details
	interface User {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
  phone_number: string;
  driver_license: string;
  status: string;
  // Add other properties as needed
}
let reservations:[];
// Initialize user as an empty object of type User
let user: User= {
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
        const updatedFirstName = (document.getElementById('first_name') as HTMLInputElement).value;
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
                user = {...payload };
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
<main>
    <section class="container">
        <section class="child-option">
            <div class="sidebar">
                <header>Welcome, {user.first_name}</header>
                <ul>
                    <li>
                        <a href="/accountUser">Profile</a>
                    </li>
                    <li>
                        <a href="/contactInfo">Contact</a>
                    </li>
                    <li>
                        <a href="/paymentInfo">Payment</a>
                    </li>
                    <li>
                        <a href="/reviewInfo">Review</a>
                    </li>
                    <li>
                        <a href="/manageRes">My Reservation</a>
                    </li>
                </ul>
            </div>
        </section>
        <section class=" min-w-[900px] mt-[50px]">
        <div class="form-edit">
            <form>
                <div class="profile-form">
                    
                        <p style="font-weight: bold; font-size: 20px;">Full name:</p>
                        <br>
                        <div class="user-name">
                            <label for="first_name">First:</label>
                            <input type="text" id="first_name" name="first_name"  value={user.first_name}>
                        </div>
                        <br>
                        <br>
                        <div class="user-name">
                            <label for="last_name">Last:</label>
                            <input type="text" id="last_name" name="last_name"  value={user.last_name}>
                        </div>
                        <br>
                        
                </div>
                <div class="contact-form">
                    <p style="font-weight: bold; font-size: 20px;">License Number:</p>
                        <br>
                        <div class="user-phone">
                            <label for="license">License_Number:</label>
                            <input type="text" id="license" name="license" value={user.driver_license}>
                        </div>
                        <br>
                        <br>
                        <p style="font-weight: bold; font-size: 20px;">Phone Number:</p>
                        <br>
                        <div class="user-phone">
                            <label for="phone">Tel:</label>
                            <input type="text" id="phone" name="phone" value={user.phone_number}>
                        </div>
                        <br>
                        <p style="font-weight: bold; font-size: 20px;">Email:</p>
                        <br>
                        <div class="user-email">
                            <label for="email">Email:</label>
                            <input type="email" id="email" name="email" value={user.email}>
                        </div>
                        <br>
                        <br>
                </div>
                <br>
                <br>
                <div class="payment-form">
                        <p style="font-weight: bold; font-size: 20px;">Card Number:</p>
                        <br>
                        <div class="user-number">
                            <label for="number">Number:</label>
                            <input type="text" id="number" name="number" value="0000 0000 0000">
                        </div>
                        <br>
                        <p style="font-weight: bold; font-size: 20px;">Card Information:</p>
                        <br>
                        <div class="container-user-card">
                            <div class="user-expire">
                                <label for="expire">Expire:</label>
                                <input type="text" id="expire" name="expire" value="00/00">
                            </div>
                            <div class="user-code">
                                <label for="code">CVV:</label>
                                <input type="text" id="code" name="code" value="000">
                            </div>
                        </div>
                        <br>
                        <p style="font-weight: bold; font-size: 20px;">Card Type:</p>

                        <input type="radio" id="visa" name="card" value="Visa">
                        <label for="visa">Visa</label>
                        <input type="radio" id="mastercard" name="card" value="Mastercard">
                        <label for="mastercard">Mastercard</label>
                        <br>
                        <br>
                        <div class="grid md:grid md:gap-4">
                            <button type="button" on:click={handleUpdate} class="text-white w-[320px] gap-6 h-[60px] bg-[#1E90FF] hover:bg-[#6ca7e2] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Update reservation info</button>
                        </div>
                </div>
            </form>

        </div>
    </section>
</main>
<style>
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        color: #2f373d;
        scroll-behavior: smooth;
        text-align: justify;
        list-style: none;
        text-decoration: none;
    }
    /*Container for the side bar and account info*/
    .container {
        display: flex;
        width: 95%;
        margin: auto;
    }
    /*sidebar width inside of the flex container*/
    .child-option {
        min-width: 300px;
    }
    /*css for the sidebar*/
    .sidebar {
        width: 250px;
        padding: 15px;
        background-color: #f5f5f5;
        margin-top: 50px;
        border-radius: 8px;
    }
    .sidebar header {
        font-size: 20px;
        color: #2f373d;
        text-align: center;
        line-height: 70px;
    }

    .sidebar ul a {
        display: block;
        width: 100%;
        height: 100%;
        line-height: 65px;
        font-size: 20px;
        padding-left: 40px;
        box-sizing: border-box;
        text-decoration: none;
        transition: .4s;
        color: #2f373d;
    }
    .sidebar ul li:hover a {
        padding-left: 50px;
    }
    .form-edit {
        display: flex;
        margin-top: 50px;

    }
    
    #female , #visa{
        margin-left: 0;
    }
    #male , #mastercard{
        margin-left: 60px;
    }
    .info br {
        display: block;
        content: " ";
        margin-top: 8px;
    }
    /*Container for the side bar and account info*/
    .container {
        display: flex;
        width: 95%;
        margin: auto;
    }
    /*sidebar width inside of the flex container*/
    .child-option {
        min-width: 300px;
    }
    .child-info {
        min-width: 900px;
    }
    /*css for the sidebar*/
    .sidebar {
        width: 250px;
        padding: 15px;
        background-color: #f5f5f5;
        margin-top: 50px;
        border-radius: 8px;
    }
    .sidebar header {
        font-size: 20px;
        color: #2f373d;
        text-align: center;
        line-height: 70px;
    }

    .sidebar ul a {
        display: block;
        width: 100%;
        height: 100%;
        line-height: 65px;
        font-size: 20px;
        padding-left: 40px;
        box-sizing: border-box;
        text-decoration: none;
        transition: .4s;
        color: #2f373d;
    }
    .sidebar ul li:hover a {
        padding-left: 50px;
    }
    

    .user-name {
        height: 60px;
        width: 350px;
        border-radius: 8px;
        border: 1px solid darkgray;
        padding-top: 5px;
        padding-left: 10px;
    }
    .profile-form input[type=text] , .profile-form input[type=number] , .contact-form input[type=email] ,.contact-form input[type=text], .payment-form[type=text] , .payment-form input[type=number] {
        width: 320px;
        font-size: 15px;
        border: none;
        outline:none;
        background: transparent;
        margin-top: 10px;
    }
    .profile-form input[type=number] {
        width: 80px;
    }
    .user-name:hover , .user-birth:hover , .user-email:hover , .user-address:hover, .user-phone:hover, .user-number:hover , .user-expire:hover , .user-code:hover {
        border: 2px solid dodgerblue;
    }
    .container-user-birth {
        display: flex;
        gap: 25px;
        max-width: 500px;
    }
    .user-birth , .user-expire , .user-code {
        border-radius: 8px;
        height: 60px;
        width: 100px;
        border: 1px solid darkgrey;
        padding-left: 10px;
    }
    .user-expire , .user-code {
        width: 150px;
    }
    .user-phone , .user-email , .user-address , .user-number {
        height: 60px;
        width: 350px;
        border-radius: 8px;
        border: 1px solid darkgray;
        padding-left: 10px;
    }
    .container-user-card {
        display: flex;
        gap: 25px;
        max-width: 500px;
        justify-content: space-between;
    }
    input[type=submit] {
        border: none;
        background: none;
        font-size: 15px;
        color: dodgerblue;
        font-weight: bold;
        width: 40px;
        height: 30px;
        border-radius: 20px;
        text-align: center;
    }
    input[type=submit]:hover {
        background: dodgerblue;
        opacity: 0.2;
        font-size: 15px;
        color: white;
        font-weight: bold;
        width: 40px;
        height: 30px;
        border-radius: 20px;
        text-align: center;
        justify-content: center;
    }


</style>