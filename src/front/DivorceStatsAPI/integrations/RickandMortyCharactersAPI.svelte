
	

  
<!-- workaround for svelte repl -->
<svelte:head>
  <script src="https://code.jscharting.com/latest/jscharting.js" on:load={loadChart}></script>
</svelte:head>

<script>

import {
    Nav,
    NavItem,
    NavLink
  } from "sveltestrap";
  //Uso de API externa rick and morty 
  var characters = [];
  var errorMsg = "";
  var okMsg = "";
  async function getStats() {
    console.log("Fetching data...");

    const res = await fetch("https://rickandmortyapi.com/api/character/");

    if (res.ok) {
      const json = await res.json();
      characters = json;

      console.log(`We have received ${characters.length} characters.`);

      console.log("Ok");
    } else {
      errorMsg = "Error al obtener los  datos de los personajes";
      okMsg = "";
      console.log("ERROR!" + errorMsg);
    }
  }



  async function loadChart(){
 await getStats();

   JSC.Chart("chartDiv", {
  series: [
    {
      points: [] //[{ x: "A", y: 10 }, { x: "B", y: 5 }]
    }
  ]
});

let points = characters.map(d => {
  return { x: d.name, y: d.episode.length };
});

const chart = new JSC.Chart("chartDiv", {
  // Pass points to the series
  series: [{ points: points }],
  // Set the x axis scale to time.
  xAxis_scale_type: "pie"
});
//const chart = new JSC.Chart("divId", { type: "line step" });
chart.options({ title: { label: { text: "Porporción de apariciones de personajes en la serie" } } });
//chart.options({ title_label_text: "Porporción de apariciones de personajes en la serie" });

chart.options({
  // Title text
  title_label_text: "Porporción de apariciones de personajes en la serie",
  //Axis label text
  xAxis_label_text: "Personaje",
  yAxis_label_text: "Apariciones",
  // Point labels
  defaultPoint_label_text: "%yValue",
  // Annotations
  annotations: [
    {
      position: "top",
      label_text: "Annotation text"
    }
  ]
});

JSC.Chart("chartDiv", {
  toolbar_items: {
    "Click Me": {
      events_click: function() {
        alert("Button clicked");
      }
    }
  }
});

}
  /* JSC.Chart("chartDiv", {
  series: [
    {
      points: [] //[{ x: "A", y: 10 }, { x: "B", y: 5 }]
    }
  ]
}); */

let points = characters.map(d => {
  return { x: d.name, y: d.episode.length };
});

const chart = new JSC.Chart("chartDiv", {
  // Pass points to the series
  series: [{ points: points }],
  // Set the x axis scale to time.
  xAxis_scale_type: "pie"
});
//const chart = new JSC.Chart("divId", { type: "line step" });
chart.options({ title: { label: { text: "Porporción de apariciones de personajes en la serie" } } });
//chart.options({ title_label_text: "Porporción de apariciones de personajes en la serie" });

chart.options({
  // Title text
  title_label_text: "Porporción de apariciones de personajes en la serie",
  //Axis label text
  xAxis_label_text: "Personaje",
  yAxis_label_text: "Apariciones",
  // Point labels
  defaultPoint_label_text: "%yValue",
  // Annotations
  annotations: [
    {
      position: "top",
      label_text: "Annotation text"
    }
  ]
});

JSC.Chart("chartDiv", {
  toolbar_items: {
    "Click Me": {
      events_click: function() {
        alert("Button clicked");
      }
    }
  }
});


</script>
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
    <h2>
      Uso API externa Rick and Morty API
    </h2>
  </div>

  {#if errorMsg}
    <p>{errorMsg}</p>
  {:else}
  <div id="chartDiv" style="width: 100%; height: 400px;"></div>
  {/if}
</main>


<style>
#chartdiv {
  width: 100%;
  height: 500px;
}
</style>
