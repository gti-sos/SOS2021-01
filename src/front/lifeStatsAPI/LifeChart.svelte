<script>

    import{Nav, NavItem, NavLink } from "sveltestrap";
    const BASE_LIFE_API_PATH = "/api/v2";

    let lifeData=[];
    let lifeChartCountryDate = [];
    let lifeChartQualityLifeI = [];
    let lifeChartPurchasingPowerI = [];
    let lifeChartSafetyI = [];

    let errorMsg="Tiene que cargar los datos para visualizar las analíticas.";
    let cargados = false;

    async function loadChart() {
        console.log("Fetching data...");

        const res = await fetch(BASE_LIFE_API_PATH + "/life-stats");
        lifeData = await res.json();

        if (res.ok) {
            lifeData.forEach(stat => {
            lifeChartCountryDate.push(stat.country+"-"+stat.date);
            lifeChartQualityLifeI.push(stat["quality_life_index"]);
            lifeChartPurchasingPowerI.push(stat["purchasing_power_index"]);
            lifeChartSafetyI.push(stat["safety_index"]);  
            });
            cargados=true;
        }
        
    console.log("Life Chart Data: " + lifeData);
            
        Highcharts.chart('container', {

            title: {
                text: 'Life-stats'
            },

            yAxis: {
                title: {
                    text: 'Valor'
                }
            },

            xAxis: {
                title: {
                    text: 'País-Año'
                },
                categories: lifeChartCountryDate,
            },

            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
        
         
        
            series: [{
                name: 'Índice de calidad de vida',
                data: lifeChartQualityLifeI,
            }, {
                name: 'Índice de poder adquisitivo',
                data: lifeChartPurchasingPowerI,
            }, {
                name: 'Índice de seguridad',
                data: lifeChartSafetyI,
            }],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
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
          <NavLink href="#/life-stats">Datos</NavLink>
        </NavItem>
    </Nav>

    <div>
        <h2>
          Análiticas
        </h2>
      </div>

    <div>
        <figure class="highcharts-figure">
          <div id="container" />
          <p class="highcharts-description">
            Gráfico de líneas básico que muestra los diferentes valores para los campos de life-stats.
          </p>
        </figure>
    </div>

    <div>
      {#if !cargados}
        <p class="error">{errorMsg}</p>
      {/if}
    </div>
</main>

<style>
    main {
        text-align: center;
        padding: 30px;       
    }
    p.error{
      color: red; 
      text-align:center;
      font-size: 20px;
      margin-top:80px;
    }

    
    .highcharts-figure,
    .highcharts-data-table table {
    /*min-width: 360px;
    max-width: 800px;*/
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