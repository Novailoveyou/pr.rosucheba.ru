// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/regenerator-runtime/runtime.js":[function(require,module,exports) {
var define;
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

},{}],"../node_modules/@babel/runtime-corejs2/regenerator/index.js":[function(require,module,exports) {
module.exports = require("regenerator-runtime");

},{"regenerator-runtime":"../node_modules/regenerator-runtime/runtime.js"}],"../node_modules/core-js/library/modules/_core.js":[function(require,module,exports) {
var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],"../node_modules/core-js/library/fn/json/stringify.js":[function(require,module,exports) {
var core = require('../../modules/_core');
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};

},{"../../modules/_core":"../node_modules/core-js/library/modules/_core.js"}],"../node_modules/@babel/runtime-corejs2/core-js/json/stringify.js":[function(require,module,exports) {
module.exports = require("core-js/library/fn/json/stringify");
},{"core-js/library/fn/json/stringify":"../node_modules/core-js/library/fn/json/stringify.js"}],"../node_modules/core-js/library/modules/_global.js":[function(require,module,exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],"../node_modules/core-js/library/modules/_a-function.js":[function(require,module,exports) {
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],"../node_modules/core-js/library/modules/_ctx.js":[function(require,module,exports) {
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":"../node_modules/core-js/library/modules/_a-function.js"}],"../node_modules/core-js/library/modules/_is-object.js":[function(require,module,exports) {
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],"../node_modules/core-js/library/modules/_an-object.js":[function(require,module,exports) {
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":"../node_modules/core-js/library/modules/_is-object.js"}],"../node_modules/core-js/library/modules/_fails.js":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],"../node_modules/core-js/library/modules/_descriptors.js":[function(require,module,exports) {
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":"../node_modules/core-js/library/modules/_fails.js"}],"../node_modules/core-js/library/modules/_dom-create.js":[function(require,module,exports) {
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_is-object":"../node_modules/core-js/library/modules/_is-object.js","./_global":"../node_modules/core-js/library/modules/_global.js"}],"../node_modules/core-js/library/modules/_ie8-dom-define.js":[function(require,module,exports) {
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":"../node_modules/core-js/library/modules/_descriptors.js","./_fails":"../node_modules/core-js/library/modules/_fails.js","./_dom-create":"../node_modules/core-js/library/modules/_dom-create.js"}],"../node_modules/core-js/library/modules/_to-primitive.js":[function(require,module,exports) {
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":"../node_modules/core-js/library/modules/_is-object.js"}],"../node_modules/core-js/library/modules/_object-dp.js":[function(require,module,exports) {
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":"../node_modules/core-js/library/modules/_an-object.js","./_ie8-dom-define":"../node_modules/core-js/library/modules/_ie8-dom-define.js","./_to-primitive":"../node_modules/core-js/library/modules/_to-primitive.js","./_descriptors":"../node_modules/core-js/library/modules/_descriptors.js"}],"../node_modules/core-js/library/modules/_property-desc.js":[function(require,module,exports) {
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],"../node_modules/core-js/library/modules/_hide.js":[function(require,module,exports) {
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_object-dp":"../node_modules/core-js/library/modules/_object-dp.js","./_property-desc":"../node_modules/core-js/library/modules/_property-desc.js","./_descriptors":"../node_modules/core-js/library/modules/_descriptors.js"}],"../node_modules/core-js/library/modules/_has.js":[function(require,module,exports) {
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],"../node_modules/core-js/library/modules/_export.js":[function(require,module,exports) {

var global = require('./_global');
var core = require('./_core');
var ctx = require('./_ctx');
var hide = require('./_hide');
var has = require('./_has');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_global":"../node_modules/core-js/library/modules/_global.js","./_core":"../node_modules/core-js/library/modules/_core.js","./_ctx":"../node_modules/core-js/library/modules/_ctx.js","./_hide":"../node_modules/core-js/library/modules/_hide.js","./_has":"../node_modules/core-js/library/modules/_has.js"}],"../node_modules/core-js/library/modules/es6.date.now.js":[function(require,module,exports) {
// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = require('./_export');

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });

},{"./_export":"../node_modules/core-js/library/modules/_export.js"}],"../node_modules/core-js/library/fn/date/now.js":[function(require,module,exports) {
require('../../modules/es6.date.now');
module.exports = require('../../modules/_core').Date.now;

},{"../../modules/es6.date.now":"../node_modules/core-js/library/modules/es6.date.now.js","../../modules/_core":"../node_modules/core-js/library/modules/_core.js"}],"../node_modules/@babel/runtime-corejs2/core-js/date/now.js":[function(require,module,exports) {
module.exports = require("core-js/library/fn/date/now");
},{"core-js/library/fn/date/now":"../node_modules/core-js/library/fn/date/now.js"}],"../node_modules/core-js/library/modules/_defined.js":[function(require,module,exports) {
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],"../node_modules/core-js/library/modules/_string-ws.js":[function(require,module,exports) {
module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

},{}],"../node_modules/core-js/library/modules/_string-trim.js":[function(require,module,exports) {
var $export = require('./_export');
var defined = require('./_defined');
var fails = require('./_fails');
var spaces = require('./_string-ws');
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;

},{"./_export":"../node_modules/core-js/library/modules/_export.js","./_defined":"../node_modules/core-js/library/modules/_defined.js","./_fails":"../node_modules/core-js/library/modules/_fails.js","./_string-ws":"../node_modules/core-js/library/modules/_string-ws.js"}],"../node_modules/core-js/library/modules/_parse-int.js":[function(require,module,exports) {
var $parseInt = require('./_global').parseInt;
var $trim = require('./_string-trim').trim;
var ws = require('./_string-ws');
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;

},{"./_global":"../node_modules/core-js/library/modules/_global.js","./_string-trim":"../node_modules/core-js/library/modules/_string-trim.js","./_string-ws":"../node_modules/core-js/library/modules/_string-ws.js"}],"../node_modules/core-js/library/modules/es6.parse-int.js":[function(require,module,exports) {
var $export = require('./_export');
var $parseInt = require('./_parse-int');
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });

},{"./_export":"../node_modules/core-js/library/modules/_export.js","./_parse-int":"../node_modules/core-js/library/modules/_parse-int.js"}],"../node_modules/core-js/library/fn/parse-int.js":[function(require,module,exports) {
require('../modules/es6.parse-int');
module.exports = require('../modules/_core').parseInt;

},{"../modules/es6.parse-int":"../node_modules/core-js/library/modules/es6.parse-int.js","../modules/_core":"../node_modules/core-js/library/modules/_core.js"}],"../node_modules/@babel/runtime-corejs2/core-js/parse-int.js":[function(require,module,exports) {
module.exports = require("core-js/library/fn/parse-int");
},{"core-js/library/fn/parse-int":"../node_modules/core-js/library/fn/parse-int.js"}],"../node_modules/core-js/library/modules/es6.object.to-string.js":[function(require,module,exports) {

},{}],"../node_modules/core-js/library/modules/_to-integer.js":[function(require,module,exports) {
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],"../node_modules/core-js/library/modules/_string-at.js":[function(require,module,exports) {
var toInteger = require('./_to-integer');
var defined = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_to-integer":"../node_modules/core-js/library/modules/_to-integer.js","./_defined":"../node_modules/core-js/library/modules/_defined.js"}],"../node_modules/core-js/library/modules/_library.js":[function(require,module,exports) {
module.exports = true;

},{}],"../node_modules/core-js/library/modules/_redefine.js":[function(require,module,exports) {
module.exports = require('./_hide');

},{"./_hide":"../node_modules/core-js/library/modules/_hide.js"}],"../node_modules/core-js/library/modules/_iterators.js":[function(require,module,exports) {
module.exports = {};

},{}],"../node_modules/core-js/library/modules/_cof.js":[function(require,module,exports) {
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],"../node_modules/core-js/library/modules/_iobject.js":[function(require,module,exports) {
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":"../node_modules/core-js/library/modules/_cof.js"}],"../node_modules/core-js/library/modules/_to-iobject.js":[function(require,module,exports) {
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_iobject":"../node_modules/core-js/library/modules/_iobject.js","./_defined":"../node_modules/core-js/library/modules/_defined.js"}],"../node_modules/core-js/library/modules/_to-length.js":[function(require,module,exports) {
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":"../node_modules/core-js/library/modules/_to-integer.js"}],"../node_modules/core-js/library/modules/_to-absolute-index.js":[function(require,module,exports) {
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":"../node_modules/core-js/library/modules/_to-integer.js"}],"../node_modules/core-js/library/modules/_array-includes.js":[function(require,module,exports) {
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-iobject":"../node_modules/core-js/library/modules/_to-iobject.js","./_to-length":"../node_modules/core-js/library/modules/_to-length.js","./_to-absolute-index":"../node_modules/core-js/library/modules/_to-absolute-index.js"}],"../node_modules/core-js/library/modules/_shared.js":[function(require,module,exports) {

var core = require('./_core');
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: require('./_library') ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});

},{"./_core":"../node_modules/core-js/library/modules/_core.js","./_global":"../node_modules/core-js/library/modules/_global.js","./_library":"../node_modules/core-js/library/modules/_library.js"}],"../node_modules/core-js/library/modules/_uid.js":[function(require,module,exports) {
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],"../node_modules/core-js/library/modules/_shared-key.js":[function(require,module,exports) {
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":"../node_modules/core-js/library/modules/_shared.js","./_uid":"../node_modules/core-js/library/modules/_uid.js"}],"../node_modules/core-js/library/modules/_object-keys-internal.js":[function(require,module,exports) {
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_has":"../node_modules/core-js/library/modules/_has.js","./_to-iobject":"../node_modules/core-js/library/modules/_to-iobject.js","./_array-includes":"../node_modules/core-js/library/modules/_array-includes.js","./_shared-key":"../node_modules/core-js/library/modules/_shared-key.js"}],"../node_modules/core-js/library/modules/_enum-bug-keys.js":[function(require,module,exports) {
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],"../node_modules/core-js/library/modules/_object-keys.js":[function(require,module,exports) {
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_object-keys-internal":"../node_modules/core-js/library/modules/_object-keys-internal.js","./_enum-bug-keys":"../node_modules/core-js/library/modules/_enum-bug-keys.js"}],"../node_modules/core-js/library/modules/_object-dps.js":[function(require,module,exports) {
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_object-dp":"../node_modules/core-js/library/modules/_object-dp.js","./_an-object":"../node_modules/core-js/library/modules/_an-object.js","./_object-keys":"../node_modules/core-js/library/modules/_object-keys.js","./_descriptors":"../node_modules/core-js/library/modules/_descriptors.js"}],"../node_modules/core-js/library/modules/_html.js":[function(require,module,exports) {
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":"../node_modules/core-js/library/modules/_global.js"}],"../node_modules/core-js/library/modules/_object-create.js":[function(require,module,exports) {
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":"../node_modules/core-js/library/modules/_an-object.js","./_object-dps":"../node_modules/core-js/library/modules/_object-dps.js","./_enum-bug-keys":"../node_modules/core-js/library/modules/_enum-bug-keys.js","./_shared-key":"../node_modules/core-js/library/modules/_shared-key.js","./_dom-create":"../node_modules/core-js/library/modules/_dom-create.js","./_html":"../node_modules/core-js/library/modules/_html.js"}],"../node_modules/core-js/library/modules/_wks.js":[function(require,module,exports) {
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_shared":"../node_modules/core-js/library/modules/_shared.js","./_uid":"../node_modules/core-js/library/modules/_uid.js","./_global":"../node_modules/core-js/library/modules/_global.js"}],"../node_modules/core-js/library/modules/_set-to-string-tag.js":[function(require,module,exports) {
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_object-dp":"../node_modules/core-js/library/modules/_object-dp.js","./_has":"../node_modules/core-js/library/modules/_has.js","./_wks":"../node_modules/core-js/library/modules/_wks.js"}],"../node_modules/core-js/library/modules/_iter-create.js":[function(require,module,exports) {
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_object-create":"../node_modules/core-js/library/modules/_object-create.js","./_property-desc":"../node_modules/core-js/library/modules/_property-desc.js","./_set-to-string-tag":"../node_modules/core-js/library/modules/_set-to-string-tag.js","./_hide":"../node_modules/core-js/library/modules/_hide.js","./_wks":"../node_modules/core-js/library/modules/_wks.js"}],"../node_modules/core-js/library/modules/_to-object.js":[function(require,module,exports) {
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":"../node_modules/core-js/library/modules/_defined.js"}],"../node_modules/core-js/library/modules/_object-gpo.js":[function(require,module,exports) {
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":"../node_modules/core-js/library/modules/_has.js","./_to-object":"../node_modules/core-js/library/modules/_to-object.js","./_shared-key":"../node_modules/core-js/library/modules/_shared-key.js"}],"../node_modules/core-js/library/modules/_iter-define.js":[function(require,module,exports) {
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_library":"../node_modules/core-js/library/modules/_library.js","./_export":"../node_modules/core-js/library/modules/_export.js","./_redefine":"../node_modules/core-js/library/modules/_redefine.js","./_hide":"../node_modules/core-js/library/modules/_hide.js","./_iterators":"../node_modules/core-js/library/modules/_iterators.js","./_iter-create":"../node_modules/core-js/library/modules/_iter-create.js","./_set-to-string-tag":"../node_modules/core-js/library/modules/_set-to-string-tag.js","./_object-gpo":"../node_modules/core-js/library/modules/_object-gpo.js","./_wks":"../node_modules/core-js/library/modules/_wks.js"}],"../node_modules/core-js/library/modules/es6.string.iterator.js":[function(require,module,exports) {
'use strict';
var $at = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./_string-at":"../node_modules/core-js/library/modules/_string-at.js","./_iter-define":"../node_modules/core-js/library/modules/_iter-define.js"}],"../node_modules/core-js/library/modules/_add-to-unscopables.js":[function(require,module,exports) {
module.exports = function () { /* empty */ };

},{}],"../node_modules/core-js/library/modules/_iter-step.js":[function(require,module,exports) {
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],"../node_modules/core-js/library/modules/es6.array.iterator.js":[function(require,module,exports) {
'use strict';
var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators = require('./_iterators');
var toIObject = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"./_add-to-unscopables":"../node_modules/core-js/library/modules/_add-to-unscopables.js","./_iter-step":"../node_modules/core-js/library/modules/_iter-step.js","./_iterators":"../node_modules/core-js/library/modules/_iterators.js","./_to-iobject":"../node_modules/core-js/library/modules/_to-iobject.js","./_iter-define":"../node_modules/core-js/library/modules/_iter-define.js"}],"../node_modules/core-js/library/modules/web.dom.iterable.js":[function(require,module,exports) {

require('./es6.array.iterator');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var TO_STRING_TAG = require('./_wks')('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

},{"./es6.array.iterator":"../node_modules/core-js/library/modules/es6.array.iterator.js","./_global":"../node_modules/core-js/library/modules/_global.js","./_hide":"../node_modules/core-js/library/modules/_hide.js","./_iterators":"../node_modules/core-js/library/modules/_iterators.js","./_wks":"../node_modules/core-js/library/modules/_wks.js"}],"../node_modules/core-js/library/modules/_classof.js":[function(require,module,exports) {
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof');
var TAG = require('./_wks')('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./_cof":"../node_modules/core-js/library/modules/_cof.js","./_wks":"../node_modules/core-js/library/modules/_wks.js"}],"../node_modules/core-js/library/modules/_an-instance.js":[function(require,module,exports) {
module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

},{}],"../node_modules/core-js/library/modules/_iter-call.js":[function(require,module,exports) {
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

},{"./_an-object":"../node_modules/core-js/library/modules/_an-object.js"}],"../node_modules/core-js/library/modules/_is-array-iter.js":[function(require,module,exports) {
// check on default Array iterator
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":"../node_modules/core-js/library/modules/_iterators.js","./_wks":"../node_modules/core-js/library/modules/_wks.js"}],"../node_modules/core-js/library/modules/core.get-iterator-method.js":[function(require,module,exports) {
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":"../node_modules/core-js/library/modules/_classof.js","./_wks":"../node_modules/core-js/library/modules/_wks.js","./_iterators":"../node_modules/core-js/library/modules/_iterators.js","./_core":"../node_modules/core-js/library/modules/_core.js"}],"../node_modules/core-js/library/modules/_for-of.js":[function(require,module,exports) {
var ctx = require('./_ctx');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var anObject = require('./_an-object');
var toLength = require('./_to-length');
var getIterFn = require('./core.get-iterator-method');
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;

},{"./_ctx":"../node_modules/core-js/library/modules/_ctx.js","./_iter-call":"../node_modules/core-js/library/modules/_iter-call.js","./_is-array-iter":"../node_modules/core-js/library/modules/_is-array-iter.js","./_an-object":"../node_modules/core-js/library/modules/_an-object.js","./_to-length":"../node_modules/core-js/library/modules/_to-length.js","./core.get-iterator-method":"../node_modules/core-js/library/modules/core.get-iterator-method.js"}],"../node_modules/core-js/library/modules/_species-constructor.js":[function(require,module,exports) {
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = require('./_an-object');
var aFunction = require('./_a-function');
var SPECIES = require('./_wks')('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

},{"./_an-object":"../node_modules/core-js/library/modules/_an-object.js","./_a-function":"../node_modules/core-js/library/modules/_a-function.js","./_wks":"../node_modules/core-js/library/modules/_wks.js"}],"../node_modules/core-js/library/modules/_invoke.js":[function(require,module,exports) {
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};

},{}],"../node_modules/core-js/library/modules/_task.js":[function(require,module,exports) {


var ctx = require('./_ctx');
var invoke = require('./_invoke');
var html = require('./_html');
var cel = require('./_dom-create');
var global = require('./_global');
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (require('./_cof')(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};

},{"./_ctx":"../node_modules/core-js/library/modules/_ctx.js","./_invoke":"../node_modules/core-js/library/modules/_invoke.js","./_html":"../node_modules/core-js/library/modules/_html.js","./_dom-create":"../node_modules/core-js/library/modules/_dom-create.js","./_global":"../node_modules/core-js/library/modules/_global.js","./_cof":"../node_modules/core-js/library/modules/_cof.js"}],"../node_modules/core-js/library/modules/_microtask.js":[function(require,module,exports) {


var global = require('./_global');
var macrotask = require('./_task').set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = require('./_cof')(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};

},{"./_global":"../node_modules/core-js/library/modules/_global.js","./_task":"../node_modules/core-js/library/modules/_task.js","./_cof":"../node_modules/core-js/library/modules/_cof.js"}],"../node_modules/core-js/library/modules/_new-promise-capability.js":[function(require,module,exports) {
'use strict';
// 25.4.1.5 NewPromiseCapability(C)
var aFunction = require('./_a-function');

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};

},{"./_a-function":"../node_modules/core-js/library/modules/_a-function.js"}],"../node_modules/core-js/library/modules/_perform.js":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

},{}],"../node_modules/core-js/library/modules/_user-agent.js":[function(require,module,exports) {

var global = require('./_global');
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';

},{"./_global":"../node_modules/core-js/library/modules/_global.js"}],"../node_modules/core-js/library/modules/_promise-resolve.js":[function(require,module,exports) {
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var newPromiseCapability = require('./_new-promise-capability');

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

},{"./_an-object":"../node_modules/core-js/library/modules/_an-object.js","./_is-object":"../node_modules/core-js/library/modules/_is-object.js","./_new-promise-capability":"../node_modules/core-js/library/modules/_new-promise-capability.js"}],"../node_modules/core-js/library/modules/_redefine-all.js":[function(require,module,exports) {
var hide = require('./_hide');
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};

},{"./_hide":"../node_modules/core-js/library/modules/_hide.js"}],"../node_modules/core-js/library/modules/_set-species.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var core = require('./_core');
var dP = require('./_object-dp');
var DESCRIPTORS = require('./_descriptors');
var SPECIES = require('./_wks')('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};

},{"./_global":"../node_modules/core-js/library/modules/_global.js","./_core":"../node_modules/core-js/library/modules/_core.js","./_object-dp":"../node_modules/core-js/library/modules/_object-dp.js","./_descriptors":"../node_modules/core-js/library/modules/_descriptors.js","./_wks":"../node_modules/core-js/library/modules/_wks.js"}],"../node_modules/core-js/library/modules/_iter-detect.js":[function(require,module,exports) {
var ITERATOR = require('./_wks')('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

},{"./_wks":"../node_modules/core-js/library/modules/_wks.js"}],"../node_modules/core-js/library/modules/es6.promise.js":[function(require,module,exports) {


'use strict';
var LIBRARY = require('./_library');
var global = require('./_global');
var ctx = require('./_ctx');
var classof = require('./_classof');
var $export = require('./_export');
var isObject = require('./_is-object');
var aFunction = require('./_a-function');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var speciesConstructor = require('./_species-constructor');
var task = require('./_task').set;
var microtask = require('./_microtask')();
var newPromiseCapabilityModule = require('./_new-promise-capability');
var perform = require('./_perform');
var userAgent = require('./_user-agent');
var promiseResolve = require('./_promise-resolve');
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
Wrapper = require('./_core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

},{"./_library":"../node_modules/core-js/library/modules/_library.js","./_global":"../node_modules/core-js/library/modules/_global.js","./_ctx":"../node_modules/core-js/library/modules/_ctx.js","./_classof":"../node_modules/core-js/library/modules/_classof.js","./_export":"../node_modules/core-js/library/modules/_export.js","./_is-object":"../node_modules/core-js/library/modules/_is-object.js","./_a-function":"../node_modules/core-js/library/modules/_a-function.js","./_an-instance":"../node_modules/core-js/library/modules/_an-instance.js","./_for-of":"../node_modules/core-js/library/modules/_for-of.js","./_species-constructor":"../node_modules/core-js/library/modules/_species-constructor.js","./_task":"../node_modules/core-js/library/modules/_task.js","./_microtask":"../node_modules/core-js/library/modules/_microtask.js","./_new-promise-capability":"../node_modules/core-js/library/modules/_new-promise-capability.js","./_perform":"../node_modules/core-js/library/modules/_perform.js","./_user-agent":"../node_modules/core-js/library/modules/_user-agent.js","./_promise-resolve":"../node_modules/core-js/library/modules/_promise-resolve.js","./_wks":"../node_modules/core-js/library/modules/_wks.js","./_redefine-all":"../node_modules/core-js/library/modules/_redefine-all.js","./_set-to-string-tag":"../node_modules/core-js/library/modules/_set-to-string-tag.js","./_set-species":"../node_modules/core-js/library/modules/_set-species.js","./_core":"../node_modules/core-js/library/modules/_core.js","./_iter-detect":"../node_modules/core-js/library/modules/_iter-detect.js"}],"../node_modules/core-js/library/modules/es7.promise.finally.js":[function(require,module,exports) {

// https://github.com/tc39/proposal-promise-finally
'use strict';
var $export = require('./_export');
var core = require('./_core');
var global = require('./_global');
var speciesConstructor = require('./_species-constructor');
var promiseResolve = require('./_promise-resolve');

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });

},{"./_export":"../node_modules/core-js/library/modules/_export.js","./_core":"../node_modules/core-js/library/modules/_core.js","./_global":"../node_modules/core-js/library/modules/_global.js","./_species-constructor":"../node_modules/core-js/library/modules/_species-constructor.js","./_promise-resolve":"../node_modules/core-js/library/modules/_promise-resolve.js"}],"../node_modules/core-js/library/modules/es7.promise.try.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-promise-try
var $export = require('./_export');
var newPromiseCapability = require('./_new-promise-capability');
var perform = require('./_perform');

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });

},{"./_export":"../node_modules/core-js/library/modules/_export.js","./_new-promise-capability":"../node_modules/core-js/library/modules/_new-promise-capability.js","./_perform":"../node_modules/core-js/library/modules/_perform.js"}],"../node_modules/core-js/library/fn/promise.js":[function(require,module,exports) {
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.promise');
require('../modules/es7.promise.finally');
require('../modules/es7.promise.try');
module.exports = require('../modules/_core').Promise;

},{"../modules/es6.object.to-string":"../node_modules/core-js/library/modules/es6.object.to-string.js","../modules/es6.string.iterator":"../node_modules/core-js/library/modules/es6.string.iterator.js","../modules/web.dom.iterable":"../node_modules/core-js/library/modules/web.dom.iterable.js","../modules/es6.promise":"../node_modules/core-js/library/modules/es6.promise.js","../modules/es7.promise.finally":"../node_modules/core-js/library/modules/es7.promise.finally.js","../modules/es7.promise.try":"../node_modules/core-js/library/modules/es7.promise.try.js","../modules/_core":"../node_modules/core-js/library/modules/_core.js"}],"../node_modules/@babel/runtime-corejs2/core-js/promise.js":[function(require,module,exports) {
module.exports = require("core-js/library/fn/promise");
},{"core-js/library/fn/promise":"../node_modules/core-js/library/fn/promise.js"}],"../node_modules/@babel/runtime-corejs2/helpers/asyncToGenerator.js":[function(require,module,exports) {
var _Promise = require("../core-js/promise");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    _Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new _Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;
},{"../core-js/promise":"../node_modules/@babel/runtime-corejs2/core-js/promise.js"}],"../node_modules/core-js/library/modules/_create-property.js":[function(require,module,exports) {
'use strict';
var $defineProperty = require('./_object-dp');
var createDesc = require('./_property-desc');

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

},{"./_object-dp":"../node_modules/core-js/library/modules/_object-dp.js","./_property-desc":"../node_modules/core-js/library/modules/_property-desc.js"}],"../node_modules/core-js/library/modules/es6.array.from.js":[function(require,module,exports) {
'use strict';
var ctx = require('./_ctx');
var $export = require('./_export');
var toObject = require('./_to-object');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var toLength = require('./_to-length');
var createProperty = require('./_create-property');
var getIterFn = require('./core.get-iterator-method');

$export($export.S + $export.F * !require('./_iter-detect')(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_ctx":"../node_modules/core-js/library/modules/_ctx.js","./_export":"../node_modules/core-js/library/modules/_export.js","./_to-object":"../node_modules/core-js/library/modules/_to-object.js","./_iter-call":"../node_modules/core-js/library/modules/_iter-call.js","./_is-array-iter":"../node_modules/core-js/library/modules/_is-array-iter.js","./_to-length":"../node_modules/core-js/library/modules/_to-length.js","./_create-property":"../node_modules/core-js/library/modules/_create-property.js","./core.get-iterator-method":"../node_modules/core-js/library/modules/core.get-iterator-method.js","./_iter-detect":"../node_modules/core-js/library/modules/_iter-detect.js"}],"../node_modules/core-js/library/fn/array/from.js":[function(require,module,exports) {
require('../../modules/es6.string.iterator');
require('../../modules/es6.array.from');
module.exports = require('../../modules/_core').Array.from;

},{"../../modules/es6.string.iterator":"../node_modules/core-js/library/modules/es6.string.iterator.js","../../modules/es6.array.from":"../node_modules/core-js/library/modules/es6.array.from.js","../../modules/_core":"../node_modules/core-js/library/modules/_core.js"}],"../node_modules/@babel/runtime-corejs2/core-js/array/from.js":[function(require,module,exports) {
module.exports = require("core-js/library/fn/array/from");
},{"core-js/library/fn/array/from":"../node_modules/core-js/library/fn/array/from.js"}],"../../../Users/Nover/AppData/Roaming/npm/node_modules/parcel/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../Users/Nover/AppData/Roaming/npm/node_modules/parcel/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../../Users/Nover/AppData/Roaming/npm/node_modules/parcel/src/builtins/bundle-url.js"}],"scss/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./..\\img\\partners\\sinergy.jpg":[["sinergy.47ab2eed.jpg","img/partners/sinergy.jpg"],"img/partners/sinergy.jpg"],"./..\\img\\partners\\business-academy.jpg":[["business-academy.77f9e9ab.jpg","img/partners/business-academy.jpg"],"img/partners/business-academy.jpg"],"./..\\img\\partners\\tambov.jpg":[["tambov.ee86e65f.jpg","img/partners/tambov.jpg"],"img/partners/tambov.jpg"],"./..\\img\\partners\\ipe.jpg":[["ipe.2097cc5c.jpg","img/partners/ipe.jpg"],"img/partners/ipe.jpg"],"./..\\img\\partners\\roc-hoy.jpg":[["roc-hoy.dfc01d0c.jpg","img/partners/roc-hoy.jpg"],"img/partners/roc-hoy.jpg"],"./..\\img\\trusted_by\\hh.jpg":[["hh.bbfd7cda.jpg","img/trusted_by/hh.jpg"],"img/trusted_by/hh.jpg"],"./..\\img\\trusted_by\\rosseti.jpg":[["rosseti.263da7e4.jpg","img/trusted_by/rosseti.jpg"],"img/trusted_by/rosseti.jpg"],"./..\\img\\trusted_by\\rzhd.jpg":[["rzhd.fe64d6a5.jpg","img/trusted_by/rzhd.jpg"],"img/trusted_by/rzhd.jpg"],"./..\\img\\trusted_by\\rosneft.jpg":[["rosneft.afdbc676.jpg","img/trusted_by/rosneft.jpg"],"img/trusted_by/rosneft.jpg"],"./..\\img\\trusted_by\\tomc.jpg":[["tomc.d8e8b077.jpg","img/trusted_by/tomc.jpg"],"img/trusted_by/tomc.jpg"],"./..\\img\\trusted_by\\greenworks.jpg":[["greenworks.5ab122ce.jpg","img/trusted_by/greenworks.jpg"],"img/trusted_by/greenworks.jpg"],"./..\\img\\trusted_by\\tatehepro.jpg":[["tatehepro.7336df25.jpg","img/trusted_by/tatehepro.jpg"],"img/trusted_by/tatehepro.jpg"],"./..\\img\\trusted_by\\business-partner.jpg":[["business-partner.72800be2.jpg","img/trusted_by/business-partner.jpg"],"img/trusted_by/business-partner.jpg"],"./..\\img\\trusted_by\\ramport.jpg":[["ramport.43482636.jpg","img/trusted_by/ramport.jpg"],"img/trusted_by/ramport.jpg"],"./..\\img\\trusted_by\\sberbank.jpg":[["sberbank.0b6d4888.jpg","img/trusted_by/sberbank.jpg"],"img/trusted_by/sberbank.jpg"],"./..\\img\\trusted_by\\mtcrob.jpg":[["mtcrob.74a840a3.jpg","img/trusted_by/mtcrob.jpg"],"img/trusted_by/mtcrob.jpg"],"./..\\img\\trusted_by\\qayar.jpg":[["qayar.619a5c5e.jpg","img/trusted_by/qayar.jpg"],"img/trusted_by/qayar.jpg"],"./..\\img\\person-smiling_compressed.png":[["person-smiling_compressed.3fa47e1d.png","img/person-smiling_compressed.png"],"img/person-smiling_compressed.png"],"_css_loader":"../../../Users/Nover/AppData/Roaming/npm/node_modules/parcel/src/builtins/css-loader.js"}],"js/main.js":[function(require,module,exports) {
"use strict";

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _now = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/date/now"));

var _parseInt2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/parse-int"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _from = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/from"));

