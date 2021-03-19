var cool = require("cool-ascii-faces");
//console.log(cool());
var express = require("express");
var app = express();
var path = require("path");

var port = (process.env.PORT || 10000);
app.use("/", express.static(path.join(__dirname, "public")));

app.get("/cool", (request,response) => {
    response.send(cool());
    console.log("new request to /cool has arrived");
});
app.listen(port, ()=> {
    console.log("server ready listening on port "+port);
});
