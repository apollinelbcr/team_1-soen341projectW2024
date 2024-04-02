<script lang="ts">
    import NavLink from "$lib/components/layout/NavLink.svelte";
    import {page} from "$app/stores";
    import {onMount} from "svelte";
    let dropdownOpen = false;
    const user = $page.data.user;

    function signOut() {
        document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        window.location.reload();
    }

    // Clicking outside the dropdown closes it
    onMount(() => {
        const handleClickOutside = (event) => {
            if (dropdownOpen && !event.target.closest('.dropdown')) {
                dropdownOpen = false;
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });

    const toggleDropdown = () => {
        dropdownOpen = !dropdownOpen;
    };
    let nav = [
        {
            href: "/search",
            label: "Browse",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`
        }, {
            href: "/support",
            label: "Support",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle-question"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>`
        }
    ]

    if(!user) {
        nav.push({
            href: "/login",
            label: "Sign in",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-user-round"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/></svg>`
        })
    }
</script>

<nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">

        <!-- Logo -->
        <a href="/" class="flex-shrink-0 flex flex-row items-center">
            <img class="h-24 w-24" src="/logo_pictures/rentify_lg.png" alt="Logo"/>
        </a>

        <!-- Navigation Links -->
        <div class="md:block">
            <div class="ml-10 flex space-x-4">
                {#each nav as item}
                    <NavLink {...item}/>
                {/each}
                <div class="relative dropdown" class:hidden={!user}>
                    <button on:click|stopPropagation={toggleDropdown} class="flex items-center space-x-2">
                        <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">{user?.username.at(0).toUpperCase()}</div>
                    </button>

                    {#if dropdownOpen}
                        <div class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                            <div class="block px-4 py-2 text-sm text-gray-700">
                                Hi, {user?.username}
                                <div class="mt-2 px-4 py-2 bg-blue-500 text-white text-center rounded-md cursor-pointer">
                                    Blue Member
                                </div>
                            </div>
                            <hr>
                            <a href={`/accountUser?id=${user.sub}`} class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Account</a>
                            <hr>
                            <a href="javascript:void(0);" on:click={signOut} class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
                        </div>
                    {/if}
                </div>
            </div>
        </div>

    </div>
</nav>