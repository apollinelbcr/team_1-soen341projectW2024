<script lang="ts">
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
	const userId = urlParams.get('id');

	// Define reactive variables to store user details
	let user = {};

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
        // Get the updated values from the form
        const firstNameInput = document.getElementById('fname') as HTMLInputElement;
        const lastNameInput = document.getElementById('lname') as HTMLInputElement;
        const emailInput = document.getElementById('email') as HTMLInputElement;
        const phoneInput = document.getElementById('phone') as HTMLInputElement;
        const licenseInput = document.getElementById('dropoff_location') as HTMLInputElement;
        if (firstNameInput && lastNameInput && emailInput && phoneInput && licenseInput) {
            const updatedFirstName = firstNameInput.value;
            const updatedLastName = lastNameInput.value;
            const updatedEmail = emailInput.value;
            const updatedPhoneNumber = phoneInput.value;
            const updatedDriverLicense = licenseInput.value;
        
            if (updatedFirstName && updatedLastName && updatedEmail && updatedPhoneNumber && updatedDriverLicense) {
            // Create the payload with the updated values
            const payload = {
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
            Object.keys(payload).forEach(key => {
                formData.append(key, payload[key]);
            });

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
                user = { ...user, ...payload };

                
                // Optionally, re-fetch user details if you need to ensure data consistency
                // fetchUserDetails(userId);
            } else {
                console.error('Failed to update user:', responseData);
                showAlert("Cannot update user", "There was a problem updating the user: " + responseData.message, "error", "I understand");
            }
        } else {
            showAlert("Cannot update user", "All fields are required to update this user", "error", "I understand");
        }
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

    <div class="form-edit">
        <div class="profile-form">
            <form id="profile-form">
                <p style="font-weight: bold; font-size: 20px;">Full name:</p>
                <br>
                <div class="user-name">
                    <label for="fname">First:</label>
                    <input type="text" id="fname" name="fname"  value={user.first_name}>
                </div>
                <br>
                <br>
                <div class="user-name">
                    <label for="lname">Last:</label>
                    <input type="text" id="lname" name="lname"  value={user.first_name}>
                </div>
                <br>
                <br>
                <p style="font-weight: bold; font-size: 20px;">Gender:</p>

                <input type="radio" id="female" name="options" value="female">
                <label for="female">Female</label>
                <input type="radio" id="male" name="options" value="male">
                <label for="male">Male</label>
                <br>
                <br>
                <p style="font-weight: bold; font-size:20px;">Date of birth:</p>
                <br>
                <div class="container-user-birth">
                    <div class="user-birth">
                        <label for="date">Date:</label>
                        <input type="number" id="date" name="date" value="07" min="01" max="31">
                        <br>
                    </div>
                    <div class="user-birth">
                        <label for="month">Month:</label>
                        <input type="number" id="month" name="month" value="25" min="1" max="12">
                        <br>
                    </div>
                    <div class="user-birth">
                        <label for="year">Year:</label>
                        <input type="number" id="year" name="year" value="2003" min="1900" max="2024">
                    </div>
                </div>
                <br>
                <br>
            </form>
            <div class="contact-form">
                <form id="contact-form">
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
                    <p style="font-weight: bold; font-size: 20px;">Home Address:</p>
                    <br>
                    <div class="user-address">
                        <label for="address">Address:</label>
                        <input type="text" id="address" name="address" value="xxx st. abcdefgh">
                    </div>
                </form>
            </div>
            <br>
            <br>
            <div class="payment-form">
                <form id="payment-form">
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
                        <button type="button" on:click={handleUpdate} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Update reservation info</button>
                    </div>
                </form>
            </div>
        </div>

    </div>
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
    .form-edit {
        display: flex;

    }
    /*Leave a space between two radio button option*/
    .profile-form input[type=radio] , .payment-form input[type=radio]{


    }
    #female , #visa{
        margin-left: 0;
    }
    #male , #mastercard{
        margin-left: 60px;
    }
    .user-name {
        height: 60px;
        width: 350px;
        border-radius: 8px;
        border: 1px solid darkgray;
        padding-top: 5px;
        padding-left: 10px;
    }
    .profile-form input[type=text] , .profile-form input[type=number] , .contact-form input[type=email] , .payment-form[type=text] , .payment-form input[type=number] {
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
    a{
        position: fixed;
        border: none;
        background: none;
        font-size: 20px;
        color: dodgerblue;
        font-weight: bold;
        width: 30px;
        height: 30px;
        border-radius: 20px;
        text-align: center;
        margin: 10px;
    }
    a:hover {
        background: dodgerblue;
        opacity: 0.2;
        font-size: 20px;
        color: white;
        font-weight: bold;
        border-radius: 25px;
        border: 1px solid dodgerblue;
        width: 30px;
        height: 30px;
        text-align: center;
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