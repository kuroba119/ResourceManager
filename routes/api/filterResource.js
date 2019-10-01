var keystone = require('keystone');

var FilterResource = keystone.list('Resource');
/**
 * Get Resource by resourceName
 */
exports.filterByName = function (req, res) {
	FilterResource.model.find({ resourceName: req.params.resourceName }).exec(function (err, item) {
		if (err) return res.json({ err: err });
		if (!item) return res.json('not found');
		res.json({
			resource: item,
		});
	});
};

/**
 * Get Resource by email
 */
exports.filterByEmail = function (req, res) {
	FilterResource.model.find({ email: req.params.email }).exec(function (err, item) {

		if (err) return res.json({ err: err });
		if (!item) return res.json('not found');

		res.json({
			resource: item,
		});
	});
};

/**
 * Get Resource by department
 */
exports.filterByDepartment = function (req, res) {
	FilterResource.model.find({ department: req.params.department }).exec(function (err, item) {

		if (err) return res.json({ err: err });
		if (!item) return res.json('not found');

		res.json({
			resource: item,
		});
	});
};

/**
 * Get Resource by jobTitle
 */
exports.filterByJobTitle = function (req, res) {
	FilterResource.model.find({ jobTitle: req.params.jobTitle }).exec(function (err, item) {

		if (err) return res.json({ err: err });
		if (!item) return res.json('not found');

		res.json({
			resource: item,
		});
	});
};

/**
 * Get Resource by skill
 */
exports.filterBySkill = function (req, res) {
	FilterResource.model.find({ skill: req.params.skill }).exec(function (err, item) {

		if (err) return res.json({ err: err });
		if (!item) return res.json('not found');

		res.json({
			resource: item,
		});
	});
};
