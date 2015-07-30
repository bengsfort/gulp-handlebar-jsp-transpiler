module.exports = [
  {
    name: "var",
    regex: /(\{{2}([\w.\/]*)\}{2}|\{{2} ([\w.\/]*) \}{2})/,
    replace: function replaceVar(match) {
      var content = match[2] || match[3];
      console.log(match[0], '->', '${'+content+'}');
      return match['input'].replace(match[0], '${'+content+'}');
    }
  },
  {
    name: "if",
    regex: /(\{{2}\#if ([\w.\/\=\!\-\+\%\| \'\"\>\<]*)\}{2})/,
    replace: function replaceIf(match) {
      var test = match[2];
      console.log(match[0], '->', '<c:if test="${'+test+'}">');
      return match['input'].replace(match[0], '<c:if test="${'+test+'}">');
    }
  },
  {
    name: "/if",
    regex: /(\{{2}\/if\}{2})/,
    replace: function replaceEndIf(match) {
      console.log('{{/if}}', '->', '</c:if>');
      return match['input'].replace(match[0], "</c:if>");
    }
  }
];