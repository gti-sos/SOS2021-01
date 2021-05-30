<script>
    import { onMount } from "svelte";

    import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";

    const BASE_CONTACT_API_PATH = "/api/v2";

    let divorceData = [];
    let divorceChartData = [];

    

    let errorMsg = "";
    let okMsg = "";


    async function loadChart() {
        console.log("Fetching data...");

        const res = await fetch(BASE_CONTACT_API_PATH + "/divorce-stats");
        divorceData = await res.json();

        if (res.ok) {
            //var dato = {name: "", low: 0};
            
            divorceData.forEach((stat) => {

                var dato = {name: "", low: 0};

                  dato.name =   stat.country + "-" + stat.date;
                  dato.low = stat["divorce-rate"];

                console.log("añadiendo el dato:", dato);
              
                divorceChartData.push(dato);
                
            });
        }

        //console.log("divorce Chart DaTa: " + divorceChartData);

        Highcharts.chart("container", {
            chart: {
                type: "lollipop",
            },

            accessibility: {
                point: {
                    valueDescriptionFormat:
                        "{index}. {xDescription}, {point.y}.",
                },
            },

            legend: {
                enabled: false,
            },

            /* subtitle: {
                text: "2018",
            }, */

            title: {
                text: "Divorce rate by country",
            },

            tooltip: {
                shared: true,
            },

            xAxis: {
                type: "category",
            },

            yAxis: {
                title: {
                    text: "Divorce rate ",
                },
            },

            series: [{name: "divorce rate", data: divorceChartData}]
                
        
        });
    }
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/dumbbell.js"></script>
    <script src="https://code.highcharts.com/modules/lollipop.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"on:load="{loadChart}"></script>
</svelte:head>
<main>
    <Nav>
        <NavItem>
            <NavLink href="/">Página Principal</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="#/divorce-stats">Interfaz</NavLink>
        </NavItem>
    </Nav>

    <div>
        <h2>Análiticas</h2>
    </div>

    <div>
        {#if errorMsg}
            <p class="msgRed" style="color: #9d1c24">ERROR: {errorMsg}</p>
        {/if}
        {#if okMsg}
            <p class="msgGreen" style="color: #155724">{okMsg}</p>
        {/if}
    </div>

    <div>
        <figure class="highcharts-figure">
            <div id="container" />
            <p class="highcharts-description">
                Gráfico de líneas tipo lollipop que muestra los diferentes valores de ratio de divorcios segun pais/año
            </p>
        </figure>
    </div>
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        margin: 0 auto;
    }
    div {
        margin-bottom: 15px;
    }
    p {
        display: inline;
    }
    .msgRed {
        padding: 8px;

        background-color: #f8d7da;
    }
    .msgGreen {
        padding: 8px;

        background-color: #d4edda;
    }
    .highcharts-figure,
    .highcharts-data-table table {
        min-width: 360px;
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