require("../scss/main.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { Materialbox } from 'materialize-css';
// import Glide from '@glidejs/glide'
// new Glide('.glide').mount()
// CTA btns
var ctaSubmitBtn = document.getElementById('cta-submit-application');
var btnAskQuestion = document.getElementById('section-ask-questions');
var moduleQuestions = document.getElementById('module-questions');
var moduleQuestionTextarea = document.getElementById('js-text-input-ask-anything');
var sectionAskQuestionsInner = document.getElementById('cta-ask-question');
var oneMoreQuestionText = document.getElementById('one-more-question');
var moduleHorizontalCloseBtn = document.getElementById('js-btn-horizontal-line-close');
var menuToggler = document.getElementById('menu-toggle');
var inputSelectChooseUni = document.getElementById('input-select-choose-uni');
var inputSelectChooseUniInnerText = document.getElementById('input-select-choose-uni-inner-text');
var inputSelectChooseProgramm = document.getElementById('input-select-choose-programm');
var inputSelectChooseProgrammInnerText = document.getElementById('input-select-choose-programm-inner-text');
var inputSelectChooseUniDropdown = document.getElementById('input-select-choose-uni-dropdown');
var inputSelectChooseProgrammDropdown = document.getElementById('input-select-choose-programm-dropdown');
var inputSelectChooseProgrammDropdownStepTwo = document.getElementById('input-select-choose-programm-dropdown--step-two');
var dropDownUniItems = document.querySelectorAll('.input-select-choose-uni-dropdown .inner-dropdown__inner-dropdown-items .inner-dropdown-items__item');
var dropDownUniItemsP = document.querySelectorAll('.input-select-choose-uni-dropdown .inner-dropdown__inner-dropdown-items .inner-dropdown-items__item p');
var dropDownProgrammItems = document.querySelectorAll('.input-select-choose-programm-dropdown .inner-dropdown__inner-dropdown-items .inner-dropdown-items__item');
var dropDownProgrammItemsP = document.querySelectorAll('.input-select-choose-programm-dropdown .inner-dropdown__inner-dropdown-items .inner-dropdown-items__item p');
var dropDownProgrammItemsStepTwo = document.querySelectorAll('.input-select-choose-programm-dropdown--step-two .inner-dropdown__inner-dropdown-items .inner-dropdown-items__item');
var dropDownProgrammItemsPStepTwo = document.querySelectorAll('.input-select-choose-programm-dropdown--step-two .inner-dropdown__inner-dropdown-items .inner-dropdown-items__item p');
var selectedItemFromTheFirstStep = document.getElementById('inner-dropdown-items__item--selected');
var phoneInputInnerText = document.getElementById('phone-number');
var userInputNameText = document.getElementById('user-name');
var navItemLinks = document.querySelectorAll('.nav-item__link');
var navItemLinksArr = (0, _from.default)(navItemLinks);
var dropDownItemUniIcons = document.querySelectorAll('.inner-dropdown-items__item-uni__icon');
var dropDownItemUniIconsArr = (0, _from.default)(dropDownItemUniIcons);
var dropDownItemProgrammIcons = document.querySelectorAll('.inner-dropdown-items__item-programm__icon');
var dropDownItemProgrammIconsArr = (0, _from.default)(dropDownItemProgrammIcons); // Module Ask Question -> Steps

var moduleStepOne = document.getElementById('module-questions__step-one');
var moduleStepTwo = document.getElementById('module-questions__step-two');
var moduleStepThree = document.getElementById('module-questions__step-three');
var moduleStepSuccess = document.getElementById('module-questions__step-success'); // Module Ask Question -> Step 1 -> SM Buttons

var telegramBtn = document.getElementById('sm-icons__link--telegram');
var whatsappBtn = document.getElementById('sm-icons__link--whatsapp');
var viberBtn = document.getElementById('sm-icons__link--viber');
var vkBtn = document.getElementById('sm-icons__link--vk');
var phoneBtn = document.getElementById('sm-icons__link--phone');
var emailBtn = document.getElementById('sm-icons__link--email'); // Module Ask Question -> Step 2 -> Btns

var moduleBtnCall = document.getElementById('question-module__radio-call');
var moduleBtnMessage = document.getElementById('question-module__radio-message'); // Module Ask Question -> Step 2, Step 3 -> Titles

var moduleStepTwoTitle = document.getElementById('module-step-two-title');
var moduleStepThreeTitle = document.getElementById('module-step-three-title'); // Module Ask Question -> Step 2, Step 3 -> Arrows Back

var moduleStepTwoArrowBack = document.getElementById('step-two-arrow-step-back');
var moduleStepThreeArrowBack = document.getElementById('step-three-arrow-step-back'); // Module Ask Question -> Step 3 -> Contact input

var moduleLabelEnterContactInfo = document.getElementById('module-label-enter-contact-info');
var moduleInputContactInfo = document.getElementById('module-input-contact-info'); // Module Ask Question -> Step Success -> Submit

var moduleBtnSubmit = document.getElementById('module_questions-submit-btn');
var carouselBtnLeft = document.getElementById('carrousel-arrow-left-btn');
var carouselBtnRight = document.getElementById('carrousel-arrow-right-btn');
var carouselImgGroupOne = document.getElementById('content__img-group--1');
var carouselImgGroupTwo = document.getElementById('content__img-group--2');
var carouselImgGroupThree = document.getElementById('content__img-group--3');
var svgCheckMark = "<svg\n      class=\"inner-dropdown-items-programm__item__icon\"\n      width=\"12\"\n      height=\"9\"\n      viewBox=\"0 0 12 9\"\n      fill=\"none\"\n      xmlns=\"http://www.w3.org/2000/svg\"\n    >\n      <path\n        fill-rule=\"evenodd\"\n        clip-rule=\"evenodd\"\n        d=\"M3.57331 8.62947C3.61787 8.69409 3.67213 8.75362 3.73587 8.80587C4.10173 9.10576 4.64142 9.05228 4.94131 8.68643L10.9143 1.39957C11.2142 1.03371 11.1607 0.494021 10.7948 0.194132C10.429 -0.105757 9.88928 -0.05228 9.58939 0.313576L4.25631 6.81979L1.49654 3.71731C1.18213 3.36385 0.640721 3.3322 0.287266 3.64661C-0.0661882 3.96102 -0.09784 4.50243 0.216571 4.85589L3.57331 8.62947Z\"\n        fill=\"#fff\"\n      />\n    </svg>";
var scrollToTheApplicationBtn = document.getElementById('cta-scroll-to-submit-application');
var fillInTheFieldsBelow = document.getElementById('fill-in-fields');
var userNameInput = document.getElementById('container-input--user-name');
var insertAfterLiStepTwo = document.getElementById('js-insert-after--step-two');
var numValidation = /^[0-9()-.+ ]+$/;
var locationDependedHeading = document.getElementById('location-depended-heading');
var customizedCountryText = document.getElementById('customizedCountryText');
var userDevice = window.navigator.userAgent; // UTM PARAMS

var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var utmSource = urlParams.get('utm_source');
var utmMedium = urlParams.get('utm_medium');
var utmCampaign = urlParams.get('utm_campaign');
var utmContent = urlParams.get('utm_content');
var utmTerm = urlParams.get('utm_term'); // Track IP
// let user_location;
// fetch("https://www.cloudflare.com/cdn-cgi/trace")
//   .then((data) => data.json())
//   .then((data) => {
//     user_location = data;
//     console.log(user_location);
//   });
// let userLocation;

var locationUrlAPI = 'https://ipinfo.io?token=b16e76b622236e'; // const locationUrlAPI = '';
// let locationUrlAPI = 'https://ipapi.co/8.8.8.8/json/';
// let locationUrlAPI = 'http://ip-api.com/json'; // no https
// let locationUrlAPI = 'https://api.ipify.org/?format=json';

var userCity;
var userCountry;
var userCountryCode; // KZ, RU, UZ

fetch(locationUrlAPI).then(function (data) {
  return data.json();
}).then(function (data) {
  // console.log(data);
  userCity = data.city;
  userCountry = data.country;
  userCountryCode = data.country;

  if (userCountry === 'RU') {
    userCountry = 'Russia';
  } else if (userCountry === 'KZ') {
    userCountry = 'Kazakhstan';
  } else if (userCountry == 'UZ') {
    userCountry = 'Uzbekistan';
  } // console.log(data);
  // // console.log(locationDependedHeading);
  // // console.log(userCountryCode);


  changeLocationDependedHeading(locationDependedHeading, 'дистанционно в вузах Москвы', 'дистанционно в вузах Москвы без ЕГЭ и ЕНТ', 'дистанционно в вузах Москвы без ЕГЭ', 'дистанционно в вузах Москвы');
  changeCustomizedCountryText('', 'из Казахстана', 'из Узбекистана', ''); // Docs steps

  var kzUzEls = document.querySelectorAll('.kz-uz-only');
  var kzUzElsArr = (0, _from.default)(kzUzEls);
  var ruEls = document.querySelectorAll('.ru-only');
  var ruElsArr = (0, _from.default)(ruEls);

  if (userCountryCode === 'RU') {
    ruElsArr.forEach(function (el) {
      el.classList.add('show');
    });
    kzUzElsArr.forEach(function (el) {
      el.classList.remove('show');
    });
  } else if (userCountryCode === 'KZ') {
    ruElsArr.forEach(function (el) {
      el.classList.remove('show');
    });
    kzUzElsArr.forEach(function (el) {
      el.classList.show('show');
    });
  } else if (userCountryCode === 'UZ') {
    ruElsArr.forEach(function (el) {
      el.classList.remove('show');
    });
    kzUzElsArr.forEach(function (el) {
      el.classList.show('show');
    });
  } else {
    ruElsArr.forEach(function (el) {
      el.classList.add('show');
    });
    kzUzElsArr.forEach(function (el) {
      el.classList.remove('show');
    });
  } // /Docs needed

}).catch(function (error) {
  // `Can't access ${locationUrlAPI} :(`;
  changeLocationDependedHeading(locationDependedHeading, 'дистанционно в вузах Москвы', 'дистанционно в вузах Москвы без ЕГЭ и ЕНТ', 'дистанционно в вузах Москвы без ЕГЭ', 'дистанционно в вузах Москвы');
  changeCustomizedCountryText('', 'из Казахстана', 'из Узбекистана', ''); // Docs steps

  var kzUzEls = document.querySelectorAll('.kz-uz-only');
  var kzUzElsArr = (0, _from.default)(kzUzEls);
  var ruEls = document.querySelectorAll('.ru-only');
  var ruElsArr = (0, _from.default)(ruEls);

  if (userCountryCode === 'RU') {
    ruElsArr.forEach(function (el) {
      el.classList.add('show');
    });
    kzUzElsArr.forEach(function (el) {
      el.classList.remove('show');
    });
  } else if (userCountryCode === 'KZ') {
    ruElsArr.forEach(function (el) {
      el.classList.remove('show');
    });
    kzUzElsArr.forEach(function (el) {
      el.classList.show('show');
    });
  } else if (userCountryCode === 'UZ') {
    ruElsArr.forEach(function (el) {
      el.classList.remove('show');
    });
    kzUzElsArr.forEach(function (el) {
      el.classList.show('show');
    });
  } else {
    ruElsArr.forEach(function (el) {
      el.classList.add('show');
    });
    kzUzElsArr.forEach(function (el) {
      el.classList.remove('show');
    });
  } // /Docs needed


  return;
});

function changeLocationDependedHeading() {
  var textBefore = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var textAfterRU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var textAfterKZ = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var textAfterUZ = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var textFallback = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';

  if (userCountryCode === 'RU') {
    textBefore.innerText = textAfterRU;
  } else if (userCountryCode === 'KZ') {
    textBefore.innerText = textAfterKZ;
  } else if (userCountryCode === 'UZ') {
    textBefore.innerText = textAfterUZ;
  } else {
    textBefore.innerText = textFallback;
  }
}

function changeCustomizedCountryText() {
  var textAfterRU = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var textAfterKZ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var textAfterUZ = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var textFallback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

  if (userCountryCode === 'RU') {
    customizedCountryText.innerText = textAfterRU;
  } else if (userCountryCode === 'KZ') {
    customizedCountryText.innerText = textAfterKZ;
  } else if (userCountryCode === 'UZ') {
    customizedCountryText.innerText = textAfterUZ;
  } else {
    customizedCountryText.innerText = textFallback;
  }
}

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
} // function dropDownStepTwoInsertItem(text = '') {
//   let el;
//   el = document.createElement('li');
//   el.classList.add('inner-dropdown-items__item');
//   el.innerHTML = `
//         <p>
//           ${svgCheckMark}
//           ${text}
//         </p>
//       `;
//   insertAfter(insertAfterLiStepTwo, el);
// }


