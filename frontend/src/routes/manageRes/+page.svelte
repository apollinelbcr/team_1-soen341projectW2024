<script lang="ts">
    import CarDetails from "$lib/components/carDetails.svelte";
    import {writable} from "svelte/store";

    const resDetails = writable({
        pickupDate: "2024-03-15",
        pickupTime: "16h30",
        pickupLoc: "Montreal,QC",
        dropoffDate: "2024-04-01",
        dropoffTime: "8h00",
        dropoffLoc: "Montreal,QC",
    });

    function openForm(): void {
        const formChange = document.getElementById("formChange") as HTMLElement;
        if (formChange) {
            formChange.style.display = "flex";
        }
    }

    function closeForm(): void {
        const formChange = document.getElementById("formChange") as HTMLElement;
        if (formChange) {
            formChange.style.display = "none";
        }
    }

    function saveInfoPickup(event: Event){
        event.preventDefault();

        const newDateInput = document.querySelector('input[name="pick-up_date"]:checked') as HTMLInputElement;
        const newDate = newDateInput ? newDateInput.value : null;

        resDetails.update(resdets => ({
            ...resdets,
            pickupDate: newDate as string
        })
        );
        const form = event.target as HTMLFormElement;
        form.reset();
        closeForm();

    }

    function openFormDD(): void {
        const formChangeDropDate = document.getElementById("formChangeDropDate") as HTMLElement;
        if (formChangeDropDate) {
            formChangeDropDate.style.display = "flex";
        }
    }

    function closeFormDD(): void {
        const formChangeDropDate = document.getElementById("formChangeDropDate") as HTMLElement;
        if (formChangeDropDate) {
            formChangeDropDate.style.display = "none";
        }
    }
    function saveInfoDropoff(event: Event){
        event.preventDefault();

        const newDateInput = document.querySelector('input[name="drop-off_date"]:checked') as HTMLInputElement;
        const newDate = newDateInput ? newDateInput.value : null;

        resDetails.update(resdets => ({
            ...resdets,
            dropoffDate: newDate as string
        })
        );
        const form = event.target as HTMLFormElement;
        form.reset();
        closeFormDD();

    }
</script>
<div class="fixed w-100% pt-4 px-16">
    <a href="">Logo here</a>
</div>



<div class="flex px-12 py-16">
    
    <div class=" fixed p-4 w-60 bg-gray-300 mr-2">
        <div class="pt-5 pb-5">
            <a href="">Dashboard</a>
        </div>
        <hr>
        <div class="pt-5 pb-5">
            <a href="/manage">My Account</a>
        </div>
        <hr>
        <div class="pt-5 pb-5">
            <a href="">Reviews</a>
        </div>
        <hr> 
        <div class="pt-5 pb-5">
            <a href="/">My Reservations</a>
        </div>
        <hr>
        <div class="pt-5 pb-5">
            <a href="">Settings</a>
        </div>
    </div>
    <div class="flex flex-col w-auto ml-64 flex-1">
        <table class="border-collapse">
            <tr>
                <td class=" border w-2/3 border-slate-300">
                        <CarDetails details={{
                            name:"Tesla",
                            type: "S",
                            category:"Category unknown",
                            capacity:"2",
                            transmission:"Manual",
                        }} src={"tesla2024s.png"}/>
                </td>
                
                <td class="border w-1/3 border-slate-300 mt-20">
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
                                <td class="flex justify-end ">
                                    <a class="underline text-blue-800" href="" on:click={openForm}>Change</a>
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
                                <td class="flex justify-end">
                                    <a class="underline text-blue-800" href="" on:click={openFormDD}>Change</a>
                                </td>
                            </tr>    
                        </table>
                        
                    </div>
                    
                </td>
            </tr>  
            <tr>
                <td colspan="2" class="border border-slate-300">
                    <div class="flex justify center p-5">
                        <div class="w-1/3 border-r-2">
                            <div class="font-bold text-base">Adds-on:</div>
                            Baby chair
                            <br>
                            Cushion
                        </div>
                        
                        <div class="w-1/3 border-r-2 pl-5 justify-center">
                            <br>
                            Umbrella
                            <br>
                            GPS
                        </div>
                        
                        <div class="w-1/3 pl-5">
                            <br>
                            Extra keys
                            <br>
                            <a class="underline text-blue-800" href="" >Add other</a>
            
                        </div>
                    </div>
                </td>
            </tr>
            
        </table>
        <br>
        <div class="items-center justify-between flex">
            <p class=" text-xs ">**You can cancel at any time your reservation without any charge.</p>
            <button on:click={()=>confirm("are you sure?")} class=" w-44 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded">Delete Reservation</button> 
        </div>

        
    </div>
</div>

<div id="formChange" class="hidden p-10 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 z-50">
    <form on:submit={saveInfoPickup}>
        <div class="font-bold text-lg text-center">Change Pick-up date</div>
        <br>
        <hr>
        <br>
        <div>
            These are the available dates you can choose from:
        </div>
        <br>
        <label>
            <input type="radio" name="pick-up_date" value="2024-03-06" required>
            2024-03-06
        </label>
        <br>
        <label>
            <input type="radio" name="pick-up_date" value="2024-03-21" required>
            2024-03-21
        </label>
        <br><br>
        <button id="cancelButton" on:click={closeForm} class="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded">Cancel</button>
        <button type="submit" class="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded">Submit</button>
    </form>
</div>

<div id="formChangeDropDate" class="hidden p-10 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 z-50">
    <form on:submit={saveInfoDropoff}>
        <div class="font-bold text-lg text-center">Change Drop-off date</div>
        <br>
        <hr>
        <br>
        <div>
            These are the available dates you can choose from:
        </div>
        <br>
        <label>
            <input type="radio" name="drop-off_date" value="2024-04-27" required>
            2024-04-27
        </label>
        <br>
        <label>
            <input type="radio" name="drop-off_date" value="2024-04-05" required>
            2024-04-05
        </label>
        <br><br>
        <button id="cancelButton" on:click={closeFormDD} class="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded">Cancel</button>
        <button type="submit" class="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded">Submit</button>
    </form>
</div>
