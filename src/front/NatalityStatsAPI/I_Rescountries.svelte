<script>
  import {
    Nav,
    NavItem,
    NavLink
  } from "sveltestrap";
  //Uso de API externa restcountries.eu 
var countries = [];
var msg = "";
async function getStats() {
    console.log("Fetching data...");

    const res = await fetch(
      "https://restcountries.eu/rest/v2/all"
    );

    if (res.ok) {
      const json = await res.json();
      countries = json;

      console.log(`We have received ${countries.length} countries.`);
    
      msg = "";
      console.log("Ok");
    } else {
      msg="Error recuperando datos de restcountries"
    
      console.log("ERROR!" + msg);
    }
  };

  

async function loadChart(){
 await getStats();

 var ctx = document.getElementById('myChart').getContext('2d');

 var xAxis = [];
 var yAxis = [];

 

 for (let index = 0; index < countries.length; index++) {
  const element = countries[index];

  console.log("NOMBRE: "+element.name);
  console.log("REGION1: "+element.regionalBlocs[0]);
  if(element.regionalBlocs.length != 0){
    if(element.regionalBlocs[0].acronym == "EU"){
    xAxis.push(element.name);
    yAxis.push(element.population);
  } 
  }
  
 
   
 }

 var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: xAxis,
        datasets: [{
            label: 'población total por países europeos',
            data: yAxis,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
}


</script>

<svelte:head>
  <script src="https://cdn.jsdelivr.net/npm/chart.js" on:load={loadChart}></script>
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
    <h2>
      Uso API externa restcountries.eu
    </h2>
  </div>

  {#if msg}
    <p>{msg}</p>
  {:else}
  <div>
    <canvas id="myChart"></canvas>
  </div>
  {/if}
</main>

<style>
 main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
  div{
    margin-bottom: 15px;
  }
</style>