var express = require('express');
var moment  = require('moment');
var port = process.env.PORT || 3000
var app = express();
var datestring, unixMoment, stringMoment;

app.get('/', function(req,res) {
  res.send("Welcome screen");
});

app.get('/:datestring', function (req, res) {
  datestring = req.params.datestring;
  stringMoment = moment.utc(datestring);
  unixMoment = moment.unix(Number(datestring));
  if (stringMoment.isValid()) {
    res.json(makeJsonResponse(stringMoment));
  }
  else if (unixMoment.isValid()) {
    res.json(makeJsonResponse(unixMoment));;
  }
  else {
    res.json({unix:null,natural:null});
  }
  res.end();
})

app.listen(port, function () {
  console.log('App listening on port' + port)
})

function makeJsonResponse(m) {
  return {
    unix:    Number(m.format('X')),
    natural: m.format('MMMM D, YYYY')
  };
}
