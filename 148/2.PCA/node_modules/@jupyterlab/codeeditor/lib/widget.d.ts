import { Message } from '@phosphor/messaging';
import { Widget } from '@phosphor/widgets';
import { CodeEditor } from './';
/**
 * A widget which hosts a code editor.
 */
export declare class CodeEditorWidget extends Widget {
    /**
     * Construct a new code editor widget.
     */
    constructor(options: CodeEditorWidget.IOptions);
    /**
     * Get the editor wrapped by the widget.
     */
    readonly editor: CodeEditor.IEditor;
    /**
     * Get the model used by the widget.
     */
    readonly model: CodeEditor.IModel;
    /**
     * Dispose of the resources held by the widget.
     */
    dispose(): void;
    /**
     * Handle the DOM events for the widget.
     *
     * @param event - The DOM event sent to the widget.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the panel's DOM node. It should
     * not be called directly by user code.
     */
    handleEvent(event: Event): void;
    /**
     * Handle `'activate-request'` messages.
     */
    protected onActivateRequest(msg: Message): void;
    /**
     * A message handler invoked on an `'after-attach'` message.
     */
    protected onAfterAttach(msg: Message): void;
    /**
     * A message handler invoked on an `'after-show'` message.
     */
    protected onAfterShow(msg: Message): void;
    /**
     * Handle `before-detach` messages for the widget.
     */
    protected onBeforeDetach(msg: Message): void;
    /**
     * A message handler invoked on a `'resize'` message.
     */
    protected onResize(msg: Widget.ResizeMessage): void;
    /**
     * Handle `focus` events for the widget.
     */
    private _evtFocus(event);
    /**
     * Handle a change in model selections.
     */
    private _onSelectionsChanged();
    private _editor;
    private _needsRefresh;
}
/**
 * The namespace for the `CodeEditorWidget` statics.
 */
export declare namespace CodeEditorWidget {
    /**
     * The options used to initialize a code editor widget.
     */
    interface IOptions {
        /**
         * A code editor factory.
         *
         * #### Notes
         * The widget needs a factory and a model instead of a `CodeEditor.IEditor`
         * object because it needs to provide its own node as the host.
         */
        factory: CodeEditor.Factory;
        /**
         * The model used to initialize the code editor.
         */
        model: CodeEditor.IModel;
        /**
         * The desired uuid for the editor.
         */
        uuid?: string;
        /**
         * Whether line numbers should be displayed. Defaults to `false`.
         */
        lineNumbers?: boolean;
        /**
         * Set to false for horizontal scrolling. Defaults to `true`.
         */
        wordWrap?: boolean;
        /**
         * Whether the editor is read-only. Defaults to `false`.
         */
        readOnly?: boolean;
        /**
         * The default selection style for the editor.
         */
        selectionStyle?: CodeEditor.ISelectionStyle;
    }
}
