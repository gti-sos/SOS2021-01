//________________Divorce-stats_____________________


//required modules 
var path = require('path');
var Datastore = require("nedb");

//required vars and const

const BASE_API_PATH = "/api/v1";
const datafile = path.join(__dirname, 'divorce-stats.db');
const db = new Datastore({ filename: datafile, autoload: true });

var divorceStatsDataSet = [];

//implemetation

module.exports.register = (app) => {


  //GET /api/v1/divorce-stats/loadInitialData 
  //Crea 2 o más recursos

  app.get(BASE_API_PATH + "/divorce-stats/loadInitialData", (req, res) => {
    divorceStatsDataSet = [
      {
        "country": "Albania",
        "date": 2018,
        "marriage-rate": 8.1,
        "divorce-rate": 1.7,
        "ratio-actual": 4.76,
        "ratio-percent": 20.99

      },
      {
        "country": "Armenia",
        "date": 2011,
        "marriage-rate": 6,
        "divorce-rate": 1,
        "ratio-actual": 6,
        "ratio-percent": 16.67
      },
      {
        "country": "Spain",
        "date": 2011,
        "marriage-rate": 1,
        "divorce-rate": 10,
        "ratio-actual": 4,
        "ratio-percent": 16.67
      }
    ];

    // DB access when loadInitialData 

    db.find({ $or: [{ country: "Albania" }, { country: "Armenia" }, { country: "Spain" }] }, { _id: 0 }, function (err, data) {
      if (err) {
        console.error("ERROR accesing DB in GET");
        res.sendStatus(500);
      } else {
        if (data.length == 0) {
          db.insert(divorceStatsDataSet);
          console.log(`Loaded initial data: <${JSON.stringify(divorceStatsDataSet, null, 2)}>`);
          res.sendStatus(201);
        } else {
          console.error(`initial data already exists`);
          res.sendStatus(409);
        }
      }
    });

  });

  //GET /api/v1/divorce-stats 
  //Devuelve una lista con todos los recursos (un array de objetos en JSON)
  app.get(BASE_API_PATH + "/divorce-stats", (req, res) => {

    console.log("New GET .../divorce-stats");
    var query = req.query;

    // Casting 
    for (d in query) {

      if (d == 'date') {
        query[d] = parseInt(query[d]);
      } else if (d == 'marriage-rate') {
        query[d] = parseFloat(query[d]);
      } else if (d == 'divorce-rate') {
        query[d] = parseFloat(query[d]);
      } else if (d == 'ratio-actual') {
        query[d] = parseFloat(query[d]);
      } else if (d == 'ratio-percent') {
        query[d] = parseFloat(query[d]);
      }
    }
    console.log(` la query es ${query}`);
    // Getting the offset and limit from the url
    var limit = query.limit;
    var offset = query.offset;
    // Removing extra query field of pagination
    delete query.offset;
    delete query.limit;

    // With skip we make the offset and with the limit we limit
    db.find(query).skip(offset).limit(limit).exec((error, divorceStats) => {
      if (error) {
        console.error("ERROR accesing DB in GET");
        res.sendStatus(500);
      }
      divorceStats.forEach((r) => {
        delete r._id;
      });

      res.status(200).send(JSON.stringify(divorceStats, null, 2));
      console.log("Data sent: " + JSON.stringify(divorceStats, null, 2));
    });

    console.log("OK.");


  });

  //POST /api/v1/divorce-stats 
  //crea un nuevo recurso.
  app.post(BASE_API_PATH + "/divorce-stats", (req, res) => {

    var newDivorceStat = req.body;
    var newCountry = req.body.country;
    var newDate = parseInt(req.body.date);

    //console.log(req.body);

    db.find({ $and: [{ country: newCountry }, { date: newDate }] }, { _id: 0 }, function (err, data) {
      if (err) {
        console.error("ERROR accesing DB in POST");
        res.sendStatus(500);
      } else {
        if (data.length == 0) {
          //Comprobamos los parametros del recurso a insertar
          if (!newDivorceStat.country
            || !newDivorceStat.date
            || !newDivorceStat['marriage-rate']
            || !newDivorceStat['divorce-rate']
            || !newDivorceStat['ratio-actual']
            || !newDivorceStat['ratio-percent']
            || Object.keys(newDivorceStat).length != 6) {

            console.log("Numero de parametros incorrectos");
            res.sendStatus(400);
          } else {
            //Insertamos el recurso
            console.log(`new divorce stat to be added: <${JSON.stringify(newDivorceStat, null, 2)}>`);
            db.insert(newDivorceStat);
            res.sendStatus(201);
          }
        } else {
          //El recurso a crear ya existe
          console.log("Conflict detected");
          res.sendStatus(409);
        }
      }
    });
  });


  //GET /api/v1/divorce-stats/country/date 
  app.get(BASE_API_PATH + "/divorce-stats/:country/:date", (req, res) => {
    var countrySelected = req.params.country;
    var dateSelected = parseInt(req.params.date);

    db.find({ $and: [{ country: countrySelected }, { date: dateSelected }] }, { _id: 0 }, function (err, data) {
      if (err) {
        console.error("ERROR accesing DB in GET");
        res.sendStatus(500);
      } else {
        if (data.length == 0) {
          console.error("No data found");
          res.sendStatus(404);
        } else {
          console.log(`GET stat by country: <${countrySelected}> and date: <${dateSelected}>`);
          res.status(200).send(JSON.stringify(data, null, 2));
        }
      }
    });
  });

  //DELETE /api/v1/divorce-stats/country/date 
  app.delete(BASE_API_PATH + "/divorce-stats/:country/:date", (req, res) => {

    var countrySelected = req.params.country;
    var dateSelected = parseInt(req.params.date);

    db.remove({ $and: [{ country: countrySelected }, { date: dateSelected }] }, { multi: true }, function (err, dataDeleted) {
      if (err) {
        console.error("ERROR accesing DB in GET");
        res.sendStatus(500);
      } else {
        if (dataDeleted == 0) {
          console.error("No data found");
          res.sendStatus(404);
        } else {
          console.log(`stat with country: <${countrySelected}> and date: <${dateSelected}> deleted`);
          res.sendStatus(200);
        }
      }
    });
  });

  //PUT a un recurso  (actualizar recurso)
  app.put(BASE_API_PATH + "/divorce-stats/:country/:date", (req, res) => {
    var countrySelected = req.params.country;
    var dateSelected = parseInt(req.params.date);
    var newDivorceStat = req.body;

    if (!newDivorceStat.country
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
      db.update({ $and: [{ country: countrySelected }, { date: dateSelected }] }, { $set: newDivorceStat }, {}, function (err, numReplaced) {
        if (err) {
          console.error("ERROR accesing DB in GET");
          res.sendStatus(500);
        } else {
          if (numReplaced == 0) {
            console.error("No data found");
            res.sendStatus(404);
          } else {
            console.log(`stat with country: <${countrySelected}> and date: <${dateSelected}> successfuly updated`)
            res.sendStatus(200);
          }
        }
      });
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
    db.remove({}, { multi: true }, function (err, numRemoved) {
      if (err) {
        console.error("ERROR deleting DB stats in DELETE");
        res.sendStatus(500);
      } else {
        if (numRemoved == 0) {
          console.error("ERROR divorce-stats not deleted, database was empty");
          res.sendStatus(404);
        } else {
          res.sendStatus(200);
        }
      }
    });
  })

}
