var gutil = require('gulp-util'),
    input = gutil.colors.green,
    output = gutil.colors.magenta;


/**
 * Unless expressions module
 * @module hbsJspCompiler/statements/unless
 * @returns {Array} - array with the {{#unless }} and {{/unless}} statement objects
 */
module.exports = [
  /** {{#unless }} statement block */
  {
    /** @Constant {String} name - dev friendly name*/
    name: "{{#unless test}}",

    /** @Constant {Object} regex - regex for this expression */
    regex: /(\{{2}\#unless ([\w.\/\=\!\-\+\%\| \'\"\>\<]*)\}{2})/,
    
    /**
     * @method replace
     * @param {Array} match - the array returned by matching the string against this statements regex
     * @returns {String} - the rebuilt input string with the Handlebars expression transpiled into JSP
     */
    replace: function replaceElse(match) {
      var content = match[2];
      gutil.log(input(match[0]), '->', output('<c:if test="${!'+content+'}">'));
      return match['input'].replace(match[0], '<c:if test="${!'+content+'}">');
    }
  },

  /** {{/unless}} statement block */
  {
    /** @Constant {String} name - dev friendly name*/
    name: "{{/unless}}",

    /** @Constant {Object} regex - regex for this expression */
    regex: /(\{{2}\/unless\}{2})/,

    /**
     * @method replace
     * @param {Array} match - the array returned by matching the string against this statements regex
     * @returns {String} - the rebuilt input string with the Handlebars expression transpiled into JSP
     */
    replace: function replaceEndIf(match) {
      gutil.log(input('{{/unless}}'), '->', output('</c:if>'));
      return match['input'].replace(match[0], "</c:if>");
    }
  }
];