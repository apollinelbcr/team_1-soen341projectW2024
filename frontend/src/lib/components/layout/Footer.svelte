<script lang="ts">
    import NavLink from "$lib/components/layout/NavLink.svelte";

    let nav = [
        {
            href: "/faq",
            label: "FAQ",
        }, {
            href: "/search",
            label: "Explore",
        }, {
            href: "/support",
            label: "Support",
        }, {
            href: "/privacy",
            label: "Privacy",
        },
    ]
</script>
<div class="mt-3 mx-16">
    <div class="border-b-2 border-gray-300 flex justify-between">
        {#each nav as item}
            <NavLink {...item}/>
        {/each}
    </div>
    <p class="my-3 text-xs"> © {new Date().getFullYear()} Rentify, a SOEN 341 group project. All rights reserved.</p>
</div>