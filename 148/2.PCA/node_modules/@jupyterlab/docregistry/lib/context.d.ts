import { Contents, ServiceManager } from '@jupyterlab/services';
import { IDisposable } from '@phosphor/disposable';
import { ISignal } from '@phosphor/signaling';
import { Widget } from '@phosphor/widgets';
import { ClientSession, IClientSession } from '@jupyterlab/apputils';
import { DocumentRegistry } from '.';
/**
 * An implementation of a document context.
 *
 * This class is typically instantiated by the document manger.
 */
export declare class Context<T extends DocumentRegistry.IModel> implements DocumentRegistry.IContext<T> {
    /**
     * Construct a new document context.
     */
    constructor(options: Context.IOptions<T>);
    /**
     * A signal emitted when the path changes.
     */
    readonly pathChanged: ISignal<this, string>;
    /**
     * A signal emitted when the model is saved or reverted.
     */
    readonly fileChanged: ISignal<this, Contents.IModel>;
    /**
     * A signal emitted when the context is disposed.
     */
    readonly disposed: ISignal<this, void>;
    /**
     * Get the model associated with the document.
     */
    readonly model: T;
    /**
     * The client session object associated with the context.
     */
    readonly session: ClientSession;
    /**
     * The current path associated with the document.
     */
    readonly path: string;
    /**
     * The current contents model associated with the document
     *
     * #### Notes
     * The model will have an  empty `contents` field.
     */
    readonly contentsModel: Contents.IModel;
    /**
     * Get the model factory name.
     *
     * #### Notes
     * This is not part of the `IContext` API.
     */
    readonly factoryName: string;
    /**
     * Test whether the context is disposed.
     */
    readonly isDisposed: boolean;
    /**
     * Dispose of the resources held by the context.
     */
    dispose(): void;
    /**
     * Whether the context is ready.
     */
    readonly isReady: boolean;
    /**
     * A promise that is fulfilled when the context is ready.
     */
    readonly ready: Promise<void>;
    /**
     * Save the document contents to disk.
     */
    save(): Promise<void>;
    /**
     * Save the document to a different path chosen by the user.
     */
    saveAs(): Promise<void>;
    /**
     * Revert the document contents to disk contents.
     */
    revert(): Promise<void>;
    /**
     * Create a checkpoint for the file.
     */
    createCheckpoint(): Promise<Contents.ICheckpointModel>;
    /**
     * Delete a checkpoint for the file.
     */
    deleteCheckpoint(checkpointId: string): Promise<void>;
    /**
     * Restore the file to a known checkpoint state.
     */
    restoreCheckpoint(checkpointId?: string): Promise<void>;
    /**
     * List available checkpoints for a file.
     */
    listCheckpoints(): Promise<Contents.ICheckpointModel[]>;
    /**
     * Resolve a relative url to a correct server path.
     */
    resolveUrl(url: string): Promise<string>;
    /**
     * Get the download url of a given absolute server path.
     */
    getDownloadUrl(path: string): Promise<string>;
    /**
     * Add a sibling widget to the document manager.
     */
    addSibling(widget: Widget): IDisposable;
    /**
     * Handle a change on the contents manager.
     */
    private _onFileChanged(sender, change);
    /**
     * Handle a change to a session property.
     */
    private _onSessionChanged();
    /**
     * Update our contents model, without the content.
     */
    private _updateContentsModel(model);
    /**
     * Handle an initial population.
     */
    private _populate();
    private _manager;
    private _opener;
    private _model;
    private _path;
    private _factory;
    private _contentsModel;
    private _readyPromise;
    private _populatedPromise;
    private _isPopulated;
    private _isReady;
    private _pathChanged;
    private _fileChanged;
    private _disposed;
}
/**
 * A namespace for `Context` statics.
 */
export declare namespace Context {
    /**
     * The options used to initialize a context.
     */
    interface IOptions<T extends DocumentRegistry.IModel> {
        /**
         * A service manager instance.
         */
        manager: ServiceManager.IManager;
        /**
         * The model factory used to create the model.
         */
        factory: DocumentRegistry.IModelFactory<T>;
        /**
         * The initial path of the file.
         */
        path: string;
        /**
         * The kernel preference associated with the context.
         */
        kernelPreference?: IClientSession.IKernelPreference;
        /**
         * An optional callback for opening sibling widgets.
         */
        opener?: (widget: Widget) => void;
    }
}
