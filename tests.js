
/*

Create full tests. do a speed test with 1000s of items, on instantiation and on method calls.

*/

c = console; 
function prnt(desc, obj) {
  console.log(desc + ': ' + obj);
}

describe('ClassyJS', function() {
  
  it('objects are created with correct properties', function() {
    Person = cls({
      __constructor__: function(me, firstname, lastname, age) {
        prnt('me', me);
        prnt('firstname', firstname);
        me.firstname = firstname;
        me.lastname = lastname;
        me.age = age;
      },
      getDetailsString: function(me) {
        return me.firstname + ' ' + me.lastname + ' ' + me.age;
      }
    });
    person = new Person('Mickey', 'Mouse', 100);
    
    expect(person.age).toEqual(100);
    expect(person.firstname).toEqual('Mickey');
    expect(person.lastname).toEqual('Mouse');
    expect(person.getDetailsString()).toEqual('Mickey Mouse 100');
  });
  
  
});
