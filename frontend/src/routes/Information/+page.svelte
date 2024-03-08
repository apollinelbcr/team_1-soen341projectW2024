<script lang="ts">
    import CarDetails from "$lib/components/InformationPage/carInfo.svelte";
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

</script>
<div class="px-12 py-16">


<div class="flex flex-col w-auto flex-1 " >
    <table  class="<border-collapse >">
        <tr class="radius">
            <td  class=" border w-2/3 border-slate-200 ">
                <CarDetails details={{
                            name:"Nissan",
                            type: "Rogue",
                            category:"Category unknown",
                            capacity:"2",
                            transmission:"Automatic",
                        }} src={"nissan rogue.png"}/>
            </td>

            <td class="border w-1/3 border-slate-200 mt-20">
                <div  class="w-full align-top p-5">
                    <table class="w-full">
                        <tr>
                            <td>
                                <div class="font-bold text-base">Pick-up information:</div>
                                <div class="text-sm">
                                    {$resDetails.pickupDate}
                                    <br>
                                    {$resDetails.pickupTime}
                                    <br>
                                    {$resDetails.pickupLoc}
                                    <br>
                                </div>
                            </td>

                        </tr>
                        <tr>
                            <td>
                                <div class="font-bold text-base">Drop-off information:</div>
                                <div class="text-sm">
                                    {$resDetails.dropoffDate}
                                    <br>
                                    {$resDetails.dropoffTime}
                                    <br>
                                    {$resDetails.dropoffLoc}
                                    <br>
                                </div>
                            </td>

                        </tr>
                    </table>

                </div>

            </td>
        </tr>
        <tr>
            <td colspan="2" class="border border-slate-200">
                <div class="flex justify-between p-5">
                    <div class="">
                        <div class="font-bold text-base">Adds-on:</div>
                        <form id="extra">
                            <div class="extra">
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



                    <div class="pl-5" >
                        <div class="font-bold text-base">Price:</div>
                        <p>Base Price: {$resDetails.price}</p>
                        <div id="extras">
                            <p class="ml-3 text-gray-500">Windshield Washer: 10$</p>
                            <p class="ml-3 text-gray-500">Jump Starter: 20$</p>

                        </div>
                        <p>Updated Price: 145$</p>
                        <p class="ml-3 text-gray-500">TPS (5%): 7.25$</p>
                        <p class="ml-3 text-gray-500">TVQ (9.975%): 14.46$</p>
                        <p>Final Price: 166.71$</p>



                    </div>
                    <div class="items-center">

                        <button on:click={()=>confirm("Would you like to proceed with the booking")} class=" w-44 text-center py-2 bg-gray-300 hover:bg-gray-400 rounded ">Book Reservation</button>
                    </div>


                </div>

            </td>
        </tr>

    </table>
    <br>
    <p class=" text-xs ">**Prices may differ based on reservations and extras.</p>



</div>


</div>

<style>
    * {
        scroll-behavior: smooth;
        text-align: justify;
        list-style: none;
        text-decoration: none;
    }

</style>