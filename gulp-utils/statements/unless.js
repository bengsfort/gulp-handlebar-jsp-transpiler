var gutil = require('gulp-util'),
    input = gutil.colors.green,
    output = gutil.colors.magenta;

module.exports = [
  {
    name: "{{#unless test}}",
    regex: /(\{{2}\#unless ([\w.\/\=\!\-\+\%\| \'\"\>\<]*)\}{2})/,
    replace: function replaceElse(match) {
      var content = match[2];
      gutil.log(input(match[0]), '->', output('<c:if test="${!'+content+'}">'));
      return match['input'].replace(match[0], '<c:if test="${!'+content+'}">');
    }
  },
  {
    name: "{{/unless}}",
    regex: /(\{{2}\/unless\}{2})/,
    replace: function replaceEndIf(match) {
      gutil.log(input('{{/unless}}'), '->', output('</c:if>'));
      return match['input'].replace(match[0], "</c:if>");
    }
  }
];