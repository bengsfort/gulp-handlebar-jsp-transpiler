var gutil = require('gulp-util'),
    input = gutil.colors.green,
    output = gutil.colors.magenta;

var replaceChild = function replaceChild(re, m, item) {
  var content = m[2] || m[3], result, recursiveCheck;
  gutil.log(input(m[0]), '->', output('${'+item+'.'+content+'}'));
  result = m['input'].replace(m[0], '${'+item+'.'+content+'}');
  recursiveCheck = result.match(re);
  if (recursiveCheck === null) return result;
  else return replaceChild(re, recursiveCheck, item);
};

var transformChildVars = function transformChildren(str, item) {
  var re = /(\{{2}(\w+[\w.]*)\}{2}|\{{2} (\w+[\w.]*) \}{2})/,
      m = str.match(re),
      result;
  if (m != null) {
    result = replaceChild(re, m, item);
    return result;
  } else {
    return str;
  }
}

module.exports = [
  {
    // Handled as one due to needing to transform
    // interior vars as well
    name: "{{#each test}}{{/each}}",
    regex: /(\{{2}\#each \'?\"?([\w.\/\=\!\-\+\%\| \>\<]*)\'?\"?\}{2})[\s\S\n\t\r]*(\{{2}\/each\}{2})/m,
    replace: function replaceEach(match) {
      var eachBlock = match[1],
          itemsVar = match[2],
          itemVar = itemsVar.replace(/s$/, '') || 'item',
          closingBlock = match[3],
          content = match['input'];

      // Starting block
      gutil.log(input(eachBlock), '->', output('<c:forEach var="'+itemVar+'" items="${'+itemsVar+'}">'));
      content = content.replace(eachBlock, '<c:forEach var="'+itemVar+'" items="'+itemsVar+'">');

      // In between
      content = transformChildVars(content, itemVar);

      // Closing block
      gutil.log(input(closingBlock), '->', output('</c:forEach>'));
      content = content.replace(closingBlock, '</c:forEach>');
      return content;
    }
  }
];
