<script>
    import { onMount } from 'svelte';
    import { pop } from "svelte-spa-router";
    import { Table, Button } from "sveltestrap";

    const BASE_LIFE_API_URL = "/api/v2/life-stats"; //tiene que llamar a la API para tratar los datos
	
    let cargados = false;
    let lifeStats = [];
    let errorMsg = "";
    let correctMsg = "";

    /*pagination*/
    let limit = 10; /*limit es el número de elementos por página*/
	let offset = 0; /*offset indica desde qué elemento se va a empezar a mostrar*/
    let numDataPag=0;
    let maxpag = false; /*será true si hay menos datos que el límite permitido*/

  
    /*para insertar un nuevo dato*/
    let newData = {
    country: "",
    date: "",
    "quality_life_index": "",
    "purchasing_power_index": "",
    "safety_index": "",
    };

    /*búsqueda*/
    let currentCountry = "";
	let currentDate = "";
    let search = false;
    let searchData = {
    country: "",
    date: "",
    "quality_life_index": "",
    "purchasing_power_index": "",
    "safety_index": "",
    };
    
    //let countries = [];



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
        const res = await fetch(BASE_LIFE_API_URL + "?limit=" + limit + "&offset=" + offset);

        if (res.ok) {
            cargados =  true;
            console.log("Ok. Obtaining data...");
            const json = await res.json();
            lifeStats = json;            
            numDataPag= lifeStats.length; //numero de datos por pagina
            if(numDataPag < limit){
                maxpag=true;
            }else{
                maxpag=false;
            }
            console.log(`Received ${numDataPag} life stats.`);
            
        }else if (res.status == 500) {
            correctMsg=""
            errorMsg = "No se ha podido acceder la base de datos."
            console.log(errorMsg);
        }else if (res.status == 404) { 
            correctMsg="";
            errorMsg = "No se encuentran datos."
            pagBefore();
            console.log("Error. " +  errorMsg)
        } else { 
            correctMsg="" 
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
                    correctMsg=""
                    errorMsg= "Ya existe un recurso con el mismo país y año."
                    console.log("ERROR. " + errorMsg);
				}else { //status == 500
                    correctMsg=""
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
                correctMsg=""
                errorMsg ="No hay datos para borrar."                
                console.log("ERROR. " + errorMsg);
			} else  { //status == 500
                correctMsg=""
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
                correctMsg=""
                errorMsg= `No se encuentra el dato con país:  ${country} y año: ${date}.`;
                console.log("ERROR. " +  errorMsg);
			} else  { //status == 500
                correctMsg=""
                errorMsg = "No se ha podido acceder a la base de datos.";
				console.log("ERROR. " +  errorMsg);
			}		
        });
    }  
    
    async function searchStat(country, date){ //como la búsqueda es por país y año, no necesitamos paginación porque solo se mostrará un recurso
        offset = 0;
        const res = await fetch(BASE_LIFE_API_URL + "/" + country  + "/" + date);
        
        if (res.ok) {
            cargados =  true;
            search = true;
            correctMsg="";
            console.log("Ok. Searching data...");
            const json = await res.json();
            searchData = json;            
            console.log(`Received the data searched.`);
            
        }else if (res.status == 500) {
            correctMsg=""
            errorMsg = "No se ha podido acceder la base de datos."
            console.log(errorMsg);
        }else if (res.status == 404) { 
            correctMsg = "";
            errorMsg = "No se encuentra el dato."
            console.log("Error. " +  errorMsg)
        } else {
            correctMsg=""
            errorMsg = res.status + ": " + res.statusText;
            console.log(errorMsg);
        }

    }

    async function reset(){
        search=false;
    };

    async function pagBefore(){ /*offset indica desde qué elemento se va a empezar a mostrar*/
        correctMsg="";
        errorMsg="";
		if (offset >= 10){
            offset = offset - limit;
        } 
		getLifeStats();	
	}

    async function pagNext(){
        correctMsg="";
        errorMsg="";
        offset = offset + limit;
		getLifeStats();
	
    }    



    
</script>
  

