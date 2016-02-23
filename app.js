/*
 * Dependencies
 */
var config = require('./config');
var bodyParser = require('body-parser');
var express = require('express');
var couchbase = require('couchbase');
var router = express.Router();
var app = express();
var bucket = (new couchbase.Cluster(config.database.server)).openBucket(config.database.bucket);
var routes = require('./routes')(router, bucket);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Start all routes with /api
app.use('/api', router);

app.listen(config.server.port, config.server.ip, ()=> {
	console.log(`couchbase api running... ${config.server.ip}:${config.server.port}`);
});
