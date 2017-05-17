import { CommandRegistry } from '@phosphor/commands';
import { JSONObject, Token } from '@phosphor/coreutils';
import { Widget } from '@phosphor/widgets';
import { ApplicationShell } from '@jupyterlab/application';
import { InstanceTracker, IStateDB } from './';
/**
 * The layout restorer token.
 */
export declare const ILayoutRestorer: Token<ILayoutRestorer>;
/**
 * A static class that restores the widgets of the application when it reloads.
 */
export interface ILayoutRestorer {
    /**
     * A promise resolved when the layout restorer is ready to receive signals.
     */
    restored: Promise<void>;
    /**
     * Add a widget to be tracked by the layout restorer.
     */
    add(widget: Widget, name: string): void;
    /**
     * Restore the widgets of a particular instance tracker.
     *
     * @param tracker - The instance tracker whose widgets will be restored.
     *
     * @param options - The restoration options.
     */
    restore(tracker: InstanceTracker<any>, options: ILayoutRestorer.IRestoreOptions<any>): void;
}
/**
 * A namespace for the layout restorer.
 */
export declare namespace ILayoutRestorer {
    /**
     * The state restoration configuration options.
     */
    interface IRestoreOptions<T extends Widget> {
        /**
         * The command to execute when restoring instances.
         */
        command: string;
        /**
         * A function that returns the args needed to restore an instance.
         */
        args: (widget: T) => JSONObject;
        /**
         * A function that returns a unique persistent name for this instance.
         */
        name: (widget: T) => string;
        /**
         * The point after which it is safe to restore state.
         *
         * #### Notes
         * By definition, this promise or promises will happen after the application
         * has `started`.
         */
        when?: Promise<any> | Array<Promise<any>>;
    }
}
/**
 * The default implementation of a layout restorer.
 *
 * #### Notes
 * The lifecycle for state restoration is subtle. The sequence of events is:
 *
 * 1. The layout restorer plugin is instantiated. It installs itself as the
 *    layout database that the application shell can use to `fetch` and `save`
 *    layout restoration data.
 *
 * 2. Other plugins that care about state restoration require the layout
 *    restorer as a dependency.
 *
 * 3. As each load-time plugin initializes (which happens before the lab
 *    application has `started`), it instructs the layout restorer whether
 *    the restorer ought to `restore` its state by passing in its tracker.
 *    Alternatively, a plugin that does not require its own instance tracker
 *    (because perhaps it only creates a single widget, like a command palette),
 *    can simply `add` its widget along with a persistent unique name to the
 *    layout restorer so that its layout state can be restored when the lab
 *    application restores.
 *
 * 4. After all the load-time plugins have finished initializing, the lab
 *    application `started` promise will resolve. This is the `first`
 *    promise that the layout restorer waits for. By this point, all of the
 *    plugins that care about restoration will have instructed the layout
 *    restorer to `restore` their state.
 *
 * 5. The layout restorer will then instruct each plugin's instance tracker
 *    to restore its state and reinstantiate whichever widgets it wants. The
 *    tracker returns a promise to the layout restorer that resolves when it
 *    has completed restoring the tracked widgets it cares about.
 *
 * 6. As each instance tracker finishes restoring the widget instances it cares
 *    about, it resolves the promise that was made to the layout restorer
 *    (in step 5). After all of the promises that the restorer is awaiting have
 *    resolved, the restorer then resolves its `restored` promise allowing the
 *    application shell to `fetch` the dehydrated layout state and rehydrate the
 *    saved layout.
 *
 * Of particular note are steps 5 and 6: since state restoration of plugins
 * is accomplished by executing commands, the command that is used to restore
 * the state of each plugin must return a promise that only resolves when the
 * widget has been created and added to the plugin's instance tracker.
 */
export declare class LayoutRestorer implements ILayoutRestorer {
    /**
     * Create a layout restorer.
     */
    constructor(options: LayoutRestorer.IOptions);
    /**
     * A promise resolved when the layout restorer is ready to receive signals.
     */
    readonly restored: Promise<void>;
    /**
     * Add a widget to be tracked by the layout restorer.
     */
    add(widget: Widget, name: string): void;
    /**
     * Fetch the layout state for the application.
     *
     * #### Notes
     * Fetching the layout relies on all widget restoration to be complete, so
     * calls to `fetch` are guaranteed to return after restoration is complete.
     */
    fetch(): Promise<ApplicationShell.ILayout>;
    /**
     * Restore the widgets of a particular instance tracker.
     *
     * @param tracker - The instance tracker whose widgets will be restored.
     *
     * @param options - The restoration options.
     */
    restore(tracker: InstanceTracker<Widget>, options: ILayoutRestorer.IRestoreOptions<Widget>): Promise<any>;
    /**
     * Save the layout state for the application.
     */
    save(data: ApplicationShell.ILayout): Promise<void>;
    /**
     * Dehydrate a main area description into a serializable object.
     */
    private _dehydrateMainArea(area);
    /**
     * Reydrate a serialized main area description object.
     *
     * #### Notes
     * This function consumes data that can become corrupted, so it uses type
     * coercion to guarantee the dehydrated object is safely processed.
     */
    private _rehydrateMainArea(area);
    /**
     * Dehydrate a side area description into a serializable object.
     */
    private _dehydrateSideArea(area);
    /**
     * Reydrate a serialized side area description object.
     *
     * #### Notes
     * This function consumes data that can become corrupted, so it uses type
     * coercion to guarantee the dehydrated object is safely processed.
     */
    private _rehydrateSideArea(area);
    /**
     * Handle a widget disposal.
     */
    private _onWidgetDisposed(widget);
    private _first;
    private _promises;
    private _restored;
    private _registry;
    private _state;
    private _trackers;
    private _widgets;
}
/**
 * A namespace for `LayoutRestorer` statics.
 */
export declare namespace LayoutRestorer {
    /**
     * The configuration options for layout restorer instantiation.
     */
    interface IOptions {
        /**
         * The initial promise that has to be resolved before restoration.
         *
         * #### Notes
         * This promise should equal the JupyterLab application `started` notifier.
         */
        first: Promise<any>;
        /**
         * The application command registry.
         */
        registry: CommandRegistry;
        /**
         * The state database instance.
         */
        state: IStateDB;
    }
}