var isSumbitted = false;

function checkForUniqueUserNum() {
  var userNum = document.getElementById('pop-up-form-number').value;
  var userNum2 = document.getElementById('phone-are-there-questions').value;
  var userNum3 = document.getElementById('number-contact-form').value;
  var userNum4 = document.getElementById('module-input-contact-info').value;
  var numArr = [userNum, userNum2, userNum3, userNum4];
  var userNumCur;
  numArr.forEach(function (num) {
    if (num !== '') {
      userNumCur = num;
    }
  });

  if (localStorage.getItem('userNum') === null) {
    localStorage.setItem('userNum', userNumCur);
    return 'Нет';
  } else if (localStorage.getItem('userNum') === userNumCur) {
    return 'Да';
  }

  localStorage.setItem('userNum', userNum.value);
} // console.log(checkForUniqueUserNum())
// Send to email


function sumbitData(_x) {
  return _sumbitData.apply(this, arguments);
} // Menu


function _sumbitData() {
  _sumbitData = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(data) {
    var res, content;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(isSumbitted === false)) {
              _context.next = 11;
              break;
            }

            _context.next = 3;
            return fetch('/email', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: (0, _stringify.default)(data)
            });

          case 3:
            res = _context.sent;
            _context.next = 6;
            return res.json();

          case 6:
            content = _context.sent;
            isSumbitted = true; // Prevent spamming

            setTimeout(function () {
              isSumbitted = false;
            }, 5000);
            _context.next = 12;
            break;

          case 11:
            return _context.abrupt("return");

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _sumbitData.apply(this, arguments);
}

