<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";

    //API de los personajes de Breaking BAd por episodios
    var episodes = [];
    var errorMsg = "";
    var okMsg = "";
    async function getStats() {
        console.log("Fetching data...");

        const res = await fetch("https://breakingbadapi.com/api/episodes");

        if (res.ok) {
            const json = await res.json();
            episodes = json;

            console.log(`We have received ${episodes.length} episodes.`);

            console.log("Ok");
        } else {
            errorMsg = "Error al obtener los datos de los episodios";
            okMsg = "";
            console.log("ERROR!" + errorMsg);
        }
    }

    am4core.ready(function () {
        getStats();
        // Themes begin
        am4core.useTheme(am4themes_dark);
        am4core.useTheme(am4themes_animated);
        // Themes end

        function processData(episodes) {
            var treeData = [];

            var irrelevantCharacters = { name: "Other", children: [] };

            for (var episode in episodes) {
                var episodeData = { name: episode_id, children: [] };
                var episodeCharacters = 0;
                for (var character in episodeData[characters]) {
                    episodeCharacters += episodeData[characters][character];
                }

                
                    treeData.push(episodeData);
            
            }

            return treeData;
        }

        // create chart
        var chart = am4core.create("chartdiv", am4charts.TreeMap);
        chart.padding(0, 0, 0, 0);
        chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

        // only one level visible initially
        chart.maxLevels = 2;
        // define data fields
        chart.dataFields.value = "count";
        chart.dataFields.name = "name";
        chart.dataFields.children = "children";
        chart.homeText = "Breaking Bad character´s appearance by episodes";

        // enable navigation
        chart.navigationBar = new am4charts.NavigationBar();
        chart.zoomable = false;

        // level 0 series template
        var level0SeriesTemplate = chart.seriesTemplates.create("0");
        level0SeriesTemplate.strokeWidth = 2;

        // by default only current level series bullets are visible, but as we need brand bullets to be visible all the time, we modify it's hidden state
        level0SeriesTemplate.bulletsContainer.hiddenState.properties.opacity = 1;
        level0SeriesTemplate.bulletsContainer.hiddenState.properties.visible = true;
        // create hover state
        var columnTemplate = level0SeriesTemplate.columns.template;
        var hoverState = columnTemplate.states.create("hover");

        // darken
        hoverState.adapter.add("fill", function (fill, target) {
            if (fill instanceof am4core.Color) {
                return am4core.color(am4core.colors.brighten(fill.rgb, -0.2));
            }
            return fill;
        });

    

        // level1 series template
        var level1SeriesTemplate = chart.seriesTemplates.create("1");
        level1SeriesTemplate.columns.template.fillOpacity = 0;
        level1SeriesTemplate.columns.template.strokeOpacity = 0.4;

        var bullet1 = level1SeriesTemplate.bullets.push(
            new am4charts.LabelBullet()
        );
        bullet1.locationX = 0.5;
        bullet1.locationY = 0.5;
        bullet1.label.text = "{name}";
        bullet1.label.fill = am4core.color("#ffffff");
        bullet1.label.fontSize = 9;
        bullet1.label.fillOpacity = 0.7;

        chart.data = processData(episodes);
    }); // end am4core.ready()
</script>

<svelte:head>
    <script src="https://cdn.amcharts.com/lib/4/core.js"></script>
    <script src="https://cdn.amcharts.com/lib/4/charts.js"></script>
    <script src="https://cdn.amcharts.com/lib/4/themes/dark.js"></script>
    <script src="https://cdn.amcharts.com/lib/4/themes/animated.js"></script>
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
        <h2>Uso API externa de los personajes de la serie Breaking Bad</h2>
    </div>

    {#if errorMsg}
        <p>{errorMsg}</p>
    {:else}
        <div>
            <canvas id="chart" />
        </div>
    {/if}
</main>
<div id="chartdiv"></div>
<style>
    body {
        background-color: #30303d;
        color: #fff;
    }
    #chartdiv {
        width: 100%;
        height: 700px;
    }
</style>
