<script lang="ts">
    export let Pickloc: string;
    export let Droploc: string;
    export let date: string;
    export let bookingref: string;
    export let cartype: string
</script>


<a href="/bookingref" class="space-x-4 p-2 flex flex-row justify-left items-center border border-grey-800 rounded-3xl ">
        <h2 class="text-wrap text-orange-700 font-bold "> Ref {bookingref} </h2>
        <h2 class="text-wrap text-md"> {date}</h2>
        <h2 class="text-wrap text-md">{cartype} </h2>
        <h2 class="text-wrap text-md">Pick Up: {Pickloc} </h2>
        <h2 class="text-wrap text-md">Drop Off: {Droploc} </h2>
</a>




