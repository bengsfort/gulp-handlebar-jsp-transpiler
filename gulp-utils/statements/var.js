var gutil = require('gulp-util'),
    input = gutil.colors.green,
    output = gutil.colors.magenta;

/**
 * Var expressions module
 * @module hbsJspCompiler/statements/var
 * @returns {Object} - the variable expression statement object
 */
module.exports = {
  /** @Constant {String} name - dev friendly name*/
  name: "{{var}}",

  /** @Constant {Object} regex - regex for this expression */
  regex: /(\{{2}(\w+[\w.\/]*)\}{2}|\{{2} ([\w.\/]*) \}{2})/,

  /**
   * @method replace
   * @param {Array} match - the array returned by matching the string against this statements regex
   * @returns {String} - the rebuilt input string with the Handlebars expression transpiled into JSP
   */
  replace: function replaceVar(match) {
    var content = match[2] || match[3];
    gutil.log(input(match[0]), '->', output('${'+content+'}'));
    return match['input'].replace(match[0], '${'+content+'}');
  }
};