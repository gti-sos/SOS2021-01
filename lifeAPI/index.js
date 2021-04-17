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
        "quality-life-index": 198.57,
        "purchasing-power-index": 114.39,
        "safety-index": 75.75
        },
        {
        "country": "switzerland",
        "date": 2019,
        "quality-life-index": 195.93,
        "purchasing-power-index": 129.7,
        "safety-index": 78.5
        }];
    for (var i = 0; i < initialData.length; i++) {
        //lifeStatsDS.push(initialData[i]);
        db.insert(initialData[i]);
    }
    //db.insert(initialData);
    console.log(`Loaded initial data: <${JSON.stringify(lifeStatsDS, null, 2)}>`);
    return res.sendStatus(200);
    });

    //GET /api/v1/YYYYYY 
    //Devuelve una lista con todos los recursos (un array de objetos en JSON)
    app.get(BASE_LIFE_API_PATH + "/life-stats", (req, res) => {
        db.find({}, (err, dataInDB) => {
            if(err){
                console.error("ERROR accesing DB in GET: " + err);
                res.sendStatus(500);
            }
            else{
                if(dataInDB.length == 0){
                    console.error("No data found");
                    res.sendStatus(404);
                }
                else{
                    dataInDB.forEach( (data) =>{delete data._id; });

                    res.send(JSON.stringify(dataInDB, null, 2));
                    console.log("Data sent:"+JSON.stringify(dataInDB, null, 2));
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
                if(dataInDB.length == 0){ //si no hay datos en la BD, lo añadimos 
                    if(!newData.country || !newData.date || !newData['quality-life-index'] || !newData['purchasing-power-index'] || !newData['safety-index']) {
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
    var req_data = req.params;

    console.log(`GET recurso por país: <${req_data.country}> y fecha: <${req_data.date}>`);
    for (var data of lifeStatsDS) {
        if (data.country === req_data.country && data.date === parseInt(req_data.date)) {
        return res.status(200).send(JSON.stringify(data, null, 2));
        }
    }
    return res.sendStatus(404);
    });

    //DELETE un recurso
    app.delete(BASE_LIFE_API_PATH + "/life-stats/:country/:date", (req, res) => {
    var del_data = req.params;
    for (var i = 0; i < lifeStatsDS.length; i++) {
        if (lifeStatsDS[i].country === del_data.country && lifeStatsDS[i].date === parseInt(del_data.date)) {
        lifeStatsDS.splice(i, 1); /*al metodo splice le pasamos el índice del objeto a partir del cual vamos a borrar objetos del array y el número de objetos a eliminar*/
        console.log(`El recurso con país: <${del_data.country}> y fecha: <${del_data.date}> ha sido eliminado`);
        return res.sendStatus(200);
        }
    }
    return res.sendStatus(404);
    });

    //PUT a un recurso
    app.put(BASE_LIFE_API_PATH + "/life-stats/:country/:date", (req, res) => {
    var put_data = req.params; //variable con el recurso a actualizar
    var newData = req.body; //variable con el nuevo recurso (recurso actualizado)
    var existe = false;

    if (!newData.country || !newData.date || !newData['quality-life-index'] || !newData['purchasing-power-index'] || !newData['safety-index']) {
        console.log("Faltan datos para actualizar el recurso");
        return res.sendStatus(400);
    } else {
        for (var i = 0; i < lifeStatsDS.length; i++) {
        if (lifeStatsDS[i].country === put_data.country && lifeStatsDS[i].date === parseInt(put_data.date)) {
            lifeStatsDS[i] = newData;
            existe = true;
            console.log("PUT realizado con éxito");
            return res.sendStatus(200);
        }
        }
        if (!existe) {
        console.log("No exite el recurso que se quiere actualizar");
        return res.sendStatus(404);
        }
    }
    });

    //POST a un recurso
    app.post(BASE_LIFE_API_PATH + "/life-stats/:country/:date", (req, res) => {
    console.log("No se puede realizar POST a un recurso concreto");
    return res.sendStatus(405);
    });

    //PUT a una lista de recursos
    app.put(BASE_LIFE_API_PATH + "/life-stats/", (req, res) => {
    console.log("No se puede realizar PUT a una lista de recursos");
    return res.sendStatus(405);
    });

    //DELETE a una lista de recursos
    app.delete(BASE_LIFE_API_PATH + "/life-stats/", (req, res) => {
    lifeStatsDS = [];
    console.log("Recursos de life-stats eliminados");
    return res.sendStatus(200);
    });
}
