import { KernelMessage } from '@jupyterlab/services';
import { JSONValue } from '@phosphor/coreutils';
import { Message } from '@phosphor/messaging';
import { Widget } from '@phosphor/widgets';
import { IClientSession } from '@jupyterlab/apputils';
import { IChangedArgs } from '@jupyterlab/coreutils';
import { CodeEditor, CodeEditorWidget } from '@jupyterlab/codeeditor';
import { RenderMime } from '@jupyterlab/rendermime';
import { IObservableMap, ObservableMap } from '@jupyterlab/coreutils';
import { OutputAreaWidget } from '@jupyterlab/outputarea';
import { ICellModel, ICodeCellModel, IMarkdownCellModel, IRawCellModel } from './model';
/**
 * A base cell widget.
 */
export declare class BaseCellWidget extends Widget {
    /**
     * Construct a new base cell widget.
     */
    constructor(options: BaseCellWidget.IOptions);
    /**
     * The content factory used by the widget.
     */
    readonly contentFactory: BaseCellWidget.IContentFactory;
    /**
     * Get the prompt node used by the cell.
     */
    readonly promptNode: HTMLElement;
    /**
     * Get the editor widget used by the cell.
     */
    readonly editorWidget: CodeEditorWidget;
    /**
     * Get the editor used by the cell.
     */
    readonly editor: CodeEditor.IEditor;
    /**
     * Get the model used by the cell.
     */
    readonly model: ICellModel;
    /**
     * The read only state of the cell.
     */
    readOnly: boolean;
    /**
     * Set the prompt for the widget.
     */
    setPrompt(value: string): void;
    /**
     * Dispose of the resources held by the widget.
     */
    dispose(): void;
    /**
     * Handle `after-attach` messages.
     */
    protected onAfterAttach(msg: Message): void;
    /**
     * Handle `'activate-request'` messages.
     */
    protected onActivateRequest(msg: Message): void;
    /**
     * Handle `update-request` messages.
     */
    protected onUpdateRequest(msg: Message): void;
    /**
     * Render an input instead of the text editor.
     */
    protected renderInput(widget: Widget): void;
    /**
     * Show the text editor.
     */
    protected showEditor(): void;
    private _input;
    private _editor;
    private _model;
    private _readOnly;
}
/**
 * The namespace for the `BaseCellWidget` class statics.
 */
export declare namespace BaseCellWidget {
    /**
     * An options object for initializing a base cell widget.
     */
    interface IOptions {
        /**
         * The model used by the cell.
         */
        model: ICellModel;
        /**
         * The factory object for cell components.
         */
        contentFactory: BaseCellWidget.IContentFactory;
    }
    /**
     * The factory object for cell components.
     */
    interface IContentFactory {
        /**
         * The editor factory.
         */
        readonly editorFactory: CodeEditor.Factory;
        /**
         * Create a new cell editor for the widget.
         */
        createCellEditor(options: CodeEditorWidget.IOptions): CodeEditorWidget;
        /**
         * Create a new input area for the widget.
         */
        createInputArea(options: InputAreaWidget.IOptions): InputAreaWidget;
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
         * Create a new cell editor for the widget.
         */
        createCellEditor(options: CodeEditorWidget.IOptions): CodeEditorWidget;
        /**
         * Create a new input area for the widget.
         */
        createInputArea(options: InputAreaWidget.IOptions): InputAreaWidget;
    }
    /**
     * The namespace for the `ContentFactory` class statics.
     */
    namespace ContentFactory {
        /**
         * An options object for initializing a renderer.
         */
        interface IOptions {
            /**
             * A code editor factory.
             */
            readonly editorFactory: CodeEditor.Factory;
        }
    }
}
/**
 * A widget for a code cell.
 */
export declare class CodeCellWidget extends BaseCellWidget {
    /**
     * Construct a code cell widget.
     */
    constructor(options: CodeCellWidget.IOptions);
    /**
     * The model used by the widget.
     */
    readonly model: ICodeCellModel;
    /**
     * The content factory used by the widget.
     */
    readonly contentFactory: CodeCellWidget.IContentFactory;
    /**
     * Dispose of the resources used by the widget.
     */
    dispose(): void;
    /**
     * Execute the cell given a client session.
     */
    execute(session: IClientSession): Promise<KernelMessage.IExecuteReplyMsg>;
    /**
     * Handle `update-request` messages.
     */
    protected onUpdateRequest(msg: Message): void;
    /**
     * Handle changes in the model.
     */
    protected onStateChanged(model: ICellModel, args: IChangedArgs<any>): void;
    /**
     * Handle changes in the metadata.
     */
    protected onMetadataChanged(model: IObservableMap<JSONValue>, args: ObservableMap.IChangedArgs<JSONValue>): void;
    private _rendermime;
    private _output;
}
/**
 * The namespace for the `CodeCellWidget` class statics.
 */
