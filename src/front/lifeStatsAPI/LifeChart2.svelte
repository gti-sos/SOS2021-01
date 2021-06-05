<script>

  import{Nav, NavItem, NavLink } from "sveltestrap";
  const BASE_LIFE_API_PATH = "/api/v2";

  let lifeData=[];
  let lifeChartQualityLifeI = [];
  let lifeChartPurchasingPowerI = [];
  let lifeChartSafetyI = [];

  async function loadChart() {
      console.log("Fetching data...");

      const res = await fetch(BASE_LIFE_API_PATH + "/life-stats");
      lifeData = await res.json();

      lifeData.forEach((stat) => {
          let res1 = { 
          'name': stat.country+"-"+stat.date,
          'value': stat["quality_life_index"]
        };
        let res2 = { 
          'name': stat.country+"-"+stat.date,
          'value': stat["purchasing_power_index"]
        };
        let res3 = { 
          'name': stat.country+"-"+stat.date,
          'value':stat["safety_index"]
        };
        lifeChartQualityLifeI.push(res1);
        lifeChartPurchasingPowerI.push(res2); 
        lifeChartSafetyI.push(res3);
      });  


        Highcharts.chart('container', {
          chart: {
              type: 'packedbubble',
              height: '100%'
          },
          title: {
              text: 'Life-stats'
          },
          tooltip: {
              useHTML: true,
              pointFormat: '<b>{point.name}:</b> {point.value} puchasing power'
          },
          plotOptions: {
              packedbubble: {
                  minSize: '30%',
                  maxSize: '100%',
                  zMin: 0,
                  zMax: 1000,
                  layoutAlgorithm: {
                      splitSeries: false,
                      gravitationalConstant: 0.02
                  },
                  dataLabels: {
                      enabled: true,
                      format: '{point.name}',
                      filter: {
                          property: 'y',
                          operator: '>',
                          value: 250
                      },
                      style: {
                          color: 'black',
                          textOutline: 'none',
                          fontWeight: 'normal'
                      }
                  }
              }
          },
          series:  [{
              name: 'Index purchasing power',
              data: lifeChartPurchasingPowerI
          },
          {
              name: 'Index quality life',
              data: lifeChartQualityLifeI
          },
          {
              name: 'Index safety',
              data: lifeChartSafetyI
          }]

      });
  }        
    
</script>

<svelte:head>
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/highcharts-more.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js" on:load={loadChart}></script>
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
        Analítica con todos los campos
      </h2>
    </div>

    <figure class="highcharts-figure">
      <div id="container"></div>
      <p class="highcharts-description">
          Packed bubble charts are visualizations where the size and optionally
          the color of the bubbles are used to visualize the data. The positioning
          of the bubbles is not significant, but is optimized for compactness.
          Try dragging the bubbles in this chart around, and see the effects.
      </p>
  </figure>

</main>

<style>
  main {
      text-align: center;
      padding: 30px;       
  }

  
  .highcharts-figure, .highcharts-data-table table {
  min-width: 320px; 
  max-width: 800px;
  margin: 1em auto;
}

#container {
  height: 800px;
}
.highcharts-tooltip h3 {
margin: 0.3em 0;
}

.highcharts-data-table table {
font-family: Verdana, sans-serif;
border-collapse: collapse;
border: 1px solid #EBEBEB;
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
.highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
padding: 0.5em;
}
.highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
background: #f8f8f8;
}
.highcharts-data-table tr:hover {
background: #f1f7ff;
}

</style>