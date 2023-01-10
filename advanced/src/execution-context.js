'use strict';

console.log('-----------------------------------------------------------');
console.log('file: advanced/src/execution-context.js');
console.log('-----------------------------------------------------------');

console.log(`>> execution context: 
  - the environment in which the current code is being executed
  - created when evaluated and executed within its code
  - the execution context is created in two phases:
    - creation(evalution) phase:
      - creation of the variable object
      - creation of the scope chain
      - determine the value of the 'this' keyword
    - execution phase:
      - code of the function that generated the current execution context is run line by line
      - the 'this' keyword is bound to the current execution context
      - scope chain is used to look up variables in local, then outer scopes
  `);
{
  console.log(`>> execution types:`);
  console.table([
    'global execution context',
    'function execution context',
    'eval execution context',
    'module execution context',
    'block execution context',
    'generator execution context',
    'async execution context',
    'async generator execution context'
  ]);
}


console.log(`>> execution context steps while evaluation and execution source code`);
{
  // Execution Contexts: https://262.ecma-international.org/5.1/#sec-10.3
  console.log(`>>> create execution context, the top context of the stack is running execution context`);
  var execution_context_stack = [];

  // The Global Environment: https://262.ecma-international.org/5.1/#sec-10.2.3
  console.log(`>>> unique lexical environment which is created before any code is executed`);
  var global_execution_context = {
    lexical_environment: {
      environment_record: {
        // Declarative Environment Records: https://262.ecma-international.org/5.1/#sec-10.2.1.1
        // binds the set of identifiers defined by the declarations contained within its scope.
        // const, let
        declarative_environment_record: {
          $y: '<uninitialized>'
        },
        // Object Environment Records: https://262.ecma-international.org/5.1/#sec-10.2.1.2
        // binds the set of identifier names that directly correspond to the property 
        // names of its binding object. var, function
        object_environment_record: {
          // can be used to store the global object without identifier like `window`
          // window.alert === alert
          binding_object: {
            $x: undefined,
            do_loop: '<function object>'
          } // in browser, binding_object is window
        },
        // bind [[GlobalThisValue]] to binding_object (global object)
        '[[GlobalThisValue]]': 'this'
      },
      // the reference is used to model the logical nesting of lexical environment values. 
      outer_environment: null,
    }
  };

  console.log(`>>> push global execution context to execution context stack`);
  execution_context_stack.push(global_execution_context);

  console.log(`>>> start code evaluating of global`);
  console.log(`>>> bind $x with undefined to object_environment_record`);
  var $x;

  console.log(`>>> bind $y without value to declarative_environment_record`);
  let $y = 'global block scope: y';
  global_execution_context.lexical_environment.environment_record.declarative_environment_record.$y = $y;

  console.log(`>>> bind do_loop function object to object_environment_record`);
  function do_loop() {
    console.log(`>>>> start code evaluating of function do_loop`);

    console.log(`>>>> create execution context and lexical environment for do_loop`);

    console.log(`>>>> create new function environment record
      - create function envrionment record
      - bind this
      - set outer environment reference
    `);

    // execution_context for do_loop
    // when an execution context is created its two of enviroments initially have 'the same value'
    // lexical environment and variable environment are what keep track of variables during runtime 
    // and correspond to block scope and function/module/global scope respectively
    const execution_context = {
      // resolve identifier references made by code within this execution context
      lexical_environment: {
        // may change during execution of code within an execution context
        environment_record: {
          $b: undefined,
          '[[ThisValue]]': 'this'
        },
        outer_environment: () => execution_context.varibale_environment
      },
      // holds bindings created by VariableStatements and FunctionDeclarations within this execution. 
      varibale_environment: {
        outer_environment: global_execution_context.lexical_environment
      }
    };

    execution_context_stack.push(execution_context);

    var $a = 'function scope: a';
    execution_context.varibale_environment.outer_environment.environment_record.object_environment_record.$a = $a;

    let $b = 'block scope: b';
    execution_context.lexical_environment.environment_record.$b = $b;

    while (true) {
      const previous_execution_context = execution_context_stack[execution_context_stack.length - 1];

      // execution_context for while block scope
      const execution_context = {
        lexical_environment: {
          // change environment record for while loop
          environment_record: {
            $d: '<uninitialized>',
            '[[ThisValue]]': 'this'
          },
          outer_environment: previous_execution_context.lexical_environment
        },
        // the value never changes during execution of code within an execution context
        varibale_environment: {
          outer_environment: global_execution_context.lexical_environment
        }
      };

      console.log(`<<< refer outer environment`, execution_context.lexical_environment.outer_environment);

      execution_context_stack.push(execution_context);


      var $c = 'function scope: c';
      execution_context.varibale_environment.outer_environment.environment_record.object_environment_record.$c = $c;

      let $d = 'block scope: d';
      execution_context.lexical_environment.environment_record.$d = $d;

      console.log($b);

      execution_context_stack.pop();
      break;
    }

    console.log('>>>> restore execution context and lexical environment for do_loop');
    console.log(JSON.stringify(execution_context_stack.pop(), null, 2));

    console.log('>>> global execution context');
    console.log(JSON.stringify(global_execution_context, null, 2));
  }

  console.log(`>>> execution global code`);
  console.log(`>>> assign value to $x`);
  $x = `global scope: x`;

  console.log(`>>> assign value to $y`);
  $y = `global block scope: y`;

  console.log(`>>> call do_loop function`);
  do_loop();
}
