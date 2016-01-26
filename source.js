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
  Template.prototype.__init__ = function() {
    c.log('init');
    c.log(this);
    c.log(arguments[0]);
    return definition.__constructor__.apply(this, modifyArgs(this, arguments));
  };
  if (definition.hasOwnProperty('__inherits__')) {
    var parentDefinition = new definition.__inherits__;
    Template.prototype = parentDefinition;
    //Template.prototype.__super__ = parentDefinition;
    var __super__ = {};
    for(prop in parentDefinition) {
      __super__[prop] = parentDefinition[prop];
    }
    //c.log(__super__);
    //__super__.constructor = parentDefinition.__init__;
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
