<script>
  import { Nav, NavItem, NavLink } from "sveltestrap";
  //Uso de API externa restcountries.eu
  var countries = [];
  var standardRates = [];
  var errorMsg = "";
  var okMsg = "";

  async function getStats() {
    console.log("Fetching data...");

    const res = await fetch("/rates.json");

    if (res.ok) {
      const json = await res.json();

      Object.keys(json.rates).forEach(function (key) {
        countries.push(json.rates[key].country);
        standardRates.push(json.rates[key].standard_rate)
      });

      console.log(`We have received ${countries.length} countries.`);

      console.log("Ok");
    } else {
      errorMsg = "Error recuperando datos de vatRates";
      okMsg = "";
      console.log("ERROR!" + errorMsg);
    }
  }

  async function loadChart() {
    await getStats();

    var ctx = document.getElementById("myChart").getContext("2d");

    var xAxis = countries;
    var yAxis = standardRates;
 

    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: xAxis,
        datasets: [
          {
            label: "% IVA de países europeos",
            data: yAxis,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
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
    <h2>Uso API externa euvatrates.com</h2>
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