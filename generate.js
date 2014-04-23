
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

var cfg = require('./config').Config;

var public_dir = __dirname + '/public/';

cfg.releases.forEach(function (release) {

  var release_dir = public_dir + cfg.cms + '/' + release;
  var filename = cfg.cms + '-' + release + '.tar.gz';
  var url = cfg.location + filename;

  // Check to make sure the folder wasn't created already
  fs.exists(release_dir, function (exists) {
    // Skip if the release directory already exists
    if (exists) {
      console.log("release " + release + " already exists.");
    } else {
      var writer = request(url).pipe(fs.createWriteStream(public_dir + '/' + filename));

      writer.on('finish', function() {
        var extract = new targz().extract(public_dir + '/' + filename, public_dir, function(err) {
          if(err) throw err;

          // Deletes the archive file just downloaded
          fs.unlink(public_dir + '/' + filename);

          fs.rename(public_dir + '/' + cfg.cms + '-' + release, release_dir, function (err) {
            concat({
              dir : release_dir,
              src : cfg.scripts,
              dest : '/core.js'
            });
            uglify(release_dir + '/core.js', release_dir + '/core.min.js');
          });
        });
      });
    } // end if the release exists
  });
});

function concat(opts) {
 
	var dir = opts.dir;
	var fileList = opts.src;
	var distPath = dir + opts.dest;
	var out = fileList.map(function(filePath){
		return fs.readFileSync(dir + '/' + filePath, FILE_ENCODING);
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
 

