<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";

    const BASE_LIFE_API_PATH = "/api/v2";
    
    let lifeData=[];
    let countries = [];
    let lifeChartQualityLifeI = [];
    let lifeChartPurchasingPowerI = [];
    let lifeChartSafetyI = [];
      
    let errorMsg="Tiene que cargar los datos para visualizar las analíticas.";
    let cargados = false;

    async function loadChart() {
      console.log("Fetching data...");

      const res = await fetch(BASE_LIFE_API_PATH + "/life-stats");
      lifeData = await res.json();
      if (res.ok) {
        lifeData.forEach((stat) => {
              let country_date = stat.country+"-"+stat.date;
              countries.push(country_date);      
              lifeChartQualityLifeI.push(stat["quality_life_index"]);
              lifeChartPurchasingPowerI.push(stat["purchasing_power_index"]); 
              lifeChartSafetyI.push(stat["safety_index"]);
        });    
        cargados=true;
      }
      
      var trace1 = {
          x: countries,
          y:  lifeChartPurchasingPowerI,
          fill: 'tozeroy',
          type: 'scatter',
          name : "índice de poder adquisitiivo"
      };
      
      var trace2 = {
          x: countries,
          y:  lifeChartSafetyI,
          fill: 'tozeroy',
          type: 'scatter',
          name : "Índice de seguridad"
      };

      var trace3 = {
          x: countries,
          y: lifeChartQualityLifeI,
          fill: 'tozeroy',
          type: 'scatter',
          name : "Índice de seguridad"
      };

      var layout = {
          title: 'Basic Overlaid Area Chart',
          colorway: ['purple', 'green', 'yellow']
      };

      var data = [trace1, trace2, trace3];

      Plotly.newPlot('myDiv', data, layout, {scrollZoom: true});

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
        <NavLink href="#/life-stats">Datos</NavLink>
        </NavItem>
        </Nav>          
        <div>
            <h2>
              Analítica con todos los campos
            </h2>
        </div>

        <div>
          {#if !cargados}
            <p class="error">{errorMsg}</p>
          {/if}
        </div>
  
    <body>
        <div id='myDiv'><!-- Plotly chart will be drawn inside this DIV --></div>
    </body>
  </main>
  
    
  <style>
    main {
      text-align: center;
      padding: 1em;
      margin: 0 auto;
    }
    p.error{
      color: red; 
      text-align:center;
      font-size: 20px;
      margin-top:80px;
    }
  </style>