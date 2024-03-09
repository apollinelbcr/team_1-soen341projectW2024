<script lang="ts">
    import {writable} from "svelte/store";

    const resDetails = writable({
        pickupDate: "2024-03-15",
        pickupTime: "16h30",
        pickupLoc: "Montreal,QC",
        dropoffDate: "2024-04-01",
        dropoffTime: "8h00",
        dropoffLoc: "Montreal,QC",
        price: "115$"
    });
    const details= writable({
        name:"Nissan",
        type: "Rogue",
        category:"Category unknown",
        capacity:"2",
        transmission:"Automatic",
        src: "nissan rogue.png"
    });



</script>
<section class="flex justify-center items-center h-screen">

    <div class="  ">
        <div class=" bg-white ">
            <!-- Content -->
            <div class="flex justify-between items-center ">
                <!-- Image -->
                <div>
                    <img class="w-1/2 h-auto" src="{$details.src}" alt="car">
                </div>
                <div>
                    <h3 class="mb-2 text-2xl font-bold md:text-3xl">{$details.name} {$details.type}</h3>
                    <h4 class="mb-2 text-2xl md:text-4xl">{$details.category}</h4>
                    <p style="font-weight: 15px">Standard SUV</p>
                    <p style="font-weight: 15px">{$details.capacity}</p>
                    <p style="font-weight: 15px">{$details.transmission}</p>

                </div>


            </div>
            <br>
            <div class="flex justify-between items-center">
                <div>
                    <div class="font-bold text-base">Pick-up information:</div>
                    <div class="">
                        {$resDetails.pickupDate}
                        <br>
                        {$resDetails.pickupTime}
                        <br>
                        {$resDetails.pickupLoc}
                        <br>
                    </div>
                </div>
                <div>
                    <div class="font-bold">Drop-off information:</div>
                    <div class="">
                        {$resDetails.dropoffDate}
                        <br>
                        {$resDetails.dropoffTime}
                        <br>
                        {$resDetails.dropoffLoc}
                        <br>
                    </div>
                </div>
            </div>
            <br>


                <div class="flex justify-between items-center">
                    <div>
                        <form id="extra-form"  class="relative mb-4">
                            <div class="extra">
                                <p class="font-bold">Adds-on</p>
                                <input type="checkbox" id="baby-seat" name="extra[]" value="Baby Seat">
                                <label for="baby-seat">Baby Seat</label>
                                <br>
                                <input type="checkbox" id="cushion" name="extra[]" value="Cushion">
                                <label for="cushion">Cushion</label>
                                <br>
                                <input type="checkbox" id="GPS" name="extra[]" value="GPS">
                                <label for="GPS">GPS</label>
                                <br>
                                <input type="checkbox" id="umbrella" name="extra[]" value="Umbrella">
                                <label for="umbrella">Umbrella</label>
                                <br>
                                <input type="checkbox" id="key" name="extra[]" value="Extra Set of Key">
                                <label for="key">Extra Set of Key</label>
                                <br>
                                <input type="checkbox" id="windshield" name="extra[]" value="Windshield Washer">
                                <label for="windshield">Windshield Washer</label>
                                <br>
                                <input type="checkbox" id="jump-starter" name="extra[]" value="Jump Starter">
                                <label for="jump-starter">Jump Starter</label>
                            </div>
                        </form>
                    </div>
                    <div>
                        <div class="font-bold text-base">Price:</div>
                        <p>Base Price: {$resDetails.price}</p>
                        <div id="extras">
                            <p >Windshield Washer: 10$</p>
                            <p>Jump Starter: 20$</p>
                        </div>
                        <br>
                        <p>Updated Price: 145$</p>
                        <p>TPS (5%): 7.25$</p>
                        <p>TVQ (9.975%): 14.46$</p>
                        <p>Final Price: 166.71$</p>
                    </div>


                </div>
            <br>

            <div class="items-center">

                <button on:click={()=>confirm("Would you like to proceed with the booking")} class=" w-44 text-center py-2 bg-gray-300 hover:bg-gray-400 rounded ">Book Reservation</button>
            </div>
        </div>
        <br>


        <p class="text-sm">Prices may differ based on reservations and extras.</p>

        </div>


</section>
<style>
    * {
        scroll-behavior: smooth;
        list-style: none;
        text-decoration: none;

    }
    section {
        background-color: #F4F4F5;
        padding: 20px;
        border: 1px solid gray;
    }
    button {
        background: none;
        font-size: 15px;
        color: dodgerblue;
        font-weight: bold;
        width: 150px;
        height: 40px;
        border-radius: 20px;
        text-align: center;
    }
    button:hover {
        background: dodgerblue;
        opacity: 0.2;
        font-size: 15px;
        color: white;
        font-weight: bold;
        border-radius: 20px;
        border: 1px solid dodgerblue;
        width: 150px;
        height: 40px;
        text-align: center;
    }
</style>