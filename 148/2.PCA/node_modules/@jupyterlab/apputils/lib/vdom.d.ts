import { IDisposable } from '@phosphor/disposable';
import { Message } from '@phosphor/messaging';
import { ISignal, Signal } from '@phosphor/signaling';
import { VirtualNode } from '@phosphor/virtualdom';
import { Widget } from '@phosphor/widgets';
/**
 * Phosphor widget that encodes best practices for VDOM based rendering.
 */
export declare abstract class VDomWidget<T extends VDomWidget.IModel> extends Widget {
    /**
     * A signal emited when the model changes.
     */
    readonly modelChanged: ISignal<this, void>;
    /**
     * Get the current model.
     */
    /**
     * Set the model and fire changed signals.
     */
    model: T | null;
    /**
     * Dispose this widget.
     */
    dispose(): void;
    /**
     * Called to update the state of the widget.
     *
     * The default implementation of this method triggers
     * VDOM based rendering by calling the this.render() method.
     */
    protected onUpdateRequest(msg: Message): void;
    /**
     * Render the content of this widget using the virtial DOM.
     *
     * This method will be called anytime the widget needs to be rendered,
     * which includes layout triggered rendering and all model changes.
     *
     * Subclasses should define this method and use the current model state
     * to create a virtual node or nodes to render.
     */
    protected abstract render(): VirtualNode | ReadonlyArray<VirtualNode>;
    private _model;
    private _modelChanged;
}
/**
 * The namespace for VDomWidget statics.
 */
export declare namespace VDomWidget {
    /**
     * An interface for a model to be used with vdom rendering.
     */
    interface IModel extends IDisposable {
        /**
         * A signal emited when any model state changes.
         */
        readonly stateChanged: ISignal<this, void>;
    }
}
/**
 * Concrete implementation of VDomWidget model.
 */
export declare class VDomModel implements VDomWidget.IModel {
    /**
     * A signal emitted when any model state changes.
     */
    readonly stateChanged: Signal<this, void>;
    /**
     * Test whether the model is disposed.
     */
    readonly isDisposed: boolean;
    /**
     * Dispose the model.
     */
    dispose(): void;
    private _isDisposed;
}
