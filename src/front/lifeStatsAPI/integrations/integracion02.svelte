<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";

    var errorMsg = "";    
    let correctMsg = "";
    var data02 = [];
    var lifeData = [];
    const BASE_LIFE_API_URL = "/api/v2/life-stats";
    const BASE_API_URL_02 = "/api/v2/children-out-school";
    
    //INTEGRACION GRUPO 24
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
        //const BASE_API_URL_02 = "http://sos2021-24.herokuapp.com/api/v2/children-out-school/";
        const res = await fetch(BASE_API_URL_02).then(
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
    
      
      async function getData02() {
        console.log("Fetching data...");
        await loadAPI();
        const res = await fetch(BASE_API_URL_02);
    
        if (res.ok) {
          const json = await res.json();
          data02 = json;
          console.log(`We have received ${data02.length} stats.`);    
          console.log("Ok");
        } else {
          errorMsg = "Error recuperando datos";
          console.log("ERROR!" + errorMsg);
        }
      }
    
      async function loadChart(){
        await getMyStats();
        await getData02();
    
        var paises = [];
        var outSchool = [] ;
        var qualityLife = [];

        data02.filter(data02 => data02.year == 2018).forEach(d => { 
            let country_minus = d.country.toLowerCase(); 
            lifeData.forEach((data) => {               
                if(data.date==2018 && data.country==country_minus){
                    paises.push(country_minus);
                    outSchool.push(d.children_out_school_total);
                    qualityLife.push(data.quality_life_index);
                }
            })
        });
        
        var trace1 = {
            x : paises,
            y : outSchool,
            name: 'Número de abandono escolar',
            type : 'bar'
        };

        var trace2 = {
            x: paises,
            y: qualityLife,
            name : 'Índice de calidad de vida',
            type: 'bar'
        };

        var data = [trace1, trace2];

       var layout = {
        barmode: 'group', 
        colorway: ['#D2B4DE', 'orange']};

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
    

    <h3>Integración con la API del grupo 24 de SOS</h3>
    <h5>Se han filtrado los datos para 2018</h5> 
    <p>Bar chart</p>
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