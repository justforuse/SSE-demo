const express = require('express')

const app = express()

app.get('/', function(req, res) {
  res.send('Express works!')
})

app.get('/stream', function(req, res) {
  res.writeHead(200, {
    "Content-Type":"text/event-stream",
    "Cache-Control":"no-cache",
    "Connection":"keep-alive",
    "Access-Control-Allow-Origin": '*',
  });
  res.write("retry: 10000\n");
  res.write("event: connecttime\n");
  res.write("data: " + (new Date()) + "\n\n");
  res.write("data: " + (new Date()) + "\n\n");

  interval = setInterval(function () {
    res.write("data: " + (new Date()) + "\n\n");
  }, 1000);

  req.connection.addListener("close", function () {
    console.log('Client closed')
    clearInterval(interval);
  }, false);
})

app.listen(3000, function(err) {
  if(err) {
    console.log('Start failed')
  } else {
    console.log('Listening on 3000')
  }
})
