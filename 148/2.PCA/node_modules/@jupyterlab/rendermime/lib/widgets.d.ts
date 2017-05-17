import { Message } from '@phosphor/messaging';
import { Widget } from '@phosphor/widgets';
import { RenderMime } from '.';
export declare const HTML_COMMON_CLASS = "jp-RenderedHTMLCommon";
export declare class RenderedHTMLCommon extends Widget {
    constructor(options: RenderMime.IRenderOptions);
}
/**
 * A widget for displaying HTML and rendering math.
 */
export declare class RenderedHTML extends RenderedHTMLCommon {
    /**
     * Construct a new html widget.
     */
    constructor(options: RenderMime.IRenderOptions);
    /**
     * A message handler invoked on an `'after-attach'` message.
     */
    onAfterAttach(msg: Message): void;
    private _urlResolved;
}
/**
 * A widget for displaying Markdown with embeded latex.
 */
export declare class RenderedMarkdown extends RenderedHTMLCommon {
    /**
     * Construct a new markdown widget.
     */
    constructor(options: RenderMime.IRenderOptions);
    /**
     * A message handler invoked on an `'after-attach'` message.
     */
    onAfterAttach(msg: Message): void;
    private _rendered;
    private _urlResolved;
}
/**
 * A widget for displaying LaTeX output.
 */
export declare class RenderedLatex extends Widget {
    /**
     * Construct a new latex widget.
     */
    constructor(options: RenderMime.IRenderOptions);
    /**
     * A message handler invoked on an `'after-attach'` message.
     */
    onAfterAttach(msg: Message): void;
}
/**
 * A widget for displaying rendered images.
 */
export declare class RenderedImage extends Widget {
    /**
     * Construct a new rendered image widget.
     */
    constructor(options: RenderMime.IRenderOptions);
}
/**
 * A widget for displaying rendered text.
 */
export declare class RenderedText extends Widget {
    /**
     * Construct a new rendered text widget.
     */
    constructor(options: RenderMime.IRenderOptions);
}
/**
 * A widget for displaying rendered JavaScript.
 */
export declare class RenderedJavaScript extends Widget {
    /**
     * Construct a new rendered JavaScript widget.
     */
    constructor(options: RenderMime.IRenderOptions);
}
/**
 * A widget for displaying rendered SVG content.
 */
export declare class RenderedSVG extends Widget {
    /**
     * Construct a new rendered SVG widget.
     */
    constructor(options: RenderMime.IRenderOptions);
    private _urlResolved;
}
/**
 * A widget for displaying rendered PDF content.
 */
export declare class RenderedPDF extends Widget {
    /**
     * Construct a new rendered PDF widget.
     */
    constructor(options: RenderMime.IRenderOptions);
}
