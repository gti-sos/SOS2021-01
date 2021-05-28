<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";
  
    //Uso de API externa rick and morty
    var characters = [];
    var errorMsg = "";
    var okMsg = "";
    async function getStats() {
      console.log("Fetching data...");
  
      const res = await fetch("https://swapi.dev/api/films/");
  
      if (res.ok) {
        const json = await res.json();
        films = json.results;

  

        console.log(Object.keys(films));
  
        console.log(`We have received ${films.length} characters.`);
  
        console.log("Ok");
      } else {
        errorMsg = "Error al obtener los  datos de las peliculas";
        okMsg = "";
        console.log("ERROR!" + errorMsg);
      }
    }
  
    async function onLoad() {
      await getStats();
      var array = [];
     
      films.forEach(c =>{
        //console.log(Object.keys(c));
        
        console.log(`imprimiendo c ${c}`);
  
        var point ={x: "name", y: null} //name = titulo de la pelicula 
        point.x = c.title
        point.y = c.species.length
  
        array.push(point) 
      }  )
  
      /* let points = [
        { x: "A", y: 10 },
        { x: "B", y: 5 },
      ];
   */
   var chart = JSC.chart('chartDiv', {
        debug: true,
        defaultSeries_type: 'column',
        legend_visible: false,
        defaultPoint_label_visible: true,
        yAxis_visible: false,
        xAxis_defaultTick: {
          placement: 'inside',
          label_style: { color: '#fff', fontWeight: 'bold' }
        },
        series: [
          {
            name: 'Especies diferentes de los personajes de Star Wars por película',
            palette: 'default',
            points: array,
          }
        ]
      });
  

    }
  </script>
  
  <svelte:head>
    <script
      src="https://code.jscharting.com/latest/jscharting.js"
      on:load={onLoad}></script>
  </svelte:head>
  
  <main>
    <Nav>
      <NavItem>
        <NavLink href="/">Página Principal</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/#/integrations/">volver</NavLink>
      </NavItem>
    </Nav>
  
    <div>
      <h2>Uso API externa Star Wars</h2>
    </div>
  
    {#if errorMsg}
      <p>{errorMsg}</p>
    {:else}
      <div id="chartDiv" />
    {/if}
  </main>
  
  <style>
    #chartDiv {
      width: 100%;
      height: 400px;
    }
  </style>
  