<!-- Modal.svelte -->
<script lang="ts">
    export let isOpen = false;

    // Function to stop propagation of click events
    function stopPropagation(event: MouseEvent) {
        event.stopPropagation();
    }
</script>

{#if isOpen}
    <div class="overlay" on:click={() => (isOpen = false)}/>
    <slot/>
{/if}

<style>
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 5; /* Ensure overlay is above other content */
    }
</style>
