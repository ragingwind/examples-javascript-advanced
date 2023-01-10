'use strict';

console.log('-----------------------------------------------------------');;
console.log('file: advanced/src/class.js');;
console.log('-----------------------------------------------------------');;

console.log(`>> class:;
  - syntactic sugar for the prototype pattern
  - must be using 'new' keyword to create an instance
  - inheritance with extends, different from prototype based inheritance
  - super() to call the parent constructor
  - hoisting is not supported
  - executing in strict mode
  - no [[Enumerable]] methods (constructor, prototype, static)`);
{
  class Base {
    do() {
      return 'Base.do()';
    }
  }

  class Derived extends Base {
    do() {
      return 'Derived.do()';
    }
  }

  const base = new Base();
  const derived = new Derived();

  console.log(`class is a function`, typeof Base === 'function');
  console.log(`Object.constructor and prototype methods in Object.prototype`, Base.prototype);
  console.log(`object.__proto__ is built from Object.prototype`, base.__proto__ === Base.prototype);
  console.log(`Object.prototype.* can be used in the lookup chain to resolve methods`, Base.prototype.do === base.do, Base.prototype.do.apply(null), base.do());
  console.log('inheritance', derived instanceof Base, derived instanceof Derived);
}

// @TODO
// class exmaples
{
  class Person {
    #name = '';

    constructor(name) {
      this.#name = name;
      this.publicName = name;
    }

    say() {
      return this.#name;
    }

    get name() {
      return this.name;
    }

    set name(name) {
      this.name = name;
    }
  }

  const me = new Person('Lee');
  console.log(me.say());

  console.log(Object.getPrototypeOf(me) === Person.prototype);
  console.log(me instanceof Person);
  console.log(
    Object.getPrototypeOf(Person.prototype) === Object.prototype
  );
  console.log(me instanceof Object);
  console.log(me.constructor === Person);
  console.log(Object.getOwnPropertyNames(me)); // [ 'publicName' ]
  console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(me))); // [constructor, say, myName]
}

// class inheritance pseudo code
{
  function Animal(name) {
    this.name = name;
  }

  Animal.prototype.eat = function () {
    console.log('eat');
  };

  Animal.prototype.move = function () {
    console.log('move');
  };

  function Dog() {
    Animal.apply(this, arguments);
  }

  Dog.prototype = Object.create(Animal.prototype);
  Dog.prototype.constructor = Dog;
  Dog.prototype.cry = function () {
    console.log('wal');
  };

  var dog = new Dog('don');
  console.log(Object.getPrototypeOf(dog) === Dog.prototype);
  console.log(Object.getPrototypeOf(dog.__proto__) === Animal.prototype);
  console.log(dog instanceof Dog);
  console.log(dog instanceof Animal);

  dog.eat();
  dog.move();
  dog.cry();
}