<main>
    <div>
        {#if cargados}  
        <Button outline color="primary" disabled> Cargar datos iniciales </Button>
        {:else}
        <Button outline color="primary" on:click={loadLifeStats}> Cargar datos iniciales</Button>
        {/if}
        <Button outline color= "danger" on:click={deleteLifeStats}> Eliminar datos</Button>
        
    </div>
    
    <h4>Búsqueda por país y año</h4>
        <Table bordered style="text-align: center;">
            <thead>
                <tr>
                    <th>País</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                </tr>
            </thead>    
            <tbody>
                <tr>
					<td><input id="search_input_country" placeholder="Ej. Spain" bind:value = "{currentCountry}" /></td>
					<td><input id="search_input_date" type="number" placeholder="Ej. 2021" bind:value = "{currentDate}" /></td>
                    <td><Button id="search_button" outline color= "info" on:click={()=>searchStat(currentCountry, currentDate)}> Buscar</Button>
                        <Button  style="background-color: darkgrey" on:click={()=>reset()}> Restaurar</Button></td> 
                </tr>
            </tbody>

        </Table> 
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
					<td><input id="insert_input_country" placeholder="Ej. Spain" bind:value = "{newData.country}" /></td>
					<td><input id="insert_input_date" type="number" placeholder="Ej. 2021" bind:value = "{newData.date}" /></td>
                    <td><input id="insert_input_quality" type="number" placeholder="0.00"  min="0" bind:value = "{newData['quality_life_index']}" /></td>
					<td><input id="insert_input_purchasing" type="number" placeholder="0.00" min="0" bind:value = "{newData['purchasing_power_index']}" /></td>
					<td><input id="insert_input_safety" type="number" placeholder="0.00" min="0" bind:value = "{newData['safety_index']}" /></td>
					<td><Button id="insert_button" outline color= "primary" on:click={insertLifeStat}> Insertar</Button></td> 
				</tr>
                {#if search} <!-- Si se realiza una búsqueda solo aparecerá en la tabla ese recurso -->
                    <tr>
                        <td>{searchData.country}</td> 
                        <td>{searchData.date}</td>
                        <td>{searchData["quality_life_index"]}</td>
                        <td>{searchData["purchasing_power_index"]}</td>
                        <td>{searchData["safety_index"]}</td>
                        <td> <a href="#/life-stats/{searchData.country}/{searchData.date}">
                            <Button id="edit_button_{searchData.country}_{searchData.date}" style="background-color: yellowgreen;"> Editar </Button>
                            </a>
                            <Button id="delete_button_{searchData.country}_{searchData.date}" outline style="margin-right: 10px;"  color="danger" on:click={()=>deleteLifeStat(searchData.country, searchData.date)}>
                            Borrar </Button> 
                            </td> 
                    </tr>                 
                {:else}
                    {#each lifeStats as stat}
                    <tr>
                        <td>{stat.country}</td>
                        <td>{stat.date}</td>
                        <td>{stat["quality_life_index"]}</td>
                        <td>{stat["purchasing_power_index"]}</td>
                        <td>{stat["safety_index"]}</td>
                        <td> <a href="#/life-stats/{stat.country}/{stat.date}">
                            <Button 
                            id="edit_button_{stat.country}_{stat.date}" style="background-color: yellowgreen;"> Editar </Button>
                            </a>
                            <Button id="delete_button_{stat.country}_{stat.date}" outline style="margin-right: 10px;"  color="danger" on:click={()=>deleteLifeStat(stat.country, stat.date)}>
                            Borrar </Button> 
                            </td> 
                    </tr> 
                    {/each}
                {/if}
            </tbody>
        </Table>
        
        
        {#if maxpag} <!--si hemos llegado al maximo de paginas, no saldrá el botón siguiente-->
            <Button color="info" on:click={pagBefore}>ANTERIOR</Button>        
                Número de datos en esta página: {numDataPag}
            
        {:else}
            <Button color="info" on:click={pagBefore}>ANTERIOR</Button>        
            Número de datos en esta página: {numDataPag}       
            <Button color="info" on:click={pagNext}>SIGUIENTE</Button>      
            
        {/if}

        <br/> <br/><Button style="background-color:darkgray " on:click="{pop}"> Volver </Button>

    {:else}
    <br/>
    <p class="inicio"> Para ver los datos cárguelos.</p>
        
    <Button style="background-color:darkgray" on:click="{pop}"> Volver </Button>
    {/if}

    {#if errorMsg}
        <p class="error">ERROR: {errorMsg}</p>
    {/if}
    {#if correctMsg}
         <p class="correcto">{correctMsg}</p>
    {/if} 
    

</main>



<style>
    h4{
        margin-bottom:20px;
        text-align: center;
    }
    p.inicio {
        text-align: center; 
        background-color: antiquewhite;
    }
    p.error {
        color: red; 
        text-align:center;
        font-size: 20px;
        margin-bottom:20px;
    }
    p.correcto {
        color: green;
        text-align:center; 
        font-size: 20px;
        padding-bottom: 20px;
    }
    main {
        padding-bottom:50px;
    }
</style>
