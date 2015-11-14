var express 	= require("express");
var path 		= require("path");
var logger 		= require("morgan");
var bodyParser	= require("body-parser");
var https		= require("https");
var http		= require("http");

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
    //set CORS headers
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-type,Accept');
	if (req.method == 'OPTIONS') {
		res.status(200).end();
	} else {
		next();
	}
});

app.use('/', require('./routes'));

//if no route is matched by now, it must be a 404
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

http.createServer(app).listen(process.env.PORT || 5000);
//https.createServer(options, app).listen(443);

var server = app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + server.address().port);
});
