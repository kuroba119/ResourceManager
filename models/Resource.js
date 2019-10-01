var keystone = require('keystone');
var Types = keystone.Field.Types;
/**
 * Post Model
 * ==========
 */

var Resource = new keystone.List('Resource', {
	map: { name: 'resourceName' },
	autokey: { path: 'slug', from: 'resourceName', unique: true },
});

Resource.add({
	resourceName: { type: String, initial: true, required: true, index: true },
	email: { type: String, initial: true, required: false, restSelected: false },
	department: { type: String, initial: true, required: false, restSelected: false },
	jobTitle: { type: String, initial: true, required: false, restSelected: false },
	skill: { type: String, initial: true, required: false, restSelected: false },
	notes: { type: String, initial: true, required: false, restSelected: false },
});


Resource.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Resource.register();
