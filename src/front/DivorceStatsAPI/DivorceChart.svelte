<script>
    import { onMount } from "svelte";
  
    import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
  
    const BASE_CONTACT_API_PATH = "/api/v2";
  
    let divorceData = [];
    let divorceChartData = [];
  
  let divorceChartCountryDateData = [];
  let divorceChartMarriageRateData = [];
  let divorceChartDivorceRateData = [];
  let divorceChartRatioActualData = [];
  let divorceChartRatioPercentData = [];
  
  
    let errorMsg = "";
    let okMsg = "";
  
    function distinctRecords(MYJSON, prop) {
      return MYJSON.filter((obj, pos, arr) => {
        return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos;
      });
    }
  
    async function loadChart() {
      console.log("Fetching data...");
  
      const res = await fetch(BASE_CONTACT_API_PATH + "/divorce-stats");
      divorceData = await res.json();
  
      if (res.ok) {
        divorceData.forEach(stat => {
        divorceChartCountryDateData.push(stat.country+"-"+stat.date);
        divorceChartMarriageRateData.push(stat["marriage-rate"]);
        divorceChartDivorceRateData.push(stat["divorce-rate"]);
        divorceChartRatioActualData.push(stat["ratio-actual"]);
        divorceChartRatioPercentData.push(stat["ratio-percent"])
        });
      }
      
      console.log("divorce Chart DaTa: " + divorceChartData);
  
      Highcharts.chart("container", {
        title: {
          text: "divorce-stats",
        },
        yAxis: {
          title: {
            text: "Valor",
          },
        },
        xAxis: {
          title: {
            text: "País-Año",
          },
          categories: divorceChartCountryDateData,
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
            name: "Porcentaje de matrimonios",
            data: divorceChartMarriageRateData,
          },
          {
            name: "Porcentaje de divorcios",
            data: divorceChartDivorceRateData,
          },
          {
            name: "Ratio actual",
            data: divorceChartRatioActualData,
          },
          {
            name: "Ratio porcentual (%)",
            data: divorceChartRatioPercentData,
          }
          
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
        <NavLink href="/">Página Principal</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#/divorce-stats">Interfaz</NavLink>
      </NavItem>
    </Nav>
  
    <div>
      <h2>
        Análiticas
      </h2>
    </div>
  
    <div>
      {#if errorMsg}
        <p class="msgRed" style="color: #9d1c24">ERROR: {errorMsg}</p>
      {/if}
      {#if okMsg}
        <p class="msgGreen" style="color: #155724">{okMsg}</p>
      {/if}
    </div>
  
    <div>
      <figure class="highcharts-figure">
        <div id="container" />
        <p class="highcharts-description">
          Gráfico de líneas básico que muestra los diferentes valores para los campos de divorce-stats.
        </p>
      </figure>
    </div>
  </main>
  
  <style>
    main {
      text-align: center;
      padding: 1em;
      margin: 0 auto;
    }
    div{
      margin-bottom: 15px;
    }
    p {
      display: inline;
    }
    .msgRed {
      padding: 8px;
  
      background-color: #f8d7da;
    }
    .msgGreen {
      padding: 8px;
  
      background-color: #d4edda;
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
  