// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var minimist = require("minimist");
var path = require("path-posix");
var urlparse = require("url-parse");
// Export the Promise Delegate for now to preserve API.
var coreutils_1 = require("@phosphor/coreutils");
exports.PromiseDelegate = coreutils_1.PromiseDelegate;
/**
 * Copy the contents of one object to another, recursively.
 *
 * From [stackoverflow](http://stackoverflow.com/a/12317051).
 */
function extend(target, source) {
    target = target || {};
    for (var prop in source) {
        if (typeof source[prop] === 'object') {
            target[prop] = extend(target[prop], source[prop]);
        }
        else {
            target[prop] = source[prop];
        }
    }
    return target;
}
exports.extend = extend;
/**
 * Get a deep copy of a JSON object.
 */
function copy(object) {
    return JSON.parse(JSON.stringify(object));
}
exports.copy = copy;
/**
 * Get a random 32 character hex string (not a formal UUID)
 */
function uuid() {
    var s = [];
    var hexDigits = '0123456789abcdef';
    var nChars = hexDigits.length;
    for (var i = 0; i < 32; i++) {
        s[i] = hexDigits.charAt(Math.floor(Math.random() * nChars));
    }
    return s.join('');
}
exports.uuid = uuid;
/**
 * Parse a url into a URL object.
 *
 * @param url - The URL string to parse.
 *
 * @returns A URL object.
 */
function urlParse(url) {
    if (typeof document !== 'undefined') {
        var a = document.createElement('a');
        a.href = url;
        return a;
    }
    return urlparse(url);
}
exports.urlParse = urlParse;
/**
 * Join a sequence of url components with `'/'`.
 */
function urlPathJoin() {
    var parts = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        parts[_i] = arguments[_i];
    }
    // Adapted from url-join.
    // Copyright (c) 2016 José F. Romaniello, MIT License.
    // https://github.com/jfromaniello/url-join/blob/v1.1.0/lib/url-join.js
    var str = [].slice.call(parts, 0).join('/');
    // make sure protocol is followed by two slashes
    str = str.replace(/:\//g, '://');
    // remove consecutive slashes
    str = str.replace(/([^:\s])\/+/g, '$1/');
    // remove trailing slash before parameters or hash
    str = str.replace(/\/(\?|&|#[^!])/g, '$1');
    // replace ? in parameters with &
    str = str.replace(/(\?.+)\?/g, '$1&');
    return str;
}
exports.urlPathJoin = urlPathJoin;
/**
 * Encode the components of a multi-segment url.
 *
 * #### Notes
 * Preserves the `'/'` separators.
 * Should not include the base url, since all parts are escaped.
 */
function urlEncodeParts(uri) {
    return urlPathJoin.apply(void 0, uri.split('/').map(encodeURIComponent));
}
exports.urlEncodeParts = urlEncodeParts;
/**
 * Return a serialized object string suitable for a query.
 *
 * From [stackoverflow](http://stackoverflow.com/a/30707423).
 */
function jsonToQueryString(json) {
    return '?' + Object.keys(json).map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(String(json[key]));
    }).join('&');
}
exports.jsonToQueryString = jsonToQueryString;
function _getCookie(name) {
    // from tornado docs: http://www.tornadoweb.org/en/stable/guide/security.html
    var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
    return r ? r[1] : void 0;
}
/**
 * Asynchronous XMLHTTPRequest handler.
 *
 * @param url - The url to request.
 *
 * @param settings - The settings to apply to the request and response.
 *
 * #### Notes
 * Based on this [example](http://www.html5rocks.com/en/tutorials/es6/promises/#toc-promisifying-xmlhttprequest).
 */
function ajaxRequest(url, ajaxSettings) {
    var method = ajaxSettings.method || 'GET';
    // Ensure that requests have applied data.
    if (!ajaxSettings.data) {
        ajaxSettings.data = '{}';
        ajaxSettings.contentType = 'application/json';
    }
    var user = ajaxSettings.user || '';
    var password = ajaxSettings.password || '';
    var headers = ajaxSettings.requestHeaders || {};
    if (!ajaxSettings.cache) {
        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Bypassing_the_cache.
        url += ((/\?/).test(url) ? '&' : '?') + (new Date()).getTime();
    }
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true, user, password);
        if (ajaxSettings.contentType !== void 0) {
            xhr.setRequestHeader('Content-Type', ajaxSettings.contentType);
        }
        if (ajaxSettings.timeout !== void 0) {
            xhr.timeout = ajaxSettings.timeout;
        }
        if (!!ajaxSettings.withCredentials) {
            xhr.withCredentials = true;
        }
        // Try to add the xsrf token if there is no existing authorization.
        var token = headers['Authorization'];
        if (!token && typeof document !== 'undefined' && document.cookie) {
            var xsrfToken = _getCookie('_xsrf');
            if (xsrfToken !== void 0) {
                xhr.setRequestHeader('X-XSRFToken', xsrfToken);
            }
        }
        for (var prop in headers) {
            xhr.setRequestHeader(prop, headers[prop]);
        }
        xhr.onload = function (event) {
            if (xhr.status >= 300) {
                reject({ event: event, xhr: xhr, ajaxSettings: ajaxSettings, throwError: xhr.statusText });
            }
            var data = xhr.responseText;
            try {
                data = JSON.parse(data);
            }
            catch (err) {
                // no-op
            }
            resolve({ xhr: xhr, ajaxSettings: ajaxSettings, data: data, event: event });
        };
        xhr.onabort = function (event) {
            reject({ xhr: xhr, event: event, ajaxSettings: ajaxSettings });
        };
        xhr.onerror = function (event) {
            reject({ xhr: xhr, event: event, ajaxSettings: ajaxSettings });
        };
        xhr.ontimeout = function (ev) {
            reject({ xhr: xhr, event: event, ajaxSettings: ajaxSettings });
        };
        if (ajaxSettings.data) {
            xhr.send(ajaxSettings.data);
        }
        else {
            xhr.send();
        }
    });
}
exports.ajaxRequest = ajaxRequest;
/**
 * Create an ajax error from an ajax success.
 *
 * @param success - The original success object.
 *
 * @param throwError - The optional new error name.  If not given
 *  we use "Invalid Status: <xhr.status>"
 */
