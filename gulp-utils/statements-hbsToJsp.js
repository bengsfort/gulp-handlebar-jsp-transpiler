module.exports = [
  {
    name: "{{var}}",
    regex: /(\{{2}(\w+[\w.\/]*)\}{2}|\{{2} ([\w.\/]*) \}{2})/,
    replace: function replaceVar(match) {
      var content = match[2] || match[3];
      console.log(match[0], '->', '${'+content+'}');
      return match['input'].replace(match[0], '${'+content+'}');
    }
  },
  {
    name: "{{#if test}}",
    regex: /(\{{2}\#if ([\w.\/\=\!\-\+\%\| \'\"\>\<]*)\}{2})/,
    replace: function replaceIf(match) {
      var content = match[2];
      console.log(match[0], '->', '<c:if test="${'+content+'}">');
      return match['input'].replace(match[0], '<c:if test="${'+content+'}">');
    }
  },
  {
    name: "{{/if}}",
    regex: /(\{{2}\/if\}{2})/,
    replace: function replaceEndIf(match) {
      console.log('{{/if}}', '->', '</c:if>');
      return match['input'].replace(match[0], "</c:if>");
    }
  },
  {
    name: "{{#unless test}}",
    regex: /(\{{2}\#unless ([\w.\/\=\!\-\+\%\| \'\"\>\<]*)\}{2})/,
    replace: function replaceElse(match) {
      var content = match[2];
      console.log(match[0], '->', '<c:if test="${!'+content+'}">');
      return match['input'].replace(match[0], '<c:if test="${!'+content+'}">');
    }
  },
  {
    name: "{{/unless}}",
    regex: /(\{{2}\/unless\}{2})/,
    replace: function replaceEndIf(match) {
      console.log('{{/unless}}', '->', '</c:if>');
      return match['input'].replace(match[0], "</c:if>");
    }
  },
];