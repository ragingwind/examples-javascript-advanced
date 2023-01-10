'use strict';

console.log('-----------------------------------------------------------');
console.log('file: advanced/src/scope.js');
console.log('-----------------------------------------------------------');

console.log(`>> scope: the current 'context' of execution in which values and expressions are visible or can be referenced.`);
{
  var $x = 'global scope: x';

  function func() {
    var $x = 'function scope: x';
    console.log('func', $x);
  }

  func();

  console.log('reference to', $x);
}

console.log(`>> block and function scope`);
{
  console.log(`>> function scope': the scope created with a function declaration or function expression`);
  var $x = 'global function scope: x';

  if (true) {
    var $x = `local function scope: x`;
    let $y = `block scope: y`;

    console.log($x);
    console.log($y);
  }

  console.log('refer from ouside is', $x);

  for (var i = 0; i < 3; ++i) {
    console.log('function scope', i);
  }

  console.log('function scope is ', i);

  console.log(`>> 'block scope': the scope created with a pair of curly braces(a block))`);

  console.log('>> let: block scope');
  try {
    let $x = `global block scope: x`;

    if (true) {
      let $x = `local block scope: x`;
      console.log($x);
    }

    console.log($x);

    let $y = `global block scope: y`;
    for (let $y = 0; $y < 3; $y++) {
      console.log('block scope', $y);
    }

    console.log($y);
  } catch (e) {
    console.log(e);
  }

  console.log('>> const: a constant reference to a value, read-only');
  {
    const $c = 'global block scope: c';

    if (true) {
      const $c = 'local block scope: c';
      console.log($c);
    }

    console.log($c);
  }
}

console.log(`>> 'lexical(static) scope', determined by the location where a variable is declared within the source code, and nested functions have access to variables declared in their outer scope in 'lexical environment' (see closure.js)`);
{
  var $x = 'global scope: x';

  function $outer() {
    var $x = 'function scope: x';
    function $inner() {
      console.log($x, 'is referered from inner');
    }

    $inner();

    console.log(`>> 'scope chain': a chain of references to outer environments, the outermost being the global environment.`);
    // check inner().[[Scope]] in log, first $x in Closure in referered from inner(), 
    // then outer(), then global
    console.log(`[[Scopes]] : Scopes[3]
0: Closure(outer) { $x: 'function scope: x' }
1: Script { }
2: Global { $x: 'global scope: x' } `);
    console.dir($inner);
  }

  console.log($x, 'is referered from global');

  $outer();
}

console.log('>> scope types:')
{
  console.table([
    'global scope',
    'function scope, arrow function scope, async function scope',
    'block scope',
    'module scope',
    'class scope, private field scope, private method scope, private static field scope, private static method scope',
    'lexical scope',
    'dynamic scope',
    'eval scope',
    'with scope',
    'closure scope',
    'this scope, globalThis scope',
    'generator scope', 'async generator scope',
  ]);
}

console.log(`>> avoid to use global variables`)
{
  console.log(`>> prevent to global variable population`);
  (function () {
    var $x = 'local x';
    console.log($x, 'is referered from local');
  })();

  console.log('$x is undefined', typeof $x !== "undefined")

  console.log('> use global object')
  var $ = {};
  $.id = 'is property';
  console.log(`{ }.id`, $.id);

  console.log('> priavte member in function constructor');
  var Counter = (function (init) {
    var $count = init;

    return {
      inc() {
        return $count++;
      },
      dec() {
        return $count--;
      },
    };
  })(0);

  console.log('$count is', Counter.$count);
  console.log('increaing by inc()', Counter.inc());
  console.log('decreaing by inc()', Counter.dec());
}