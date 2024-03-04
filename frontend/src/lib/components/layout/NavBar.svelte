<script lang="ts">
    import NavLink from "$lib/components/layout/NavLink.svelte";

    let nav = [
        {
            href: "/search",
            label: "Browse",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`
        }, {
            href: "/support",
            label: "Support",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle-question"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>`
        }, {
            href: "/signin",
            label: "Sign in",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-user-round"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/></svg>`
        },
    ]
</script>

<nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">

        <!-- Logo -->
        <a href="/" class="flex-shrink-0 flex flex-row items-center">
            <!--img class="h-8 w-8" src="/logo.svg" alt="Logo"-->
            Rentify
        </a>

        <!-- Navigation Links -->
        <div class="md:block">
            <div class="ml-10 flex items-baseline space-x-4">
                {#each nav as item}
                    <NavLink {...item}/>
                {/each}
            </div>
        </div>

    </div>
</nav>