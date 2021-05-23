<script>
    import * as echarts from 'echarts/core';
    import {
        TitleComponent,
        TooltipComponent,
        VisualMapComponent
    } from 'echarts/components';
    import {
        PieChart
    } from 'echarts/charts';
    import {
        CanvasRenderer
    } from 'echarts/renderers';
    import {
        Nav,
        NavItem,
        NavLink
      } from "sveltestrap";
    
    echarts.use(
        [TitleComponent, TooltipComponent, VisualMapComponent, PieChart, CanvasRenderer]
    );
    
    var characters = [];
      var errorMsg = "";
      var okMsg = "";
      async function getStats() {
        console.log("Fetching data...");
    
        const res = await fetch("https://rickandmortyapi.com/api/character/");
    
        if (res.ok) {
          const json = await res.json();
          characters = json[1];
    
          console.log(`We have received ${characters.length} characters.`);
    
          console.log("Ok");
        } else {
          errorMsg = "Error al obtener los  datos de los personajes";
          okMsg = "";
          console.log("ERROR!" + errorMsg);
        }
      }
    
      async function loadChart(){
     await getStats();
    
    
     let datos = [];
     for( let  i = 0 ; i < characters.length; i++  ){
            let aux = {name: characters[i].name, value: characters[i].episodes.length }
                       datos.push(aux)
                    } 
    
     var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    var option;
    
    option = {
        backgroundColor: '#2c343c',
    
        title: {
            text: 'Pie Chart about Rick and Morty character´s appareance in the serie by episodes',
            left: 'center',
            top: 20,
            textStyle: {
                color: '#ccc'
            }
        },
    
        tooltip: {
            trigger: 'item'
        },
    
        visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series: [
            {
                name: 'Chart',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data:  
    
                    
    
                    
                  /*   {value: 335, name: '直接访问'},
                    {value: 310, name: '邮件营销'},
                    {value: 274, name: '联盟广告'},
                    {value: 235, name: '视频广告'},
                    {value: 400, name: '搜索引擎'} */
                datos.sort(function (a, b) { return a.value - b.value; }),
                roseType: 'radius',
                label: {
                    color: 'rgba(255, 255, 255, 0.3)'
                },
                labelLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                },
                itemStyle: {
                    color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
    
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
    };
    
    option && myChart.setOption(option);
    
    
    
      }
    </script>
    
    
    <!-- <svelte:head>
      <script src="https://cdn.jsdelivr.net/npm/chart.js" on:load={loadChart}></script>
    </svelte:head>
     -->
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
          Uso API externa Rick and Morty API
        </h2>
      </div>
    
      {#if errorMsg}
        <p>{errorMsg}</p>
      {:else}
      <div>
        <canvas id="myChart"></canvas>
      </div>
      {/if}
    </main>