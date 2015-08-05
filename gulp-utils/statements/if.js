var gutil = require('gulp-util'),
    input = gutil.colors.green,
    output = gutil.colors.magenta;

/**
 * If expressions module
 * @module hbsJspCompiler/statements/if
 * @returns {Array} - array with the {{#if }} and {{/if }} statement objects
 */
module.exports = [
  /** {{#if }} statement block */
  {
    /** @Constant {String} name - dev friendly name*/
    name: "{{#if test}}",

    /** @Constant {Object} regex - regex for this expression */
    regex: /(\{{2}\#if \'?\"?([\w.\/\=\!\-\+\%\| \>\<]*)\'?\"?\}{2})/,

    /**
     * @method replace
     * @param {Array} match - the array returned by matching the string against this statements regex
     * @returns {String} - the rebuilt input string with the Handlebars expression transpiled into JSP
     */
    replace: function replaceIf(match) {
      var content = match[2];
      gutil.log(input(match[0]), '->', output('<c:if test="${'+content+'}">'));
      return match['input'].replace(match[0], '<c:if test="${'+content+'}">');
    }
  },
  
  /** {{/if }} statement block */
  {
    /** @Constant {String} name - dev friendly name*/
    name: "{{/if}}",

    /** @Constant {Object} regex - regex for this expression */
    regex: /(\{{2}\/if\}{2})/,

    /**
     * @method replace
     * @param {Array} match - the array returned by matching the string against this statements regex
     * @returns {String} - the rebuilt input string with the Handlebars expression transpiled into JSP
     */
    replace: function replaceEndIf(match) {
      gutil.log(input('{{/if}}'), '->', output('</c:if>'));
      return match['input'].replace(match[0], "</c:if>");
    }
  }
];