var Gitment =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var LS_ACCESS_TOKEN_KEY = exports.LS_ACCESS_TOKEN_KEY = 'gitment-comments-token';
var LS_USER_KEY = exports.LS_USER_KEY = 'gitment-user-info';

var NOT_INITIALIZED_ERROR = exports.NOT_INITIALIZED_ERROR = new Error('Comments Not Initialized');

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
registerGlobals();
exports.extras = {
    allowStateChanges: allowStateChanges,
    deepEqual: deepEqual,
    getAtom: getAtom,
    getDebugName: getDebugName,
    getDependencyTree: getDependencyTree,
    getAdministration: getAdministration,
    getGlobalState: getGlobalState,
    getObserverTree: getObserverTree,
    isComputingDerivation: isComputingDerivation,
    isSpyEnabled: isSpyEnabled,
    onReactionError: onReactionError,
    resetGlobalState: resetGlobalState,
    shareGlobalState: shareGlobalState,
    spyReport: spyReport,
    spyReportEnd: spyReportEnd,
    spyReportStart: spyReportStart,
    setReactionScheduler: setReactionScheduler
};
if ((typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === "undefined" ? "undefined" : _typeof(__MOBX_DEVTOOLS_GLOBAL_HOOK__)) === "object") {
    __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx(module.exports);
}
module.exports.default = module.exports;
var actionFieldDecorator = createClassPropertyDecorator(function (target, key, value, args, originalDescriptor) {
    var actionName = args && args.length === 1 ? args[0] : value.name || key || "<unnamed action>";
    var wrappedAction = action(actionName, value);
    addHiddenProp(target, key, wrappedAction);
}, function (key) {
    return this[key];
}, function () {
    invariant(false, getMessage("m001"));
}, false, true);
var boundActionDecorator = createClassPropertyDecorator(function (target, key, value) {
    defineBoundAction(target, key, value);
}, function (key) {
    return this[key];
}, function () {
    invariant(false, getMessage("m001"));
}, false, false);
var action = function action(arg1, arg2, arg3, arg4) {
    if (arguments.length === 1 && typeof arg1 === "function") return createAction(arg1.name || "<unnamed action>", arg1);
    if (arguments.length === 2 && typeof arg2 === "function") return createAction(arg1, arg2);
    if (arguments.length === 1 && typeof arg1 === "string") return namedActionDecorator(arg1);
    return namedActionDecorator(arg2).apply(null, arguments);
};
exports.action = action;
action.bound = function boundAction(arg1, arg2, arg3) {
    if (typeof arg1 === "function") {
        var action_1 = createAction("<not yet bound action>", arg1);
        action_1.autoBind = true;
        return action_1;
    }
    return boundActionDecorator.apply(null, arguments);
};
function namedActionDecorator(name) {
    return function (target, prop, descriptor) {
        if (descriptor && typeof descriptor.value === "function") {
            descriptor.value = createAction(name, descriptor.value);
            descriptor.enumerable = false;
            descriptor.configurable = true;
            return descriptor;
        }
        return actionFieldDecorator(name).apply(this, arguments);
    };
}
function runInAction(arg1, arg2, arg3) {
    var actionName = typeof arg1 === "string" ? arg1 : arg1.name || "<unnamed action>";
    var fn = typeof arg1 === "function" ? arg1 : arg2;
    var scope = typeof arg1 === "function" ? arg2 : arg3;
    invariant(typeof fn === "function", getMessage("m002"));
    invariant(fn.length === 0, getMessage("m003"));
    invariant(typeof actionName === "string" && actionName.length > 0, "actions should have valid names, got: '" + actionName + "'");
    return executeAction(actionName, fn, scope, undefined);
}
exports.runInAction = runInAction;
function isAction(thing) {
    return typeof thing === "function" && thing.isMobxAction === true;
}
exports.isAction = isAction;
function defineBoundAction(target, propertyName, fn) {
    var res = function res() {
        return executeAction(propertyName, fn, target, arguments);
    };
    res.isMobxAction = true;
    addHiddenProp(target, propertyName, res);
}
function autorun(arg1, arg2, arg3) {
    var name, view, scope;
    if (typeof arg1 === "string") {
        name = arg1;
        view = arg2;
        scope = arg3;
    } else {
        name = arg1.name || "Autorun@" + getNextId();
        view = arg1;
        scope = arg2;
    }
    invariant(typeof view === "function", getMessage("m004"));
    invariant(isAction(view) === false, getMessage("m005"));
    if (scope) view = view.bind(scope);
    var reaction = new Reaction(name, function () {
        this.track(reactionRunner);
    });
    function reactionRunner() {
        view(reaction);
    }
    reaction.schedule();
    return reaction.getDisposer();
}
exports.autorun = autorun;
function when(arg1, arg2, arg3, arg4) {
    var name, predicate, effect, scope;
    if (typeof arg1 === "string") {
        name = arg1;
        predicate = arg2;
        effect = arg3;
        scope = arg4;
    } else {
        name = "When@" + getNextId();
        predicate = arg1;
        effect = arg2;
        scope = arg3;
    }
    var disposer = autorun(name, function (r) {
        if (predicate.call(scope)) {
            r.dispose();
            var prevUntracked = untrackedStart();
            effect.call(scope);
            untrackedEnd(prevUntracked);
        }
    });
    return disposer;
}
exports.when = when;
function autorunAsync(arg1, arg2, arg3, arg4) {
    var name, func, delay, scope;
    if (typeof arg1 === "string") {
        name = arg1;
        func = arg2;
        delay = arg3;
        scope = arg4;
    } else {
        name = arg1.name || "AutorunAsync@" + getNextId();
        func = arg1;
        delay = arg2;
        scope = arg3;
    }
    invariant(isAction(func) === false, getMessage("m006"));
    if (delay === void 0) delay = 1;
    if (scope) func = func.bind(scope);
    var isScheduled = false;
    var r = new Reaction(name, function () {
        if (!isScheduled) {
            isScheduled = true;
            setTimeout(function () {
                isScheduled = false;
                if (!r.isDisposed) r.track(reactionRunner);
            }, delay);
        }
    });
    function reactionRunner() {
        func(r);
    }
    r.schedule();
    return r.getDisposer();
}
exports.autorunAsync = autorunAsync;
function reaction(expression, effect, arg3) {
    if (arguments.length > 3) {
        fail(getMessage("m007"));
    }
    if (isModifierDescriptor(expression)) {
        fail(getMessage("m008"));
    }
    var opts;
    if ((typeof arg3 === "undefined" ? "undefined" : _typeof(arg3)) === "object") {
        opts = arg3;
    } else {
        opts = {};
    }
    opts.name = opts.name || expression.name || effect.name || "Reaction@" + getNextId();
    opts.fireImmediately = arg3 === true || opts.fireImmediately === true;
    opts.delay = opts.delay || 0;
    opts.compareStructural = opts.compareStructural || opts.struct || false;
    effect = action(opts.name, opts.context ? effect.bind(opts.context) : effect);
    if (opts.context) {
        expression = expression.bind(opts.context);
    }
    var firstTime = true;
    var isScheduled = false;
    var nextValue;
    var r = new Reaction(opts.name, function () {
        if (firstTime || opts.delay < 1) {
            reactionRunner();
        } else if (!isScheduled) {
            isScheduled = true;
            setTimeout(function () {
                isScheduled = false;
                reactionRunner();
            }, opts.delay);
        }
    });
    function reactionRunner() {
        if (r.isDisposed) return;
        var changed = false;
        r.track(function () {
            var v = expression(r);
            changed = valueDidChange(opts.compareStructural, nextValue, v);
            nextValue = v;
        });
        if (firstTime && opts.fireImmediately) effect(nextValue, r);
        if (!firstTime && changed === true) effect(nextValue, r);
        if (firstTime) firstTime = false;
    }
    r.schedule();
    return r.getDisposer();
}
exports.reaction = reaction;
function createComputedDecorator(compareStructural) {
    return createClassPropertyDecorator(function (target, name, _, __, originalDescriptor) {
        invariant(typeof originalDescriptor !== "undefined", getMessage("m009"));
        invariant(typeof originalDescriptor.get === "function", getMessage("m010"));
        var adm = asObservableObject(target, "");
        defineComputedProperty(adm, name, originalDescriptor.get, originalDescriptor.set, compareStructural, false);
    }, function (name) {
        var observable = this.$mobx.values[name];
        if (observable === undefined) return undefined;
        return observable.get();
    }, function (name, value) {
        this.$mobx.values[name].set(value);
    }, false, false);
}
var computedDecorator = createComputedDecorator(false);
var computedStructDecorator = createComputedDecorator(true);
var computed = function computed(arg1, arg2, arg3) {
    if (typeof arg2 === "string") {
        return computedDecorator.apply(null, arguments);
    }
    invariant(typeof arg1 === "function", getMessage("m011"));
    invariant(arguments.length < 3, getMessage("m012"));
    var opts = (typeof arg2 === "undefined" ? "undefined" : _typeof(arg2)) === "object" ? arg2 : {};
    opts.setter = typeof arg2 === "function" ? arg2 : opts.setter;
    return new ComputedValue(arg1, opts.context, opts.compareStructural || opts.struct || false, opts.name || arg1.name || "", opts.setter);
};
exports.computed = computed;
computed.struct = computedStructDecorator;
function createTransformer(transformer, onCleanup) {
    invariant(typeof transformer === "function" && transformer.length < 2, "createTransformer expects a function that accepts one argument");
    var objectCache = {};
    var resetId = globalState.resetId;
    var Transformer = function (_super) {
        __extends(Transformer, _super);
        function Transformer(sourceIdentifier, sourceObject) {
            var _this = _super.call(this, function () {
                return transformer(sourceObject);
            }, undefined, false, "Transformer-" + transformer.name + "-" + sourceIdentifier, undefined) || this;
            _this.sourceIdentifier = sourceIdentifier;
            _this.sourceObject = sourceObject;
            return _this;
        }
        Transformer.prototype.onBecomeUnobserved = function () {
            var lastValue = this.value;
            _super.prototype.onBecomeUnobserved.call(this);
            delete objectCache[this.sourceIdentifier];
            if (onCleanup) onCleanup(lastValue, this.sourceObject);
        };
        return Transformer;
    }(ComputedValue);
    return function (object) {
        if (resetId !== globalState.resetId) {
            objectCache = {};
            resetId = globalState.resetId;
        }
        var identifier = getMemoizationId(object);
        var reactiveTransformer = objectCache[identifier];
        if (reactiveTransformer) return reactiveTransformer.get();
        reactiveTransformer = objectCache[identifier] = new Transformer(identifier, object);
        return reactiveTransformer.get();
    };
}
exports.createTransformer = createTransformer;
function getMemoizationId(object) {
    if (object === null || (typeof object === "undefined" ? "undefined" : _typeof(object)) !== "object") throw new Error("[mobx] transform expected some kind of object, got: " + object);
    var tid = object.$transformId;
    if (tid === undefined) {
        tid = getNextId();
        addHiddenProp(object, "$transformId", tid);
    }
    return tid;
}
function expr(expr, scope) {
    if (!isComputingDerivation()) console.warn(getMessage("m013"));
    return computed(expr, { context: scope }).get();
}
exports.expr = expr;
function extendObservable(target) {
    var properties = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        properties[_i - 1] = arguments[_i];
    }
    return extendObservableHelper(target, deepEnhancer, properties);
}
exports.extendObservable = extendObservable;
function extendShallowObservable(target) {
    var properties = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        properties[_i - 1] = arguments[_i];
    }
    return extendObservableHelper(target, referenceEnhancer, properties);
}
exports.extendShallowObservable = extendShallowObservable;
function extendObservableHelper(target, defaultEnhancer, properties) {
    invariant(arguments.length >= 2, getMessage("m014"));
    invariant((typeof target === "undefined" ? "undefined" : _typeof(target)) === "object", getMessage("m015"));
    invariant(!isObservableMap(target), getMessage("m016"));
    properties.forEach(function (propSet) {
        invariant((typeof propSet === "undefined" ? "undefined" : _typeof(propSet)) === "object", getMessage("m017"));
        invariant(!isObservable(propSet), getMessage("m018"));
    });
    var adm = asObservableObject(target);
    var definedProps = {};
    for (var i = properties.length - 1; i >= 0; i--) {
        var propSet = properties[i];
        for (var key in propSet) {
            if (definedProps[key] !== true && hasOwnProperty(propSet, key)) {
                definedProps[key] = true;
                if (target === propSet && !isPropertyConfigurable(target, key)) continue;
                var descriptor = Object.getOwnPropertyDescriptor(propSet, key);
                defineObservablePropertyFromDescriptor(adm, key, descriptor, defaultEnhancer);
            }
        }
    }
    return target;
}
function getDependencyTree(thing, property) {
    return nodeToDependencyTree(getAtom(thing, property));
}
function nodeToDependencyTree(node) {
    var result = {
        name: node.name
    };
    if (node.observing && node.observing.length > 0) result.dependencies = unique(node.observing).map(nodeToDependencyTree);
    return result;
}
function getObserverTree(thing, property) {
    return nodeToObserverTree(getAtom(thing, property));
}
function nodeToObserverTree(node) {
    var result = {
        name: node.name
    };
    if (hasObservers(node)) result.observers = getObservers(node).map(nodeToObserverTree);
    return result;
}
function intercept(thing, propOrHandler, handler) {
    if (typeof handler === "function") return interceptProperty(thing, propOrHandler, handler);else return interceptInterceptable(thing, propOrHandler);
}
exports.intercept = intercept;
function interceptInterceptable(thing, handler) {
    return getAdministration(thing).intercept(handler);
}
function interceptProperty(thing, property, handler) {
    return getAdministration(thing, property).intercept(handler);
}
function isComputed(value, property) {
    if (value === null || value === undefined) return false;
    if (property !== undefined) {
        if (isObservableObject(value) === false) return false;
        var atom = getAtom(value, property);
        return isComputedValue(atom);
    }
    return isComputedValue(value);
}
exports.isComputed = isComputed;
function isObservable(value, property) {
    if (value === null || value === undefined) return false;
    if (property !== undefined) {
        if (isObservableArray(value) || isObservableMap(value)) throw new Error(getMessage("m019"));else if (isObservableObject(value)) {
            var o = value.$mobx;
            return o.values && !!o.values[property];
        }
        return false;
    }
    return isObservableObject(value) || !!value.$mobx || isAtom(value) || isReaction(value) || isComputedValue(value);
}
exports.isObservable = isObservable;
var deepDecorator = createDecoratorForEnhancer(deepEnhancer);
var shallowDecorator = createDecoratorForEnhancer(shallowEnhancer);
var refDecorator = createDecoratorForEnhancer(referenceEnhancer);
var deepStructDecorator = createDecoratorForEnhancer(deepStructEnhancer);
var refStructDecorator = createDecoratorForEnhancer(refStructEnhancer);
function createObservable(v) {
    if (v === void 0) {
        v = undefined;
    }
    if (typeof arguments[1] === "string") return deepDecorator.apply(null, arguments);
    invariant(arguments.length <= 1, getMessage("m021"));
    invariant(!isModifierDescriptor(v), getMessage("m020"));
    if (isObservable(v)) return v;
    var res = deepEnhancer(v, undefined, undefined);
    if (res !== v) return res;
    return observable.box(v);
}
var IObservableFactories = function () {
    function IObservableFactories() {}
    IObservableFactories.prototype.box = function (value, name) {
        if (arguments.length > 2) incorrectlyUsedAsDecorator("box");
        return new ObservableValue(value, deepEnhancer, name);
    };
    IObservableFactories.prototype.shallowBox = function (value, name) {
        if (arguments.length > 2) incorrectlyUsedAsDecorator("shallowBox");
        return new ObservableValue(value, referenceEnhancer, name);
    };
    IObservableFactories.prototype.array = function (initialValues, name) {
        if (arguments.length > 2) incorrectlyUsedAsDecorator("array");
        return new ObservableArray(initialValues, deepEnhancer, name);
    };
    IObservableFactories.prototype.shallowArray = function (initialValues, name) {
        if (arguments.length > 2) incorrectlyUsedAsDecorator("shallowArray");
        return new ObservableArray(initialValues, referenceEnhancer, name);
    };
    IObservableFactories.prototype.map = function (initialValues, name) {
        if (arguments.length > 2) incorrectlyUsedAsDecorator("map");
        return new ObservableMap(initialValues, deepEnhancer, name);
    };
    IObservableFactories.prototype.shallowMap = function (initialValues, name) {
        if (arguments.length > 2) incorrectlyUsedAsDecorator("shallowMap");
        return new ObservableMap(initialValues, referenceEnhancer, name);
    };
    IObservableFactories.prototype.object = function (props, name) {
        if (arguments.length > 2) incorrectlyUsedAsDecorator("object");
        var res = {};
        asObservableObject(res, name);
        extendObservable(res, props);
        return res;
    };
    IObservableFactories.prototype.shallowObject = function (props, name) {
        if (arguments.length > 2) incorrectlyUsedAsDecorator("shallowObject");
        var res = {};
        asObservableObject(res, name);
        extendShallowObservable(res, props);
        return res;
    };
    IObservableFactories.prototype.ref = function () {
        if (arguments.length < 2) {
            return createModifierDescriptor(referenceEnhancer, arguments[0]);
        } else {
            return refDecorator.apply(null, arguments);
        }
    };
    IObservableFactories.prototype.shallow = function () {
        if (arguments.length < 2) {
            return createModifierDescriptor(shallowEnhancer, arguments[0]);
        } else {
            return shallowDecorator.apply(null, arguments);
        }
    };
    IObservableFactories.prototype.deep = function () {
        if (arguments.length < 2) {
            return createModifierDescriptor(deepEnhancer, arguments[0]);
        } else {
            return deepDecorator.apply(null, arguments);
        }
    };
    IObservableFactories.prototype.struct = function () {
        if (arguments.length < 2) {
            return createModifierDescriptor(deepStructEnhancer, arguments[0]);
        } else {
            return deepStructDecorator.apply(null, arguments);
        }
    };
    return IObservableFactories;
}();
exports.IObservableFactories = IObservableFactories;
var observable = createObservable;
exports.observable = observable;
Object.keys(IObservableFactories.prototype).forEach(function (key) {
    return observable[key] = IObservableFactories.prototype[key];
});
observable.deep.struct = observable.struct;
observable.ref.struct = function () {
    if (arguments.length < 2) {
        return createModifierDescriptor(refStructEnhancer, arguments[0]);
    } else {
        return refStructDecorator.apply(null, arguments);
    }
};
function incorrectlyUsedAsDecorator(methodName) {
    fail("Expected one or two arguments to observable." + methodName + ". Did you accidentally try to use observable." + methodName + " as decorator?");
}
function createDecoratorForEnhancer(enhancer) {
    invariant(!!enhancer, ":(");
    return createClassPropertyDecorator(function (target, name, baseValue, _, baseDescriptor) {
        assertPropertyConfigurable(target, name);
        invariant(!baseDescriptor || !baseDescriptor.get, getMessage("m022"));
        var adm = asObservableObject(target, undefined);
        defineObservableProperty(adm, name, baseValue, enhancer);
    }, function (name) {
        var observable = this.$mobx.values[name];
        if (observable === undefined) return undefined;
        return observable.get();
    }, function (name, value) {
        setPropertyValue(this, name, value);
    }, true, false);
}
function observe(thing, propOrCb, cbOrFire, fireImmediately) {
    if (typeof cbOrFire === "function") return observeObservableProperty(thing, propOrCb, cbOrFire, fireImmediately);else return observeObservable(thing, propOrCb, cbOrFire);
}
exports.observe = observe;
function observeObservable(thing, listener, fireImmediately) {
    return getAdministration(thing).observe(listener, fireImmediately);
}
function observeObservableProperty(thing, property, listener, fireImmediately) {
    return getAdministration(thing, property).observe(listener, fireImmediately);
}
function toJS(source, detectCycles, __alreadySeen) {
    if (detectCycles === void 0) {
        detectCycles = true;
    }
    if (__alreadySeen === void 0) {
        __alreadySeen = [];
    }
    function cache(value) {
        if (detectCycles) __alreadySeen.push([source, value]);
        return value;
    }
    if (isObservable(source)) {
        if (detectCycles && __alreadySeen === null) __alreadySeen = [];
        if (detectCycles && source !== null && (typeof source === "undefined" ? "undefined" : _typeof(source)) === "object") {
            for (var i = 0, l = __alreadySeen.length; i < l; i++) {
                if (__alreadySeen[i][0] === source) return __alreadySeen[i][1];
            }
        }
        if (isObservableArray(source)) {
            var res = cache([]);
            var toAdd = source.map(function (value) {
                return toJS(value, detectCycles, __alreadySeen);
            });
            res.length = toAdd.length;
            for (var i = 0, l = toAdd.length; i < l; i++) {
                res[i] = toAdd[i];
            }return res;
        }
        if (isObservableObject(source)) {
            var res = cache({});
            for (var key in source) {
                res[key] = toJS(source[key], detectCycles, __alreadySeen);
            }return res;
        }
        if (isObservableMap(source)) {
            var res_1 = cache({});
            source.forEach(function (value, key) {
                return res_1[key] = toJS(value, detectCycles, __alreadySeen);
            });
            return res_1;
        }
        if (isObservableValue(source)) return toJS(source.get(), detectCycles, __alreadySeen);
    }
    return source;
}
exports.toJS = toJS;
function transaction(action, thisArg) {
    if (thisArg === void 0) {
        thisArg = undefined;
    }
    deprecated(getMessage("m023"));
    return runInTransaction.apply(undefined, arguments);
}
exports.transaction = transaction;
function runInTransaction(action, thisArg) {
    if (thisArg === void 0) {
        thisArg = undefined;
    }
    return executeAction("", action);
}
function log(msg) {
    console.log(msg);
    return msg;
}
function whyRun(thing, prop) {
    switch (arguments.length) {
        case 0:
            thing = globalState.trackingDerivation;
            if (!thing) return log(getMessage("m024"));
            break;
        case 2:
            thing = getAtom(thing, prop);
            break;
    }
    thing = getAtom(thing);
    if (isComputedValue(thing)) return log(thing.whyRun());else if (isReaction(thing)) return log(thing.whyRun());
    return fail(getMessage("m025"));
}
exports.whyRun = whyRun;
function createAction(actionName, fn) {
    invariant(typeof fn === "function", getMessage("m026"));
    invariant(typeof actionName === "string" && actionName.length > 0, "actions should have valid names, got: '" + actionName + "'");
    var res = function res() {
        return executeAction(actionName, fn, this, arguments);
    };
    res.originalFn = fn;
    res.isMobxAction = true;
    return res;
}
function executeAction(actionName, fn, scope, args) {
    var runInfo = startAction(actionName, fn, scope, args);
    try {
        return fn.apply(scope, args);
    } finally {
        endAction(runInfo);
    }
}
function startAction(actionName, fn, scope, args) {
    var notifySpy = isSpyEnabled() && !!actionName;
    var startTime = 0;
    if (notifySpy) {
        startTime = Date.now();
        var l = args && args.length || 0;
        var flattendArgs = new Array(l);
        if (l > 0) for (var i = 0; i < l; i++) {
            flattendArgs[i] = args[i];
        }spyReportStart({
            type: "action",
            name: actionName,
            fn: fn,
            object: scope,
            arguments: flattendArgs
        });
    }
    var prevDerivation = untrackedStart();
    startBatch();
    var prevAllowStateChanges = allowStateChangesStart(true);
    return {
        prevDerivation: prevDerivation,
        prevAllowStateChanges: prevAllowStateChanges,
        notifySpy: notifySpy,
        startTime: startTime
    };
}
function endAction(runInfo) {
    allowStateChangesEnd(runInfo.prevAllowStateChanges);
    endBatch();
    untrackedEnd(runInfo.prevDerivation);
    if (runInfo.notifySpy) spyReportEnd({ time: Date.now() - runInfo.startTime });
}
function useStrict(strict) {
    invariant(globalState.trackingDerivation === null, getMessage("m028"));
    globalState.strictMode = strict;
    globalState.allowStateChanges = !strict;
}
exports.useStrict = useStrict;
function isStrictModeEnabled() {
    return globalState.strictMode;
}
exports.isStrictModeEnabled = isStrictModeEnabled;
function allowStateChanges(allowStateChanges, func) {
    var prev = allowStateChangesStart(allowStateChanges);
    var res;
    try {
        res = func();
    } finally {
        allowStateChangesEnd(prev);
    }
    return res;
}
function allowStateChangesStart(allowStateChanges) {
    var prev = globalState.allowStateChanges;
    globalState.allowStateChanges = allowStateChanges;
    return prev;
}
function allowStateChangesEnd(prev) {
    globalState.allowStateChanges = prev;
}
var BaseAtom = function () {
    function BaseAtom(name) {
        if (name === void 0) {
            name = "Atom@" + getNextId();
        }
        this.name = name;
        this.isPendingUnobservation = true;
        this.observers = [];
        this.observersIndexes = {};
        this.diffValue = 0;
        this.lastAccessedBy = 0;
        this.lowestObserverState = IDerivationState.NOT_TRACKING;
    }
    BaseAtom.prototype.onBecomeUnobserved = function () {};
    BaseAtom.prototype.reportObserved = function () {
        reportObserved(this);
    };
    BaseAtom.prototype.reportChanged = function () {
        startBatch();
        propagateChanged(this);
        endBatch();
    };
    BaseAtom.prototype.toString = function () {
        return this.name;
    };
    return BaseAtom;
}();
exports.BaseAtom = BaseAtom;
var Atom = function (_super) {
    __extends(Atom, _super);
    function Atom(name, onBecomeObservedHandler, onBecomeUnobservedHandler) {
        if (name === void 0) {
            name = "Atom@" + getNextId();
        }
        if (onBecomeObservedHandler === void 0) {
            onBecomeObservedHandler = noop;
        }
        if (onBecomeUnobservedHandler === void 0) {
            onBecomeUnobservedHandler = noop;
        }
        var _this = _super.call(this, name) || this;
        _this.name = name;
        _this.onBecomeObservedHandler = onBecomeObservedHandler;
        _this.onBecomeUnobservedHandler = onBecomeUnobservedHandler;
        _this.isPendingUnobservation = false;
        _this.isBeingTracked = false;
        return _this;
    }
    Atom.prototype.reportObserved = function () {
        startBatch();
        _super.prototype.reportObserved.call(this);
        if (!this.isBeingTracked) {
            this.isBeingTracked = true;
            this.onBecomeObservedHandler();
        }
        endBatch();
        return !!globalState.trackingDerivation;
    };
    Atom.prototype.onBecomeUnobserved = function () {
        this.isBeingTracked = false;
        this.onBecomeUnobservedHandler();
    };
    return Atom;
}(BaseAtom);
exports.Atom = Atom;
var isAtom = createInstanceofPredicate("Atom", BaseAtom);
var ComputedValue = function () {
    function ComputedValue(derivation, scope, compareStructural, name, setter) {
        this.derivation = derivation;
        this.scope = scope;
        this.compareStructural = compareStructural;
        this.dependenciesState = IDerivationState.NOT_TRACKING;
        this.observing = [];
        this.newObserving = null;
        this.isPendingUnobservation = false;
        this.observers = [];
        this.observersIndexes = {};
        this.diffValue = 0;
        this.runId = 0;
        this.lastAccessedBy = 0;
        this.lowestObserverState = IDerivationState.UP_TO_DATE;
        this.unboundDepsCount = 0;
        this.__mapid = "#" + getNextId();
        this.value = undefined;
        this.isComputing = false;
        this.isRunningSetter = false;
        this.name = name || "ComputedValue@" + getNextId();
        if (setter) this.setter = createAction(name + "-setter", setter);
    }
    ComputedValue.prototype.onBecomeStale = function () {
        propagateMaybeChanged(this);
    };
    ComputedValue.prototype.onBecomeUnobserved = function () {
        invariant(this.dependenciesState !== IDerivationState.NOT_TRACKING, getMessage("m029"));
        clearObserving(this);
        this.value = undefined;
    };
    ComputedValue.prototype.get = function () {
        invariant(!this.isComputing, "Cycle detected in computation " + this.name, this.derivation);
        if (globalState.inBatch === 0) {
            startBatch();
            if (shouldCompute(this)) this.value = this.computeValue(false);
            endBatch();
        } else {
            reportObserved(this);
            if (shouldCompute(this)) if (this.trackAndCompute()) propagateChangeConfirmed(this);
        }
        var result = this.value;
        if (isCaughtException(result)) throw result.cause;
        return result;
    };
    ComputedValue.prototype.peek = function () {
        var res = this.computeValue(false);
        if (isCaughtException(res)) throw res.cause;
        return res;
    };
    ComputedValue.prototype.set = function (value) {
        if (this.setter) {
            invariant(!this.isRunningSetter, "The setter of computed value '" + this.name + "' is trying to update itself. Did you intend to update an _observable_ value, instead of the computed property?");
            this.isRunningSetter = true;
            try {
                this.setter.call(this.scope, value);
            } finally {
                this.isRunningSetter = false;
            }
        } else invariant(false, "[ComputedValue '" + this.name + "'] It is not possible to assign a new value to a computed value.");
    };
    ComputedValue.prototype.trackAndCompute = function () {
        if (isSpyEnabled()) {
            spyReport({
                object: this.scope,
                type: "compute",
                fn: this.derivation
            });
        }
        var oldValue = this.value;
        var newValue = this.value = this.computeValue(true);
        return isCaughtException(newValue) || valueDidChange(this.compareStructural, newValue, oldValue);
    };
    ComputedValue.prototype.computeValue = function (track) {
        this.isComputing = true;
        globalState.computationDepth++;
        var res;
        if (track) {
            res = trackDerivedFunction(this, this.derivation, this.scope);
        } else {
            try {
                res = this.derivation.call(this.scope);
            } catch (e) {
                res = new CaughtException(e);
            }
        }
        globalState.computationDepth--;
        this.isComputing = false;
        return res;
    };
    ;
    ComputedValue.prototype.observe = function (listener, fireImmediately) {
        var _this = this;
        var firstTime = true;
        var prevValue = undefined;
        return autorun(function () {
            var newValue = _this.get();
            if (!firstTime || fireImmediately) {
                var prevU = untrackedStart();
                listener({
                    type: "update",
                    object: _this,
                    newValue: newValue,
                    oldValue: prevValue
                });
                untrackedEnd(prevU);
            }
            firstTime = false;
            prevValue = newValue;
        });
    };
    ComputedValue.prototype.toJSON = function () {
        return this.get();
    };
    ComputedValue.prototype.toString = function () {
        return this.name + "[" + this.derivation.toString() + "]";
    };
    ComputedValue.prototype.valueOf = function () {
        return toPrimitive(this.get());
    };
    ;
    ComputedValue.prototype.whyRun = function () {
        var isTracking = Boolean(globalState.trackingDerivation);
        var observing = unique(this.isComputing ? this.newObserving : this.observing).map(function (dep) {
            return dep.name;
        });
        var observers = unique(getObservers(this).map(function (dep) {
            return dep.name;
        }));
        return "\nWhyRun? computation '" + this.name + "':\n * Running because: " + (isTracking ? "[active] the value of this computation is needed by a reaction" : this.isComputing ? "[get] The value of this computed was requested outside a reaction" : "[idle] not running at the moment") + "\n" + (this.dependenciesState === IDerivationState.NOT_TRACKING ? getMessage("m032") : " * This computation will re-run if any of the following observables changes:\n    " + joinStrings(observing) + "\n    " + (this.isComputing && isTracking ? " (... or any observable accessed during the remainder of the current run)" : "") + "\n\t" + getMessage("m038") + "\n\n  * If the outcome of this computation changes, the following observers will be re-run:\n    " + joinStrings(observers) + "\n");
    };
    return ComputedValue;
}();
ComputedValue.prototype[primitiveSymbol()] = ComputedValue.prototype.valueOf;
var isComputedValue = createInstanceofPredicate("ComputedValue", ComputedValue);
var IDerivationState;
(function (IDerivationState) {
    IDerivationState[IDerivationState["NOT_TRACKING"] = -1] = "NOT_TRACKING";
    IDerivationState[IDerivationState["UP_TO_DATE"] = 0] = "UP_TO_DATE";
    IDerivationState[IDerivationState["POSSIBLY_STALE"] = 1] = "POSSIBLY_STALE";
    IDerivationState[IDerivationState["STALE"] = 2] = "STALE";
})(IDerivationState || (IDerivationState = {}));
exports.IDerivationState = IDerivationState;
var CaughtException = function () {
    function CaughtException(cause) {
        this.cause = cause;
    }
    return CaughtException;
}();
function isCaughtException(e) {
    return e instanceof CaughtException;
}
function shouldCompute(derivation) {
    switch (derivation.dependenciesState) {
        case IDerivationState.UP_TO_DATE:
            return false;
        case IDerivationState.NOT_TRACKING:
        case IDerivationState.STALE:
            return true;
        case IDerivationState.POSSIBLY_STALE:
            {
                var prevUntracked = untrackedStart();
                var obs = derivation.observing,
                    l = obs.length;
                for (var i = 0; i < l; i++) {
                    var obj = obs[i];
                    if (isComputedValue(obj)) {
                        try {
                            obj.get();
                        } catch (e) {
                            untrackedEnd(prevUntracked);
                            return true;
                        }
                        if (derivation.dependenciesState === IDerivationState.STALE) {
                            untrackedEnd(prevUntracked);
                            return true;
                        }
                    }
                }
                changeDependenciesStateTo0(derivation);
                untrackedEnd(prevUntracked);
                return false;
            }
    }
}
function isComputingDerivation() {
    return globalState.trackingDerivation !== null;
}
function checkIfStateModificationsAreAllowed(atom) {
    var hasObservers = atom.observers.length > 0;
    if (globalState.computationDepth > 0 && hasObservers) fail(getMessage("m031") + atom.name);
    if (!globalState.allowStateChanges && hasObservers) fail(getMessage(globalState.strictMode ? "m030a" : "m030b") + atom.name);
}
function trackDerivedFunction(derivation, f, context) {
    changeDependenciesStateTo0(derivation);
    derivation.newObserving = new Array(derivation.observing.length + 100);
    derivation.unboundDepsCount = 0;
    derivation.runId = ++globalState.runId;
    var prevTracking = globalState.trackingDerivation;
    globalState.trackingDerivation = derivation;
    var result;
    try {
        result = f.call(context);
    } catch (e) {
        result = new CaughtException(e);
    }
    globalState.trackingDerivation = prevTracking;
    bindDependencies(derivation);
    return result;
}
function bindDependencies(derivation) {
    var prevObserving = derivation.observing;
    var observing = derivation.observing = derivation.newObserving;
    derivation.newObserving = null;
    var i0 = 0,
        l = derivation.unboundDepsCount;
    for (var i = 0; i < l; i++) {
        var dep = observing[i];
        if (dep.diffValue === 0) {
            dep.diffValue = 1;
            if (i0 !== i) observing[i0] = dep;
            i0++;
        }
    }
    observing.length = i0;
    l = prevObserving.length;
    while (l--) {
        var dep = prevObserving[l];
        if (dep.diffValue === 0) {
            removeObserver(dep, derivation);
        }
        dep.diffValue = 0;
    }
    while (i0--) {
        var dep = observing[i0];
        if (dep.diffValue === 1) {
            dep.diffValue = 0;
            addObserver(dep, derivation);
        }
    }
}
function clearObserving(derivation) {
    var obs = derivation.observing;
    var i = obs.length;
    while (i--) {
        removeObserver(obs[i], derivation);
    }derivation.dependenciesState = IDerivationState.NOT_TRACKING;
    obs.length = 0;
}
function untracked(action) {
    var prev = untrackedStart();
    var res = action();
    untrackedEnd(prev);
    return res;
}
exports.untracked = untracked;
function untrackedStart() {
    var prev = globalState.trackingDerivation;
    globalState.trackingDerivation = null;
    return prev;
}
function untrackedEnd(prev) {
    globalState.trackingDerivation = prev;
}
function changeDependenciesStateTo0(derivation) {
    if (derivation.dependenciesState === IDerivationState.UP_TO_DATE) return;
    derivation.dependenciesState = IDerivationState.UP_TO_DATE;
    var obs = derivation.observing;
    var i = obs.length;
    while (i--) {
        obs[i].lowestObserverState = IDerivationState.UP_TO_DATE;
    }
}
var persistentKeys = ["mobxGuid", "resetId", "spyListeners", "strictMode", "runId"];
var MobXGlobals = function () {
    function MobXGlobals() {
        this.version = 5;
        this.trackingDerivation = null;
        this.computationDepth = 0;
        this.runId = 0;
        this.mobxGuid = 0;
        this.inBatch = 0;
        this.pendingUnobservations = [];
        this.pendingReactions = [];
        this.isRunningReactions = false;
        this.allowStateChanges = true;
        this.strictMode = false;
        this.resetId = 0;
        this.spyListeners = [];
        this.globalReactionErrorHandlers = [];
    }
    return MobXGlobals;
}();
var globalState = new MobXGlobals();
function shareGlobalState() {
    var global = getGlobal();
    var ownState = globalState;
    if (global.__mobservableTrackingStack || global.__mobservableViewStack) throw new Error("[mobx] An incompatible version of mobservable is already loaded.");
    if (global.__mobxGlobal && global.__mobxGlobal.version !== ownState.version) throw new Error("[mobx] An incompatible version of mobx is already loaded.");
    if (global.__mobxGlobal) globalState = global.__mobxGlobal;else global.__mobxGlobal = ownState;
}
function getGlobalState() {
    return globalState;
}
function registerGlobals() {}
function resetGlobalState() {
    globalState.resetId++;
    var defaultGlobals = new MobXGlobals();
    for (var key in defaultGlobals) {
        if (persistentKeys.indexOf(key) === -1) globalState[key] = defaultGlobals[key];
    }globalState.allowStateChanges = !globalState.strictMode;
}
function hasObservers(observable) {
    return observable.observers && observable.observers.length > 0;
}
function getObservers(observable) {
    return observable.observers;
}
function invariantObservers(observable) {
    var list = observable.observers;
    var map = observable.observersIndexes;
    var l = list.length;
    for (var i = 0; i < l; i++) {
        var id = list[i].__mapid;
        if (i) {
            invariant(map[id] === i, "INTERNAL ERROR maps derivation.__mapid to index in list");
        } else {
            invariant(!(id in map), "INTERNAL ERROR observer on index 0 shouldnt be held in map.");
        }
    }
    invariant(list.length === 0 || Object.keys(map).length === list.length - 1, "INTERNAL ERROR there is no junk in map");
}
function addObserver(observable, node) {
    var l = observable.observers.length;
    if (l) {
        observable.observersIndexes[node.__mapid] = l;
    }
    observable.observers[l] = node;
    if (observable.lowestObserverState > node.dependenciesState) observable.lowestObserverState = node.dependenciesState;
}
function removeObserver(observable, node) {
    if (observable.observers.length === 1) {
        observable.observers.length = 0;
        queueForUnobservation(observable);
    } else {
        var list = observable.observers;
        var map_1 = observable.observersIndexes;
        var filler = list.pop();
        if (filler !== node) {
            var index = map_1[node.__mapid] || 0;
            if (index) {
                map_1[filler.__mapid] = index;
            } else {
                delete map_1[filler.__mapid];
            }
            list[index] = filler;
        }
        delete map_1[node.__mapid];
    }
}
function queueForUnobservation(observable) {
    if (!observable.isPendingUnobservation) {
        observable.isPendingUnobservation = true;
        globalState.pendingUnobservations.push(observable);
    }
}
function startBatch() {
    globalState.inBatch++;
}
function endBatch() {
    if (--globalState.inBatch === 0) {
        runReactions();
        var list = globalState.pendingUnobservations;
        for (var i = 0; i < list.length; i++) {
            var observable_1 = list[i];
            observable_1.isPendingUnobservation = false;
            if (observable_1.observers.length === 0) {
                observable_1.onBecomeUnobserved();
            }
        }
        globalState.pendingUnobservations = [];
    }
}
function reportObserved(observable) {
    var derivation = globalState.trackingDerivation;
    if (derivation !== null) {
        if (derivation.runId !== observable.lastAccessedBy) {
            observable.lastAccessedBy = derivation.runId;
            derivation.newObserving[derivation.unboundDepsCount++] = observable;
        }
    } else if (observable.observers.length === 0) {
        queueForUnobservation(observable);
    }
}
function invariantLOS(observable, msg) {
    var min = getObservers(observable).reduce(function (a, b) {
        return Math.min(a, b.dependenciesState);
    }, 2);
    if (min >= observable.lowestObserverState) return;
    throw new Error("lowestObserverState is wrong for " + msg + " because " + min + " < " + observable.lowestObserverState);
}
function propagateChanged(observable) {
    if (observable.lowestObserverState === IDerivationState.STALE) return;
    observable.lowestObserverState = IDerivationState.STALE;
    var observers = observable.observers;
    var i = observers.length;
    while (i--) {
        var d = observers[i];
        if (d.dependenciesState === IDerivationState.UP_TO_DATE) d.onBecomeStale();
        d.dependenciesState = IDerivationState.STALE;
    }
}
function propagateChangeConfirmed(observable) {
    if (observable.lowestObserverState === IDerivationState.STALE) return;
    observable.lowestObserverState = IDerivationState.STALE;
    var observers = observable.observers;
    var i = observers.length;
    while (i--) {
        var d = observers[i];
        if (d.dependenciesState === IDerivationState.POSSIBLY_STALE) d.dependenciesState = IDerivationState.STALE;else if (d.dependenciesState === IDerivationState.UP_TO_DATE) observable.lowestObserverState = IDerivationState.UP_TO_DATE;
    }
}
function propagateMaybeChanged(observable) {
    if (observable.lowestObserverState !== IDerivationState.UP_TO_DATE) return;
    observable.lowestObserverState = IDerivationState.POSSIBLY_STALE;
    var observers = observable.observers;
    var i = observers.length;
    while (i--) {
        var d = observers[i];
        if (d.dependenciesState === IDerivationState.UP_TO_DATE) {
            d.dependenciesState = IDerivationState.POSSIBLY_STALE;
            d.onBecomeStale();
        }
    }
}
var Reaction = function () {
    function Reaction(name, onInvalidate) {
        if (name === void 0) {
            name = "Reaction@" + getNextId();
        }
        this.name = name;
        this.onInvalidate = onInvalidate;
        this.observing = [];
        this.newObserving = [];
        this.dependenciesState = IDerivationState.NOT_TRACKING;
        this.diffValue = 0;
        this.runId = 0;
        this.unboundDepsCount = 0;
        this.__mapid = "#" + getNextId();
        this.isDisposed = false;
        this._isScheduled = false;
        this._isTrackPending = false;
        this._isRunning = false;
    }
    Reaction.prototype.onBecomeStale = function () {
        this.schedule();
    };
    Reaction.prototype.schedule = function () {
        if (!this._isScheduled) {
            this._isScheduled = true;
            globalState.pendingReactions.push(this);
            runReactions();
        }
    };
    Reaction.prototype.isScheduled = function () {
        return this._isScheduled;
    };
    Reaction.prototype.runReaction = function () {
        if (!this.isDisposed) {
            startBatch();
            this._isScheduled = false;
            if (shouldCompute(this)) {
                this._isTrackPending = true;
                this.onInvalidate();
                if (this._isTrackPending && isSpyEnabled()) {
                    spyReport({
                        object: this,
                        type: "scheduled-reaction"
                    });
                }
            }
            endBatch();
        }
    };
    Reaction.prototype.track = function (fn) {
        startBatch();
        var notify = isSpyEnabled();
        var startTime;
        if (notify) {
            startTime = Date.now();
            spyReportStart({
                object: this,
                type: "reaction",
                fn: fn
            });
        }
        this._isRunning = true;
        var result = trackDerivedFunction(this, fn, undefined);
        this._isRunning = false;
        this._isTrackPending = false;
        if (this.isDisposed) {
            clearObserving(this);
        }
        if (isCaughtException(result)) this.reportExceptionInDerivation(result.cause);
        if (notify) {
            spyReportEnd({
                time: Date.now() - startTime
            });
        }
        endBatch();
    };
    Reaction.prototype.reportExceptionInDerivation = function (error) {
        var _this = this;
        if (this.errorHandler) {
            this.errorHandler(error, this);
            return;
        }
        var message = "[mobx] Encountered an uncaught exception that was thrown by a reaction or observer component, in: '" + this;
        var messageToUser = getMessage("m037");
        console.error(message || messageToUser, error);
        if (isSpyEnabled()) {
            spyReport({
                type: "error",
                message: message,
                error: error,
                object: this
            });
        }
        globalState.globalReactionErrorHandlers.forEach(function (f) {
            return f(error, _this);
        });
    };
    Reaction.prototype.dispose = function () {
        if (!this.isDisposed) {
            this.isDisposed = true;
            if (!this._isRunning) {
                startBatch();
                clearObserving(this);
                endBatch();
            }
        }
    };
    Reaction.prototype.getDisposer = function () {
        var r = this.dispose.bind(this);
        r.$mobx = this;
        r.onError = registerErrorHandler;
        return r;
    };
    Reaction.prototype.toString = function () {
        return "Reaction[" + this.name + "]";
    };
    Reaction.prototype.whyRun = function () {
        var observing = unique(this._isRunning ? this.newObserving : this.observing).map(function (dep) {
            return dep.name;
        });
        return "\nWhyRun? reaction '" + this.name + "':\n * Status: [" + (this.isDisposed ? "stopped" : this._isRunning ? "running" : this.isScheduled() ? "scheduled" : "idle") + "]\n * This reaction will re-run if any of the following observables changes:\n    " + joinStrings(observing) + "\n    " + (this._isRunning ? " (... or any observable accessed during the remainder of the current run)" : "") + "\n\t" + getMessage("m038") + "\n";
    };
    return Reaction;
}();
exports.Reaction = Reaction;
function registerErrorHandler(handler) {
    invariant(this && this.$mobx && isReaction(this.$mobx), "Invalid `this`");
    invariant(!this.$mobx.errorHandler, "Only one onErrorHandler can be registered");
    this.$mobx.errorHandler = handler;
}
function onReactionError(handler) {
    globalState.globalReactionErrorHandlers.push(handler);
    return function () {
        var idx = globalState.globalReactionErrorHandlers.indexOf(handler);
        if (idx >= 0) globalState.globalReactionErrorHandlers.splice(idx, 1);
    };
}
var MAX_REACTION_ITERATIONS = 100;
var reactionScheduler = function reactionScheduler(f) {
    return f();
};
function runReactions() {
    if (globalState.inBatch > 0 || globalState.isRunningReactions) return;
    reactionScheduler(runReactionsHelper);
}
function runReactionsHelper() {
    globalState.isRunningReactions = true;
    var allReactions = globalState.pendingReactions;
    var iterations = 0;
    while (allReactions.length > 0) {
        if (++iterations === MAX_REACTION_ITERATIONS) {
            console.error("Reaction doesn't converge to a stable state after " + MAX_REACTION_ITERATIONS + " iterations." + (" Probably there is a cycle in the reactive function: " + allReactions[0]));
            allReactions.splice(0);
        }
        var remainingReactions = allReactions.splice(0);
        for (var i = 0, l = remainingReactions.length; i < l; i++) {
            remainingReactions[i].runReaction();
        }
    }
    globalState.isRunningReactions = false;
}
var isReaction = createInstanceofPredicate("Reaction", Reaction);
function setReactionScheduler(fn) {
    var baseScheduler = reactionScheduler;
    reactionScheduler = function reactionScheduler(f) {
        return fn(function () {
            return baseScheduler(f);
        });
    };
}
function isSpyEnabled() {
    return !!globalState.spyListeners.length;
}
function spyReport(event) {
    if (!globalState.spyListeners.length) return;
    var listeners = globalState.spyListeners;
    for (var i = 0, l = listeners.length; i < l; i++) {
        listeners[i](event);
    }
}
function spyReportStart(event) {
    var change = objectAssign({}, event, { spyReportStart: true });
    spyReport(change);
}
var END_EVENT = { spyReportEnd: true };
function spyReportEnd(change) {
    if (change) spyReport(objectAssign({}, change, END_EVENT));else spyReport(END_EVENT);
}
function spy(listener) {
    globalState.spyListeners.push(listener);
    return once(function () {
        var idx = globalState.spyListeners.indexOf(listener);
        if (idx !== -1) globalState.spyListeners.splice(idx, 1);
    });
}
exports.spy = spy;
function hasInterceptors(interceptable) {
    return interceptable.interceptors && interceptable.interceptors.length > 0;
}
function registerInterceptor(interceptable, handler) {
    var interceptors = interceptable.interceptors || (interceptable.interceptors = []);
    interceptors.push(handler);
    return once(function () {
        var idx = interceptors.indexOf(handler);
        if (idx !== -1) interceptors.splice(idx, 1);
    });
}
function interceptChange(interceptable, change) {
    var prevU = untrackedStart();
    try {
        var interceptors = interceptable.interceptors;
        if (interceptors) for (var i = 0, l = interceptors.length; i < l; i++) {
            change = interceptors[i](change);
            invariant(!change || change.type, "Intercept handlers should return nothing or a change object");
            if (!change) break;
        }
        return change;
    } finally {
        untrackedEnd(prevU);
    }
}
function hasListeners(listenable) {
    return listenable.changeListeners && listenable.changeListeners.length > 0;
}
function registerListener(listenable, handler) {
    var listeners = listenable.changeListeners || (listenable.changeListeners = []);
    listeners.push(handler);
    return once(function () {
        var idx = listeners.indexOf(handler);
        if (idx !== -1) listeners.splice(idx, 1);
    });
}
function notifyListeners(listenable, change) {
    var prevU = untrackedStart();
    var listeners = listenable.changeListeners;
    if (!listeners) return;
    listeners = listeners.slice();
    for (var i = 0, l = listeners.length; i < l; i++) {
        listeners[i](change);
    }
    untrackedEnd(prevU);
}
function asReference(value) {
    deprecated("asReference is deprecated, use observable.ref instead");
    return observable.ref(value);
}
exports.asReference = asReference;
function asStructure(value) {
    deprecated("asStructure is deprecated. Use observable.struct, computed.struct or reaction options instead.");
    return observable.struct(value);
}
exports.asStructure = asStructure;
function asFlat(value) {
    deprecated("asFlat is deprecated, use observable.shallow instead");
    return observable.shallow(value);
}
exports.asFlat = asFlat;
function asMap(data) {
    deprecated("asMap is deprecated, use observable.map or observable.shallowMap instead");
    return observable.map(data || {});
}
exports.asMap = asMap;
function isModifierDescriptor(thing) {
    return (typeof thing === "undefined" ? "undefined" : _typeof(thing)) === "object" && thing !== null && thing.isMobxModifierDescriptor === true;
}
exports.isModifierDescriptor = isModifierDescriptor;
function createModifierDescriptor(enhancer, initialValue) {
    invariant(!isModifierDescriptor(initialValue), "Modifiers cannot be nested");
    return {
        isMobxModifierDescriptor: true,
        initialValue: initialValue,
        enhancer: enhancer
    };
}
function deepEnhancer(v, _, name) {
    if (isModifierDescriptor(v)) fail("You tried to assign a modifier wrapped value to a collection, please define modifiers when creating the collection, not when modifying it");
    if (isObservable(v)) return v;
    if (Array.isArray(v)) return observable.array(v, name);
    if (isPlainObject(v)) return observable.object(v, name);
    if (isES6Map(v)) return observable.map(v, name);
    return v;
}
function shallowEnhancer(v, _, name) {
    if (isModifierDescriptor(v)) fail("You tried to assign a modifier wrapped value to a collection, please define modifiers when creating the collection, not when modifying it");
    if (v === undefined || v === null) return v;
    if (isObservableObject(v) || isObservableArray(v) || isObservableMap(v)) return v;
    if (Array.isArray(v)) return observable.shallowArray(v, name);
    if (isPlainObject(v)) return observable.shallowObject(v, name);
    if (isES6Map(v)) return observable.shallowMap(v, name);
    return fail("The shallow modifier / decorator can only used in combination with arrays, objects and maps");
}
function referenceEnhancer(newValue) {
    return newValue;
}
function deepStructEnhancer(v, oldValue, name) {
    if (deepEqual(v, oldValue)) return oldValue;
    if (isObservable(v)) return v;
    if (Array.isArray(v)) return new ObservableArray(v, deepStructEnhancer, name);
    if (isES6Map(v)) return new ObservableMap(v, deepStructEnhancer, name);
    if (isPlainObject(v)) {
        var res = {};
        asObservableObject(res, name);
        extendObservableHelper(res, deepStructEnhancer, [v]);
        return res;
    }
    return v;
}
function refStructEnhancer(v, oldValue, name) {
    if (deepEqual(v, oldValue)) return oldValue;
    return v;
}
var MAX_SPLICE_SIZE = 10000;
var safariPrototypeSetterInheritanceBug = function () {
    var v = false;
    var p = {};
    Object.defineProperty(p, "0", { set: function set() {
            v = true;
        } });
    Object.create(p)["0"] = 1;
    return v === false;
}();
var OBSERVABLE_ARRAY_BUFFER_SIZE = 0;
var StubArray = function () {
    function StubArray() {}
    return StubArray;
}();
StubArray.prototype = [];
var ObservableArrayAdministration = function () {
    function ObservableArrayAdministration(name, enhancer, array, owned) {
        this.array = array;
        this.owned = owned;
        this.lastKnownLength = 0;
        this.interceptors = null;
        this.changeListeners = null;
        this.atom = new BaseAtom(name || "ObservableArray@" + getNextId());
        this.enhancer = function (newV, oldV) {
            return enhancer(newV, oldV, name + "[..]");
        };
    }
    ObservableArrayAdministration.prototype.intercept = function (handler) {
        return registerInterceptor(this, handler);
    };
    ObservableArrayAdministration.prototype.observe = function (listener, fireImmediately) {
        if (fireImmediately === void 0) {
            fireImmediately = false;
        }
        if (fireImmediately) {
            listener({
                object: this.array,
                type: "splice",
                index: 0,
                added: this.values.slice(),
                addedCount: this.values.length,
                removed: [],
                removedCount: 0
            });
        }
        return registerListener(this, listener);
    };
    ObservableArrayAdministration.prototype.getArrayLength = function () {
        this.atom.reportObserved();
        return this.values.length;
    };
    ObservableArrayAdministration.prototype.setArrayLength = function (newLength) {
        if (typeof newLength !== "number" || newLength < 0) throw new Error("[mobx.array] Out of range: " + newLength);
        var currentLength = this.values.length;
        if (newLength === currentLength) return;else if (newLength > currentLength) {
            var newItems = new Array(newLength - currentLength);
            for (var i = 0; i < newLength - currentLength; i++) {
                newItems[i] = undefined;
            }this.spliceWithArray(currentLength, 0, newItems);
        } else this.spliceWithArray(newLength, currentLength - newLength);
    };
    ObservableArrayAdministration.prototype.updateArrayLength = function (oldLength, delta) {
        if (oldLength !== this.lastKnownLength) throw new Error("[mobx] Modification exception: the internal structure of an observable array was changed. Did you use peek() to change it?");
        this.lastKnownLength += delta;
        if (delta > 0 && oldLength + delta + 1 > OBSERVABLE_ARRAY_BUFFER_SIZE) reserveArrayBuffer(oldLength + delta + 1);
    };
    ObservableArrayAdministration.prototype.spliceWithArray = function (index, deleteCount, newItems) {
        var _this = this;
        checkIfStateModificationsAreAllowed(this.atom);
        var length = this.values.length;
        if (index === undefined) index = 0;else if (index > length) index = length;else if (index < 0) index = Math.max(0, length + index);
        if (arguments.length === 1) deleteCount = length - index;else if (deleteCount === undefined || deleteCount === null) deleteCount = 0;else deleteCount = Math.max(0, Math.min(deleteCount, length - index));
        if (newItems === undefined) newItems = [];
        if (hasInterceptors(this)) {
            var change = interceptChange(this, {
                object: this.array,
                type: "splice",
                index: index,
                removedCount: deleteCount,
                added: newItems
            });
            if (!change) return EMPTY_ARRAY;
            deleteCount = change.removedCount;
            newItems = change.added;
        }
        newItems = newItems.map(function (v) {
            return _this.enhancer(v, undefined);
        });
        var lengthDelta = newItems.length - deleteCount;
        this.updateArrayLength(length, lengthDelta);
        var res = this.spliceItemsIntoValues(index, deleteCount, newItems);
        if (deleteCount !== 0 || newItems.length !== 0) this.notifyArraySplice(index, newItems, res);
        return res;
    };
    ObservableArrayAdministration.prototype.spliceItemsIntoValues = function (index, deleteCount, newItems) {
        if (newItems.length < MAX_SPLICE_SIZE) {
            return (_a = this.values).splice.apply(_a, [index, deleteCount].concat(newItems));
        } else {
            var res = this.values.slice(index, index + deleteCount);
            this.values = this.values.slice(0, index).concat(newItems, this.values.slice(index + deleteCount));
            return res;
        }
        var _a;
    };
    ObservableArrayAdministration.prototype.notifyArrayChildUpdate = function (index, newValue, oldValue) {
        var notifySpy = !this.owned && isSpyEnabled();
        var notify = hasListeners(this);
        var change = notify || notifySpy ? {
            object: this.array,
            type: "update",
            index: index, newValue: newValue, oldValue: oldValue
        } : null;
        if (notifySpy) spyReportStart(change);
        this.atom.reportChanged();
        if (notify) notifyListeners(this, change);
        if (notifySpy) spyReportEnd();
    };
    ObservableArrayAdministration.prototype.notifyArraySplice = function (index, added, removed) {
        var notifySpy = !this.owned && isSpyEnabled();
        var notify = hasListeners(this);
        var change = notify || notifySpy ? {
            object: this.array,
            type: "splice",
            index: index, removed: removed, added: added,
            removedCount: removed.length,
            addedCount: added.length
        } : null;
        if (notifySpy) spyReportStart(change);
        this.atom.reportChanged();
        if (notify) notifyListeners(this, change);
        if (notifySpy) spyReportEnd();
    };
    return ObservableArrayAdministration;
}();
var ObservableArray = function (_super) {
    __extends(ObservableArray, _super);
    function ObservableArray(initialValues, enhancer, name, owned) {
        if (name === void 0) {
            name = "ObservableArray@" + getNextId();
        }
        if (owned === void 0) {
            owned = false;
        }
        var _this = _super.call(this) || this;
        var adm = new ObservableArrayAdministration(name, enhancer, _this, owned);
        addHiddenFinalProp(_this, "$mobx", adm);
        if (initialValues && initialValues.length) {
            adm.updateArrayLength(0, initialValues.length);
            adm.values = initialValues.map(function (v) {
                return enhancer(v, undefined, name + "[..]");
            });
            adm.notifyArraySplice(0, adm.values.slice(), EMPTY_ARRAY);
        } else {
            adm.values = [];
        }
        if (safariPrototypeSetterInheritanceBug) {
            Object.defineProperty(adm.array, "0", ENTRY_0);
        }
        return _this;
    }
    ObservableArray.prototype.intercept = function (handler) {
        return this.$mobx.intercept(handler);
    };
    ObservableArray.prototype.observe = function (listener, fireImmediately) {
        if (fireImmediately === void 0) {
            fireImmediately = false;
        }
        return this.$mobx.observe(listener, fireImmediately);
    };
    ObservableArray.prototype.clear = function () {
        return this.splice(0);
    };
    ObservableArray.prototype.concat = function () {
        var arrays = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arrays[_i] = arguments[_i];
        }
        this.$mobx.atom.reportObserved();
        return Array.prototype.concat.apply(this.peek(), arrays.map(function (a) {
            return isObservableArray(a) ? a.peek() : a;
        }));
    };
    ObservableArray.prototype.replace = function (newItems) {
        return this.$mobx.spliceWithArray(0, this.$mobx.values.length, newItems);
    };
    ObservableArray.prototype.toJS = function () {
        return this.slice();
    };
    ObservableArray.prototype.toJSON = function () {
        return this.toJS();
    };
    ObservableArray.prototype.peek = function () {
        return this.$mobx.values;
    };
    ObservableArray.prototype.find = function (predicate, thisArg, fromIndex) {
        if (fromIndex === void 0) {
            fromIndex = 0;
        }
        this.$mobx.atom.reportObserved();
        var items = this.$mobx.values,
            l = items.length;
        for (var i = fromIndex; i < l; i++) {
            if (predicate.call(thisArg, items[i], i, this)) return items[i];
        }return undefined;
    };
    ObservableArray.prototype.splice = function (index, deleteCount) {
        var newItems = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            newItems[_i - 2] = arguments[_i];
        }
        switch (arguments.length) {
            case 0:
                return [];
            case 1:
                return this.$mobx.spliceWithArray(index);
            case 2:
                return this.$mobx.spliceWithArray(index, deleteCount);
        }
        return this.$mobx.spliceWithArray(index, deleteCount, newItems);
    };
    ObservableArray.prototype.spliceWithArray = function (index, deleteCount, newItems) {
        return this.$mobx.spliceWithArray(index, deleteCount, newItems);
    };
    ObservableArray.prototype.push = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var adm = this.$mobx;
        adm.spliceWithArray(adm.values.length, 0, items);
        return adm.values.length;
    };
    ObservableArray.prototype.pop = function () {
        return this.splice(Math.max(this.$mobx.values.length - 1, 0), 1)[0];
    };
    ObservableArray.prototype.shift = function () {
        return this.splice(0, 1)[0];
    };
    ObservableArray.prototype.unshift = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var adm = this.$mobx;
        adm.spliceWithArray(0, 0, items);
        return adm.values.length;
    };
    ObservableArray.prototype.reverse = function () {
        this.$mobx.atom.reportObserved();
        var clone = this.slice();
        return clone.reverse.apply(clone, arguments);
    };
    ObservableArray.prototype.sort = function (compareFn) {
        this.$mobx.atom.reportObserved();
        var clone = this.slice();
        return clone.sort.apply(clone, arguments);
    };
    ObservableArray.prototype.remove = function (value) {
        var idx = this.$mobx.values.indexOf(value);
        if (idx > -1) {
            this.splice(idx, 1);
            return true;
        }
        return false;
    };
    ObservableArray.prototype.move = function (fromIndex, toIndex) {
        function checkIndex(index) {
            if (index < 0) {
                throw new Error("[mobx.array] Index out of bounds: " + index + " is negative");
            }
            var length = this.$mobx.values.length;
            if (index >= length) {
                throw new Error("[mobx.array] Index out of bounds: " + index + " is not smaller than " + length);
            }
        }
        checkIndex.call(this, fromIndex);
        checkIndex.call(this, toIndex);
        if (fromIndex === toIndex) {
            return;
        }
        var oldItems = this.$mobx.values;
        var newItems;
        if (fromIndex < toIndex) {
            newItems = oldItems.slice(0, fromIndex).concat(oldItems.slice(fromIndex + 1, toIndex + 1), [oldItems[fromIndex]], oldItems.slice(toIndex + 1));
        } else {
            newItems = oldItems.slice(0, toIndex).concat([oldItems[fromIndex]], oldItems.slice(toIndex, fromIndex), oldItems.slice(fromIndex + 1));
        }
        this.replace(newItems);
    };
    ObservableArray.prototype.toString = function () {
        this.$mobx.atom.reportObserved();
        return Array.prototype.toString.apply(this.$mobx.values, arguments);
    };
    ObservableArray.prototype.toLocaleString = function () {
        this.$mobx.atom.reportObserved();
        return Array.prototype.toLocaleString.apply(this.$mobx.values, arguments);
    };
    return ObservableArray;
}(StubArray);
declareIterator(ObservableArray.prototype, function () {
    return arrayAsIterator(this.slice());
});
makeNonEnumerable(ObservableArray.prototype, ["constructor", "intercept", "observe", "clear", "concat", "replace", "toJS", "toJSON", "peek", "find", "splice", "spliceWithArray", "push", "pop", "shift", "unshift", "reverse", "sort", "remove", "move", "toString", "toLocaleString"]);
Object.defineProperty(ObservableArray.prototype, "length", {
    enumerable: false,
    configurable: true,
    get: function get() {
        return this.$mobx.getArrayLength();
    },
    set: function set(newLength) {
        this.$mobx.setArrayLength(newLength);
    }
});
["every", "filter", "forEach", "indexOf", "join", "lastIndexOf", "map", "reduce", "reduceRight", "slice", "some"].forEach(function (funcName) {
    var baseFunc = Array.prototype[funcName];
    invariant(typeof baseFunc === "function", "Base function not defined on Array prototype: '" + funcName + "'");
    addHiddenProp(ObservableArray.prototype, funcName, function () {
        this.$mobx.atom.reportObserved();
        return baseFunc.apply(this.$mobx.values, arguments);
    });
});
var ENTRY_0 = {
    configurable: true,
    enumerable: false,
    set: createArraySetter(0),
    get: createArrayGetter(0)
};
function createArrayBufferItem(index) {
    var set = createArraySetter(index);
    var get = createArrayGetter(index);
    Object.defineProperty(ObservableArray.prototype, "" + index, {
        enumerable: false,
        configurable: true,
        set: set, get: get
    });
}
function createArraySetter(index) {
    return function (newValue) {
        var adm = this.$mobx;
        var values = adm.values;
        if (index < values.length) {
            checkIfStateModificationsAreAllowed(adm.atom);
            var oldValue = values[index];
            if (hasInterceptors(adm)) {
                var change = interceptChange(adm, {
                    type: "update",
                    object: adm.array,
                    index: index, newValue: newValue
                });
                if (!change) return;
                newValue = change.newValue;
            }
            newValue = adm.enhancer(newValue, oldValue);
            var changed = newValue !== oldValue;
            if (changed) {
                values[index] = newValue;
                adm.notifyArrayChildUpdate(index, newValue, oldValue);
            }
        } else if (index === values.length) {
            adm.spliceWithArray(index, 0, [newValue]);
        } else throw new Error("[mobx.array] Index out of bounds, " + index + " is larger than " + values.length);
    };
}
function createArrayGetter(index) {
    return function () {
        var impl = this.$mobx;
        if (impl) {
            if (index < impl.values.length) {
                impl.atom.reportObserved();
                return impl.values[index];
            }
            console.warn("[mobx.array] Attempt to read an array index (" + index + ") that is out of bounds (" + impl.values.length + "). Please check length first. Out of bound indices will not be tracked by MobX");
        }
        return undefined;
    };
}
function reserveArrayBuffer(max) {
    for (var index = OBSERVABLE_ARRAY_BUFFER_SIZE; index < max; index++) {
        createArrayBufferItem(index);
    }OBSERVABLE_ARRAY_BUFFER_SIZE = max;
}
reserveArrayBuffer(1000);
var isObservableArrayAdministration = createInstanceofPredicate("ObservableArrayAdministration", ObservableArrayAdministration);
function isObservableArray(thing) {
    return isObject(thing) && isObservableArrayAdministration(thing.$mobx);
}
exports.isObservableArray = isObservableArray;
var ObservableMapMarker = {};
var ObservableMap = function () {
    function ObservableMap(initialData, enhancer, name) {
        if (enhancer === void 0) {
            enhancer = deepEnhancer;
        }
        if (name === void 0) {
            name = "ObservableMap@" + getNextId();
        }
        this.enhancer = enhancer;
        this.name = name;
        this.$mobx = ObservableMapMarker;
        this._data = {};
        this._hasMap = {};
        this._keys = new ObservableArray(undefined, referenceEnhancer, this.name + ".keys()", true);
        this.interceptors = null;
        this.changeListeners = null;
        this.merge(initialData);
    }
    ObservableMap.prototype._has = function (key) {
        return typeof this._data[key] !== "undefined";
    };
    ObservableMap.prototype.has = function (key) {
        if (!this.isValidKey(key)) return false;
        key = "" + key;
        if (this._hasMap[key]) return this._hasMap[key].get();
        return this._updateHasMapEntry(key, false).get();
    };
    ObservableMap.prototype.set = function (key, value) {
        this.assertValidKey(key);
        key = "" + key;
        var hasKey = this._has(key);
        if (hasInterceptors(this)) {
            var change = interceptChange(this, {
                type: hasKey ? "update" : "add",
                object: this,
                newValue: value,
                name: key
            });
            if (!change) return this;
            value = change.newValue;
        }
        if (hasKey) {
            this._updateValue(key, value);
        } else {
            this._addValue(key, value);
        }
        return this;
    };
    ObservableMap.prototype.delete = function (key) {
        var _this = this;
        this.assertValidKey(key);
        key = "" + key;
        if (hasInterceptors(this)) {
            var change = interceptChange(this, {
                type: "delete",
                object: this,
                name: key
            });
            if (!change) return false;
        }
        if (this._has(key)) {
            var notifySpy = isSpyEnabled();
            var notify = hasListeners(this);
            var change = notify || notifySpy ? {
                type: "delete",
                object: this,
                oldValue: this._data[key].value,
                name: key
            } : null;
            if (notifySpy) spyReportStart(change);
            runInTransaction(function () {
                _this._keys.remove(key);
                _this._updateHasMapEntry(key, false);
                var observable = _this._data[key];
                observable.setNewValue(undefined);
                _this._data[key] = undefined;
            });
            if (notify) notifyListeners(this, change);
            if (notifySpy) spyReportEnd();
            return true;
        }
        return false;
    };
    ObservableMap.prototype._updateHasMapEntry = function (key, value) {
        var entry = this._hasMap[key];
        if (entry) {
            entry.setNewValue(value);
        } else {
            entry = this._hasMap[key] = new ObservableValue(value, referenceEnhancer, this.name + "." + key + "?", false);
        }
        return entry;
    };
    ObservableMap.prototype._updateValue = function (name, newValue) {
        var observable = this._data[name];
        newValue = observable.prepareNewValue(newValue);
        if (newValue !== UNCHANGED) {
            var notifySpy = isSpyEnabled();
            var notify = hasListeners(this);
            var change = notify || notifySpy ? {
                type: "update",
                object: this,
                oldValue: observable.value,
                name: name, newValue: newValue
            } : null;
            if (notifySpy) spyReportStart(change);
            observable.setNewValue(newValue);
            if (notify) notifyListeners(this, change);
            if (notifySpy) spyReportEnd();
        }
    };
    ObservableMap.prototype._addValue = function (name, newValue) {
        var _this = this;
        runInTransaction(function () {
            var observable = _this._data[name] = new ObservableValue(newValue, _this.enhancer, _this.name + "." + name, false);
            newValue = observable.value;
            _this._updateHasMapEntry(name, true);
            _this._keys.push(name);
        });
        var notifySpy = isSpyEnabled();
        var notify = hasListeners(this);
        var change = notify || notifySpy ? {
            type: "add",
            object: this,
            name: name, newValue: newValue
        } : null;
        if (notifySpy) spyReportStart(change);
        if (notify) notifyListeners(this, change);
        if (notifySpy) spyReportEnd();
    };
    ObservableMap.prototype.get = function (key) {
        key = "" + key;
        if (this.has(key)) return this._data[key].get();
        return undefined;
    };
    ObservableMap.prototype.keys = function () {
        return arrayAsIterator(this._keys.slice());
    };
    ObservableMap.prototype.values = function () {
        return arrayAsIterator(this._keys.map(this.get, this));
    };
    ObservableMap.prototype.entries = function () {
        var _this = this;
        return arrayAsIterator(this._keys.map(function (key) {
            return [key, _this.get(key)];
        }));
    };
    ObservableMap.prototype.forEach = function (callback, thisArg) {
        var _this = this;
        this.keys().forEach(function (key) {
            return callback.call(thisArg, _this.get(key), key, _this);
        });
    };
    ObservableMap.prototype.merge = function (other) {
        var _this = this;
        if (isObservableMap(other)) {
            other = other.toJS();
        }
        runInTransaction(function () {
            if (isPlainObject(other)) Object.keys(other).forEach(function (key) {
                return _this.set(key, other[key]);
            });else if (Array.isArray(other)) other.forEach(function (_a) {
                var key = _a[0],
                    value = _a[1];
                return _this.set(key, value);
            });else if (isES6Map(other)) other.forEach(function (value, key) {
                return _this.set(key, value);
            });else if (other !== null && other !== undefined) fail("Cannot initialize map from " + other);
        });
        return this;
    };
    ObservableMap.prototype.clear = function () {
        var _this = this;
        runInTransaction(function () {
            untracked(function () {
                _this.keys().forEach(_this.delete, _this);
            });
        });
    };
    ObservableMap.prototype.replace = function (values) {
        var _this = this;
        runInTransaction(function () {
            _this.clear();
            _this.merge(values);
        });
        return this;
    };
    Object.defineProperty(ObservableMap.prototype, "size", {
        get: function get() {
            return this._keys.length;
        },
        enumerable: true,
        configurable: true
    });
    ObservableMap.prototype.toJS = function () {
        var _this = this;
        var res = {};
        this.keys().forEach(function (key) {
            return res[key] = _this.get(key);
        });
        return res;
    };
    ObservableMap.prototype.toJSON = function () {
        return this.toJS();
    };
    ObservableMap.prototype.isValidKey = function (key) {
        if (key === null || key === undefined) return false;
        if (typeof key === "string" || typeof key === "number" || typeof key === "boolean") return true;
        return false;
    };
    ObservableMap.prototype.assertValidKey = function (key) {
        if (!this.isValidKey(key)) throw new Error("[mobx.map] Invalid key: '" + key + "', only strings, numbers and booleans are accepted as key in observable maps.");
    };
    ObservableMap.prototype.toString = function () {
        var _this = this;
        return this.name + "[{ " + this.keys().map(function (key) {
            return key + ": " + ("" + _this.get(key));
        }).join(", ") + " }]";
    };
    ObservableMap.prototype.observe = function (listener, fireImmediately) {
        invariant(fireImmediately !== true, getMessage("m033"));
        return registerListener(this, listener);
    };
    ObservableMap.prototype.intercept = function (handler) {
        return registerInterceptor(this, handler);
    };
    return ObservableMap;
}();
exports.ObservableMap = ObservableMap;
declareIterator(ObservableMap.prototype, function () {
    return this.entries();
});
function map(initialValues) {
    deprecated("`mobx.map` is deprecated, use `new ObservableMap` or `mobx.observable.map` instead");
    return observable.map(initialValues);
}
exports.map = map;
var isObservableMap = createInstanceofPredicate("ObservableMap", ObservableMap);
exports.isObservableMap = isObservableMap;
var ObservableObjectAdministration = function () {
    function ObservableObjectAdministration(target, name) {
        this.target = target;
        this.name = name;
        this.values = {};
        this.changeListeners = null;
        this.interceptors = null;
    }
    ObservableObjectAdministration.prototype.observe = function (callback, fireImmediately) {
        invariant(fireImmediately !== true, "`observe` doesn't support the fire immediately property for observable objects.");
        return registerListener(this, callback);
    };
    ObservableObjectAdministration.prototype.intercept = function (handler) {
        return registerInterceptor(this, handler);
    };
    return ObservableObjectAdministration;
}();
function asObservableObject(target, name) {
    if (isObservableObject(target)) return target.$mobx;
    invariant(Object.isExtensible(target), getMessage("m035"));
    if (!isPlainObject(target)) name = (target.constructor.name || "ObservableObject") + "@" + getNextId();
    if (!name) name = "ObservableObject@" + getNextId();
    var adm = new ObservableObjectAdministration(target, name);
    addHiddenFinalProp(target, "$mobx", adm);
    return adm;
}
function defineObservablePropertyFromDescriptor(adm, propName, descriptor, defaultEnhancer) {
    if (adm.values[propName]) {
        invariant("value" in descriptor, "The property " + propName + " in " + adm.name + " is already observable, cannot redefine it as computed property");
        adm.target[propName] = descriptor.value;
        return;
    }
    if ("value" in descriptor) {
        if (isModifierDescriptor(descriptor.value)) {
            var modifierDescriptor = descriptor.value;
            defineObservableProperty(adm, propName, modifierDescriptor.initialValue, modifierDescriptor.enhancer);
        } else if (isAction(descriptor.value) && descriptor.value.autoBind === true) {
            defineBoundAction(adm.target, propName, descriptor.value.originalFn);
        } else if (isComputedValue(descriptor.value)) {
            defineComputedPropertyFromComputedValue(adm, propName, descriptor.value);
        } else {
            defineObservableProperty(adm, propName, descriptor.value, defaultEnhancer);
        }
    } else {
        defineComputedProperty(adm, propName, descriptor.get, descriptor.set, false, true);
    }
}
function defineObservableProperty(adm, propName, newValue, enhancer) {
    assertPropertyConfigurable(adm.target, propName);
    if (hasInterceptors(adm)) {
        var change = interceptChange(adm, {
            object: adm.target,
            name: propName,
            type: "add",
            newValue: newValue
        });
        if (!change) return;
        newValue = change.newValue;
    }
    var observable = adm.values[propName] = new ObservableValue(newValue, enhancer, adm.name + "." + propName, false);
    newValue = observable.value;
    Object.defineProperty(adm.target, propName, generateObservablePropConfig(propName));
    notifyPropertyAddition(adm, adm.target, propName, newValue);
}
function defineComputedProperty(adm, propName, getter, setter, compareStructural, asInstanceProperty) {
    if (asInstanceProperty) assertPropertyConfigurable(adm.target, propName);
    adm.values[propName] = new ComputedValue(getter, adm.target, compareStructural, adm.name + "." + propName, setter);
    if (asInstanceProperty) {
        Object.defineProperty(adm.target, propName, generateComputedPropConfig(propName));
    }
}
function defineComputedPropertyFromComputedValue(adm, propName, computedValue) {
    var name = adm.name + "." + propName;
    computedValue.name = name;
    if (!computedValue.scope) computedValue.scope = adm.target;
    adm.values[propName] = computedValue;
    Object.defineProperty(adm.target, propName, generateComputedPropConfig(propName));
}
var observablePropertyConfigs = {};
var computedPropertyConfigs = {};
function generateObservablePropConfig(propName) {
    return observablePropertyConfigs[propName] || (observablePropertyConfigs[propName] = {
        configurable: true,
        enumerable: true,
        get: function get() {
            return this.$mobx.values[propName].get();
        },
        set: function set(v) {
            setPropertyValue(this, propName, v);
        }
    });
}
function generateComputedPropConfig(propName) {
    return computedPropertyConfigs[propName] || (computedPropertyConfigs[propName] = {
        configurable: true,
        enumerable: false,
        get: function get() {
            return this.$mobx.values[propName].get();
        },
        set: function set(v) {
            return this.$mobx.values[propName].set(v);
        }
    });
}
function setPropertyValue(instance, name, newValue) {
    var adm = instance.$mobx;
    var observable = adm.values[name];
    if (hasInterceptors(adm)) {
        var change = interceptChange(adm, {
            type: "update",
            object: instance,
            name: name, newValue: newValue
        });
        if (!change) return;
        newValue = change.newValue;
    }
    newValue = observable.prepareNewValue(newValue);
    if (newValue !== UNCHANGED) {
        var notify = hasListeners(adm);
        var notifySpy = isSpyEnabled();
        var change = notify || notifySpy ? {
            type: "update",
            object: instance,
            oldValue: observable.value,
            name: name, newValue: newValue
        } : null;
        if (notifySpy) spyReportStart(change);
        observable.setNewValue(newValue);
        if (notify) notifyListeners(adm, change);
        if (notifySpy) spyReportEnd();
    }
}
function notifyPropertyAddition(adm, object, name, newValue) {
    var notify = hasListeners(adm);
    var notifySpy = isSpyEnabled();
    var change = notify || notifySpy ? {
        type: "add",
        object: object, name: name, newValue: newValue
    } : null;
    if (notifySpy) spyReportStart(change);
    if (notify) notifyListeners(adm, change);
    if (notifySpy) spyReportEnd();
}
var isObservableObjectAdministration = createInstanceofPredicate("ObservableObjectAdministration", ObservableObjectAdministration);
function isObservableObject(thing) {
    if (isObject(thing)) {
        runLazyInitializers(thing);
        return isObservableObjectAdministration(thing.$mobx);
    }
    return false;
}
exports.isObservableObject = isObservableObject;
var UNCHANGED = {};
var ObservableValue = function (_super) {
    __extends(ObservableValue, _super);
    function ObservableValue(value, enhancer, name, notifySpy) {
        if (name === void 0) {
            name = "ObservableValue@" + getNextId();
        }
        if (notifySpy === void 0) {
            notifySpy = true;
        }
        var _this = _super.call(this, name) || this;
        _this.enhancer = enhancer;
        _this.hasUnreportedChange = false;
        _this.value = enhancer(value, undefined, name);
        if (notifySpy && isSpyEnabled()) {
            spyReport({ type: "create", object: _this, newValue: _this.value });
        }
        return _this;
    }
    ObservableValue.prototype.set = function (newValue) {
        var oldValue = this.value;
        newValue = this.prepareNewValue(newValue);
        if (newValue !== UNCHANGED) {
            var notifySpy = isSpyEnabled();
            if (notifySpy) {
                spyReportStart({
                    type: "update",
                    object: this,
                    newValue: newValue, oldValue: oldValue
                });
            }
            this.setNewValue(newValue);
            if (notifySpy) spyReportEnd();
        }
    };
    ObservableValue.prototype.prepareNewValue = function (newValue) {
        checkIfStateModificationsAreAllowed(this);
        if (hasInterceptors(this)) {
            var change = interceptChange(this, { object: this, type: "update", newValue: newValue });
            if (!change) return UNCHANGED;
            newValue = change.newValue;
        }
        newValue = this.enhancer(newValue, this.value, this.name);
        return this.value !== newValue ? newValue : UNCHANGED;
    };
    ObservableValue.prototype.setNewValue = function (newValue) {
        var oldValue = this.value;
        this.value = newValue;
        this.reportChanged();
        if (hasListeners(this)) {
            notifyListeners(this, {
                type: "update",
                object: this,
                newValue: newValue,
                oldValue: oldValue
            });
        }
    };
    ObservableValue.prototype.get = function () {
        this.reportObserved();
        return this.value;
    };
    ObservableValue.prototype.intercept = function (handler) {
        return registerInterceptor(this, handler);
    };
    ObservableValue.prototype.observe = function (listener, fireImmediately) {
        if (fireImmediately) listener({
            object: this,
            type: "update",
            newValue: this.value,
            oldValue: undefined
        });
        return registerListener(this, listener);
    };
    ObservableValue.prototype.toJSON = function () {
        return this.get();
    };
    ObservableValue.prototype.toString = function () {
        return this.name + "[" + this.value + "]";
    };
    ObservableValue.prototype.valueOf = function () {
        return toPrimitive(this.get());
    };
    return ObservableValue;
}(BaseAtom);
ObservableValue.prototype[primitiveSymbol()] = ObservableValue.prototype.valueOf;
var isObservableValue = createInstanceofPredicate("ObservableValue", ObservableValue);
exports.isBoxedObservable = isObservableValue;
function getAtom(thing, property) {
    if ((typeof thing === "undefined" ? "undefined" : _typeof(thing)) === "object" && thing !== null) {
        if (isObservableArray(thing)) {
            invariant(property === undefined, getMessage("m036"));
            return thing.$mobx.atom;
        }
        if (isObservableMap(thing)) {
            var anyThing = thing;
            if (property === undefined) return getAtom(anyThing._keys);
            var observable_2 = anyThing._data[property] || anyThing._hasMap[property];
            invariant(!!observable_2, "the entry '" + property + "' does not exist in the observable map '" + getDebugName(thing) + "'");
            return observable_2;
        }
        runLazyInitializers(thing);
        if (isObservableObject(thing)) {
            if (!property) return fail("please specify a property");
            var observable_3 = thing.$mobx.values[property];
            invariant(!!observable_3, "no observable property '" + property + "' found on the observable object '" + getDebugName(thing) + "'");
            return observable_3;
        }
        if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) {
            return thing;
        }
    } else if (typeof thing === "function") {
        if (isReaction(thing.$mobx)) {
            return thing.$mobx;
        }
    }
    return fail("Cannot obtain atom from " + thing);
}
function getAdministration(thing, property) {
    invariant(thing, "Expecting some object");
    if (property !== undefined) return getAdministration(getAtom(thing, property));
    if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) return thing;
    if (isObservableMap(thing)) return thing;
    runLazyInitializers(thing);
    if (thing.$mobx) return thing.$mobx;
    invariant(false, "Cannot obtain administration from " + thing);
}
function getDebugName(thing, property) {
    var named;
    if (property !== undefined) named = getAtom(thing, property);else if (isObservableObject(thing) || isObservableMap(thing)) named = getAdministration(thing);else named = getAtom(thing);
    return named.name;
}
function createClassPropertyDecorator(onInitialize, _get, _set, enumerable, allowCustomArguments) {
    function classPropertyDecorator(target, key, descriptor, customArgs, argLen) {
        if (argLen === void 0) {
            argLen = 0;
        }
        invariant(allowCustomArguments || quacksLikeADecorator(arguments), "This function is a decorator, but it wasn't invoked like a decorator");
        if (!descriptor) {
            var newDescriptor = {
                enumerable: enumerable,
                configurable: true,
                get: function get() {
                    if (!this.__mobxInitializedProps || this.__mobxInitializedProps[key] !== true) typescriptInitializeProperty(this, key, undefined, onInitialize, customArgs, descriptor);
                    return _get.call(this, key);
                },
                set: function set(v) {
                    if (!this.__mobxInitializedProps || this.__mobxInitializedProps[key] !== true) {
                        typescriptInitializeProperty(this, key, v, onInitialize, customArgs, descriptor);
                    } else {
                        _set.call(this, key, v);
                    }
                }
            };
            if (arguments.length < 3 || arguments.length === 5 && argLen < 3) {
                Object.defineProperty(target, key, newDescriptor);
            }
            return newDescriptor;
        } else {
            if (!hasOwnProperty(target, "__mobxLazyInitializers")) {
                addHiddenProp(target, "__mobxLazyInitializers", target.__mobxLazyInitializers && target.__mobxLazyInitializers.slice() || []);
            }
            var value_1 = descriptor.value,
                initializer_1 = descriptor.initializer;
            target.__mobxLazyInitializers.push(function (instance) {
                onInitialize(instance, key, initializer_1 ? initializer_1.call(instance) : value_1, customArgs, descriptor);
            });
            return {
                enumerable: enumerable, configurable: true,
                get: function get() {
                    if (this.__mobxDidRunLazyInitializers !== true) runLazyInitializers(this);
                    return _get.call(this, key);
                },
                set: function set(v) {
                    if (this.__mobxDidRunLazyInitializers !== true) runLazyInitializers(this);
                    _set.call(this, key, v);
                }
            };
        }
    }
    if (allowCustomArguments) {
        return function () {
            if (quacksLikeADecorator(arguments)) return classPropertyDecorator.apply(null, arguments);
            var outerArgs = arguments;
            var argLen = arguments.length;
            return function (target, key, descriptor) {
                return classPropertyDecorator(target, key, descriptor, outerArgs, argLen);
            };
        };
    }
    return classPropertyDecorator;
}
function typescriptInitializeProperty(instance, key, v, onInitialize, customArgs, baseDescriptor) {
    if (!hasOwnProperty(instance, "__mobxInitializedProps")) addHiddenProp(instance, "__mobxInitializedProps", {});
    instance.__mobxInitializedProps[key] = true;
    onInitialize(instance, key, v, customArgs, baseDescriptor);
}
function runLazyInitializers(instance) {
    if (instance.__mobxDidRunLazyInitializers === true) return;
    if (instance.__mobxLazyInitializers) {
        addHiddenProp(instance, "__mobxDidRunLazyInitializers", true);
        instance.__mobxDidRunLazyInitializers && instance.__mobxLazyInitializers.forEach(function (initializer) {
            return initializer(instance);
        });
    }
}
function quacksLikeADecorator(args) {
    return (args.length === 2 || args.length === 3) && typeof args[1] === "string";
}
function iteratorSymbol() {
    return typeof Symbol === "function" && Symbol.iterator || "@@iterator";
}
var IS_ITERATING_MARKER = "__$$iterating";
function arrayAsIterator(array) {
    invariant(array[IS_ITERATING_MARKER] !== true, "Illegal state: cannot recycle array as iterator");
    addHiddenFinalProp(array, IS_ITERATING_MARKER, true);
    var idx = -1;
    addHiddenFinalProp(array, "next", function next() {
        idx++;
        return {
            done: idx >= this.length,
            value: idx < this.length ? this[idx] : undefined
        };
    });
    return array;
}
function declareIterator(prototType, iteratorFactory) {
    addHiddenFinalProp(prototType, iteratorSymbol(), iteratorFactory);
}
var messages = {
    "m001": "It is not allowed to assign new values to @action fields",
    "m002": "`runInAction` expects a function",
    "m003": "`runInAction` expects a function without arguments",
    "m004": "autorun expects a function",
    "m005": "Warning: attempted to pass an action to autorun. Actions are untracked and will not trigger on state changes. Use `reaction` or wrap only your state modification code in an action.",
    "m006": "Warning: attempted to pass an action to autorunAsync. Actions are untracked and will not trigger on state changes. Use `reaction` or wrap only your state modification code in an action.",
    "m007": "reaction only accepts 2 or 3 arguments. If migrating from MobX 2, please provide an options object",
    "m008": "wrapping reaction expression in `asReference` is no longer supported, use options object instead",
    "m009": "@computed can only be used on getter functions, like: '@computed get myProps() { return ...; }'. It looks like it was used on a property.",
    "m010": "@computed can only be used on getter functions, like: '@computed get myProps() { return ...; }'",
    "m011": "First argument to `computed` should be an expression. If using computed as decorator, don't pass it arguments",
    "m012": "computed takes one or two arguments if used as function",
    "m013": "[mobx.expr] 'expr' should only be used inside other reactive functions.",
    "m014": "extendObservable expected 2 or more arguments",
    "m015": "extendObservable expects an object as first argument",
    "m016": "extendObservable should not be used on maps, use map.merge instead",
    "m017": "all arguments of extendObservable should be objects",
    "m018": "extending an object with another observable (object) is not supported. Please construct an explicit propertymap, using `toJS` if need. See issue #540",
    "m019": "[mobx.isObservable] isObservable(object, propertyName) is not supported for arrays and maps. Use map.has or array.length instead.",
    "m020": "modifiers can only be used for individual object properties",
    "m021": "observable expects zero or one arguments",
    "m022": "@observable can not be used on getters, use @computed instead",
    "m023": "Using `transaction` is deprecated, use `runInAction` or `(@)action` instead.",
    "m024": "whyRun() can only be used if a derivation is active, or by passing an computed value / reaction explicitly. If you invoked whyRun from inside a computation; the computation is currently suspended but re-evaluating because somebody requested its value.",
    "m025": "whyRun can only be used on reactions and computed values",
    "m026": "`action` can only be invoked on functions",
    "m028": "It is not allowed to set `useStrict` when a derivation is running",
    "m029": "INTERNAL ERROR only onBecomeUnobserved shouldn't be called twice in a row",
    "m030a": "Since strict-mode is enabled, changing observed observable values outside actions is not allowed. Please wrap the code in an `action` if this change is intended. Tried to modify: ",
    "m030b": "Side effects like changing state are not allowed at this point. Are you trying to modify state from, for example, the render function of a React component? Tried to modify: ",
    "m031": "Computed values are not allowed to not cause side effects by changing observables that are already being observed. Tried to modify: ",
    "m032": "* This computation is suspended (not in use by any reaction) and won't run automatically.\n	Didn't expect this computation to be suspended at this point?\n	  1. Make sure this computation is used by a reaction (reaction, autorun, observer).\n	  2. Check whether you are using this computation synchronously (in the same stack as they reaction that needs it).",
    "m033": "`observe` doesn't support the fire immediately property for observable maps.",
    "m034": "`mobx.map` is deprecated, use `new ObservableMap` or `mobx.observable.map` instead",
    "m035": "Cannot make the designated object observable; it is not extensible",
    "m036": "It is not possible to get index atoms from arrays",
    "m037": "Hi there! I'm sorry you have just run into an exception.\nIf your debugger ends up here, know that some reaction (like the render() of an observer component, autorun or reaction)\nthrew an exception and that mobx caught it, to avoid that it brings the rest of your application down.\nThe original cause of the exception (the code that caused this reaction to run (again)), is still in the stack.\n\nHowever, more interesting is the actual stack trace of the error itself.\nHopefully the error is an instanceof Error, because in that case you can inspect the original stack of the error from where it was thrown.\nSee `error.stack` property, or press the very subtle \"(...)\" link you see near the console.error message that probably brought you here.\nThat stack is more interesting than the stack of this console.error itself.\n\nIf the exception you see is an exception you created yourself, make sure to use `throw new Error(\"Oops\")` instead of `throw \"Oops\"`,\nbecause the javascript environment will only preserve the original stack trace in the first form.\n\nYou can also make sure the debugger pauses the next time this very same exception is thrown by enabling \"Pause on caught exception\".\n(Note that it might pause on many other, unrelated exception as well).\n\nIf that all doesn't help you out, feel free to open an issue https://github.com/mobxjs/mobx/issues!\n",
    "m038": "Missing items in this list?\n    1. Check whether all used values are properly marked as observable (use isObservable to verify)\n    2. Make sure you didn't dereference values too early. MobX observes props, not primitives. E.g: use 'person.name' instead of 'name' in your computation.\n"
};
function getMessage(id) {
    return messages[id];
}
var EMPTY_ARRAY = [];
Object.freeze(EMPTY_ARRAY);
function getGlobal() {
    return global;
}
function getNextId() {
    return ++globalState.mobxGuid;
}
function fail(message, thing) {
    invariant(false, message, thing);
    throw "X";
}
function invariant(check, message, thing) {
    if (!check) throw new Error("[mobx] Invariant failed: " + message + (thing ? " in '" + thing + "'" : ""));
}
var deprecatedMessages = [];
function deprecated(msg) {
    if (deprecatedMessages.indexOf(msg) !== -1) return false;
    deprecatedMessages.push(msg);
    console.error("[mobx] Deprecated: " + msg);
    return true;
}
function once(func) {
    var invoked = false;
    return function () {
        if (invoked) return;
        invoked = true;
        return func.apply(this, arguments);
    };
}
var noop = function noop() {};
function unique(list) {
    var res = [];
    list.forEach(function (item) {
        if (res.indexOf(item) === -1) res.push(item);
    });
    return res;
}
function joinStrings(things, limit, separator) {
    if (limit === void 0) {
        limit = 100;
    }
    if (separator === void 0) {
        separator = " - ";
    }
    if (!things) return "";
    var sliced = things.slice(0, limit);
    return "" + sliced.join(separator) + (things.length > limit ? " (... and " + (things.length - limit) + "more)" : "");
}
function isObject(value) {
    return value !== null && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object";
}
function isPlainObject(value) {
    if (value === null || (typeof value === "undefined" ? "undefined" : _typeof(value)) !== "object") return false;
    var proto = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
}
function objectAssign() {
    var res = arguments[0];
    for (var i = 1, l = arguments.length; i < l; i++) {
        var source = arguments[i];
        for (var key in source) {
            if (hasOwnProperty(source, key)) {
                res[key] = source[key];
            }
        }
    }
    return res;
}
function valueDidChange(compareStructural, oldValue, newValue) {
    if (typeof oldValue === 'number' && isNaN(oldValue)) {
        return typeof newValue !== 'number' || !isNaN(newValue);
    }
    return compareStructural ? !deepEqual(oldValue, newValue) : oldValue !== newValue;
}
var prototypeHasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwnProperty(object, propName) {
    return prototypeHasOwnProperty.call(object, propName);
}
function makeNonEnumerable(object, propNames) {
    for (var i = 0; i < propNames.length; i++) {
        addHiddenProp(object, propNames[i], object[propNames[i]]);
    }
}
function addHiddenProp(object, propName, value) {
    Object.defineProperty(object, propName, {
        enumerable: false,
        writable: true,
        configurable: true,
        value: value
    });
}
function addHiddenFinalProp(object, propName, value) {
    Object.defineProperty(object, propName, {
        enumerable: false,
        writable: false,
        configurable: true,
        value: value
    });
}
function isPropertyConfigurable(object, prop) {
    var descriptor = Object.getOwnPropertyDescriptor(object, prop);
    return !descriptor || descriptor.configurable !== false && descriptor.writable !== false;
}
function assertPropertyConfigurable(object, prop) {
    invariant(isPropertyConfigurable(object, prop), "Cannot make property '" + prop + "' observable, it is not configurable and writable in the target object");
}
function getEnumerableKeys(obj) {
    var res = [];
    for (var key in obj) {
        res.push(key);
    }return res;
}
function deepEqual(a, b) {
    if (a === null && b === null) return true;
    if (a === undefined && b === undefined) return true;
    if ((typeof a === "undefined" ? "undefined" : _typeof(a)) !== "object") return a === b;
    var aIsArray = isArrayLike(a);
    var aIsMap = isMapLike(a);
    if (aIsArray !== isArrayLike(b)) {
        return false;
    } else if (aIsMap !== isMapLike(b)) {
        return false;
    } else if (aIsArray) {
        if (a.length !== b.length) return false;
        for (var i = a.length - 1; i >= 0; i--) {
            if (!deepEqual(a[i], b[i])) return false;
        }return true;
    } else if (aIsMap) {
        if (a.size !== b.size) return false;
        var equals_1 = true;
        a.forEach(function (value, key) {
            equals_1 = equals_1 && deepEqual(b.get(key), value);
        });
        return equals_1;
    } else if ((typeof a === "undefined" ? "undefined" : _typeof(a)) === "object" && (typeof b === "undefined" ? "undefined" : _typeof(b)) === "object") {
        if (a === null || b === null) return false;
        if (isMapLike(a) && isMapLike(b)) {
            if (a.size !== b.size) return false;
            return deepEqual(observable.shallowMap(a).entries(), observable.shallowMap(b).entries());
        }
        if (getEnumerableKeys(a).length !== getEnumerableKeys(b).length) return false;
        for (var prop in a) {
            if (!(prop in b)) return false;
            if (!deepEqual(a[prop], b[prop])) return false;
        }
        return true;
    }
    return false;
}
function createInstanceofPredicate(name, clazz) {
    var propName = "isMobX" + name;
    clazz.prototype[propName] = true;
    return function (x) {
        return isObject(x) && x[propName] === true;
    };
}
function isArrayLike(x) {
    return Array.isArray(x) || isObservableArray(x);
}
exports.isArrayLike = isArrayLike;
function isMapLike(x) {
    return isES6Map(x) || isObservableMap(x);
}
function isES6Map(thing) {
    if (getGlobal().Map !== undefined && thing instanceof getGlobal().Map) return true;
    return false;
}
function primitiveSymbol() {
    return typeof Symbol === "function" && Symbol.toPrimitive || "@@toPrimitive";
}
function toPrimitive(value) {
    return value === null ? null : (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" ? "" + value : value;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _icons = __webpack_require__(6);

var _constants = __webpack_require__(0);

function renderHeader(_ref, instance) {
  var meta = _ref.meta,
      user = _ref.user,
      reactions = _ref.reactions;

  var container = document.createElement('div');
  container.lang = "en-US";
  container.className = 'gitment-container gitment-header-container';

  var likeButton = document.createElement('span');
  var likedReaction = reactions.find(function (reaction) {
    return reaction.content === 'heart' && reaction.user.login === user.login;
  });
  likeButton.className = 'gitment-header-like-btn';
  likeButton.innerHTML = '\n    ' + _icons.heart + '\n    ' + (likedReaction ? 'Unlike' : 'Like') + '\n    ' + (meta.reactions && meta.reactions.heart ? ' \u2022 <strong>' + meta.reactions.heart + '</strong> Liked' : '') + '\n  ';

  if (likedReaction) {
    likeButton.classList.add('liked');
    likeButton.onclick = function () {
      return instance.unlike();
    };
  } else {
    likeButton.classList.remove('liked');
    likeButton.onclick = function () {
      return instance.like();
    };
  }
  container.appendChild(likeButton);

  var commentsCount = document.createElement('span');
  commentsCount.innerHTML = '\n    ' + (meta.comments ? ' \u2022 <strong>' + meta.comments + '</strong> Comments' : '') + '\n  ';
  container.appendChild(commentsCount);

  var issueLink = document.createElement('a');
  issueLink.className = 'gitment-header-issue-link';
  issueLink.href = meta.html_url;
  issueLink.target = '_blank';
  issueLink.innerText = 'Issue Page';
  container.appendChild(issueLink);

  return container;
}

function renderComments(_ref2, instance) {
  var meta = _ref2.meta,
      comments = _ref2.comments,
      commentReactions = _ref2.commentReactions,
      currentPage = _ref2.currentPage,
      user = _ref2.user,
      error = _ref2.error;

  var container = document.createElement('div');
  container.lang = "en-US";
  container.className = 'gitment-container gitment-comments-container';

  if (error) {
    var errorBlock = document.createElement('div');
    errorBlock.className = 'gitment-comments-error';

    if (error === _constants.NOT_INITIALIZED_ERROR && user.login && user.login.toLowerCase() === instance.owner.toLowerCase()) {
      var initHint = document.createElement('div');
      var initButton = document.createElement('button');
      initButton.className = 'gitment-comments-init-btn';
      initButton.onclick = function () {
        initButton.setAttribute('disabled', true);
        instance.init().catch(function (e) {
          initButton.removeAttribute('disabled');
          alert(e);
        });
      };
      initButton.innerText = 'Initialize Comments';
      initHint.appendChild(initButton);
      errorBlock.appendChild(initHint);
    } else {
      errorBlock.innerText = error;
    }
    container.appendChild(errorBlock);
    return container;
  } else if (comments === undefined) {
    var loading = document.createElement('div');
    loading.innerText = 'Loading comments...';
    loading.className = 'gitment-comments-loading';
    container.appendChild(loading);
    return container;
  } else if (!comments.length) {
    var emptyBlock = document.createElement('div');
    emptyBlock.className = 'gitment-comments-empty';
    emptyBlock.innerText = 'No Comment Yet';
    container.appendChild(emptyBlock);
    return container;
  }

  var commentsList = document.createElement('ul');
  commentsList.className = 'gitment-comments-list';

  comments.forEach(function (comment) {
    var createDate = new Date(comment.created_at);
    var updateDate = new Date(comment.updated_at);
    var commentItem = document.createElement('li');
    commentItem.className = 'gitment-comment';
    commentItem.innerHTML = '\n      <a class="gitment-comment-avatar" href="' + comment.user.html_url + '" target="_blank">\n        <img class="gitment-comment-avatar-img" src="' + comment.user.avatar_url + '"/>\n      </a>\n      <div class="gitment-comment-main">\n        <div class="gitment-comment-header">\n          <a class="gitment-comment-name" href="' + comment.user.html_url + '" target="_blank">\n            ' + comment.user.login + '\n          </a>\n          commented on\n          <span title="' + createDate + '">' + createDate.toDateString() + '</span>\n          ' + (createDate.toString() !== updateDate.toString() ? ' \u2022 <span title="comment was edited at ' + updateDate + '">edited</span>' : '') + '\n          <div class="gitment-comment-like-btn">' + _icons.heart + ' ' + (comment.reactions.heart || '') + '</div>\n        </div>\n        <div class="gitment-comment-body gitment-markdown">' + comment.body_html + '</div>\n      </div>\n    ';
    var likeButton = commentItem.querySelector('.gitment-comment-like-btn');
    var likedReaction = commentReactions[comment.id] && commentReactions[comment.id].find(function (reaction) {
      return reaction.content === 'heart' && reaction.user.login === user.login;
    });
    if (likedReaction) {
      likeButton.classList.add('liked');
      likeButton.onclick = function () {
        return instance.unlikeAComment(comment.id);
      };
    } else {
      likeButton.classList.remove('liked');
      likeButton.onclick = function () {
        return instance.likeAComment(comment.id);
      };
    }

    // dirty
    // use a blank image to trigger height calculating when element rendered
    var imgTrigger = document.createElement('img');
    var markdownBody = commentItem.querySelector('.gitment-comment-body');
    imgTrigger.className = 'gitment-hidden';
    imgTrigger.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
    imgTrigger.onload = function () {
      if (markdownBody.clientHeight > instance.maxCommentHeight) {
        markdownBody.classList.add('gitment-comment-body-folded');
        markdownBody.style.maxHeight = instance.maxCommentHeight + 'px';
        markdownBody.title = 'Click to Expand';
        markdownBody.onclick = function () {
          markdownBody.classList.remove('gitment-comment-body-folded');
          markdownBody.style.maxHeight = '';
          markdownBody.title = '';
          markdownBody.onclick = null;
        };
      }
    };
    commentItem.appendChild(imgTrigger);

    commentsList.appendChild(commentItem);
  });

  container.appendChild(commentsList);

  if (meta) {
    var pageCount = Math.ceil(meta.comments / instance.perPage);
    if (pageCount > 1) {
      var pagination = document.createElement('ul');
      pagination.className = 'gitment-comments-pagination';

      if (currentPage > 1) {
        var previousButton = document.createElement('li');
        previousButton.className = 'gitment-comments-page-item';
        previousButton.innerText = 'Previous';
        previousButton.onclick = function () {
          return instance.goto(currentPage - 1);
        };
        pagination.appendChild(previousButton);
      }

      var _loop = function _loop(i) {
        var pageItem = document.createElement('li');
        pageItem.className = 'gitment-comments-page-item';
        pageItem.innerText = i;
        pageItem.onclick = function () {
          return instance.goto(i);
        };
        if (currentPage === i) pageItem.classList.add('gitment-selected');
        pagination.appendChild(pageItem);
      };

      for (var i = 1; i <= pageCount; i++) {
        _loop(i);
      }

      if (currentPage < pageCount) {
        var nextButton = document.createElement('li');
        nextButton.className = 'gitment-comments-page-item';
        nextButton.innerText = 'Next';
        nextButton.onclick = function () {
          return instance.goto(currentPage + 1);
        };
        pagination.appendChild(nextButton);
      }

      container.appendChild(pagination);
    }
  }

  return container;
}

function renderEditor(_ref3, instance) {
  var user = _ref3.user,
      error = _ref3.error;

  var container = document.createElement('div');
  container.lang = "en-US";
  container.className = 'gitment-container gitment-editor-container';

  var shouldDisable = user.login && !error ? '' : 'disabled';
  var disabledTip = user.login ? '' : 'Login to Comment';
  container.innerHTML = '\n      ' + (user.login ? '<a class="gitment-editor-avatar" href="' + user.html_url + '" target="_blank">\n            <img class="gitment-editor-avatar-img" src="' + user.avatar_url + '"/>\n          </a>' : user.isLoggingIn ? '<div class="gitment-editor-avatar">' + _icons.spinner + '</div>' : '<a class="gitment-editor-avatar" href="' + instance.loginLink + '" title="login with GitHub">\n              ' + _icons.github + '\n            </a>') + '\n    </a>\n    <div class="gitment-editor-main">\n      <div class="gitment-editor-header">\n        <nav class="gitment-editor-tabs">\n          <button class="gitment-editor-tab gitment-selected">Write</button>\n          <button class="gitment-editor-tab">Preview</button>\n        </nav>\n        <div class="gitment-editor-login">\n          ' + (user.login ? '<a class="gitment-editor-logout-link">Logout</a>' : user.isLoggingIn ? 'Logging in...' : '<a class="gitment-editor-login-link" href="' + instance.loginLink + '">Login</a> with GitHub') + '\n        </div>\n      </div>\n      <div class="gitment-editor-body">\n        <div class="gitment-editor-write-field">\n          <textarea placeholder="Leave a comment" title="' + disabledTip + '" ' + shouldDisable + '></textarea>\n        </div>\n        <div class="gitment-editor-preview-field gitment-hidden">\n          <div class="gitment-editor-preview gitment-markdown"></div>\n        </div>\n      </div>\n    </div>\n    <div class="gitment-editor-footer">\n      <a class="gitment-editor-footer-tip" href="https://guides.github.com/features/mastering-markdown/" target="_blank">\n        Styling with Markdown is supported\n      </a>\n      <button class="gitment-editor-submit" title="' + disabledTip + '" ' + shouldDisable + '>Comment</button>\n    </div>\n  ';
  if (user.login) {
    container.querySelector('.gitment-editor-logout-link').onclick = function () {
      return instance.logout();
    };
  }

  var writeField = container.querySelector('.gitment-editor-write-field');
  var previewField = container.querySelector('.gitment-editor-preview-field');

  var textarea = writeField.querySelector('textarea');
  textarea.oninput = function () {
    textarea.style.height = 'auto';
    var style = window.getComputedStyle(textarea, null);
    var height = parseInt(style.height, 10);
    var clientHeight = textarea.clientHeight;
    var scrollHeight = textarea.scrollHeight;
    if (clientHeight < scrollHeight) {
      textarea.style.height = height + scrollHeight - clientHeight + 'px';
    }
  };

  var _container$querySelec = container.querySelectorAll('.gitment-editor-tab'),
      _container$querySelec2 = _slicedToArray(_container$querySelec, 2),
      writeTab = _container$querySelec2[0],
      previewTab = _container$querySelec2[1];

  writeTab.onclick = function () {
    writeTab.classList.add('gitment-selected');
    previewTab.classList.remove('gitment-selected');
    writeField.classList.remove('gitment-hidden');
    previewField.classList.add('gitment-hidden');

    textarea.focus();
  };
  previewTab.onclick = function () {
    previewTab.classList.add('gitment-selected');
    writeTab.classList.remove('gitment-selected');
    previewField.classList.remove('gitment-hidden');
    writeField.classList.add('gitment-hidden');

    var preview = previewField.querySelector('.gitment-editor-preview');
    var content = textarea.value.trim();
    if (!content) {
      preview.innerText = 'Nothing to preview';
      return;
    }

    preview.innerText = 'Loading preview...';
    instance.markdown(content).then(function (html) {
      return preview.innerHTML = html;
    });
  };

  var submitButton = container.querySelector('.gitment-editor-submit');
  submitButton.onclick = function () {
    submitButton.innerText = 'Submitting...';
    submitButton.setAttribute('disabled', true);
    instance.post(textarea.value.trim()).then(function (data) {
      textarea.value = '';
      textarea.style.height = 'auto';
      submitButton.removeAttribute('disabled');
      submitButton.innerText = 'Comment';
    }).catch(function (e) {
      alert(e);
      submitButton.removeAttribute('disabled');
      submitButton.innerText = 'Comment';
    });
  };

  return container;
}

function renderFooter() {
  var container = document.createElement('div');
  container.lang = "en-US";
  container.className = 'gitment-container gitment-footer-container';
  container.innerHTML = '\n    Powered by\n    <a class="gitment-footer-project-link" href="https://github.com/imsun/gitment" target="_blank">\n      Gitment\n    </a>\n  ';
  return container;
}

function render(state, instance) {
  var container = document.createElement('div');
  container.lang = "en-US";
  container.className = 'gitment-container gitment-root-container';
  container.appendChild(instance.renderHeader(state, instance));
  container.appendChild(instance.renderComments(state, instance));
  container.appendChild(instance.renderEditor(state, instance));
  container.appendChild(instance.renderFooter(state, instance));
  return container;
}

exports.default = { render: render, renderHeader: renderHeader, renderComments: renderComments, renderEditor: renderEditor, renderFooter: renderFooter };

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.http = exports.Query = exports.isString = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.getTargetContainer = getTargetContainer;

var _constants = __webpack_require__(0);

var isString = exports.isString = function isString(s) {
  return toString.call(s) === '[object String]';
};

function getTargetContainer(container) {
  var targetContainer = void 0;
  if (container instanceof Element) {
    targetContainer = container;
  } else if (isString(container)) {
    targetContainer = document.getElementById(container);
  } else {
    targetContainer = document.createElement('div');
  }

  return targetContainer;
}

var Query = exports.Query = {
  parse: function parse() {
    var search = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.location.search;

    if (!search) return {};
    var queryString = search[0] === '?' ? search.substring(1) : search;
    var query = {};
    queryString.split('&').forEach(function (queryStr) {
      var _queryStr$split = queryStr.split('='),
          _queryStr$split2 = _slicedToArray(_queryStr$split, 2),
          key = _queryStr$split2[0],
          value = _queryStr$split2[1];

      if (key) query[key] = value;
    });

    return query;
  },
  stringify: function stringify(query) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '?';

    var queryString = Object.keys(query).map(function (key) {
      return key + '=' + encodeURIComponent(query[key] || '');
    }).join('&');
    return queryString ? prefix + queryString : '';
  }
};

function ajaxFactory(method) {
  return function (apiPath) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var base = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'https://api.github.com';

    var req = new XMLHttpRequest();
    var token = localStorage.getItem(_constants.LS_ACCESS_TOKEN_KEY);

    var url = '' + base + apiPath;
    var body = null;
    if (method === 'GET' || method === 'DELETE') {
      url += Query.stringify(data);
    }

    var p = new Promise(function (resolve, reject) {
      req.addEventListener('load', function () {
        var contentType = req.getResponseHeader('content-type');
        var res = req.responseText;
        if (!/json/.test(contentType)) {
          resolve(res);
          return;
        }
        var data = req.responseText ? JSON.parse(res) : {};
        if (data.message) {
          reject(new Error(data.message));
        } else {
          resolve(data);
        }
      });
      req.addEventListener('error', function (error) {
        return reject(error);
      });
    });
    req.open(method, url, true);

    req.setRequestHeader('Accept', 'application/vnd.github.squirrel-girl-preview, application/vnd.github.html+json');
    if (token) {
      req.setRequestHeader('Authorization', 'token ' + token);
    }
    if (method !== 'GET' && method !== 'DELETE') {
      body = JSON.stringify(data);
      req.setRequestHeader('Content-Type', 'application/json');
    }

    req.send(body);
    return p;
  };
}

