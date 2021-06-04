<script>

import { Nav, NavItem, NavLink } from "sveltestrap";
var errorMsg = "";
var data01 = [];
const BASE_API_URL_01 = "/api/v1/renewablepowercapacities-stats"

//INTEGRACION GRUPO 20
async function loadAPI() {
    console.log("Loading data...");
   // const BASE_API_URL_01 = "http://sos2021-20.herokuapp.com/api/v1/renewablepowercapacities-stats";
    const res = await fetch(BASE_API_URL_01).then(
      function (res) {
        if (res.ok) {
          errorMsg = "";
          console.log("OK");
        } else {
          if (res.status === 500) {
            errorMsg = "No se ha podido acceder a la base de datos";
          }
          console.log("ERROR!" + errorMsg);
        }
      }
    );
  }

  
  async function getData01() {
    console.log("Fetching data...");
    await loadAPI();
    const res = await fetch(BASE_API_URL_01);

    if (res.ok) {
      const json = await res.json();
      data01 = json;
    //  console.log(data01);
      console.log(`We have received ${data01.length} stats.`);

      console.log("Ok");
    } else {
      errorMsg = "Error recuperando datos";
      console.log("ERROR!" + errorMsg);
    }
  }

  async function loadChart(){
    await getData01();

    var etiquetas = [];
    var sPIM = [] ;
    var hPIM = [] ;
    var wPIM = [] ;

    data01.forEach((d) => {
        etiquetas.push(d.country);
        sPIM.push(d.solar_production_in_megawatts);
        hPIM.push(d.hydraulic_production_in_megawatts);
        wPIM.push(d.wind_power_production_in_megawatts);
    });
    

      Highcharts.chart('container', {
          chart: {
              type: 'areaspline'
          },
          title: {
              text: 'Capacidades de energía renovable'
          },
          legend: {
              layout: 'vertical',
              align: 'left',
              verticalAlign: 'top',
              x: 150,
              y: 100,
              floating: true,
              borderWidth: 1,
              backgroundColor:
                  Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
          },
          xAxis: {
              categories: etiquetas,
          },
          yAxis: {
              title: {
                  text: 'Megavatios'
              }
          },
          tooltip: {
              shared: true,
              valueSuffix: ' units'
          },
          credits: {
              enabled: false
          },
          plotOptions: {
              areaspline: {
                  fillOpacity: 0.5
              }
          },
          series: [{
              name: 'Producción solar en megavatios',
              data: sPIM     
          }, {
              name: 'Podrucción hidráulica en megavatios',
              data: hPIM
          }, {
            name: 'Producción de energía eólica en megavatios',
            data : wPIM
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
      <NavLink href="#/integrations">Integraciones</NavLink>
      </NavItem>
      </Nav>          
      
  <h3>Uso de la API del grupo 20 de SOS</h3>
  <h5>Se recogen los datos para 2008</h5> 
  <p>Areaspline chart</p>

  <figure class="highcharts-figure">
    <div id="container"></div>
    <p class="highcharts-description">    </p>
  </figure>


  {#if errorMsg}
  <p>{errorMsg}</p>
  {/if}
</main>

  
<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  #container {
    height: 400px; 
  }

  .highcharts-figure, .highcharts-data-table table {
    min-width: 310px; 
    max-width: 800px;
    margin: 1em auto;
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