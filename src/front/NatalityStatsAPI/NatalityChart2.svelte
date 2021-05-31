<script>
  import { onMount } from "svelte";

  import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";

  const BASE_CONTACT_API_PATH = "/api/v2";

  let natalityData = [];

  var msg = "";
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

      msg = "";
      console.log(`We have received ${natalityData.length} natality-stats.`);
    } else {
      console.log("Error");
      msg = "Error al cargar los datos de la API";
    }
  }
  function jsonToMap(j, k, v) {
    var res = new Map();
    j.forEach((element) => {
      var key = parseInt(element[k]);
      var value = parseInt(element[v]);
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
    console.log("Ploting data...");
    await getStats();

    var ctx = document.getElementById("myChart").getContext("2d");

    var resultMen = jsonToMap(natalityData, "date", "men-born");
    var resultWomen = jsonToMap(natalityData, "date", "women-born");

    var years = [];
    var menData = [];
    var womenData = [];

    for (let [key, value] of resultMen) {
      years.push(key);
      menData.push(value);
    }
    for (let [key, value] of resultWomen) {
      womenData.push(value);
    }

    var myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: years,
        datasets: [
          {
            label: "Hombres nacidos",
            data: menData,
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
            borderColor: ["rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          },
          {
            label: "Mujeres nacidas",
            data: womenData,
            backgroundColor: ["rgba(255, 159, 64, 0.2)"],
            borderColor: ["rgba(255, 159, 64, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        plugins: {
          legend: {
            position: "top",
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
      <NavLink id="nav_interface" href="/#/natality-stats">Interfaz</NavLink>
    </NavItem>
    <NavItem>
      <NavLink id="nav_nat_analytics" href="/#/natality-stats/natalityChart"
        >Análiticas todos los campos</NavLink
      >
    </NavItem>
    <NavItem>
      <NavLink
        disabled
        id="nav_nat_analytics2"
        href="/#/natality-stats/natalityChart2"
        >Análiticas hombres y mujeres nacidos</NavLink
      >
    </NavItem>
  </Nav>

  <div>
    <h2>Análiticas Hombres y mujeres nacidos</h2>
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
  p {
    display: inline;
  }
</style>
