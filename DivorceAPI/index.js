//________________Divorce-stats_____________________
var divorceStatsDataSet = [];
var BASE_API_PATH = "/api/v1";

//GET /api/v1/YYYYYY/loadInitialData 
//Crea 2 o más recursos.
module.exports.register = (app) => {

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
      }
    }
    if (newDivorceStat.country === null
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

    //Si no hay datos iniciales
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
app.delete(BASE_API_PATH + "/divorce-stats/:country/:date", (req, res) => {
  var del_data = req.params;
  for (var i = 0; i < divorceStatsDataSet.length; i++) {
    if (divorceStatsDataSet[i].country === del_data.country && divorceStatsDataSet[i].date === parseInt(del_data.date)) {
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

}
