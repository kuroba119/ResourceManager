/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var importRoutes = keystone.importer(__dirname);
var passport = require('passport');
var passportJWT = require('passport-jwt');
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwtOptions = {};
var jwt = require('jsonwebtoken');

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'wowwow';
// Import Route Controllers
var routes = {
	api: importRoutes('./api'),
};

// lets create our strategy for web token
var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
	console.log('payload received', jwt_payload);
	var user = routes.api.userApiAuth.get({ id: jwt_payload.id });
	if (user) {
		next(null, user);
	} else {
		next(null, false);
	}
});
// use the strategy
passport.use(strategy);
// Setup Route Bindings
exports = module.exports = function (app) {
	// API
	app.use(passport.initialize());
	// login route
	app.post('/login', function (req, res, next) {
		const { name, password } = req.body;
		if (name && password) {
			// we get the user with the name and save the resolved promise
			var user = routes.api.userApiAuth.get({ name });
			if (!user) {
				res.status(401).json({ msg: 'No such user found', user });
			}
			if (user.password === password) {
				// from now on we’ll identify the user by the id and the id is
// the only personalized value that goes into our token
				var payload = { id: user.id };
				var token = jwt.sign(payload, jwtOptions.secretOrKey);
				res.json({ msg: 'ok', token: token });
			} else {
				res.status(401).json({ msg: 'Password is incorrect' });
			}
		}
	});
	app.get('/api/userApiAuth', routes.api.userApiAuth.get);
	// api resource
	app.get('/', routes.api.index.index);
	app.get('/api/resource', routes.api.resource.list);
	app.get('/api/resource/:id', routes.api.resource.get);
	app.post('/api/resource/create', routes.api.resource.create);
	app.put('/api/resource/:id', routes.api.resource.update);
	app.delete('/api/resource/:id', routes.api.resource.remove);
	// api filter resource
	app.get('/api/filter/resource/name/:resourceName', routes.api.filterResource.filterByName);
	app.get('/api/filter/resource/email/:email', routes.api.filterResource.filterByEmail);
	app.get('/api/filter/resource/department/:department', routes.api.filterResource.filterByDepartment);
	app.get('/api/filter/resource/jobTitle/:jobTitle', routes.api.filterResource.filterByJobTitle);
	app.get('/api/filter/resource/skill/:skill', routes.api.filterResource.filterBySkill);
	// api project
	app.get('/api/project', routes.api.project.list);
	app.get('/api/project/:id', routes.api.project.get);
	app.post('/api/project/create', routes.api.project.create);
	app.put('/api/project/:id', routes.api.project.update);
	app.delete('/api/project/:id', routes.api.project.remove);
	// api task
	app.get('/api/task', routes.api.task.list);
	app.get('/api/task/:id', routes.api.task.get);
	app.post('/api/task/create', routes.api.task.create);
	app.put('/api/task/:id', routes.api.task.update);
	app.delete('/api/task/:id', routes.api.task.remove);

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

};
