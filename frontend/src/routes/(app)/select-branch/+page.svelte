<script>
    import { selectedBranch } from '$lib/stores';
    import {goto} from "$app/navigation";
    import {showAlert} from "$lib/utils";

    let branches = [
        {
            id: "3afbd7e7-7d09-4a75-b2e9-b5be5ded1c52",
            zip_code: "NA",
            airport_name: "YYZ",
            vehicle_id: "3c6af246-9179-4368-8584-60ce8ad301dd",
            branch_name: "Rentify YYZ",
            branch_address: "6301 Silver Dart Dr, Mississauga"
        },
        {
            id: "6cf900fa-d404-4006-8c8f-216562a53806",
            zip_code: "H4L2T7",
            airport_name: "NA",
            vehicle_id: "43f117a0-dfbe-4236-9df4-437992878abe",
            branch_name: "Rentify St-Laurent",
            branch_address: "123 chemin cote vertu"
        },
        {
            id: "6e19bf28-74bb-436e-8e86-001c1a0d4b31",
            zip_code: "H1L2N3",
            airport_name: "NA",
            vehicle_id: "08af632c-2c2d-4458-a316-25961faebd33",
            branch_name: "Rentify Ste-catherine",
            branch_address: "34 bd ste-catherine"
        },
        {
            id: "c601b4ed-f2f2-4fde-9a5a-138d4f20f2d2",
            zip_code: "H4L2T7",
            airport_name: "NA",
            vehicle_id: "69449df2-77d8-415a-85b3-3d9e03626925",
            branch_name: "Rentify St-Laurent",
            branch_address: "123 chemin cote vertu"
        },
        {
            id: "e055175c-13cf-4a5c-8489-8d169662f307",
            zip_code: "H2L2G2",
            airport_name: "NA",
            vehicle_id: "1a936659-682d-4575-a49a-b6077e1db845",
            branch_name: "Rentify St-Leonard",
            branch_address: "14 bd st-leonard"
        },
        {
            id: "f21c299d-02bc-445e-971e-ad6e71dc00ac",
            zip_code: "H4L2T7",
            airport_name: "NA",
            vehicle_id: "5dfdd605-b679-4713-93bf-d3505fe40629",
            branch_name: "Rentify St-Laurent",
            branch_address: "123 chemin cote vertu"
        },
        {
            id: "3a16b9a0-8ebc-4d18-b97e-4938b09ac384",
            zip_code: "NA",
            airport_name: "YUL",
            vehicle_id: "7befc065-2e0b-4066-89f6-536bcbea24b4",
            branch_name: "Rentify YUL",
            branch_address: "Bd Romeo Vachon Nord"
        },
        {
            id: "99558772-6360-4d31-92e4-9fe5fb3de150",
            zip_code: "NA",
            airport_name: "YUL",
            vehicle_id: "c1943bca-53c8-4c6c-ac63-661db7c20f96",
            branch_name: "Rentify YUL",
            branch_address: "Bd Romeo Vachon Nord"
        },
        {
            id: "ea50d1ca-bd16-4a39-b730-b49067989574",
            zip_code: "NA",
            airport_name: "YUL",
            vehicle_id: "7befc065-2e0b-4066-89f6-536bcbea24b4",
            branch_name: "Rentify YUL",
            branch_address: "Bd Romeo Vachon Nord"
        },
        {
            id: "7a16b9a0-8ebc-4d18-b97e-4938b09ac384",
            zip_code: "H3L2J8X",
            airport_name: "NA",
            vehicle_id: "d77e586f-e902-4fe6-adbb-0567353236fe",
            branch_name: "Rentify Beaubien",
            branch_address: "28 bd beaubien est"
        },
        {
            id: "0cf900fa-d404-4006-8c8f-216562a53806",
            zip_code: "NA",
            airport_name: "YUL",
            vehicle_id: "1b853b58-5184-4d0c-b0e5-33cb03f71a61",
            branch_name: "Rentify YUL",
            branch_address: "Bd Romeo Vachon Nord"
        },
        {
            id: "66558772-6360-4d31-92e4-9fe5fb3de150",
            zip_code: "NA",
            airport_name: "YUL",
            vehicle_id: "3c6af246-9179-4368-8584-60ce8ad301dd",
            branch_name: "Rentify YUL",
            branch_address: "Bd Romeo Vachon Nord"
        },
        {
            id: "5e19bf28-74bb-436e-8e86-001c1a0d4b51",
            zip_code: "H3L2N5",
            airport_name: "NA",
            vehicle_id: "4f019cba-7514-48a0-8333-febae943145e",
            branch_name: "Rentify Ahuntsic",
            branch_address: "10200 bd lajeunesse"
        },
        {
            id: "33558772-2356-4d31-92e4-9fe5fb3de150",
            zip_code: "H3L2N5",
            airport_name: "NA",
            vehicle_id: "c1943bca-53c8-4c6c-ac63-661db7c20f96",
            branch_name: "Rentify Ahuntsic",
            branch_address: "10200 bd lajeunesse"
        },
        {
            id: "2cf900fa-d836-4006-8c8f-216562a53806",
            zip_code: "H3L2J8X",
            airport_name: "NA",
            vehicle_id: "7befc065-2e0b-4066-89f6-536bcbea24b4",
            branch_name: "Rentify Beaubien",
            branch_address: "28 bd beaubien est"
        },
    ];

    let selectedBranchId = null;

    function handleBranchSelection(branchId) {
        selectedBranchId = branchId;
        selectedBranch.set(branches.find(branch => branch.id === branchId));
        console.log('Selected branch:', $selectedBranch)
    }

    function proceed() {
        if (selectedBranchId) {
            goto('/'); // Navigate to the car selection page
        } else {
            showAlert('Oups!', 'Please select a branch first.', 'danger', 'I understand');
        }
    }
</script>

<div class="max-w-4xl mx-auto p-6 h-[calc(100vh-19vh)] overflow-y-auto">
    <h2 class="text-2xl font-bold mb-4">Select a Branch</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {#each branches as branch}
            <div class="border p-4 rounded-lg cursor-pointer hover:bg-blue-100"
                 class:selected="{branch.id === selectedBranchId ? 'bg-blue-200' : ''}"
                 on:click={() => handleBranchSelection(branch.id)}>
                <h3 class="text-lg font-semibold">{branch.branch_name}</h3>
                <p>{branch.branch_address}</p>
            </div>
        {/each}
    </div>
    <a href="/" on:click|preventDefault={proceed} class="block w-fit mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Proceed
    </a>
</div>

<style>
    .selected {
        background-color: #bfdbfe; /* Lighter blue to indicate selection */
    }
</style>
