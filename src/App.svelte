<script lang="ts">
  import Router from "svelte-spa-router";

  import NotFound from "./Pages/NotFound.svelte";
  import Home from "./Pages/Home.svelte";
  import Info from "./Pages/Info.svelte";
  import Integrations from "./Pages/Integrations.svelte";
  import Analytics from "./Pages/Analytics.svelte";
  import About from "./Pages/About.svelte";

  import NatalityAPI from "./front/NatalityStatsAPI/NatalityAPI.svelte";
  import EditNatalityAPI from "./front/NatalityStatsAPI/EditStat.svelte";
  import NatalityChart from "./front/NatalityStatsAPI/NatalityChart.svelte";
  import NatalityChart2 from "./front/NatalityStatsAPI/NatalityChart2.svelte";
  import NATrestcountries from "./front/NatalityStatsAPI/I_Rescountries.svelte";
  import NATcoinCap from "./front/NatalityStatsAPI/I_coinCap.svelte";
  import NATsanityStats from "./front/NatalityStatsAPI/I_SanityStats.svelte";
  import NATplatformsStats from "./front/NatalityStatsAPI/I_PlatformStats.svelte";
  import NATvatRates from "./front/NatalityStatsAPI/I_VatRates.svelte";
  import NATpovertyRisks from "./front/NatalityStatsAPI/I_PovertyRisks.svelte";
  import NATilliteracy from "./front/NatalityStatsAPI/I_Illiteracy.svelte";
  import NATchidrenHIV from "./front/NatalityStatsAPI/I_ChidrenHIV.svelte";
  import NATchildrenEmployment from "./front/NatalityStatsAPI/I_ChildrenEmployment.svelte";
  import NATunemployment from "./front/NatalityStatsAPI/I_Unemployment.svelte";

  import LifeAPI from "./front/lifeStatsAPI/App.svelte";
  import LifeStatEdit from "./front/lifeStatsAPI/LifeEdit.svelte";
  import LifeCharts from "./front/lifeStatsAPI/LifeChart.svelte";
  import LifeCharts2 from "./front/lifeStatsAPI/LifeChart2.svelte";
  import LifeExtCovid from "./front/lifeStatsAPI/integrations/externaCovid.svelte";
  import LifeIntegration01 from "./front/lifeStatsAPI/integrations/integracion01.svelte";
  import LifeIntegration02 from "./front/lifeStatsAPI/integrations/integracion02.svelte";
  import LifeIntegration03 from "./front/lifeStatsAPI/integrations/integracion03.svelte";
  import LifeIntegration04 from "./front/lifeStatsAPI/integrations/integracion04.svelte";

  import DivorceAPI from "./front/DivorceStatsAPI/DivorceAPI.svelte";
  import EditDivorceAPI from "./front/DivorceStatsAPI/EditStat.svelte";
  import DivorceChart from "./front/DivorceStatsAPI/DivorceChart.svelte";
  import DivorceChart2_lollipop from "./front/DivorceStatsAPI/DivorceChart2_lollipop.svelte";

  import BreakingBadAPI from "./front/DivorceStatsAPI/integrations/BreakingBadAPI.svelte";
  //import RickandmortyEcharts from "./front/DivorceStatsAPI/integrations/RickandmortyEcharts.svelte";
  import RickandMortyCharactersAPI from "./front/DivorceStatsAPI/integrations/RickandMortyCharactersAPI.svelte";
  import DivorceAndAirDeathsIntegrationAPI from "./front/DivorceStatsAPI/integrations/DivorceAndAirDeathsIntegration.svelte";
  import DivorceAndFoodConsumptionIntegration from "./front/DivorceStatsAPI/integrations/DivorceAndFoodConsumptionIntegration.svelte";
  import DivorceAndObesityIntegration from "./front/DivorceStatsAPI/integrations/DivorceAndObesityIntegration.svelte";
  import SWUse from "./front/DivorceStatsAPI/integrations/SWUse.svelte";
  import BikeUse from "./front/DivorceStatsAPI/integrations/BikeUse.svelte";

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
