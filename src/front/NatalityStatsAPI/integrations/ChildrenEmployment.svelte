<!-- <script>
  import { element } from "svelte/internal";

  import { Nav, NavItem, NavLink } from "sveltestrap";

  //Uso API grupo 10
  const BASE_CONTACT_API_PATH = "/api/v2";

  var emplymentData = [];
  var natalityData = [];
  var data = [];
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
      emplymentData = json;

      console.log(`We have received ${emplymentData.length} platforms-stats.`);

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

    var data = [];
    var data1 = [];
    var template = {
      x: 0,
      y: 0
    };
    //-------------------Sanity-stats
    console.log("Calculating platforms-stats...");
    var result = jsonToMap(emplymentData, "year","sold-unit");
    
    console.log(result);
    for (let [key, value] of result) {
      data.push({
        x: parseInt(key),
        y: parseInt(value)
      });
    }
    
    


    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("Calculating natality-stats...");
    var result1 = jsonToMap(natalityData, "date","born");
    
    console.log(result1);
    for (let [key, value] of result1) {
      data1.push({
        x: parseInt(key),
        y: parseInt(value)
      });
    }
   

    var ctx = document.getElementById("myChart").getContext("2d");

    var myChart = new Chart(ctx, {
      type: "scatter",
      data:{
        label: 'Scatter Dataset',
        datasets: [
        {
          label: "Consolas Nintendo 3DS por año",
          data: data,
          backgroundColor: "rgba(255, 0,0, 1)",
        }, {
          label: "Nacidos por año",
          data: data1,
          backgroundColor: "rgba(0,0,255, 1)",
        }],
      },
      
      options: {
        scales: {
          x: {
            type: "linear",
            position: "bottom",
            ticks: {
            stepSize: 1
            }
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
 -->