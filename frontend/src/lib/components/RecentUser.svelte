<script lang="ts">

    export let name: string;
    export let text: string;
    export let bookingref: string;
    export let cartype: string
    export let href: string;
</script>

<a href={href} class="w-full md:w-full lg:w-full shrink-0 p-2 flex flex-row justify-left items-center border border-grey-800 rounded-3xl">
    <div class="text-xl p-2"></div>
    <div class="p-2">
        <h2 class="text-wrap font-bold"> {name}  </h2>
        <p class="mt-2 text-wrap text-md"> {text}</p>
    </div>
    <div class="text-xl p-2"></div>
    <div class="p-2">
        <h2 class="text-wrap text-orange-700 font-bold "> Ref {bookingref} </h2>
        <p class="mt-2 text-wrap text-md">{cartype} </p>
    </div>

</a>