<script lang="ts">

    export let name_user: string;
    export let user_email: string;
    export let id: string;
    export let user_phone: string;
   
</script>

<a href="/user/id/delete" class="  absolute right-28 bottom-4 text-xl rounded-3xl bg-orange-700 w-48 h-12 p-2 pl-3 text-white text-bold ">Delete my account</a>
<a href="/user/id/edit" class="  absolute right-28 bottom-80 text-xl rounded-3xl bg-orange-700 w-48 h-12 p-2 pl-6 text-white text-bold ">Modify my Info</a>

<div class="absolute top-48 right-28 w-1/4 h-1/4 bg-white ">

    <h3 class="text-3xl pl-2 pr-4 pb-3 ">My Info</h3>
    <div class="flex-column p-2 pt-4 border border-grey-200 text-lg rounded-3xl space-y-2 overflow-x-auto no-scrollbar">
    <a href="/user/id" class="space-x-2  justify-left items-center ">
    <h2 class="text-wrap text-orange-700 pl-2">id: {id} </h2>
    <h2 class="text-wrap "> {name_user} </h2>
    <h2 class=" text-wrap text-md "> {user_email} </h2>
    <h2 class=" text-wrap text-md"> {user_phone} </h2>    
    

</a> 
    </div>

</div>

