var gutil = require('gulp-util'),
    input = gutil.colors.green,
    output = gutil.colors.magenta;

/**
 * Recursive helper that replaces a handlebars variable with a prefixed JSP var
 * @function replaceChild
 * @param {Object} re - the regex expression to use for matches
 * @param {Array} m - the previous match
 * @param {String} item - the property to use as a prefix to this variable
 * @returns {String} - the original with block with variables transpiled to JSP
 */
var replaceChild = function replaceChild(re, m, item) {
  var content = m[2] || m[3], result, recursiveCheck;

  gutil.log(input(m[0]), '->', output('${'+item+'.'+content+'}'));
  result = m['input'].replace(m[0], '${'+item+'.'+content+'}');

  /** run a check on the result to see if there is any more vars,
   * if so, recurse with the result as `m` */
  recursiveCheck = result.match(re);
  if (recursiveCheck === null) return result;
  else return replaceChild(re, recursiveCheck, item);
};

/**
 * Transpiler function for the interior content of the expression block
 * @function transformChildVars
 * @param {String} str - the statement block to use
 * @param {String} item - the property to use as the prefix for the vars
 * @returns {String} - the completed with block with transpiled interior vars
 */ 
var transformChildVars = function transformChildren(str, item) {
  var re = /(\{{2}\s{0,1}(\w+[\w.]*)\s{0,1}\}{2}|\$\{(\w+[\w]*)\})/,
      m = str.match(re),
      result;

  /** If the `str.match` result is not null, fire replaceChild */
  if (m != null) {
    /** Uses replaceChild for recursion to prevent prematurely returning an unfinished result */
    result = replaceChild(re, m, item);
    return result;
  } else {
    return str;
  }
};

/**
 * With expressions module
 * @module hbsJspCompiler/statements/with
 * @returns {Object} - the with statement object
 */
module.exports = {
  /** `with` and `/with` handled as one due to needing to transform interior vars as well */
  /** @Constant {String} name - dev friendly name*/
  name: "{{#with test}}{{/with}}",

  /** @Constant {Object} regex - regex for this expression */
  regex: /(\{{2}\#with \'?\"?([\w.\/\=\!\-\+\%\| \>\<]*)\'?\"?\}{2})[\s\S\n\t\r]*(\{{2}\/with\}{2})/m,

  /**
   * @method replace
   * @param {Array} match - the array returned by matching the string against this statements regex
   * @returns {String} - the rebuilt input string with the Handlebars expression transpiled into JSP
   */
  replace: function replaceEach(match) {
    var eachBlock = match[1],
        itemsVar = match[2],
        closingBlock = match[3],
        content = match['input'];

    /** Delete first expression */
    gutil.log(input(eachBlock), '->', output('DELETED'));
    content = content.replace(eachBlock, '');

    /** Fire transformChildVars to transpile everything within the block */
    content = transformChildVars(content, itemsVar);

    /** Delete closing block */
    gutil.log(input(closingBlock), '->', output('DELETED'));
    content = content.replace(closingBlock, '');
    return content;
  }
};