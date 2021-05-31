<script>
  import { onMount } from "svelte";

  import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";

  const BASE_CONTACT_API_PATH = "/api/v2";

  let natalityData = [];

  let natalityChartCountryDateData = [];
  let natalityChartBornData = [];
  let natalityChartMenBornData = [];
  let natalityChartWomenBornData = [];
  let natalityChartNatalityRateData = [];
  let natalityChartFertilityRateData = [];

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
        console.log("ERROR!" + msg);
      }
    });
  }

  async function loadChart() {
    console.log("Fetching data...");
    await loadStats();
    const res = await fetch(BASE_CONTACT_API_PATH + "/natality-stats");

    if (res.ok) {
      console.log("OK");
      natalityData = await res.json();
      natalityData.forEach((stat) => {
        natalityChartCountryDateData.push(stat.country + "-" + stat.date);
        natalityChartBornData.push(stat.born);
        natalityChartMenBornData.push(stat["men-born"]);
        natalityChartWomenBornData.push(stat["women-born"]);
        natalityChartNatalityRateData.push(stat["natality-rate"]);
        natalityChartFertilityRateData.push(stat["fertility-rate"]);
        msg = "";
      });
    } else {
      console.log("Error");
      msg = "Por favor primero cargue los datos de la API";
    }

    console.log("Natality Chart DaTa: " + natalityChartCountryDateData.length);

    Highcharts.chart("container", {
      chart: {
        type: "column",
      },
      title: {
        text: "",
      },
      xAxis: {
        categories: natalityChartCountryDateData,
        title: {
          text: "País-Año",
        },
        scrollbar: {
          enabled: true,
        },
        tickLength: 0,
      },

      yAxis: {
        min: 0,
        title: {
          text: "Valores",
        },
      },

      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: [
        {
          name: "Nacidos",
          data: natalityChartBornData,
        },
        {
          name: "Hombres nacidos",
          data: natalityChartMenBornData,
        },
        {
          name: "Mujeres nacidas",
          data: natalityChartWomenBornData,
        },
        {
          name: "Ratio natalidad",
          data: natalityChartNatalityRateData,
        },
        {
          name: "Indice fecundación",
          data: natalityChartFertilityRateData,
        },
      ],
    });
  }
</script>

<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/modules/series-label.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/export-data.js"></script>

  <script
    src="https://code.highcharts.com/modules/accessibility.js"
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
      <NavLink
        disabled
        id="nav_nat_analytics"
        href="/#/natality-stats/natalityChart"
        >Analíticas todos los campos</NavLink
      >
    </NavItem>
    <NavItem>
      <NavLink id="nav_nat_analytics2" href="/#/natality-stats/natalityChart2"
        >Analíticas hombres y mujeres nacidos</NavLink
      >
    </NavItem>
  </Nav>

  <div>
    <h2>Analítica mostrando todos los campos de natality-stats</h2>
  </div>

  {#if msg}
    <p>{msg}</p>
  {:else}
    <figure class="highcharts-figure">
      <div id="container" />
    </figure>
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

  .highcharts-figure,
  .highcharts-data-table table {
    min-width: 310px;
    max-width: 800px;
    margin: 1em auto;
  }

  #container {
    height: 500px;
  }

  .highcharts-data-table table {
    font-family: Verdana, sans-serif;
    border-collapse: collapse;
    border: 1px solid #ebebeb;
    margin: 10px auto;
    text-align: center;
    width: 100%;
    max-width: 500px;
  }
  .highcharts-data-table caption {
    padding: 1em 0;
    font-size: 1.2em;
    color: #555;
  }
  .highcharts-data-table th {
    font-weight: 600;
    padding: 0.5em;
  }
  .highcharts-data-table td,
  .highcharts-data-table th,
  .highcharts-data-table caption {
    padding: 0.5em;
  }
  .highcharts-data-table thead tr,
  .highcharts-data-table tr:nth-child(even) {
    background: #f8f8f8;
  }
  .highcharts-data-table tr:hover {
    background: #f1f7ff;
  }
</style>
