<script>
  import { Nav, NavItem, NavLink } from "sveltestrap";

  const BASE_CONTACT_API_PATH = "/api/v2";

  var hivData = [];
  var natalityData = [];
  var msg = "";

  /**
   * Carga los datos de la API SOS
   */
  async function loadApi() {
    console.log("Loading data...");
    const res = await fetch(
      "https://sos2021-24.herokuapp.com/api/v2/children-with-hiv/loadInitialData"
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
  async function getHivData() {
    console.log("Fetching data...");
    await loadApi();
    const res = await fetch(
      "https://sos2021-24.herokuapp.com/api/v2/children-with-hiv"
    );

    if (res.ok) {
      const json = await res.json();
      hivData = json;

      console.log(`We have received ${hivData.length} hiv-stats.`);

      console.log("Ok");
    } else {
      msg = "Error recuperando datos de poverty-risks";
      console.log("ERROR!" + msg);
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
   * A partir de dos Arrays de datos se obtiene la interseccion
   * @param dataset1 array 1
   * @param dataset2 array 2
   */
  function commonValues(dataset1, dataset2) {
    var data1 = dataset1.map(function (v) {
      return v.toLowerCase();
    });
    var data2 = dataset2.map(function (v) {
      return v.toLowerCase();
    });
    return data1.filter((value) => data2.includes(value));
  }

  /**
   * Carga los datos en la grafica
   */
  async function loadChart() {
    await getStats();
    await getHivData();

    var data = [];
    var data1 = [];

    var result = jsonToMap(hivData, "country", "living_with");

    var result1 = jsonToMap(natalityData, "country", "natality-rate");

    var commonCountries = commonValues(
      Array.from(result.keys()),
      Array.from(result1.keys())
    );

    console.log("common countries: " + commonCountries);

    console.log("Calculating children-hiv...");
    for (let [key, value] of result) {
      if (commonCountries.includes(key.toLowerCase())) {
        data.push(value);
      }
    }

    console.log("Calculating natality-stats...");
    for (let [key, value] of result1) {
      if (commonCountries.includes(key)) {
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
            text: "Nacimientos y niños con VIH para los países en común de ambas APIs",
            padding: {
              top: 10,
              bottom: 30,
            },
          },
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
      <NavLink id="nav_coinCap" href="/#/integrations/coinCap">coinCap</NavLink>
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
      <NavLink disabled id="nav_chidrenHIV" href="/#/integrations/chidrenHIV"
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
    <h2>Integración API SOS children-hiv</h2>
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
</style>
