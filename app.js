const express = require('express');
const app = express();
const request = require('request');

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

app.get('/v1/today', (req, res, next) => {
  let sCity = req.query.city;
  let sCountry = req.query.country;
  if ((sCity == undefined)||(sCountry == undefined)){
	  res.status(400).json({
		  "message": "Bad Request. City and country parameters are required. Please try again using this example: GET /v1/today?city=Paris&country=France"
	  });
  }else{
	  let surl = "http://api.aladhan.com/v1/timingsByCity?city="+sCity+"&country="+sCountry;
	  let url = new URL (surl);
	  request({
		  url: url,
		  method: 'GET'	  }, function (error, response, body){
		  if (!error){
			  var resp = JSON.parse(body);
			  res.status(200).json({
									"meta": {
										    "date": resp.data.date.gregorian.date, //format: "01-04-2017"
											"hijriDate": {
												"date" :resp.data.date.hijri.date,
												"day" :resp.data.date.hijri.day,
												"month" :resp.data.date.hijri.month.number,
												"monthDescription" :resp.data.date.hijri.month.en,
												"year" :resp.data.date.hijri.year,
											},
											"timezone": resp.data.meta.timezone,
											"latitude": resp.data.meta.method.location.latitude,
											"longitude": resp.data.meta.method.location.longitude,
											"city": sCity,
											"pays": sCountry
											},			
									"timings": {
											"Fajr": resp.data.timings.Fajr,
											"Sunrise": resp.data.timings.Sunrise,
											"Dhuhr": resp.data.timings.Dhuhr,
											"Asr": resp.data.timings.Asr,
											"Sunset": resp.data.timings.Sunset,
											"Maghrib": resp.data.timings.Maghrib,
											"Isha": resp.data.timings.Isha,
											"Imsak": resp.data.timings.Imsak,
											"Midnight": resp.data.timings.Midnight,
											"Firstthird": resp.data.timings.Firstthird,
											"Lastthird":resp.data.timings.Lastthird,
											}			
									}); // fin déclaration de la réponse 200
		  }//fin if
		  else {
			  res.status(500).json({
				  "message": "désolé, une erreur technique est parvenue."
			  });			  
			  };// fin else de controle sur l'erreur de reponse de api externe
		  });	    
   }; // fin else sur le controle des params mandatory	  		  
});

  app.use((req, res) => {
    res.json({ message: "Bienvenue" }); 
 });

module.exports = app;

// /v1/adhanTimes?city= &?country=