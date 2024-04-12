<script lang="ts">
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

	let reservationId: string | null = null;
    let userId: string | null = null;

    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        reservationId = urlParams.get('id1');
        userId = urlParams.get('id2');

        console.log("resId : "+ reservationId);
        console.log("userId : "+ userId);
    });

	// Define reactive variables to store user details
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


	// Define reactive variables to store reservation details
	let reservation = {};
	let vehicles = [];

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
			console.log(reservation);
            //calculatePrice();
		} catch (error) {
			console.error('Error fetching reservation details:', error);
		}
	}

	

	// Lifecycle hook to fetch reservation details when the component mounts
	onMount(() => {
		fetchReservationDetails(reservationId);
	});

	// Update reservation
	// Update reservation
// Update reservation
async function updateReservation() {
    try {
        // Get the updated values from the form
        
        const updatedPickupDate = document.getElementById('pickup_date').value;
        const updatedDropoffDate = document.getElementById('dropoff_date').value;
        const updatedPickupLocation = document.getElementById('pickup_location').value;
        const updatedDropoffLocation = document.getElementById('dropoff_location').value;
        const updatedExtras = document.getElementById('extras').value;
        await calculatePrice(updatedPickupDate, updatedDropoffDate, updatedExtras);
        if (updatedPickupDate && updatedDropoffDate && updatedPickupLocation && updatedDropoffLocation) {
            // Create the payload with the updated values
            const payload = {
				email: reservation.email,
                vehicle_name: reservation.vehicle_name,
				pickup_date: updatedPickupDate,
				dropoff_date: updatedDropoffDate,
				pickup_location: updatedPickupLocation,
				dropoff_location: updatedDropoffLocation,
                price: reservation.price,
				extras: updatedExtras,
                isCheckedOut: 'true'
			};


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
async function updateVehicleStatus() {
    try {
        const response = await fetch('http://localhost:3002/vehicles');
        const vehiclesData = await response.json();
        
        // Find the vehicle in the vehicles array that matches the reservation's vehicle name
        let vehicle = vehiclesData.find(vehicle => vehicle.name_vehicle == reservation.vehicle_name);
        const payload = {
				name_vehicle: vehicle.name_vehicle,
                image: vehicle.image,
				vehicle_type: vehicle.vehicle_type,
				vehicle_category: vehicle.vehicle_category,
				vehicle_transmission: vehicle.vehicle_transmission,
                status: 'AVAILABLE',
				price: vehicle.price,
			};
            const formData = new URLSearchParams();
            Object.keys(payload).forEach(key => {
                formData.append(key, payload[key]);
            });

            const response2 = await fetch(`http://localhost:3002/vehicles/${vehicle.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString(),
            });

            const responseData = await response2.json(); // Assuming your server responds with JSON
            console.log("Response from the server:", responseData);

            if (response2.ok) {
                console.log('Vehicle updated successfully');

                // Update vehicle details locally
                vehicle = { ...vehicle, status:'AVAILABLE'};

            } else {
                console.error('Failed to update vehicle:', responseData);
            }
    } catch (error) {
        console.error('Error updating vehicle:', error);
    }

}

	function handleUpdate() {
		updateReservation();
        updateVehicleStatus();
	}

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
    const email = "user7@example.com";
    //at the moment it is hard coded, but i have to wait for the log in page to be linked

    // Function to calculate price based on the number of days
    async function calculatePrice(updatedPickupDate, updatedDropoffDate, updatedExtras) {
    const pickupDate = new Date(updatedPickupDate);
    const dropoffDate = new Date(updatedDropoffDate);
    const timeDifference = dropoffDate.getTime() - pickupDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Convert milliseconds to days
    let basePrice = 0;

    try {
        const response = await fetch('http://localhost:3002/vehicles');
        const vehiclesData = await response.json();
        
        // Find the vehicle in the vehicles array that matches the reservation's vehicle name
        const vehicle = vehiclesData.find(vehicle => vehicle.name_vehicle == reservation.vehicle_name);
        if (vehicle) {
            reservation.price = (vehicle.price * daysDifference)
            if (updatedExtras == "None"){
                reservation.price += 0;
            }
            else{
                reservation.price += 10;//set the price for all extras to be 10$
            }
            reservation.price = (reservation.price * (1.14975)).toFixed(2);
        } else {
            reservation.price = basePrice;
            console.log("oups");
        }
    } catch (error) {
        console.error('Error fetching vehicle details:', error);
        reservation.price = basePrice; // Set price to base price if there's an error fetching vehicle details
    }
    return reservation.price;
  }
/*
  onMount(() => {
    // Calculate initial price
    calculatePrice();
  });*/

</script>


<div class="flex w-[95%] m-auto">
    
    <div class=" min-w-[300px]">
            <div class="w-[250px] p-[15px] bg-[#f5f5f5] mt-[50px] rounded-lg">

                <header class="text-xl text-[#2f373d] text-center leading-[70px]">Welcome, {user.first_name}</header>
                <ul>
                    <li>
                        <a class="block w-full h-full leading-[65px] text-xl pl-10 box-border no-underline transition-[.4s] text-[#2f373d] hover:pl-[50px]" href="/accountUser?id={userId}">Profile</a>
                    </li>
                    <li>
                        <a class="block w-full h-full leading-[65px] text-xl pl-10 box-border no-underline transition-[.4s] text-[#2f373d] hover:pl-[50px]" href="/ContactInfo?id={userId}">Contact</a>
                    </li>
                    <li>
                        <a class="block w-full h-full leading-[65px] text-xl pl-10 box-border no-underline transition-[.4s] text-[#2f373d] hover:pl-[50px]" href="/paymentInfo?id={userId}">Payment</a>
                    </li>
                    <li>
                        <a class="block w-full h-full leading-[65px] text-xl pl-10 box-border no-underline transition-[.4s] text-[#2f373d] hover:pl-[50px]" href="/reviewInfo?id={userId}">Review</a>
                    </li>
                    <li>
                        <a class="block w-full h-full leading-[65px] text-xl pl-10 box-border no-underline transition-[.4s] text-[#2f373d] hover:pl-[50px]" href="/manageRes?id={reservationId}">My Reservation</a>
                    </li>
                </ul>
            </div>
        
    </div>
    <div class=" mt-[50px] rounded-lg">
        <div class="mb-5 text-2xl font-medium text-gray-700">Check-out:</div>
        <div class="flex">
            <div class="text-lg font-medium text-gray-700 mr-4">Please confirm the details below before proceding to payment</div>
        </div>
        <br>

        <form class="mx-auto">
            <div class="grid md:grid-cols-1 md:gap-6">
                <div class="relative z-0 w-full mb-5 group">
                    <label for="text" class="block mb-2 text-sm font-medium text-gray-900">Vehicle</label>
                    <input type="text" id="vehicle_name" value={reservation.vehicle_name} readonly class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Additional services or items" />
                </div>
            </div>
            <div class="grid md:grid-cols-2 md:gap-6">
                <div class="relative z-0 w-full mb-5 group">
                    <label for="date" class="block mb-2 text-sm font-medium text-gray-900">Pickup Date</label>
                    <input type="date" id="pickup_date" value={reservation.pickup_date}  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    <p class=" text-xs ">*If the dates are changed now, the price will updated at the next page.</p>
                </div>
                <div class="relative z-0 w-full mb-5 group">
                    <label for="date" class="block mb-2 text-sm font-medium text-gray-900">Dropoff Date</label>
                    <input type="date" id="dropoff_date" value={reservation.dropoff_date} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    <p class=" text-xs ">*If the dates are changed now, the price will updated at the next page.</p>

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
            

            <div class="grid md:grid-cols-1 md:gap-6">
                <div class="relative z-0 w-full mb-5 group">
                    <label for="text" class="block mb-2 text-sm font-medium text-gray-900">Extras</label>
                    <input type="text" id="extras" value={reservation.extras} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Additional services or items" />
                    <p class=" text-xs ">*If the extra is changed now, the price will be updated at the next page.</p>
                </div>
            </div>

            <div class="grid md:grid-cols-1 md:gap-6">
                <div class="relative z-0 w-full mb-5 group">
                    <label for="text" class="block mb-2 text-sm font-medium text-gray-900">Price</label>
                    <input type="number" id="price" value={reservation.price} readonly class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Additional services or items" />
                </div>
            </div>

            <div class="grid md:grid md:gap-4">
                <button type="button" on:click={handleUpdate} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Confirm Check-Out</button>
            </div>
        </form>
    </div>
</div>

