var keystone = require('keystone');
/**
 * Post Model
 * ==========
 */

var Task = new keystone.List('Task', {
	map: { name: 'resourceName' },
	autokey: { path: 'slug', from: 'resourceName', unique: true },
});

Task.add({
	resourceName: { type: String, initial: true, required: true, index: true },
	startDate: { type: String, initial: true, required: false, restSelected: false },
	endDate: { type: String, initial: true, required: false, restSelected: false },
	projectName: { type: String, initial: true, required: false, restSelected: false },
	percent: { type: String, initial: true, required: false, restSelected: false },
	detail: { type: String, initial: true, required: false, restSelected: false },
});


Task.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Task.register();
