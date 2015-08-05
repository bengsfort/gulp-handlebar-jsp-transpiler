var requireDir = require('require-dir'),
    gutil = require('gulp-util');

/**
 * Handlebars to JSP compiler statements module 
 * @module hbsJspCompiler/statements
 * @returns {Array|Object} - an array containing all of the supported statements and their methods.
 */

module.exports = function setupStatements() {
  var files = requireDir('statements'),
      keys = Object.keys(files),
      statements = [];

  gutil.log(gutil.colors.cyan('Loading statement transforms.'));

  /** Iterate through each key (file) and push their contents to the statements array */
  keys.every(function(cv, i) {
    /** if the file is an object rather than array, push the object into the statements array */
    if (files[cv].length === undefined) {
      return statements.push(files[cv]);
    /** if the file is an array, iterate through each key, pushing each into the statements array */
    } else {
      return files[cv].every(function(val) {
        return statements.push(val);
      });
    }
  });
  
  gutil.log(gutil.colors.blue('Transforms stored.'));
  return statements;
};