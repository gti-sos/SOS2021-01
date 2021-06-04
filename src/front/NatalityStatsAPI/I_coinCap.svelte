<script>
  import { Nav, NavItem, NavLink } from "sveltestrap";
  //Uso de API externa coincap.io
  var coinsName = [];
  var coinsValue = [];
  var msg = "";

  /**
   * Obtiene los datos de la API externa
   */
  async function getStats() {
    console.log("Fetching data...");

    const res = await fetch("https://api.coincap.io/v2/assets");

    if (res.ok) {
      const json = await res.json();

      json.data.forEach((element) => {
        coinsName.push(element.symbol);
        coinsValue.push(element.priceUsd);
      });

      msg = "";
      console.log("Ok");
    } else {
      msg = "Error recuperando datos de coinCap";

      console.log("ERROR!" + msg);
    }
  }
  /**
   * Carga los datos en la grafica
   */
  async function loadChart() {
    await getStats();

    var ctx = document.getElementById("myChart").getContext("2d");

    var myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: coinsName,
        datasets: [
          {
            label: "Precio en USD de criptomonedas",
            data: coinsValue,
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
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Comparativa del precio de criptomonedas'
            }
        },
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
      <NavLink id="nav_home" href="/">Página Principal</NavLink>
    </NavItem>
    <NavItem>
      <NavLink id="nav_integrations" href="/#/integrations/"
        >Integraciones</NavLink
      >
    </NavItem>
    <NavItem>
      <NavLink id="nav_restcountries" href="/#/integrations/restcountries"
        >restcountries</NavLink
      >
    </NavItem>
    <NavItem>
      <NavLink disabled id="nav_coinCap" href="/#/integrations/coinCap"
        >coinCap</NavLink
      >
    </NavItem>
    <NavItem>
      <NavLink id="nav_vatRates" href="/#/integrations/vatRates"
        >vatRates</NavLink
      >
    </NavItem>
    <NavItem>
      <NavLink id="nav_sanityStats" href="/#/integrations/sanityStats"
        >sanityStats</NavLink
      >
    </NavItem>
    <NavItem>
      <NavLink id="nav_platformsStats" href="/#/integrations/platformsStats"
        >platformsStats</NavLink
      >
    </NavItem>
    <NavItem>
      <NavLink id="nav_povertyRisks" href="/#/integrations/povertyRisks"
        >povertyRisks</NavLink
      >
    </NavItem>
    <NavItem>
      <NavLink id="nav_illiteracy" href="/#/integrations/illiteracy"
        >illiteracy</NavLink
      >
    </NavItem>
    <NavItem>
      <NavLink id="nav_chidrenHIV" href="/#/integrations/chidrenHIV"
        >chidrenHIV</NavLink
      >
    </NavItem>
    <NavItem>
      <NavLink
        id="nav_childrenEmployment"
        href="/#/integrations/childrenEmployment">childrenEmployment</NavLink
      >
    </NavItem>
    <NavItem>
      <NavLink id="nav_unemployment" href="/#/integrations/unemployment"
        >unemployment</NavLink
      >
    </NavItem>
  </Nav>

  <div>
    <h2>Uso API externa coinCap.io</h2>
  </div>

  {#if msg}
    <p>{msg}</p>
  {:else}
    <div class="chart-container">
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
