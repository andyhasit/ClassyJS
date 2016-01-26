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
        var args = [];
        for (var i = 1, j = arguments.length; i < j; i++){
          args.push(arguments[i]);
        }
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
    /*
    Option 1:
      allows me to call me.__super__.constructor()
      calling me.__super.foo() will fail if foo is defined on parent as well as overriden.
    
    
    Template.prototype.__super__ = {
      //constructor: function(){ parentDefinition.apply(this)}
      __init__: function(){
          c.log(this);
          parentDefinition.constructor.apply(this, modifyArgs(it, arguments))
      }
    };
    for(prop in parentDefinition) {
      //c.log(prop);
      Template.prototype.__super__[prop] = prop;
    }
    */
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
