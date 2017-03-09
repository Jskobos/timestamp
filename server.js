var express = require('express');
var moment  = require('moment');
var app = express();

app.get('/', function(req,res) {
  res.send("Welcome screen");
});

app.get('/:datestring', function (req, res) {
  if (moment(req.params.datestring).isValid()) {
    var result = moment.utc(req.params.datestring);
    res.json({unix:Number(result.format('X')),natural:result.format('MMMM D, YYYY')});
  }
  else if (moment(Number(req.params.datestring)).isValid()) {
    var result = moment.unix(Number(req.params.datestring));
    res.json({unix:Number(result.format('X')),natural:result.format('MMMM D, YYYY')});;
  }
  else {
    res.json({unix:null,natural:null});
  }
  res.end();
})

app.listen(3000, function () {
  console.log('App listening on port 3000!')
})
