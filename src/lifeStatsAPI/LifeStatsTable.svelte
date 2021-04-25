<script lang="ts">
    import { } from 'node:os';
import {Button, Table, Toast, ToastBody, ToastHeader } from 'sveltestrap';

    const BASE_API_URL = "/api/v1/life-stats"; //tiene que llamar a la API para tratar los datos
	
    let cargados = false;
    let lifeStats = [];

    async function loadStats(){
        console.log("Loading data...");
        const carga =  await fetch(BASE_API_URL + "/loadInitialData");
        cargados = true;
        if (carga.ok){
            console.log("Ok.");
            const res = await fetch(BASE_API_URL);
            if(res.ok){
                console.log("Ok. Obtaining data...")
                const json = await res.json();
                lifeStats = json;
                console.log('Received ${lifeStats.length} life stats.');
            }else{
                console.log("Error, there is no data.")
            }
        }else{
            console.log("Error loading data.");
        }
    }
   

    async function deleteStats() {
		console.log("Deleting life stats...");
        cargados=false;
		const res = await fetch(BASE_API_URL, {
			method: "DELETE"
		}).then(function (res) {
			if (res.ok){
				console.log("Ok.");
                lifeStats = [];
			} else if (res.status==404){ //no data found
                console.log("No data found");
			} else  { 
				console.log("Error deleting DB stats");
			}
			
		});
	}
</script>
  

<main>
    <div>
        {#if cargados}  
        <Button style="background-color: crimson;" disabled> Cargar datos</Button>
        {:else}
        <Button style="background-color: crimson;" on:click={loadStats}> Cargar datos</Button>
        {/if}
        <Button style="background-color: darkgray" on:click={deleteStats}> Eliminar datos</Button>
        
    </div>
    
  
    {#if lifeStats.length != 0}
        <br/>
        <Table bordered style="text-align: center;">
            <thead>
                <tr>
                    <th>Country</th>
                    <th>Date</th>
                    <th>Quality life index</th>
                    <th>Purchasing power index</th>
                    <th>Safety index</th>
                </tr>
            </thead>
            <tbody>
                {#each lifeStats as stat}
                <tr>
                    <td>{stat.country}</td>
                    <td>{stat.date}</td>
                    <td>{stat["quality_life_index"]}</td>
                    <td>{stat["purchasing_power_index"]}</td>
                    <td>{stat["safety_index"]}</td>
                </tr>
                {/each}
            </tbody>
        </Table>
        <a href="/">Volver</a>
    {:else}
    <br/>
    <p style="text-align: center; background-color: antiquewhite;"> Para ver los datos pulse el botón.</p>
    <a href="/">Volver</a>
    {/if}

</main>


<style>
    a {
        font-size: 18px;
        background-color:rgb(103, 131, 72);
        color: white;
        border-radius: 6px;
        border: 1px solid grey;
        padding:4px;
    }
    a:hover {
        color:white;
    }
</style>
