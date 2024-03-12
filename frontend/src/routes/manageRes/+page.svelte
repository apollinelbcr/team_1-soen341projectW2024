<script lang="ts">
    import CarDetails from "$lib/components/carDetails.svelte";
    import {writable} from "svelte/store";

    let resDetails = writable([
        {
            id: "101",
            id_vehicle: "vehi1234",
            id_user: "user007",
            pickupDate: "2024-03-15",
            pickupTime: "7:30 AM",
            pickupLoc: "Montreal, QC",
            dropoffDate: "2024-04-01",
            dropoffTime: "8:00 AM",
            dropoffLoc: "Montreal, QC",
            price: "$210",
            extra_things:[],
        },

        {
            id: "107",
            id_vehicle: "vehi1234",
            id_user: "user882",
            pickupDate: "2024-02-01",
            pickupTime: "7:30 AM",
            pickupLoc: "Montreal, QC",
            dropoffDate: "2024-02-28",
            dropoffTime: "8:00 AM",
            dropoffLoc: "Montreal, QC",
            price: "$210",
            extra_things: ["baby seat", "Extra keys", "Windshield washer", "Jump Starter"],
        },

        {
            id: "121",
            id_vehicle: "vehi87438",
            id_user: "user007",
            pickupDate: "2024-06-03",
            pickupTime: "7:30 AM",
            pickupLoc: "Montreal, QC",
            dropoffDate: "2024-06-13",
            dropoffTime: "8:00 AM",
            dropoffLoc: "Montreal, QC",
            price: "$210",
            extra_things : ["Cushion", "Extra keys","Jump Starter"],
        }
    ]);

    let carDatas = writable([
        {
            id: "vehi1234",
            name: "Nissan",
            type: "Rogue",
            category: "category unknown",
            capacity: "5",
            transmission: "automatic",
            src:"2023-Nissan-Rogue.png"
        },
        {
            id: "vehi87438",
            name: "Tesla",
            type: "S",
            category: "category unknown",
            capacity: "2",
            transmission: "automatic",
            src:"tesla2024s.png"
        },
    ]);

    let userDatas = writable([
        {
            id: "user007",
            name: "Asma",
            email: "asmaaimade@gmail.com",
            password: "abc123",
            role: "client",
            driver_license: "YYYY 9876 5432",
        },
        {
            id: "user882",
            name: "Zineb",
            email: "zinebbamouh@gmail.com",
            password: "abc123",
            role: "client",
            driver_license: "XXXX 1234 5678",
        },
    ]);

    const uid = "user007";

    const extras = ["baby seat", "Cushion", "GPS", "Roof boxes", "Extra keys", "Windshield washer", "Jump Starter"];

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

    function openFormAddOn(resDetail:any){
        const formChangeAddOn = document.getElementById("formChangeAddOn") as HTMLElement;
        if (formChangeAddOn) {
            console.log("id" + resDetail.id);
            formChangeAddOn.style.display = "flex";
        }
    }

    function closeFormAddOn(): void {
        const formChangeAddOn = document.getElementById("formChangeAddOn") as HTMLElement;
        if (formChangeAddOn) {
            formChangeAddOn.style.display = "none";
        }
    }
    function saveInfoAddOn(resDetail:any, event: Event){

        event.preventDefault();

        const newAddOnInput = document.querySelector('input[name="drop-off_date"]:checked') as HTMLInputElement;
        const newAddOn = newAddOnInput ? newAddOnInput.value : null;
        resDetails.update(resdets => 
        
            resdets.map(resdet => 
            resdet.id == resDetail.id ? {... resdet, extra_things: [...resdet.extra_things, newAddOn as string]}: resdet)
        );
        const form = event.target as HTMLFormElement;
        form.reset();
        closeFormAddOn();

    }
    
    function deleteRes(id_res: any){
        if (confirm("are you sure?")){
            resDetails.update(resdets => 
                resdets.filter(resdet => resdet.id !==id_res));

        }
    }
</script>
<div class="fixed w-100% pt-4 px-16">
    <a href="">Logo here</a>
</div>


