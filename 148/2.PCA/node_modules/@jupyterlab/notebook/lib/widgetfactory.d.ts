import { IEditorMimeTypeService } from '@jupyterlab/codeeditor';
import { ABCWidgetFactory, DocumentRegistry } from '@jupyterlab/docregistry';
import { RenderMime } from '@jupyterlab/rendermime';
import { INotebookModel } from './model';
import { NotebookPanel } from './panel';
/**
 * A widget factory for notebook panels.
 */
export declare class NotebookWidgetFactory extends ABCWidgetFactory<NotebookPanel, INotebookModel> {
    /**
     * Construct a new notebook widget factory.
     *
     * @param options - The options used to construct the factory.
     */
    constructor(options: NotebookWidgetFactory.IOptions);
    readonly rendermime: RenderMime;
    /**
     * The content factory used by the widget factory.
     */
    readonly contentFactory: NotebookPanel.IContentFactory;
    /**
     * The service used to look up mime types.
     */
    readonly mimeTypeService: IEditorMimeTypeService;
    /**
     * Create a new widget.
     *
     * #### Notes
     * The factory will start the appropriate kernel and populate
     * the default toolbar items using `ToolbarItems.populateDefaults`.
     */
    protected createNewWidget(context: DocumentRegistry.IContext<INotebookModel>): NotebookPanel;
}
/**
 * The namespace for `NotebookWidgetFactory` statics.
 */
export declare namespace NotebookWidgetFactory {
    /**
     * The options used to construct a `NotebookWidgetFactory`.
     */
    interface IOptions extends DocumentRegistry.IWidgetFactoryOptions {
        rendermime: RenderMime;
        /**
         * A notebook panel content factory.
         */
        contentFactory: NotebookPanel.IContentFactory;
        /**
         * The service used to look up mime types.
         */
        mimeTypeService: IEditorMimeTypeService;
    }
}
