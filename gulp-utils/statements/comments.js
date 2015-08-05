var gutil = require('gulp-util'),
    input = gutil.colors.green,
    output = gutil.colors.magenta;


/**
 * Comment expressions module
 * @module hbsJspCompiler/statements/comments
 * @returns {Object} - the comment statement object
 */
module.exports = {
  /** @Constant {String} name - dev friendly name*/
  name: "{{!-- comments --}}",
  /** @Constant {Object} regex - regex for this expression */
  regex: /(\{{2}\!\-{0,2}\s(.*)\s\-{0,2}\}{2})/,
  /**
   * @method replace
   * @param {Array} match - the array returned by matching the string against this statements regex
   * @returns {String} - the rebuilt input string with the Handlebars expression transpiled into JSP
   */
  replace: function replaceComment(match) {
    var content = match[2] || match[3];
    gutil.log(input(match[0]), '->', output('<%-- '+content+' --%>'));
    return match['input'].replace(match[0], '<%-- '+content+' --%>');
  }
};