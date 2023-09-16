const express = require('express');
const app = express();

app.use(express.json());

app.get((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.get('/v1/', (req, res, next) => {
  res.send({message : 'Welcome. API Version v1 - 1.0.0 - Author: Meriem Tebessi'});
});

app.get('/v1/adhanTimes', (req, res, next) => {
  let sCity = req.query.city;
  let sCountry = req.query.country;
  if ((sCity == undefined)||(sCountry == undefined)){
	  res.status(400).json({
		  "message": "Bad Request. City and country parameters are required. Please try again using this example: GET /v1/adhanTimes?city=Paris&country=France"
	  });
  }else{
	    let defaultvalue = {
			 "meta": {
				"timezone": "-",
				"latitude": 0,
				"longitude": 0,
				"city": "Neuilly sur seine",
				"pays": "France"
			 },
			"items":[
				{
				"date" : "2023-09-16",
				"timings": {
					"Fajr": "-",
					"Sunrise": "-",
					"Dhuhr": "-",
					"Asr": "-",
					"Sunset": "-",
					"Maghrib": "-",
					"Isha": "-",
					"Imsak": "-",
					"Midnight": "-",
					"Firstthird": "-",
					"Lastthird": "-"}
				}]
							};
	    let jsonDefaultValue = JSON.stringify(defaultvalue);
	    res.status(200).json(jsonDefaultValue);
   }; // fin else	  
		  
});

  app.use((req, res) => {
    res.json({ message: "Bienvenue" }); 
 });

module.exports = app;

// /v1/adhanTimes?city= &?country=