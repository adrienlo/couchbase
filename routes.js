var uuid = require('uuid')
	Beer = require('./beer');

var routes = (router, bucket) => {
	function returnError(response, message) {
		return response.status(400).send({ error: 'error', message: message });
	}

	router.get('/', (req, response) => {
		response.json({ message: 'welcome to the couchbase api.' });
	});

	router.route('/foo')
		.post((req, response) => {
			if(!req.body.description) {
				return returnError(response, 'Description is required.');
			}

			var beer = Beer(uuid.v4(), req.body.description);

			bucket.insert(beer.id, beer, (err, data) => {
					response.json({ message: 'insert successful' });
				});
		})
		.get((req, response) => {
			if(!req.body.id) {
				return returnError(response, 'ID is required.');
			}

			bucket.get(req.body.id, (err, data) => {
				response.json(data.value);
			});
		});

	router.route('/foo/:id')
		.get((req, response) => {
			if(!req.params.id) {
				return returnError(response, 'ID is required.');
			}

			bucket.get(req.params.id, (err, data) => {
				response.json(data.value);
			});
		})
};

module.exports = routes;