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
<main>
    <section class="flex justify-center items-center">
        <div class="container12">
            <div class="container">
                <div class="child1">
                    <div class="container-child1">
                        <h3 class="mb-2 text-2xl font-bold md:text-3xl">{$details.name} {$details.type}</h3>
                        <h4 class="mb-2 text-2xl md:text-4xl">{$details.category}</h4>
                        <img class=" h-auto" src="{$details.src}" alt="car">
                    </div>

                </div>
                <div class="child2">
                    <div class="container1">
                        <div class="c1-child1">
                            <h4 class="mb-4 text-2xl md:text-4xl">Car Information</h4>
                            <ul class="list-circle">
                                <li class="mb-2">Standard SUV</li>
                                <li class="mb-2">{$details.capacity} Seats</li>
                                <li class="mb-2">{$details.transmission}</li>
                            </ul>
                        </div>
                        <div class="c1-child2">
                            <div class="nested-container">
                                <div class="nc-child1">
                                    <div class="font-bold text-base">Pick-up information:</div>
                                        {$resDetails.pickupDate}
                                        <br>
                                        {$resDetails.pickupTime}
                                        <br>
                                        {$resDetails.pickupLoc}
                                        <br>
                                </div>
                                <div class="nc-child2">
                                    <div class="font-bold">Drop-off information:</div>

                                        {$resDetails.dropoffDate}
                                        <br>
                                        {$resDetails.dropoffTime}
                                        <br>
                                        {$resDetails.dropoffLoc}
                                        <br>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="container">
                <div class="bottom-c1-child1">
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
                            <br>
                            <br>
                            <input type="submit" value="Add">
                        </div>
                    </form>
                </div>
                <div class="bottom-c1-child2">
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
                    <br>
                    <input type="submit" value="Book">
                </div>
            </div>
        </div>
    </section>
</main>
<style>
    * {
        list-style: none;
        text-decoration: none;
        scroll-behavior: smooth;
        margin: 0;
        padding: 0;
    }
    section {
        background-color: #F4F4F5;
        padding: 20px;
        border: 1px solid gray;
    }
    .container12 {
        display: flex;
        flex-flow: column;
        gap: 20px;
    }
    .container {

        background-color: #F4F4F5;
        border-radius: 8px;
        display: flex;
        gap:20px;

    }
    .child1 {
        padding: 15px;
        display: flex;
        width: 300px;
        background: white;
        border-radius: 8px;
    }
    .container1 {
        display: flex;
        flex-flow: column;
        gap: 20px;
    }
    .container-child1 {
        max-width: 300px;
    }

    .c1-child1 , .c1-child2 {
        padding: 15px;
        width: 400px;
        background: white;
        border-radius: 8px;
    }
    .bottom-c1-child1 , .bottom-c1-child2 {
        padding: 15px;
        width: 350px;
        background: white;
        border-radius: 8px;
    }
    .nested-container {
        display: flex;
        justify-content: space-between;
    }
    input[type=submit] {
        font-size: 15px;
        color: dodgerblue;
        font-weight: bold;
        width: 60px;
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
        border-radius: 20px;
        border: 1px solid dodgerblue;
        width: 60px;
        height: 30px;
        text-align: center;
    }

</style>