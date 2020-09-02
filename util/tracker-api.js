var qs = require("querystring");
var http = require("https");
var fs = require("fs");
require("dotenv").config();
var req;

var options = {
  method: "POST",
  hostname: "easypostapi-easypost-v1.p.rapidapi.com",
  port: null,
  path: "/v2/trackers",
  headers: {
    "x-rapidapi-host": "easypostapi-easypost-v1.p.rapidapi.com",
    "x-rapidapi-key": process.env.API_KEY,
    "content-type": "application/x-www-form-urlencoded",
    useQueryString: true,
  },
};

var trackingRequest = function(trackingNumber, carrierNumber, cb) {
  req = http.request(options, function(res) {
    var chunks = [];

    res.on("data", function(chunk) {
      chunks.push(chunk);
    });

    res.on("end", function() {
      var body = Buffer.concat(chunks);
      // console.log(body.toString());
      var data = JSON.parse(body.toString());
      console.log(JSON.stringify(data, null, 2));
      cb(data);
      // fs.writeFileSync("trackingfile.json", JSON.stringify(data, null, 2));
    });
  });

  req.write(
    qs.stringify({
      "tracker[carrier]": carrierNumber,
      "tracker[tracking_code]": trackingNumber,
    })
  );
  req.end();
};

module.exports = trackingRequest;
