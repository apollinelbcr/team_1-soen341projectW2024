<script lang="ts">

    export let name_user: string;
    export let user_email: string;
    export let id: string;
    export let user_phone: string;
   
</script>

<a href="/user/id" class="space-x-2 flex flex-row justify-left items-center ">
    
    <h2 class="text-wrap text-orange-700 font-bold pl-2">{id} </h2>
    <h2 class="text-wrap font-bold"> {name_user} </h2>
    <h2 class=" text-wrap text-md "> {user_email} </h2>
    <h2 class=" text-wrap text-md"> {user_phone} </h2>    
    <a href="/user/id/edit" class="p-2 px-4 h-12 text-lg text-orange-700 justify-right ">Edit Info</a>
    <a href="/user/id/reservation" class="p-2 h-12 text-lg text-orange-700  justify-right">View Bookings</a>
    <a href="/user/id/delete" class="p-2  h-12 text-lg text-orange-700  justify-right">Delete User</a>

</a>