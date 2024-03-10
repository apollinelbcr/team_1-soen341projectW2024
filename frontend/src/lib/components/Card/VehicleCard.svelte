<script lang="ts">
    import {Gauge, PlaneTakeoff} from "lucide-svelte";

    export let price: number;
    export let type: string;
    export let category: string;
    export let transmission: string;
    export let src: string;
</script>
<div class="my-auto p-4">
    <div class="flex items-center justify-between border p-4 rounded-lg h-full relative">
        <div>
            <img {src} alt="Car preview" class="w-40">
        </div>
        <div>
            <h2 class="text-2xl font-bold">{type}</h2>
            <p class="text-sm">{category}</p>
            <p class="my-2 flex items-center gap-2 text-sm">
                <svg width="15" height="15" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 4c0 .7-.4 1.38-1 1.73V10h6V5.73c-.62-.36-1-1.03-1-1.73 0-1.08.92-2 2-2s2 .92 2 2c0 .7-.38 1.37-1 1.73V10h6V5.73c-.62-.36-1-1.03-1-1.73 0-1.08.92-2 2-2s2 .92 2 2c0 .7-.38 1.37-1 1.73V10c0 1.09-.91 2-2 2h-6v6.27c.62.36 1 1.03 1 1.73 0 1.08-.92 2-2 2s-2-.92-2-2c0-.7.38-1.37 1-1.73V12H5v6.27c.62.36 1 1.03 1 1.73 0 1.08-.92 2-2 2s-2-.92-2-2c0-.7.38-1.37 1-1.73V5.73C2.4 5.38 2 4.7 2 4c0-1.09.92-2 2-2 1.09 0 2 .92 2 2z"></path>
                </svg>
                {transmission}
            </p>
            <p class="my-2 flex items-center gap-2 text-sm">
                <Gauge class="inline size-4"/>
                Unlimited mileage
            </p>
            <p class="my-2 flex items-center gap-2 text-sm">
                <PlaneTakeoff class="inline size-4"/>
                Counter and car in terminal
            </p>
        </div>
        <div class="flex flex-col gap-14 items-end">
            <div class="flex flex-col items-end">
                <p class="text-xl font-bold">CA ${price}</p>
                <p class="text-xs">total</p>
            </div>
            <button class="bg-blue-500 text-white px-5 py-2 rounded-full w-24">Reserve</button>
        </div>
    </div>
</div>

