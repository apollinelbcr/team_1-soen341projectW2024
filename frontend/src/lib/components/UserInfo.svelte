<script lang="ts">

    export let name: string;
    export let email: string;
    export let Id: string;
    export let phone: string;
   
</script>

<a href="/user/Id/delete" class="  absolute right-28 bottom-4 text-xl rounded-3xl bg-orange-700 w-48 h-12 p-2 pl-3 text-white text-bold ">Delete my account</a>
<a href="/user/Id/edit" class="  absolute right-28 bottom-80 text-xl rounded-3xl bg-orange-700 w-48 h-12 p-2 pl-6 text-white text-bold ">Modify my Info</a>

<div class="absolute top-48 right-28 w-1/4 h-1/4 bg-white ">

    <h3 class="text-3xl pl-2 pr-4 pb-3 ">My Info</h3>
    <div class="flex-column p-2 pt-4 border border-grey-200 text-lg rounded-3xl space-y-2 overflow-x-auto no-scrollbar">
    <a href="/user/Id" class="space-x-2  justify-left items-center ">
    <h2 class="text-wrap text-orange-700 pl-2">Id: {Id} </h2>
    <h2 class="text-wrap "> {name} </h2>
    <h2 class=" text-wrap text-md "> {email} </h2>
    <h2 class=" text-wrap text-md"> {phone} </h2>    
    

</a> 
    </div>

</div>

