<script>
  import { Button, Nav, NavItem, NavLink } from "sveltestrap";

  const BASE_CONTACT_API_PATH = "/api/v1";
  const BASE_CONTACT_API_PATH_v2 = "/api/v2";

  let natalityData = [];
  let natalityChartData = [];
  let divorceData = [];
  let divorceChartData = [];

  let dates = [];
  let msg = "";

  function distinctRecords(MYJSON, prop) {
    return MYJSON.filter((obj, pos, arr) => {
      return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }

  async function loadChart() {
    console.log("Fetching data...");

    const res = await fetch(BASE_CONTACT_API_PATH_v2 + "/natality-stats");
    const res1 = await fetch(BASE_CONTACT_API_PATH_v2 + "/divorce-stas");
    
    if (res.ok || res1.ok) {
      if(res.ok){
      natalityData = await res.json();
      console.log("RES OK");
      //Quitamos fechas repetidas y las ordenamos
      var distinctDates = distinctRecords(natalityData, "date");
      distinctDates.sort(function (a, b) {
        return a.date - b.date;
      });
      distinctDates.forEach((element) => {
        dates.push(element.date);
        console.log("dates: " + element.date);
      });
      console.log("Distintc dates: " + dates);

      //Sumamos los valores para las fechas iguales
      distinctDates.forEach((e) => {
        var yAxis = natalityData
          .filter((d) => d.date === e.date)
          .map((nr) => nr["natality-rate"])
          .reduce((acc, nr) => nr + acc);
        console.log("YAxis: " + yAxis);
        natalityChartData.push(yAxis);
      });
      msg="";
    }
    if(res1.ok){
      divorceData = await res1.json();
      console.log("RES OK");
      //Quitamos fechas repetidas y las ordenamos
      var distinctDates1 = distinctRecords(divorceData, "date");
      distinctDates.sort(function (a, b) {
        return a.date - b.date;
      });
      distinctDates1.forEach((element) => {
        dates.push(element.date);
        console.log("dates: " + element.date);
      });
      console.log("Distintc dates: " + dates);

      //Sumamos los valores para las fechas iguales
      distinctDates.forEach((e) => {
        var yAxis = divorceData
          .filter((d) => d.date === e.date)
          .map((dr) => dr["divorce-rate"])
          .reduce((acc, dr) => dr + acc);
        console.log("YAxis: " + yAxis);
        divorceChartData.push(yAxis);
      });
      msg="";

    }
    }else{
      console.log("ERROR MSG");
      msg = "Por favor primero cargue los datos en al menos una de las APIs";
    }
    
    console.log("Natality Chart DaTa: " + natalityChartData);

    Highcharts.chart("container", {
      title: {
        text: "natality-stats / divorce-stats / life-stats",
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
      <NavLink href="/">Volver</NavLink>
    </NavItem>
  </Nav>
  
  <div>
    <h2>
      Análiticas
    </h2>
  </div>
  
{#if msg}
<p>{msg}</p>
{:else}
  <figure class="highcharts-figure">
    <div id="container" />
    <p class="highcharts-description">
      Gráfico de líneas básico que muestra las tendencias del índice de
      natalidad, divorcios y estilo de vida.
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
