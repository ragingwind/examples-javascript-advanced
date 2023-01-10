'use strict';

console.log('-----------------------------------------------------------');;
console.log('file: advanced/src/prototype.js');;
console.log('-----------------------------------------------------------');;

console.log(`>> __proto__ and prototype`);
{
  console.log(`__proto__`);
  
  const obj = {
    name: 'obj'
  };

  console.log(`  - is in the Object.prototype`, obj.hasOwnProperty('__proto__'), Object.getOwnPropertyDescriptor(Object.prototype, '__proto__')); 
  console.log(`  - references to its prototype, accessor for obj.[[Prototype]]`, obj.__proto__);
  console.log(`  - can be used __proto__ to access the prototype`, obj.__proto__ === Object.prototype);
  console.log(`  - is equal to Object.getPrototypeOf(obj)`, obj.__proto__ === Object.getPrototypeOf(obj));

  function Base() {
    this.name = 'base';
  }

  const base = Object.create(Base.prototype);
  
  console.log(`  - is used in the lookup chain to resolve methods`, base.__proto__.__proto__ === Object.prototype);

  console.log(`prototype`);

  console.log(`  - constructor function can own a prototype object`, Base.hasOwnProperty('prototype'), Object.getOwnPropertyDescriptor(Base, 'prototype'), {}.hasOwnProperty('prototype'), Object.getOwnPropertyDescriptor({}, 'prototype'));
  console.log(`  - constructor function prototype and base.__proto__ reference same prototype`, Base.prototype === base.__proto__);
  console.log(`  - prototype has constructor, can be inheritaed to object`, Base.prototype.constructor == base.constructor);
  console.log(`  - is instance of parent object,`, Base.prototype, Base.prototype instanceof Object);

  // console.log(`Base.prototype has 
  // - constructor: class Base, // class only, points to Base's constructor function, can be called with 'new'
  // - [[Prototype]]: Object, // points to the Object.prototype, can refer with __proto__
  // - baseMethod: ƒ baseMethod(), Base's methods defined in Base class`, Base.prototype, Base.prototype.constructor.name === 'Base', Base.prototype.__proto__, Base.prototype.baseMethod);


  // - is created as evaluated in the class definition
  
  // - is shared by all instances
  // - inherits its properties and methods to the child
  // - constructor points to its constructor function
  // - has all of methods are defined in child and parent`;

}

// Inheritance and the prototype chain - JavaScript | MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
console.log(`>> prototype with class`);
{
  class Base {
    constructor(name) {
      this.name = name;
    }

    baseMethod() {
      return 'baseMethod()';
    }
  };
  
  const base = new Base();

  console.log(`type of Base is a function. it's syntantic sugar`, typeof Base === 'function');

  console.log(`Base.prototype
  - is created as evaluated in the class definition
  - is shared by all instances of the class
  - inherits its properties and methods to the derived class
  - constructor points to its constructor function
  - has all of methods are defined in child and parent`,
  Base.prototype, typeof Base.prototype === 'object');

  const derived = Object.create(Base.prototype, {
    derivedMethod: {
      value: function derivedMethod() {
        return 'derivedMethod()';
      },
      enumerable: false,
      writable: true,
      configurable: true,
    }
  });

  console.log(`Base.prototype inherits its properties and methods to the derived class
  `, derived, derived.derivedMethod());

  console.log(`Base.prototype has 
  - constructor: class Base, // class only, points to Base's constructor function, can be called with 'new'
  - [[Prototype]]: Object, // points to the Object.prototype, can refer with __proto__
  - baseMethod: ƒ baseMethod(), Base's methods defined in Base class`, Base.prototype, Base.prototype.constructor.name === 'Base', Base.prototype.__proto__, Base.prototype.baseMethod);

  console.log(`Base.[[Prototype]]
  - is a function
  - is designed to be used to create base.__proto__ in a new Base()`
    , Base.__proto__, typeof Base.__proto__ === 'function');

  console.log(`base.__proto__
  - references to Base.prototype
  - accessor for base.[[Prototype]]
  - is used in the lookup chain to resolve methods, base.__proto__.__proto__ points to Object.prototype
  - can be accessed Object.getPrototypeOf(obj)`
    , base.__proto__ === Base.prototype, base.__proto__.__proto__ === Object.prototype, Object.getPrototypeOf(base) === base.__proto__);

  class Derived extends Base {
    constructor() {
      super();
    }

    derivedMethods() {
      return 'derivedMethods()';
    }
  }

  console.log(`Derived.prototype has 
  - constructor: class Derived, // points to Derived's constructor function, can be called with 'new'
  - [[Prototype]]: Object, // points to the Object.prototype, can refer with __proto__
  - baseMethod: ƒ baseMethod(), Base's methods defined in Derived class
  - derivedMethods: ƒ derivedMethods(), Derived's methods defined in Derived class
  `, Derived.prototype, Derived.prototype.constructor.name === 'Derived', Derived.prototype.__proto__,
    Derived.prototype.baseMethod, Derived.prototype.derivedMethods);
}

// [[Caller]]
// [[Construct]]
// new.target
    
// function readonlyMember() {
//   return function (options) {
//     this.options = options;
//     Object.freeze(this.options);
//   }
// }

// try {
//   const PrivateMemberConstructor = readonlyMember();

//   const pm = new PrivateMemberConstructor({ name: 'privateMember' });
//   // TypeError: Cannot assign to read only property 'name' of object '#<Object>'
//   pm.options.name = 'updateMember';
//   console.log(pm.options.name, pm.options.name === 'new');
// } catch (error) {
//   console.log(error);
// }
