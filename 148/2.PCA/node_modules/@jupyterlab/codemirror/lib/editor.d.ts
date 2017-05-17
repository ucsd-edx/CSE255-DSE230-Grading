import * as CodeMirror from 'codemirror';
import { IDisposable } from '@phosphor/disposable';
import { Signal } from '@phosphor/signaling';
import { CodeEditor } from '@jupyterlab/codeeditor';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/comment/comment.js';
import 'codemirror/keymap/vim.js';
/**
 * CodeMirror editor.
 */
export declare class CodeMirrorEditor implements CodeEditor.IEditor {
    /**
     * Construct a CodeMirror editor.
     */
    constructor(options: CodeEditor.IOptions, config?: CodeMirror.EditorConfiguration);
    /**
     * A signal emitted when either the top or bottom edge is requested.
     */
    readonly edgeRequested: Signal<this, CodeEditor.EdgeLocation>;
    /**
     * The DOM node that hosts the editor.
     */
    readonly host: HTMLElement;
    /**
     * The uuid of this editor;
     */
    uuid: string;
    /**
     * The selection style of this editor.
     */
    selectionStyle: CodeEditor.ISelectionStyle;
    /**
     * Get the codemirror editor wrapped by the editor.
     */
    readonly editor: CodeMirror.Editor;
    /**
     * Get the codemirror doc wrapped by the widget.
     */
    readonly doc: CodeMirror.Doc;
    /**
     * Get the number of lines in the editor.
     */
    readonly lineCount: number;
    /**
     * Control the rendering of line numbers.
     */
    lineNumbers: boolean;
    /**
     * Set to false for horizontal scrolling. Defaults to true.
     */
    wordWrap: boolean;
    /**
     * Should the editor be read only.
     */
    readOnly: boolean;
    /**
     * Returns a model for this editor.
     */
    readonly model: CodeEditor.IModel;
    /**
     * The height of a line in the editor in pixels.
     */
    readonly lineHeight: number;
    /**
     * The widget of a character in the editor in pixels.
     */
    readonly charWidth: number;
    /**
     * Tests whether the editor is disposed.
     */
    readonly isDisposed: boolean;
    /**
     * Dispose of the resources held by the widget.
     */
    dispose(): void;
    /**
     * Returns the content for the given line number.
     */
    getLine(line: number): string | undefined;
    /**
     * Find an offset for the given position.
     */
    getOffsetAt(position: CodeEditor.IPosition): number;
    /**
     * Find a position fot the given offset.
     */
    getPositionAt(offset: number): CodeEditor.IPosition;
    /**
     * Undo one edit (if any undo events are stored).
     */
    undo(): void;
    /**
     * Redo one undone edit.
     */
    redo(): void;
    /**
     * Clear the undo history.
     */
    clearHistory(): void;
    /**
     * Brings browser focus to this editor text.
     */
    focus(): void;
    /**
     * Test whether the editor has keyboard focus.
     */
    hasFocus(): boolean;
    /**
     * Explicitly blur the editor.
     */
    blur(): void;
    /**
     * Repaint editor.
     */
    refresh(): void;
    /**
     * Add a keydown handler to the editor.
     *
     * @param handler - A keydown handler.
     *
     * @returns A disposable that can be used to remove the handler.
     */
    addKeydownHandler(handler: CodeEditor.KeydownHandler): IDisposable;
    /**
     * Set the size of the editor in pixels.
     */
    setSize(dimension: CodeEditor.IDimension | null): void;
    /**
     * Reveal the given position in the editor.
     */
    revealPosition(position: CodeEditor.IPosition): void;
    /**
     * Reveal the given selection in the editor.
     */
    revealSelection(selection: CodeEditor.IRange): void;
    /**
     * Get the window coordinates given a cursor position.
     */
    getCoordinateForPosition(position: CodeEditor.IPosition): CodeEditor.ICoordinate;
    /**
     * Get the cursor position given window coordinates.
     *
     * @param coordinate - The desired coordinate.
     *
     * @returns The position of the coordinates, or null if not
     *   contained in the editor.
     */
    getPositionForCoordinate(coordinate: CodeEditor.ICoordinate): CodeEditor.IPosition | null;
    /**
     * Returns the primary position of the cursor, never `null`.
     */
    getCursorPosition(): CodeEditor.IPosition;
    /**
     * Set the primary position of the cursor.
     *
     * #### Notes
     * This will remove any secondary cursors.
     */
    setCursorPosition(position: CodeEditor.IPosition): void;
    /**
     * Returns the primary selection, never `null`.
     */
    getSelection(): CodeEditor.ITextSelection;
    /**
     * Set the primary selection. This will remove any secondary cursors.
     */
    setSelection(selection: CodeEditor.IRange): void;
    /**
     * Gets the selections for all the cursors, never `null` or empty.
     */
    getSelections(): CodeEditor.ITextSelection[];
    /**
     * Sets the selections for all the cursors, should not be empty.
     * Cursors will be removed or added, as necessary.
     * Passing an empty array resets a cursor position to the start of a document.
     */
    setSelections(selections: CodeEditor.IRange[]): void;
    /**
     * Handle keydown events from the editor.
     */
    protected onKeydown(event: KeyboardEvent): boolean;
    /**
     * Converts selections to code mirror selections.
     */
    private _toCodeMirrorSelections(selections);
    /**
     * Handles a mime type change.
     */
    private _onMimeTypeChanged();
    /**
     * Handles a selections change.
     */
    private _onSelectionsChanged(selections, args);
    /**
     * Clean selections for the given uuid.
     */
    private _cleanSelections(uuid);
    /**
     * Marks selections.
     */
    private _markSelections(uuid, selections);
    /**
     * Handles a cursor activity event.
     */
    private _onCursorActivity();
    /**
     * Converts a code mirror selection to an editor selection.
     */
    private _toSelection(selection);
    /**
     * Converts the selection style to a text marker options.
     */
    private _toTextMarkerOptions(style);
    /**
     * Converts an editor selection to a code mirror selection.
     */
    private _toCodeMirrorSelection(selection);
    /**
     * Converts an editor selection to a code mirror selection.
     */
    private _toCodeMirrorRange(range);
    /**
     * Convert a code mirror position to an editor position.
     */
    private _toPosition(position);
    /**
     * Convert an editor position to a code mirror position.
     */
    private _toCodeMirrorPosition(position);
    /**
     * Handle model value changes.
     */
    private _onValueChanged(value, args);
    /**
     * Handles document changes.
     */
    private _onDocChanged(doc, change);
    private _model;
    private _editor;
    protected selectionMarkers: {
        [key: string]: CodeMirror.TextMarker[] | undefined;
    };
    private _keydownHandlers;
    private _changeGuard;
    private _selectionStyle;
    private _uuid;
}
/**
 * The namespace for `CodeMirrorEditor` statics.
 */
export declare namespace CodeMirrorEditor {
    /**
     * The name of the default CodeMirror theme
     */
    const DEFAULT_THEME: string;
}
