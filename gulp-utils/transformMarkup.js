var gutil = require('gulp-util'),
    path = require('path'),
    statements = require('./statements-hbsToJsp.js')();

var testFile = function(file) {
  var test = file.match(/(\{{2}[ a-zA-Z0-9\#\.\/\%\-\+\|\! ]*\}{2})/);
  return test !== null;
};

var rebuildFile = function(file) {
  var rebuiltFile = file;

  var build = statements.some(function(statement) {
    var test = rebuiltFile.match(statement.regex);
    if (test !== null) {
      var rebuild = statement.replace(test);
      rebuiltFile = rebuild;
      return true;
    }
    return false;
  });

  if (build && testFile(rebuiltFile)) return rebuildFile(rebuiltFile);
  else return rebuiltFile;
};

module.exports = function handleFile(file) {
  var curFile = path.basename(file.path),
    strFile = file.contents.toString(),
    test = testFile(strFile);

  gutil.log('Transforming: \''+gutil.colors.yellow(curFile)+'\'...');

  if (test) {
    var rebuiltFile = rebuildFile(strFile);
    file.contents = new Buffer(rebuiltFile);
    gutil.log('Finished transforming: \''+gutil.colors.yellow(curFile)+'\'');
    return file;
  } else {
    gutil.log('Finished transforming: \''+gutil.colors.yellow(curFile)+'\'');
    return file;
  }
};