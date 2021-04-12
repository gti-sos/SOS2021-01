//________________Natality-stats_____________________
var BASE_API_PATH = "/api/v1";
var natalityStatsDataSet = [];

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
        console.log(`Loaded initial data: <${JSON.stringify(natalityStatsDataSet, null, 2)}>`);
        return res.sendStatus(201);

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

        //Comprobamos si el recurso a crear ya existe
        for (var stat of natalityStatsDataSet) {
            if (stat.country === country && stat.date === date) {

                console.log("Conflict detected");
                return res.sendStatus(409);
            }
        }
        //Comprobamos los parametros
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
            //Añadimos
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
        var date = parseInt(req.params.date);

        for (var i = 0; i < natalityStatsDataSet.length; i++) {
            if (natalityStatsDataSet[i]["country"] === country && natalityStatsDataSet[i]["date"] === date) {
                natalityStatsDataSet.splice(i, 1);
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

        //Si esta vacio el dataset
        if (natalityStatsDataSet.length == 0) {
            console.log("Recurso no encontrado")
            return res.sendStatus(404);
        }
        //Si no existe en el dataset
        var encontrado = false;
        for (var stat of natalityStatsDataSet) {
            if (stat.country === country && stat.date === date) {
                encontrado = true;
            }
        }
        if (!encontrado) {
            console.log("Recurso no encontrado")
            return res.sendStatus(404);
        }//Si los parametros son invalidos
        else if (!newNatalityStat.country
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
            return res.sendStatus(400);
        } else {
            for (var i = 0; i < natalityStatsDataSet.length; i++) {
                var stat = natalityStatsDataSet[i];
                if (stat.country === country && stat.date === date) {
                    natalityStatsDataSet[i] = newNatalityStat;
                    return res.sendStatus(200);
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
}