menuToggler.addEventListener('click', function () {
  if (menuToggler.checked === true) {
    btnAskQuestion.classList.add('hidden');
  } else {
    btnAskQuestion.classList.remove('hidden');
  }
});
navItemLinks[0].addEventListener('click', function (e) {
  // window.location = "#about";
  var aboutSection = document.getElementById('about');
  aboutSection.scrollIntoView({
    behavior: 'smooth'
  });
  menuToggler.checked = false;
  e.preventDefault();
});
navItemLinks[1].addEventListener('click', function (e) {
  // window.location = "#partners";
  var partnersSection = document.getElementById('partners');
  partnersSection.scrollIntoView({
    behavior: 'smooth'
  });
  menuToggler.checked = false;
  e.preventDefault();
});
navItemLinks[2].addEventListener('click', function (e) {
  // window.location = "#trusted-by";
  var chooseFromMany = document.getElementById('choose-from-many');
  chooseFromMany.scrollIntoView({
    behavior: 'smooth'
  });
  menuToggler.checked = false;
  e.preventDefault();
});
navItemLinks[3].addEventListener('click', function (e) {
  // window.location = "#trusted-by";
  var whatToDo = document.getElementById('what-to-do');
  whatToDo.scrollIntoView({
    behavior: 'smooth'
  });
  menuToggler.checked = false;
  e.preventDefault();
}); // Select Dropdown Uni
// inputSelectChooseUni.addEventListener('click', (e) => {
//   inputSelectChooseUniDropdown.classList.toggle('show-dropdown');
//   // window.location = '#input-select-choose-uni';
//   if (
//     inputSelectChooseUniDropdown.classList.contains('show-dropdown') &&
//     document.body.clientWidth < 768
//   ) {
//     inputSelectChooseUni.scrollIntoView({
//       behavior: 'smooth',
//     });
//   }
//   document.body.addEventListener('click', function closeInputUniDropDown(e) {
//     if (
//       inputSelectChooseUniDropdown.classList.contains('show-dropdown') &&
//       !inputSelectChooseUniDropdown.contains(e.target) &&
//       e.target !== inputSelectChooseUniDropdown &&
//       !inputSelectChooseUni.contains(e.target) &&
//       e.target !== inputSelectChooseUni
//     ) {
//       // Close question module
//       inputSelectChooseUniDropdown.classList.toggle('show-dropdown');
//       document.body.removeEventListener('click', closeInputUniDropDown);
//     }
//   });
//   e.preventDefault();
// });
// scrollToTheApplicationBtn.addEventListener('click', (e) => {
//   fillInTheFieldsBelow.classList.remove('hidden');
//   if (document.body.clientWidth < 768) {
//     fillInTheFieldsBelow.scrollIntoView({
//       behavior: 'smooth',
//     });
//   } else {
//     const mainHeading = document.getElementById('js-section-heading');
//     mainHeading.scrollIntoView({
//       behavior: 'smooth',
//     });
//   }
//   setTimeout(() => {
//     fillInTheFieldsBelow.classList.add('hidden');
//   }, 3000);
//   e.preventDefault();
// });
// Dropdown Uni
// inputSelectChooseUniDropdown.addEventListener('mousedown', (e) => {
//   // Convert Dropdown Uni items into an array
//   const dropDownUniItemsArr = Array.from(dropDownUniItems);
//   const dropDownUniItemsArrP = Array.from(dropDownUniItemsP);
//   // Add the color to the selected text in the dropdown and clean the colors from other elements
//   dropDownUniItemsArr.forEach((item) => {
//     item.classList.remove('text-highlight--color');
//   });
//   dropDownUniItemsArrP.forEach((item) => {
//     item.classList.remove('text-highlight--color');
//   });
//   // Change the inner text of the select to the selected text
//   if (e.target.tagName === 'svg') {
//     inputSelectChooseUniInnerText.innerText = e.target.parentElement.innerText;
//     if(inputSelectChooseUniInnerText.innerText !== 'Определюсь после консультации'){
//       inputSelectChooseUniInnerText.innerText = inputSelectChooseUniInnerText.innerText
//       .substring(inputSelectChooseUniInnerText.innerText.indexOf('(') + 1)
//       .slice(0, -1);
//     }
//     e.target.parentElement.classList.add('text-highlight--color');
//   } else if (e.target.tagName == 'path') {
//     inputSelectChooseUniInnerText.innerText =
//       e.target.parentElement.parentElement.innerText;
//       if(inputSelectChooseUniInnerText.innerText !== 'Определюсь после консультации'){
//         inputSelectChooseUniInnerText.innerText = inputSelectChooseUniInnerText.innerText
//         .substring(inputSelectChooseUniInnerText.innerText.indexOf('(') + 1)
//         .slice(0, -1);
//       }
//     e.target.parentElement.parentElement.classList.add('text-highlight--color');
//   } else {
//     inputSelectChooseUniInnerText.innerText = e.target.innerText;
//     if(inputSelectChooseUniInnerText.innerText !== 'Определюсь после консультации'){
//       inputSelectChooseUniInnerText.innerText = inputSelectChooseUniInnerText.innerText
//       .substring(inputSelectChooseUniInnerText.innerText.indexOf('(') + 1)
//       .slice(0, -1);
//     }
//     e.target.classList.add('text-highlight--color');
//   }
//   // Add the color to the selected text in the input
//   inputSelectChooseUniInnerText.classList.add('text-highlight--color');
//   // On select hide the module
//   inputSelectChooseUniDropdown.classList.toggle('show-dropdown');
//   e.preventDefault();
// });
// // Select Dropdown Programm
// inputSelectChooseProgramm.addEventListener('click', (e) => {
//   if (
//     inputSelectChooseProgrammDropdownStepTwo.classList.contains('show-dropdown')
//   ) {
//     inputSelectChooseProgrammDropdownStepTwo.classList.remove('show-dropdown');
//     inputSelectChooseProgrammDropdown.classList.remove('show-dropdown');
//   } else {
//     inputSelectChooseProgrammDropdownStepTwo.classList.remove('show-dropdown');
//     inputSelectChooseProgrammDropdown.classList.toggle('show-dropdown');
//   }
//   // window.location = '#input-select-choose-uni';
//   if (
//     inputSelectChooseProgrammDropdown.classList.contains('show-dropdown') &&
//     document.body.clientWidth < 768
//   ) {
//     inputSelectChooseProgrammInnerText.scrollIntoView({
//       behavior: 'smooth',
//     });
//   }
//   document.body.addEventListener('click', function closeInputProgrammDropDown(
//     e
//   ) {
//     if (
//       (inputSelectChooseProgrammDropdown.classList.contains('show-dropdown') ||
//         inputSelectChooseProgrammDropdownStepTwo.classList.contains(
//           'show-dropdown'
//         )) &&
//       !inputSelectChooseProgrammDropdown.contains(e.target) &&
//       e.target !== inputSelectChooseProgrammDropdown &&
//       !inputSelectChooseProgramm.contains(e.target) &&
//       e.target !== inputSelectChooseProgrammDropdownStepTwo &&
//       !inputSelectChooseProgrammDropdownStepTwo.contains(e.target) &&
//       e.target !== inputSelectChooseProgramm &&
//       !selectedItemFromTheFirstStep.contains(e.target) &&
//       e.target !== selectedItemFromTheFirstStep
//     ) {
//       // Close question module
//       inputSelectChooseProgrammDropdown.classList.remove('show-dropdown');
//       inputSelectChooseProgrammDropdownStepTwo.classList.remove(
//         'show-dropdown'
//       );
//       document.body.removeEventListener('click', closeInputProgrammDropDown);
//     }
//   });
//   e.preventDefault();
// });
// // Dropdown Programm
// inputSelectChooseProgrammDropdown.addEventListener('click', (e) => {
//   const dropDownProgrammItemsArr = Array.from(dropDownProgrammItems);
//   const dropDownProgrammItemsArrP = Array.from(dropDownProgrammItemsP);
//   dropDownProgrammItemsArr.forEach((item) => {
//     item.classList.remove('text-highlight--color');
//   });
//   dropDownProgrammItemsArrP.forEach((item) => {
//     item.classList.remove('text-highlight--color');
//   });
//   // Change the inner text of the select to the selected text
//   if (e.target.tagName === 'svg') {
//     inputSelectChooseProgrammInnerText.innerText =
//       e.target.parentElement.innerText;
//     e.target.parentElement.classList.add('text-highlight--color');
//   } else if (e.target.tagName == 'path') {
//     inputSelectChooseProgrammInnerText.innerText =
//       e.target.parentElement.parentElement.innerText;
//     e.target.parentElement.parentElement.classList.add('text-highlight--color');
//   } else {
//     inputSelectChooseProgrammInnerText.innerText = e.target.innerText;
//     e.target.classList.add('text-highlight--color');
//   }
//   // Add the color to the selected text in the input
//   inputSelectChooseProgrammInnerText.classList.add('text-highlight--color');
//   // Dropdown Programm Step 2
//   if (
//     inputSelectChooseProgrammInnerText.innerText ===
//     'Определюсь после консультации'
//   ) {
//     inputSelectChooseProgrammDropdownStepTwo.classList.remove('show-dropdown');
//   } else {
//     inputSelectChooseProgrammDropdownStepTwo.classList.add('show-dropdown');
//     const selectedItemFromTheFirstStepText = document.getElementById(
//       'programm-dropdown-step-two-selected-step-one-item'
//     );
//     const selectedItemFromTheFirstStep = document.getElementById(
//       'inner-dropdown-items__item--selected'
//     );
//     selectedItemFromTheFirstStepText.innerText =
//       inputSelectChooseProgrammInnerText.innerText;
//     const listItemsStepTwo = document.getElementById(
//       'inner-dropdown-items--step-two'
//     );
//     const svgArrowBack = `<svg
//     width="9"
//     height="15"
//     viewBox="0 0 9 15"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M8.20471 13.2882L2.41412 7.49765L8.20471 1.70706C8.5953 1.31647 8.5953 0.683529 8.20471 0.292941C7.81412 -0.097647 7.18118 -0.097647 6.79059 0.292941L0.292941 6.79059C-0.0976471 7.18118 -0.0976471 7.81412 0.292941 8.2047L6.79059 14.7024C7.18118 15.0929 7.81412 15.0929 8.20471 14.7024C8.5953 14.3118 8.5953 13.6788 8.20471 13.2882Z"
//       fill="#2874FF"
//     />
//   </svg>`;
//     if (selectedItemFromTheFirstStepText.innerText === 'Колледж') {
//       const listItemsStepTwoArr = Array.prototype.slice.call(
//         listItemsStepTwo.childNodes
//       );
//       listItemsStepTwoArr.forEach((item, index) => {
//         if (index > 3) {
//           item.remove();
//         }
//       });
//       dropDownStepTwoInsertItem('Другое');
//       dropDownStepTwoInsertItem('Информационные системы и программирование');
//       dropDownStepTwoInsertItem('Гостиничное дело​');
//       dropDownStepTwoInsertItem('Банковское дело​​');
//       dropDownStepTwoInsertItem('Экономика и бухгалтерский учет по отраслям');
//       dropDownStepTwoInsertItem('Право и организация социального обеспечения');
//       dropDownStepTwoInsertItem('Коммерция по отраслям');
//     }
//     if (selectedItemFromTheFirstStepText.innerText === 'Бакалавриат') {
//       const listItemsStepTwoArr = Array.prototype.slice.call(
//         listItemsStepTwo.childNodes
//       );
//       listItemsStepTwoArr.forEach((item, index) => {
//         if (index > 3) {
//           item.remove();
//         }
//       });
//       dropDownStepTwoInsertItem('Другое');
//       dropDownStepTwoInsertItem('Юриспруденция');
//       dropDownStepTwoInsertItem('Дизайн​');
//       dropDownStepTwoInsertItem('Лингвистика');
//       dropDownStepTwoInsertItem('Информационные системы и технологии');
//       dropDownStepTwoInsertItem('Прикладная информатика');
//       dropDownStepTwoInsertItem('Реклама и связи с общественностью');
//       dropDownStepTwoInsertItem('Бизнес-информатика');
//       dropDownStepTwoInsertItem('Государственное и муниципальное управление');
//       dropDownStepTwoInsertItem('Управление персоналом');
//       dropDownStepTwoInsertItem('Теплоэнергетика и теплотехника');
//       dropDownStepTwoInsertItem('Электроэнергетика и электротехника');
//       dropDownStepTwoInsertItem('Строительство');
//       dropDownStepTwoInsertItem('Психолого-педагогическое образование');
//       dropDownStepTwoInsertItem('Психология');
//       dropDownStepTwoInsertItem('Менеджмент');
//       dropDownStepTwoInsertItem('Экономика');
//     }
//     if (selectedItemFromTheFirstStepText.innerText === 'Специалитет') {
//       const listItemsStepTwoArr = Array.prototype.slice.call(
//         listItemsStepTwo.childNodes
//       );
//       listItemsStepTwoArr.forEach((item, index) => {
//         if (index > 3) {
//           item.remove();
//         }
//       });
//       dropDownStepTwoInsertItem('Другое');
//       dropDownStepTwoInsertItem('Экономическая безопасность');
//     }
//     if (selectedItemFromTheFirstStepText.innerText === 'Магистратура') {
//       const listItemsStepTwoArr = Array.prototype.slice.call(
//         listItemsStepTwo.childNodes
//       );
//       listItemsStepTwoArr.forEach((item, index) => {
//         if (index > 3) {
//           item.remove();
//         }
//       });
//       dropDownStepTwoInsertItem('Другое');
//       dropDownStepTwoInsertItem('Юриспруденция');
//       dropDownStepTwoInsertItem('Реклама и связи с общественностью');
//       dropDownStepTwoInsertItem('Психология');
//       dropDownStepTwoInsertItem('Прикладная информатика');
//       dropDownStepTwoInsertItem('Государственное и муниципальное управление');
//       dropDownStepTwoInsertItem('Управление персоналом');
//       dropDownStepTwoInsertItem('Менеджмент');
//       dropDownStepTwoInsertItem('Финансы и кредит');
//       dropDownStepTwoInsertItem('Экономика');
//     }
//     if (
//       selectedItemFromTheFirstStepText.innerText ===
//       'Профессиональная переподготовка'
//     ) {
//       const listItemsStepTwoArr = Array.prototype.slice.call(
//         listItemsStepTwo.childNodes
//       );
//       listItemsStepTwoArr.forEach((item, index) => {
//         if (index > 3) {
//           item.remove();
//         }
//       });
//       dropDownStepTwoInsertItem('Другое');
//       dropDownStepTwoInsertItem('Гуманитарные науки');
//       dropDownStepTwoInsertItem('Электроэнергетика');
//       dropDownStepTwoInsertItem('Строительство');
//       dropDownStepTwoInsertItem('Теплоэнергетика');
//       dropDownStepTwoInsertItem('Безопасность дорожного движения');
//       dropDownStepTwoInsertItem('Продукты питания - технология производства');
//       dropDownStepTwoInsertItem('Юриспруденция');
//       dropDownStepTwoInsertItem('Охрана труда');
//       dropDownStepTwoInsertItem('Информатика и вычислительная техника');
//       dropDownStepTwoInsertItem('Реклама и PR');
//       dropDownStepTwoInsertItem('Журналистика');
//       dropDownStepTwoInsertItem('Дизайн');
//       dropDownStepTwoInsertItem('Маркетинг');
//       dropDownStepTwoInsertItem('Туризм');
//       dropDownStepTwoInsertItem('Государственное и муниципальное управление');
//       dropDownStepTwoInsertItem('Логистика');
//       dropDownStepTwoInsertItem('Социальная работа');
//       dropDownStepTwoInsertItem('Экономика');
//       dropDownStepTwoInsertItem('Психология');
//       dropDownStepTwoInsertItem('Педагогика');
//       dropDownStepTwoInsertItem('Менеджмент');
//     }
//     if (
//       selectedItemFromTheFirstStepText.innerText === 'Повышение квалификации'
//     ) {
//       const listItemsStepTwoArr = Array.prototype.slice.call(
//         listItemsStepTwo.childNodes
//       );
//       listItemsStepTwoArr.forEach((item, index) => {
//         if (index > 3) {
//           item.remove();
//         }
//       });
//       dropDownStepTwoInsertItem('Другое');
//       dropDownStepTwoInsertItem('Гуманитарные науки');
//       dropDownStepTwoInsertItem('Электроэнергетика');
//       dropDownStepTwoInsertItem('Строительство');
//       dropDownStepTwoInsertItem('Теплоэнергетика');
//       dropDownStepTwoInsertItem('Безопасность дорожного движения');
//       dropDownStepTwoInsertItem('Продукты питания - технология производства');
//       dropDownStepTwoInsertItem('Юриспруденция');
//       dropDownStepTwoInsertItem('Охрана труда');
//       dropDownStepTwoInsertItem('Информатика и вычислительная техника');
//       dropDownStepTwoInsertItem('Реклама и PR');
//       dropDownStepTwoInsertItem('Журналистика');
//       dropDownStepTwoInsertItem('Дизайн');
//       dropDownStepTwoInsertItem('Маркетинг');
//       dropDownStepTwoInsertItem('Туризм');
//       dropDownStepTwoInsertItem('Медицина');
//       dropDownStepTwoInsertItem('Государственное и муниципальное управление');
//       dropDownStepTwoInsertItem('Логистика');
//       dropDownStepTwoInsertItem('Социальная работа​');
//       dropDownStepTwoInsertItem('Экономика​​');
//       dropDownStepTwoInsertItem('Психология');
//       dropDownStepTwoInsertItem('Педагогика');
//       dropDownStepTwoInsertItem('Менеджмент');
//     }
//     if (
//       selectedItemFromTheFirstStepText.innerText ===
//       'Master of Business Administration (МВА)'
//     ) {
//       const listItemsStepTwoArr = Array.prototype.slice.call(
//         listItemsStepTwo.childNodes
//       );
//       listItemsStepTwoArr.forEach((item, index) => {
//         if (index > 3) {
//           item.remove();
//         }
//       });
//       dropDownStepTwoInsertItem('Другое');
//       dropDownStepTwoInsertItem('MBA Industry');
//       dropDownStepTwoInsertItem('MBA Professional');
//       dropDownStepTwoInsertItem('MBA Intensive');
//       dropDownStepTwoInsertItem('Mini-MBA');
//     }
//     // Step back
//     selectedItemFromTheFirstStep.addEventListener('click', (e) => {
//       inputSelectChooseProgrammDropdownStepTwo.classList.remove(
//         'show-dropdown'
//       );
//       inputSelectChooseProgrammDropdown.classList.add('show-dropdown');
//       e.preventDefault();
//     });
//     inputSelectChooseProgrammDropdownStepTwo.addEventListener('click', (e) => {
//       const dropDownProgrammItemsStepTwoArr = Array.from(
//         dropDownProgrammItemsStepTwo
//       );
//       const dropDownProgrammItemsPStepTwoArr = Array.from(
//         dropDownProgrammItemsPStepTwo
//       );
//       dropDownProgrammItemsStepTwoArr.forEach((item) => {
//         item.classList.remove('text-highlight--color');
//       });
//       dropDownProgrammItemsPStepTwoArr.forEach((item) => {
//         item.classList.remove('text-highlight--color');
//       });
//       // Change the inner text of the select to the selected text
//       if (e.target.tagName === 'svg') {
//         // Make sure we don't insert a step back btn inner text into the div (that looks kinda like select input)
//         inputSelectChooseProgrammInnerText.innerText ===
//         e.target.parentElement.innerText
//           ? inputSelectChooseProgrammInnerText.innerText
//           : (inputSelectChooseProgrammInnerText.innerText = `${inputSelectChooseProgrammInnerText.innerHTML}, ${e.target.parentElement.innerText}`);
//         e.target.parentElement.classList.add('text-highlight--color');
//       } else if (e.target.tagName == 'path') {
//         // Make sure we don't insert a step back btn inner text into the div (that looks kinda like select input)
//         inputSelectChooseProgrammInnerText.innerText ===
//         e.target.parentElement.parentElement.innerText
//           ? inputSelectChooseProgrammInnerText.innerText
//           : (inputSelectChooseProgrammInnerText.innerText = `${inputSelectChooseProgrammInnerText.innerText}, ${e.target.parentElement.parentElement.innerText}`);
//         e.target.parentElement.parentElement.classList.add(
//           'text-highlight--color'
//         );
//       } else {
//         // Make sure we don't insert a step back btn inner text into the div (that looks kinda like select input)
//         inputSelectChooseProgrammInnerText.innerText === e.target.innerText
//           ? (inputSelectChooseProgrammInnerText.innerText =
//               inputSelectChooseProgrammInnerText.innerText)
//           : (inputSelectChooseProgrammInnerText.innerText = `${inputSelectChooseProgrammInnerText.innerText}, ${e.target.innerText}`);
//         e.target.classList.add('text-highlight--color');
//       }
//       inputSelectChooseProgrammInnerText.innerHTML = inputSelectChooseProgrammInnerText.innerHTML.replace(
//         /,\s*$/,
//         ''
//       );
//       if (document.body.clientWidth < 768) {
//         inputSelectChooseProgrammInnerText.scrollIntoView({
//           behavior: 'smooth',
//         });
//       }
//       inputSelectChooseProgrammDropdownStepTwo.classList.remove(
//         'show-dropdown'
//       );
//     });
//   }
//   // On select hide the module
//   inputSelectChooseProgrammDropdown.classList.toggle('show-dropdown');
//   e.preventDefault();
// });
// Show ask question btn on the scroll position
// window.addEventListener('scroll', function showQuestionBtn(e) {
//   // console.log(window.scrollY);
//   if (window.scrollY >= 720 && window.scrollY <= 2000) {
//     btnAskQuestion.classList.remove('hidden');
//   } else {
//     btnAskQuestion.classList.add('hidden');
//   }
//   e.preventDefault();
// });
// Ask question clicked

