# Gulp [Handlebars -> JSP Transformer](http://tehurn.com/)
A proof of concept [Handlebars](//handlebarsjs.com) to [JSP](http://www.nooooooooooooooo.com/) Transformer for those that aren't super stoked on the mighty behemoth that is the Wild West of JSP.

Obviously compilers/transformers should have their output checked, and this is meant to streamline the development process and give a potential for another front end option that's a little easier on the eyes than JSP (and brain), and give a starting point so JSP development is more along the polishing side.

## Installation
Just `git clone` the repo and `npm install` it up.

## Commands
- `gulp handlebars`: Compile Handlebars files to `/build/html/**.html`.
- `gulp jsp-compile`: Compile Handlebars files to `/build/jsp/**.jsp`.

## Completed Transforms
The current completed transforms are incredibly basic but a step in the right direction. Included in this are:
- `{{user.name}}` -> `${user.name}`
- `{{#if user}} {{/if}}` -> `<c:if test="${user}"> </c:if>`

