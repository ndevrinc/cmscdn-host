
var sys = require('sys'),
	request = require('request'),
	targz = require('tar.gz'),
    fs = require('fs');

// UglifyJS
// @link https://github.com/mishoo/UglifyJS/
var ujs_jsp = require("uglify-js").parser;
var ujs_pro = require("uglify-js").uglify;

var FILE_ENCODING = 'utf-8',
 
EOL = '\n';

var public_dir = __dirname + '/public/';
var release = '7.25';
var cms = 'drupal';
var release_dir = public_dir + cms + '/' + release;
var filename = cms + '-' + release + '.tar.gz';
var url = 'http://ftp.drupal.org/files/projects/' + filename;

var filesArray = require('./config');

// fs.rmdirSync(release_dir);
// fs.unlinkSync(public_dir + '/' + filename);

// Check to make sure the folder wasn't created already
fs.exists(release_dir, function (exists) {
  console.error(exists ? "it's there" : "not there");

  var writer = request(url).pipe(fs.createWriteStream(public_dir + '/' + filename));

  writer.on('finish', function() {
    console.error('all writes are now complete.');
    var extract = new targz().extract(public_dir + '/' + filename, public_dir, function(err) {
      if(err) throw err;

      // Deletes the archive file just downloaded
      fs.unlink(public_dir + '/' + filename);

      fs.rename(public_dir + '/' + cms + '-' + release, release_dir, function (err) {
concat({
	src : ["misc/drupal.js",
	"misc/jquery.once.js"],
	dest : release_dir + '/core.js'
});
uglify(release_dir + '/core.js', release_dir + '/core.min.js');


      });
    });
  });

  console.error('testing threads.');
});

function concat(opts) {
 
	var fileList = opts.src;
	var distPath = opts.dest;
	var out = fileList.map(function(filePath){
		return fs.readFileSync(release_dir + '/' + filePath, FILE_ENCODING);
	});
 
	fs.writeFileSync(distPath, out.join(EOL), FILE_ENCODING);
	console.log(' '+ distPath +' built.');
}
 
 
function uglify(srcPath, distPath) {
	 var
		uglyfyJS = require('uglify-js'),
		jsp = uglyfyJS.parser,
		pro = uglyfyJS.uglify,
		ast = jsp.parse( fs.readFileSync(srcPath, FILE_ENCODING) );
 
	 ast = pro.ast_mangle(ast);
	 ast = pro.ast_squeeze(ast);
 
	 fs.writeFileSync(distPath, pro.gen_code(ast), FILE_ENCODING);
	 console.log(' '+ distPath +' built.');
}
 

