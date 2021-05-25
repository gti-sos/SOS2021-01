<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";

    //Integración de Divorce stats y Air Death´s Pollution
    var divorceStats = [];
    var deathStats = [];

    var errorMsg = "";
    var okMsg = "";
    async function getStats() {
        console.log("Fetching divorce stats data...");

        const res = await fetch(
            "https://sos2021-01.herokuapp.com/api/v1/divorce-stats"
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

        console.log("Fetching air death´s pollution data...");

        const res1 = await fetch(
            "https://sos2021-03.herokuapp.com/api/v1/air-pollution"
        );

        if (res1.ok) {
            const json1 = await res1.json();
            deathStats = json1;
            //console.log(Object.keys(json1));

            console.log(`We have received ${deathStats.length} stats.`);

            console.log("Ok");
        } else {
            errorMsg = "Error al obtener los  datos";
            okMsg = "";
            console.log("ERROR!" + errorMsg);
        }
    }

    async function onLoad() {
        await getStats();
        var array = [];
        var arrayChartDivorces = [];
        var arrayChartDeaths = [];

        divorceStats.forEach((c) => {
            //console.log(Object.keys(c));

            console.log(`imprimiendo c ${c}`);

            var data = {
                country: "",
                year: null,
                DivorceRate: null,
                AirDeaths: null,
            };
            data.country = c.country;
            data.year = c.date;
            data.DivorceRate = c["divorce-rate"];

            //console.log(Object.values(data));
            array.push(data);
        });
        deathStats.forEach((c) => {
            var exists = 0;

            var data = {
                country: "",
                year: null,
                DivorceRate: null,
                AirDeaths: null,
            };

            for (var i = 0; i < array.lenth; i++) {
                if (c.year == array[i].year && c.country == array[i].country) {
                    array[i].AirDeaths = c.deaths_air_pollution;
                    exists = 1;
                }
            }
            if (exists != 1) {
                data.country = c.country;
                data.year = c.year;
                data.AirDeaths = c.deaths_air_pollution;
                array.push(data);
            }
            //console.log(Object.values(data));
            //console.log("print del array", array);
        });

        // { country: Spain, year: 2019, DivorceRate: 5, Air Polution´s Deaths Rate: 10] },

        /* var grid = new JSC.Grid("grid", {
            debug: true,
            data: array,
            headerCol: true,

            columns: [
                { header: "Country", value: "%country" },
                { header: "Year", value: "%year" },
                {
                    header: "Divorce Rate",
                    value: "%DivorceRate",
                    align: "right",
                },
                {
                    header: "Air Polution´s Deaths",
                    value: "%AirDeaths",
                    align: "center",
                },
            ],
        }); */
        

        divorceStats.forEach((c) => {
            var dato = [];

                dato.push(c.country);
                console.log(parseInt(-c["divorce-rate"]));
                dato.push(parseInt(-c["divorce-rate"]));
                arrayChartDivorces.push(dato)
            
        });

        deathStats.forEach((c) => {
            var dato = [];

                dato.push(c.country);
                dato.push(c.deaths_air_pollution);
                arrayChartDeaths.push(dato)
            
        });

        var chart = JSC.chart("chartDiv", {
            debug: true,
            type: "horizontal column",
            title_label_text:
                "Divorce Rate and Deaths caused by air pollution by countries",
            yAxis: {
                scale_type: "stacked",
                defaultTick_label_text: "{Math.abs(%Value):a2}",
            },
            xAxis: { label_text: "Country", crosshair_enabled: true },
            defaultTooltip_label_text: "country %xValue:<br><b>%points</b>",
            defaultPoint_tooltip: "%icon {Math.abs(%Value)}",
            legend_template: "%name %icon {Math.abs(%Value)}",
            series: [
                {
                    name: "Divorce Rate",
                    points: {
                        mapTo: "x,y",
                        data: arrayChartDivorces
                    },
                },
                {
                    name: "Air Pollution´s Deaths ratio",
                    points: {
                        mapTo: "x,y",
                        data: arrayChartDeaths /* [
                            ["0-4", 9619810],
                            ["5-9", 10092946],
                            ["10-14", 10093446],
                            ["15-19", 10066517],
                            ["20-24", 11266559],
                            ["25-29", 10711383],
                            ["30-34", 10893282],
                            ["35-39", 9770693],
                            ["40-44", 10381899],
                            ["45-49", 10222507],
                            ["50-54", 11532467],
                            ["55-59", 11232544],
                            ["60-64", 9800743],
                            ["65-69", 8392833],
                            ["70-74", 6168134],
                            ["75-79", 4394229],
                            ["80+", 7460923],
                        ], */
                    },
                },
            ],
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
        <h2>
            Integracion de divorcios y muertes causadas por la contaminación
            aerea
        </h2>
    </div>

    {#if errorMsg}
        <p>{errorMsg}</p>
    {:else}
        <div id="chartDiv" />
        <div id="grid" />
    {/if}
</main>

<style>
    #chartDiv {
        width: 100%;
        height: 400px;
    }
</style>
