<script>
    import { writable } from 'svelte/store';
    // Create a writable store to hold the value of buttonname
    /**
	 * @type {any}
	 */
     export let buttonname;
  </script>

<a href="/admin/manage_vehicles/create-vehicle">
    <div class="max-w-sm mx-auto bg-blue-500 rounded overflow-hidden shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out">
      <div class="px-6 py-4">
        <div class="font-bold text-xl text-white mb-2">{buttonname}</div>
      </div>
      <div class="px-6 py-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" class="w-6 h-6 inline-block align-text-bottom">
          <path fill-rule="evenodd" d="M10 0a1 1 0 01.993.883L11 1v8h8a1 1 0 01.117 1.993L19 11h-8v8a1 1 0 01-1.993.117L9 19v-8H1a1 1 0 01-.117-1.993L1 9h8V1a1 1 0 011-1z" clip-rule="evenodd"></path>
        </svg>
      </div>
    </div>
  </a>