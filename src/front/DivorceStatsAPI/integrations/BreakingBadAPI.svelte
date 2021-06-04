<script>
    import { CardText, Nav, NavItem, NavLink } from "sveltestrap";

    //Uso de API externa Breaking Bad
    var episodes = [];
    var errorMsg = "";
    var okMsg = "";
    async function getStats() {
        console.log("Fetching data...");

        const res = await fetch("https://breakingbadapi.com/api/episodes");

        if (res.ok) {
            const json = await res.json();
            episodes = json;

            //console.log(Object.keys(json));
            //console.log(Object.keys(episodes));

            console.log(`We have received ${episodes.length} episodes.`);

            console.log("Ok");
        } else {
            errorMsg = "Error al obtener los  datos de los personajes";
            okMsg = "";
            console.log("ERROR!" + errorMsg);
        }
    }

    async function onLoad() {
        await getStats();
        var array = [];
        var charactersPerSeason = [];

        var totalCharactersS1 = 0;
        var totalCharactersS2 = 0;
        var totalCharactersS3 = 0;
        var totalCharactersS4 = 0;
        var totalCharactersS5 = 0;

        var numEpisodes = [0, 0, 0, 0, 0];

        var point = { x: "name", y: "number of episodes", z: null }; // y=number of characters per season

        episodes.forEach((c) => {
            //console.log(Object.values(c));

            console.log(`imprimiendo c ${Object.keys(c)}`);

            switch (c.season) {
                case "1":
                    totalCharactersS1 += c.characters.length;

                    numEpisodes[0] = numEpisodes[0] + 1;
                    break;
                case "2":
                    totalCharactersS2 += c.characters.length;
                    numEpisodes[1] = numEpisodes[1] + 1;
                    break;
                case "3":
                    totalCharactersS3 += c.characters.length;
                    numEpisodes[2] = numEpisodes[2] + 1;
                    break;
                case "4":
                    totalCharactersS4 += c.characters.length;
                    numEpisodes[3] = numEpisodes[3] + 1;
                    break;
                case "5":
                    totalCharactersS5 += c.characters.length;
                    numEpisodes[4] = numEpisodes[4] + 1;
                    break;
            }
        });
        charactersPerSeason.push(
            totalCharactersS1,
            totalCharactersS2,
            totalCharactersS3,
            totalCharactersS4,
            totalCharactersS5
        );

        /* let points = [
        { x: "A", y: 10 },
        { x: "B", y: 5 },
      ];
   */
        var options = {
            plotOptions: {
                pie: {
                    customScale: 0.6,
                },
            },
            series: numEpisodes,
            labels: [
                "Episodios Temporada 1",
                "Episodios Temporada 2",
                "Episodios Temporada 3",
                "Episodios Temporada 4",
                "Episodios Temporada 5",
            ],
            chart: {
                type: "donut",
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 100,
                        },
                        legend: {
                            position: "bottom",
                        },
                    },
                },
            ],
        };

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();

        var options1 = {
            plotOptions: {
                pie: {
                    customScale: 0.6,
                },
            },
            series: charactersPerSeason,
            labels: [
                "Número de personajes Temporada 1",
                "Número de personajes Temporada 2",
                "Número de personajes Temporada 3",
                "Número de personajes Temporada 4",
                "Número de personajes Temporada 5",
            ],
            chart: {
                type: "donut",
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 100,
                        },
                        legend: {
                            position: "bottom",
                        },
                    },
                },
            ],
        };

        var chart1 = new ApexCharts(
            document.querySelector("#chart1"),
            options1
        );
        chart1.render();
    }
</script>

<svelte:head>
    <script
        src="https://cdn.jsdelivr.net/npm/apexcharts"
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
        <h2>Uso API externa Breaking Bad</h2>
        <CardText>
            Representacón del número de capitulos en cada temporada de la serie
            Breaking Bad</CardText
        >
    </div>

    {#if errorMsg}
        <p>{errorMsg}</p>
    {:else}
        <div id="chart" />
        <CardText>
            Representación del número de personajes que aparecen en cada
            temporada de la serie Breaking Bad</CardText
        >
        <div id="chart1" />
    {/if}
</main>
