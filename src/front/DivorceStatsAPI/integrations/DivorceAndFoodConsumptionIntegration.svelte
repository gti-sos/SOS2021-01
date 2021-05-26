<script>
  import { Nav, NavItem, NavLink } from "sveltestrap";

  //Uso de API externa rick and morty

  var errorMsg = "";
  var okMsg = "";
  var divorceStats = [];
  var foodStats = [];

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

    const res1 = await fetch("/api/v2/foodconsumption-stats");

    if (res1.ok) {
      const json1 = await res1.json();
      foodStats = json1;
      //console.log(Object.keys(json1));

      console.log(`We have received ${foodStats.length} stats.`);

      console.log("Ok");
    } else {
      errorMsg = "Error al obtener los  datos";
      okMsg = "";
      console.log("ERROR!" + errorMsg);
    }
  }

  async function onLoad() {
    await getStats();
    var datos = [];
    var divorceCountries = [];
    var foodCountries = [];

    divorceStats.forEach((element) => {
      if (!divorceCountries.includes(element.country)) {
        divorceCountries.push(element.country);
      }
    }),
      console.log("los paises de divorces son", divorceCountries);

    foodStats.forEach((element) => {
      if (!foodCountries.includes(element.country)) {
        foodCountries.push(element.country);
      }
    });

    console.log("los paises de food son", foodCountries);

    var paisesComunes = divorceCountries.filter((value) =>
      foodCountries.includes(value)
    );
    console.log("los paises comunes son", paisesComunes);

    divorceStats.forEach((e) => {
      var dato = {
        country: "",
        marriageRate: 0,
        dailyCalories: 0,
        relation: 0,
      };

      if (paisesComunes.includes(e.country)) {
        dato.country = e.country;
        dato.marriageRate = e["marriage-rate"];
        datos.push(dato);
      }
    });
    console.log("imprimiendo los datos desps de añadir el divorce rate", datos);

    foodStats.forEach((e) => {
      if (paisesComunes.includes(e.country)) {

        //var dato1 = datos[{ country: e.country }];
        for (var i = 0; i < datos.length; i++) {

          
          var pais = datos[i]["country"];

          if (pais == e.country) {

            var dato1 = datos[i];
            dato1.dailyCalories = e.dailycalory;
            datos[i] = dato1;
          }
        }
      }
    });
    var finalJson = [];

    console.log(datos);

    console.log(datos);

    datos.forEach((e) => {

      e.relation = parseFloat(e.dailyCalories / e.marriageRate); 

     
    if (e.marriageRate != 1) { finalJson.push({
        name: e.country,
        y: e.relation,
        attributes: { code: e.country },
        
      });
    }
    });
    console.log(finalJson);

    var chart = JSC.chart("chartDiv", {
      debug: true,
      type: "treemap",
      title_label_text: "Top %pointCount country and ratio between marriages and calories ingested",
      legend_visible: false,
      defaultPoint: {
        tooltip: "%name<br/>Ratio: %yvalue",
        label_text: "%code<br/>{%yValue/1000000:N0}M",
      },
      series: [
        {
          name: "Ratio between marriage rate and daily calories consumed by countries ",
          points: finalJson,
        },
      ],
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
