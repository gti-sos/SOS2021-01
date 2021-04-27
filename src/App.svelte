<script lang="ts">
  
	

	import NotFound from "./NotFound.svelte";
	import Home from "./Home.svelte";
	import Router from 'svelte-spa-router';
	import NatalityApi from "./NatalityAPI.svelte";
	import LifeAPI  from "./lifeStatsAPI/App.svelte";
	import DivorceAPI from "./DivorceStatsAPI/DivorceAPI.svelte";

	const routes = {
		"/":Home,
		"/divorce-stats": DivorceAPI,
		"/natality-stats": NatalityApi,
		"/life-stats": LifeAPI, 
		'*': NotFound};
</script>

<main>
	<Router {routes}> </Router>
</main>

<style>

</style>