<script lang="ts">
  import Router from "svelte-spa-router";

  import NotFound from "./Pages/NotFound.svelte";
  import Home from "./Pages/Home.svelte";
  import Info from "./Pages/Info.svelte";
  import Integrations from "./Pages/Integrations.svelte";
  import Analytics from "./Pages/Analytics.svelte";
  import About from "./Pages/About.svelte";

  import NatalityAPI from "./NatalityStatsAPI/NatalityAPI.svelte";
  import EditNatalityAPI from "./NatalityStatsAPI/EditStat.svelte";
  import NatalityChart from "./NatalityStatsAPI/NatalityChart.svelte";
  import NatalityChart2 from "./NatalityStatsAPI/NatalityChart2.svelte";
  import NATrestcountries from "./NatalityStatsAPI/I_Rescountries.svelte";
  import NATcoinCap from "./NatalityStatsAPI/I_coinCap.svelte";
  import NATsanityStats from "./NatalityStatsAPI/I_SanityStats.svelte";
  import NATplatformsStats from "./NatalityStatsAPI/I_PlatformStats.svelte";
  import NATvatRates from "./NatalityStatsAPI/I_VatRates.svelte";
  import NATpovertyRisks from "./NatalityStatsAPI/I_PovertyRisks.svelte";
  import NATilliteracy from "./NatalityStatsAPI/I_Illiteracy.svelte";
  import NATchidrenHIV from "./NatalityStatsAPI/I_ChidrenHIV.svelte";
  import NATchildrenEmployment from "./NatalityStatsAPI/I_ChildrenEmployment.svelte";
  import NATunemployment from "./NatalityStatsAPI/I_Unemployment.svelte";

  import LifeAPI from "./lifeStatsAPI/App.svelte";
  import LifeStatEdit from "./lifeStatsAPI/LifeEdit.svelte";
  import LifeCharts from "./lifeStatsAPI/LifeChart.svelte";
  import LifeCharts2 from "./lifeStatsAPI/LifeChart2.svelte";
  import LifeExtCovid from "./lifeStatsAPI/integrations/externaCovid.svelte";
  import LifeIntegration01 from "./lifeStatsAPI/integrations/integracion01.svelte";
  import LifeIntegration02 from "./lifeStatsAPI/integrations/integracion02.svelte";
  import LifeIntegration03 from "./lifeStatsAPI/integrations/integracion03.svelte";
  import LifeIntegration04 from "./lifeStatsAPI/integrations/integracion04.svelte";

  import DivorceAPI from "./DivorceStatsAPI/DivorceAPI.svelte";
  import EditDivorceAPI from "./DivorceStatsAPI/EditStat.svelte";
  import DivorceChart from "./DivorceStatsAPI/DivorceChart.svelte";
  import DivorceChart2_lollipop from "./DivorceStatsAPI/DivorceChart2_lollipop.svelte";

  import BreakingBadAPI from "./DivorceStatsAPI/integrations/BreakingBadAPI.svelte";
  //import RickandmortyEcharts from "./DivorceStatsAPI/integrations/RickandmortyEcharts.svelte";
  import RickandMortyCharactersAPI from "./DivorceStatsAPI/integrations/RickandMortyCharactersAPI.svelte";
  import DivorceAndAirDeathsIntegrationAPI from "./DivorceStatsAPI/integrations/DivorceAndAirDeathsIntegration.svelte";
  import DivorceAndFoodConsumptionIntegration from "./DivorceStatsAPI/integrations/DivorceAndFoodConsumptionIntegration.svelte";
  import DivorceAndObesityIntegration from "./DivorceStatsAPI/integrations/DivorceAndObesityIntegration.svelte";
  import SWUse from "./DivorceStatsAPI/integrations/SWUse.svelte";
  import BikeUse from "./DivorceStatsAPI/integrations/BikeUse.svelte";

  const routes = {
    "/": Home,
    "/info": Info,
    "/integrations": Integrations,
    "/analytics": Analytics,
    "/about": About,
    ////-----------------------------natality-stats
    "/natality-stats": NatalityAPI,
    "/natality-stats/:country/:date": EditNatalityAPI,
    "/natality-stats/natalityChart": NatalityChart,
    "/natality-stats/natalityChart2": NatalityChart2,
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
    "/divorce-stats/divorceChart": DivorceChart,
    "/divorce-stats/divorceChart2": DivorceChart2_lollipop,
    "/integrations/breakingbad": BreakingBadAPI,
    "/integrations/divorceandairdeathsintegration":
      DivorceAndAirDeathsIntegrationAPI,
    //"/integrations/rickandmortyEcharts" : RickandmortyEcharts,
    "/integrations/rickandmortyAPI": RickandMortyCharactersAPI,
    "/integrations/DivorceAndFoodConsumptionIntegration":
      DivorceAndFoodConsumptionIntegration,
    "/integrations/DivorceAndObesityIntegration": DivorceAndObesityIntegration,
    "/integrations/BikeUse": BikeUse,
    "/integrations/SWUse": SWUse,
    //-----------------------------life-stats
    "/life-stats": LifeAPI,
    "/life-stats/:country/:date": LifeStatEdit,
    "/life-stats/lifeCharts": LifeCharts,
    "/life-stats/lifeCharts2": LifeCharts2,
    "/integrations/externaCovid": LifeExtCovid,
    "/integrations/integracion01": LifeIntegration01,
    "/integrations/integracion02": LifeIntegration02,
    "/integrations/integracion03": LifeIntegration03,
    "/integrations/integracion04": LifeIntegration04,
    //-----------------------------
    "*": NotFound,
  };
</script>

<main>
  <Router {routes} />
</main>

<style>
</style>
