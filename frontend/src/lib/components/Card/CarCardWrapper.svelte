<script lang="ts">
    import Left from "$lib/components/Utils/Left.svelte";
    import Right from "$lib/components/Utils/Right.svelte";

    let scrollContainer: HTMLElement;

    function scroll(direction: 'left'|'right') {
        const scrollAmount = 400;
        if (direction === 'left') {
            scrollContainer.scrollBy({left: -scrollAmount, behavior: 'smooth'});
        } else if (direction === 'right') {
            scrollContainer.scrollBy({left: scrollAmount, behavior: 'smooth'});
        }
    }

</script>
<div class="my-3 p-4 w-full relative group">
    <h3 class="text-3xl p-4">Recent car searches in your area</h3>
    <button on:click={() => scroll('left')} class="absolute left-0 top-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <Left/>
    </button>
    <div bind:this={scrollContainer} class="mt-3 flex flex-row space-x-5 overflow-x-auto p-4 no-scrollbar">
        <slot/>
    </div>
    <button on:click={() => scroll('right')} class="absolute right-0 top-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <Right/>
    </button>
</div>