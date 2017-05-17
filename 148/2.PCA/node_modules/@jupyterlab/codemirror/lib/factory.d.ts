import * as CodeMirror from 'codemirror';
import { CodeEditor, IEditorFactoryService } from '@jupyterlab/codeeditor';
/**
 * CodeMirror editor factory.
 */
export declare class CodeMirrorEditorFactory implements IEditorFactoryService {
    /**
     * Construct an IEditorFactoryService for CodeMirrorEditors.
     */
    constructor(codeMirrorOptions?: CodeMirror.EditorConfiguration);
    /**
     * Create a new editor for inline code.
     */
    newInlineEditor(options: CodeEditor.IOptions): CodeEditor.IEditor;
    /**
     * Create a new editor for a full document.
     */
    newDocumentEditor(options: CodeEditor.IOptions): CodeEditor.IEditor;
    protected inlineCodeMirrorOptions: CodeMirror.EditorConfiguration;
    protected documentCodeMirrorOptions: CodeMirror.EditorConfiguration;
}
