<script lang="ts">
   export let name: string;
    export let email: string;
    export let Id: string;
    export let phone: string;
</script>

<div class="my-4 p-4 pt-40 w-full h-screen rounded-3xl bg-white flex justify-center">

<div class="my-2 px-4 w-1/3 h-72 pt-2 rounded-3xl flex-column border border-orange-700">
    <h3 class="text-orange-700 text-3xl py-3 pl-2 ">Confirm Deletion of User {Id} </h3>
    <h2 class="text text-xl pl-2">Name: {name} </h2>
    <h2 class="text text-xl pt-3 pl-2">Email: {email}</h2>
    <h2 class="text text-xl pt-3 pl-2">Phone #: {phone}</h2>
    <div class="text text-xl justify-right pr-2 pt-6 h-6">
    <a href="/user/Id/delete/success" class="p-2 px-3 h-12 text-xl text-white bg-orange-700 rounded-2xl">Delete</a>
 </div>
 </div>
</div>