btnAskQuestion.addEventListener('click', function (e) {
  // window.removeEventListener("scroll", showQuestionBtn);
  btnAskQuestion.classList.add('hidden');
  moduleQuestions.classList.remove('hidden');
  moduleStepOne.classList.remove('hidden');
  document.body.classList.add('dark-overlay');
  moduleQuestionTextarea.focus();
  document.body.addEventListener('click', function closeQuestionModule(e) {
    // moduleHorizontalCloseBtn
    if (!btnAskQuestion.contains(e.target) && e.target !== btnAskQuestion && !moduleQuestions.contains(e.target) && e.target !== moduleQuestions || e.target === btnAskQuestion && btnAskQuestion.contains(e.target)) {
      // Close question module
      btnAskQuestion.classList.remove('hidden');
      moduleQuestions.classList.add('hidden');
      moduleStepOne.classList.add('hidden');
      document.body.classList.remove('dark-overlay');
      document.body.removeEventListener('click', closeQuestionModule);
    }

    e.preventDefault();
  }); // Telegram clicked

  telegramBtn.addEventListener('click', function (e) {
    if (moduleQuestionTextarea.value === '') {
      moduleQuestionTextarea.classList.add('bg-danger');
      moduleQuestionTextarea.focus();
      moduleQuestionTextarea.addEventListener('keyup', function highlightBgDanger(e) {
        e.target.value !== '' ? moduleQuestionTextarea.classList.remove('bg-danger') : moduleQuestionTextarea.classList.add('bg-danger');
      });
    } else {
      moduleStepOne.classList.add('hidden');
      moduleStepTwo.classList.remove('hidden');
      moduleStepTwoTitle.innerHTML = 'Telegram';
    } // Telegram -> Call clicked


    moduleBtnCall.addEventListener('click', function (e) {
      moduleStepThree.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');
      moduleStepThreeTitle.innerHTML = 'Telegram / Позвонить';
      moduleLabelEnterContactInfo.innerHTML = 'Напишите свой номер';
      moduleInputContactInfo.focus();
      e.preventDefault();
    }); // Telegram -> Message clicked

    moduleBtnMessage.addEventListener('click', function (e) {
      moduleStepThree.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');
      moduleStepThreeTitle.innerHTML = 'Telegram / Написать';
      moduleLabelEnterContactInfo.innerHTML = 'Напишите свой номер';
      moduleInputContactInfo.focus();
      e.preventDefault();
    }); // Step 2 -> Arrow back

    moduleStepTwoArrowBack.addEventListener('click', function (e) {
      moduleStepOne.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');
      e.preventDefault();
    }); // Step 3 -> Arrow Back

    moduleStepThreeArrowBack.addEventListener('click', function (e) {
      moduleStepTwo.classList.remove('hidden');
      moduleStepOne.classList.add('hidden');
      moduleStepThree.classList.add('hidden');
      e.preventDefault();
    });
    e.preventDefault();
  }); // Whatsapp clicked

  whatsappBtn.addEventListener('click', function (e) {
    if (moduleQuestionTextarea.value === '') {
      moduleQuestionTextarea.classList.add('bg-danger');
      moduleQuestionTextarea.focus();
      moduleQuestionTextarea.addEventListener('keyup', function highlightBgDanger(e) {
        e.target.value !== '' ? moduleQuestionTextarea.classList.remove('bg-danger') : moduleQuestionTextarea.classList.add('bg-danger');
      });
    } else {
      moduleStepOne.classList.add('hidden');
      moduleStepTwo.classList.remove('hidden');
      moduleStepTwoTitle.innerHTML = 'Whats App';
    } // Whatsapp -> Call clicked


    moduleBtnCall.addEventListener('click', function (e) {
      moduleStepThree.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');
      moduleStepThreeTitle.innerHTML = 'Whatsapp / Позвонить';
      moduleLabelEnterContactInfo.innerHTML = 'Напишите свой номер';
      moduleInputContactInfo.focus();
      e.preventDefault();
    }); // Whatsapp -> Message clicked

    moduleBtnMessage.addEventListener('click', function (e) {
      moduleStepThree.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');
      moduleStepThreeTitle.innerHTML = 'Whatsapp / Написать';
      moduleLabelEnterContactInfo.innerHTML = 'Напишите свой номер';
      moduleInputContactInfo.focus();
      e.preventDefault();
    }); // Step 2 -> Arrow back

    moduleStepTwoArrowBack.addEventListener('click', function (e) {
      moduleStepOne.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');
      e.preventDefault();
    }); // Step 3 -> Arrow Back

    moduleStepThreeArrowBack.addEventListener('click', function (e) {
      moduleStepTwo.classList.remove('hidden');
      moduleStepOne.classList.add('hidden');
      moduleStepThree.classList.add('hidden');
      e.preventDefault();
    });
    e.preventDefault();
  }); // Viber clicked

  viberBtn.addEventListener('click', function (e) {
    if (moduleQuestionTextarea.value === '') {
      moduleQuestionTextarea.classList.add('bg-danger');
      moduleQuestionTextarea.focus();
      moduleQuestionTextarea.addEventListener('keyup', function highlightBgDanger(e) {
        e.target.value !== '' ? moduleQuestionTextarea.classList.remove('bg-danger') : moduleQuestionTextarea.classList.add('bg-danger');
      });
    } else {
      moduleStepOne.classList.add('hidden');
      moduleStepTwo.classList.remove('hidden');
      moduleStepTwoTitle.innerHTML = 'Viber';
    } // Viber -> Call clicked


    moduleBtnCall.addEventListener('click', function (e) {
      moduleStepThree.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');
      moduleStepThreeTitle.innerHTML = 'Viber / Позвонить';
      moduleLabelEnterContactInfo.innerHTML = 'Напишите свой номер';
      moduleInputContactInfo.focus();
      e.preventDefault();
    }); // Viber -> Message clicked

    moduleBtnMessage.addEventListener('click', function (e) {
      moduleStepThree.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');
      moduleStepThreeTitle.innerHTML = 'Viber / Написать';
      moduleLabelEnterContactInfo.innerHTML = 'Напишите свой номер';
      moduleInputContactInfo.focus();
      e.preventDefault();
    }); // Step 2 -> Arrow back

    moduleStepTwoArrowBack.addEventListener('click', function (e) {
      moduleStepOne.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');
      e.preventDefault();
    }); // Step 3 -> Arrow Back

    moduleStepThreeArrowBack.addEventListener('click', function (e) {
      moduleStepTwo.classList.remove('hidden');
      moduleStepOne.classList.add('hidden');
      moduleStepThree.classList.add('hidden');
      e.preventDefault();
    });
    e.preventDefault();
  }); // Vk clicked

  vkBtn.addEventListener('click', function (e) {
    if (moduleQuestionTextarea.value === '') {
      moduleQuestionTextarea.classList.add('bg-danger');
      moduleQuestionTextarea.focus();
      moduleQuestionTextarea.addEventListener('keyup', function highlightBgDanger(e) {
        e.target.value !== '' ? moduleQuestionTextarea.classList.remove('bg-danger') : moduleQuestionTextarea.classList.add('bg-danger');
      });
    } else {
      moduleStepOne.classList.add('hidden');
      moduleStepTwo.classList.remove('hidden');
      moduleStepTwoTitle.innerHTML = 'VK';
    } // VK -> Call clicked


    moduleBtnCall.addEventListener('click', function (e) {
      moduleStepThree.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');
      moduleStepThreeTitle.innerHTML = 'VK / Позвонить';
      moduleLabelEnterContactInfo.innerHTML = 'Напишите свой номер';
      moduleInputContactInfo.focus();
      e.preventDefault();
    }); // VK -> Message clicked

    moduleBtnMessage.addEventListener('click', function (e) {
      moduleStepThree.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');
      moduleStepThreeTitle.innerHTML = 'VK / Написать';
      moduleLabelEnterContactInfo.innerHTML = 'Напишите свой номер';
      moduleInputContactInfo.focus();
      e.preventDefault();
    }); // Step 2 -> Arrow back

    moduleStepTwoArrowBack.addEventListener('click', function (e) {
      moduleStepOne.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');
      e.preventDefault();
    }); // Step 3 -> Arrow Back

    moduleStepThreeArrowBack.addEventListener('click', function (e) {
      moduleStepTwo.classList.remove('hidden');
      moduleStepOne.classList.add('hidden');
      moduleStepThree.classList.add('hidden');
      e.preventDefault();
    });
    e.preventDefault();
  }); // Phone button clicked

  phoneBtn.addEventListener('click', function (e) {
    if (moduleQuestionTextarea.value === '') {
      moduleQuestionTextarea.classList.add('bg-danger');
      moduleQuestionTextarea.focus();
      moduleQuestionTextarea.addEventListener('keyup', function highlightBgDanger(e) {
        e.target.value !== '' ? moduleQuestionTextarea.classList.remove('bg-danger') : moduleQuestionTextarea.classList.add('bg-danger');
      });
    } else {
      moduleStepOne.classList.add('hidden');
      moduleStepThree.classList.remove('hidden');
      moduleStepThreeTitle.innerHTML = 'Позвонить';
      moduleLabelEnterContactInfo.innerHTML = 'Напишите свой номер';
      moduleInputContactInfo.focus();
    } // Step 3 -> Arrow Back


    moduleStepThreeArrowBack.addEventListener('click', function (e) {
      moduleStepOne.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');
      moduleStepThree.classList.add('hidden');
      e.preventDefault();
    });
    e.preventDefault();
  }); // Email button clicked

  emailBtn.addEventListener('click', function (e) {
    if (moduleQuestionTextarea.value === '') {
      moduleQuestionTextarea.classList.add('bg-danger');
      moduleQuestionTextarea.focus();
      moduleQuestionTextarea.addEventListener('keyup', function highlightBgDanger(e) {
        e.target.value !== '' ? moduleQuestionTextarea.classList.remove('bg-danger') : moduleQuestionTextarea.classList.add('bg-danger');
      });
    } else {
      moduleStepOne.classList.add('hidden');
      moduleStepThree.classList.remove('hidden');
      moduleStepThreeTitle.innerHTML = 'Написать';
      moduleLabelEnterContactInfo.innerHTML = 'Напишите свой e-mail';
      moduleInputContactInfo.placeholder = 'example@gmail.com';
      moduleInputContactInfo.type = 'email';
      moduleInputContactInfo.focus();
    } // Step 3 -> Arrow Back


    moduleStepThreeArrowBack.addEventListener('click', function (e) {
      moduleStepOne.classList.remove('hidden');
      moduleStepTwo.classList.add('hidden');
      moduleStepThree.classList.add('hidden');
      e.preventDefault();
    });
    e.preventDefault();
  }); // Submit btn clicked

  moduleBtnSubmit.addEventListener('click', function submitQuestionModule(e) {
    if (moduleInputContactInfo.type === 'email') {
      // todo: validate email
      if (moduleInputContactInfo.value === '') {
        moduleInputContactInfo.classList.add('bg-danger');
        setTimeout(function () {
          moduleInputContactInfo.classList.remove('bg-danger');
        }, 1500);
      } else {
        moduleStepThree.classList.add('hidden');
        moduleStepTwo.classList.add('hidden');
        moduleStepOne.classList.add('hidden');
        moduleStepSuccess.classList.remove('hidden');
        window.history.pushState({
          page_id: 6
        }, '', '?thankyou=question'); // Submit

        var question = moduleQuestionTextarea.value.trim();
        var contactWay = moduleStepThreeTitle.innerText.trim();
        var contact = moduleInputContactInfo.value.trim(); // const googleClientId = ga.getAll()[0].get('clientId');

        var googleClientId = '-';
        var number;
        var double;
        var data = {
          number: number,
          question: question,
          contactWay: contactWay,
          contact: contact,
          userCity: userCity,
          userCountry: userCountry,
          googleClientId: googleClientId,
          userDevice: userDevice,
          utmSource: utmSource,
          utmMedium: utmMedium,
          utmCampaign: utmCampaign,
          utmContent: utmContent,
          utmTerm: utmTerm,
          double: double
        };

        if (data.contact !== '' && data.contact !== null && !data.contact.includes('@')) {
          data.number = data.contact;
          data.contact = '-';
        }

        sumbitData(data);
        setTimeout(function () {
          moduleStepSuccess.classList.add('hidden');
          btnAskQuestion.classList.remove('hidden'); // console.log(sectionAskQuestionsInner.innerHTM);

          oneMoreQuestionText.innerText = 'ещё один';
          var sectionAskQuestionInnerSaver = sectionAskQuestionsInner.innerHTML; // console.log(sectionAskQuestionInnerSaver);

          sectionAskQuestionsInner.innerHTML = 'Спасибо! Мы с вами свяжемся!';
          setTimeout(function () {
            sectionAskQuestionsInner.innerHTML = sectionAskQuestionInnerSaver;
          }, 3000);
          moduleQuestions.classList.add('hidden');
          document.body.classList.remove('dark-overlay'); // document.body.removeEventListener("click", closeQuestionModule);

          moduleBtnSubmit.removeEventListener('click', submitQuestionModule);
        }, 3000);
      }
    } else {
      if (moduleInputContactInfo.value.trim() !== '' && moduleInputContactInfo.value.trim().match(numValidation)) {
        moduleStepThree.classList.add('hidden');
        moduleStepTwo.classList.add('hidden');
        moduleStepOne.classList.add('hidden');
        moduleStepSuccess.classList.remove('hidden');
        window.history.pushState({
          page_id: 7
        }, '', '?thankyou=question');
        moduleStepSuccess.classList.add('showed'); // Submit

        var _question = moduleQuestionTextarea.value.trim();

        var _contactWay = moduleStepThreeTitle.innerText.trim();

        var _contact = moduleInputContactInfo.value.trim(); // const googleClientId = ga.getAll()[0].get('clientId');


        var _googleClientId = '-';

        var _number;

        var _double;

        var _data = {
          number: _number,
          question: _question,
          contactWay: _contactWay,
          contact: _contact,
          userCity: userCity,
          userCountry: userCountry,
          googleClientId: _googleClientId,
          userDevice: userDevice,
          utmSource: utmSource,
          utmMedium: utmMedium,
          utmCampaign: utmCampaign,
          utmContent: utmContent,
          utmTerm: utmTerm,
          double: _double
        };

        if (_data.contact !== '' && _data.contact !== null && !_data.contact.includes('@')) {
          _data.number = _data.contact;
          _data.contact = '-';
        }

        sumbitData(_data);
        setTimeout(function () {
          moduleStepSuccess.classList.add('hidden');
          btnAskQuestion.classList.remove('hidden');
          moduleStepSuccess.classList.remove('showed'); // console.log(sectionAskQuestionsInner.innerHTM);

          oneMoreQuestionText.innerText = 'ещё один';
          var sectionAskQuestionInnerSaver = sectionAskQuestionsInner.innerHTML; // console.log(sectionAskQuestionInnerSaver);

          sectionAskQuestionsInner.innerHTML = 'Спасибо! Мы с вами свяжемся!';
          setTimeout(function () {
            sectionAskQuestionsInner.innerHTML = sectionAskQuestionInnerSaver;
          }, 3000);
          moduleQuestions.classList.add('hidden');
          document.body.classList.remove('dark-overlay'); // document.body.removeEventListener("click", closeQuestionModule);

          moduleBtnSubmit.removeEventListener('click', submitQuestionModule);
        }, 3000);
      } else {
        moduleInputContactInfo.classList.add('bg-danger');

        if (moduleInputContactInfo.type === 'email') {// todo: validate email
        } else {
          moduleInputContactInfo.addEventListener('keyup', function (e) {
            // console.log("event keyup");
            if (moduleInputContactInfo.value.trim() !== '' && moduleInputContactInfo.value.trim().match(numValidation)) {
              // console.log("correct");
              moduleInputContactInfo.classList.remove('bg-danger');
            } else {
              // console.log("wrong");
              moduleInputContactInfo.classList.add('bg-danger');
            }

            e.preventDefault();
          });
        }
      }
    }

    e.preventDefault();
  });
  e.preventDefault();
}); // Carousel
// const carouselItems = [
//   carouselImgGroupOne,
//   carouselImgGroupTwo,
//   carouselImgGroupThree,
// ];
// Terrible solution for carousel, it works tho
// let i = 0;
// carouselBtnRight.addEventListener('click', (e) => {
//   i > 2 ? (i = 0) : i;
//   i < 0 ? (i = 2) : i;
//   carouselItems[i].classList.add('hidden');
//   carouselItems[i + 1 > 2 ? 0 : i + 1].classList.remove('hidden');
//   carouselItems[i - 1 < 0 ? 2 : i - 1].classList.add('hidden');
//   i++;
//   e.preventDefault();
// });
// Don't look below
// carouselBtnLeft.addEventListener('click', (e) => {
//   i < 0 ? (i = 2) : i;
//   i > 2 ? (i = 0) : i;
//   carouselItems[i].classList.add('hidden');
//   carouselItems[i + 1 > 2 ? 0 : i + 1].classList.add('hidden');
//   carouselItems[i - 1 < 0 ? 2 : i - 1].classList.remove('hidden');
//   i--;
//   e.preventDefault();
// });
// On submit
// ctaSubmitBtn.addEventListener('click', (e) => {
//   const field = inputSelectChooseProgrammInnerText.innerText.trim();
//   const uni = inputSelectChooseUniInnerText.innerText.trim();
//   const number = phoneInputInnerText.value.trim();
//   const userName = userInputNameText.value.trim();
//   // const googleClientId = ga.getAll()[0].get('clientId');
//   const data = {
//     field,
//     uni,
//     number,
//     userName,
//     userCity,
//     userCountry,
//     // googleClientId,
//     userDevice,
//     utmSource,
//     utmMedium,
//     utmCampaign,
//     utmContent,
//     utmTerm,
//   };
//   // console.log(data);
//   // console.log(JSON.stringify(data));
//   // Validate input number
//   if (number !== '' && number.match(numValidation)) {
//     const appIsSumbitted = document.getElementById('js-app-is-submitted');
//     window.history.pushState({'page_id': 8}, '', '?thankyou=main');
//     appIsSumbitted.classList.add('showed');
//     document
//       .getElementById('step-success-row__back-to-main')
//       .addEventListener('click', (e) => {
//         appIsSumbitted.classList.add('removing');
//         setTimeout(() => {
//           appIsSumbitted.classList.remove('showed');
//           appIsSumbitted.classList.remove('removing');
//         }, 300);
//         e.preventDefault();
//       });
//     // console.log("correct");
//     sumbitData(data);
//   } else {
//     phoneInputInnerText.classList.add('bg-danger');
//     // console.log("wrong");
//     phoneInputInnerText.addEventListener('keyup', (e) => {
//       // console.log("event keyup");
//       if (
//         phoneInputInnerText.value.trim() !== '' &&
//         phoneInputInnerText.value.trim().match(numValidation)
//       ) {
//         // console.log("correct");
//         phoneInputInnerText.classList.remove('bg-danger');
//       } else {
//         // console.log("wrong");
//         phoneInputInnerText.classList.add('bg-danger');
//       }
//       e.preventDefault();
//     });
//   }
//   e.preventDefault();
// });
// phoneInputInnerText.addEventListener('input', (e) => {
//   const number = phoneInputInnerText.value.trim();
//   // Validate input number
//   if (number !== '' && number.match(numValidation) && number.length >= 3) {
//     // console.log(number.length);
//     userNameInput.classList.add('showed');
//   }
// });
// phoneInputInnerText.addEventListener('click', (e) => {
//   const containerInputPhoneNum = document.getElementById(
//     'container-input-phone-num'
//   );
//   if (document.body.clientWidth < 768) {
//     containerInputPhoneNum.scrollIntoView({
//       behavior: 'smooth',
//     });
//   }
// });
// Pop up btns

