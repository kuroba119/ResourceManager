module.exports = {
	index: function (req, res, next) {
		res.send('success');
		next();
	},
};
