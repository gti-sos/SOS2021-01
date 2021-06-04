<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";

    //Uso de API externa rick and morty
    var divorceStats = [];
    var obesityStats = [];
    var errorMsg = "";
    var okMsg = "";
    async function getStats() {
        console.log("Fetching divorce data...");

        const res = await fetch(
            "/api/v2/divorce-stats"
        );

        if (res.ok) {
            const json = await res.json();
            divorceStats = json;
            //console.log(Object.keys(json));

            console.log(`We have received ${divorceStats.length} stats.`);

            console.log("Ok");
        } else {
            errorMsg = "Error al obtener los  datos";
            okMsg = "";
            console.log("ERROR!" + errorMsg);
        }

        console.log("Fetching Obesity stats data...");

        const res1 = await fetch(
            "/api/integration/obesity-stats"

            
        );

        if (res.ok) {
            const json = await res1.json();
            obesityStats = json;

            console.log(`We have received ${obesityStats.length} stats.`);

            console.log("Ok");
        } else {
            errorMsg = "Error al obtener los  datos the obesidad";
            okMsg = "";
            console.log("ERROR!" + errorMsg);
        }
    }

    async function onLoad() {
        await getStats();
        var array = [];
        var divorceCountries = [];
        var obesityCountries = [];
        var datos = [];
        var paisesComunes = [];

        divorceStats.forEach((element) => {
            if (!divorceCountries.includes(element.country)) {
                divorceCountries.push(element.country);
            }
        }),
        console.log("divorce countries",divorceCountries);

            obesityStats.forEach((element) => {
                if (!obesityCountries.includes(element.country)) {
                    obesityCountries.push(element.country);
                }
            }),
        console.log("obesity countries", obesityCountries);

            (paisesComunes = divorceCountries.filter((value) =>
                obesityCountries.includes(value)
            ));

        console.log("paises comunes ", paisesComunes);

        divorceStats.forEach((e) => {
            var dato = {
                country: "",
                divorceRate: null,
                man_obesity: null,
                woman_obesity: null,
            };

            if (paisesComunes.includes(e.country)){
             
                dato.country = e.country;
                dato.divorceRate = e["divorce-rate"];
                datos.push(dato);
            }
        }),

            obesityStats.forEach((e) => {

                if (paisesComunes.includes(e.country)) {

                    for ( var i = 0; i< datos.length; i++){

                        if(datos[i]["country"] == e.country){

                            var dato1 = datos[i]
                            dato1.man_obesity = e.man_percent;
                            dato1.woman_obesity = e.woman_percent;
                            datos[i]= dato1
                            
                        }

                    }
                }
               
            });
        console.log("estos son los paises comunes ", paisesComunes);
        console.log("estos son los datos ", datos);
        var serie1 = { name: "Divorce Rate", points: [] };
        var serie2 = { name: "Man Obesity", points: [] };
        var serie3 = { name: "Woman Obesity", points: [] };

        datos.forEach((e) => {
            var point1 = { x: e.country, y: e.divorceRate };
            var point2 = { x: e.country, y: e.man_obesity };
            var point3 = { x: e.country, y: e.woman_obesity };
            
            serie1.points.push(point1);
            serie2.points.push(point2);
            serie3.points.push(point3);
        });
        console.log("esta es la serie 1" ,serie1);
        console.log("esta es la serie 2" ,serie2);
        console.log("esta es la serie 3" ,serie3);



        var chart = JSC.chart("chartDiv", {
            debug: true,
            type: "column rounded",
            title_label_text: "Medición de los distintos porcentajes por paises, porcentaje de divorcios, porcentaje de obesidad masculina y obesidad femenina (entre los paises comunes de las APIs)",
            yAxis: { label_text: "Medidas" },
            xAxis_label_text: "Paises",
            series: [serie1, serie2, serie3],
        });
    }
</script>

<svelte:head>
    <script
        src="https://code.jscharting.com/latest/jscharting.js"
        on:load={onLoad}></script>
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
        <h2>Integración entre Divorcios y Obesidad </h2>
    </div>

    {#if errorMsg}
        <p>{errorMsg}</p>
    {:else}
        <div id="chartDiv" />
    {/if}
</main>

<style>
    #chartDiv {
        width: 100%;
        height: 400px;
    }
</style>
