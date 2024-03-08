<script lang="ts">
    export let price: number;
    export let type: string;
    export let category: string;
    export let src: string;
    export let href: string;
</script>
<a href={href} class="border border-gray-300 rounded-3xl w-1/2 md:w-1/3 lg:w-1/4 shrink-0 p-2 hover:scale-110 transition ease-in-out duration-700">
    <img src={src} alt="Rental car" class="rounded-t-3xl"/>
    <hr/>
    <div class="my-4">
        <p>Price: CAD ${price}/day</p>
        <p>Type: {type}</p>
        <p>Category: {category}</p>
    </div>
</a>