var http = exports.http = {
  get: ajaxFactory('GET'),
  post: ajaxFactory('POST'),
  delete: ajaxFactory('DELETE'),
  put: ajaxFactory('PUT')
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mobx = __webpack_require__(1);

var _constants = __webpack_require__(0);

var _utils = __webpack_require__(3);

var _default = __webpack_require__(2);

var _default2 = _interopRequireDefault(_default);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var scope = 'public_repo';

function extendRenderer(instance, renderer) {
  instance[renderer] = function (container) {
    var targetContainer = (0, _utils.getTargetContainer)(container);
    var render = instance.theme[renderer] || instance.defaultTheme[renderer];

    (0, _mobx.autorun)(function () {
      var e = render(instance.state, instance);
      if (targetContainer.firstChild) {
        targetContainer.replaceChild(e, targetContainer.firstChild);
      } else {
        targetContainer.appendChild(e);
      }
    });

    return targetContainer;
  };
}

var Gitment = function () {
  _createClass(Gitment, [{
    key: 'accessToken',
    get: function get() {
      return localStorage.getItem(_constants.LS_ACCESS_TOKEN_KEY);
    },
    set: function set(token) {
      localStorage.setItem(_constants.LS_ACCESS_TOKEN_KEY, token);
    }
  }, {
    key: 'loginLink',
    get: function get() {
      var oauthUri = 'https://github.com/login/oauth/authorize';
      var redirect_uri = this.oauth.redirect_uri || window.location.href;

      var oauthParams = Object.assign({
        scope: scope,
        redirect_uri: redirect_uri
      }, this.oauth);

      return '' + oauthUri + _utils.Query.stringify(oauthParams);
    }
  }]);

  function Gitment() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Gitment);

    this.defaultTheme = _default2.default;
    this.useTheme(_default2.default);

    Object.assign(this, {
      id: window.location.href,
      title: window.document.title,
      link: window.location.href,
      desc: '',
      labels: [],
      theme: _default2.default,
      oauth: {},
      perPage: 20,
      maxCommentHeight: 250
    }, options);

    this.useTheme(this.theme);

    var user = {};
    try {
      var userInfo = localStorage.getItem(_constants.LS_USER_KEY);
      if (this.accessToken && userInfo) {
        Object.assign(user, JSON.parse(userInfo), {
          fromCache: true
        });
      }
    } catch (e) {
      localStorage.removeItem(_constants.LS_USER_KEY);
    }

    this.state = (0, _mobx.observable)({
      user: user,
      error: null,
      meta: {},
      comments: undefined,
      reactions: [],
      commentReactions: {},
      currentPage: 1
    });

    var query = _utils.Query.parse();
    if (query.code) {
      var _oauth = this.oauth,
          client_id = _oauth.client_id,
          client_secret = _oauth.client_secret;

      var code = query.code;
      delete query.code;
      var search = _utils.Query.stringify(query);
      var replacedUrl = '' + window.location.origin + window.location.pathname + search + window.location.hash;
      history.replaceState({}, '', replacedUrl);

      Object.assign(this, {
        id: replacedUrl,
        link: replacedUrl
      }, options);

      this.state.user.isLoggingIn = true;
      _utils.http.post('https://gh-oauth.imsun.net', {
        code: code,
        client_id: client_id,
        client_secret: client_secret
      }, '').then(function (data) {
        _this.accessToken = data.access_token;
        _this.update();
      }).catch(function (e) {
        _this.state.user.isLoggingIn = false;
        alert(e);
      });
    } else {
      this.update();
    }
  }

  _createClass(Gitment, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      return this.createIssue().then(function () {
        return _this2.loadComments();
      }).then(function (comments) {
        _this2.state.error = null;
        return comments;
      });
    }
  }, {
    key: 'useTheme',
    value: function useTheme() {
      var _this3 = this;

      var theme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.theme = theme;

      var renderers = Object.keys(this.theme);
      renderers.forEach(function (renderer) {
        return extendRenderer(_this3, renderer);
      });
    }
  }, {
    key: 'update',
    value: function update() {
      var _this4 = this;

      return Promise.all([this.loadMeta(), this.loadUserInfo()]).then(function () {
        return Promise.all([_this4.loadComments().then(function () {
          return _this4.loadCommentReactions();
        }), _this4.loadReactions()]);
      }).catch(function (e) {
        return _this4.state.error = e;
      });
    }
  }, {
    key: 'markdown',
    value: function markdown(text) {
      return _utils.http.post('/markdown', {
        text: text,
        mode: 'gfm'
      });
    }
  }, {
    key: 'createIssue',
    value: function createIssue() {
      var _this5 = this;

      var id = this.id,
          owner = this.owner,
          repo = this.repo,
          title = this.title,
          link = this.link,
          desc = this.desc,
          labels = this.labels;


      return _utils.http.post('/repos/' + owner + '/' + repo + '/issues', {
        title: title,
        labels: labels.concat(['gitment', decodeURI(id)]),
        body: decodeURI(link) + '\n\n' + desc
      }).then(function (meta) {
        _this5.state.meta = meta;
        return meta;
      });
    }
  }, {
    key: 'getIssue',
    value: function getIssue() {
      if (this.state.meta.id) return Promise.resolve(this.state.meta);

      return this.loadMeta();
    }
  }, {
    key: 'post',
    value: function post(body) {
      var _this6 = this;

      return this.getIssue().then(function (issue) {
        return _utils.http.post(issue.comments_url, { body: body }, '');
      }).then(function (data) {
        _this6.state.meta.comments++;
        var pageCount = Math.ceil(_this6.state.meta.comments / _this6.perPage);
        if (_this6.state.currentPage === pageCount) {
          _this6.state.comments.push(data);
        }
        return data;
      });
    }
  }, {
    key: 'loadMeta',
    value: function loadMeta() {
      var _this7 = this;

      var id = this.id,
          owner = this.owner,
          repo = this.repo;

      return _utils.http.get('/repos/' + owner + '/' + repo + '/issues', {
        creator: owner,
        labels: decodeURI(id)
      }).then(function (issues) {
        if (!issues.length) return Promise.reject(_constants.NOT_INITIALIZED_ERROR);
        _this7.state.meta = issues[0];
        return issues[0];
      });
    }
  }, {
    key: 'loadComments',
    value: function loadComments() {
      var _this8 = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.currentPage;

      return this.getIssue().then(function (issue) {
        return _utils.http.get(issue.comments_url, { page: page, per_page: _this8.perPage }, '');
      }).then(function (comments) {
        _this8.state.comments = comments;
        return comments;
      });
    }
  }, {
    key: 'loadUserInfo',
    value: function loadUserInfo() {
      var _this9 = this;

      if (!this.accessToken) {
        this.logout();
        return Promise.resolve({});
      }

      return _utils.http.get('/user').then(function (user) {
        _this9.state.user = user;
        localStorage.setItem(_constants.LS_USER_KEY, JSON.stringify(user));
        return user;
      });
    }
  }, {
    key: 'loadReactions',
    value: function loadReactions() {
      var _this10 = this;

      if (!this.accessToken) {
        this.state.reactions = [];
        return Promise.resolve([]);
      }

      return this.getIssue().then(function (issue) {
        if (!issue.reactions.total_count) return [];
        return _utils.http.get(issue.reactions.url, {}, '');
      }).then(function (reactions) {
        _this10.state.reactions = reactions;
        return reactions;
      });
    }
  }, {
    key: 'loadCommentReactions',
    value: function loadCommentReactions() {
      var _this11 = this;

      if (!this.accessToken) {
        this.state.commentReactions = {};
        return Promise.resolve([]);
      }

      var comments = this.state.comments;
      var comentReactions = {};

      return Promise.all(comments.map(function (comment) {
        if (!comment.reactions.total_count) return [];

        var owner = _this11.owner,
            repo = _this11.repo;

        return _utils.http.get('/repos/' + owner + '/' + repo + '/issues/comments/' + comment.id + '/reactions', {});
      })).then(function (reactionsArray) {
        comments.forEach(function (comment, index) {
          comentReactions[comment.id] = reactionsArray[index];
        });
        _this11.state.commentReactions = comentReactions;

        return comentReactions;
      });
    }
  }, {
    key: 'login',
    value: function login() {
      window.location.href = this.loginLink;
    }
  }, {
    key: 'logout',
    value: function logout() {
      localStorage.removeItem(_constants.LS_ACCESS_TOKEN_KEY);
      localStorage.removeItem(_constants.LS_USER_KEY);
      this.state.user = {};
    }
  }, {
    key: 'goto',
    value: function goto(page) {
      this.state.currentPage = page;
      this.state.comments = undefined;
      return this.loadComments(page);
    }
  }, {
    key: 'like',
    value: function like() {
      var _this12 = this;

      if (!this.accessToken) {
        alert('Login to Like');
        return Promise.reject();
      }

      var owner = this.owner,
          repo = this.repo;


      return _utils.http.post('/repos/' + owner + '/' + repo + '/issues/' + this.state.meta.number + '/reactions', {
        content: 'heart'
      }).then(function (reaction) {
        _this12.state.reactions.push(reaction);
        _this12.state.meta.reactions.heart++;
      });
    }
  }, {
    key: 'unlike',
    value: function unlike() {
      var _this13 = this;

      if (!this.accessToken) return Promise.reject();

      var _state = this.state,
          user = _state.user,
          reactions = _state.reactions;

      var index = reactions.findIndex(function (reaction) {
        return reaction.user.login === user.login;
      });
      return _utils.http.delete('/reactions/' + reactions[index].id).then(function () {
        reactions.splice(index, 1);
        _this13.state.meta.reactions.heart--;
      });
    }
  }, {
    key: 'likeAComment',
    value: function likeAComment(commentId) {
      var _this14 = this;

      if (!this.accessToken) {
        alert('Login to Like');
        return Promise.reject();
      }

      var owner = this.owner,
          repo = this.repo;

      var comment = this.state.comments.find(function (comment) {
        return comment.id === commentId;
      });

      return _utils.http.post('/repos/' + owner + '/' + repo + '/issues/comments/' + commentId + '/reactions', {
        content: 'heart'
      }).then(function (reaction) {
        _this14.state.commentReactions[commentId].push(reaction);
        comment.reactions.heart++;
      });
    }
  }, {
    key: 'unlikeAComment',
    value: function unlikeAComment(commentId) {
      if (!this.accessToken) return Promise.reject();

      var reactions = this.state.commentReactions[commentId];
      var comment = this.state.comments.find(function (comment) {
        return comment.id === commentId;
      });
      var user = this.state.user;

      var index = reactions.findIndex(function (reaction) {
        return reaction.user.login === user.login;
      });

      return _utils.http.delete('/reactions/' + reactions[index].id).then(function () {
        reactions.splice(index, 1);
        comment.reactions.heart--;
      });
    }
  }]);

  return Gitment;
}();

