var request = require("request");

var base_url = "http://localhost:3000/"

var simple_query = {
  input: 1450137600,
  output: {"unix":1450137600,"natural":"December 15, 2015"}
}
var string_query = {
  input: 'December%2015,%202015',
  output: {"unix":1450137600,"natural":"December 15, 2015"}
}

var string_query2 = {
  input: '01%January%1988',
  output: {"unix":1450137600,"natural":"December 15, 2015"}
}

var invalid_query = {
  input: "invalid",
  output: {
    "unix": null,
    "natural": null
  }
};

describe("Timestamp server", function() {
  describe("/GET", function() {
    it("returns a status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
    it("accepts a query string", function(done) {
      request.get(base_url + simple_query.input, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
    it("returns a null JSON object if the query is not a valid date", function(done) {
      request.get(base_url + invalid_query.input, function(error, response, body) {
        expect(JSON.parse(body)).toEqual(invalid_query.output);
        done();
      });
    });
    it("returns Unix and natural datestrings", function(done) {
      request.get(base_url + string_query.input, function(error, response, body) {
        expect(JSON.parse(body)).toEqual(string_query.output);
        done();
      });
    });
    it("can respond to a Unix timestamp input", function(done) {
      request.get(base_url + simple_query.input, function(error, response, body) {
        expect(JSON.parse(body)).toEqual(simple_query.output);
        done();
      });
    });
  });
});
