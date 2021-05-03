<script lang="ts">
    import { onMount } from 'svelte';
    import { pop } from "svelte-spa-router";
    import {Button, Table } from 'sveltestrap';

    const BASE_LIFE_API_URL = "/api/v1/life-stats"; //tiene que llamar a la API para tratar los datos
	
    let cargados = false;
    let lifeStats = [];
    let errorMsg = "";
    let correctMsg = "";

    
  let newData = {
    country: "",
    date: "",
    "quality_life_index": "",
    "purchasing_power_index": "",
    "safety_index": "",
    };

    onMount(getLifeStats);

    async function loadLifeStats(){
        console.log("Loading data...");
        const res =  await fetch(BASE_LIFE_API_URL + "/loadInitialData");
        cargados = true;
        if (res.ok){
            console.log("Ok.");
            getLifeStats();
            errorMsg = "";            
            correctMsg = "Los datos se han cargado correctamente.";
        }else{
            console.log("Error loading data.");
        }
    }

    async function getLifeStats() {
        console.log("Fetching life stats...");
        const res = await fetch(BASE_LIFE_API_URL);

        if (res.ok) {
            cargados =  true;
            console.log("Ok. Obtaining data...");
            const json = await res.json();
            lifeStats = json;            
            console.log(`Received ${lifeStats.length} life stats.`);
        }else if (res.status == 500) {
            errorMsg = "No se ha podido acceder la base de datos."
            console.log(errorMsg);
        }else if (res.status == 404) { 
            errorMsg = "No se encuentran datos. Tiene que cargarlos."
            console.log("Error. " +  errorMsg)
        } else { //este realmente no va a ser otro caso que el status = 500 
            errorMsg = res.status + ": " + res.statusText;
            console.log(errorMsg);
        }
        
    }

    async function insertLifeStat() {
        console.log("Inserting data" + JSON.stringify(newData) + "...");
		if ( !newData.country || !newData.date || !newData['quality_life_index'] || !newData['purchasing_power_index'] || !newData['safety_index']) {
			alert("Todos los campos son obligatorios.");
		} else {
            const res = await fetch(BASE_LIFE_API_URL, {
				method: "POST",
				body: JSON.stringify(newData),
				headers: {
					"Content-Type": "application/json"
				}
			}).then(function (res) {
                if (res.ok){
					console.log("OK");
                    getLifeStats();
                    errorMsg="";
                    correctMsg="Se ha insertado correctamente.";
				}  else if (res.status == 409) {
                    errorMsg= "Ya existe un recurso con el mismo país y año."
                    console.log("ERROR. " + errorMsg);
				}else { //status == 500
                    errorMsg= "No se ha podido acceder la base de datos."
                    console.log("Error inserting data in DB");
				}
            });
        }
    }
   

    async function deleteLifeStats() {
		console.log("Deleting life stats...");
        cargados=false;
		const res = await fetch(BASE_LIFE_API_URL, {
			method: "DELETE"
		}).then(function (res) {
			if (res.ok){
                console.log("Ok. " + correctMsg);
                lifeStats = [];
                errorMsg="";
                correctMsg = "Se han eliminado todo los datos correctamente.";
			} else if (res.status==404){ //no data found
                errorMsg ="No hay datos para borrar."                
                console.log("ERROR. " + errorMsg);
			} else  { //status == 500
                errorMsg = "No se ha podido acceder a la base de datos."
				console.log("ERROR. " + errorMsg);
			}
			
		});
	}

    async function deleteLifeStat(country, date) { //borra un recurso concreto
        console.log(`Deleting the resource with ${country} and date ${date}`);
        const res = await fetch(BASE_LIFE_API_URL + "/" + country + "/" +date, { method: "DELETE",}
        ).then( function (res) {
            if (res.ok){
                correctMsg =`El dato con país: ${country} y año: ${date} se ha eliminado correctamente.`;
                errorMsg = "";                
				console.log("Ok. " + correctMsg);
                getLifeStats();  /*para que el usuario no tenga que recargar la página */
			} else if (res.status==404){ //no data found
                errorMsg= `No se encuentra el dato con país:  ${country} y año: ${date}.`;
                console.log("ERROR. " +  errorMsg);
			} else  { //status == 500
                errorMsg = "No se ha podido acceder a la base de datos.";
				console.log("ERROR. " +  errorMsg);
			}		
        });
    }  

    
</script>
  

<main>
    <div>
        {#if cargados}  
        <Button style="background-color: crimson;" disabled> Cargar datos iniciales </Button>
        {:else}
        <Button style="background-color: crimson;" on:click={loadLifeStats}> Cargar datos iniciales</Button>
        {/if}
        <Button style="background-color: darkgray" on:click={deleteLifeStats}> Eliminar datos</Button>
        
    </div>
    
  
    {#if lifeStats.length != 0}
        <br/>
        <Table bordered style="text-align: center;">
            <thead>
                <tr>
                    <th>País</th>
                    <th>Fecha</th>
                    <th>Índice de calidad de vida</th>
                    <th>Índice de poder adquisitivo</th>
                    <th>Índice de seguridad</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
					<td><input placeholder="Ej. Spain" bind:value = "{newData.country}" /></td>
					<td><input  type="number" placeholder="Ej. 2021" bind:value = "{newData.date}" /></td>
                    <td><input type="number" placeholder="0.00"  min="0" bind:value = "{newData['quality_life_index']}" /></td>
					<td><input  type="number" placeholder="0.00" min="0" bind:value = "{newData['purchasing_power_index']}" /></td>
					<td><input type="number" placeholder="0.00" min="0" bind:value = "{newData['safety_index']}" /></td>
					<td><Button outline color= "primary" on:click={insertLifeStat}> Insertar</Button></td> 
				</tr>
                {#each lifeStats as stat}
                <tr>
                    <td>{stat.country}</td>
                    <td>{stat.date}</td>
                    <td>{stat["quality_life_index"]}</td>
                    <td>{stat["purchasing_power_index"]}</td>
                    <td>{stat["safety_index"]}</td>
                    <td> <a href="#/life-stats/{stat.country}/{stat.date}">
                        <Button style="background-color: yellowgreen;"> Editar </Button>
                          </a>
                         <Button outline style="margin-right: 10px;"  color="danger" on:click={()=>deleteLifeStat(stat.country, stat.date)}>
                         Borrar </Button> 
                         </td> 
                </tr> 
                {/each}
            </tbody>
        </Table>
         <Button style="background-color:darkgray " on:click="{pop}"> Volver </Button>
    {:else}
    <br/>
    <p style="text-align: center; background-color: antiquewhite;"> Para ver los datos pulse el botón.</p>
        
    <Button style="background-color:darkgray" on:click="{pop}"> Volver </Button>
    {/if}

    {#if errorMsg}
            <p style="color: red; text-align:center; font-size: 20px;">ERROR: {errorMsg}</p>
    {/if}

    {#if correctMsg}
         <p style="color: green; text-align:center; font-size: 20px;">{correctMsg}</p>
    {/if} 
   
</main>



<style>
   
</style>
