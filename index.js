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

app.get("/info/life-stats", (req, res) => {
    res.send("<html><body><table><tr> <th>country </th>  <th>date </th> <th>quality-life-index </th>  <th>purchsing-power-index </th> <th>safety-index </th>  </tr>   <tr>    <th>Denmark </th>   <th>2019 </th>  <th>198.57 </th>   <th>114.39 </th>  <th>75.75 </th>  </tr> <tr>  <th>Switzerland </th> <th>2019 </th><th>195.93 </th>	 <th>129.7 </th>  <th>78.5 </th> </tr> <tr><th>Finland </th><th>2019 </th> <th>194.01 </th>	<th>112.3 </th> <th>77.2 </th></tr>   <tr>  <th>Australia </th>	   <th>2019 </th>     <th>191.13 </th>       <th>122.85 </th>     <th>57.24 </th>  </tr>        <tr>  <th>Austria </th>  	<th>2019 </th>  <th>191.05 </th>  	<th>96.7 </th>   <th>78.63 </th></tr> </table> </body> </html>");
});
app.listen(port, ()=> {
    console.log("server ready listening on port "+port);
});
