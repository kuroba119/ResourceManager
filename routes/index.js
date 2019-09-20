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

// Import Route Controllers
var routes = {
	api: importRoutes('./api'),
};


// Setup Route Bindings
exports = module.exports = function (app) {
	// API
	
	
	// api resource
	app.get('/', routes.api.index.index);
	app.get('/api/resource', routes.api.resource.list);
	app.get('/api/resource/:id', routes.api.resource.get);
	app.post('/api/resource/create', routes.api.resource.create);
	app.put('/api/resource/:id', routes.api.resource.update);
	app.delete('/api/resource/:id', routes.api.resource.remove);
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
