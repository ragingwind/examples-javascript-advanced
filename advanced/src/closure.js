'use strict';

console.log('-----------------------------------------------------------');
console.log('file: advanced/src/closure.js');
console.log('-----------------------------------------------------------');

console.log(`>> closure:
  - function that has access to its outer function's variables
  - combination of a function and the 'lexical environment' within which that 'function was declared'`);
{
  const x = 'global scope: x';

  // Variable scope, closure: https://javascript.info/closure
  function outer() {
    const x = 'block scope: x';
    return function () {
      // remembers its outer variables using hidden [[Environment]] property,
      // and then their code can access outer variables.
      // debugger; // check [Scope] in DevTools
      console.log('>>> set F.[[Environment]] to environment in which F was created');
      console.log(x);
    }
  }

  console.log('>>> outer return closure and pop its execution context');
  const closure = outer();

  console.log(new closure())

  closure();
  console.log('>>> outer environment referred by closure is popped from execution context stack');
}

console.log(`>> closure for hiding state`);
{
  function makeCounter(highOrderFunction) {
    let counter = 0;

    return function () {
      counter = highOrderFunction(counter);
      return counter;
    }
  }

  function increase(counter) {
    return ++counter;
  }

  function decrease(counter) {
    return --counter;
  }

  const increaseCounter = makeCounter(increase);
  const decreaseCounter = makeCounter(decrease);

  console.log(increaseCounter());
  console.log(increaseCounter());
  console.log(decreaseCounter());
  console.log(decreaseCounter());
}

console.log(`>> closure for private members`);
{
  const Person = (function () {
    const _ages = new WeakMap();

    function Person(name, age) {
      this.name = name; // public
      _ages.set(this, age);

      // instance method, will be created every time
      this.getAgePerFn = function () {
        return _ages.get(this);
      };
    }

    Person.prototype.getAge = function () {
      return _ages.get(this);
    };

    return Person;
  })();

  const me = new Person('Moon', 20);
  console.log(me.getAgePerFn())
  console.log(me.getAgePerFn() === 20, 'should return 20');
  console.log(me.getAge() === 20, 'should return 20');

  const me2 = new Person('Moon', 30);
  console.log(me2.getAgePerFn() === 30, 'should return 30');
  console.log(me2.getAge() === 30, 'should return 30');
}

console.log(`>> private field with class`);
{
  class Person {
    #age = 0;
    name = '';

    constructor(name, age) {
      this.#age = age; // private
      this.name = name; // public
    }

    getAge() {
      return this.#age;
    }
  }

  const me = new Person('Moon', 20);
  console.log(me.getAge() === 20, 'should return 20');

  const me2 = new Person('Moon', 30);
  console.log(me2.getAge() === 30, 'should return 30');
}

console.log(`>> mistakes in using closure`);
{
  {
    var func = [];
    for (var i = 0; i < 3; i++) {
      // var i is global variable
      func[i] = function () {
        return i; // refer to same global scoped i after increased 3
      };
    }

    console.log(func.map((f) => f()).join(', '));
  }

  {
    var func = [];
    for (let i = 0; i < 3; i++) {
      // i is block scoped variable
      func[i] = function () {
        return i;
      };
    }

    console.log(func.map((f) => f()).join(', '));
  }

  {
    var func = [];
    for (var i = 0; i < 3; i++) {
      func[i] = (function (id) {
        // create new scope for each iteration with argument
        return function () {
          return id;
        };
      })(i);
    }

    console.log(func.map((f) => f()).join(', '));
  }
}
