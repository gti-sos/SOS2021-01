var BASE_LIFE_API_PATH = "/api/v1";
var Datastore = require("nedb");
var path = require('path');

var dbFile = path.join(__dirname, 'life-stats.db');
var db = new Datastore({filename: dbFile, autoload: true });

//________________Life-stats_____________________
var lifeStatsDS = [];

module.exports.register = (app) => {
    //GET /api/v1/YYYYYY/loadInitialData 
    //Crea 2 o más recursos.
    app.get(BASE_LIFE_API_PATH + "/life-stats/loadInitialData", (req, res) => {
    var initialData = [
        {
        "country": "denmark",
        "date": 2019,
        "quality_life_index": 198.57,
        "purchasing_power_index": 114.39,
        "safety_index": 75.75
        },
        {
        "country": "switzerland",
        "date": 2019,
        "quality_life_index": 195.93,
        "purchasing_power_index": 129.7,
        "safety_index": 78.5
        },
        {
        "country": "iceland",
        "date": 2019,
        "quality_life_index": 187.79,
        "purchasing_power_index": 91.8,
        "safety_index": 76.72
        }
    ];
    /*for (var i = 0; i < initialData.length; i++) {
        //lifeStatsDS.push(initialData[i]);
        db.insert(initialData[i]);
    }*/
    db.insert(initialData);
    console.log(`Loaded initial data: <${JSON.stringify(lifeStatsDS, null, 2)}>`);
    return res.sendStatus(200);
    });

    //GET /api/v1/YYYYYY 
    //Devuelve una lista con todos los recursos (un array de objetos en JSON)
    app.get(BASE_LIFE_API_PATH + "/life-stats", (req, res) => {
        var query = req.query;
     
     
         //La consulta (o busqueda) se hace con "string", por tanto, tenemos que pasarlo a integer para que encuentre los datos
        if(query.hasOwnProperty("country")){
            query.country = query.country;
        }
        if(query.hasOwnProperty("date")){
            query.date = parseInt(query.date);
        }
        if(query.hasOwnProperty("quality_life_index")){
            query.quality_life_index = parseInt(query.quality_life_index);
        }
        if(query.hasOwnProperty("purchasing_power_index")){
            query.purchasing_power_index = parseInt(query.purchasing_power_index);
        }
        if(query.hasOwnProperty("safety_index")){
            query.safety_index = parseInt(query.safety_index);
        }
        if (query.offset) {
            var offset = parseInt(query.offset);
            delete req.query.offset;
        }
        if (query.limit) {
            var limit = parseInt(req.query.limit);
            delete query.limit;
        }

        db.find(query).skip(offset).limit(limit).exec((err, dataInDB) => {
            if(err){
                console.error("ERROR accesing DB in GET");
                res.sendStatus(500);
            }
            else{
                if(dataInDB == 0){
                    console.error("No data found");
                    res.sendStatus(404);
                }
                else{
                    dataInDB.forEach( (data) =>{ delete data._id; });
                    res.status(200).send(JSON.stringify(dataInDB, null, 2));
                    console.log("GET resource:"+JSON.stringify(dataInDB, null, 2));
                }
            }
        });
    });

    //POST /api/v1/YYYYYY 
    //crea un nuevo recurso.
    app.post(BASE_LIFE_API_PATH + "/life-stats", (req, res) => {
        var newData = req.body;
        db.find({country: newData.country, date: newData.date}, (err, dataInDB) =>{
            if (err) {
                console.error("ERROR accesing DB in POST: "+ err);
                res.sendStatus(500);
            } else {
                if(dataInDB == 0){ //si no hay ningún recurso en la BD con esos datos, lo añadimos 
                    if(!newData.country || !newData.date || !newData['quality_life_index'] || !newData['purchasing_power_index'] || !newData['safety_index']) {
                        console.log("Data is missing or incorrect.");
                        return res.sendStatus(400);
                    }else {                        
                        console.log(`New resource added to the database <${JSON.stringify(newData, null, 2)}>`);
                        db.insert(newData);
                        return res.sendStatus(201);
                    }
                }else {
                    console.log("A resource already exists with the same country and date");
                    return res.sendStatus(409); //conflict
                }
            }
        });
    });



    //GET /api/v1/YYYY/XXX/ZZZ
    //Devuelve un recurso concreto

    /*Nota: necesitamos pasar rutas parametrizadas porque sino tendriamos que hacer infinutas rutas "estaticas" para cada país y fecha */
    app.get(BASE_LIFE_API_PATH + "/life-stats/:country/:date", (req, res) => {
        var req_data = req.params; //parametro solicitado
        
        db.find({country: req_data.country, date: parseInt(req_data.date)}, (err, dataInDB) => {
            if (err) {
                console.error("ERROR accesing DB in GET");
                res.sendStatus(500);
            } else {
                if (dataInDB == 0) {
                    console.error("No data found");
                    res.sendStatus(404);
                } else {
                    delete dataInDB[0]._id;
                    res.status(200).send(JSON.stringify(dataInDB[0], null, 2)); //[0] para que no salga los [ ] del array
                    console.log(`GET stat by country: <${req_data.country}> and date: <${req_data.date}>`);
                }
            }
        });
    });

    //DELETE un recurso
    app.delete(BASE_LIFE_API_PATH + "/life-stats/:country/:date", (req, res) => {
        var del_data = req.params;

        db.remove({country: del_data.country, date: parseInt(del_data.date)}, {multi:true}, (err, dataInDB) => {
            if (err) {
                console.error("ERROR accesing DB in GET");
                res.sendStatus(500);
            }else {
                if (dataInDB == 0) { //no se encuentran esos datos en la BD
                    console.error("No data found");
                    res.sendStatus(404);
                } else {
                    console.log("Resource deleted");
                    res.sendStatus(200);
                }
            }
        });
    });
    

    //PUT a un recurso
    app.put(BASE_LIFE_API_PATH + "/life-stats/:country/:date", (req, res) => {
        var put_data = req.params; //variable con el recurso a actualizar
        var newData = req.body; //variable con el nuevo recurso (recurso actualizado)
    

        if (!newData.country || !newData.date || !newData['quality_life_index'] || !newData['purchasing_power_index'] || !newData['safety_index']) {
            console.log("Data is missing or incorrect.");
            return res.sendStatus(400);
        } else {
            db.update({"country": put_data.country, "date": parseInt(put_data.date)}, newData, (err, dataInDB) => {
                if (err) {
                    console.error("ERROR accesing DB in GET");
                    res.sendStatus(500);
                } else{
                    if(dataInDB==0){ //no se encuentra el dato en la BD
                        console.error("No data found");
                        res.sendStatus(404);
                    }else {
                        console.log("Successful PUT");
                        res.sendStatus(200);
                    }
                }
            });
        }
    });

    //POST a un recurso ERROR
    app.post(BASE_LIFE_API_PATH + "/life-stats/:country/:date", (req, res) => {
        console.log("Unable to POST a resource");
        return res.sendStatus(405);
    });

    //PUT a una lista de recursos ERROR
    app.put(BASE_LIFE_API_PATH + "/life-stats/", (req, res) => {
        console.log("Unable to PUT a resource list");
        return res.sendStatus(405);
    });

    //DELETE a una lista de recursos
    app.delete(BASE_LIFE_API_PATH + "/life-stats/", (req, res) => {
        db.remove({}, { multi: true }, function (err, dataInDB) {
            if (err) {
                console.error("ERROR deleting DB contacts in DELETE");
                res.sendStatus(500);
            } else {
                if (dataInDB == 0) { //no hay datos para borrar
                    console.error("ERROR no data found");
                    res.sendStatus(404);
                } else {
                    res.sendStatus(200);
                }
            }
        });
    });
}
