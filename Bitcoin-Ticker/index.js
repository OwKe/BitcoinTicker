//jshint esversion: 6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res) {

  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var ammount = req.body.ammount;

  console.log(ammount);

  var options = {
    url: 'https://apiv2.bitcoinaverage.com/convert/global',
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      ammount: ammount,
    }
  };

  request(options, function(error, responce, body){

    var data = JSON.parse(body);
    var price = data.price;


    res.write('<h1>' + ammount + ' ' + crypto +' is currently worth '+ price + ' ' + fiat +'</h1>');
    res.write('<p>'+ data.time +'</p>');

    res.send();

  });

});

app.listen(3000, function() {
  console.log('Server Running');
});
