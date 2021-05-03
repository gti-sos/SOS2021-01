<script lang="ts">
    import { onMount } from "svelte";
    
    import { pop } from "svelte-spa-router";
    import {Button, Table } from 'sveltestrap';
    
    
    const BASE_LIFE_API_URL = "/api/v1/life-stats";

    export let params = {};
    let lifeStat={};

    let updatedCountry = "";
    let updatedDate = 0;
    let updatedQuality = 0.0;
    let updatedPurchasing = 0.0;
    let updatedSafety = 0.0;

    let errorMsg = "";
    let correctMsg = "";

    onMount(getLifeStat);

    async function getLifeStat() {
        console.log("Fetching data...");
        const res = await fetch(BASE_LIFE_API_URL + "/" + params.country + "/" + params.date);
        if(res.ok){
            console.log("Ok:");
            const json = await res.json();
            lifeStat = json;
            updatedCountry = lifeStat.country;
            updatedDate = lifeStat.date;
            updatedQuality = lifeStat['quality_life_index'];
            updatedPurchasing = lifeStat['purchasing_power_index'];
            updatedSafety = lifeStat['safety_index'];
            console.log("Received data.");
        }else if(res.status ==404){
            errorMsg = "No se encuentra el dato a editar.";
            console.log("ERROR. " + errorMsg);
        }else {   //res.status ===500)
          errorMsg = "No se ha podido acceder a la base de datos";
          console.log("ERROR. " + errorMsg);
        }        
    }

    async function updateLifeStat(){
        console.log("Updating data..." + params.country + " " + params.date);
        const res = await fetch(BASE_LIFE_API_URL  + "/" + params.country + "/" + params.date, {
            method: "PUT",
            body: JSON.stringify({
                country: params.country,
                date: parseInt(params.date),
                "quality_life_index": updatedQuality,
                "purchasing_power_index": updatedPurchasing,
                "safety_index": updatedSafety
            }),headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            if(res.ok){
                console.log("Ok. ");
                errorMsg = "";
                correctMsg = `El dato con país: ${params.country} y año: ${params.date} ha sido actualizado correctamente.`;
                getLifeStat();
               
            }else if(res.status==404){
                errorMsg = "El dato que intenta editar no existe.";
            }else if(res.status==500){
                errorMsg = "Error accediendo a la base de datos.";
            }
        });
    
    }
    </script>
    
    <main>
        
        <h2>  Editar dato   </h2>
        <div id="update">
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
                    <td>{updatedCountry}</td>
                    <td>{updatedDate}</td>
                    <td><input type="number" placeholder="0.00"  min="0" bind:value = "{updatedQuality}" /> </td>
                    <td><input  type="number" placeholder="0.00" min="0" bind:value = "{updatedPurchasing}" /></td>
                    <td><input type="number" placeholder="0.00" min="0" bind:value = "{updatedSafety}" />  </td>
                    <td> <Button color="primary" on:click={() => updateLifeStat()}> Actualizar </Button></td>
                </tr>
            </tbody>
        </Table>
        <Button style="background-color:darkgray" on:click="{pop}"> Volver </Button>
        </div>

          
    {#if errorMsg}
    <p style="color: red; text-align:center; font-size: 20px;">ERROR: {errorMsg}</p>
    {/if}

    {#if correctMsg}
    <p style="color: green; text-align:center; font-size: 20px;">{correctMsg}</p>
    {/if}  

    </main>
  

    <style>
        
        h2 {
            text-align: center;
            margin-top: 2%;
        }
        div {
            margin-top: 5%;
            margin-left:50px ;
		    margin-right: 50px;
        }
    </style>