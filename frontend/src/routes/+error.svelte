<script>
    import "../app.css";
    import {page} from "$app/stores";
    import {Bug, MapPinned} from "lucide-svelte";
</script>

{#if ($page.status === 404) }
    <div class="flex min-h-[calc(100vh-19vh)] flex-col items-center justify-center text-center">
        <MapPinned class="text-6xl text-gray-800 mb-4" />
        <h1 class="text-4xl font-bold text-gray-900 mb-2">Page Not Found</h1>
        <p class="mb-5 text-lg text-gray-600 ">We can't find the page you're looking for. It might have been removed or renamed, or maybe it never existed.</p>
        <button on:click={() => window.history.back()} class='inline-block rounded-lg bg-blue-500 px-6 py-3 text-lg font-semibold text-white transition duration-300 ease-in-out hover:bg-blue-600'>Go Back</button>
    </div>
{:else }
    <div class='flex min-h-[calc(100vh-19vh)] items-center justify-center'>
        <div class='flex flex-col min-h-[calc(100vh-19vh)] items-center justify-center text-center'>
            <Bug class="text-6xl text-red-500 mb-4" />
            <h2 class='text-3xl text-gray-700 mb-2'>Oops! Something Went Wrong.</h2>
            <p class='mb-5 text-lg text-gray-600'>An unexpected error has occurred. We're working to fix the problem, so please try again later.</p>
            <p class='text-sm text-gray-500 '>
                If you continue to experience issues, please let us know on{' '}
                <a class='text-blue-500 underline hover:text-blue-600' href='https://github.com/apollinelbcr/team_1-soen341projectW2024'>
                    our GitHub.
                </a>
            </p>
        </div>
    </div>
{/if}
