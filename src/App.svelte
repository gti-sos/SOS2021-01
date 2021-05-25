<script lang="ts">
	import Router from "svelte-spa-router";

	import NotFound from "./Pages/NotFound.svelte";
	import Home from "./Pages/Home.svelte";
	import Info from "./Pages/Info.svelte";
	import Integrations from "./Pages/Integrations.svelte";
	import NatalityAPI from "./front/NatalityStatsAPI/NatalityAPI.svelte";
	import EditNatalityAPI from "./front/NatalityStatsAPI/EditStat.svelte";
	import NatalityCharts from "./front/NatalityStatsAPI/NatalityChart.svelte";
	import NATrestcountries from "./front/NatalityStatsAPI/integrations/Rescountries.svelte";
	import NATcoinCap from "./front/NatalityStatsAPI/integrations/coinCap.svelte";
	import NATsanityStats from "./front/NatalityStatsAPI/integrations/SanityStats.svelte";
	import NATplatformsStats from "./front/NatalityStatsAPI/integrations/PlatformStats.svelte";
	import LifeAPI from "./front/lifeStatsAPI/App.svelte";
	import LifeStatEdit from "./front/lifeStatsAPI/LifeEdit.svelte";
	import LifeCharts from "./front/lifeStatsAPI/LifeChart.svelte";
	import LifeExtCovid from "./front/lifeStatsAPI/integrations/externaCovid.svelte";
	import DivorceAPI from "./front/DivorceStatsAPI/DivorceAPI.svelte";
	import EditDivorceAPI from "./front/DivorceStatsAPI/EditStat.svelte";
	import DivorceCharts from "./front/DivorceStatsAPI/DivorceChart.svelte";
	import CommonChart from "./Pages/CommonChart.svelte";
	import BreakingBadAPI from "./front/DivorceStatsAPI/integrations/BreakingBadAPI.svelte";
	//import RickandmortyEcharts from "./front/DivorceStatsAPI/integrations/RickandmortyEcharts.svelte";
	import RickandMortyCharactersAPI from "./front/DivorceStatsAPI/integrations/RickandMortyCharactersAPI.svelte";
	import DivorceAndAirDeathsIntegrationAPI from "./front/DivorceStatsAPI/integrations/DivorceAndAirDeathsIntegration.svelte";
	const routes = {
		"/": Home,
		"/info": Info,
		"/integrations": Integrations,
		"/divorce-stats": DivorceAPI,
		"/divorce-stats/:country/:date": EditDivorceAPI,
		"/divorce-stats/divorceCharts": DivorceCharts,
		"/natality-stats": NatalityAPI,
		"/natality-stats/:country/:date": EditNatalityAPI,
		"/natality-stats/natalityCharts": NatalityCharts,
		"/integrations/restcountries": NATrestcountries,
		"/integrations/coinCap": NATcoinCap,
		"/integrations/sanityStats": NATsanityStats,
		"/integrations/breakingbad": BreakingBadAPI,
		"/integrations/platformsStats": NATplatformsStats,
		"/integrations/divorceandairdeathsintegration": DivorceAndAirDeathsIntegrationAPI,

		//"/integrations/rickandmortyEcharts" : RickandmortyEcharts,
		"/integrations/rickandmortyAPI": RickandMortyCharactersAPI,
		"/life-stats": LifeAPI,
		"/life-stats/:country/:date": LifeStatEdit,
		"/life-stats/lifeCharts": LifeCharts,
		"/integrations/externaCovid": LifeExtCovid,
		"/analytics": CommonChart,
		"*": NotFound,
	};
</script>

<main>
	<Router {routes} />
</main>

<style>
</style>
