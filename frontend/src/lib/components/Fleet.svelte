<script lang="ts">

    export let available: string;
    export let booked: string;
    
    export let href: string;
</script>

<div class=" w-1/4 absolute top-42 right-28 h-52 space-y-4">

<a href={href} class=" w-full h-20 rounded-3xl bg-white justify-left flex flex-row ">
    <div class="text-xl p-2"></div>
    <div class="pl-4 pt-2">
        <h2 class="text-wrap text-2xl " > Available Vehicules: </h2>
    </div>

    <div class="text-xl p-2"></div>
    <div class="pl-2 pt-4 pb-2">
        <h2 class="text-wrap  text-5xl text-orange-700 " > {available} </h2>
    </div>

</a>    

<a href={href} class=" w-full h-20 rounded-3xl bg-white justify-left flex flex-row ">
    
    <div class="text-xl p-2"></div>
    <div class="pl-4 pt-2">
        <h2 class="text-wrap text-2xl " > Booked Vehicules: </h2>
    </div>

    <div class="text-xl p-2"></div>
    <div class="pl-6 pt-4 pb-2 ">
        <h2 class="text-wrap text-5xl text-orange-700 " > {booked} </h2>
    </div>

</a> 
</div> 