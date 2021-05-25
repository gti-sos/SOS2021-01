<script lang="ts">
	import Router from "svelte-spa-router";

	import NotFound from "./Pages/NotFound.svelte";
	import Home from "./Pages/Home.svelte";
	import Info from "./Pages/Info.svelte";
	import Integrations from "./Pages/Integrations.svelte";
	import CommonChart from "./Pages/CommonChart.svelte";

	import NatalityAPI from "./front/NatalityStatsAPI/NatalityAPI.svelte";
	import EditNatalityAPI from "./front/NatalityStatsAPI/EditStat.svelte";
	import NatalityCharts from "./front/NatalityStatsAPI/NatalityChart.svelte";
	import NATrestcountries from "./front/NatalityStatsAPI/integrations/Rescountries.svelte";
	import NATcoinCap from "./front/NatalityStatsAPI/integrations/coinCap.svelte";
	import NATsanityStats from "./front/NatalityStatsAPI/integrations/SanityStats.svelte";
	import NATplatformsStats from "./front/NatalityStatsAPI/integrations/PlatformStats.svelte";
	import NATvatRates from "./front/NatalityStatsAPI/integrations/VatRates.svelte";
	import NATpovertyRisks from "./front/NatalityStatsAPI/integrations/PovertyRisks.svelte";
	import NATilliteracy from "./front/NatalityStatsAPI/integrations/Illiteracy.svelte";
	import NATchidrenHIV from "./front/NatalityStatsAPI/integrations/ChidrenHIV.svelte";
	import NATchildrenEmployment from "./front/NatalityStatsAPI/integrations/ChildrenEmployment.svelte";
	import NATunemployment from "./front/NatalityStatsAPI/integrations/Unemployment.svelte";

	import LifeAPI from "./front/lifeStatsAPI/App.svelte";
	import LifeStatEdit from "./front/lifeStatsAPI/LifeEdit.svelte";
	import LifeCharts from "./front/lifeStatsAPI/LifeChart.svelte";
	import LifeCharts2 from "./front/lifeStatsAPI/LifeChart2.svelte";
	import LifeExtCovid from "./front/lifeStatsAPI/integrations/externaCovid.svelte";
	
	import DivorceAPI from "./front/DivorceStatsAPI/DivorceAPI.svelte";
	import EditDivorceAPI from "./front/DivorceStatsAPI/EditStat.svelte";
	import DivorceCharts from "./front/DivorceStatsAPI/DivorceChart.svelte";

	import BreakingBadAPI from "./front/DivorceStatsAPI/integrations/BreakingBadAPI.svelte";
	//import RickandmortyEcharts from "./front/DivorceStatsAPI/integrations/RickandmortyEcharts.svelte";
	import RickandMortyCharactersAPI from "./front/DivorceStatsAPI/integrations/RickandMortyCharactersAPI.svelte";
	import DivorceAndAirDeathsIntegrationAPI from "./front/DivorceStatsAPI/integrations/DivorceAndAirDeathsIntegration.svelte";
	import DivorceAndFoodConsumptionIntegration from "./front/DivorceStatsAPI/integrations/DivorceAndFoodConsumptionIntegration.svelte"
	import DivorceAndObesityIntegration from "./front/DivorceStatsAPI/integrations/DivorceAndObesityIntegration.svelte";
	const routes = {
		"/": Home,
		"/info": Info,
		"/integrations": Integrations,
		"/analytics": CommonChart,
		////-----------------------------natality-stats
		"/natality-stats": NatalityAPI,
		"/natality-stats/:country/:date": EditNatalityAPI,
		"/natality-stats/natalityCharts": NatalityCharts,
		"/integrations/restcountries": NATrestcountries,
		"/integrations/coinCap": NATcoinCap,
		"/integrations/sanityStats": NATsanityStats,
		"/integrations/vatRates": NATvatRates,
		"/integrations/platformsStats": NATplatformsStats,
		"/integrations/povertyRisks": NATpovertyRisks,
		"/integrations/illiteracy": NATilliteracy,
		"/integrations/chidrenHIV": NATchidrenHIV,
		"/integrations/childrenEmployment": NATchildrenEmployment,
		"/integrations/unemployment": NATunemployment,
		//-----------------------------divorce-stats
		
		"/divorce-stats": DivorceAPI,
		"/divorce-stats/:country/:date": EditDivorceAPI,
		"/divorce-stats/divorceCharts": DivorceCharts,
		"/integrations/breakingbad": BreakingBadAPI,
		"/integrations/divorceandairdeathsintegration": DivorceAndAirDeathsIntegrationAPI,
		//"/integrations/rickandmortyEcharts" : RickandmortyEcharts,
		"/integrations/rickandmortyAPI": RickandMortyCharactersAPI,
		"/integrations/DivorceAndFoodConsumptionIntegration": DivorceAndFoodConsumptionIntegration,
		"/integrations/DivorceAndObesityIntegration": DivorceAndObesityIntegration,
		//-----------------------------life-stats
		"/life-stats": LifeAPI,
		"/life-stats/:country/:date": LifeStatEdit,
		"/life-stats/lifeCharts": LifeCharts,
		"/life-stats/lifeCharts2": LifeCharts2,
		"/integrations/externaCovid": LifeExtCovid,
		//-----------------------------
		"*": NotFound
	};
</script>

<main>
	<Router {routes} />
</main>

<style>
</style>
