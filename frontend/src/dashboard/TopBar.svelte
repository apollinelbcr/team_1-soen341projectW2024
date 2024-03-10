<script>
	import { openSidebar } from './store.ts';
</script>

<header class="relative z-10 h-16 w-full items-center bg-white shadow md:h-20">
	<div class="relative mx-auto flex h-full flex-col justify-center px-3">
		<div class="relative flex w-full items-center pl-1 sm:ml-0 sm:pr-2">
			<div class="relative left-0 flex h-full w-3/4">
				<div class="group relative flex h-full w-12 items-center lg:hidden">
					<button
						type="button"
						aria-expanded="false"
						aria-label="Toggle sidenav"
						class="text-4xl text-gray-500 focus:outline-none"
						on:click={openSidebar}
					>
						&#8801;
					</button>
				</div>
				
			</div>
			<div class="relative ml-5 flex w-1/4 items-center justify-end p-1 sm:right-auto sm:mr-0">
				<span class="relative block">
					<img
						alt="Guillermo Rauch"
						src="/logo_pictures/rentify_lg.png"
						class="mx-auto h-40 w-40 rounded-full object-cover"
					/>
				</span>
			</div>
		</div>
	</div>
</header>
