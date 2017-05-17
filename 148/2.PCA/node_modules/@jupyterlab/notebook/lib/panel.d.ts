import { Token } from '@phosphor/coreutils';
import { Message } from '@phosphor/messaging';
import { ISignal } from '@phosphor/signaling';
import { Widget } from '@phosphor/widgets';
import { IClientSession, Toolbar } from '@jupyterlab/apputils';
import { BaseCellWidget, CodeCellWidget } from '@jupyterlab/cells';
import { IEditorMimeTypeService, CodeEditor } from '@jupyterlab/codeeditor';
import { IChangedArgs } from '@jupyterlab/coreutils';
import { DocumentRegistry } from '@jupyterlab/docregistry';
import { OutputAreaWidget } from '@jupyterlab/outputarea';
import { RenderMime } from '@jupyterlab/rendermime';
import { INotebookModel } from './model';
import { Notebook } from './widget';
/**
 * A widget that hosts a notebook toolbar and content area.
 *
 * #### Notes
 * The widget keeps the document metadata in sync with the current
 * kernel on the context.
 */
export declare class NotebookPanel extends Widget {
    /**
     * Construct a new notebook panel.
     */
    constructor(options: NotebookPanel.IOptions);
    /**
     * A signal emitted when the panel has been activated.
     */
    readonly activated: ISignal<this, void>;
    /**
     * A signal emitted when the panel context changes.
     */
    readonly contextChanged: ISignal<this, void>;
    /**
     * The client session used by the panel.
     */
    readonly session: IClientSession;
    /**
     * The factory used by the widget.
     */
    readonly contentFactory: NotebookPanel.IContentFactory;
    /**
     * The Rendermime instance used by the widget.
     */
    readonly rendermime: RenderMime;
    /**
     * The notebook used by the widget.
     */
    readonly notebook: Notebook;
    /**
     * Get the toolbar used by the widget.
     */
    readonly toolbar: Toolbar<Widget>;
    /**
     * The model for the widget.
     */
    readonly model: INotebookModel;
    /**
     * The document context for the widget.
     *
     * #### Notes
     * Changing the context also changes the model on the
     * `content`.
     */
    context: DocumentRegistry.IContext<INotebookModel>;
    /**
     * Dispose of the resources used by the widget.
     */
    dispose(): void;
    /**
     * Handle `'activate-request'` messages.
     */
    protected onActivateRequest(msg: Message): void;
    /**
     * Handle a change to the document context.
     *
     * #### Notes
     * The default implementation is a no-op.
     */
    protected onContextChanged(oldValue: DocumentRegistry.IContext<INotebookModel>, newValue: DocumentRegistry.IContext<INotebookModel>): void;
    /**
     * Handle a change in the model state.
     */
    protected onModelStateChanged(sender: INotebookModel, args: IChangedArgs<any>): void;
    /**
     * Handle a change to the document path.
     */
    protected onPathChanged(sender: DocumentRegistry.IContext<INotebookModel>, path: string): void;
    /**
     * Handle a change in the context.
     */
    private _onContextChanged(oldValue, newValue);
    /**
     * Handle a change in the kernel by updating the document metadata.
     */
    private _onKernelChanged(sender, kernel);
    /**
     * Update the kernel language.
     */
    private _updateLanguage(language);
    /**
     * Update the kernel spec.
     */
    private _updateSpec(kernel);
    /**
     * Handle the dirty state of the model.
     */
    private _handleDirtyState();
    private _context;
    private _activated;
    private _contextChanged;
}
/**
 * A namespace for `NotebookPanel` statics.
 */
export declare namespace NotebookPanel {
    /**
     * An options interface for NotebookPanels.
     */
    interface IOptions {
        /**
         * The rendermime instance used by the panel.
         */
        rendermime: RenderMime;
        /**
         * The language preference for the model.
         */
        languagePreference?: string;
        /**
         * The content factory for the panel.
         */
        contentFactory: IContentFactory;
        /**
         * The mimeType service.
         */
        mimeTypeService: IEditorMimeTypeService;
    }
    /**
     * A content factory interface for NotebookPanel.
     */
    interface IContentFactory {
        /**
         * The editor factory.
         */
        readonly editorFactory: CodeEditor.Factory;
        /**
         * The factory for notebook cell widget content.
         */
        readonly notebookContentFactory: Notebook.IContentFactory;
        /**
         * Create a new content area for the panel.
         */
        createNotebook(options: Notebook.IOptions): Notebook;
        /**
         * Create a new toolbar for the panel.
         */
        createToolbar(): Toolbar<Widget>;
    }
    /**
     * The default implementation of an `IContentFactory`.
     */
    class ContentFactory implements IContentFactory {
        /**
         * Creates a new renderer.
         */
        constructor(options: ContentFactory.IOptions);
        /**
         * The editor factory.
         */
        readonly editorFactory: CodeEditor.Factory;
        /**
         * The factory for notebook cell widget content.
         */
        readonly notebookContentFactory: Notebook.IContentFactory;
        /**
         * Create a new content area for the panel.
         */
        createNotebook(options: Notebook.IOptions): Notebook;
        /**
         * Create a new toolbar for the panel.
         */
        createToolbar(): Toolbar<Widget>;
    }
    /**
     * The namespace for `ContentFactory`.
     */
    namespace ContentFactory {
        /**
         * An initialization options for a notebook panel content factory.
         */
        interface IOptions {
            /**
             * The editor factory.
             */
            editorFactory: CodeEditor.Factory;
            /**
             * The factory for output area content.
             */
            outputAreaContentFactory?: OutputAreaWidget.IContentFactory;
            /**
             * The factory for code cell widget content.  If given, this will
             * take precedence over the `outputAreaContentFactory`.
             */
            codeCellContentFactory?: CodeCellWidget.IContentFactory;
            /**
             * The factory for raw cell widget content.
             */
            rawCellContentFactory?: BaseCellWidget.IContentFactory;
            /**
             * The factory for markdown cell widget content.
             */
            markdownCellContentFactory?: BaseCellWidget.IContentFactory;
            /**
             * The factory for notebook cell widget content. If given, this will
             * take precedence over the the cell and output area factories.
             */
            notebookContentFactory?: Notebook.IContentFactory;
        }
    }
    /**
     * The notebook renderer token.
     */
    const IContentFactory: Token<IContentFactory>;
}
