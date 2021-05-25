<script>
  import { element } from "svelte/internal";

  import { Nav, NavItem, NavLink } from "sveltestrap";

  //Uso API grupo 10
  const BASE_CONTACT_API_PATH = "/api/v2";

  var employmentData = [];
  var natalityData = [];

  var errorMsg = "";
  var okMsg = "";

  async function loadStats() {
    console.log("Loading data...");
    const res = await fetch(
      BASE_CONTACT_API_PATH + "/natality-stats/loadInitialData"
    ).then(function (res) {
      if (res.ok) {
        getStats();

        errorMsg = "";
        okMsg = "Datos cargados correctamente";
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

  async function getEmplymentData() {
    console.log("Fetching data...");

    const res = await fetch("https://sos2021-24.herokuapp.com/api/v2/children-employment");

    if (res.ok) {
      const json = await res.json();
      employmentData = json;

      console.log(`We have received ${employmentData.length} platforms-stats.`);

      console.log("Ok");
    } else {
      errorMsg = "Error recuperando datos de platform-stats";
      okMsg = "";
      console.log("ERROR!" + errorMsg);
    }
  }

  function jsonToMap(j, k, v){
    var res = new Map()
    j.forEach((element) => {
      var key = element[k];
      var value = element[v];
      console.log("key: "+key)
      console.log("value: "+value)
      if(res.has(key)){
        var newValue = res.get(key)+value;
        res.set(key,newValue);
      }else{
        res.set(key, value);
      }
    });
    return res;
  }

  async function loadChart() {
    await getStats();
    await getEmplymentData();

    /////////////////////////////////////////

    var years = [];
    var data = [];

    var result = jsonToMap(employmentData, "year", "percent_children_employment_t");

    var result1 = jsonToMap(natalityData, "date", "fertility-rate");

    
    console.log("Calculating children-hiv...");
    years.push("Total niños empleados");
    var total = 0;
    for (let [key, value] of result) {
       total+=value;
    }
    data.push(total);

    console.log("Calculating natality-stats...");
    var total1=0;
    years.push("indice fecundacion");
    for (let [key, value] of result1) {
      total1+=value;
    }
    data.push(total1);

    var ctx = document.getElementById("myChart").getContext("2d");

    var myChart = new Chart(ctx, {
      type: "polarArea",
      data: {
        labels: years,
        datasets: [
          {
            label: "Niños empleados y ratio de fecundación",
            data: data,
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(75, 192, 192)",
              "rgb(255, 205, 86)",
              "rgb(201, 203, 207)",
              "rgb(54, 162, 235)",
              "rgb(240, 162, 2)",
              "rgb(123, 158, 137)",
              "rgb(171, 35, 70)",
            ],
          },
        ],
      },
      options: {
        elements: {
          line: {
            borderWidth: 3,
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
      <NavLink href="/">Página Principal</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="/#/integrations/">volver</NavLink>
    </NavItem>
  </Nav>

  <div>
    <h2>Integración API SOS children-employment</h2>
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
