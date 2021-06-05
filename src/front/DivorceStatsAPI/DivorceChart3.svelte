<script>
    import { CardText, Nav, NavItem, NavLink } from "sveltestrap";

    //Uso de datos API personal 
    var divorces = [];
    var errorMsg = "";
    var okMsg = "";
    async function getStats() {
        console.log("Fetching data...");

        const res = await fetch("https://sos2021-01.herokuapp.com/api/v2/divorce-stats");

        if (res.ok) {
            const json = await res.json();
            divorces = json;

            //console.log(Object.keys(json));
            //console.log(Object.keys(divorces));

            console.log(`We have received ${divorces.length} stats.`);

            console.log("Ok");
        } else {
            errorMsg = "Error al obtener los  datos de divorcios";
            okMsg = "";
            console.log("ERROR!" + errorMsg);
        }
    }

    async function onLoad() {
        await getStats();
        var array = [];

        

        divorces.forEach(element => {

            var point = { x: "country", y: "year" , z: null}; 

            point.x = element.country   
            point.y = element.date
            point.z = element["divorce-rate"]
            if ( array.length < 30) array.push(point);
        });
    
  
   
   var chart = JSC.chart('chartDiv', {
        debug: true,
        
        legend_visible: false,
        
        
        defaultSeries: {
          type: 'pie donut',
          shape: {
            innerSize: '30%',
            padding: 0.005,
            offset: '1,80'
          }
        },
        yAxis_label_text: 'Date',
        zAxis_label_text: 'Divorce Rate',
        defaultAnnotation: { label_style: { fontSize: '400px' } },
    
         
        series: [
          {
            name: 'Divorce rate by country and year',
            points: array
              
          }
            ]
        
      });
      
   

    }
</script>

<svelte:head>
    <script
    type="text/javascript" src="https://code.jscharting.com/latest/jscharting.js"
        on:load={onLoad}></script>
        
</svelte:head>

<main>
    <Nav>
        <NavItem>
            <NavLink href="/">Página Principal</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="#/divorce-stats">Interfaz</NavLink>
        </NavItem>
    </Nav>

    <div>
        <h2>Uso API personal </h2>
        <CardText> Representacón de la proporción de divorcios por país y año de  30 países</CardText>
    </div>

    {#if errorMsg}
        <p>{errorMsg}</p>
    {:else}
        <div id="chartDiv"  />
    {/if}
</main>

<style>
    #chartDiv {
        width: 100%;
        height: 400px;
    }
</style>