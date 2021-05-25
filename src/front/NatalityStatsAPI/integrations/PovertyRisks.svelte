<script>
  import { Nav, NavItem, NavLink } from "sveltestrap";

  //Uso API grupo 10
  const BASE_CONTACT_API_PATH = "/api/v2";

  var povertyData = [];
  var natalityData = [];
  var errorMsg = "";
  var okMsg = "";

  async function loadApi(){
    console.log("Loading data...");
    const res = await fetch(
      "https://endpoint-poverty-risks.herokuapp.com/api/v1/loadInitialData"
    ).then(function (res) {
      if (res.ok) {
        errorMsg = "";
        console.log("OK");
      } else {
        if (res.status === 500) {
          errorMsg = "No se ha podido acceder a la base de datos";
        }
        okMsg = "";
        console.log("ERROR!" + errorMsg);
      }
    });
  }
  async function loadStats() {
    console.log("Loading data...");
    const res = await fetch(
      BASE_CONTACT_API_PATH + "/natality-stats/loadInitialData"
    ).then(function (res) {
      if (res.ok) {
        getStats();
        errorMsg = "";
        console.log("OK");
      } else {
        if (res.status === 500) {
          errorMsg = "No se ha podido acceder a la base de datos";
        }
        okMsg = "";
        console.log("ERROR!" + errorMsg);
      }
    });
  }

  async function getStats() {
    console.log("Fetching data...");
    await loadStats();
    const res = await fetch(BASE_CONTACT_API_PATH + "/natality-stats");

    if (res.ok) {
      console.log("OK");
      natalityData = await res.json();

      okMsg = "";
      console.log(`We have received ${natalityData.length} natality-stats.`);
    } else {
      console.log("Error");
      errorMsg = "Error al cargar los datos de la API";
    }
  }

  async function getPovertyData() {
    console.log("Fetching data...");
    await loadApi();
    const res = await fetch(
      "https://endpoint-poverty-risks.herokuapp.com/api/v1/"
    );

    if (res.ok) {
      const json = await res.json();
      povertyData = json;

      console.log(`We have received ${povertyData.length} sanity-stats.`);

      console.log("Ok");
    } else {
      errorMsg = "Error recuperando datos de poverty-risks";
      okMsg = "";
      console.log("ERROR!" + errorMsg);
    }
  }

  function jsonToMap(j, k, v) {
    var res = new Map();
    j.forEach((element) => {
      var key = element[k];
      var value = element[v];
      console.log("key: " + key);
      console.log("value: " + value);
      if (res.has(key)) {
        var newValue = res.get(key) + value;
        res.set(key, newValue);
      } else {
        res.set(key, value);
      }
    });
    return res;
  }

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
            backgroundColor: [
              "rgb(240, 162, 2)",
              "rgb(123, 158, 137)",
             
            ],
            hoverOffset: 4,
          },
        ],
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
      <NavLink href="/">Página Principal</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="/#/integrations/">volver</NavLink>
    </NavItem>
  </Nav>

  <div>
    <h2>Integración API SOS poverty-risks</h2>
  </div>

  {#if errorMsg}
    <p>{errorMsg}</p>
  
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
