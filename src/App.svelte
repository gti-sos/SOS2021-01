<script lang="ts">
  import Router from 'svelte-spa-router';
	

	import NotFound from "./Pages/NotFound.svelte";
	import Home from "./Pages/Home.svelte";
	import Info from "./Pages/Info.svelte";
	import NatalityAPI from "./front/NatalityStatsAPI/NatalityAPI.svelte";
	import EditNatalityAPI from "./front/NatalityStatsAPI/EditStat.svelte";
	import SearchNatalityStats from "./front/NatalityStatsAPI/SearchStat.svelte";
	import LifeAPI  from "./front/lifeStatsAPI/App.svelte";
	import DivorceAPI from "./front/DivorceStatsAPI/DivorceAPI.svelte";

	const routes = {
		"/":Home,
		"/info":Info,
		"/divorce-stats": DivorceAPI,
		"/natality-stats": NatalityAPI,
		"/natality-stats/:country/:date":EditNatalityAPI,
		"/natality-stats/search": SearchNatalityStats,
		"/life-stats": LifeAPI, 
		'*': NotFound};
</script>

<main>
	<Router {routes}> </Router>
</main>

<style>

</style>