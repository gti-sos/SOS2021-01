//--------------------------Modules-required----------------
var express = require("express");
var cool = require("cool-ascii-faces");
var path = require("path");
var bodyParser = require('body-parser');
const { Console } = require("console");

//--------------------------Server-variables------------------
var app = express();
var BASE_API_PATH = "/api/v1";
var port = process.env.PORT || 10000;


//--------------------------Server-usages----------------------

app.use("/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(express.json());

//-------------------------------Recurso /cool - F02-----------------------
app.get("/cool", (request, response) => {
  response.send(cool());
  console.log("new request to /cool has arrived");
});

//-------------------------Recurso /info - F03--------------------------
app.get("/info/life-stats", (req, res) => {
  res.send("<html><body> <h3> Quality of life index data source by country, which is linked to the purchasing power index and the safety index. </h3> <table><tr align=center> <th>country </th>  <th>date </th> <th>quality-life-index </th>  <th>purchasing-power-index </th> <th>safety-index </th>  </tr>   <tr align=center>    <td>Denmark </td>   <td>2019 </td>  <td>198.57 </td>   <td>114.39 </td>  <td>75.75 </td>  </tr> <tr align=center>  <td>Switzerland </td> <td>2019 </td><td>195.93 </td>	 <td>129.7 </td>  <td>78.5 </td> </tr> <tr align=center><td>Finland </td><td>2019 </td> <td>194.01 </td>	<td>112.3 </td> <td>77.2 </td></tr>   <tr align=center>  <td>Australia </td>	   <td>2019 </td>     <td>191.13 </td>       <td>122.85 </td>     <td>57.24 </td>  </tr> <tr align=center>  <td>Austria </td>  	<td>2019 </td>  <td>191.05 </td>  	<td>96.7 </td>   <td>78.63 </td></tr> </table> </body> </html>"
  );
});
app.get("/info/natality-stats", (req, res) => {
  res.send(
    "<html> <body> Natality data source. Men and women born, natality and fertlity ratios by year and country.  <table> <tr> <th>country</th>     <th>date</th>     <th>born</th>     <th>men-born</th>     <th>women-born</th>     <th>natality-rate</th>     <th>fertility-rate</th>   </tr>   <tr>     <td>denmark</td>     <td>2019</td>     <td>61.167</td>     <td>31.519</td>     <td>29.648</td>     <td>10.50</td>     <td>1.70</td>   </tr>   <tr>     <td>switzerland</td>     <td>2019</td>     <td>86.172</td>     <td>44.123</td>     <td>42.049</td>     <td>10.00</td>     <td>1.48</td>   </tr>   <tr>     <td>finland</td>     <td>2019</td>     <td>45.613</td>     <td>23.186</td>     <td>22.427</td>     <td>8.30</td>     <td>1.35</td>  </tr>    <tr>     <td>australia</td>     <td>2018</td>     <td>45.613</td>     <td>23.186</td>     <td>22.427</td>     <td>12.60</td>     <td>1.74</td>   </tr>   <tr>     <td>austria</td>     <td>2019</td>     <td>84.952</td>     <td>43.58</td>     <td>41.372</td>     <td>9.60</td>     <td>1.46</td>         </tr>       </table>     </body>   </html>"
  );
});
app.get("/info/divorce-stats", (req, res) => {
  res.send(
    "<html> <p>Divorce data source. Marriage and divorce rate , ratio between marriages and divorces.</p> <table> <tbody> <tr> <th>country</th> <th>year</th> <th>marriage-rate</th> <th>divorce-rate</th> <th>ratio-actual</th> <th>ratio-percent</th> </tr> <tr> <td>Albania</td> <td>2018</td> <td>8.1</td> <td>1.7</td> <td>4.76</td> <td>20.99</td> </tr> <tr> <td>Algeria</td> <td>2013</td> <td>10.1</td> <td>1.6</td> <td>6.31</td> <td>15.84</td> </tr> <tr> <td>Armenia</td> <td>2011</td> <td>6</td> <td>1</td> <td>6</td> <td>16.67</td> </tr> <tr> <td>Australia</td> <td>2017</td> <td>4.6</td> <td>2</td> <td>2.3</td> <td>43.48</td> </tr> <tr> <td>Austria</td> <td>2018</td> <td>5.3</td> <td>1.8</td> <td>2.94</td> <td>33.96</td> </tr></tbody></table> </html>"
  );
});

//-----------------------------Recurso /api/v1 - F04-------------------------------


//________________Natality-stats_____________________
var natalityStatsDataSet = [];


//GET /api/v1/YYYYYY/loadInitialData 
//Crea 2 o más recursos.
app.get(BASE_API_PATH + "/natality-stats/loadInitialData", (req, res) => {
  natalityStatsDataSet = [
    {
      "country": "denmark",
      "date": 2019,
      "born": 61.167,
      "men-born": 31.519,
      "women-born": 29.648,
      "natality-rate": 10.50,
      "fertility-rate": 1.70
    },
    {
      "country": "switzerland",
      "date": 2019,
      "born": 86.172,
      "men-born": 44.123,
      "women-born": 42.049,
      "natality-rate": 10.00,
      "fertility-rate": 1.48
    }
  ];
  console.log(`Loaded initial data: <${JSON.stringify(natalityStatsDataSet, null, 2)}>`);
  return res.sendStatus(200);

});

//GET /api/v1/YYYYYY 
//Devuelve una lista con todos los recursos (un array de objetos en JSON)
app.get(BASE_API_PATH + "/natality-stats", (req, res) => {
  if (natalityStatsDataSet.length != 0) {
    console.log(`requested natality stats dataset`);
    return res.send(JSON.stringify(natalityStatsDataSet, null, 2));
  } else {
    console.log("No data found");
    return res.sendStatus(404);
  }


  return res.sendStatus(200);

});

//POST /api/v1/YYYYYY 
//crea un nuevo recurso.
app.post(BASE_API_PATH + "/natality-stats", (req, res) => {
  var newNatalityStat = req.body;
  var country = req.body.country;
  var date = parseInt(req.body.date);

  //Si hay datos iniciales
  if (natalityStatsDataSet.length != 0) {
    for (var stat of natalityStatsDataSet) {
      if (stat.country === country && stat.date === date) {

        console.log("Conflict detected");
        return res.sendStatus(409);
      }
    } 
      if (!newNatalityStat.country
        || !newNatalityStat.date
        || !newNatalityStat.born
        || !newNatalityStat['men-born']
        || !newNatalityStat['women-born']
        || !newNatalityStat['natality-rate']
        || !newNatalityStat['fertility-rate']
        || Object.keys(newNatalityStat).length != 7) {

        console.log("Numero de parametros incorrectos");
        return res.sendStatus(400);
      } else {
        console.log(`new natality stat to be added: <${JSON.stringify(newNatalityStat, null, 2)}>`);
        natalityStatsDataSet.push(newNatalityStat);
        return res.sendStatus(201);
      }

    //Si no hay datos iniciales
  } else if (!newNatalityStat.country
    || !newNatalityStat.date
    || !newNatalityStat.born
    || !newNatalityStat['men-born']
    || !newNatalityStat['women-born']
    || !newNatalityStat['natality-rate']
    || !newNatalityStat['fertility-rate']
    || Object.keys(newNatalityStat).length != 7) {

    console.log("Numero de parametros incorrectos")
    return res.sendStatus(400);
  } else {
    console.log(`new natality stat to be added: <${JSON.stringify(newNatalityStat, null, 2)}>`);
    natalityStatsDataSet.push(newNatalityStat);
    return res.sendStatus(201);


  }

});


//GET /api/v1/YYYYYY/XXX/ZZZ 
app.get(BASE_API_PATH + "/natality-stats/:country/:date", (req, res) => {
  var country = req.params.country;
  var date = parseInt(req.params.date);

  console.log(`GET stat by country: <${country}> and date: <${date}>`);
  for (var stat of natalityStatsDataSet) {
    if (stat.country === country && stat.date === date) {
      return res.status(200).json(stat);
    }
  }

  return res.sendStatus(404);
});

//DELETE /api/v1/YYYYYY/XXX/ZZZ 
app.delete(BASE_API_PATH + "/natality-stats/:country/:date", (req, res) => {
  var country = req.params.country;
  var date = parseInt(req.body.date);

  console.log(`DELETE by country <${country}> and date: <${date}>`);

  for( var i = 0; i < natalityStatsDataSet.length; i++){ 
    if(natalityStatsDataSet[i]["country"]===country && natalityStatsDataSet[i]["date"]===date){
      natalityStatsDataSet.splice(i,1);
      return res.sendStatus(200);
    }
  }

  return res.sendStatus(404);
});


//PUT a un recurso  (actualizar recurso)
app.put(BASE_API_PATH + "/natality-stats/:country/:date", (req, res) => {
  var country = req.params.country;
  var date = parseInt(req.params.date);
  var newNatalityStat = req.body;

  console.log(`Modficar ${newNatalityStat.country}  Actual ${country} `);
  console.log(`Modficar ${newNatalityStat.date} Actual ${date} `);
  if (natalityStatsDataSet.length == 0) {
    console.log("Recurso no encontrado")
    return res.sendStatus(404);
  } else if (!newNatalityStat.country
    || !newNatalityStat.date
    || !newNatalityStat.born
    || !newNatalityStat['men-born']
    || !newNatalityStat['women-born']
    || !newNatalityStat['natality-rate']
    || !newNatalityStat['fertility-rate']
    || newNatalityStat.country != country
    || newNatalityStat.date != date
    || Object.keys(newNatalityStat).length != 7) {

    console.log("Actualizacion de campos no valida")
    return res.sendStatus(409);
  } else {
    for (var i = 0; i < natalityStatsDataSet.length; i++) {
      var stat = natalityStatsDataSet[i];
      if (stat.country === country && stat.date === date) {
        natalityStatsDataSet[i] = newNatalityStat;
        return res.send('PUT success');
      }
    }
  }

})

//POST a un recurso (ERROR)
app.post(BASE_API_PATH + "/natality-stats/:country/:date", (req, res) => {
  console.log("Post a un recurso no se puede");
  return res.sendStatus(405);

})
//PUT a la lista de recursos (ERROR)
app.put(BASE_API_PATH + "/natality-stats", (req, res) => {
  console.log("Put a una lista de recursos no se puede");
  return res.sendStatus(405);

})


//DELETE a la lista de recursos.
app.delete(BASE_API_PATH + "/natality-stats", (req, res) => {
  natalityStatsDataSet.length = 0;
  console.log('natality-stats deleted');
  return res.sendStatus(200);

})

//------------------------------------Server-status------------------------
app.listen(port, () => {
  console.log("server ready listening on port " + port);
});


//________________Life-stats_____________________
var lifeStatsDS = [];

//GET /api/v1/YYYYYY/loadInitialData 
//Crea 2 o más recursos.
app.get(BASE_API_PATH + "/life-stats/loadInitialData", (req, res) => {
  var initialData = [
    {
      "country" : "denmark",
      "date" : 2019,
      "quality-life-index": 198.57,
      "purchasing-power-index": 114.39,
      "safety-index": 75.75
    },
    {
      "country": "switzerland",
      "date" : 2019,
      "quality-life-index": 195.93,
      "purchasing-power-index": 129.7,
      "safety-index": 78.5
    }    ];
    for(var i=0; i< initialData.length; i++){
      lifeStatsDS.push(initialData[i]);
    }
    console.log(`Loaded initial data: <${JSON.stringify(lifeStatsDS, null, 2)}>`);
    return res.sendStatus(200);
});

//GET /api/v1/YYYYYY 
//Devuelve una lista con todos los recursos (un array de objetos en JSON)
app.get(BASE_API_PATH + "/life-stats", (req, res) => {
  if (lifeStatsDS.length != 0) {
    console.log(`requested life stats dataset`);
    return res.send(JSON.stringify(lifeStatsDS, null, 2));  //return res.sendStatus(200);
  } else {
    console.log("No se encuentran los datos");
    return res.sendStatus(404);
  }
});

//POST /api/v1/YYYYYY 
//crea un nuevo recurso.
app.post(BASE_API_PATH + "/life-stats", (req,res) => {
  var newData = req.body;
  var existe = false;

  if(lifeStatsDS.length !=0){  //Si hay datos iniciales
    for (var data of lifeStatsDS){
      if (data.country === newData.country && data.date === newData.date) {
        existe = true;  //Existe el recurso
      } 
    }
    if (existe){
      console.log("Ya existe un recurso con la misma fecha y país");
      return res.sendStatus(409);
    
    } else if (!newData.country || !newData.date || !newData['quality-life-index']|| !newData['purchasing-power-index'] || !newData['safety-index']) {
      console.log("Faltan datos para crear el recurso");
      return res.sendStatus(400);

    } else {
      lifeStatsDS.push(newData);
      console.log(`Se ha añadido el recurso <${JSON.stringify(newData,null,2)}>`);
      return res.sendStatus(201);
    }
    //si no hay datos iniciales
  } else if (!newData.country || !newData.date || !newData['quality-life-index']|| !newData['purchasing-power-index'] || !newData['safety-index']) {
      console.log("Faltan datos para crear el recurso");
      return res.sendStatus(400);

  } else {
      lifeStatsDS.push(newData);
      console.log(`Se ha añadido el recurso <${JSON.stringify(newData,null,2)}>`);
      return res.sendStatus(201);
  }
});

//GET /api/v1/YYYY/XXX/ZZZ
//Devuelve un recurso concreto

/*Nota: necesitamos pasar rutas parametrizadas porque sino tendriamos que hacer infinutas rutas "estaticas" para cada país y fecha */
app.get(BASE_API_PATH+ "/life-stats/:country/:date", (req,res) => {
  var req_data = req.params;
  
  console.log(`GET recurso por país: <${req_data.country}> y fecha: <${req_data.date}>`);
  for (var data of lifeStatsDS){
    if (data.country === req_data.country && data.date === parseInt(req_data.date)){     
      return res.status(200).send(JSON.stringify(data,null,2));
    }
  }
  return res.sendStatus(404);  
});

//DELETE un recurso
app.delete(BASE_API_PATH+ "/life-stats/:country/:date", (req,res) => {
  var del_data = req.params;
  for(var i=0; i < lifeStatsDS.length; i++){
    if(lifeStatsDS[i].country=== del_data.country && lifeStatsDS[i].date === parseInt(del_data.date)){
      lifeStatsDS.splice(i, 1); /*al metodo splice le pasamos el índice del objeto a partir del cual vamos a borrar objetos del array y el número de objetos a eliminar*/
      console.log(`El recurso con país: <${del_data.country}> y fecha: <${del_data.date}> ha sido eliminado`);
      return res.sendStatus(200);
    }
  }
  return res.sendStatus(404);
});

//PUT a un recurso
app.put(BASE_API_PATH + "/life-stats/:country/:date", (req,res) => {
  var put_data = req.params; //variable con el recurso a actualizar
  var newData = req.body; //variable con el nuevo recurso (recurso actualizado)
  var existe = false;

  if (!newData.country || !newData.date || !newData['quality-life-index']|| !newData['purchasing-power-index'] || !newData['safety-index']){
    console.log("Faltan datos para actualizar el recurso");
    return res.sendStatus(400);
  } else {
    for(var i=0; i< lifeStatsDS.length; i++) {
      if(lifeStatsDS[i].country === put_data.country && lifeStatsDS[i].date === parseInt(put_data.date)){
        lifeStatsDS[i] = newData;
        existe = true;
        console.log("PUT realizado con éxito");
        return res.sendStatus(200);
      }
    }
    if(!existe){
      console.log("No exite el recurso que se quiere actualizar");
      return res.sendStatus(404);
    }
  }
});

//POST a un recurso
app.post(BASE_API_PATH + "/life-stats/:country/:date", (req,res) => {
  console.log("No se puede realizar POST a un recurso concreto");
  return res.sendStatus(405);
});

//PUT a una lista de recursos
app.put(BASE_API_PATH + "/life-stats/", (req,res) => {
  console.log("No se puede realizar PUT a una lista de recursos");
  return res.sendStatus(405);
});

//DELETE a una lista de recursos
app.delete(BASE_API_PATH + "/life-stats/", (req,res) => {
  lifeStatsDS = [];
  console.log("Recursos de life-stats eliminados");
  return res.sendStatus(200);
});



//________________Divorce-stats_____________________
var divorceStatsDataSet = [];


//GET /api/v1/YYYYYY/loadInitialData 
//Crea 2 o más recursos.
app.get(BASE_API_PATH + "/divorce-stats/loadInitialData", (req, res) => {
  divorceStatsDataSet = [
    {
      "country": "Albania",
      "date": 2018,
      "marriage-rate": 8.1,
      "divorce-rate": 1.7,
      "ratio-actual": 4.76,
      "ratio-percent": 20.99,
  
    },
    {
      "country": "Armenia",
      "date": 2011,
      "marriage-rate": 6,
      "divorce-rate": 1,
      "ratio-actual": 6,
      "ratio-percent": 16.67,
    }
  ];
  console.log(`Loaded initial data: <${JSON.stringify(divorceStatsDataSet, null, 2)}>`);
  return res.sendStatus(200);

});

//GET /api/v1/YYYYYY 
//Devuelve una lista con todos los recursos (un array de objetos en JSON)
app.get(BASE_API_PATH + "/divorce-stats", (req, res) => {
  if (divorceStatsDataSet.length != 0) {
    console.log(`requested divorce stats dataset`);
    return res.send(JSON.stringify(divorceStatsDataSet, null, 2));
  } else {
    console.log("No data found");
    return res.sendStatus(404);
  }


  return res.sendStatus(200);

});

//POST /api/v1/YYYYYY 
//crea un nuevo recurso.
app.post(BASE_API_PATH + "/divorce-stats", (req, res) => {
  var newDivorceStat = req.body;
  var country = req.body.country;
  var date = parseInt(req.body.date);
  console.log(req.body);
  //Si hay datos iniciales
  if (divorceStatsDataSet.length != 0) {
    for (var stat of divorceStatsDataSet) {
      if (stat.country === country && stat.date === date) {

        console.log("Conflict detected");
        return res.sendStatus(409);

      } else if (newDivorceStat.country === null
        || newDivorceStat.date === null
        || newDivorceStat['marriage-rate'] === null
        || newDivorceStat['divorce-rate'] === null
        || newDivorceStat['ratio-actual'] === null
        || newDivorceStat['ratio-percent'] === null
        || Object.keys(newDivorceStat).length != 6) {

        console.log("Numero de parametros incorrectos");
        return res.sendStatus(400);
      } else {
        
        divorceStatsDataSet.push(newDivorceStat);
        return res.sendStatus(201);
      }

    }//Si no hay datos iniciales
  } else if (!newDivorceStat.country
    || !newDivorceStat.date
    || !newDivorceStat['marriage-rate']
    || !newDivorceStat['divorce-rate']
    || !newDivorceStat['ratio-actual']
    || !newDivorceStat['ratio-percent']
    || Object.keys(newDivorceStat).length != 6) {

    console.log("Numero de parametros incorrectos")
    return res.sendStatus(400);
  } else {
    console.log(`new divorce stat to be added: <${JSON.stringify(newDivorceStat, null, 2)}>`);
    divorceStatsDataSet.push(newDivorceStat);
    return res.sendStatus(201);


  }

});


//GET /api/v1/YYYYYY/XXX/ZZZ 
app.get(BASE_API_PATH + "/divorce-stats/:country/:date", (req, res) => {
  var country = req.params.country;
  var date = parseInt(req.params.date);

  console.log(`GET stat by country: <${country}> and date: <${date}>`);
  for (var stat of divorceStatsDataSet) {
    if (stat.country === country && stat.date === date) {
      return res.status(200).json(stat);
    }
  }

  return res.sendStatus(404);
});

//DELETE /api/v1/YYYYYY/XXX/ZZZ 
app.delete(BASE_API_PATH+ "/divorce-stats/:country/:date", (req,res) => {
  var del_data = req.params;
  for(var i=0; i < divorceStatsDataSet.length; i++){
    if(divorceStatsDataSet[i].country=== del_data.country && divorceStatsDataSet[i].date === parseInt(del_data.date)){
      divorceStatsDataSet.splice(i, 1); /*al metodo splice le pasamos el índice del objeto a partir del cual vamos a borrar objetos del array y el número de objetos a eliminar*/
      console.log(`El recurso con país: <${del_data.country}> y fecha: <${del_data.date}> ha sido eliminado`);
      return res.sendStatus(200);
    }
  }
  return res.sendStatus(404);
});


//PUT a un recurso  (actualizar recurso)
app.put(BASE_API_PATH + "/divorce-stats/:country/:date", (req, res) => {
  var country = req.params.country;
  var date = parseInt(req.params.date);
  var newDivorceStat = req.body;

  console.log(`Modficar ${newDivorceStat.country}  Actual ${country} `);
  console.log(`Modficar ${newDivorceStat.date} Actual ${date} `);
  if (divorceStatsDataSet.length == 0) {
    console.log("Recurso no encontrado")
    return res.sendStatus(404);
  } else if (!newDivorceStat.country
    || !newDivorceStat.date
    || !newDivorceStat['marriage-rate']
    || !newDivorceStat['divorce-rate']
    || !newDivorceStat['ratio-actual']
    || !newDivorceStat['ratio-percent']
    || newDivorceStat.country != country
    || newDivorceStat.date != date
    || Object.keys(newDivorceStat).length != 6) {

    console.log("Actualizacion de campos no valida")
    return res.sendStatus(409);
  } else {
    for (var i = 0; i < divorceStatsDataSet.length; i++) {
      var stat = divorceStatsDataSet[i];
      if (stat.country === country && stat.date === date) {
        divorceStatsDataSet[i] = newDivorceStat;
        return res.send('PUT success');
      }
    }
  }

})

//POST a un recurso (ERROR)
app.post(BASE_API_PATH + "/divorce-stats/:country/:date", (req, res) => {
  console.log("Post a un recurso no se puede");
  return res.sendStatus(405);

})
//PUT a la lista de recursos (ERROR)
app.put(BASE_API_PATH + "/divorce-stats", (req, res) => {
  console.log("Put a una lista de recursos no se puede");
  return res.sendStatus(405);

})


//DELETE a la lista de recursos.
app.delete(BASE_API_PATH + "/divorce-stats", (req, res) => {
  divorceStatsDataSet.length = 0;
  console.log('divorce-stats deleted');
  return res.sendStatus(200);

})

