var config = require('./config'),
	express = require('express'),
	bodyParser = require('body-parser'),
	router = express.Router(),
	routes,
	couchbase = require('couchbase'),
	app = express(),
	bucket = (new couchbase.Cluster(config.database.server)).openBucket(config.database.bucket);

routes = require('./routes')(router, bucket);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Start all routes with /api
app.use('/api', router);

app.listen(3000, function () {
    console.log('couchbase api running...');
});
