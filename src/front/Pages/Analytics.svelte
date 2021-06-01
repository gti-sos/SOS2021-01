<script>
  import { Nav, NavItem, NavLink } from "sveltestrap";

  const BASE_CONTACT_API_PATH_v2 = "/api/v2";

  let natalityData = [];
  let natalityChartData = [];
  let divorceData = [];
  let divorceChartData = [];
  let lifeData = [];
  let lifeChartData = [];

  var dates = [];
  let msg = "";

  /**
   * Obtenemos una propiedad JSON sin repetidos
   * @param MYJSON
   * @param prop
   */
  function distinctRecords(MYJSON, prop) {
    return MYJSON.filter((obj, pos, arr) => {
      return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }

  async function loadChart() {
    console.log("Fetching data...");

    //Cargamos los datos de las APIs
    await fetch(BASE_CONTACT_API_PATH_v2 + "/natality-stats/loadInitialData");
    await fetch(BASE_CONTACT_API_PATH_v2 + "/divorce-stats/loadInitialData");
    await fetch(BASE_CONTACT_API_PATH_v2 + "/life-stats/loadInitialData");

    //Obtenemos los datos de las APIs
    const res = await fetch(BASE_CONTACT_API_PATH_v2 + "/natality-stats");
    const res1 = await fetch(BASE_CONTACT_API_PATH_v2 + "/divorce-stats");
    const res2 = await fetch(BASE_CONTACT_API_PATH_v2 + "/life-stats");

    if (res.ok && res1.ok && res2.ok) {
      
      console.log("procesing Divorce data....");
      if (res1.ok) {
        divorceData = await res1.json();
        console.log("RES OK");
        //Quitamos fechas repetidas 
        var distinctDates1 = distinctRecords(divorceData, "date");
        //y las ordenamos
        distinctDates1.sort(function (a, b) {
          return a.date - b.date;
        });
        //guardamos las fechas para la grafica
        distinctDates1.forEach((element) => {
          dates.push(element.date);
        });
        

        //Sumamos los valores para las fechas iguales
        dates.forEach((e) => {
          var yAxis = divorceData
            .filter((d) => d.date === e)
            .map((dr) => dr["divorce-rate"])
            .reduce((acc, dr) => dr + acc);
          
          divorceChartData.push(Math.round(yAxis));
        });
        msg = "";
      }

      console.log("procesing Natality data....");
      if (res.ok) {
        natalityData = await res.json();
        console.log("RES OK");
        
        //Quitamos fechas repetidas 
        var distinctDates = distinctRecords(natalityData, "date");
        //y las ordenamos
        distinctDates.sort(function (a, b) {
          return a.date - b.date;
        });
        //Añadimos las fechas que no existen
        distinctDates.forEach((element) => {
          if (!dates.includes(element.date)) {
            dates.push(element.date);
          }
        });
        
        //Sumamos los valores para las fechas iguales
        dates.forEach((e) => {
          var yAxis = natalityData
            .filter((d) => d.date === e)
            .map((nr) => nr["natality-rate"])
            .reduce((acc, nr) => nr + acc, 0);
          natalityChartData.push(Math.round(yAxis));
        });
        msg = "";
      }

      console.log("procesing Life data....");
      if (res2.ok) {
        lifeData = await res2.json();
        console.log("RES2 OK");
        //Quitamos fechas repetidas 
        var distinctDates = distinctRecords(lifeData, "date");
         //y las ordenamos
        distinctDates.sort(function (a, b) {
          return a.date - b.date;
        });
         //Añadimos las fechas que no existen
        distinctDates.forEach((element) => {
          if (!dates.includes(element.date)) {
            dates.push(element.date);
          }
        });

        //Sumamos los valores para las fechas iguales
        dates.forEach((e) => {
          var yAxis = lifeData
            .filter((d) => d.date === e)
            .map((qli) => qli["quality_life_index"])
            .reduce((acc, qli) => qli + acc, 0);
          lifeChartData.push(Math.round(yAxis));
        });
        msg = "";
      }
    } else {
      console.log("ERROR "+msg);
      msg = "Por favor primero cargue los datos en todas las APIs";
    }

    //Creamos la grafica
    Highcharts.chart("container", {
      chart: {
        type: "bar",
      },
      title: {
        text: "Integración de grupo",
      },
      yAxis: {
        title: {
          text: "Ratio",
        },
      },
      xAxis: {
        title: {
          text: "Años",
        },
        categories: dates,
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
      },
      annotations: [
        {
          labels: [
            {
              point: "date",
              text: "",
            },
            {
              point: "min",
              text: "Min",
              backgroundColor: "white",
            },
          ],
        },
      ],
      series: [
        {
          name: "Ratio de natalidad (%)",
          data: natalityChartData,
        },
        {
          name: "Ratio de divorcios (%)",
          data: divorceChartData,
        },
        {
          name: "Índice de calidad de vida",
          data: lifeChartData,
        },
      ],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom",
              },
            },
          },
        ],
      },
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
      <NavLink id="nav_info" href="/#/info">Info</NavLink>
    </NavItem>
    <NavItem>
      <NavLink disabled id="nav_analytics" href="/#/analytics"
        >Analíticas</NavLink
      >
    </NavItem>
    <NavItem>
      <NavLink id="nav_integrations" href="/#/integrations"
        >Integraciones</NavLink
      >
    </NavItem>
    <NavItem>
      <NavLink id="nav_about" href="/#/about">Acerca de</NavLink>
    </NavItem>
  </Nav>

  <div>
    <h1>Analíticas</h1>
  </div>

  {#if msg}
    <p>{msg}</p>
  {:else}
    <figure class="highcharts-figure">
      <div id="container" />
      <p class="highcharts-description">
        Gráfico de líneas básico que muestra las tendencias anuales para todos
        los países, para el índice de estilo de vida y los ratios de natalidad y
        divorcios.
      </p>
    </figure>
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
  .highcharts-figure,
  .highcharts-data-table table {
    min-width: 360px;
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
