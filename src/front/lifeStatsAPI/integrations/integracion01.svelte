<script>

import { Nav, NavItem, NavLink } from "sveltestrap";
var errorMsg = "";
var data01 = [];

//INTEGRACION GRUPO 20
async function loadAPI() {
    console.log("Loading data...");
    const BASE_API_URL_01 = "http://sos2021-20.herokuapp.com/api/v1/renewablepowercapacities-stats";
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
    const res = await fetch(
      "http://sos2021-20.herokuapp.com/api/v1/renewablepowercapacities-stats"
    );

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

    var trace1 = {
        x : etiquetas,
        y : sPIM,
        type : 'scatter'
    };
    var trace2 = {
        x: etiquetas,
        y: hPIM,
        type: 'scatter'
    };
    var trace3 = {
        x: etiquetas,
        y: wPIM,
        type: 'scatter'
    };

    var data= [trace1, trace2, trace3];
    Plotly.newPlot('myDiv', data);
  }

  
</script>

<svelte:head>
    <script src='https://cdn.plot.ly/plotly-latest.min.js' on:load={loadChart}></script>
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
  <body>
      <div id='myDiv'><!-- Plotly chart will be drawn inside this DIV --></div>
  </body>
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
</style>