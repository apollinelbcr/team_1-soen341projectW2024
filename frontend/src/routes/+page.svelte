
<script>
    import RecentUserWraper from "../lib/components/RecentUserWraper.svelte";
    import RecentUser from "../lib/components/RecentUser.svelte";
    import Title from "../lib/components/Title.svelte";
    import Fleet from "../lib/components/Fleet.svelte";
</script>

<main class="md:px-20">
<Title>
    <RecentUserWraper>
        <RecentUser name="Amanda Smith" text="Mar 1 – Mar 8" bookingref="#0003" cartype="Sedan" href="/"/>
        <RecentUser name="Alex Wilson" text="Feb 22 – Feb 28" bookingref="#0002" cartype="Luxury" href="/"/>
        <RecentUser name="Anna Woods" text="Apr 15 – Apr 23" bookingref="#0001" cartype="SUV" href="/"/>
    
    </RecentUserWraper>
    
    <Fleet available="18" booked="10" href="/" />
    

</Title>
</main>
