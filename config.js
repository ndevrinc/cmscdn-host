var configs = {
	// Default environnment
	env : "dev",
	cms : "drupal",
	location : "http://ftp.drupal.org/files/projects/",
	css : {},
	javascripts : {},
	releases: {}
};
 
configs.css = [
	"web.css",
	"app.css"
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
