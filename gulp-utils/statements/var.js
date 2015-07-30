var gutil = require('gulp-util'),
    input = gutil.colors.green,
    output = gutil.colors.magenta;

module.exports = {
  name: "{{var}}",
  regex: /(\{{2}(\w+[\w.\/]*)\}{2}|\{{2} ([\w.\/]*) \}{2})/,
  replace: function replaceVar(match) {
    var content = match[2] || match[3];
    gutil.log(input(match[0]), '->', output('${'+content+'}'));
    return match['input'].replace(match[0], '${'+content+'}');
  }
};