{#each $userDatas.filter((userData) => userData.id == uid) as userData}
<div class="flex w-[95%] m-auto">
    
    <div class=" min-w-[300px]">
            <div class="w-[250px] p-[15px] bg-[#f5f5f5] mt-[50px] rounded-lg">
                <header class="text-xl text-[#2f373d] text-center leading-[70px]">Welcome, {userData.name}!</header>
                <ul>
                    <li>
                        <a class="block w-full h-full leading-[65px] text-xl pl-10 box-border no-underline transition-[.4s] text-[#2f373d] hover:pl-[50px]" href="account.html" id="profileLink">Profile</a>
                    </li>
                    <li>
                        <a class="block w-full h-full leading-[65px] text-xl pl-10 box-border no-underline transition-[.4s] text-[#2f373d] hover:pl-[50px]" href="account.html" id="contactLink">Contact</a>
                    </li>
                    <li>
                        <a class="block w-full h-full leading-[65px] text-xl pl-10 box-border no-underline transition-[.4s] text-[#2f373d] hover:pl-[50px]" href="account.html" id="paymentLink">Payment</a>
                    </li>
                    <li>
                        <a class="block w-full h-full leading-[65px] text-xl pl-10 box-border no-underline transition-[.4s] text-[#2f373d] hover:pl-[50px]" href="account.html" id="reviewLink">Review</a>
                    </li>
                    <li>
                        <a class="block w-full h-full leading-[65px] text-xl pl-10 box-border no-underline transition-[.4s] text-[#2f373d] hover:pl-[50px]" href="/manageRes">My Reservation</a>
                    </li>
                </ul>
            </div>
        
    </div>
    <div class=" mt-[50px] rounded-lg">
        {#each $resDetails as resDetail (resDetail.id)}
        {#if resDetail.id_user == uid}
        <table class="border-collapse">
            <tr>
                {#each $carDatas.filter((carData) => carData.id == resDetail.id_vehicle) as carData}
                <td class=" border w-2/3 border-slate-300">
                        <CarDetails details = {carData}/>
                </td>
                {/each}
                <td class="border w-1/3 border-slate-300 mt-20">
                    <div  class="w-full align-top p-5">
                        
                        <table class="w-full">
                            <tr>
                                <td>
                                    <div class="font-bold text-base">Pick-up information:</div>
                                    <div class="text-sm">
                                        {resDetail.pickupDate}
                                        <br>
                                        {resDetail.pickupTime}
                                        <br>
                                        {resDetail.pickupLoc}
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
                                        {resDetail.dropoffDate}
                                        <br>
                                        {resDetail.dropoffTime}
                                        <br>
                                        {resDetail.dropoffLoc}
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
                            {#each resDetail.extra_things as extra_thing, i}
                            {extra_thing}
                            <br>
                            {:else}
                            No adds-ons
                            {/each}
                        </div>
                        
                        <div class="w-1/3 border-r-2 pl-5 justify-center ">
                            <br>
                            <a class="underline text-blue-800 align-middle" href="" on:click={()=>openFormAddOn(resDetail)}>Add other</a>

                        </div>
                        
                        <div class="w-1/3 pl-5">
                            <br>
                            Extra keys
                            <br>
                            djnjdkn
                            <br>
            
                        </div>
                    </div>
                </td>
            </tr>
            
        </table>
        <br>
        <div class="items-center justify-between flex">
            <p class=" text-xs ">**You can cancel at any time your reservation without any charge.</p>
            <button on:click={()=>deleteRes(resDetail.id)} class=" w-44 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded">Delete Reservation</button> 
        </div>
        <br><br>
        <div id="formChangeAddOn" class="hidden p-10 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 z-50">
            <form on:submit={(event) => saveInfoAddOn(resDetail, event)}>
                <div class="font-bold text-lg text-center">Add new adds-on:</div>
                <br>
                <hr>
                <br>
                <div>
                    These are the available adds-on left that you can choose from:
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
                <button id="cancelButton" on:click={closeFormAddOn} class="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded">Cancel</button>
                <button type="submit" class="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded">Submit</button>
            </form>
            </div>
        {/if}
        {/each}
        
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
{/each}
