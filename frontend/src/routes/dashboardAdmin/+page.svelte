<script>
    import RecentUserWraper from "$lib/components/RecentUserWraper.svelte";
    import Title from "$lib/components/Title.svelte";
    import Fleet from "$lib/components/Fleet.svelte";
    import RecentUser from "$lib/components/RecentUser.svelte";
    import Users from "$lib/components/Users.svelte";
    import ManageUsersWrap from "$lib/components/ManageUsersWrap.svelte";

</script>

<main class="md:px-20">

<Title title="Admin Dashboard" title2="Manage Users"/>

    <RecentUserWraper>
        <RecentUser name="Amanda Smith" text="Mar 1 – Mar 8" bookingref="#0003" cartype="Sedan" href="/"/>
        <RecentUser name="Alex Wilson" text="Feb 22 – Feb 28" bookingref="#0002" cartype="Luxury" href="/"/>
        <RecentUser name="Anna Woods" text="Apr 15 – Apr 23" bookingref="#0001" cartype="SUV" href="/"/>
    </RecentUserWraper>
    
    <Fleet available="18" booked="10" href="/" />

    <ManageUsersWrap>
        <Users name="Amanda Smith" email="amanda@gmail.com" Id=001 phone="012 345 6789"/>
        <Users name="Amanda Smith" email="amanda@gmail.com" Id=001 phone="012 345 6789"/>
        <Users name="Amanda Smith" email="amanda@gmail.com" Id=001 phone="012 345 6789"/>
        <Users name="Amanda Smith" email="amanda@gmail.com" Id=001 phone="012 345 6789"/>
        <Users name="Amanda Smith" email="amanda@gmail.com" Id=001 phone="012 345 6789"/>
    </ManageUsersWrap>
</main>
