<script>
    import { onMount } from "svelte";
  
    import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
  
    const BASE_CONTACT_API_PATH = "/api/v1";

    export let params = {};
    let stat = {};
    let updateCountry = "XXXX";
    let updateDate = 1999;
    let updateMarriageRate = 999;
    let updateDivorceRate = 999;
    let updateRatioActual = 999;
    let updateRatioPercent = 999.9;
    let errorMsg = "";
    let okMsg = "";
    
    async function getStat() {
      console.log("Fetching stat..." + params.country + " " + params.date);
      const res = await fetch(
        BASE_CONTACT_API_PATH +"/divorce-stats/" + params.country +"/" + params.date
      );
  
      if (res.ok) {
        console.log("Ok:");
        const json = await res.json();
        stat = json;
        updateCountry = stat.country;
        updateDate = stat.date;
        updateMarriageRate = stat["marriage-rate"];
        updateDivorceRate = stat["divorce-rate"];
        updateRatioActual = stat["ratio-actual"];
        updateRatioPercent = stat["ratio-percent"];
       
        console.log("Received stat.");
        
      } else {
        if(res.status===404){
          errorMsg = "No se encuentra el dato solicitado";
        }else if(res.status ===500){
          errorMsg = "No se han podido acceder a la base de datos";
        }        
        okMsg = "";
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
          "/divorce-stats/" +
          params.country +
          "/" +
          params.date,
        {
          method: "PUT",
          body: JSON.stringify({
            "country": params.country,
            "date": parseInt(params.date),
            "marriage-rate": parseInt(updateMarriageRate),
            "divorce-rate": parseInt(updateDivorceRate),
            "ratio-actual": parseInt(updateRatioActual),
            "ratio-percent": parseFloat(updateRatioPercent),
            
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
          if(res.status===409){
          errorMsg = "El dato ya se encuentra cargado";
        }else if(res.status ===500){
          errorMsg = "No se han podido acceder a la base de datos";
        }else if(res.status ===404){
          errorMsg = "No se ha encontrado el dato solicitado";
        }
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
        <NavLink href="#/divorce-stats">Volver</NavLink>
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
          <th>Porcentaje de matrimonios	 </th>
          <th>Porcentaje de divorcios	 </th>
          <th>Ratio actual	 </th>
          <th>Ratio porcentual </th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{updateCountry}</td>
          <td>{updateDate}</td>
          <td><input type="number" placeholder="0.0" step="0.01" min="0"   bind:value={updateMarriageRate} /></td>
          <td><input type="number" placeholder="0.0" step="0.01" min="0"   bind:value={updateDivorceRate} /></td>
          <td><input type="number" placeholder="0.0" step="0.01" min="0"   bind:value={updateRatioActual} /></td>
          <td><input type="number" placeholder="0.0" step="0.01" min="0" bind:value={updateRatioPercent} /></td>
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