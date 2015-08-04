# Gulp [Handlebars -> JSP Transformer](http://tehurn.com/)
A proof of concept [Handlebars](//handlebarsjs.com) to [JSP](http://www.nooooooooooooooo.com/) Transformer for those that aren't super stoked on the mighty behemoth that is the Wild West of JSP.

Obviously compilers/transformers should have their output checked, and this is meant to streamline the development process and give a potential for another front end option that's a little easier on the eyes than JSP (and brain), and give a starting point so JSP development is more along the polishing side.

![image](http://i.imgur.com/9YVxMUah.png)

## Installation
Just `git clone` the repo and `npm install` it up.

## Commands
- `gulp handlebars`: Compile Handlebars files to `/build/html/**.html`.
- `gulp jsp-compile`: Compile Handlebars files to `/build/jsp/**.jsp`.

## Completed Transforms
The current completed transforms are incredibly basic but a step in the right direction. Included in this are:
- `{{user.name}}` -> `${user.name}`
- `{{#if user}} {{/if}}` -> `<c:if test="${user}"> </c:if>`
- `{{#unless user.ignoreUser}} {{/unless}}` -> `<c:if test="${!user.ignoreUser}"> </c:if>`
- `{{#each users}} {{/each}}` -> `<c:forEach var="user" items="${users}"> </c:forEach>`
    + Any `{{ prop }}` within the `{{#each users}}` block will be transformed to `${user.prop}`
- `{{#with user}} {{/with}}` -> `deleted`
    + Any `{{ prop }}` within the `{{#with user}}` block will be transformed to `${user.prop}`
- `{{!-- comment --}}` -> `<%-- comment --%>`
- `{{! comment }}` -> `<%-- comment --%>`

## To-do
- Support for complex `if else` blocks being transformed to `<c:choose> <c:when test /> <c:otherwise /> </c:choose>` blocks.
- Support for `{{else}}` sections within `{{#with}}` blocks.
- `varStatus` support
    + `{{@index}}` -> `${varStatus.index}`
    + `{{@first}}` -> `${varStatus.first}`
    + `{{@last}}` -> `${varStatus.last}`

## Adding New Transforms
Transforms are added by creating a new `file.js` within the `./gulp-utils/statements/` folder with a dev-friendly name, regex expression for matching, and replacing function. The gulp setup will automatically get and use any `.js` files within that directory.

_Example file `var.js`:_
```node
// Utils
var gutil = require('gulp-util'), // Only necessary for logging
    input = gutil.colors.green, // Only necessary for logging
    output = gutil.colors.magenta; // Only necessary for logging

// Transform block
module.exports = {
  // Dev friendly name
  name: "{{var}}",
  // Regex for matching Handlebars expression
  regex: /(\{{2}(\w+[\w.\/]*)\}{2}|\{{2} ([\w.\/]*) \}{2})/,
  // Replace function
  // Uses match to log the output and returns the full input with the replaced expression
  replace: function replaceVar(match) { // Replace function, takes match and 
    var content = match[2] || match[3];
    gutil.log(input(match[0]), '->', output('${'+content+'}'));
    return match['input'].replace(match[0], '${'+content+'}');
  }
};
```