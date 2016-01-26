function cls(definition) {
  function Template() {
    var args = [this];
    for (var arg in arguments){
      args.push(arguments[arg]);
    }
    return definition.__constructor__.apply(this, args);
  }
  if (definition.hasOwnProperty('__inherits__')) {
    Template.prototype = new definition['__inherits__'];
  }
  for (var property in definition) {
    if ((definition.hasOwnProperty(property)) && !(/^__.*__/.exec(property))) {
      var fn = definition[property];
      Template.prototype[property] = (function (fn) { 
        return function() {
          var args = [this];
          for (var arg in arguments){
            args.push(arguments[arg]);
          }
          fn.apply(this, args);
        }
      })(fn);
    }
  }
  return Template;
};
module.exports = cls;