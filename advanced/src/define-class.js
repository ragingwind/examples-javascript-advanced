'use strict';

function defineClass({
  name,
  ctor,
  parent,
  props,
  statics
}) {
  // create a function constructor
  const constructor = ctor || function Class() { };

  // @TODO create a prototype and constructor somehow way

  // create a prototype object with parent or object
  const prototype = Object.create(parent?.prototype || Object.prototype, {
    constructor: {
      value: constructor,
      enumerable: false,
      writable: true
    }
  });
  // or const prototype = parent ? new parent() : new Object();

  // bind current methods to prototype
  for (const [name, prop] of Object.entries(props ?? {})) {
    prototype[name] = prop;
  }

  // bind static to constructor
  for (const [name, prop] of Object.entries(statics ?? {})) {
    constructor[name] = prop;
  }

  // bind parent prototype to constrcutor function
  constructor.prototype = prototype;

  return constructor;
}

console.log('>> Base');

const Base = defineClass({
  name: 'Base',
  parent: null,
  props: {
    getName() {
      return 'Base.getName()';
    }
  },
  statics: {
    staticMethod: function staticMethod() { }
  }
});

console.dir(Base)
console.log('Base.prototype', Base.prototype, Base.prototype.__proto__ === Object.prototype);

const base = new Base();
console.dir(base);
console.log('base', base, base.__proto__, base.__proto__ === Base.prototype);;

console.log('>> Derived');

const Derived = defineClass({
  name: 'Derived',
  ctor: function Derived() { },
  parent: Base,
  props: {
    getName() {
      return 'Derived.getName()';
    },
    getNameDerived: function getNameDerived() {
      return 'Derived.getNameDerived()';
    }
  },
  statics: {
    staticMethod: function staticMethod() {
      return 'static Derived.staticMethod()';
    }
  }
});

console.dir(Derived);

const d = new Derived();

console.dir(d);
console.log('d.__proto__ == Derived.prototype', d.__proto__ == Derived.prototype);
console.log('d.__proto__.__proto__ == Base.prototype', d.__proto__.__proto__ == Base.prototype);
console.log('d.getName()', d.getName())
console.log('d.getNameDerived()', d.getNameDerived())
console.log('Derived.staticMethod()', Derived.staticMethod())

{
  function extend(target, objects) { // eslint-disable-line no-unused-vars
    var hasOwnProp = Object.prototype.hasOwnProperty;
    var source, prop, i, len;

    for (i = 1, len = arguments.length; i < len; i += 1) {
      source = arguments[i];
      console.log('source', source)
      for (prop in source) {
        console.log('prop', hasOwnProp.call(source, prop))
        // keep only props that are not inherited
        if (hasOwnProp.call(source, prop)) {
          target[prop] = source[prop];
        }
      }
    }

    return target;
  }

  function createPrototype(obj) {
    // function F() { }

    // F.prototype = obj;

    // return new F();

    return Object.create(obj);
  }

  function inherit(subType, superType) {
    var prototype = createPrototype(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
  }

  function defineClass(parent, props) {
    var ctor;

    if (!props) {
      props = parent;
      parent = null;
    }

    ctor = props.init || function () { };

    if (parent) {
      inherit(ctor, parent);
    }

    // if (props.hasOwnProperty('static')) {
    //   extend(ctor, props['static']);
    //   delete props['static'];
    // }

    extend(ctor.prototype, props);

    return ctor;
  }

  const Base = defineClass({
    init: function () {
      this.name = 'made by def';
    },
    method: function () {
      return 'Base.method()';
    },
    static: {
      staticMethod: function () {
        return 'Base.staticMethod()';
      }
    }
  });

  // console.dir(Base);
  // console.log(Base.prototype);

  const base = new Base();
  // console.log(base, base.__proto__);

  const Derived = defineClass(Base, {
    method2: function () {
      return 'Derived.method()';
    }
  });

  // console.dir(Derived);
  console.log(Derived.prototype);

  const d = new Derived();
  // console.log(d, d.__proto__);
}