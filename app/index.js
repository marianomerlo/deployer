var express = require('express');
var app     = express();
var execProcess = require('./execProcess');

var apiKey = 'DiZeoYMauroUnidosPorSiempre';

app.get('/run/:scriptName/:version', function (req, res) {
  if (req.headers['api-key'] === apiKey) {
    if (req.params.scriptName && req.params.version) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      var command = '~/' + req.params.scriptName + '.sh ' + req.params.version;
      console.log('Executing the following command: sh ' + command);
      execProcess.result('sh ' + command, function (err, response) {
        if (!err) {
          res.end(response);
        } else {
          res.end(err.toString());
        }
      });
    } else {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.end("scriptName and version are required. Use as follows: /run/:scriptName/:tagVersion");
    }
  } else {
    res.writeHead(401, {'Content-Type': 'text/plain'});
    res.end("Invalid api key");
  }
});

app.listen(3333, function () {
  console.log('Example app listening on port 3333!');
});