/*
 * Dependencies
 */
var config = require('./config'),

	bodyParser = require('body-parser'),
	express = require('express'),
	couchbase = require('couchbase'),
	router = express.Router(),
	routes,
	app = express(),
	bucket;

// Connect to couchbase
bucket = (new couchbase.Cluster(config.database.server)).openBucket(config.database.bucket);
routes = require('./routes')(router, bucket);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Start all routes with /api
app.use('/api', router);

app.listen(config.server.port, config.server.ip, ()=> {
	console.log(`couchbase api running... ${config.server.ip}:${config.server.port}`);
});
