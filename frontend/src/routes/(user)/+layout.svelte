<script>
  import "../../app.css";
  import Header from "$lib/components/layout/Header.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  import {Toaster} from "svelte-sonner";
  import {page} from "$app/stores";
</script>

<Toaster closeButton/>
<Header/>

<main class="md:px-10 min-h-[calc(100vh-19vh)]">
<slot />
</main>

{#if !$page.url.pathname.match(/^(\/signup|\/login)$/)}
<Footer/>
{/if}