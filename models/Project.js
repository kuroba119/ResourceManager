var keystone = require('keystone');
/**
 * Post Model
 * ==========
 */

var Project = new keystone.List('Project', {
	map: { name: 'nameProject' },
	autokey: { path: 'slug', from: 'nameProject', unique: true },
});

Project.add({
	nameProject: { type: String, initial: true, required: true, index: true },
	category: { type: String, initial: true, required: false, restSelected: false },
	notes: { type: String, initial: true, required: false, restSelected: false },
});


Project.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Project.register();
