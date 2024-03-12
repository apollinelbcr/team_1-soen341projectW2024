<script>
    import "../app.css";
    import {page} from "$app/stores";
</script>

{#if ($page.status === 404) }
    <div class="flex min-h-[calc(100vh-19vh)] flex-col items-center justify-center">
        <div class='space-y-10 text-center justify-center'>
            <div class="flex items-center max-w-[32rem] my-1">
                <span class="text-5xl mr-1 font-bold text-gray-900">{$page.status}</span>
                <div class="text-3xl border-l-2 pl-2 ml-1 border-black dark:border-gray-200 border-solid font-medium text-gray-800">
                    <h1>It looks like you got lost.</h1>
                </div>
            </div>
            <a href="/"
               class='block mx-auto max-w-fit rounded-full border px-5 py-2 font-semibold text-gray-800 transition duration-300 ease-in-out hover:bg-gray-100'>
                Home
            </a>
        </div>
    </div>
{:else }
<div class='flex min-h-[calc(100vh-19vh)] items-center justify-center'>
        <div class='text-center'>
            <div class='text-xl text-gray-700'>
              Something went wrong :(
            </div>
          <div class='py-3' />
          <div class='text-sm dark:text-gray-200'>
            Help us fix it by reporting this error with a screenshot on{' '}
            <a
              class='text-red-700 underline hover:text-red-800'
              href='https://github.com/apollinelbcr/team_1-soen341projectW2024'
            >
              our GitHub
            </a>
          </div>
        </div>
      </div>
{/if}