module.exports = Gitment;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Modified from https://github.com/evil-icons/evil-icons
 */

var close = exports.close = '<svg class="gitment-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M37.304 11.282l1.414 1.414-26.022 26.02-1.414-1.413z"/><path d="M12.696 11.282l26.022 26.02-1.414 1.415-26.022-26.02z"/></svg>';
var github = exports.github = '<svg class="gitment-github-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M25 10c-8.3 0-15 6.7-15 15 0 6.6 4.3 12.2 10.3 14.2.8.1 1-.3 1-.7v-2.6c-4.2.9-5.1-2-5.1-2-.7-1.7-1.7-2.2-1.7-2.2-1.4-.9.1-.9.1-.9 1.5.1 2.3 1.5 2.3 1.5 1.3 2.3 3.5 1.6 4.4 1.2.1-1 .5-1.6 1-2-3.3-.4-6.8-1.7-6.8-7.4 0-1.6.6-3 1.5-4-.2-.4-.7-1.9.1-4 0 0 1.3-.4 4.1 1.5 1.2-.3 2.5-.5 3.8-.5 1.3 0 2.6.2 3.8.5 2.9-1.9 4.1-1.5 4.1-1.5.8 2.1.3 3.6.1 4 1 1 1.5 2.4 1.5 4 0 5.8-3.5 7-6.8 7.4.5.5 1 1.4 1 2.8v4.1c0 .4.3.9 1 .7 6-2 10.2-7.6 10.2-14.2C40 16.7 33.3 10 25 10z"/></svg>';
var heart = exports.heart = '<svg class="gitment-heart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M25 39.7l-.6-.5C11.5 28.7 8 25 8 19c0-5 4-9 9-9 4.1 0 6.4 2.3 8 4.1 1.6-1.8 3.9-4.1 8-4.1 5 0 9 4 9 9 0 6-3.5 9.7-16.4 20.2l-.6.5zM17 12c-3.9 0-7 3.1-7 7 0 5.1 3.2 8.5 15 18.1 11.8-9.6 15-13 15-18.1 0-3.9-3.1-7-7-7-3.5 0-5.4 2.1-6.9 3.8L25 17.1l-1.1-1.3C22.4 14.1 20.5 12 17 12z"/></svg>';
var spinner = exports.spinner = '<svg class="gitment-spinner-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M25 18c-.6 0-1-.4-1-1V9c0-.6.4-1 1-1s1 .4 1 1v8c0 .6-.4 1-1 1z"/><path opacity=".3" d="M25 42c-.6 0-1-.4-1-1v-8c0-.6.4-1 1-1s1 .4 1 1v8c0 .6-.4 1-1 1z"/><path opacity=".3" d="M29 19c-.2 0-.3 0-.5-.1-.4-.3-.6-.8-.3-1.3l4-6.9c.3-.4.8-.6 1.3-.3.4.3.6.8.3 1.3l-4 6.9c-.2.2-.5.4-.8.4z"/><path opacity=".3" d="M17 39.8c-.2 0-.3 0-.5-.1-.4-.3-.6-.8-.3-1.3l4-6.9c.3-.4.8-.6 1.3-.3.4.3.6.8.3 1.3l-4 6.9c-.2.2-.5.4-.8.4z"/><path opacity=".93" d="M21 19c-.3 0-.6-.2-.8-.5l-4-6.9c-.3-.4-.1-1 .3-1.3.4-.3 1-.1 1.3.3l4 6.9c.3.4.1 1-.3 1.3-.2.2-.3.2-.5.2z"/><path opacity=".3" d="M33 39.8c-.3 0-.6-.2-.8-.5l-4-6.9c-.3-.4-.1-1 .3-1.3.4-.3 1-.1 1.3.3l4 6.9c.3.4.1 1-.3 1.3-.2.1-.3.2-.5.2z"/><path opacity=".65" d="M17 26H9c-.6 0-1-.4-1-1s.4-1 1-1h8c.6 0 1 .4 1 1s-.4 1-1 1z"/><path opacity=".3" d="M41 26h-8c-.6 0-1-.4-1-1s.4-1 1-1h8c.6 0 1 .4 1 1s-.4 1-1 1z"/><path opacity=".86" d="M18.1 21.9c-.2 0-.3 0-.5-.1l-6.9-4c-.4-.3-.6-.8-.3-1.3.3-.4.8-.6 1.3-.3l6.9 4c.4.3.6.8.3 1.3-.2.3-.5.4-.8.4z"/><path opacity=".3" d="M38.9 33.9c-.2 0-.3 0-.5-.1l-6.9-4c-.4-.3-.6-.8-.3-1.3.3-.4.8-.6 1.3-.3l6.9 4c.4.3.6.8.3 1.3-.2.3-.5.4-.8.4z"/><path opacity=".44" d="M11.1 33.9c-.3 0-.6-.2-.8-.5-.3-.4-.1-1 .3-1.3l6.9-4c.4-.3 1-.1 1.3.3.3.4.1 1-.3 1.3l-6.9 4c-.1.2-.3.2-.5.2z"/><path opacity=".3" d="M31.9 21.9c-.3 0-.6-.2-.8-.5-.3-.4-.1-1 .3-1.3l6.9-4c.4-.3 1-.1 1.3.3.3.4.1 1-.3 1.3l-6.9 4c-.2.2-.3.2-.5.2z"/></svg>';

/***/ })
/******/ ]);
//# sourceMappingURL=gitment.browser.js.map
