var keystone = require('keystone');
var userApiAuth = keystone.list('UserApiAuth');

exports.get = function (req, res) {
	userApiAuth.model.findOne(function (err, items) {
		if (err) return res.json({ err: err });
		res.json({
			userApiAuth: items,
		});

	});
};
