import { Token } from '@phosphor/coreutils';
import { RenderMime } from './rendermime';
export * from './latex';
export * from './mimemodel';
export * from './outputmodel';
export * from './rendermime';
export * from './renderers';
export * from './widgets';
/**
 * The rendermime token.
 */
export declare const IRenderMime: Token<IRenderMime>;
/**
 * The rendermime interface.
 */
export interface IRenderMime extends RenderMime {
}