function makeAjaxError(success, throwError) {
    var xhr = success.xhr;
    var ajaxSettings = success.ajaxSettings;
    var event = success.event;
    throwError = throwError || "Invalid Status: " + xhr.status;
    return { xhr: xhr, ajaxSettings: ajaxSettings, event: event, throwError: throwError };
}
exports.makeAjaxError = makeAjaxError;
/**
 * Try to load an object from a module or a registry.
 *
 * Try to load an object from a module asynchronously if a module
 * is specified, otherwise tries to load an object from the global
 * registry, if the global registry is provided.
 */
function loadObject(name, moduleName, registry) {
    return new Promise(function (resolve, reject) {
        // Try loading the view module using require.js
        if (moduleName) {
            if (typeof requirejs === 'undefined') {
                throw new Error('requirejs not found');
            }
            requirejs([moduleName], function (mod) {
                if (mod[name] === void 0) {
                    var msg = "Object '" + name + "' not found in module '" + moduleName + "'";
                    reject(new Error(msg));
                }
                else {
                    resolve(mod[name]);
                }
            }, reject);
        }
        else {
            if (registry && registry[name]) {
                resolve(registry[name]);
            }
            else {
                reject(new Error("Object '" + name + "' not found in registry"));
            }
        }
    });
}
exports.loadObject = loadObject;
;
/**
 * Global config data for the Jupyter application.
 */
var configData = null;
/**
 *  Make an object fully immutable by freezing each object in it.
 */
function deepFreeze(obj) {
    // Freeze properties before freezing self
    Object.getOwnPropertyNames(obj).forEach(function (name) {
        var prop = obj[name];
        // Freeze prop if it is an object
        if (typeof prop === 'object' && prop !== null && !Object.isFrozen(prop)) {
            deepFreeze(prop);
        }
    });
    // Freeze self
    return Object.freeze(obj);
}
/**
 * Get global configuration data for the Jupyter application.
 *
 * @param name - The name of the configuration option.
 *
 * @returns The config value or `undefined` if not found.
 *
 * #### Notes
 * For browser based applications, it is assumed that the page HTML
 * includes a script tag with the id `jupyter-config-data` containing the
 * configuration as valid JSON.
 */
function getConfigOption(name) {
    if (configData) {
        return configData[name];
    }
    if (typeof document === 'undefined') {
        configData = minimist(process.argv.slice(2));
    }
    else {
        var el = document.getElementById('jupyter-config-data');
        if (el) {
            configData = JSON.parse(el.textContent);
        }
        else {
            configData = {};
        }
    }
    configData = deepFreeze(configData);
    return configData[name];
}
exports.getConfigOption = getConfigOption;
/**
 * Get the base URL for a Jupyter application.
 */
function getBaseUrl() {
    var baseUrl = getConfigOption('baseUrl');
    if (!baseUrl || baseUrl === '/') {
        baseUrl = (typeof location === 'undefined' ?
            'http://localhost:8888/' : location.origin + '/');
    }
    return baseUrl;
}
exports.getBaseUrl = getBaseUrl;
/**
 * Get the base websocket URL for a Jupyter application.
 */
function getWsUrl(baseUrl) {
    var wsUrl = getConfigOption('wsUrl');
    if (!wsUrl) {
        baseUrl = baseUrl || getBaseUrl();
        if (baseUrl.indexOf('http') !== 0) {
            if (typeof location !== 'undefined') {
                baseUrl = path.join(location.origin, baseUrl);
            }
            else {
                baseUrl = path.join('http://localhost:8888/', baseUrl);
            }
        }
        wsUrl = 'ws' + baseUrl.slice(4);
    }
    return wsUrl;
}
exports.getWsUrl = getWsUrl;
/**
 * Add token to ajaxSettings.requestHeaders if defined.
 * Always returns a copy of ajaxSettings, and a dict.
 */
function ajaxSettingsWithToken(ajaxSettings, token) {
    if (!ajaxSettings) {
        ajaxSettings = {};
    }
    else {
        ajaxSettings = copy(ajaxSettings);
    }
    if (!token) {
        token = getConfigOption('token');
    }
    if (!token || token === '') {
        return ajaxSettings;
    }
    if (!ajaxSettings.requestHeaders) {
        ajaxSettings.requestHeaders = {};
    }
    ajaxSettings.requestHeaders['Authorization'] = "token " + token;
    return ajaxSettings;
}
exports.ajaxSettingsWithToken = ajaxSettingsWithToken;
