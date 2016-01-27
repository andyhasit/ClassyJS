function cls(definition) {
  function modifyArgs(scope, args) {
    var newArgs = [scope];
    for (var i = 0, j = args.length; i < j; i++){
      newArgs.push(args[i]);
    }
    return newArgs;
  }
  function Template() {
    return definition.__init__.apply(this, modifyArgs(this, arguments));
  }
  Template.prototype.toString = function() {
    return '<A ClassyJS object. Try setting a toString(me) function in the class definition.>';
  };
  if (definition.hasOwnProperty('__inherits__')) {
    var parentDefinition = new definition.__inherits__;
    Template.prototype = parentDefinition;
    var __super__ = {};
    for(prop in parentDefinition) {
      __super__[prop] = function() {
        var me = arguments[0];
        //c.log(prop);
        //c.log(''+ arguments[0]);
        var args = [];
        for (var i = 1, j = arguments.length; i < j; i++){
          args.push(arguments[i]);
        }
        //c.log(args);
        //FIX: this causes stackoverflow when child has same name as parent
        return parentDefinition[prop].apply(me, args);
      }
    }
    __super__.__init__ = function(){
      var me = arguments[0];
      var args = [];
      for (var i = 1, j = arguments.length; i < j; i++){
        args.push(arguments[i]);
      }
      return parentDefinition.constructor.apply(me, args);
    }
    Template.prototype.__super__ = __super__;
  }
  for (var property in definition) {
    if ((definition.hasOwnProperty(property)) && !(/^__.*__/.exec(property))) {
      var fn = definition[property];
      Template.prototype[property] = function () {
        return fn.apply(this, modifyArgs(this, arguments));
      };
    }
  }
  return Template;
};