function showPopUp() {
  var button = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var buttonSelected = document.getElementById(button);
  buttonSelected.addEventListener('click', function (e) {
    var popupFormTitle = document.getElementById('pop-up-form-title');
    var popupFormInfo = document.getElementById('popup-form-info');
    var popUpFormSubmit = document.getElementById('pop-up-form-submit');

    switch (button) {
      case 'learn-more-btn':
        // console.log('Узнайте подробнее о вузах');
        popupFormTitle.innerHTML = 'Узнайте больше о наших вузах-партнерах';
        popupFormInfo.innerHTML = 'Оставьте свои контакты, консультант приемной комиссии подробно расскажет Вам о вузах и подберет программу!';
        popUpFormSubmit.dataset.form = 'learn-more';
        break;

      case 'js-popup-choose-from-many':
        // console.log('Узнайте о наличии своего направления');
        popupFormTitle.innerHTML = "\u0423\u0437\u043D\u0430\u0439\u0442\u0435 \u043E \u043D\u0430\u043B\u0438\u0447\u0438\u0438 <br />\u0441\u0432\u043E\u0435\u0433\u043E \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F";
        popupFormInfo.innerHTML = 'Оставьте свои контакты, менеджер свяжется с Вами и расcкажет на какие направления сейчас идет набор';
        popUpFormSubmit.dataset.form = 'choose-from-many';
        break;

      case 'js-popup-what-to-do':
        // console.log('Узнайте что делать если нет ЕГЭ');
        popupFormInfo.innerHTML = 'Оставьте свои контакты, менеджер свяжется с Вами и расскажет как можно поступить без ЕГЭ и диплома колледжа ';

        if (window.screen.width < 371) {
          popupFormTitle.innerHTML = 'Как поступить без ЕГЭ или диплома колледжа';
        } else {
          popupFormTitle.innerHTML = 'Узнайте, что делать, если нет ЕГЭ и диплома колледжа';
        }

        popUpFormSubmit.dataset.form = 'what-to-do';
        break;

      case 'main-popup-btn':
        // console.log('Узнайте что делать если нет ЕГЭ');
        popupFormTitle.innerHTML = 'Заявка на консультацию';
        popupFormInfo.innerHTML = 'Менеджер расскажет о ВУЗах-партнерах, скидках и подберет программу обучения.';
        popUpFormSubmit.dataset.form = 'main';
        break;

      case 'show-pop-up-bottom-mobile':
        // console.log('Узнайте что делать если нет ЕГЭ');
        popupFormTitle.innerHTML = 'Заявка на консультацию';
        popupFormInfo.innerHTML = 'Менеджер расскажет о ВУЗах-партнерах, скидках и подберет программу обучения.';
        popUpFormSubmit.dataset.form = 'main';
        break;

      default:
        return;
    }

    showPopUpContant();
    submitPopUpForm();
    closePopUpContant();
    e.preventDefault();
  });
}

