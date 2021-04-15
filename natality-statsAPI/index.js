
var path = require('path');
var Datastore = require("nedb");
//________________Natality-stats_____________________


var BASE_API_PATH = "/api/v1";
var natalityStatsDataSet = [];
var datafile = path.join(__dirname, 'natality-stats.db');

var db = new Datastore({ filename: datafile, autoload: true });

module.exports.register = (app) => {

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
        db.find({ $or: [{ country: "denmark" }, { country: "switzerland" }] }, function (err, data) {
            if (err) {
                console.error("ERROR accesing DB in GET");
                res.sendStatus(500);
            } else {
                if (data.length == 0) {
                    db.insert(natalityStatsDataSet);
                    console.log(`Loaded initial data: <${JSON.stringify(natalityStatsDataSet, null, 2)}>`);
                    res.sendStatus(201);
                } else {
                    console.error(`initial data already exists`);
                    res.sendStatus(409);
                }
            }
        });

    });

    //GET /api/v1/YYYYYY 
    //Devuelve una lista con todos los recursos (un array de objetos en JSON)
    app.get(BASE_API_PATH + "/natality-stats", (req, res) => {

        db.find({}, (err, data) => {
            if (err) {
                console.error("ERROR accesing DB in GET");
                res.sendStatus(500);
            } else {
                if (data.length == 0) {
                    console.error("No data found");
                    res.sendStatus(404);
                } else {
                    var dataToSend = data.map((d) => {
                        return {
                            country: d.country,
                            date: d.date,
                            born: d.born,
                            'men-born': d['men-born'],
                            'women-born': d['women-born'],
                            'natality-rate': d['natality-rate'],
                            'fertility-rate': d['fertility-rate']
                        }

                    });
                    console.log(`requested natality stats dataset`);
                    res.status(200).send(JSON.stringify(dataToSend, null, 2));
                }
            }
        });

    });

    //POST /api/v1/YYYYYY 
    //crea un nuevo recurso.
    app.post(BASE_API_PATH + "/natality-stats", (req, res) => {
        var newNatalityStat = req.body;

        var newCountry = req.body.country;
        var newDate = parseInt(req.body.date);


        db.find({ $and: [{ country: newCountry }, { date: newDate }] }, function (err, data) {
            if (err) {
                console.error("ERROR accesing DB in POST");
                res.sendStatus(500);
            } else {
                if (data.length == 0) {
                    //Comprobamos los parametros del recurso a insertar
                    if (!newNatalityStat.country
                        || !newNatalityStat.date
                        || !newNatalityStat.born
                        || !newNatalityStat['men-born']
                        || !newNatalityStat['women-born']
                        || !newNatalityStat['natality-rate']
                        || !newNatalityStat['fertility-rate']
                        || Object.keys(newNatalityStat).length != 7) {

                        console.log("Numero de parametros incorrectos");
                        res.sendStatus(400);
                    } else {
                        //Insertamos el recurso
                        console.log(`new natality stat to be added: <${JSON.stringify(newNatalityStat, null, 2)}>`);
                        db.insert(newNatalityStat);
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


    //GET /api/v1/YYYYYY/XXX/ZZZ 
    app.get(BASE_API_PATH + "/natality-stats/:country/:date", (req, res) => {
        var countrySelected = req.params.country;
        var dateSelected = parseInt(req.params.date);

        db.find({ $and: [{ country: countrySelected }, { date: dateSelected }] }, function (err, data) {
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

    //PUT a un recurso  (actualizar recurso)
    app.put(BASE_API_PATH + "/natality-stats/:country/:date", (req, res) => {
        var countrySelected = req.params.country;
        var dateSelected = parseInt(req.params.date);
        var newNatalityStat = req.body;

        //Comprobamos los parametros del recurso a insertar
        if (!newNatalityStat.country
            || !newNatalityStat.date
            || !newNatalityStat.born
            || !newNatalityStat['men-born']
            || !newNatalityStat['women-born']
            || !newNatalityStat['natality-rate']
            || !newNatalityStat['fertility-rate']
            || newNatalityStat.country != countrySelected
            || newNatalityStat.date != dateSelected
            || Object.keys(newNatalityStat).length != 7) {

            console.log("Actualizacion de campos no valida")
            res.sendStatus(400);
        } else {
            db.update({ $and: [{ country: countrySelected }, { date: dateSelected }] }, {}, function (err, numReplaced) {
                if (err) {
                    console.error("ERROR accesing DB in GET");
                    res.sendStatus(500);
                } else {
                    if (numReplaced == 0) {
                        console.error("No data found");
                        res.sendStatus(404);
                    } else {
                        console.log("Campos actualizados")
                        res.sendStatus(200);
                    }
                }
            });
        }
    });

    //POST a un recurso (ERROR)
    app.post(BASE_API_PATH + "/natality-stats/:country/:date", (req, res) => {
        console.log("Post a un recurso no se puede");
        return res.sendStatus(405);

    });
    //PUT a la lista de recursos (ERROR)
    app.put(BASE_API_PATH + "/natality-stats", (req, res) => {
        console.log("Put a una lista de recursos no se puede");
        return res.sendStatus(405);

    });

    //DELETE /api/v1/YYYYYY/XXX/ZZZ 
    app.delete(BASE_API_PATH + "/natality-stats/:country/:date", (req, res) => {
        var countrySelected = req.params.country;
        var dateSelected = parseInt(req.params.date);

        db.remove({ $and: [{ country: countrySelected }, { date: dateSelected }] }, {}, function (err, dataDeleted) {
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

    //DELETE a la lista de recursos.
    app.delete(BASE_API_PATH + "/natality-stats", (req, res) => {
        db.remove({}, { multi: true }, function (err, numRemoved) {
            if (err) {
                console.error("ERROR deleting DB contacts in DELETE");
                res.sendStatus(500);
            } else {
                if (numRemoved == 0) {
                    console.error("ERROR natality-stats not found");
                    res.sendStatus(404);
                } else {
                    res.sendStatus(200);
                }
            }
        });

    })
}
//TODO: Paginacion, Busqueda, Tests