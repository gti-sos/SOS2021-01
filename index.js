//--------------------------Modules-required----------------
var express = require("express");
var cool = require("cool-ascii-faces");
var path = require("path");
var cors = require("cors");
var bodyParser = require('body-parser');
var request = require("request");

var lifeAPIv1 = require("./src/back/lifeAPI/v1");
var lifeAPIv2 = require("./src/back/lifeAPI/v2");
var natalityStatsAPIv1 = require("./src/back/natality-statsAPI/v1");
var natalityStatsAPIv2 = require("./src/back/natality-statsAPI/v2");
var DivorceAPIv1 = require("./src/back/DivorceAPI/v1");
var DivorceAPIv2 = require("./src/back/DivorceAPI/v2");

//--------------------------Server-variables------------------
var app = express();

var port = process.env.PORT || 10000;


//--------------------------Server-usages----------------------

app.use("/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

//--------------------------Server-APIs----------------------
lifeAPIv1.register(app);
lifeAPIv2.register(app);
natalityStatsAPIv1.register(app);
natalityStatsAPIv2.register(app);
DivorceAPIv1.register(app);
DivorceAPIv2.register(app);

//--------------------------Integraciones----------------------

//--------------------------------------------Proxys de Abraham------------------------------------------------------
//Grupo: 10 sanity-stats
var pathSanitystats='/sanity-stats';
var apiServerHostSanitystats = 'https://sanity-integration.herokuapp.com';
 
app.use(pathSanitystats, function(req, res) {
  var url = apiServerHostSanitystats + req.baseUrl + req.url;
  console.log('piped: ' + req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});


//Grupo: 28 platforms
var pathPlatforms='/api/v1/platforms';
var apiServerHostPlatfoms = "https://sos2021-28.herokuapp.com";
 
app.use(pathPlatforms, function(req, res) {
  var url = apiServerHostPlatfoms + req.baseUrl + req.url;
  console.log('piped: ' + req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});

//Grupo: 23 unemployment
var pathUnemployment='/api/v2/unemployment-stats';
var apiServerHostUnemployment = "https://sos2021-23.herokuapp.com";

app.use(pathUnemployment, function(req, res) {
  var url = apiServerHostUnemployment + req.baseUrl + req.url;
  console.log('piped: ' + req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});

//Grupo: 04 illiteracy
var pathIlliteracy='/api/v1/illiteracy';
var apiServerHostIlliteracy = "https://sos2021-04.herokuapp.com";
 
app.use(pathIlliteracy, function(req, res) {
  var url = apiServerHostIlliteracy + req.baseUrl + req.url;
  console.log('piped: ' + req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});


//Vat Rates external API
var pathVatRates='/rates.json';
var apiServerHostVatRates = "https://euvatrates.com";
 
app.use(pathVatRates, function(req, res) {
  var url = apiServerHostVatRates + req.baseUrl;
  console.log('piped: ' + req.baseUrl);
  req.pipe(request(url)).pipe(res);
});

//----------------------------------------------Proxys de Juan---------------------------------------------------- 

//Grupo 02: Oil production, Nuts production and Wine production
var apiServerHostG02 = "https://sos2021-02.herokuapp.com";
var pathOil = "/api/v2/oil-production-stats";
var pathNuts ="/api/v2/nuts-production-stats";
var pathWine = "/api/v2/wine-production-stats";

app.use(pathOil, function(req, res) {
  var url = apiServerHostG02 + req.baseUrl + req.url;
  console.log('piped: ' + req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});
app.use(pathNuts, function(req, res) {
  var url = apiServerHostG02 + req.baseUrl + req.url;
  console.log('piped: ' + req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});
app.use(pathWine, function(req, res) {
  var url = apiServerHostG02 + req.baseUrl + req.url;
  console.log('piped: ' + req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});

//Grupo 10: Obesity stats and food consumption 

var apiServerHostG10 = "https://sos2021-10.herokuapp.com";
var pathObesity = "/api/integration/obesity-stats";
var pathFoodConsumption ="/api/v2/foodconsumption-stats";

app.use(pathObesity, function(req, res) {
  var url = apiServerHostG10 + req.baseUrl + req.url;
  console.log('piped: ' + req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});
app.use(pathFoodConsumption, function(req, res) {
  var url = apiServerHostG10 + req.baseUrl + req.url;
  console.log('piped: ' + req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});

//Grupo 03: Air´s pollution deaths

var apiServerHostG03 = "https://sos2021-03.herokuapp.com";
var pathAirPollution = "/api/v1/air-pollution";

app.use(pathAirPollution, function(req, res) {
  var url = apiServerHostG03 + req.baseUrl + req.url;
  console.log('piped: ' + req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});

//Grupo 07: Unemployment
var apiServerHostG07 = "https://sos2021-07.herokuapp.com";
var pathUnemployment = "/api/v1/unemployment";

app.use(pathUnemployment, function(req, res) {
  var url = apiServerHostG07 + req.baseUrl + req.url;
  console.log('piped: ' + req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});

//----------------------------------------------Proxys de Lucia---------------------------------------------------- 
//Grupo 20: Renewable power
var api01 = "http://sos2021-20.herokuapp.com";
var path01 = "/api/v1/renewablepowercapacities-stats";

app.use(path01, function(req, res) {
  var url = api01 + req.baseUrl + req.url;
  console.log('piped: ' + req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});

//Grupo 24: Children out school 
var api02 = "http://sos2021-24.herokuapp.com";
var path02 = "/api/v2/children-out-school";

app.use(path02, function(req, res) {
  var url = api02 + req.baseUrl + req.url;
  console.log('piped: ' + req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});

//Grupo 21: Fire 
var api03 = "http://sos2021-21.herokuapp.com";
var path03 = "/api/v2/fire-stats";

app.use(path03, function(req, res) {
  var url = api03 + req.baseUrl + req.url;
  console.log('piped: ' + req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});


//Grupo 04: Education expenditures 
var api04 = "https://education-expenditures.herokuapp.com";
var path04 = "/api/v1";

app.use(path04, function(req, res) {
  var url = api04 + req.baseUrl + req.url;
  console.log('piped: ' + req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});

//API Externa Covid 
var apiExt01 = "https://covid-193.p.rapidapi.com";
var pathExt01 = "/statistics";

app.use(pathExt01, function(req, res) {
  var url = apiExt01 + req.baseUrl + req.url;
  console.log('piped: ' + req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});




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




//------------------------------------Server-status------------------------
app.listen(port, () => {
  console.log("server ready listening on port " + port);
});
