var keystone = require('keystone');

var Project = keystone.list('Project');

/**
 * List Project
 */
exports.list = function (req, res) {
	Project.model.find(function (err, items) {

		if (err) return res.json({ err: err });

		res.json({
			project: items,
		});

	});
};

/**
 * Get Project by ID
 */
exports.get = function (req, res) {
	Project.model.findById(req.params.id).exec(function (err, item) {

		if (err) return res.json({ err: err });
		if (!item) return res.json('not found');

		res.json({
			project: item,
		});

	});
};


/**
 * Create a Project
 */
exports.create = function (req, res) {

	let item = new Project.model(),
		data = (req.method === 'POST') ? req.body : req.query;

	item.getUpdateHandler(req).process(data, function (err) {

		if (err) return res.json({ error: err });

		res.json({
			project: item,
		});

	});
};

/**
 * Patch Project by ID
 */
exports.update = function (req, res) {

	Project.model.findById(req.params.id).exec(function (err, item) {

		if (err) return res.json({ err: err });
		if (!item) return res.json({ err: 'not found' });

		var data = (req.method === 'PUT') ? req.body : req.query;

		item.getUpdateHandler(req).process(data, function (err) {

			if (err) return res.json({ err: err });

			res.json({
				project: item,
			});

		});

	});
};

/**
 * Delete Project by ID
 */
exports.remove = function (req, res) {
	Project.model.findById(req.params.id).exec(function (err, item) {

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
