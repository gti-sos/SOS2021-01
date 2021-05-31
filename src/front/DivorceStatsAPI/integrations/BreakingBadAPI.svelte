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

        var totalCharactersS1=0;
        var totalCharactersS2=0;
        var totalCharactersS3=0;
        var totalCharactersS4=0;
        var totalCharactersS5=0;

        var numEpisodes = [0,0,0,0,0]

        var point = { x: "name", y: "number of episodes" , z: null}; // y=number of characters per season 


        episodes.forEach((c) => {
            //console.log(Object.values(c));


            console.log(`imprimiendo c ${Object.keys(c)}`);

            
           switch( c.season ){
               case "1" :
                   totalCharactersS1 += c.characters.length;
                   numEpisodes[0]= numEpisodes[0]+1;
                   break;
                case "2" :
                   totalCharactersS2+= c.characters.length;
                   numEpisodes[1] = numEpisodes[1]+1;
                   break;
                case "3" :
                   totalCharactersS3+= c.characters.length;
                   numEpisodes[2]= numEpisodes[2]+1;
                   break;
                case "4" :
                   totalCharactersS4+= c.characters.length;
                   numEpisodes[3]= numEpisodes[3]+1;
                   break;
                case "5" :
                   totalCharactersS5+= c.characters.length;
                   numEpisodes[4] = numEpisodes[4] +1;
                   break;
           }

        });
        for ( var i = 0; i < 5; i++){

            var point = { x: "name", y: "number of episodes" , z: null}; // y=number of characters per season

            switch( i ){
               case 0 :
               point.x = "season 1"
               point.y = numEpisodes[0];
               point.z = totalCharactersS1;
                   break;
                case 1 :
                point.x = "season 2"
                point.y = numEpisodes[1];              
                point.z = totalCharactersS2;
                   break;
                case 2 :
                point.x = "season 3"
                point.y = numEpisodes[2];
                point.z = totalCharactersS3;
                   break;
                case 3 :
                point.x = "season 4"
                point.y = numEpisodes[3]
                point.z = totalCharactersS4;

                   break;
                case 4 :
                point.x = "season 5"
                point.y = numEpisodes[4];
                point.z = totalCharactersS5;

                   break;
           }
           
           console.log(Object.values(point));
           console.log(array);
           array.push(point);

        }
        /* let points = [
        { x: "A", y: 10 },
        { x: "B", y: 5 },
      ];
   */
   var chart = JSC.chart('chartDiv', {
        debug: true,
        //title_label_text: 'Breaking Bad characters per season',
        legend_visible: false,
        
        
        defaultSeries: {
          type: 'pie donut',
          shape: {
            innerSize: '30%',
            padding: 0.005,
            offset: '1,80'
          }
        },
        yAxis_label_text: 'Number of episodes in this season',
        zAxis_label_text: 'Number of characters in this season',
        defaultAnnotation: { label_style: { fontSize: '400px' } },
    
         
        series: [
          {
            name: 'total of character in the serie ',
            points: array
              
          }
            ]
        
      });
      
   

    }
</script>

<svelte:head>
    <script
    type="text/javascript" src="https://code.jscharting.com/latest/jscharting.js"
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
        <h2>Uso API externa Breaking Bad </h2>
        <CardText> Representacón del número de personajes total que aparecen en cada temporada de la serie Breaking Bad</CardText>
    </div>

    {#if errorMsg}
        <p>{errorMsg}</p>
    {:else}
        <div id="chartDiv"  />
    {/if}
</main>

<style>
    #chartDiv {
        width: 100%;
        height: 400px;
    }
</style>
