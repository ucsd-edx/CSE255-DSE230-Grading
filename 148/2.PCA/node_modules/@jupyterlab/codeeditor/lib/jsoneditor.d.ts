import { Message } from '@phosphor/messaging';
import { Widget } from '@phosphor/widgets';
import { IObservableJSON } from '@jupyterlab/coreutils';
import { CodeEditor } from '.';
/**
 * A widget for editing observable JSON.
 */
export declare class JSONEditorWidget extends Widget {
    /**
     * Construct a new metadata editor.
     */
    constructor(options: JSONEditorWidget.IOptions);
    /**
     * The code editor used by the editor.
     */
    readonly editor: CodeEditor.IEditor;
    /**
     * The code editor model used by the editor.
     */
    readonly model: CodeEditor.IModel;
    /**
     * Get the editor host node used by the metadata editor.
     */
    readonly editorHostNode: HTMLElement;
    /**
     * Get the revert button used by the metadata editor.
     */
    readonly revertButtonNode: HTMLElement;
    /**
     * Get the commit button used by the metadata editor.
     */
    readonly commitButtonNode: HTMLElement;
    /**
     * The observable source.
     */
    source: IObservableJSON | null;
    /**
     * Get whether the editor is dirty.
     */
    readonly isDirty: boolean;
    /**
     * Handle the DOM events for the widget.
     *
     * @param event - The DOM event sent to the widget.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the notebook panel's node. It should
     * not be called directly by user code.
     */
    handleEvent(event: Event): void;
    /**
     * Handle `after-attach` messages for the widget.
     */
    protected onAfterAttach(msg: Message): void;
    /**
     * Handle `before-detach` messages for the widget.
     */
    protected onBeforeDetach(msg: Message): void;
    /**
     * Handle a change to the metadata of the source.
     */
    private _onSourceChanged(sender, args);
    /**
     * Handle change events.
     */
    private _onValueChanged();
    /**
     * Handle blur events for the text area.
     */
    private _evtBlur(event);
    /**
     * Handle click events for the buttons.
     */
    private _evtClick(event);
    /**
     * Merge the user content.
     */
    private _mergeContent();
    /**
     * Get the metadata from the owner.
     */
    private _getContent();
    /**
     * Set the value given the owner contents.
     */
    private _setValue();
    private _dataDirty;
    private _inputDirty;
    private _source;
    private _originalValue;
    private _changeGuard;
}
/**
 * The static namespace JSONEditorWidget class statics.
 */
export declare namespace JSONEditorWidget {
    /**
     * The options used to initialize a metadata editor.
     */
    interface IOptions {
        /**
         * The editor factory used by the tool.
         */
        editorFactory: CodeEditor.Factory;
    }
}
