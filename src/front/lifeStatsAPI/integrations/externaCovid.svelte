<script>
    import {Button } from 'sveltestrap';
    
    let data = [];
    let respuesta = [];
    let dataSet = []
     //API Externa 1
     async function loadGraph(){
        const res = await fetch("https://covid-193.p.rapidapi.com/statistics", {
	    "method": "GET",
	    "headers": {
		"x-rapidapi-host": "covid-193.p.rapidapi.com",
		"x-rapidapi-key": "0f1c9a6651mshcc6fb880746f7d2p18a345jsna7eda5bbbed3"
	    }});

        data = await res.json();    
        respuesta = data.response;
        respuesta.forEach((r) => {
                let datos = { 
                    'name': r.country,
                    'value': r.deaths.total
            };
        console.log(datos);
        dataSet.push(datos);
        });    

    };
    
       
    
    </script>
    
    <main>
        <h1>Hola hola </h1>
        <Button style="background-color:darkgray" on:click="{loadGraph()}"> Volver </Button>
        <BubbleChart data=dataSet height={450} width={450} />
    
    </main>