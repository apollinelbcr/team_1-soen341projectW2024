<script lang="ts">

    export let name: string;
    export let email: string;
    export let Id: string;
    export let phone: string;
   
</script>

<a href="/user/Id" class="space-x-2 w-full md:w-full lg:w-full flex flex-row justify-left items-center ">
    
    <h2 class="text-wrap text-orange-700 font-bold pl-2">{Id} </h2>
    <h2 class="text-wrap font-bold"> {name} </h2>
    <h2 class=" text-wrap text-md "> {email} </h2>
    <h2 class=" text-wrap text-md"> {phone} </h2>    
    <a href="/user/Id/edit" class="p-2 px-4 h-12 text-lg text-orange-700 justify-right ">Edit Info</a>
    <a href="/user/Id/reservation" class="p-2 h-12 text-lg text-orange-700  justify-right">View Bookings</a>
    <a href="/user/Id/delete" class="p-2  h-12 text-lg text-orange-700  justify-right">Delete User</a>

</a>