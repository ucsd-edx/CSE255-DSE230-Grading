import { Application, IPlugin } from '@phosphor/application';
import { Widget } from '@phosphor/widgets';
/**
 * A module loader using semver for dynamic resolution of requires.
 *
 * It is meant to be used in conjunction with the JupyterLabPlugin
 * for WebPack from `@jupyterlab/extension-builder`.
 */
export declare class ModuleLoader {
    /**
     * Construct a new module loader.
     */
    constructor();
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
    define(path: string, callback: ModuleLoader.DefineCallback): void;
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
    require(path: string): any;
    /**
     * Ensure a bundle is loaded on the page (`__webpack_require.e`)
     *
     * @param path - The public path of the bundle (e.g. "lab/jupyter.bundle.js").
     *
     * @param callback - The callback invoked when the bundle has loaded.
     *
     * @returns A promise that resolves when the bundle is loaded.
     */
    ensureBundle(path: string, callback?: ModuleLoader.EnsureCallback): Promise<void>;
    /**
     * Inject data into a module (`__webpack_require.i`).
     *
     * @param data - The source data.
     *
     * @returns The original data (no-op).
     */
    inject(data: any): any;
    /**
     * A getter function for harmony exports (`__webpack_require.d`).
     *
     * @param exports - The module exports.
     *
     * @param name - The property name.
     *
     * @param getter - The getter function.
     */
    harmonyExports(exports: any, name: string, getter: () => any): void;
    /**
     * An Object.prototype.hasOwnProperty.call - (`__webpack_require.o`).
     *
     * @param object - The target object.
     *
     * @param property - The target property.
     *
     * @returns Whether the object has the property.
     */
    hasOwnPropertyCall(object: any, property: string): boolean;
    /**
     * Default export function for compatibility with non-harmony modules
     *   (`__webpack_require.n`).
     *
     * @param module - The target module.
     *
     * @returns The default export of the module.
     */
    getDefaultExport(module: any): any;
    /**
     * An on error function for async loading - (`__webpack_require.oe`).
     *
     * @param err - The original error.
     */
    asyncLoadError(err: Error): void;
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
    extractPlugins(data: any): IPlugin<Application<Widget>, any>[];
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
    private _findMatch(path);
    /**
     * Get or create a bundle record for a path.
     */
    private _getBundle(path);
    /**
     * Parse a version-mangled module path.
     *
     * @param path - The module path (e.g. "foo@^1.1.0/lib/bar/baz.js").
     *
     * @returns A parsed object describing the module path.
     */
    private _parsePath(path);
    private _registered;
    private _parsed;
    private _modules;
    private _bundles;
    private _matches;
    private _boundRequire;
}
/**
 * A namespace for `ModuleLoader` statics.
 */
export declare namespace ModuleLoader {
    /**
     * The interface for the require function, mirroring `__webpack_require__`.
     */
    interface IRequire {
        (path: string): any;
        e(path: string, callback?: EnsureCallback): Promise<void>;
        i(data: any): any;
        d(exports: any, name: string, getter: () => any): void;
        o(object: any, property: string): boolean;
        n(module: any): any;
        oe(error: Error): void;
    }
    /**
     * The interface for a module.
     */
    interface IModule {
        exports: any;
        require: IRequire;
        id: string;
    }
    /**
     * A callback for a define function that takes a module, its exports,
     * and a require function.
     */
    type DefineCallback = (module: IModule, exports: any, require: IRequire) => void;
    /**
     * A callback for an ensure function that takes a require function.
     */
    type EnsureCallback = (require: IRequire) => void;
}
