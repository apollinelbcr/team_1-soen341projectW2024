<script>
    import { Router, Route } from 'svelte-routing';
    import Edit from './routes/Edit/+page.svelte';
    import PlusPage from './+page.svelte';
  import "../app.css";
</script>
<Router>
    <Route path="/edit" component={Edit} />
    <Route path="/plus-page" component={PlusPage} />
</Router>
<slot />