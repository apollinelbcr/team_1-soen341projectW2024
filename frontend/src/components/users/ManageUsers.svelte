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
    let filteredVehicles = [];
    let filterStatus = '';

    onMount(async () => {
        try {
            const response = await fetch('http://localhost:3002/users');
            users = await response.json();
            
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    });

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
                                Email
                            </th>
                            <th
                                scope="col"
                                class="border-b border-gray-200 px-5 py-3 text-left text-sm font-normal uppercase"
                            >
                                Phone Number
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
                            >Details</th>
                        </tr>
                    </thead>
                    <tbody class="text-black">
                       
                        <tr class="bg-gray-50">
                            <td class="border-b p-5 text-sm font-bold">
                                    <p class="whitespace-nowrap">Total number of users</p>
                            </td>
                            <td class="border-b p-5 text-sm">
                                <p class="whitespace-nowrap"></p>
                            </td>
                            <td class="border-b p-5 text-sm">
                                
                            </td>
                            
                            <td class="border-b p-5 text-sm font-bold">
                               
                            </td>                            
                        </tr>   
                    </tbody>
                </table>

                
            </div>
        </div>
</div>