export declare namespace CodeCellWidget {
    /**
     * An options object for initializing a base cell widget.
     */
    interface IOptions {
        /**
         * The model used by the cell.
         */
        model: ICodeCellModel;
        /**
         * The mime renderer for the cell widget.
         */
        rendermime: RenderMime;
        /**
         * The factory used to create code cell components.
         */
        contentFactory: IContentFactory;
    }
    /**
     * A factory for creating code cell widget components.
     */
    interface IContentFactory extends BaseCellWidget.IContentFactory {
        /**
         * The factory for output area content.
         */
        readonly outputAreaContentFactory: OutputAreaWidget.IContentFactory;
        /**
         * Create a new output area for the widget.
         */
        createOutputArea(options: OutputAreaWidget.IOptions): OutputAreaWidget;
    }
    /**
     * The default implementation of an `IContentFactory`.
     */
    class ContentFactory extends BaseCellWidget.ContentFactory implements IContentFactory {
        /**
         * Construct a new code cell content factory
         */
        constructor(options: ContentFactory.IOptions);
        /**
         * The factory for output area content.
         */
        readonly outputAreaContentFactory: OutputAreaWidget.IContentFactory;
        /**
         * Create an output area widget.
         */
        createOutputArea(options: OutputAreaWidget.IOptions): OutputAreaWidget;
    }
    /**
     * The namespace for the `ContentFactory` class statics.
     */
    namespace ContentFactory {
        /**
         * An options object for initializing a renderer.
         */
        interface IOptions {
            /**
             * A code editor factory.
             */
            editorFactory: CodeEditor.Factory;
            /**
             * The factory to use for output area widget content.
             */
            outputAreaContentFactory?: OutputAreaWidget.IContentFactory;
        }
    }
}
/**
 * A widget for a Markdown cell.
 *
 * #### Notes
 * Things get complicated if we want the rendered text to update
 * any time the text changes, the text editor model changes,
 * or the input area model changes.  We don't support automatically
 * updating the rendered text in all of these cases.
 */
export declare class MarkdownCellWidget extends BaseCellWidget {
    /**
     * Construct a Markdown cell widget.
     */
    constructor(options: MarkdownCellWidget.IOptions);
    /**
     * The model used by the widget.
     */
    readonly model: IMarkdownCellModel;
    /**
     * Whether the cell is rendered.
     */
    rendered: boolean;
    /**
     * Dispose of the resource held by the widget.
     */
    dispose(): void;
    protected onUpdateRequest(msg: Message): void;
    /**
     * Handle the rendered state.
     */
    private _handleRendered();
    /**
     * Update the output.
     */
    private _updateOutput();
    private _rendermime;
    private _output;
    private _rendered;
    private _prevText;
    private _prevTrusted;
}
/**
 * The namespace for the `CodeCellWidget` class statics.
 */
export declare namespace MarkdownCellWidget {
    /**
     * An options object for initializing a base cell widget.
     */
    interface IOptions {
        /**
         * The model used by the cell.
         */
        model: IMarkdownCellModel;
        /**
         * The mime renderer for the cell widget.
         */
        rendermime: RenderMime;
        /**
         * The factory object for cell components.
         */
        contentFactory: BaseCellWidget.IContentFactory;
    }
}
/**
 * A widget for a raw cell.
 */
export declare class RawCellWidget extends BaseCellWidget {
    /**
     * Construct a raw cell widget.
     */
    constructor(options: BaseCellWidget.IOptions);
    /**
     * The model used by the widget.
     */
    readonly model: IRawCellModel;
}
/**
 * The namespace for the `RawCellWidget` class statics.
 */
export declare namespace RawCellWidget {
    /**
     * An options object for initializing a base cell widget.
     */
    interface IOptions {
        /**
         * The model used by the cell.
         */
        model: IRawCellModel;
        /**
         * The factory object for cell components.
         */
        contentFactory: BaseCellWidget.IContentFactory;
    }
}
/**
 * An input area widget, which hosts a prompt and an editor widget.
 */
export declare class InputAreaWidget extends Widget {
    /**
     * Construct an input area widget.
     */
    constructor(options: InputAreaWidget.IOptions);
    /**
     * Get the prompt node used by the cell.
     */
    readonly promptNode: HTMLElement;
    /**
     * Render an input instead of the text editor.
     */
    renderInput(widget: Widget): void;
    /**
     * Show the text editor.
     */
    showEditor(): void;
    /**
     * Set the prompt of the input area.
     */
    setPrompt(value: string): void;
    private _prompt;
    private _editor;
    private _rendered;
}
/**
 * The namespace for `InputAreaWidget` statics.
 */
export declare namespace InputAreaWidget {
    /**
     * The options used to create an `InputAreaWidget`.
     */
    interface IOptions {
        /**
         * The editor widget contained by the input area.
         */
        editor: CodeEditorWidget;
    }
}
