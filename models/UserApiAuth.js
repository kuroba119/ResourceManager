var keystone = require('keystone');
var Types = keystone.Field.Types;

var UserApiAuth = new keystone.List('UserApiAuth', {
	rest: true,
	restOptions: 'list show create update delete',
	map: { name: 'userName' },
	autokey: { path: 'slug', from: 'userName', unique: true },
});
UserApiAuth.add({
	userName: { type: Types.Name, required: true, index: true },
	password: { type: Types.Password, initial: true, required: false, restSelected: false },
});

UserApiAuth.register();
