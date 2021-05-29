<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";

    //Uso de API externa bicis
    var cicles = [];
    var errorMsg = "";
    var okMsg = "";
    async function getStats() {
        console.log("Fetching data...");

        const res = await fetch("http://api.citybik.es/v2/networks/");

        if (res.ok) {
            const json = await res.json();

            cicles = json.networks;

            console.log(`We have received ${cicles.length} stats.`);

            console.log("Ok");
        } else {
            errorMsg = "Error al obtener los  datos de las peliculas";
            okMsg = "";
            console.log("ERROR!" + errorMsg);
        }
    }

    async function onLoad() {
        await getStats();

        var datos = [];
        var padres = [];
        var hijos = [];
        var processedCicles = [];
        var padres_añadidos =[];
        cicles.forEach((e) => {
            var stat = {
                name: e.name,
                country: e.location.country,
                city: e.location.city,
            };
            processedCicles.push(stat);
        });

        ////////////////////
        var numeroMaximo = 0; 
        processedCicles.forEach((e) => {

            numeroMaximo++;

            var padre = { id: e.country, name: e.country };

          

            if (!padres_añadidos.includes(e.country.toString()) && numeroMaximo < 150) {

                padres_añadidos.push(e.country.toString());
                padres.push(padre);

            } else {
                if ( numeroMaximo <150) {hijos.push({ name: e.city, parent: e.country, value: 1 }); }
            }
        });

        datos = padres.concat(hijos);
        console.log(datos);

        ////////////////////

        Highcharts.chart("container", {
            series: [
                {   
                   
                    type: "treemap",
                    layoutAlgorithm: "stripes",
                    alternateStartingDirection: true,
                    levels: [
                        {
                            level: 1,
                            layoutAlgorithm: "sliceAndDice",
                            dataLabels: {
                                enabled: true,
                                align: "left",
                                verticalAlign: "top",
                                style: {
                                    fontSize: "15px",
                                    fontWeight: "bold",
                                },
                            },
                        },
                    ],
                    data: datos,

                    title: {
                        text: "Cities with renting bikes by country",
                    },
                },
            ],
        });
    }
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>

    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    
    <script src="https://code.highcharts.com/modules/export-data.js"></script>

    <script src="https://code.highcharts.com/modules/treemap.js"></script>
    
    <script src="https://code.highcharts.com/modules/accessibility.js"on:load="{onLoad}"></script>
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
            Uso API externa empresas de bicicletas de alquiler por pais y ciudad
        </h2>
    </div>

    {#if errorMsg}
        <p>{errorMsg}</p>
    {:else}
        <figure class="highcharts-figure" />
        <div id="container" />
    {/if}
</main>

<style>
    #chartDiv {
        width: 100%;
        height: 400px;
    }
    .highcharts-figure,
    .highcharts-data-table table {
        min-width: 320px;
        max-width: 800px;
        margin: 1em auto;
    }

    .highcharts-data-table table {
        font-family: Verdana, sans-serif;
        border-collapse: collapse;
        border: 1px solid #ebebeb;
        margin: 10px auto;
        text-align: center;
        width: 100%;
        max-width: 500px;
    }
    .highcharts-data-table caption {
        padding: 1em 0;
        font-size: 1.2em;
        color: #555;
    }
    .highcharts-data-table th {
        font-weight: 600;
        padding: 0.5em;
    }
    .highcharts-data-table td,
    .highcharts-data-table th,
    .highcharts-data-table caption {
        padding: 0.5em;
    }
    .highcharts-data-table thead tr,
    .highcharts-data-table tr:nth-child(even) {
        background: #f8f8f8;
    }
    .highcharts-data-table tr:hover {
        background: #f1f7ff;
    }
</style>
