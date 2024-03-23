<script lang="ts">
    import { onMount } from 'svelte';
    
    const email = "user7@example.com";
    //at the moment it is hard coded, but i have to wait for the log in page to be linked
    
    
    let users: any[] = [];
     

     onMount(async () => {
        try {
            const response = await fetch('http://localhost:3002/users');
            users = await response.json();
            
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    });


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
            <div class="child" id="Contact">
                <h1 style="font-size: 30px;">Contact Information</h1>
                <p>Ensure that this information are correct.</p>
                <br>
                <div class="info phone">
                    <b>Phone number:</b>
                    <br>
                    <p>{userData.phone_number}</p>
                </div>
                <br>
                <div class="info email">
                    <b>Email:</b>
                    <br>
                    <p>{userData.email}</p>
                </div>
                <br>

            </div>

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


</style>