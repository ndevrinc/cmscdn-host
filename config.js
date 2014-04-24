var configs = {
	// Default environnment
	env : "dev",
	cms : "drupal",
	location : "http://ftp.drupal.org/files/projects/",
	css : {},
	css_rtl : {},
	javascripts : {},
	releases: {}
};
 
configs.css = [
	'modules/system/system.base.css',
	'modules/system/system.menus.css',
	'modules/system/system.admin.css',
	'modules/system/system.messages.css',
	'modules/system/system.theme.css',
	'modules/field/theme/field.css',
	'modules/node/node.css',
	'modules/user/user.css',
];
configs.css_rtl = [
	'modules/system/system.base-rtl.css',
	'modules/system/system.menus-rtl.css',
	'modules/system/system.admin-rtl.css',
	'modules/system/system.messages-rtl.css',
	'modules/system/system.theme-rtl.css',
	'modules/field/theme/field-rtl.css',
	'modules/node/node.css',
	'modules/user/user-rtl.css',
];
configs.scripts = [
	"misc/drupal.js",
	"misc/jquery.once.js"
];
configs.releases = [
	"7.25",
	"7.26",
	"7.27"
];

exports.Config = configs;
