<script lang='ts'>
    import RecentSearch from "$lib/components/Search/RecentSearch.svelte";
    import RecentSearchItem from "$lib/components/Search/RecentSearchItem.svelte";
    import CarCard from "$lib/components/Card/CarCard.svelte";
    import CarCardWrapper from "$lib/components/Card/CarCardWrapper.svelte";
    import MainFilter from "$lib/components/MainSearchBar.svelte";
    import {writable} from 'svelte/store';
    import {onDestroy, onMount} from "svelte";
    import {browser} from "$app/environment";
    import {selectedBranch} from "$lib/stores";
    import {goto} from "$app/navigation";

    const recentSearches = writable([]);

    function updateRecentSearches() {
        const searches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
        recentSearches.set(searches);
    }


    onMount(() => {
        if (!$selectedBranch) {
            goto('/select-branch');
        }
        updateRecentSearches();
    });
    if (browser) window.addEventListener('storage', updateRecentSearches);

    onDestroy(() => {
        if (browser) window.removeEventListener('storage', updateRecentSearches);
    });

</script>

<MainFilter/>

{#if $recentSearches.length}
    <RecentSearch>
        {#each $recentSearches as {pickupLocation, dropOffLocation, pickupDate, dropOffDate}}
            <RecentSearchItem title={`Cars from ${pickupLocation} to ${dropOffLocation}`}
                              text={`${pickupDate} – ${dropOffDate}`} href="/"/>
        {/each}
    </RecentSearch>
{/if}

<CarCardWrapper>
    <CarCard type="Sedan" category="Electric" price={100} src="/images/tesla.png" href="/"/>
    <CarCard type="Sedan" category="Electric" price={100} src="/images/tesla.png" href="/"/>
    <CarCard type="Sedan" category="Electric" price={100} src="/images/tesla.png" href="/"/>
    <CarCard type="Sedan" category="Electric" price={100} src="/images/tesla.png" href="/"/>
    <CarCard type="Sedan" category="Electric" price={100} src="/images/tesla.png" href="/"/>
    <CarCard type="Sedan" category="Electric" price={100} src="/images/tesla.png" href="/"/>
</CarCardWrapper>

