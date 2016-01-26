function cls(definition) {
  function modifyArgs(scope, args) {
    var newArgs = [scope];
    for (var i = 0, j = args.length; i < j; i++){
      newArgs.push(args[i]);
    }
    return newArgs;
  }
  function Template() {
    return definition.__constructor__.apply(this, modifyArgs(this, arguments));
  }
  Template.prototype.toString = function() {
    return '<A ClassyJS object. Try setting a toString(me) function in the class definition.>';
  };
  if (definition.hasOwnProperty('__inherits__')) {
    Template.prototype = new definition['__inherits__'];
  }
  for (var property in definition) {
    if ((definition.hasOwnProperty(property)) && !(/^__.*__/.exec(property))) {
      var fn = definition[property];
      Template.prototype[property] = (function (fn) { 
        return function() {
          return fn.apply(this, modifyArgs(this, arguments));
        }
      })(fn);
    }
  }
  return Template;
};
