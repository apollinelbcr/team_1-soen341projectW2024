<script lang="ts">
    import EditForm from '$lib/components/Account/editForm.svelte';
    import AddReview from "$lib/components/Account/addReview.svelte";
    import { onMount } from 'svelte';
    import {writable} from "svelte/store";
    let formData = writable(
        {
            fname: "Zineb",
            lname: "Bamouh",
            gender: "female",
            date: "07",
            month: "25",
            year: "2003",
            phone: "111 111 1111",
            email: "zineb.bamouh@gmail.com",
            address: "xxx st. abcdefgh",
            cardNumber: "0000 0000 0000",
            expire: "00/00",
            code: "000",
            cardType: "Visa"
        });

    let showEditForm = false;
    let showAddReview = false;
    function toggleEditForm() {
        showEditForm = !showEditForm;
    }
    function toggleAddEditForm() {
        showAddReview = !showAddReview;
    }
    //showDiv(part) function will just show the appropriate div and hide the rest
    function showDiv(part: string) {
        const profile = document.getElementById("Profile");
        const contact = document.getElementById("Contact");
        const payment = document.getElementById("Payment");
        const review = document.getElementById("Review");

        if (profile && contact && payment && review) {
            if (part === "Profile") {
                profile.style.display = "block";
                contact.style.display = "none";
                payment.style.display = "none";
                review.style.display = "none";
            } else if (part === "Contact") {
                contact.style.display = "block";
                profile.style.display = "none";
                payment.style.display = "none";
                review.style.display = "none";
            } else if (part === "Payment") {
                payment.style.display = "block";
                profile.style.display = "none";
                contact.style.display = "none";
                review.style.display = "none";
            } else if (part === "Review") {
                review.style.display = "block";
                profile.style.display = "none";
                contact.style.display = "none";
                payment.style.display = "none";
            }
        }
    }

    onMount(() => {
        const profileLink = document.getElementById("profileLink");
        const contactLink = document.getElementById("contactLink");
        const paymentLink = document.getElementById("paymentLink");
        const reviewLink = document.getElementById("reviewLink");

        profileLink?.addEventListener("click", function(event) {
            showDiv('Profile');
            event.preventDefault(); // Prevent the default action of the link
        });

        contactLink?.addEventListener("click", function(event) {
            showDiv('Contact');
            event.preventDefault();
        });

        paymentLink?.addEventListener("click", function (event) {
            showDiv('Payment');
            event.preventDefault();
        });

        reviewLink?.addEventListener("click", function (event) {
            showDiv('Review');
            event.preventDefault();
        });
    });

</script>

<main>
    <section class="container">
        <section class="child-option">
            <div class="sidebar">
                <header>Welcome, Zineb!</header>
                <ul>
                    <li>
                        <a href="account.html" id="profileLink">Profile</a>
                    </li>
                    <li>
                        <a href="account.html" id="contactLink">Contact</a>
                    </li>
                    <li>
                        <a href="account.html" id="paymentLink">Payment</a>
                    </li>
                    <li>
                        <a href="account.html" id="reviewLink">Review</a>
                    </li>
                    <li>
                        <a href="#">My Reservation</a>
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
                    <p>Zineb</p>
                </div>
                <br>
                <div class="info lname">
                    <b>Last Name:</b>
                    <br>
                    <p>Bamouh</p>
                </div>
                <br>
                <div class="info gender">
                    <b>Gender:</b>
                    <br>
                    <p>Female</p>
                </div>
                <br>
                <div class="info birth">
                    <b>Birthdate:</b>
                    <br>
                    <p>25/07/2003</p>
                </div>
                <br>
                <button on:click={toggleEditForm}>
                    <a href="">Edit</a>

                </button>
            </div>
            <div class="child" id="Contact" style="display: none;">
                <h1 style="font-size: 30px;">Contact Information</h1>
                <p>Ensure that this information are correct.</p>
                <br>
                <div class="info phone">
                    <b>Phone number:</b>
                    <br>
                    <p>111-111-1111</p>
                </div>
                <br>
                <div class="info email">
                    <b>Email:</b>
                    <br>
                    <p>zineb.bamouh@gmail.com</p>
                </div>
                <br>
                <div class="info address">
                    <b>Home Address:</b>
                    <br>
                    <p>xxx st. abcdefgh</p>
                </div>
                <br>

            </div>
            <div class="child" id="Payment" style="display: none;">
                <h1 style="font-size: 30px;">Payment Information</h1>
                <p>Save your card for later:</p>
                <br>
                <p style="font-weight: bold;">Your card</p>
                <br>
                <div class="user-card">
                    <div class="card">
                        <p id="card-number">0000 0000 0000 0000</p>
                        <br>
                        <div class="card-container">
                            <div class="child-card1">
                                <p id="card-expire">00/00</p>
                            </div>
                            <div class="child-card2">
                                <p id="card-code">000</p>
                            </div>
                        </div>
                        <br>
                        <p id="card-type">Visa</p>
                    </div>
                    <div class="card">
                        <p id="card-number1">0000 0000 0000 0000</p>
                        <br>
                        <div class="card-container">
                            <div class="child-card1">
                                <p id="card-expire1">00/00</p>
                            </div>
                            <div class="child-card2">
                                <p id="card-code1">000</p>
                            </div>
                        </div>
                        <br>
                        <p id="card-type1">Visa</p>
                    </div>

                </div>
                <br>


            </div>
            <div class="child" id="Review" style="display: none;">
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
            {#if showEditForm}
                <EditForm />
            {/if}

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