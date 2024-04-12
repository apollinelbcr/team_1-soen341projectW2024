<script>
	import { data } from './data';
	import { page } from '$app/stores';
	import LogoutIcon from "./icons/LogoutIcon.svelte";

	const style = {
		title: 'font-normal mx-4 text-sm',
		active: 'text-black font-medium',
		inactive: 'text-gray-600',
		link: 'flex font-thin items-center justify-start my-2 p-4 w-full'
	};

	function signOut() {
		document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
		window.location.reload();
	}
</script>

<div class="md:pl-6">
	{#each data as { section, content } (section)}
		<ul class="border-b py-2 last:border-none">
			{#each content as item (item.title)}
				<li>
					<a
						href={item.link}
						class={`${style.link} ${item.link === $page.url.pathname ? style.active : style.inactive}`}
					>
						<span><svelte:component this={item.icon} /></span>
						<span class={style.title}>{item.title}</span>
					</a>
				</li>
			{/each}
			{#if section === "Section 3"}
				<li>
					<a
							href="javascript:void(0);" on:click={signOut}
							class={`${style.link}`}
					>
						<span><svelte:component this={LogoutIcon} /></span>
						<span class={style.title}>Logout</span>
					</a>
				</li>
			{/if}
		</ul>
	{/each}
</div>
