import { JSONObject } from '@phosphor/coreutils';
import { IObservableJSON } from '@jupyterlab/coreutils';
import { RenderMime } from './rendermime';
/**
 * The default mime model implementation.
 */
export declare class MimeModel implements RenderMime.IMimeModel {
    /**
     * Construct a new mime model.
     */
    constructor(options?: MimeModel.IOptions);
    /**
     * The data associated with the model.
     */
    readonly data: IObservableJSON;
    /**
     * The metadata associated with the model.
     */
    readonly metadata: IObservableJSON;
    /**
     * Whether the model is trusted.
     */
    readonly trusted: boolean;
    /**
     * Test whether the model is disposed.
     */
    readonly isDisposed: boolean;
    /**
     * Dispose of the resources used by the mime model.
     */
    dispose(): void;
    /**
     * Serialize the model as JSON data.
     */
    toJSON(): JSONObject;
}
/**
 * The namespace for MimeModel class statics.
 */
export declare namespace MimeModel {
    /**
     * The options used to create a mime model.
     */
    interface IOptions {
        /**
         * The initial mime data.
         */
        data?: JSONObject;
        /**
         * Whether the output is trusted.  The default is false.
         */
        trusted?: boolean;
        /**
         * The initial metadata.
         */
        metadata?: JSONObject;
    }
}
