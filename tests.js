
/*

Create full tests. do a speed test with 1000s of items, on instantiation and on method calls.

*/

c = console; 
function prnt(desc, obj) {
  console.log(desc + ': ' + obj);
}

describe('ClassyJS', function() {
  
  it('objects are created with correct properties', function() {
    var Person = cls({
      __constructor__: function(me, firstname, lastname, age) {
        me.firstname = firstname;
        me.lastname = lastname;
        me.age = age;
      },
      getDetailsString: function(me) {
        return me.firstname + ' ' + me.lastname + ' ' + me.age;
      }
    });
    var person = new Person('Mickey', 'Mouse', 100);
    
    expect(person.age).toEqual(100);
    expect(person.firstname).toEqual('Mickey');
    expect(person.lastname).toEqual('Mouse');
    expect(person.getDetailsString()).toEqual('Mickey Mouse 100');
  });
  
  it('method arguments are passed correctly.', function() {
    var Person = cls({
      __constructor__: function(me) {
      },
      returnStuff: function(me, x, y, z) {
        return [x, y, z];
      }
    });
    var person = new Person();
    var result = person.returnStuff(34, 78);
    expect(result[0]).toEqual(34);
    expect(result[1]).toEqual(78);
    expect(result[2]).toEqual(undefined);
  });
  
  it('subclass inherits methods, and parameters are passed correctly.', function() {
    var Person = cls({
      __constructor__: function(me) {
      },
      returnStuff: function(me, x, y, z) {
        return [x, y, z];
      }
    });
    
    var SpecialPerson = cls({
      __constructor__: function(me) {
      },
      __inherits__: Person
    });
    
    var person = new SpecialPerson();
    var result = person.returnStuff(34, 78);
    expect(result[0]).toEqual(34);
    expect(result[1]).toEqual(78);
    expect(result[2]).toEqual(undefined);
  });
  
  it('subclass can access parent method directly', function() {
    var Parent = cls({
      __constructor__: function(me) {
      },
      parentFoo: function(me, x, y) {
        return x + y;
      }
    });
    
    var Child = cls({
      __constructor__: function(me) {
      },
      __inherits__: Parent,
      childFoo: function(me, x, y) {
        return me.parentFoo(x, y);
      }
    });
    
    var child = new Child();
    expect(child.childFoo(6, 10)).toEqual(16);
  });
  
    it('parent method accessed directly refer to the correct me', function() {
    var Parent = cls({
      __constructor__: function(me) {
        me.start = 100;
      },
      parentFoo: function(me, x, y) {
        c.log('foo');
        return me.start + x + y;
      }
    });
    
    var Child = cls({
      __constructor__: function(me) {
        me.start = 200;
      },
      __inherits__: Parent,
      childFoo: function(me, x, y) {
        return me.parentFoo(x, y);
      }
    });
    
    var child = new Child();
    expect(child.childFoo(6, 10)).toEqual(216);
  });
  
  it('subclass can access parent method via __super__', function() {
    var Parent = cls({
      __constructor__: function(me) {
      },
      foo: function(me, x, y) {
        c.log('foo');
        return x + y;
      }
    });
    
    var Child = cls({
      __inherits__: Parent,
      __constructor__: function(me) {
      },
      bar: function(me, x, y) {
        return me.__super__.foo(x, y);
      }
    });
    var child = new Child();
    expect(child.bar(6, 10)).toEqual(16);
  });
  
  it('method called via __super__ refers to correct me', function() {
    var Parent = cls({
      __constructor__: function(me) {
        me.start = 100;
      },
      foo: function(me, x, y) {
        c.log('foo');
        return me.start + x + y;
      }
    });
    
    var Child = cls({
      __inherits__: Parent,
      __constructor__: function(me) {
        me.start = 200;
      },
      bar: function(me, x, y) {
        return me.__super__.foo(x, y);
      }
    });
    var child = new Child();
    expect(child.bar(6, 10)).toEqual(216);
  });
    
  it("subclass method override doesn't affect parent method", function() {
    var Parent = cls({
      __constructor__: function(me) {
      },
      foo: function(me) {
        return 'parent stuff';
      }
    });
    
    var Child = cls({
      __constructor__: function(me) {
      },
      __inherits__: Parent,
      foo: function(me) {
        return 'child stuff';
      }
    });
    
    var parent = new Parent();
    var child = new Child();
    expect(child.foo()).toEqual('child stuff');
    expect(parent.foo()).toEqual('parent stuff');
  });
  
  it('subclass can access parent constructor', function() {
    var Parent = cls({
      __constructor__: function(me, name) {
        me.name = name;
        c.log('Called Parent with ' + name);
      },
      sayHi: function(me) {
        c.log('hi');
      }
    });
    
    var Child = cls({
      __inherits__: Parent,
      __constructor__: function(me, firstname, lastname) {
        me.firstname = firstname;
        me.lastname = lastname;
        me.__super__.__init__(firstname + ' ' + lastname);
      },
    });
    
    var child = new Child('Mickey', 'Mouse');
    expect(child.name).toEqual('Mickey Mouse');
  });
  
  it('subclass can access overriden parent method.', function() {
    var Parent = cls({
      __constructor__: function(me) {
      },
      foo: function(me) {
        return 'parent stuff';
      }
    });
    
    var Child = cls({
      __constructor__: function(me) {
      },
      __inherits__: Parent,
      foo: function(me) {
        return 'child stuff ' + me.__super__.foo();
      }
    });
    
    var parent = new Parent();
    var child = new Child();
    expect(child.foo()).toEqual('child stuff parent stuff');
    expect(parent.foo()).toEqual('parent stuff');
  });
  
  /*
  
  
  */
  
  
});
