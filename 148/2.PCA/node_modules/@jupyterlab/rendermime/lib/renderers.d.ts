import { Widget } from '@phosphor/widgets';
import { RenderMime } from '.';
/**
 * A renderer for raw html.
 */
export declare class HTMLRenderer implements RenderMime.IRenderer {
    /**
     * The mimeTypes this renderer accepts.
     */
    mimeTypes: string[];
    /**
     * Whether the renderer can render given the render options.
     */
    canRender(options: RenderMime.IRenderOptions): boolean;
    /**
     * Render the transformed mime bundle.
     */
    render(options: RenderMime.IRenderOptions): Widget;
    /**
     * Whether the renderer will sanitize the data given the render options.
     */
    wouldSanitize(options: RenderMime.IRenderOptions): boolean;
}
/**
 * A renderer for `<img>` data.
 */
export declare class ImageRenderer implements RenderMime.IRenderer {
    /**
     * The mimeTypes this renderer accepts.
     */
    mimeTypes: string[];
    /**
     * Whether the renderer can render given the render options.
     */
    canRender(options: RenderMime.IRenderOptions): boolean;
    /**
     * Render the transformed mime bundle.
     */
    render(options: RenderMime.IRenderOptions): Widget;
    /**
     * Whether the renderer will sanitize the data given the render options.
     */
    wouldSanitize(options: RenderMime.IRenderOptions): boolean;
}
/**
 * A renderer for plain text and Jupyter console text data.
 */
export declare class TextRenderer implements RenderMime.IRenderer {
    /**
     * The mimeTypes this renderer accepts.
     */
    mimeTypes: string[];
    /**
     * Whether the renderer can render given the render options.
     */
    canRender(options: RenderMime.IRenderOptions): boolean;
    /**
     * Render the transformed mime bundle.
     */
    render(options: RenderMime.IRenderOptions): Widget;
    /**
     * Whether the renderer will sanitize the data given the render options.
     */
    wouldSanitize(options: RenderMime.IRenderOptions): boolean;
}
/**
 * A renderer for raw `<script>` data.
 */
export declare class JavaScriptRenderer implements RenderMime.IRenderer {
    /**
     * The mimeTypes this renderer accepts.
     */
    mimeTypes: string[];
    /**
     * Whether the renderer can render given the render options.
     */
    canRender(options: RenderMime.IRenderOptions): boolean;
    /**
     * Render the transformed mime bundle.
     */
    render(options: RenderMime.IRenderOptions): Widget;
    /**
     * Whether the renderer will sanitize the data given the render options.
     */
    wouldSanitize(options: RenderMime.IRenderOptions): boolean;
}
/**
 * A renderer for `<svg>` data.
 */
export declare class SVGRenderer implements RenderMime.IRenderer {
    /**
     * The mimeTypes this renderer accepts.
     */
    mimeTypes: string[];
    /**
     * Whether the renderer can render given the render options.
     */
    canRender(options: RenderMime.IRenderOptions): boolean;
    /**
     * Render the transformed mime bundle.
     */
    render(options: RenderMime.IRenderOptions): Widget;
    /**
     * Whether the renderer will sanitize the data given the render options.
     */
    wouldSanitize(options: RenderMime.IRenderOptions): boolean;
}
/**
 * A renderer for PDF data.
 */
export declare class PDFRenderer implements RenderMime.IRenderer {
    /**
     * The mimeTypes this renderer accepts.
     */
    mimeTypes: string[];
    /**
     * Whether the renderer can render given the render options.
     */
    canRender(options: RenderMime.IRenderOptions): boolean;
    /**
     * Render the transformed mime bundle.
     */
    render(options: RenderMime.IRenderOptions): Widget;
    /**
     * Whether the renderer will sanitize the data given the render options.
     */
    wouldSanitize(options: RenderMime.IRenderOptions): boolean;
}
/**
 * A renderer for LateX data.
 */
export declare class LatexRenderer implements RenderMime.IRenderer {
    /**
     * The mimeTypes this renderer accepts.
     */
    mimeTypes: string[];
    /**
     * Whether the renderer can render given the render options.
     */
    canRender(options: RenderMime.IRenderOptions): boolean;
    /**
     * Render the transformed mime bundle.
     */
    render(options: RenderMime.IRenderOptions): Widget;
    /**
     * Whether the renderer will sanitize the data given the render options.
     */
    wouldSanitize(options: RenderMime.IRenderOptions): boolean;
}
/**
 * A renderer for Jupyter Markdown data.
 */
export declare class MarkdownRenderer implements RenderMime.IRenderer {
    /**
     * The mimeTypes this renderer accepts.
     */
    mimeTypes: string[];
    /**
     * Whether the renderer can render given the render options.
     */
    canRender(options: RenderMime.IRenderOptions): boolean;
    /**
     * Render the transformed mime bundle.
     */
    render(options: RenderMime.IRenderOptions): Widget;
    /**
     * Whether the renderer will sanitize the data given the render options.
     */
    wouldSanitize(options: RenderMime.IRenderOptions): boolean;
}
