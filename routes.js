var uuid = require('uuid');

var routes = function(router, bucket) {
	router.get('/', function(req, response) {
		response.json({ message: 'welcome to the couchbase api.' });
	});

	router.route('/foo')
		.post(function(req, response) {
			bucket.insert(uuid.v4(), req.body, function(err, data) {
				response.json({ message: 'insert successful' });
			});
		})
		.get(function(req, response) {
			if(!req.body.id) {
				return returnError(response, 'error', 'ID is required.');
			}

			bucket.get(req.body.id, function(err, data) {
				response.json(data.value);
			});
		});

	router.route('/foo/:id')
		.get(function(req, response) {
			if(!req.params.id) {
				return returnError(response, 'error', 'ID is required.');
			}

			bucket.get(req.params.id, function(err, data) {
				response.json(data.value);
			});
		})
};

module.exports = routes;