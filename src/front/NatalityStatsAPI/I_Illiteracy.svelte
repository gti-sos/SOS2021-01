<script>
  import { Nav, NavItem, NavLink } from "sveltestrap";

  const BASE_CONTACT_API_PATH = "/api/v2";

  let natalityData = [];
  var illiteracyData = [];

  var msg = "";

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
   * Carga los datos de la API SOS
   */
  async function loadApi() {
    console.log("Loading data...");
    const res = await fetch("/api/v1/illiteracy/loadInitialData").then(
      function (res) {
        if (res.ok) {
          msg = "";
          console.log("OK");
        } else {
          if (res.status === 500) {
            msg = "No se ha podido acceder a la base de datos";
          }
          console.log("ERROR!" + msg);
        }
      }
    );
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
  async function getIlliteracyData() {
    console.log("Fetching data...");
    await loadApi();
    const res = await fetch("/api/v1/illiteracy");

    if (res.ok) {
      const json = await res.json();
      illiteracyData = json;

      console.log(
        `We have received ${illiteracyData.length} illiteracy-stats.`
      );
      msg="";
      console.log("Ok");
    } else {
      msg = "Error recuperando datos de poverty-risks";

      console.log("ERROR!" + msg);
    }
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
   * Obtiene la priemra letra mayuscula para un conjunto de strings en un array
   * @param dataset array de strings
   */
  function capitalLetters(dataset) {
    for (let index = 0; index < dataset.length; index++) {
      var str = dataset[index];
      var space = str.indexOf(" ");
      if (str.indexOf(" ") !== -1) {
        dataset[index] =
          str.charAt(0).toUpperCase() +
          str.substr(1, space) +
          str.charAt(space + 1).toUpperCase() +
          str.substr(space + 2, str.length);
      } else {
        dataset[index] = str.charAt(0).toUpperCase() + str.substr(1);
      }
    }
  }
  /**
   * Carga los datos en la grafica
   */
  async function loadChart() {
    await getStats();
    await getIlliteracyData();

    var result = jsonToMap(illiteracyData, "country", "adult_illiteracy_rate");
    var result1 = jsonToMap(natalityData, "country", "natality-rate");

    var commonCountries = commonValues(
      Array.from(result.keys()),
      Array.from(result1.keys())
    );

    var data = [];

    var countriesWithCapitalLetter = commonValues(
      Array.from(result.keys()),
      Array.from(result1.keys())
    );
    capitalLetters(countriesWithCapitalLetter);

    console.log("capitalletter country " + countriesWithCapitalLetter);
    console.log("common countries: " + commonCountries);

    var arrayAux = [];
    for (let j = 0; j < countriesWithCapitalLetter.length; j++) {
      var c = countriesWithCapitalLetter[j];
      arrayAux.push(result.get(c));
    }

    data.push({
      name: "Alfabetizacion de adultos",
      data: arrayAux,
    });

    arrayAux = [];
    for (let j = 0; j < commonCountries.length; j++) {
      var c = commonCountries[j];
      arrayAux.push(result1.get(c));
    }

    data.push({
      name: "Ratio de natalidad",
      data: arrayAux,
    });

    console.log(data);

    Highcharts.chart("container", {
      chart: {
        type: "area",
      },
      title: {
        text: "Comparativa del ratio de natalidad y la tasa de alfabetización en adultos",
      },
      xAxis: {
        categories: commonCountries,
        tickmarkPlacement: "on",
        title: {
          enabled: false,
        },
      },
      yAxis: {
        title: {
          text: "",
        },
      },
      plotOptions: {
        area: {
          stacking: "normal",
          lineColor: "#666666",
          lineWidth: 1,
          marker: {
            lineWidth: 1,
            lineColor: "#666666",
          },
        },
      },
      series: data,
    });
  }
</script>

<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js"></script>
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
      <NavLink id="nav_integrations" href="/#/integrations/">Integraciones</NavLink>
    </NavItem>
    <NavItem>
      <NavLink id="nav_restcountries" href="/#/integrations/restcountries">restcountries</NavLink>
    </NavItem>
    <NavItem>
      <NavLink id="nav_coinCap" href="/#/integrations/coinCap">coinCap</NavLink>
    </NavItem>
    <NavItem>
      <NavLink id="nav_vatRates" href="/#/integrations/vatRates">vatRates</NavLink>
    </NavItem>
    <NavItem>
      <NavLink id="nav_sanityStats" href="/#/integrations/sanityStats">sanityStats</NavLink>
    </NavItem>
    <NavItem>
      <NavLink id="nav_platformsStats" href="/#/integrations/platformsStats">platformsStats</NavLink>
    </NavItem>
    <NavItem>
      <NavLink id="nav_povertyRisks" href="/#/integrations/povertyRisks">povertyRisks</NavLink>
    </NavItem>
    <NavItem>
      <NavLink disabled id="nav_illiteracy" href="/#/integrations/illiteracy">illiteracy</NavLink>
    </NavItem>
    <NavItem>
      <NavLink id="nav_chidrenHIV" href="/#/integrations/chidrenHIV">chidrenHIV</NavLink>
    </NavItem>
    <NavItem>
      <NavLink id="nav_childrenEmployment" href="/#/integrations/childrenEmployment">childrenEmployment</NavLink>
    </NavItem>
    <NavItem>
      <NavLink id="nav_unemployment" href="/#/integrations/unemployment">unemployment</NavLink>
    </NavItem>
  </Nav>


  <div>
    <h2>Integración API SOS illiteracy</h2>
    <p>por favor espere unos segundos a que se cargue la gráfica</p>
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
  #container {
    height: 400px;
  }

  .highcharts-figure,
  .highcharts-data-table table {
    min-width: 310px;
    max-width: 800px;
    margin: 1em auto;
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