showPopUp('show-pop-up-bottom-mobile');
showPopUp('main-popup-btn');
showPopUp('learn-more-btn');
showPopUp('js-popup-choose-from-many');
showPopUp('js-popup-what-to-do');

function showPopUpContant() {
  var moduleForm = document.getElementById('module-popup-form');
  moduleForm.classList.add('show');
  btnAskQuestion.classList.add('hidden');
}

function closePopUpContant() {
  var moduleForm = document.getElementById('module-popup-form');
  var popUpForm = document.getElementById('pop-up-form');
  var learnMoreBtn = document.getElementById('learn-more-btn');
  var learnMoreBtn2 = document.getElementById('js-popup-choose-from-many');
  var learnMoreBtn3 = document.getElementById('js-popup-what-to-do');
  var learnMoreBtn4 = document.getElementById('main-popup-btn');
  var learnMoreBtn5 = document.getElementById('show-pop-up-bottom-mobile');
  document.body.addEventListener('click', function closePopUpContactEvent(e) {
    // console.log(e.target);
    if (moduleForm.classList.contains('show') && e.target !== popUpForm && !popUpForm.contains(e.target) && e.target !== learnMoreBtn && !learnMoreBtn.contains(e.target) && e.target !== learnMoreBtn2 && !learnMoreBtn2.contains(e.target) && e.target !== learnMoreBtn3 && !learnMoreBtn3.contains(e.target) && e.target !== learnMoreBtn4 && !learnMoreBtn4.contains(e.target) && e.target !== learnMoreBtn5 && !learnMoreBtn5.contains(e.target)) {
      // console.log(e.target);
      moduleForm.classList.remove('show');
      btnAskQuestion.classList.remove('hidden');
      document.body.removeEventListener('click', closePopUpContactEvent);
    }
  });
} // function showMorePartnersDesktop(){
//   const partnersSecondRow = document.querySelector('.section-trust-boost .content__img-group:nth-child(2)')
//   if(document.body.clientWidth > 768){
//     partnersSecondRow.classList.remove('hidden');
//   }else{
//     partnersSecondRow.classList.add('hidden');
//   };
//   window.addEventListener('resize', () => {
//     if(document.body.clientWidth > 768){
//       partnersSecondRow.classList.remove('hidden');
//     }else{
//       partnersSecondRow.classList.add('hidden');
//     };
//   })
// }
// showMorePartnersDesktop();
// Submit Data from Forms


function submitPopUpForm() {
  var popUpFormSubmit = document.getElementById('pop-up-form-submit');
  var moduleForm = document.getElementById('module-popup-form');
  popUpFormSubmit.addEventListener('click', function (e) {
    e.preventDefault(); // Submit

    var userName = document.getElementById('pop-up-form-name').value.trim();
    var userNameEl = document.getElementById('pop-up-form-name');
    var number = document.getElementById('pop-up-form-number').value.trim();
    var numberEl = document.getElementById('pop-up-form-number'); // const googleClientId = ga.getAll()[0].get('clientId');

    var googleClientId = '-';
    var question = '';
    var double = checkForUniqueUserNum();
    console.log(checkForUniqueUserNum());
    console.log(double);

    if (popUpFormSubmit.dataset.form === 'choose-from-many') {
      question = 'Огромный выбор специальностей';
    } else if (popUpFormSubmit.dataset.form === 'learn-more') {
      question = 'Узнайте подробнее о ВУЗах';
    } else if (popUpFormSubmit.dataset.form === 'what-to-do') {
      question = 'Нет ЕГЭ или диплома колледжа?';
    } else if (popUpFormSubmit.dataset.form === 'main') {
      question = 'Главная';
    }

    var data = {
      number: number,
      question: question,
      userName: userName,
      userCity: userCity,
      userCountry: userCountry,
      googleClientId: googleClientId,
      userDevice: userDevice,
      utmSource: utmSource,
      utmMedium: utmMedium,
      utmCampaign: utmCampaign,
      utmContent: utmContent,
      utmTerm: utmTerm,
      double: double
    };

    if (number !== '' && number !== null && number !== undefined && number.match(numValidation)) {
      var appIsSumbitted = document.getElementById('js-app-is-submitted--learn-more'); // const popUpFormSubmit = document.getElementById('pop-up-form-submit');

      if (popUpFormSubmit.dataset.form === 'choose-from-many') {
        // appIsSumbitted.id = 'popup--is-submitted-choose-from-many';
        window.history.pushState({
          page_id: 1
        }, '', '?thankyou=choose-from-many');
      } else if (popUpFormSubmit.dataset.form === 'learn-more') {
        // appIsSumbitted.id = 'popup--is-submitted-learn-more';
        window.history.pushState({
          page_id: 2
        }, '', '?thankyou=learn-more');
      } else if (popUpFormSubmit.dataset.form === 'what-to-do') {
        // appIsSumbitted.id = 'popup--is-submitted-what-to-do';
        window.history.pushState({
          page_id: 3
        }, '', '?thankyou=what-to-do');
      } else if (popUpFormSubmit.dataset.form === 'main') {
        // appIsSumbitted.id = 'popup--is-submitted-main';
        window.history.pushState({
          page_id: 9
        }, '', '?thankyou=main');
      }

      appIsSumbitted.classList.add('showed');
      document.getElementById('step-success-row__back-to-main--form-popup').addEventListener('click', function (e) {
        // appIsSumbitted.id = 'js-app-is-submitted--learn-more';
        appIsSumbitted.classList.add('removing');
        setTimeout(function () {
          appIsSumbitted.classList.remove('showed');
          appIsSumbitted.classList.remove('removing');
        }, 300);
        e.preventDefault();
      });
      var success = document.getElementById('module-popup-is-submitted');
      success.classList.remove('hidden');
      sumbitData(data);
      moduleForm.classList.remove('show');
      userNameEl.value = '';
      numberEl.value = '';
    } else {
      numberEl.classList.add('bg-danger');
      numberEl.focus();
      numberEl.addEventListener('keyup', function (e) {
        e.target.value !== '' ? numberEl.classList.remove('bg-danger') : numberEl.classList.add('bg-danger');
      });
    }
  });
}

