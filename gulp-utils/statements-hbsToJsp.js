var requireDir = require('require-dir'),
    gutil = require('gulp-util');

module.exports = function setupStatements() {
  var files = requireDir('statements'),
      keys = Object.keys(files),
      statements = [];
  gutil.log(gutil.colors.cyan('Loading statement transforms.'));
  keys.every(function(cv, i) {
    if (files[cv].length === undefined) {
      return statements.push(files[cv]);
    } else {
      return files[cv].every(function(val) {
        return statements.push(val);
      });
    }
  });
  gutil.log(gutil.colors.blue('Transforms stored.'));
  return statements;
};