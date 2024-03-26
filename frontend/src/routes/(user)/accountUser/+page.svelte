<script lang="ts">
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
            <div class="child" id="Profile" style="display: block;">
                <h1 style="font-size: 30px;">Profile Information</h1>
                <p>Ensure that this information corresponds with your driver's license.</p>
                <br>
                <div class="info fname">
                    <b>First Name:</b>
                    <br>
                    <p>{user.first_name}</p>
                </div>
                <br>
                <div class="info lname">
                    <b>Last Name:</b>
                    <br>
                    <p>{user.last_name}</p>
                </div>
                <br>
                <div class="info birth">
                    <b>Role:</b>
                    <br>
                    <p>{user.role}</p>
                </div>
                <br>
                <button>
                    <a href="/editInfoUser?id={userId}">Edit</a>

                </button>
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
    /*Change the height of br*/
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
</style>