function submitContactForm() {
  var popUpFormSubmit = document.getElementById('submit-btn-contact-form');
  popUpFormSubmit.addEventListener('click', function (e) {
    e.preventDefault(); // Submit

    var userName = document.getElementById('user-name-contact-from').value.trim();
    var userNameEl = document.getElementById('user-name-contact-from');
    var number = document.getElementById('number-contact-form').value.trim();
    var numberEl = document.getElementById('number-contact-form'); // const googleClientId = ga.getAll()[0].get('clientId');

    var googleClientId = '-';
    var double;
    var question = 'Возникли вопросы? Поможем!';
    var data = {
      number: number,
      question: question,
      userName: userName,
      userCity: userCity,
      userCountry: userCountry,
      googleClientId: googleClientId,
      userDevice: userDevice,
      utmSource: utmSource,
      utmMedium: utmMedium,
      utmCampaign: utmCampaign,
      utmContent: utmContent,
      utmTerm: utmTerm,
      double: double
    };

    if (number !== '' && number !== null && number !== undefined && number.match(numValidation)) {
      var success = document.getElementById('footer-form-is-submitted');
      success.classList.remove('hidden');
      sumbitData(data);
      numberEl.value = '';
      userNameEl.value = '';
      window.history.pushState({
        page_id: 5
      }, '', '?thankyou=question');
    } else {
      numberEl.classList.add('bg-danger');
      numberEl.focus();
      numberEl.addEventListener('keyup', function (e) {
        e.target.value !== '' ? numberEl.classList.remove('bg-danger') : numberEl.classList.add('bg-danger');
      });
    }
  });
}

submitContactForm(); // AreThereQuestions

function submitQuestionsForm() {
  var popUpFormSubmit = document.getElementById('submit-btn-contact-form-are-there-questions');
  popUpFormSubmit.addEventListener('click', function (e) {
    e.preventDefault(); // Submit

    var userName = document.getElementById('user-name-are-there-questions').value.trim();
    var userNameEl = document.getElementById('user-name-are-there-questions');
    var number = document.getElementById('phone-are-there-questions').value.trim();
    var numberEl = document.getElementById('phone-are-there-questions'); // const googleClientId = ga.getAll()[0].get('clientId');

    var googleClientId = '-';
    var question = 'Возникли вопросы? Поможем!';
    var double;
    var data = {
      number: number,
      question: question,
      userName: userName,
      userCity: userCity,
      userCountry: userCountry,
      googleClientId: googleClientId,
      userDevice: userDevice,
      utmSource: utmSource,
      utmMedium: utmMedium,
      utmCampaign: utmCampaign,
      utmContent: utmContent,
      utmTerm: utmTerm,
      double: double
    };

    if (number !== '' && number !== null && number !== undefined && number.match(numValidation)) {
      var success = document.getElementById('are-there-questions-form-is-submitted');
      success.classList.remove('hidden');
      sumbitData(data);
      numberEl.value = '';
      userNameEl.value = '';
      window.history.pushState({
        page_id: 4
      }, '', '?thankyou=question');
    } else {
      numberEl.classList.add('bg-danger');
      numberEl.focus();
      numberEl.addEventListener('keyup', function (e) {
        e.target.value !== '' ? numberEl.classList.remove('bg-danger') : numberEl.classList.add('bg-danger');
      });
    }
  });
}

submitQuestionsForm(); // Hide ask question on the top of the page and on the bottom of the page

btnAskQuestion.classList.add('hidden');
document.addEventListener('scroll', function (e) {
  var popUpForm = document.getElementById('module-popup-form'); // moduleQuestions
  // console.log(window.scrollY);

  if (moduleQuestions.classList.contains('hidden') && !popUpForm.classList.contains('show') && menuToggler.checked === false) {
    // if (window.scrollY >= 300)
    // {
    //   btnAskQuestion.classList.remove('hidden');
    // }else{
    //   btnAskQuestion.classList.add('hidden');
    // }
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 500 || window.scrollY < 300) {
      btnAskQuestion.classList.add('hidden');
    } else {
      btnAskQuestion.classList.remove('hidden');
    }
  }
});
var crossPopUpModule = document.getElementById('cross-close-popup-form');
crossPopUpModule.addEventListener('click', function () {
  document.getElementById('module-popup-form').classList.remove('show');
});

function retractableItems() {
  var titles = (0, _from.default)(document.querySelectorAll('.section__content .step__title'));
  titles[0].nextElementSibling.classList.add('show');
  titles.forEach(function (title, index) {
    index === 0 ? (0, _from.default)(title.childNodes[1].childNodes)[1].classList.add('show') : (0, _from.default)(title.childNodes[1].childNodes)[3].classList.add('show');
    title.addEventListener('click', function () {
      if (title.nextElementSibling.classList.contains('show')) {
        title.nextElementSibling.classList.remove('show'); // arrow up

        (0, _from.default)(title.childNodes[1].childNodes)[1].classList.remove('show'); // arrow down

        (0, _from.default)(title.childNodes[1].childNodes)[3].classList.add('show');
      } else {
        title.nextElementSibling.classList.add('show'); // arrow up

        (0, _from.default)(title.childNodes[1].childNodes)[1].classList.add('show'); // arrow down

        (0, _from.default)(title.childNodes[1].childNodes)[3].classList.remove('show');
      }
    });
  });
}

retractableItems() // Swiper

/*!
 * swiped-events.js - v@version@
 * Pure JavaScript swipe events
 * https://github.com/john-doherty/swiped-events
 * @inspiration https://stackoverflow.com/questions/16348031/disable-scrolling-when-touch-moving-certain-element
 * @author John Doherty <www.johndoherty.info>
 * @license MIT
 */
;

(function (window, document) {
  'use strict'; // patch CustomEvent to allow constructor creation (IE/Chrome)

  if (typeof window.CustomEvent !== 'function') {
    window.CustomEvent = function (event, params) {
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined
      };
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    };

    window.CustomEvent.prototype = window.Event.prototype;
  }

  document.addEventListener('touchstart', handleTouchStart, false);
  document.addEventListener('touchmove', handleTouchMove, false);
  document.addEventListener('touchend', handleTouchEnd, false);
  var xDown = null;
  var yDown = null;
  var xDiff = null;
  var yDiff = null;
  var timeDown = null;
  var startEl = null;
  /**
   * Fires swiped event if swipe detected on touchend
   * @param {object} e - browser event object
   * @returns {void}
   */

  function handleTouchEnd(e) {
    // if the user released on a different target, cancel!
    if (startEl !== e.target) return;
    var swipeThreshold = (0, _parseInt2.default)(getNearestAttribute(startEl, 'data-swipe-threshold', '20'), 10); // default 20px

    var swipeTimeout = (0, _parseInt2.default)(getNearestAttribute(startEl, 'data-swipe-timeout', '500'), 10); // default 500ms

    var timeDiff = (0, _now.default)() - timeDown;
    var eventType = '';
    var changedTouches = e.changedTouches || e.touches || [];

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      // most significant
      if (Math.abs(xDiff) > swipeThreshold && timeDiff < swipeTimeout) {
        if (xDiff > 0) {
          eventType = 'swiped-left';
        } else {
          eventType = 'swiped-right';
        }
      }
    } else if (Math.abs(yDiff) > swipeThreshold && timeDiff < swipeTimeout) {
      if (yDiff > 0) {
        eventType = 'swiped-up';
      } else {
        eventType = 'swiped-down';
      }
    }

    if (eventType !== '') {
      var eventData = {
        dir: eventType.replace(/swiped-/, ''),
        xStart: (0, _parseInt2.default)(xDown, 10),
        xEnd: (0, _parseInt2.default)((changedTouches[0] || {}).clientX || -1, 10),
        yStart: (0, _parseInt2.default)(yDown, 10),
        yEnd: (0, _parseInt2.default)((changedTouches[0] || {}).clientY || -1, 10)
      }; // fire `swiped` event event on the element that started the swipe

      startEl.dispatchEvent(new CustomEvent('swiped', {
        bubbles: true,
        cancelable: true,
        detail: eventData
      })); // fire `swiped-dir` event on the element that started the swipe

      startEl.dispatchEvent(new CustomEvent(eventType, {
        bubbles: true,
        cancelable: true,
        detail: eventData
      }));
    } // reset values


    xDown = null;
    yDown = null;
    timeDown = null;
  }
  /**
   * Records current location on touchstart event
   * @param {object} e - browser event object
   * @returns {void}
   */


  function handleTouchStart(e) {
    // if the element has data-swipe-ignore="true" we stop listening for swipe events
    if (e.target.getAttribute('data-swipe-ignore') === 'true') return;
    startEl = e.target;
    timeDown = (0, _now.default)();
    xDown = e.touches[0].clientX;
    yDown = e.touches[0].clientY;
    xDiff = 0;
    yDiff = 0;
  }
  /**
   * Records location diff in px on touchmove event
   * @param {object} e - browser event object
   * @returns {void}
   */


  function handleTouchMove(e) {
    if (!xDown || !yDown) return;
    var xUp = e.touches[0].clientX;
    var yUp = e.touches[0].clientY;
    xDiff = xDown - xUp;
    yDiff = yDown - yUp;
  }
  /**
   * Gets attribute off HTML element or nearest parent
   * @param {object} el - HTML element to retrieve attribute from
   * @param {string} attributeName - name of the attribute
   * @param {any} defaultValue - default value to return if no match found
   * @returns {any} attribute value or defaultValue
   */


  function getNearestAttribute(el, attributeName, defaultValue) {
    // walk up the dom tree looking for data-action and data-trigger
    while (el && el !== document.documentElement) {
      var attributeValue = el.getAttribute(attributeName);

      if (attributeValue) {
        return attributeValue;
      }

      el = el.parentNode;
    }

    return defaultValue;
  }
})(window, document); // document.addEventListener('swiped-left', function(e) {
//   // console.log(e.target); // the element that was swiped
//   console.log('Влево');
// });
// document.addEventListener('swiped-right', function(e) {
//   // console.log(e.target); // the element that was swiped
//   console.log('Вправо');
// });


function coolCarousel() {
  var carousel = document.querySelector('.section-trust-boost .content__img-group');
  var i = 0;
  var val = i + 'rem';
  var firstDot = document.querySelector('.nav-dots .nav-dots__dot:nth-child(1)');
  var secondDot = document.querySelector('.nav-dots .nav-dots__dot:nth-child(2)');
  var thirdDot = document.querySelector('.nav-dots .nav-dots__dot:nth-child(3)');
  firstDot.classList.add('active');
  carousel.addEventListener('swiped-right', function (e) {
    var currentRightVal = Number(carousel.style.right.slice(0, -3));

    if (currentRightVal > 0) {
      i -= 8;
      val = i + 'rem';
      carousel.style.right = val;
      console.log(currentRightVal);

      if (currentRightVal < 24) {
        firstDot.classList.add('active');
        secondDot.classList.remove('active');
        thirdDot.classList.remove('active');
      } else if (currentRightVal <= 48) {
        firstDot.classList.remove('active');
        secondDot.classList.add('active');
        thirdDot.classList.remove('active');
      } else {
        firstDot.classList.remove('active');
        secondDot.classList.remove('active');
        thirdDot.classList.add('active');
      }
    }
  });
  carousel.addEventListener('swiped-left', function (e) {
    var currentRightVal = Number(carousel.style.right.slice(0, -3));

    if (currentRightVal < 80) {
      i += 8;
      val = i + 'rem';
      carousel.style.right = val;
      console.log(currentRightVal);

      if (currentRightVal < 24) {
        firstDot.classList.add('active');
        secondDot.classList.remove('active');
        thirdDot.classList.remove('active');
      } else if (currentRightVal <= 48) {
        firstDot.classList.remove('active');
        secondDot.classList.add('active');
        thirdDot.classList.remove('active');
      } else {
        firstDot.classList.remove('active');
        secondDot.classList.remove('active');
        thirdDot.classList.add('active');
      }
    }
  });
}

coolCarousel();
},{"@babel/runtime-corejs2/regenerator":"../node_modules/@babel/runtime-corejs2/regenerator/index.js","@babel/runtime-corejs2/core-js/json/stringify":"../node_modules/@babel/runtime-corejs2/core-js/json/stringify.js","@babel/runtime-corejs2/core-js/date/now":"../node_modules/@babel/runtime-corejs2/core-js/date/now.js","@babel/runtime-corejs2/core-js/parse-int":"../node_modules/@babel/runtime-corejs2/core-js/parse-int.js","@babel/runtime-corejs2/helpers/asyncToGenerator":"../node_modules/@babel/runtime-corejs2/helpers/asyncToGenerator.js","@babel/runtime-corejs2/core-js/array/from":"../node_modules/@babel/runtime-corejs2/core-js/array/from.js","../scss/main.scss":"scss/main.scss"}],"../../../Users/Nover/AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56910" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../Users/Nover/AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map