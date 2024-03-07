<script>
    import { Router, Route} from 'svelte-routing';
    import Account from '/+page.svelte';
    import Edit from '/Edit.svelte';

  import "../app.css";
</script>
<Router>
    <Route path="/" Component={Account}/>
    <Route path="/edit" Component={Edit}/>

</Router>

<slot />