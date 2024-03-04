<script>
  import "../app.css";
  import Header from "$lib/components/layout/Header.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  import {Toaster} from "svelte-sonner";
</script>

<Toaster closeButton/>
<Header/>

<main class="md:px-10">
<slot />
</main>

<Footer/>