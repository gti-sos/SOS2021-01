<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";

    var errorMsg = "";    
    let correctMsg = "";
    var data03 = [];
    var lifeData = [];
    const BASE_LIFE_API_URL = "/api/v2/life-stats";
    const BASE_API_URL_03 = "/api/v2/fire-stats";
    
    //INTEGRACION GRUPO 21
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
      //  const BASE_API_URL_03 = "https://sos2021-21.herokuapp.com/api/v2/fire-stats ";
        const res = await fetch(BASE_API_URL_03).then(
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
    
      
      async function getData03() {
        console.log("Fetching data...");
        await loadAPI();
        const res = await fetch(BASE_API_URL_03);
    
        if (res.ok) {
          const json = await res.json();
          data03 = json;
          console.log(`We have received ${data03.length} stats.`);
    
          console.log("Ok");
        } else {
          errorMsg = "Error recuperando datos";
          console.log("ERROR!" + errorMsg);
        }
      }
    
      async function loadChart(){
        await getMyStats();
        await getData03();
    
        var paises = [];
        var fire_aee = [] ;
        var safety = [];

        data03.filter(data03 => data03.year == 2019).forEach(d => { 
            let country_minus = d.country.toLowerCase(); 
            lifeData.forEach((data) => {               
                if(data.date==2019 && data.country==country_minus){
                    paises.push(country_minus);
                    fire_aee.push(d.fire_aee);
                    safety.push(data.safety_index);
                }
            })
        });

        var trace1 = {
            type: 'scatter',
            x : paises,
            y : fire_aee,
            mode: 'markers',
            name: 'Estimación anual de emisiones',
            marker: {
                color: 'green',
                line: {
                color: 'rgba(156, 165, 196, 1.0)',
                width: 1,
                },
                symbol: 'circle',
                size: 30
            }
        };

        var trace2 = {
            type: 'scatter',
            x: paises,
            y: safety,
            mode: 'markers',
            name: 'Índice de seguridad',
            marker: {
                color: 'blue',
                line: {
                color: 'rgba(217, 217, 217, 1.0)',
                width: 1,
                },
                symbol: 'circle',
                size:30
            }
            };

        var data = [trace1, trace2];

        var layout = {
              title: 'Comparación de estimación de emisiones y el índice de seguridad en el país en 2019',
              xaxis: {
                  showgrid: false,
                  showline: true,
                  linecolor: 'black',
                  titlefont: {
                  font: {
                      color: 'black'
                  }
                  }
              },
              legend: {
                  font: {
                  size: 10,
                  },
                  yanchor: 'middle',
                  xanchor: 'right'
              },
              width: 1200,
              height: 600,
              paper_bgcolor: 'white',
              plot_bgcolor: 'white',
              hovermode: 'closest',              
            };

            Plotly.newPlot('myDiv', data, layout, {scrollZoom: true});  
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
    

    <h3>Integración con la API del grupo 21 de SOS</h3>
    <p>Dot plots </p>
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