<script>
  import { onMount } from "svelte";

  import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";

  //API
  const BASE_CONTACT_API_PATH = "/api/v1";

  let errorMsg = "";
  let okMsg = "";

  let natalityStats = [];

  let queryStat = {
    country: "",
    date: "",
    born: "",
    "men-born": "",
    "women-born": "",
    "natality-rate": "",
    "fertility-rate": "",
  };
  
  let fullQuery = "";

  async function searchStat() {
    console.log(
      "Searching stat...");

    var campos = new Map(
      Object.entries(queryStat).filter((o) => {
        return o[1] != "";
      })
    );
    let querySymbol = "?";
    for (var [clave, valor] of campos.entries()) {
      querySymbol += clave + "=" + valor + "&";
    }
    fullQuery = querySymbol.slice(0, -1);

    if (fullQuery != "") {
      const res = await fetch(
        BASE_CONTACT_API_PATH + "/natality-stats/" + fullQuery
      );
      if (res.ok) {
        console.log("OK");
        const json = await res.json();
        natalityStats=json;

      } else {
        natalityStats=[];
        errorMsg = res.status + ": " + res.statusText;
        okMsg = "";
 
        console.log("ERROR!" + errorMsg);
      }
    }else{
      errorMsg = "";
      okMsg = "Búsqueda realizada correctamente";
      getStats();
    }
  }

  let offset = 0;
	let limit = 10;
	let numTotal;
	let numFiltered;

  async function getStats() {
    console.log("Fetching data...");

    const res = await fetch(BASE_CONTACT_API_PATH + "/natality-stats?limit="+limit+"&offset="+offset);

    if (res.ok) {
      console.log("Ok");
      const json = await res.json();
      natalityStats = json;
      console.log(`We have received ${natalityStats.length} contacs.`);
      errorMsg = "";
    } else {
      if(natalityStats.length!=0){
      okMsg = "";
       errorMsg = res.status + ": " + res.statusText;
      console.log("ERROR! 404");
      }
  }
}
async function deleteStat(country, date) {
    console.log(`Deleting data with name ${country} and date ${date}`);

    const res = await fetch(
      BASE_CONTACT_API_PATH + "/natality-stats/" + country + "/" + date,
      {
        method: "DELETE",
      }
    ).then(function (res) {
      if (res.ok) {
        console.log("OK");
        if(natalityStats.length===1){
          natalityStats=[];
        }
        errorMsg = "";
        okMsg = "Operación realizada correctamente";
        getStats();
      } else {
        errorMsg = res.status + ": " + res.statusText;
        okMsg = "";
        console.log("ERROR!" + errorMsg);
      }
    });
  }
</script>

<main>
  <Nav>
    <NavItem>
      <NavLink href="#/natality-stats">Volver</NavLink>
    </NavItem>
  </Nav>

  <p>

</p>
  <h2>Búsqueda Natalidad</h2>
  <p>

  </p>
  {#if errorMsg}
    <p style="color: red">ERROR: {errorMsg}</p>
  {/if}
  {#if okMsg}
    <p style="color: green">{okMsg}</p>
  {/if}

  <Table bordered>
    <thead>
      <tr>
        <th> País </th>
        <th>Año </th>
        <th>Nacimientos </th>
        <th>Hombres nacidos </th>
        <th>Mujeres nacidas </th>
        <th>Tasa de natalidad </th>
        <th>Índice de fecundación </th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><input type="text" bind:value={queryStat.country} /></td>
        <td><input type="number" bind:value={queryStat.date} /></td>
        <td><input type="number" bind:value={queryStat.born} /></td>
        <td><input type="number" bind:value={queryStat["men-born"]} /></td>
        <td><input type="number" bind:value={queryStat["women-born"]} /></td>
        <td><input type="number" bind:value={queryStat["natality-rate"]} /></td>
        <td><input type="number" bind:value={queryStat["fertility-rate"]} /></td>
        <td>
          <Button outline color="primary" on:click={searchStat}>Buscar</Button>
        </td>
      </tr>
      {#each natalityStats as stat}
        <tr>
          <td>{stat.country}</td>
          <td>{stat.date}</td>
          <td>{stat.born}</td>
          <td>{stat["men-born"]}</td>
          <td>{stat["women-born"]}</td>
          <td>{stat["natality-rate"]}%</td>
          <td>{stat["fertility-rate"]}</td>
          <td>
            <a href="#/natality-stats/{stat.country}/{stat.date}">
              <Button color="primary">Editar</Button>
            </a>
            <p></p>
            <Button
              color="danger"
              on:click={deleteStat(stat.country, stat.date)}>Borrar</Button
            ></td
          >
        </tr>
      {/each}
    </tbody>
  </Table>

</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
</style>
