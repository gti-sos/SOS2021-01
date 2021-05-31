<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";

    
    var errorMsg = "";    
    let correctMsg = "";
    const BASE_LIFE_API_URL = "/api/v2/life-stats";
    var lifeData = [];
    let resData = [];
    let deaths = [];
    let countries = [];
    let safety = [];

    const BASE_API_EXTERNA_01 = "/statistics"
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

    async function loadChart(){
            const res = await fetch("https://covid-193.p.rapidapi.com/statistics", {
            "method": "GET",
            "headers": {
            'x-rapidapi-key': '1713dc8cbbmsh0cc9c745d493379p1f4f4ajsn885e935b7f72',
            'x-rapidapi-host': 'covid-193.p.rapidapi.com',
            useQueryString: true
	        }
         });

         await getMyStats();

         resData =  await res.json();
         console.log("La respuesta es:", resData.response);
        
         resData.response.forEach(d => { 
            let country_minus = d.country.toLowerCase(); 
            lifeData.forEach((data) => {               
                if(data.country==country_minus){
                    deaths.push(d.deaths.total);
                    countries.push(data.country);
                    safety.push(data.safety_index);
                }
            })
        });

         var trace1 = {
            x: countries,
            y: deaths,
            fill: 'tozeroy',
            type: 'scatter'
        };
        
        var trace2 = {
            x: countries,
            y: safety,
            fill: 'tozeroy',
            type: 'scatter',
        };

        var layout = {
            title: 'Basic Overlaid Area Chart'
        };

        var data = [trace1, trace2];

        Plotly.newPlot('myDiv', data, layout);

    }
</script>

<svelte:head>
    <script src='https://cdn.plot.ly/plotly-1.58.4.min.js' on:load={loadChart}></script>
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
    
  
    <h3>Integración de API externa con datos sobre muertes por Covid</h3>
    <h5>Se recogen los datos para los mismos paises, ignorando el año.</h5> 
    <p>Nota: por la diferencia de escala hay que pulsar en trace 0 (para deshabilitarlo) para poder llegar a ver el índice de seguridad en el país</p>
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