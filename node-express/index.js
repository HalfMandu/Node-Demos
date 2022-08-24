const express = require('express'),
      http = require('http');
const morgan = require('morgan');
const hostname = 'localhost';
const port = 3000;
const app = express();
const bodyParser = require('body-parser');
const dishRouter = require('./routes/dishRouter');
const leaderRouter = require('./routes/leaderRouter');
const promotionRouter = require('./routes/promotionRouter');

//parse body of incoming request messages to JSON using middleware
app.use(bodyParser.json());

//set logging
app.use(morgan('dev'));

//all requests for /<group> forwarded to its Router component imported above
app.use('/dishes', dishRouter);
app.use('/promotions', promotionRouter);
app.use('/leaders', leaderRouter);

//tell server to serve static files from /public  -- "root" 
app.use(express.static(__dirname + '/public'));

//define server
app.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>This is an Express Server</h1></body></html>');

});

//create server
const server = http.createServer(app);

//start server
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});