var keystone = require('keystone');

var Task = keystone.list('Task');

/**
 * List Task
 */
exports.list = function (req, res) {
	Task.model.find(function (err, items) {

		if (err) return res.json({ err: err });

		res.json({
			task: items,
		});

	});
};

/**
 * Get Task by ID
 */
exports.get = function (req, res) {
	Task.model.findById(req.params.id).exec(function (err, item) {

		if (err) return res.json({ err: err });
		if (!item) return res.json('not found');

		res.json({
			task: item,
		});

	});
};


/**
 * Create a Task
 */
exports.create = function (req, res) {

	let item = new Task.model(),
		data = (req.method === 'POST') ? req.body : req.query;

	item.getUpdateHandler(req).process(data, function (err) {

		if (err) return res.json({ error: err });

		res.json({
			task: item,
		});

	});
};

/**
 * Patch Task by ID
 */
exports.update = function (req, res) {

	Task.model.findById(req.params.id).exec(function (err, item) {

		if (err) return res.json({ err: err });
		if (!item) return res.json({ err: 'not found' });

		var data = (req.method === 'PUT') ? req.body : req.query;

		item.getUpdateHandler(req).process(data, function (err) {

			if (err) return res.json({ err: err });

			res.json({
				task: item,
			});

		});

	});
};

/**
 * Delete Task by ID
 */
exports.remove = function (req, res) {
	Task.model.findById(req.params.id).exec(function (err, item) {

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
