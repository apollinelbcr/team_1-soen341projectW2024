<style>
    th {
        font-family: 'Open Sans', sans-serif;
        font-weight: bold;
    }
</style>
<script>
	// @ts-ignore
	/**
	 * @type {any}
	 */
	 export let title;
    import { onMount } from 'svelte';
    // @ts-ignore
    import CreateUser from '../CRUDBigButtons.svelte';
    
    // @ts-ignore
    /**
	 * @type {any[]}
	 */
    let users = [];
    /**
	 * @type {any[]}
	 */
    let filteredUsers = [];
    let filterStatus = '';

    onMount(async () => {
        try {
            const response = await fetch('http://localhost:3002/users');
            users = await response.json();
            
            //filteredUsers = users; // Initialize filteredUsers with all users
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    });

    //import { navigate } from 'svelte-routing';

    // @ts-ignore
    // function filterByStatus(status) {
    //     if (status == 'ACTIVE' || status == 'INACTIVE') {
    //         filterStatus = status;
    //         // @ts-ignore
    //         filteredUsers = users.filter(user => user.status === status);
    //     } else {
    //         filterStatus = '';
    //         // @ts-ignore
    //         filteredUsers = users;
    //     }
    // }
</script>

<div class="mb-5 text-2xl font-medium text-gray-700">{title}</div>

<CreateUser buttonname='Create User' link="/admin/manage_users/create-user"/>

<div class="container mt-10 rounded-lg">
    <div class="py-8">
            <div class="max-w-full overflow-x-auto rounded-lg">
                <table class="w-full leading-normal text-black">
                    <thead>
                        <tr class="border-t border-r border-l p-5 bg-gray-50">
                            <th
                                scope="col"
                                class="border-b border-gray-200 px-5 py-3 text-left text-sm font-normal uppercase"
                            >
                                First Name
                            </th>
                            <th
                                scope="col"
                                class="border-b border-gray-200 px-5 py-3 text-left text-sm font-normal uppercase"
                            >
                                Last Name
                            </th>
                            <th
                                scope="col"
                                class="border-b border-gray-200 px-5 py-3 text-left text-sm font-normal uppercase"
                            >
                                Email
                            </th>
                            <th
                                scope="col"
                                class="border-b border-gray-200 px-5 py-3 text-left text-sm font-normal uppercase"
                            >
                                Role
                            </th>
                            <th
                                scope="col"
                                class="border-b border-gray-200 px-5 py-3 text-left text-sm font-normal uppercase"
                            >Account Status</th>
                            <th
                                scope="col"
                                class="border-b border-gray-200 px-5 py-3 text-left text-sm font-normal uppercase"
                            >
                                Details
                            </th>
                        </tr>
                        
                    </thead>
                    <tbody class="text-black">
                        {#each users as user}
                        <tr class="border-t border-r border-l p-4">
                            <td class="border-b border-gray-200 p-5 text-sm">
                                    <p class="whitespace-nowrap">{user.first_name}</p>
                            </td>
                            <td class="border-b border-gray-200 p-5 text-sm">
                                    <p class="whitespace-nowrap">{user.last_name}</p>
                            </td>
                            <td class="border-b border-gray-200 p-5 text-sm">
                                <p class="whitespace-nowrap">{user.email}</p>
                            </td>
                            <td class="border-b border-gray-200 p-5 text-sm">
                                <p class="whitespace-nowrap">{user.role}</p>
                            </td>
                            <td class="border-b border-gray-200 p-5 text-sm">
                                <span class="relative inline-block rounded-full px-3 py-1 font-semibold leading-tight"
                                      class:bg-green-200={user.status === 'ACTIVE'}
                                      class:bg-red-500={user.status !== 'ACTIVE'}>
                                    <span aria-hidden="true"
                                          class="absolute inset-0 rounded-full opacity-50">
                                    </span>
                                    <span class="relative">{user.status}</span>
                                </span>
                            </td>
                            
                            <td class="border-b border-gray-200 p-5 px-9 text-sm">
                                <a href="/admin/manage_users/edit-user?id={user.id}" class="text-blue-600 hover:text-indigo-900 cursor-pointer">
                                    <svg class="w-6 h-6 text-gray-800 dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm9.4-5.5a1 1 0 1 0 0 2 1 1 0 1 0 0-2ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4c0-.6-.4-1-1-1h-2Z" clip-rule="evenodd"/>
                                    </svg>
                                </a>
                            </td>                                                     
                                                        
                        </tr>
                       
                        {/each} 
                        <tr class="bg-gray-50 border border-gray-200">
                            <td class="border-b p-5  text-md font-bold">
                                    <p class="whitespace-nowrap">Total number of users:</p>
                            </td>
                            <td class="border-b p-5 text-md">
                                <p class="whitespace-nowrap"></p>
                            </td>
                            <td class="border-b p-5 text-sm">
                            </td>
                            <td class="border-b p-5 text-sm">
                            </td>
                            <td class="border-b p-5 text-sm">
                            </td>
                            <td class="border-b p-5 px-10 text-md font-bold">
                                {users.length}
                            </td>                            
                        </tr>   
                    </tbody>
                </table>

                
            </div>
        </div>
</div>