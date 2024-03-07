<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import {navigate} from "svelte-routing";


</script>
<main>
    <button  id="exit">x</button>
    <div class="form-edit">
        <div class="profile-form">
            <form id="profile-form">
                <p style="font-weight: bold; font-size: 20px;">Full name:</p>
                <br>
                <div class="user-name">
                    <label for="fname">First Name:</label>
                    <input type="text" id="fname" name="fname" value="Zineb">
                </div>
                <br>
                <br>
                <div class="user-name">
                    <label for="lname">Last Name:</label>
                    <input type="text" id="lname" name="lname" value="Bamouh">
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
                        <label for="phone">Phone:</label>
                        <input type="text" id="phone" name="phone" value="111 111 1111">
                    </div>
                    <br>
                    <p style="font-weight: bold; font-size: 20px;">Email:</p>
                    <br>
                    <div class="user-email">
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" value="zineb.bamouh@gmail.com">
                    </div>
                    <br>
                    <p style="font-weight: bold; font-size: 20px;">Home Address:</p>
                    <br>
                    <div class="user-address">
                        <label for="address">Home Address:</label>
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
                        <label for="number">Card Number:</label>
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
        align-items: center;
        justify-content: center;
    }
    /*Leave a space between two radio button option*/
    .profile-form input[type=radio] , .payment-form input[type=radio]{


    }
    #female , #visa{
        margin-left: 0;
    }
    #male , #mastercard{

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
        padding-top: 5px;
        padding-left: 10px;
    }
    .user-expire , .user-code {
        width: 150px;
    }
    #exit {
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
    #exit:hover {
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
        padding-top: 5px;
        padding-left: 10px;
    }
    .container-user-card {
        display: flex;
        gap: 25px;
        max-width: 500px;
        justify-content: space-between;
    }

</style>
