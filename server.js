var express = require('express');
var moment  = require('moment');
var app = express();

app.get('/', function(req,res) {
  res.send("Welcome screen");
});

app.get('/:datestring', function (req, res) {
  if (!moment(req.params.datestring).isValid()) {
    res.json({unix:null,natural:null});
  }
  res.end();
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
