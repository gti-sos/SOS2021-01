<script>
  import { Nav, NavItem, NavLink } from "sveltestrap";

  const BASE_CONTACT_API_PATH = "/api/v2";

  var platformsStats = [];
  var natalityData = [];
  var msg = "";

  /**
   * Carga los datos de la API SOS
   */
  async function loadApi() {
    console.log("Loading data...");
    const res = await fetch("/api/v1/platforms/loadInitialData").then(function (
      res
    ) {
      if (res.ok) {
        msg = "";
        console.log("OK");
      } else {
        if (res.status === 500) {
          msg = "No se ha podido acceder a la base de datos";
        }
        console.log("ERROR!" + msg);
      }
    });
  }
  /**
   * Carga los datos de nuestra API
   */
  async function loadStats() {
    console.log("Loading data...");
    const res = await fetch(
      BASE_CONTACT_API_PATH + "/natality-stats/loadInitialData"
    ).then(function (res) {
      if (res.ok) {
        msg = "";
        console.log("OK");
      } else {
        if (res.status === 500) {
          msg = "No se ha podido acceder a la base de datos";
        }
        console.log("ERROR!" + msg);
      }
    });
  }
  /**
   * Obtiene los datos de nuestra API
   */
  async function getStats() {
    console.log("Fetching data...");
    await loadStats();
    const res = await fetch(BASE_CONTACT_API_PATH + "/natality-stats");

    if (res.ok) {
      console.log("OK");
      natalityData = await res.json();

      msg = "";
      console.log(`We have received ${natalityData.length} natality-stats.`);
    } else {
      console.log("Error");
      msg = "Error al cargar los datos de la API";
    }
  }
  /**
   * Obtiene los datos de la API SOS
   */
  async function getPlatformsStats() {
    console.log("Fetching data...");
    await loadApi();
    const res = await fetch("/api/v1/platforms?platform=Nintendo 3DS");

    if (res.ok) {
      const json = await res.json();
      platformsStats = json;

      console.log(`We have received ${platformsStats.length} platforms-stats.`);

      console.log("Ok");
    } else {
      msg = "Error recuperando datos de platform-stats";
      console.log("ERROR!" + msg);
    }
  }
  /**
   * Parsea un JSON a Map
   * @param j json
   * @param k propiedad 1 como clave
   * @param v propiedad 2 como valor
   */
  function jsonToMap(j, k, v) {
    var res = new Map();
    j.forEach((element) => {
      var key = element[k];
      var value = element[v];
      if (res.has(key)) {
        var newValue = res.get(key) + value;
        res.set(key, newValue);
      } else {
        res.set(key, value);
      }
    });
    return res;
  }
  /**
   * Carga los datos en la grafica
   */
  async function loadChart() {
    await getStats();
    await getPlatformsStats();

    var data = [];
    var data1 = [];

    console.log("Calculating platforms-stats...");
    var result = jsonToMap(platformsStats, "year", "sold-unit");

    console.log(result);
    for (let [key, value] of result) {
      data.push({
        x: parseInt(key),
        y: parseInt(value),
      });
    }

    console.log("Calculating natality-stats...");
    var result1 = jsonToMap(natalityData, "date", "born");

    console.log(result1);
    for (let [key, value] of result1) {
      data1.push({
        x: parseInt(key),
        y: parseInt(value),
      });
    }

    var ctx = document.getElementById("myChart").getContext("2d");

    var myChart = new Chart(ctx, {
      type: "scatter",
      data: {
        label: "Scatter Dataset",
        datasets: [
          {
            label: "Consolas Nintendo 3DS por año",
            data: data,
            backgroundColor: "rgba(255, 0,0, 1)",
          },
          {
            label: "Nacidos por año",
            data: data1,
            backgroundColor: "rgba(0,0,255, 1)",
          },
        ],
      },

      options: {
        scales: {
          x: {
            type: "linear",
            position: "bottom",
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    });
  }
</script>

<svelte:head>
  <script
    src="https://cdn.jsdelivr.net/npm/chart.js"
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
      <NavLink id="nav_restcountries" href="/#/integrations/restcountries"
        >restcountries</NavLink
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
      <NavLink
        disabled
        id="nav_platformsStats"
        href="/#/integrations/platformsStats">platformsStats</NavLink
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
    <h2>Integración API SOS platform-stats</h2>
    <p>por favor espere unos segundos a que se cargue la gráfica</p>
  </div>

  {#if msg}
    <p>{msg}</p>
  {:else}
    <div>
      <canvas id="myChart" />
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
</style>
