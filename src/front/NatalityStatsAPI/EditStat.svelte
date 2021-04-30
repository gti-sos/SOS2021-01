<script>
  import { onMount } from "svelte";

  import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";

  const BASE_CONTACT_API_PATH = "/api/v1";
  export let params = {};
  let stat = {};
  let updateCountry = "XXXX";
  let updateDate = 1999;
  let updateBorn = 999;
  let updateMenBorn = 999;
  let updateWomenBorn = 999;
  let updateNatalityRate = 999.9;
  let updateFertilityRate = 999.9;
  let errorMsg = "";
  let okMsg = "";
  
  async function getStat() {
    console.log("Fetching stat..." + params.country + " " + params.date);
    const res = await fetch(
      BASE_CONTACT_API_PATH +"/natality-stats/" + params.country +"/" + params.date
    );

    if (res.ok) {
      console.log("Ok:");
      const json = await res.json();
      stat = json;
      updateCountry = stat.country;
      updateDate = stat.date;
      updateBorn = stat.born;
      updateMenBorn = stat["men-born"];
      updateWomenBorn = stat["women-born"];
      updateNatalityRate = stat["natality-rate"];
      updateFertilityRate = stat["fertility-rate"];
      console.log("Received stat.");
      
    } else {
      errorMsg = res.status + ": " + res.statusText;
      okMsg="";
      console.log("ERROR!" + errorMsg);
    }
  }

  async function updateStat() {
    console.log(
      "Updating stat..." +
        JSON.stringify(params.country) +
        JSON.stringify(params.date)
    );

    const res = await fetch(
      BASE_CONTACT_API_PATH +
        "/natality-stats/" +
        params.country +
        "/" +
        params.date,
      {
        method: "PUT",
        body: JSON.stringify({
          "country": params.country,
          "date": parseInt(params.date),
          "born": parseInt(updateBorn),
          "men-born": parseInt(updateMenBorn),
          "women-born": parseInt(updateWomenBorn),
          "natality-rate": parseFloat(updateNatalityRate),
          "fertility-rate": parseFloat(updateFertilityRate),
        }),
        headers: {
          "Content-Type": "application/json",
        }
      }
    ).then(function (res) {
      if (res.ok) {
        console.log("OK");
        getStat();
        errorMsg = "";
        okMsg = "Operación realizada correctamente";
      } else {
        errorMsg = res.status + ": " + res.statusText;
        okMsg = "";
        getStat();
        console.log("ERROR!" + errorMsg);
      }
    });
  }

  onMount(getStat);
</script>

<main>
  <Nav>
    <NavItem>
      <NavLink href="#/natality-stats">Volver</NavLink>
    </NavItem>
  </Nav>

  <h2>
    Editar campo <strong>{params.country}</strong>
    <strong>{params.date}</strong>
  </h2>
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
        <td>{updateCountry}</td>
        <td>{updateDate}</td>
        <td><input type="number" bind:value={updateBorn} /></td>
        <td><input type="number" bind:value={updateMenBorn} /></td>
        <td><input type="number" bind:value={updateWomenBorn} /></td>
        <td><input type="number" bind:value={updateNatalityRate} /></td>
        <td><input type="number" bind:value={updateFertilityRate} /></td>
        <td>
          <Button outline color="primary" on:click={updateStat}>Actualizar</Button>
        </td>
      </tr>
    </tbody>
  </Table>
  {#if errorMsg}
    <p style="color: red">ERROR: {errorMsg}</p>
  {/if}
  {#if okMsg}
  <p style="color: green">{okMsg}</p>
  {/if}

</main>

<style>
  main{
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
</style>