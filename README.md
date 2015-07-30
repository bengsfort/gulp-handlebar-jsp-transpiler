# Gulp Handlebars -> JSP Transformer

A proof of concept Handlebars to JSP Transformer for those that aren't super stoked on the mighty behemoth that is the Wild West of JSP.

Obviously compilers/transformers should have their output checked, and this is meant to streamline the development process and give a potential for another front end option that's a little easier on the eyes than JSP (and brain), and give a starting point so JSP development is more along the polishing side.

## Completed Transforms

The current completed transforms are incredibly basic but a step in the right direction. Included in this are:
- {{user.name}} -> ${user.name}
- {{#if user}} {{/if}} -> <c:if test="${user}"> </c:if>

