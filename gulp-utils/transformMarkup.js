var gutil = require('gulp-util'),
    path = require('path'),
    statements = require('./statements-hbsToJsp.js')();

/**
 * Handlebars to JSP compiler transformer module 
 * @module hbsJspCompiler/transformer
 */

/**
 * Tests the file against a generic regex string to determine
 * if there are any handlebars expressions within the file
 * @function testFile
 * @param {String} file - the contents of the current file as a string
 * @returns {Boolean} - whether the file contains a handlebars expression (`{{}}`)
 */
var testFile = function(file) {
  var test = file.match(/(\{{2}[ a-zA-Z0-9\#\.\/\%\-\+\|\! ]*\}{2})/);
  return test !== null;
};

/**
 * Recursive file rebuilder function that receives the file and
 * iterates through all stored statements, checking and replacing
 * any matches using the matched statements `replace` method.
 * @function rebuildFile
 * @param {String} file - the contents of the current file as a string
 * @returns {String} - the rebuilt file
 */
var rebuildFile = function(file) {
  var rebuiltFile = file;

  /** Iterates through all of the statements, checks and replaces any regex matches */
  var build = statements.some(function(statement) {
    var test = rebuiltFile.match(statement.regex);
    if (test !== null) {
      var rebuild = statement.replace(test);
      rebuiltFile = rebuild;
      return true;
    }
    return false;
  });

  /** If the file contained a match, recurse and check once again. */
  if (build && testFile(rebuiltFile)) return rebuildFile(rebuiltFile);
  else return rebuiltFile; /** If there was no matches, return the rebuilt file. */
};

/**
 * Main file handler
 * @function handleFile
 * @param {Buffer} file - the Handlebars file buffer piped in from Gulp
 * @returns {Buffer} - a rebuilt JSP file buffer
 */
module.exports = function handleFile(file) {
  var curFile = path.basename(file.path),
    strFile = file.contents.toString(),
    test = testFile(strFile);

  gutil.log('Transforming: \''+gutil.colors.yellow(curFile)+'\'...');
  
  /** If the file contains some sort of base handlebars expression, rebuild it */
  if (test) {
    var rebuiltFile = rebuildFile(strFile);
    file.contents = new Buffer(rebuiltFile);
    gutil.log('Finished transforming: \''+gutil.colors.yellow(curFile)+'\'');
    return file;
  /** If the file does not contain any handlebars expressions, return it without messing with it */
  } else {
    gutil.log('Finished transforming: \''+gutil.colors.yellow(curFile)+'\'');
    return file;
  }
};