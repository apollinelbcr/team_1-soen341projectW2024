<script>
    import RecentUserWraper from "$lib/components/RecentUserWraper.svelte";
    import Title from "$lib/components/Title.svelte";
    import MyBookings from "$lib/components/MyBookings.svelte";
    import BookWrep from "$lib/components/BookWrep.svelte";
    
    import UserInfo from "$lib/components/UserInfo.svelte";

</script>
<main class="md:px-20">

<Title title="User Dashboard" title2="My Bookings"/>
<BookWrep>
    <MyBookings date="Mar 1 – Mar 8" bookingref="#0003" cartype="Sedan" Pickloc="21 Main st" Droploc="13 Smith ave"/>
    <MyBookings date="Feb 22 – Feb 28" bookingref="#0002" cartype="Luxury" Pickloc="21 Main st" Droploc="13 Smith ave" />
    <MyBookings date="Apr 15 – Apr 23" bookingref="#0001" cartype="SUV" Pickloc="21 Main st" Droploc="13 Smith ave" />
</BookWrep>
<UserInfo name_user="Amanda Smith" user_email="amanda@gmail.com" id=001 user_phone="012 345 6789"/>

</main>