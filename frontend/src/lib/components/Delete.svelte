<script lang="ts">
   export let name_user: string;
    export let user_email: string;
    export let id: string;
    export let user_phone: string;
</script>

<div class="my-4 p-4 pt-40 w-full h-screen rounded-3xl bg-white flex justify-center">

<div class="my-2 px-4 w-1/3 h-72 pt-2 rounded-3xl flex-column border border-orange-700">
    <h3 class="text-orange-700 text-3xl py-3 pl-2 ">Confirm Deletion of User {id} </h3>
    <h2 class="text text-xl pl-2">Name: {name_user} </h2>
    <h2 class="text text-xl pt-3 pl-2">Email: {user_email}</h2>
    <h2 class="text text-xl pt-3 pl-2">Phone #: {user_phone}</h2>
    <div class="text text-xl justify-right pr-2 pt-6 h-6">
    <a href="/user/id/delete/success" class="p-2 px-3 h-12 text-xl text-white bg-orange-700 rounded-2xl">Delete</a>
 </div>
 </div>
</div>