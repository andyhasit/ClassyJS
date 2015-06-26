# ClassyJS
Brings classic OOP (with a hint of Python) to JavaScript.

ClassyJS provides two things which Javascript is sorely missing:

  1. A **class** construct.
  2. A decent **self** keyword.

--
It provides just one function called **cls()** which creates a class:

    Person = cls({
        __constructor__: function(name) {
    	    this.name = name;
    	},
    	speak: function(me, word) { 
            console.log(me.name + ' says ' + word);
    	}
    });
    person = Person('Andrew');
    person.speak('hello'); 
    >>> 'Andrew says hello'

Note the **me** parameter that is included in the above function definition, but not when calling the function.

##A decent **self** keyword
 

When those functions are called on the object, **me** resolves to **this** which makes it redundant in the above example, but is very useful for functions that contain nested functions. 

Consider this example of normal Javascript:

    Person.prototype.speakWords = function(arr) {
      
      //This works
      for (var i=0, l=arr.length; i < l; i++) {
        this.speak(arr[i]);
      }
      
      //This breaks
      $.each(arr, function(index, value) {
        this.speak(value);
      });
    }

Of course we all know the work around:

    Person.prototype.speakWords = function(arr) {    
      var that = this;
      $.each(arr, function(index, value) {
        that.speak(value);
      });
    }
    
But this is ugly and throws up decisions I shouldn't have to make: 
  * Do I rename all copies of **this** to **that** within the function or just those I need?
  * Do I add **var that = this** to every function, or just those that have nested functions? 

With ClassyJs we don't have to make those choices:

    Person = cls({
        //Same as before
        ...
    	speakWords: function(me, arr) { 
            $.each(arr, function(index, value) {
                me.speak(value);
            });
    	}
    });
    
Note that we still rely on **this** behind the scenes, so doing this won't work:


    fn = person.speak;
    fn.call('hello');

The only way to avoid that in Javascript would be to bind a copy of the function to each instance, which consumes more memory if you make a lot of them.

ClassyJs doesn't do that, it creates proptypes in the background, so you need to remember not to call functions that way (like ordinary JS).

##Inheritance
    
Inheritance and overriding are easy and intuitive. This snippet shows the full features of **cls**:


    Person = cls({
    	__constructor__: function(name) {   //This function will be used as constructor
    	  this.name = name;
    	  this.someVar = 0;                 //Instance variables are created here & set to a sensible default.
    	},
    	speak: function(me, word) {         //This is an instance method, note the extra 'me' parameter
          console.log(me.name + ' says ' + word);
    	},
    	shout: function(me, word) {         //All properties become instance methods unless they start and end in "__"
          console.log(me.name + ' shouts ' + word);
    	}
    });
    
    AngryPerson = cls({
    	__constructor__: function(name) {   
    	  this.name = name;               
    	},
    	__inherits__: Person,               //Tell the class to inherit from Person
    	speak: function(me, word) {         //This overrides the parent
          console.log(me.name + ' yells ' + word);
    	}
    });
    
    person = Person('Howard');                   //Instances are created without using 'new'
    person.speak('hello');                       //Call this funtion with one param, not two.           
    //>> 'Howard says hello'                //The 'me' parameter resolves to 'this'  :)
    
    angry = AngryPerson('Andrew');
    angry.shout('goodbye');
    //>> 'Andrew shouts goodbye'            //Calls the inherted function
    angry.speak('hello');
    //>> 'Andrew yells hello'               //Calls the overriden function

##How to use it

Just copy the source somewhere in your project, it's only 28 lines long!

