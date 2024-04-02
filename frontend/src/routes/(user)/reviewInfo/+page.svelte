<script lang="ts">
    import AddReview from "$lib/components/Account/addReview.svelte";
    import { onMount } from 'svelte';
    
    let userId: string | null = null;
    
    onMount(() => {
        const url = new URL(window.location.href);
        const searchParams = url.searchParams;
        userId = searchParams.get('id');
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
    // @ts-ignore
    /**
	 * @type {any[]}
	 */
     let reservations: any[] = [];
     /**
	 * @type {any[]}
	 */
     let vehicles: any[] = [];
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
    
    onMount(async () => {
        try {
            const response = await fetch('http://localhost:3002/vehicles');
            vehicles = await response.json();
            
            //filteredVehicles = vehicles; // Initialize filteredVehicles with all vehicles
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }
    });
    onMount(async () => {
        try {
            const response = await fetch('http://localhost:3002/reservations');
            reservations = await response.json();
            
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    });

    let showAddReview = false;
    
    function toggleAddEditForm() {
        showAddReview = !showAddReview;
    }

</script>

<main>
    <section class="container">
        <section class="child-option">
            <div class="sidebar">
                <header>Welcome, {user.first_name}</header>
                <ul>
                    <li>
                        <a href="/accountUser?id={userId}">Profile</a>
                    </li>
                    <li>
                        <a href="/contactInfo?id={userId}">Contact</a>
                    </li>
                    <li>
                        <a href="/paymentInfo?id={userId}">Payment</a>
                    </li>
                    <li>
                        <a href="/reviewInfo?id={userId}">Review</a>
                    </li>
                    <li>
                        <a href="/manageRes?id={userId}">My Reservation</a>
                    </li>
                </ul>
            </div>
        </section>
        <section class="child-info">
            <div class="child" id="Review">
                <div class="relative overflow-x-auto bg-gray-100 rounded-lg p-6">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-700">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-200">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Reservation
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Review
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Price per Day
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="bg-white border-b">
                            <th scope="row" class="px-6 py-6 font-medium text-gray-900 whitespace-nowrap">
                                Tesla
                            </th>
                            <td class="px-6 py-4 ">
                                S
                            </td>
                            <td class="px-6 py-4">
                                7/10
                            </td>
                            <td class="px-6 py-4">
                                115$
                            </td>
                        </tr>
                        <tr class="bg-white border-b">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                Nissan
                            </th>
                            <td class="px-6 py-4">
                                Rogue
                            </td>
                            <td class="px-6 py-4">
                                5/10
                            </td>
                            <td class="px-6 py-4">
                                115$
                            </td>
                        </tr>
                        <tr class="bg-white border-b">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                Toyota
                            </th>
                            <td class="px-6 py-4">
                                Corolla
                            </td>
                            <td class="px-6 py-4">
                                10/10
                            </td>
                            <td class="px-6 py-4">
                                59$
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <br>
                <button on:click={toggleAddEditForm}>
                    <a href="">Add</a>

                </button>
                {#if showAddReview}
                    <AddReview />
                {/if}
            </div>

        </section>
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
    /*beginning css for account.html*/
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
    .child {
        margin-top: 50px;
        border-radius: 8px;
    }

    .child-info button , .child-info a{
        border: none;
        background: none;
        font-size: 15px;
        color: dodgerblue;
        font-weight: bold;
        width: 40px;
        height: 30px;
        border-radius: 15px;
        text-align: center;
        margin: -5px;

    }
    .child-info button:hover , .child-info a:hover{
        background: dodgerblue;
        opacity: 0.2;
        font-size: 15px;
        color: white;
        font-weight: bold;
        border-radius: 15px;
        border: 1px solid dodgerblue;
        width: 40px;
        height: 30px;
        text-align: center;
    }
    .card-review {
        display: flex;
        margin: auto;
        gap: 20px;
    }
    .review {
        border: 1px solid black;
        text-align: center;
        width: fit-content;
        padding: 15px;
        border-radius: 15px;
    }





</style>