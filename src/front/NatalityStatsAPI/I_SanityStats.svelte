<script>
  import { Nav, NavItem, NavLink, Spinner } from "sveltestrap";


  const BASE_CONTACT_API_PATH = "/api/v2";

  var sanityStats = [];
  var natalityData = [];
  var msg = "";

    /**
   * Carga los datos de la API SOS
   */
  async function loadApi() {
    console.log("Loading data...");
    const res = await fetch("/sanity-stats/loadInitialData").then(function (
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
  async function getSanityStats() {
    console.log("Fetching data...");
    await loadApi();
    const res = await fetch("/sanity-stats");

    if (res.ok) {
      const json = await res.json();
      sanityStats = json;

      console.log(`We have received ${sanityStats.length} sanity-stats.`);
      msg = "";
      console.log("Ok");
    } else {
      msg = "Error recuperando datos de sanity-stats";
      console.log("ERROR!" + msg);
    }
  }
 /**
   * Carga los datos en la grafica
   */
  async function loadChart() {
    await getStats();
    await getSanityStats();

    var xAxis = [];
    var yAxis = [];
    var yAxis1 = [];

    
    console.log("Calculating sanity-stats...");
    var index = 0;
    sanityStats.forEach((element) => {
      var e = element.country + "-" + element.year;
      if (!xAxis.includes(e)) {
        xAxis.push(e);
        yAxis.push(Math.round(element.health_expenditure_in_percentage));
        index++;
      }
    });
    
    console.log("Calculating natality-stats...");
    natalityData.forEach((element) => {
      var e = element.country + "-" + element.date;
      if (!xAxis.includes(e)) {
        if (element["natality-rate"] != undefined) {
          xAxis.push(e);
          yAxis.push(Math.round(element["natality-rate"]));
        }
      }
    });
    //Como los años no coinciden, hay que situar correctamente 
    // el eje x con el y
    var yAxis1 = [];
    for (let i = 0; i < index; i++) {
      yAxis1.push(0);
    }
    var copy = yAxis.slice(index, yAxis.lengt);
    for (let i = 0; i < copy.length; i++) {
      yAxis1.push(copy[i]);
    }

    var ctx = document.getElementById("myChart").getContext("2d");

    var myChart = new Chart(ctx, {
      data: {
        datasets: [
          {
            type: "line",
            label: "Gasto en sanidad (%)",
            data: yAxis.slice(0, index),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
          },
          {
            type: "bar",
            label: "Ratio de natalidad (%)",
            data: yAxis1,
            borderColor: "rgb(54, 162, 235)",
          },
        ],
        labels: xAxis,
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
      <NavLink id="nav_integrations" href="/#/integrations/">Integraciones</NavLink>
    </NavItem>
    <NavItem>
      <NavLink id="nav_restcountries" href="/#/integrations/restcountries">restcountries</NavLink>
    </NavItem>
    <NavItem>
      <NavLink id="nav_coinCap" href="/#/integrations/coinCap">coinCap</NavLink>
    </NavItem>
    <NavItem>
      <NavLink id="nav_vatRates" href="/#/integrations/vatRates">vatRates</NavLink>
    </NavItem>
    <NavItem>
      <NavLink disabled id="nav_sanityStats" href="/#/integrations/sanityStats">sanityStats</NavLink>
    </NavItem>
    <NavItem>
      <NavLink id="nav_platformsStats" href="/#/integrations/platformsStats">platformsStats</NavLink>
    </NavItem>
    <NavItem>
      <NavLink id="nav_povertyRisks" href="/#/integrations/povertyRisks">povertyRisks</NavLink>
    </NavItem>
    <NavItem>
      <NavLink id="nav_illiteracy" href="/#/integrations/illiteracy">illiteracy</NavLink>
    </NavItem>
    <NavItem>
      <NavLink id="nav_chidrenHIV" href="/#/integrations/chidrenHIV">chidrenHIV</NavLink>
    </NavItem>
    <NavItem>
      <NavLink id="nav_childrenEmployment" href="/#/integrations/childrenEmployment">childrenEmployment</NavLink>
    </NavItem>
    <NavItem>
      <NavLink id="nav_unemployment" href="/#/integrations/unemployment">unemployment</NavLink>
    </NavItem>
  </Nav>


  <div>
    <h2>Integración API SOS sanity-stats</h2>
    <p>por favor espere unos segundos a que se cargue la gráfica</p>
  </div>

  {#if msg}
    <p>{msg}</p>
    <Spinner color="primary" />
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
