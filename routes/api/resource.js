var keystone = require('keystone');

var Resource = keystone.list('Resource');

/**
 * List Resource
 */
exports.list = function (req, res) {
	Resource.model.find(function (err, items) {

		if (err) return res.json({ err: err });

		res.json({
			resource: items,
		});

	});
};

/**
 * Get Resource by ID
 */
exports.get = function (req, res) {
	Resource.model.findById(req.params.id).exec(function (err, item) {

		if (err) return res.json({ err: err });
		if (!item) return res.json('not found');

		res.json({
			resource: item,
		});

	});
};


/**
 * Create a Resource
 */
exports.create = function (req, res) {

	let item = new Resource.model(),
		data = (req.method === 'POST') ? req.body : req.query;

	item.getUpdateHandler(req).process(data, function (err) {

		if (err) return res.json({ error: err });

		res.json({
			resource: item,
		});

	});
};

/**
 * Patch Resource by ID
 */
exports.update = function (req, res) {

	Resource.model.findById(req.params.id).exec(function (err, item) {

		if (err) return res.json({ err: err });
		if (!item) return res.json({ err: 'not found' });

		var data = (req.method === 'PUT') ? req.body : req.query;

		item.getUpdateHandler(req).process(data, function (err) {

			if (err) return res.json({ err: err });

			res.json({
				resource: item,
			});

		});

	});
};

/**
 * Delete Resource by ID
 */
exports.remove = function (req, res) {
	Resource.model.findById(req.params.id).exec(function (err, item) {

		if (err) return res.json({ dberror: err });
		if (!item) return res.json('not found');

		item.remove(function (err) {
			if (err) return res.json({ dberror: err });

			return res.json({
				success: true,
			});
		});

	});
};
