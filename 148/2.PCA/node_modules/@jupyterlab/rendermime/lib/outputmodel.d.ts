import { JSONObject } from '@phosphor/coreutils';
import { nbformat } from '@jupyterlab/coreutils';
import { MimeModel } from './mimemodel';
import { RenderMime } from './rendermime';
/**
 * The interface for an output model.
 */
export interface IOutputModel extends RenderMime.IMimeModel {
    /**
     * The output type.
     */
    readonly type: string;
    /**
     * The execution count of the model.
     */
    readonly executionCount: nbformat.ExecutionCount;
    /**
     * Serialize the model to JSON.
     */
    toJSON(): nbformat.IOutput;
}
/**
 * The namespace for IOutputModel sub-interfaces.
 */
export declare namespace IOutputModel {
    /**
     * The options used to create a notebook output model.
     */
    interface IOptions {
        /**
         * The raw output value.
         */
        value: nbformat.IOutput;
        /**
         * Whether the output is trusted.  The default is false.
         */
        trusted?: boolean;
    }
}
/**
 * The default implementation of a notebook output model.
 */
export declare class OutputModel extends MimeModel implements IOutputModel {
    /**
     * Construct a new output model.
     */
    constructor(options: IOutputModel.IOptions);
    /**
     * The output type.
     */
    readonly type: string;
    /**
     * The execution count.
     */
    readonly executionCount: nbformat.ExecutionCount;
    /**
     * Serialize the model to JSON.
     */
    toJSON(): nbformat.IOutput;
    private _raw;
}
/**
 * The namespace for OutputModel statics.
 */
export declare namespace OutputModel {
    /**
     * Get the data for an output.
     *
     * @params output - A kernel output message payload.
     *
     * @returns - The data for the payload.
     */
    function getData(output: nbformat.IOutput): JSONObject;
    /**
     * Get the metadata from an output message.
     *
     * @params output - A kernel output message payload.
     *
     * @returns - The metadata for the payload.
     */
    function getMetadata(output: nbformat.IOutput): JSONObject;
}
