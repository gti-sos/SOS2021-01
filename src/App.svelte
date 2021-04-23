<script lang="ts">
  
	

	import NotFound from "./NotFound.svelte";
	import Home from "./Home.svelte";
	import Router from 'svelte-spa-router';
  import NatalityApi from "./NatalityAPI.svelte";

	const routes = {
		"/":Home,
		"/natality-stats": NatalityApi,
		'*': NotFound};
</script>

<main>
	<Router {routes}> </Router>
</main>

<style>

</style>