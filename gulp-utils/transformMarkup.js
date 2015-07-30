var statements = require('./statements-hbsToJsp.js')();

var testFile = function(file) {
  var test = file.match(/(\{{2}[ a-zA-Z0-9\#\.\/\%\-\+\|\! ]*\}{2})/);
  return test !== null;
};

var rebuildFile = function(file) {
  var rebuiltFile = file;
  statements.some(function(statement) {
    var test = rebuiltFile.match(statement.regex);
    if (test !== null) {
      var rebuild = statement.replace(test);
      rebuiltFile = rebuild;
    }
  });
  if (testFile(rebuiltFile)) return rebuildFile(rebuiltFile);
  else return rebuiltFile;
};

module.exports = function handleFile(file) {
  var strFile = file.contents.toString(),
    test = testFile(strFile);
  if (test) {
    var rebuiltFile = rebuildFile(strFile);
    file.contents = new Buffer(rebuiltFile);
    return file;
  } else {
    return file;
  }
};