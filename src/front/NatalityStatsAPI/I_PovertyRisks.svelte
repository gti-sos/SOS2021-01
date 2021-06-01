<script>
  import { Nav, NavItem, NavLink } from "sveltestrap";


  const BASE_CONTACT_API_PATH = "/api/v2";

  var povertyData = [];
  var natalityData = [];
  var msg = "";

   /**
   * Carga los datos de la API SOS
   */
  async function loadApi() {
    console.log("Loading data...");
    const res = await fetch(
      "https://endpoint-poverty-risks.herokuapp.com/api/v1/loadInitialData"
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
  async function getPovertyData() {
    console.log("Fetching data...");
    await loadApi();
    const res = await fetch(
      "https://endpoint-poverty-risks.herokuapp.com/api/v1/"
    );

    if (res.ok) {
      const json = await res.json();
      povertyData = json;

      console.log(`We have received ${povertyData.length} poverty-stats.`);

      console.log("Ok");
    } else {
      msg = "Error recuperando datos de poverty-risks";
      console.log("ERROR!" + errorMsg);
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
    await getPovertyData();

    var years = [];
    var data = [];

    //-------------------poverty-risks
    console.log("Calculating poverty-risks...");
    var result = jsonToMap(povertyData, "year", "percentage_risk_of_poverty");

    years.push("Ratio de pobreza (%)");
    var total = 0;
    for (let [key, value] of result) {
      total += parseFloat(value);
    }
    data.push(total);

    console.log("Calculating natality-stats...");
    var result1 = jsonToMap(natalityData, "date", "natality-rate");

    var total1 = 0;
    years.push("Ratio natalidad (%)");
    for (let [key, value] of result1) {
      total1 += parseFloat(value);
    }
    data.push(total1);

    var ctx = document.getElementById("myChart").getContext("2d");

    var myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: years,
        datasets: [
          {
            label: "ratio de probeza",
            data: data,
            backgroundColor: ["rgb(240, 162, 2)", "rgb(123, 158, 137)"],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Comparativa del ratio de pobreza y del ratio de natalidad'
            }
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
      <NavLink id="nav_sanityStats" href="/#/integrations/sanityStats">sanityStats</NavLink>
    </NavItem>
    <NavItem>
      <NavLink id="nav_platformsStats" href="/#/integrations/platformsStats">platformsStats</NavLink>
    </NavItem>
    <NavItem>
      <NavLink disabled id="nav_povertyRisks" href="/#/integrations/povertyRisks">povertyRisks</NavLink>
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
    <h2>Integración API SOS poverty-risks</h2>
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
  #myChart{
    width: 400px;
    height: 500px;
  }
</style>
