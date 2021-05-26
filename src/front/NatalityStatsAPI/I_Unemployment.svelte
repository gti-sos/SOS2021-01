<script>
  import { Nav, NavItem, NavLink } from "sveltestrap";

  //Uso API grupo 10
  const BASE_CONTACT_API_PATH = "/api/v2";

  var unemploymentData = [];
  var natalityData = [];
  var errorMsg = "";
  var okMsg = "";

  async function loadApi() {
    console.log("Loading data...");
    const res = await fetch("/api/v2/unemployment-stats/loadinitialdata").then(
      function (res) {
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
      }
    );
  }

  async function loadStats() {
    console.log("Loading data...");
    const res = await fetch(
      BASE_CONTACT_API_PATH + "/natality-stats/loadInitialData"
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

  async function getUnemploymentData() {
    console.log("Fetching data...");
    await loadApi();
    const res = await fetch("/api/v2/unemployment-stats");

    if (res.ok) {
      const json = await res.json();
      unemploymentData = json;

      console.log(
        `We have received ${unemploymentData.length} unemployment-stats.`
      );

      console.log("Ok");
    } else {
      errorMsg = "Error recuperando datos de unemployment-stats";
      okMsg = "";
      console.log("ERROR!" + errorMsg);
    }
  }

  function jsonToMap(j, k, v) {
    var res = new Map();
    j.forEach((element) => {
      var key = parseInt(element[k]);
      var value = parseFloat(element[v]);
      if (isNaN(value)) {
        value=0;
      }else{
        if (res.has(key)) {
          var newValue = res.get(key) + value;
          res.set(key, newValue);
        } else {
          res.set(key, value);
        }
      }
    });
    return res;
  }

  function commonValues(dataset1, dataset2) {
    console.log("dataset1: " + dataset1);
    console.log("dataset2: " + dataset2);
    return dataset1.filter((value) => dataset2.includes(value));
  }

  function capitalLetters(dataset) {
    for (let index = 0; index < dataset.length; index++) {
      var str = dataset[index];
      var space = str.indexOf(" ");
      console.log("pais :" + str);
      if (str.indexOf(" ") !== -1) {
        console.log("if :");
        dataset[index] =
          str.charAt(0).toUpperCase() +
          str.substr(1, space) +
          str.charAt(space + 1).toUpperCase() +
          str.substr(space + 2, str.length);
      } else {
        dataset[index] = str.charAt(0).toUpperCase() + str.substr(1);
      }
    }
    console.log(dataset);
  }

  async function loadChart() {
    await getStats();
    await getUnemploymentData();

    var data = [];
    var template = {
      x: 0,
      y: 0,
      r: 0,
    };
    var result = jsonToMap(unemploymentData, "year", "intperc");

    var result1 = jsonToMap(natalityData, "date", "fertility-rate");

    var commonYears = commonValues(
      Array.from(result.keys()),
      Array.from(result1.keys())
    );
    

    console.log("-Comonyear---------"+commonYears);
    
    for (let index = 0; index < commonYears.length; index++) {
      var element = parseInt(commonYears[index]);

      console.log("FECHA: " + element);
      console.log("RESULT: " + result.get(element));
      console.log("RESULT1: " + result1.get(element));
      
      data.push(
        {
        x: element,
        y: Math.round(result.get(element)),
        r: Math.round(result1.get(element)),
       }
       );
    }
    console.log(data);
    var ctx = document.getElementById("myChart").getContext("2d");

    var myChart = new Chart(ctx, {
      type: "bubble",
      data: {
        datasets: [
          {
            label: "Porcentaje de paro y fertilidad (Año, Paro, Fertilidad)",
            data: data,
            backgroundColor: "rgb(255, 99, 132)",
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
      <NavLink href="/">Página Principal</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="/#/integrations/">volver</NavLink>
    </NavItem>
  </Nav>

  <div>
    <h2>Integración API SOS unemployment-stats</h2>
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
