var gutil = require('gulp-util'),
    input = gutil.colors.green,
    output = gutil.colors.magenta;

module.exports = {
  name: "{{!-- comments --}}",
  regex: /(\{{2}\!\-{0,2}\s(.*)\s\-{0,2}\}{2})/,
  replace: function replaceComment(match) {
    var content = match[2] || match[3];
    gutil.log(input(match[0]), '->', output('<%-- '+content+' --%>'));
    return match['input'].replace(match[0], '<%-- '+content+' --%>');
  }
};