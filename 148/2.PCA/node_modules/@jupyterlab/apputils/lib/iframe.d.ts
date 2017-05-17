import { Widget } from '@phosphor/widgets';
/**
 * A phosphor widget which wraps an IFrame.
 */
export declare class IFrameWidget extends Widget {
    /**
     * Create a new IFrame widget.
     */
    constructor();
    /**
     * The url of the IFrame.
     */
    url: string | null;
}
