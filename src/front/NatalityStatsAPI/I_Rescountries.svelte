<script>
  import { Nav, NavItem, NavLink } from "sveltestrap";

  var countries = [];
  var msg = "";

  /**
   * Obtiene los datos de la API externa
   */
  async function getStats() {
    console.log("Fetching data...");

    const res = await fetch("https://restcountries.eu/rest/v2/all");

    if (res.ok) {
      const json = await res.json();
      countries = json;

      console.log(`We have received ${countries.length} countries.`);

      msg = "";
      console.log("Ok");
    } else {
      msg = "Error recuperando datos de restcountries";

      console.log("ERROR!" + msg);
    }
  }
  /**
   * Carga los datos en la grafica
   */
  async function loadChart() {
    await getStats();

    var xAxis = [];
    var yAxis = [];

    for (let index = 0; index < countries.length; index++) {
      const element = countries[index];
      if (element.regionalBlocs.length != 0) {
        if (element.regionalBlocs[0].acronym == "EU") {
          xAxis.push(element.name);
          yAxis.push(element.population);
        }
      }
    }

    var options = {
          series: yAxis,
          chart: {
          width: 900,
          height: 800,
          type: 'pie',
        },
        title: {
    text: "Población países europeos",
    align: 'center',
        },
        labels: xAxis,
        };

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
  }
</script>

<svelte:head>
  <script src="https://cdn.jsdelivr.net/npm/apexcharts"
  on:load={loadChart}></script>
</svelte:head>

<main>
  <Nav>
    <NavItem>
      <NavLink id="nav_home" href="/">Página Principal</NavLink>
    </NavItem>
    <NavItem>
      <NavLink id="nav_integrations" href="/#/integrations/"
        >Integraciones</NavLink
      >
    </NavItem>
    <NavItem>
      <NavLink
        disabled
        id="nav_restcountries"
        href="/#/integrations/restcountries">restcountries</NavLink
      >
    </NavItem>
    <NavItem>
      <NavLink id="nav_coinCap" href="/#/integrations/coinCap">coinCap</NavLink>
    </NavItem>
    <NavItem>
      <NavLink id="nav_vatRates" href="/#/integrations/vatRates"
        >vatRates</NavLink
      >
    </NavItem>
    <NavItem>
      <NavLink id="nav_sanityStats" href="/#/integrations/sanityStats"
        >sanityStats</NavLink
      >
    </NavItem>
    <NavItem>
      <NavLink id="nav_platformsStats" href="/#/integrations/platformsStats"
        >platformsStats</NavLink
      >
    </NavItem>
    <NavItem>
      <NavLink id="nav_povertyRisks" href="/#/integrations/povertyRisks"
        >povertyRisks</NavLink
      >
    </NavItem>
    <NavItem>
      <NavLink id="nav_illiteracy" href="/#/integrations/illiteracy"
        >illiteracy</NavLink
      >
    </NavItem>
    <NavItem>
      <NavLink id="nav_chidrenHIV" href="/#/integrations/chidrenHIV"
        >chidrenHIV</NavLink
      >
    </NavItem>
    <NavItem>
      <NavLink
        id="nav_childrenEmployment"
        href="/#/integrations/childrenEmployment">childrenEmployment</NavLink
      >
    </NavItem>
    <NavItem>
      <NavLink id="nav_unemployment" href="/#/integrations/unemployment"
        >unemployment</NavLink
      >
    </NavItem>
  </Nav>

  <div>
    <h2>Uso API externa restcountries.eu</h2>
  </div>

  {#if msg}
    <p>{msg}</p>
  {:else}
  <div id='container'>
    <div id='chart'></div>
  </div>
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
  div {
    margin-bottom: 15px;
  }
  #container{
    width:100%;
  display: flex;
  justify-content: center;
  }
</style>
