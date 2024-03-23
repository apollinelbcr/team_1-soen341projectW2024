<script lang="ts">
    import EditForm from '$lib/components/Account/editForm.svelte';
    import AddReview from "$lib/components/Account/addReview.svelte";
    import { onMount } from 'svelte';
    import {writable} from "svelte/store";

    
    let formData = writable(
        {
            cardNumber: "0000 0000 0000",
            expire: "00/00",
            code: "000",
            cardType: "Visa",
            cardNumber2: "1234 5678 0000",
            expire2: "09/25",
            code2: "981",
            cardType2: "Visa"
    });
    
    const email = "user7@example.com";
    //at the moment it is hard coded, but i have to wait for the log in page to be linked
    
    
    // @ts-ignore
    /**
	 * @type {any[]}
	 */
     let vehicles: any[] = [];
    /**
	 * @type {any[]}
	 */
     let reservations: any[] = [];
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

    let showEditForm = false;
    let showAddReview = false;
    function toggleEditForm() {
        showEditForm = !showEditForm;
    }
    function toggleAddEditForm() {
        showAddReview = !showAddReview;
    }

</script>

<main>
    {#each users.filter((user)=> user.email == email) as userData}
    <section class="container">
        <section class="child-option">
            <div class="sidebar">
                <header>Welcome, {userData.first_name}</header>
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
        <section class="child-info">
            <div class="child" id="Payment">
                <h1 style="font-size: 30px;">Payment Information</h1>
                <p>Save your card for later:</p>
                <br>
                <p style="font-weight: bold;">Your card</p>
                <br>
                <div class="user-card">
                    <div class="card">
                        <p id="card-number">{$formData.cardNumber}</p>
                        <br>
                        <div class="card-container">
                            <div class="child-card1">
                                <p id="card-expire">{$formData.expire}</p>
                            </div>
                            <div class="child-card2">
                                <p id="card-code">{$formData.code}</p>
                            </div>
                        </div>
                        <br>
                        <p id="card-type">{$formData.cardType}</p>
                    </div>
                    <div class="card">
                        <p id="card-number1">{$formData.cardNumber2}</p>
                        <br>
                        <div class="card-container">
                            <div class="child-card1">
                                <p id="card-expire1">{$formData.expire2}</p>
                            </div>
                            <div class="child-card2">
                                <p id="card-code1">{$formData.code2}</p>
                            </div>
                        </div>
                        <br>
                        <p id="card-type1">{$formData.cardType2}</p>
                    </div>

                </div>
                <br>


            </div>
            {#if showEditForm}
                <EditForm />
            {/if}

        </section>
    </section>
    {/each}
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
    .user-card {
        display: flex;
        margin: auto;
        gap: 20px;
    }
    .card-container {
        display: flex;
        justify-content: space-between;
        width: 140px
    }
    .card {
        border: 1px solid black;
        text-align: center;
        width: fit-content;
        padding: 15px;
        border-radius: 15px;

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