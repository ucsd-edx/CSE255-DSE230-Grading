import * as CodeMirror from 'codemirror';
import 'codemirror/mode/meta';
import 'codemirror/addon/runmode/runmode';
import './codemirror-ipython';
import './codemirror-ipythongfm';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/julia/julia';
import 'codemirror/mode/r/r';
import 'codemirror/mode/markdown/markdown';
/**
 * The interface of a codemirror mode.
 */
export interface IModeSpec {
    [key: string]: string;
    name?: string;
    mode: string;
    mime: string;
}
/**
 * Running a CodeMirror mode outside of an editor.
 */
export declare function runMode(code: string, mode: string | IModeSpec, el: HTMLElement): void;
/**
 * Find a mode name by extension.
 */
export declare function findModeByExtension(ext: string): string;
/**
 * Load a codemirror mode by file name.
 */
export declare function loadModeByFileName(editor: CodeMirror.Editor, filename: string): void;
/**
 * Load a codemirror mode by mime type.
 */
export declare function loadModeByMIME(editor: CodeMirror.Editor, mimetype: string): void;
/**
 * Load a codemirror mode by mode name.
 */
export declare function loadModeByName(editor: CodeMirror.Editor, mode: string): void;
/**
 * Find a codemirror mode by name or CodeMirror spec.
 */
export declare function findMode(mode: string | IModeSpec): IModeSpec;
/**
 * Require a codemirror mode by name or Codemirror spec.
 */
export declare function requireMode(mode: string | IModeSpec): Promise<IModeSpec>;
