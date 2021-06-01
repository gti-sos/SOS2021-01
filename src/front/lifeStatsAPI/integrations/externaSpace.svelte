<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";

    
    var errorMsg = "";    
    let correctMsg = "";
    const BASE_LIFE_API_URL = "/api/v2/life-stats";
    var lifeData = [];
    let resData = [];
    let starlink_name = [];
    let mean_motion = [];

    
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
            const res = await fetch("https://api.spacexdata.com/v4/starlink");

         await getMyStats();

         resData =  await res.json();
       //  console.log("La respuesta es:", resData);
        for(var i=0; i<6; i++){
          var element = resData[i].spaceTrack
          starlink_name.push(element.OBJECT_NAME);
          mean_motion.push(element.MEAN_MOTION);
        }
        console.log(mean_motion);

         var data = [{
            values: mean_motion,
            labels: starlink_name,
            type: 'pie'
        }];

        var layout = {
            height: 400,
            width: 1300
            };

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
    
  
    <h3>Uso de API externa sobre Starlink</h3>
    <h5>Se han recogido datos sobre el movimiento medio solo sobre 5 de los satélites Starlink</h5> 
    <p>Pie chart</p>
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