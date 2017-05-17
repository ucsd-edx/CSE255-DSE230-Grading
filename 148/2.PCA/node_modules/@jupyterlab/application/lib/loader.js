// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var semver_1 = require("semver");
/**
 * A module loader using semver for dynamic resolution of requires.
 *
 * It is meant to be used in conjunction with the JupyterLabPlugin
 * for WebPack from `@jupyterlab/extension-builder`.
 */
var ModuleLoader = (function () {
    /**
     * Construct a new module loader.
     */
    function ModuleLoader() {
        this._registered = Object.create(null);
        this._parsed = Object.create(null);
        this._modules = Object.create(null);
        this._bundles = Object.create(null);
        this._matches = Object.create(null);
        // Provide the extra functions used by webpack.
        this._boundRequire = this.require.bind(this);
        this._boundRequire.e = this.ensureBundle.bind(this);
        this._boundRequire.i = this.inject.bind(this);
        this._boundRequire.d = this.harmonyExports.bind(this);
        this._boundRequire.o = this.hasOwnPropertyCall.bind(this);
        this._boundRequire.n = this.getDefaultExport.bind(this);
        this._boundRequire.oe = this.asyncLoadError.bind(this);
    }
    /**
     * Define a module that can be synchronously required.
     *
     * @param path - The version-mangled fully qualified path of the module.
     *   For example, "foo@1.0.1/lib/bar/baz.js".
     *
     * @param callback - The callback function for invoking the module.
     *
     * #### Notes
     * This is a no-op if the path is already registered.
     */
    ModuleLoader.prototype.define = function (path, callback) {
        if (!(path in this._registered)) {
            this._registered[path] = callback;
        }
    };
    /**
     * Synchronously require a module that has already been loaded.
     *
     * @param path - The semver-mangled fully qualified path of the module.
     *   For example, "foo@^1.1.0/lib/bar/baz.js".
     *
     * @returns The exports of the requested module, if registered.  The module
     *   selected is the registered module that maximally satisfies the semver
     *   range of the request.
     *
     * #### Notes
     * Will throw an error if the required path cannot be satisfied.
     */
    ModuleLoader.prototype.require = function (path) {
        // Check if module is in cache.
        var id = this._findMatch(path);
        if (!id) {
            throw new Error("No matching module found for: \"" + path + "\"");
        }
        var installed = this._modules;
        if (installed[id]) {
            return installed[id].exports;
        }
        // Create a new module (and put it into the cache).
        var mod = installed[id] = {
            exports: {},
            require: this._boundRequire,
            id: id
        };
        // Execute the module function.
        var callback = this._registered[id];
        callback.call(mod.exports, mod, mod.exports, this._boundRequire);
        // Return the exports of the module.
        return mod.exports;
    };
    /**
     * Ensure a bundle is loaded on the page (`__webpack_require.e`)
     *
     * @param path - The public path of the bundle (e.g. "lab/jupyter.bundle.js").
     *
     * @param callback - The callback invoked when the bundle has loaded.
     *
     * @returns A promise that resolves when the bundle is loaded.
     */
    ModuleLoader.prototype.ensureBundle = function (path, callback) {
        var bundle = this._getBundle(path);
        if (bundle.loaded) {
            if (callback) {
                callback.call(null, this._boundRequire);
            }
            return Promise.resolve(void 0);
        }
        if (callback) {
            bundle.callbacks.push(callback);
        }
        return bundle.promise;
    };
    /**
     * Inject data into a module (`__webpack_require.i`).
     *
     * @param data - The source data.
     *
     * @returns The original data (no-op).
     */
    ModuleLoader.prototype.inject = function (data) {
        return data;
    };
    /**
     * A getter function for harmony exports (`__webpack_require.d`).
     *
     * @param exports - The module exports.
     *
     * @param name - The property name.
     *
     * @param getter - The getter function.
     */
    ModuleLoader.prototype.harmonyExports = function (exports, name, getter) {
        if (!this.hasOwnPropertyCall(exports, name)) {
            Object.defineProperty(exports, name, {
                configurable: false,
                enumerable: true,
                get: getter
            });
        }
    };
    ;
    /**
     * An Object.prototype.hasOwnProperty.call - (`__webpack_require.o`).
     *
     * @param object - The target object.
     *
     * @param property - The target property.
     *
     * @returns Whether the object has the property.
     */
    ModuleLoader.prototype.hasOwnPropertyCall = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    };
    /**
     * Default export function for compatibility with non-harmony modules
     *   (`__webpack_require.n`).
     *
     * @param module - The target module.
     *
     * @returns The default export of the module.
     */
    ModuleLoader.prototype.getDefaultExport = function (module) {
        var getter = module && module.__esModule ?
            function getDefault() { return module['default']; } :
            function getModuleExports() { return module; };
        this.harmonyExports(getter, 'a', getter);
        return getter;
    };
    ;
    /**
     * An on error function for async loading - (`__webpack_require.oe`).
     *
     * @param err - The original error.
     */
    ModuleLoader.prototype.asyncLoadError = function (err) {
        console.error(err);
        throw err;
    };
    /**
     * Extract the entry point plugins of an extension.
     *
     * @param data - The loaded entry point module.
     *
     * @returns An array of validated plugins.
     *
     * #### Notes
     * The plugin(s) are extracted and validated before being returned.
     */
    ModuleLoader.prototype.extractPlugins = function (data) {
        // We use the default export from es6 modules.
        if (data.__esModule) {
            data = data.default;
        }
        if (!Array.isArray(data)) {
            data = [data];
        }
        if (!data.length) {
            throw new Error("No plugins found");
        }
        for (var i = 0; i < data.length; i++) {
            var plugin = data[i];
            if (!plugin.hasOwnProperty('id')) {
                throw new Error("Missing id for plugin " + i);
            }
            if (typeof (plugin['activate']) !== 'function') {
                var id = plugin.id;
                throw Error("Missing activate function in '" + id + "'");
            }
        }
        return data;
    };
    /**
     * Find a module path matching a given module request.
     *
     * @param path - The semver-mangled fully qualified path to the module.
     *   For example, "foo@^1.1.0/lib/bar/baz.js".
     *
     * @returns The matching defined module path, if registered.  A match is
     *   the registered path that maximally satisfies the semver range of the
     *   request.
     *
     * #### Notes
     * If the path has loaders, and thus multiple packages and modules delimited
     * by '!', then the versions are matched in reverse order.
     */
    ModuleLoader.prototype._findMatch = function (path) {
        var _this = this;
        // Use the cached match if available.
        var cache = this._matches;
        if (cache[path]) {
            return cache[path];
        }
        var modules = Object.keys(this._registered);
        var sources = path.split('!').map(function (value) { return _this._parsePath(value); });
        if (sources.some(function (elem) { return !elem; })) {
            // check to see if any element of sources is falsey
            throw Error('Invalid module path ' + path);
        }
        var matches = [];
        var versions = [];
        var _loop_1 = function (mod) {
            var targets = mod.split('!').map(function (value) { return _this._parsePath(value); });
            if (targets.some(function (e) { return !e; })) {
                return "continue";
            }
            if (sources.length === targets.length && sources.every(function (source, i) {
                return (source.package === targets[i].package
                    && source.module === targets[i].module
                    && semver_1.satisfies(targets[i].version, source.version));
            })) {
                matches.push(mod);
                versions.push(targets.map(function (t) { return t.version; }));
            }
        };
        for (var _i = 0, modules_1 = modules; _i < modules_1.length; _i++) {
            var mod = modules_1[_i];
            _loop_1(mod);
        }
        if (!matches.length) {
            throw Error("No module found matching: " + path);
        }
        var _loop_2 = function (part) {
            var best = semver_1.maxSatisfying(versions.map(function (v) { return v[part]; }), sources[part].version);
            if (!best) {
                throw new Error("No module found satisfying " + path);
            }
            matches = matches.filter(function (mod, index) { return versions[index][part] === best; });
            versions = versions.filter(function (v) { return v[part] === best; });
        };
        // If we have a chain of loaders, we want
        // to filter for best versions in reverse order.
        for (var part = versions[0].length - 1; matches.length > 1 && part >= 0; part--) {
            _loop_2(part);
        }
        cache[path] = matches[0];
        return matches[0];
    };
    /**
     * Get or create a bundle record for a path.
     */
    ModuleLoader.prototype._getBundle = function (path) {
        var _this = this;
        var bundle = this._bundles[path];
        if (bundle) {
            return bundle;
        }
        // Start bundle loading.
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.charset = 'utf-8';
        script.async = true;
        var promise = new Promise(function (resolve, reject) {
            script.onload = function () {
                while (bundle.callbacks.length) {
                    bundle.callbacks.shift().call(null, _this._boundRequire);
                }
                bundle.loaded = true;
                resolve(void 0);
            };
            script.onerror = function (err) {
                reject(err);
            };
        });
        head.appendChild(script);
        script.src = path;
        bundle = this._bundles[path] = {
            loaded: false,
            callbacks: [],
            promise: promise
        };
        return bundle;
    };
    /**
     * Parse a version-mangled module path.
     *
     * @param path - The module path (e.g. "foo@^1.1.0/lib/bar/baz.js").
     *
     * @returns A parsed object describing the module path.
     */
    ModuleLoader.prototype._parsePath = function (path) {
        var cache = this._parsed;
        if (cache[path]) {
            return cache[path];
        }
        var match = path.match(/(^(?:@[^/]+\/)??[^/@]+?)@([^/]+?)(\/.*)?$/);
        if (!match) {
            cache[path] = null;
        }
        else {
            cache[path] = {
                package: match[1],
                version: match[2],
                module: match[3]
            };
        }
        return cache[path];
    };
    return ModuleLoader;
}());
exports.ModuleLoader = ModuleLoader;
