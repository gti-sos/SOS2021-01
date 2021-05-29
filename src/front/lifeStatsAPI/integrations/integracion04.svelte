<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";

    var errorMsg = "";    
    let correctMsg = "";
    var data04 = [];
    var lifeData = [];
    const BASE_LIFE_API_URL = "/api/v2/life-stats";
    const BASE_API_URL_04 = "/api/v1";
    
    //INTEGRACION GRUPO 04
  async function loadMyStats() {
    console.log("Loading data...");
    const res = await fetch(
      BASE_LIFE_API_URL + "/loadInitialData"
    ).then(function (res) {
      if (res.ok) {
        errorMsg = "";
        correctMsg = "Datos cargados correctamente";
        console.log("OK");
      } else {
        if (res.status === 500) {
          errorMsg = "No se ha podido acceder a la base de datos";
        }
        correctMsg = "";
        console.log("ERROR!" + errorMsg);
      }
    });
  }

  async function getMyStats() {
    console.log("Fetching data...");
    await loadMyStats();
    const res = await fetch(BASE_LIFE_API_URL);

    if (res.ok) {
      console.log("OK");
      lifeData = await res.json();
      correctMsg = "";
      console.log(`We have received ${lifeData.length} life-stats.`);
    } else {
      console.log("Error");
      errorMsg = "Error al cargar los datos de la API";
    }
  }
    async function loadAPI() {
        console.log("Loading data...");
        const res = await fetch(BASE_API_URL_04).then(
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
    
      
      async function getData04() {
        console.log("Fetching data...");
        await loadAPI();
        const res = await fetch(BASE_API_URL_04);
    
        if (res.ok) {
          const json = await res.json();
          data04 = json;
          console.log(`We have received ${data04.length} stats.`);
    
          console.log("Ok");
        } else {
          errorMsg = "Error recuperando datos";
          console.log("ERROR!" + errorMsg);
        }
      }
    
      async function loadChart(){
        console.log("pasando por loadchart");
        await getMyStats();
        await getData04();
    
        var gasto_per_capita = [] ;
        var gasto_millones = [];
        var purchasingPower = [];

        data04.forEach(d => { 
            let country_minus = d.country.toLowerCase();             
            lifeData.forEach((data) =>{
               if(data.country == country_minus){
                    purchasingPower.push(data.purchasing_power_index);
                    gasto_per_capita.push(d.education_expenditure_per_capita);
                    gasto_millones.push(d.education_expenditure_per_millions);
               }
            })
        });

        var trace1 = {
            type: "pointcloud",
            mode: "markers",
            marker: {
                sizemin: 0.5,
                sizemax: 100,
                arearatio: 0,
                color: "rgba(255, 0, 0, 0.6)"
            },
            x: gasto_millones,
            y: purchasingPower
        };

             
        var trace2 = {
            type: "pointcloud",
            mode: "markers",
            marker: {
                sizemin: 0.5,
                sizemax: 100,
                arearatio: 0,
                color: "rgba(0, 0, 255, 0.9)",
                opacity: 0.8,
                blend: true
            },
            opacity: 0.7,
            x: gasto_per_capita,
            y: purchasingPower
        }; 

        var data = [trace1, trace2];

        var layout = {
            title: "Styled Point Cloud",
            xaxis: {
                type: "linear",
                range: [
                -2.501411175139456,
                43.340777299865266],
                autorange: true
            },
            yaxis: {
                type: "linear",
                range: [4,6],
                autorange: true
            },
            height: 598,
            width: 1080,
            autosize: true,
            showlegend: true
        }

        Plotly.newPlot('myDiv', data, layout);
        
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
    

    <h3>Integración con la API del grupo 04 de SOS</h3>
    <p>Comparación de los gastos en millones de euros y los gastos per cápita con el índice de poder adquisitivo</p>
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