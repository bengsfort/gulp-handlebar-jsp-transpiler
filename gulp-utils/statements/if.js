var gutil = require('gulp-util'),
    input = gutil.colors.green,
    output = gutil.colors.magenta;

module.exports = [
  {
    name: "{{#if test}}",
    regex: /(\{{2}\#if \'?\"?([\w.\/\=\!\-\+\%\| \>\<]*)\'?\"?\}{2})/,
    replace: function replaceIf(match) {
      var content = match[2];
      gutil.log(input(match[0]), '->', output('<c:if test="${'+content+'}">'));
      return match['input'].replace(match[0], '<c:if test="${'+content+'}">');
    }
  },
  {
    name: "{{/if}}",
    regex: /(\{{2}\/if\}{2})/,
    replace: function replaceEndIf(match) {
      gutil.log(input('{{/if}}'), '->', output('</c:if>'));
      return match['input'].replace(match[0], "</c:if>");
    }
  }
];