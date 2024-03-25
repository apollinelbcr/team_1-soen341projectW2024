<head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.3.1/jspdf.umd.min.js"></script>
</head>

<script>
// @ts-nocheck

    import { onMount } from 'svelte';
    import Swal from 'sweetalert2';

    let reservation = {};
    let vehicles = [];
    let users = [];

    async function fetchVehiclesAndUsers() {
        const vehiclesResponse = await fetch('http://localhost:3002/vehicles');
        vehicles = await vehiclesResponse.json();
        const usersResponse = await fetch('http://localhost:3002/users');
        users = await usersResponse.json();
    }

    onMount(() => {
        fetchVehiclesAndUsers();
    });

    function showAlert(title, text, icon, confirmButtonText) {
        Swal.fire({
            title,
            text,
            icon,
            confirmButtonText,
            confirmButtonColor: '#3085d6'
        });
    }

    async function handleCreate() {

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
    const userDetails = users.find(user => user.email === updatedEmail);
    const vehicleDetails = vehicles.find(vehicle => vehicle.name_vehicle === updatedVehicleId);

    const reservationReview = {
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
        isCheckedOut: 'false',
        userName: userDetails ? userDetails.first_name : '', 
        userName2: userDetails ? userDetails.last_name : '',
        userPhone: userDetails ? userDetails.phone_number : '',
        userLicense: userDetails ? userDetails.driver_license : '',
        vehicleName: vehicleDetails ? vehicleDetails.name_vehicle : '',
        vehicleType: vehicleDetails ? vehicleDetails.vehicle_type : '',
        vehicleCategory: vehicleDetails ? vehicleDetails.vehicle_category : '',
        vehicleTransmission: vehicleDetails ? vehicleDetails.vehicle_transmission : '',
    };

    // Validate required fields
    if (!updatedEmail || !updatedVehicleId || !updatedPickupDate || !updatedDropoffDate || !updatedPickupLocation || !updatedDropoffLocation || !updatedPrice) {
        showAlert("Missing Information", "Please fill in all required fields.", "error", "OK");
        return;
    }

    // Display the review modal
    Swal.fire({
        title: 'Review Your Reservation',
        html: `
            <p>Email: ${reservationReview.email}</p>
            <p>Vehicle: ${reservationReview.vehicle_name}</p>
            <p>Pickup Date: ${reservationReview.pickup_date}</p>
            <p>Dropoff Date: ${reservationReview.dropoff_date}</p>
            <p>Pickup Location: ${reservationReview.pickup_location}</p>
            <p>Dropoff Location: ${reservationReview.dropoff_location}</p>
            <p>Price: ${reservationReview.price}</p>
            <p>Extras: ${reservationReview.extras}</p>
            <p>Customer Name: ${reservationReview.userName}</p>
            <p>Customer Last Name: ${reservationReview.userName2}</p>
            <p>Customer Phone: ${reservationReview.userPhone}</p>
            <p>Customer License: ${reservationReview.userLicense}</p>
            <p>Vehicle Name: ${reservationReview.vehicleName}</p>
            <p>Vehicle Type: ${reservationReview.vehicleType}</p>
            <p>Vehicle Category: ${reservationReview.vehicleCategory}</p>
            <p>Vehicle Transmission: ${reservationReview.vehicleTransmission}</p>
            <br>
            <p style="color: red; font-weight: bold;">A $500.00 deposit will be charged to your card. So are you sure you want to proceed with the reservation?</p>
        `,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm Reservation',
        cancelButtonText: 'Edit Details'
    }).then(async (result) => {
        if (result.isConfirmed) {
            const formData = new URLSearchParams(reservationReview);

            try {
                const response = await fetch('http://localhost:3002/reservations', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: formData.toString()
                });

                if (response.ok) {
         
    
    const jsPDF = window.jspdf.jsPDF;
    const doc = new jsPDF();
    
    // Car Rental Agreement Header
    doc.setFontSize(18);
    doc.text('Car Rental Agreement', 105, 10, null, 'center');
    doc.setFontSize(10);
    doc.text(`Rental Agreement Number:`, 10, 20);

    doc.text(`This Rental Agreement ("Agreement") is entered into between Rentify, located at XXXXX, hereinafter referred to as 
the "Rental Company," and the individual or entity identified below, hereinafter referred to as the "Renter":`, 10, 30, { maxWidth: 190 });

    // Renter's Information
    doc.text('1. Renter\'s Information:', 10, 40);
    doc.text(`Name: ${reservationReview.userName} ${reservationReview.userName2}`, 10, 50);
    doc.text(`Contact Number: ${reservationReview.userPhone}`, 10, 60);
    doc.text(`Email Address: ${reservationReview.userEmail}`, 10, 70);
    doc.text(`Driver's License Number: ${reservationReview.userLicense}`, 10, 80);

    // Vehicle Information
    doc.text('2. Vehicle Information:', 10, 90);
    doc.text(`Make: ${reservationReview.vehicleName}`, 10, 100);
    doc.text(`Type: ${reservationReview.vehicleType}`, 10, 110);
    doc.text(`Vehicle Category: ${reservationReview.vehicleCategory}`, 10, 120);
    doc.text(`Transmission: ${reservationReview.vehicleTransmission}`, 10, 130);
    
    // Rental Details
    doc.text('3. Rental Details:', 10, 140);
    doc.text(`Rental Start Date: ${reservationReview.pickup_date}`, 10, 150);
    doc.text(`Rental End Date: ${reservationReview.dropoff_date}`, 10, 160);
    doc.text(`Pick-up Location: ${reservationReview.pickup_location}`, 10, 170);
    doc.text(`Drop-off Location: ${reservationReview.dropoff_location}`, 10, 180);
    doc.text(`Pickup Time: ${reservationReview.pickup_time}`, 10, 190);
    doc.text(`Dropoff Time: ${reservationReview.dropoff_time}`, 10, 200);
    doc.text(`Rental Rate: ${reservationReview.price}`, 10, 210);
    doc.text(`Additional Services: ${reservationReview.extras}`, 10, 220);

    doc.text('4. Rental Terms and Conditions:', 10, 230);
    doc.text(`The Renter acknowledges receiving the vehicle described above in good condition and agrees to return it to the Rental 
Company in the same condition, subject to normal wear and tear.`, 10, 240);
    doc.text(`The Renter acknowledges receiving and reviewing a copy of the vehicle's insurance coverage and agrees to comply with all insurance 
requirements during the rental period.`, 10, 250);
    doc.text(`The Renter agrees to pay the Rental Company the agreed-upon rental rate for the specified rental period. Additional 
charges may apply for exceeding the mileage limit, late returns, fuel refueling, or other damages.`, 10, 260);
    doc.text(`The Renter agrees to bear all costs associated with traffic violations, tolls, and parking fines incurred during the 
rental period.`, 10, 270);
    doc.addPage();
    doc.text(`The Renter acknowledges that they are responsible for any loss or damage to the vehicle, including theft, vandalism, accidents, 
or negligence, and agrees to reimburse the Rental Company for all repair or replacement costs.`, 10, 10);
    doc.text(`The Renter agrees to return the vehicle to the designated drop-off location at the agreed-upon date and time. Failure to do so 
may result in additional charges.`, 10, 20);
    doc.text(`The Rental Company reserves the right to terminate this agreement and repossess the vehicle without prior notice if the Renter 
breaches any terms or conditions of this agreement.`, 10, 30);
    doc.text(`The Renter agrees to use the vehicle solely for personal or business purposes and not for any illegal activities.`, 10, 40);

    doc.text('5. Rental Terms and Conditions:', 10, 50);
    doc.text(`The Renter agrees to indemnify and hold harmless the Rental Company, its employees, agents, and affiliates from any claims, 
liabilities, damages, or expenses arising out of or related to the Renter's use of the vehicle.`, 10, 60);

    doc.text('6. Governing Law:', 10, 70);
    doc.text(`This Agreement shall be governed by and construed in accordance with the laws of [Jurisdiction]. Any disputes arising under 
or related to this Agreement shall be resolved exclusively by the courts of [Jurisdiction].`, 10, 80);

    doc.text('7. Entire Agreement:', 10, 90);
    doc.text(`This Agreement constitutes the entire understanding between the parties concerning the subject matter hereof and supersedes 
all prior agreements and understandings, whether written or oral.`, 10, 100);
 
    doc.text('8. Signatures:', 10, 110); // Adjust Y coordinate accordingly
    doc.text('Rental Company:', 10, 120);
    doc.text(`Signature:_____________________________`, 10, 130);
    doc.text(`Print Name:____________________________`, 10, 140);
    doc.text(`Date: _________________________________`, 10, 150);
    doc.text('Renter:', 10, 160);
    doc.text(`Signature: _____________________________`, 10, 170);
    doc.text(`Print Name: ${reservationReview.userName} ${reservationReview.userName2}`, 10, 180);
    doc.text(`Date: _________________________________`, 10, 190);

    let fileName = `reservation_${reservationReview.email}.pdf`;
    doc.save(fileName);

                    showAlert("Reservation Created", "", "success", "OK");
                } else {
                    const errorResponse = await response.json();
                    showAlert("Failed to Create Reservation", errorResponse.message || "An unknown error occurred", "error", "I understand");
                }
            } catch (error) {
                console.error('Error creating the reservation:', error);
                showAlert("Error", "Could not create reservation. Please try again.", "error", "OK");
            }
        }
    });
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