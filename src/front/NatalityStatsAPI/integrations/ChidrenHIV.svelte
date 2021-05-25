<script>
  import { Nav, NavItem, NavLink } from "sveltestrap";

  //Uso API grupo 10
  const BASE_CONTACT_API_PATH = "/api/v2";

  var hivData = [];
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

  async function getHivData() {
    console.log("Fetching data...");

    const res = await fetch(
      "https://sos2021-24.herokuapp.com/api/v2/children-with-hiv"
    );

    if (res.ok) {
      const json = await res.json();
      hivData = json;

      console.log(`We have received ${hivData.length} hiv-stats.`);

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

  function commonValues(dataset1, dataset2){
    console.log("dataset1: "+dataset1);
    console.log("dataset2: "+dataset2);
    var data1 = dataset1.map(function(v) {
    return v.toLowerCase();
     });
var data2 = dataset2.map(function(v) {
  return v.toLowerCase();
});
    return data1.filter(value => data2.includes(value));
  }

  async function loadChart() {
    await getStats();
    await getHivData();

    var countries = [];
    var data = [];
    var data1 = [];

   
  
    var result = jsonToMap(hivData, "country", "living_with");
    
    
    var result1 = jsonToMap(natalityData, "country", "natality-rate");

    var commonCountries = commonValues(Array.from(result.keys()), Array.from(result1.keys()));
    
    console.log("common countries: "+commonCountries);
    
    console.log("Calculating children-hiv...");
    for (let [key, value] of result) {
      if(commonCountries.includes(key.toLowerCase())){
        console.log("ENCONTRADO: para pais: "+key)
        data.push(value);
      }
      
    }

    console.log("Calculating natality-stats...");
    for (let [key, value] of result1) {
      if(commonCountries.includes(key)){
      console.log("ENCONTRADO: para pais: "+key)
      data1.push(value);
      }
    }

    var ctx = document.getElementById("myChart").getContext("2d");

    var myChart = new Chart(ctx, {
      type: "radar",
      data: {
        labels: commonCountries,
        datasets: [
          {
            label: "Niños viviendo con VIH",
            data: data,
            fill: true,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgb(255, 99, 132)",
            pointBackgroundColor: "rgb(255, 99, 132)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(255, 99, 132)",
          },
          {
            label: "Nacimientos",
            data: data1,
            fill: true,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgb(54, 162, 235)",
            pointBackgroundColor: "rgb(54, 162, 235)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(54, 162, 235)",
          },
        ],
      },
      options: {
        plugins: {
            title: {
                display: true,
                text: 'Nacimientos y niños con VIH para los países en común de ambas APIs',
                padding: {
                    top: 10,
                    bottom: 30
                }
            }
        },
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
    <h2>Integración API SOS children-hiv</h2>
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
