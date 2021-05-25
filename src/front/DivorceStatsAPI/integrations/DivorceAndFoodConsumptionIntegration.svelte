<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";
  
    //Uso de API externa rick and morty
    var characters = [];
    var errorMsg = "";
    var okMsg = "";
    async function getStats() {
        console.log("Fetching divorce stats data...");

        const res = await fetch(
            "https://sos2021-01.herokuapp.com/api/v2/divorce-stats"
        );

        if (res.ok) {
            const json = await res.json();
            divorceStats = json;
            //console.log(Object.keys(json));

            console.log(`We have received ${divorceStats.length} stats.`);

            console.log("Ok");
        } else {
            errorMsg = "Error al obtener los  datos";
            okMsg = "";
            console.log("ERROR!" + errorMsg);
        }

        console.log("Fetching Food consumption data...");

        const res1 = await fetch(
            "https://sos2021-03.herokuapp.com/api/v2/foodconsumption-stats"
        );

        if (res1.ok) {
            const json1 = await res1.json();
            foodStats = json1;
            //console.log(Object.keys(json1));

            console.log(`We have received ${deathStats.length} stats.`);

            console.log("Ok");
        } else {
            errorMsg = "Error al obtener los  datos";
            okMsg = "";
            console.log("ERROR!" + errorMsg);
        }
    }
  
    async function onLoad() {
      await getStats();
      var array = [];
        var divorceCountries = [];
        var foodCountries = [];

        divorceStats.forEach(element => {
            if(!divorceCountries.contains(element.country)){
                divorceCountries.push(element)
            }
        }),
            foodStats.array.forEach(element => {
            if(!foodCountries.contains(element.country)){
                foodCountries.push(element)
            }    
            paisesComunes = divorceCountries.filter((value) => foodCountries.includes(value));
        }),
      divorceStats.forEach((e) => {
          dato = {country: "", marriageRate: null, dailyCalories: null, relation: null}

          if( paisescomunes.contains(e.country)){
            dato.country = e.country;
            dato.marriageRate= e["marriage-rate"];
            datos.push(dato);
          }
      }),
      foodStats.forEach(e => {

        if( paisescomunes.contains(e.country)){
            
            dato = datos[{country: e.country}];
            dato.dailyCalories= e.dailycalory;
            datos.update(dato);

          }

      });
      var finalJson = [];

      datos.forEach(e => {
          
          e.relation = float(e.dailyCalories / e.marriageRate);

          finalJson.push({name: country, y: e.relation, attributes: { code: (e.country).toString}});
      })


     
      
  
      var chart = JSC.chart('chartDiv', {
        debug: true,
        type: 'treemap',
        title_label_text: 'Top %pointCount country populations',
        legend_visible: false,
        defaultPoint: {
          tooltip: '%name<br/>Population: %yvalue',
          label_text: '%code<br/>{%yValue/1000000:N0}M'
        },
        series: [
          {
            name: 'Ratio between marriage rate and daily calories consumed by countries ',
            points: finalJson
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
      <h2>Integracion de Divorce API y Food Consumption API</h2>
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
  