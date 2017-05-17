import { Token } from '@phosphor/coreutils';
import { ServiceManager } from './manager';
export * from './config';
export * from './contents';
export * from './kernel';
export * from './manager';
export * from './session';
export * from './terminal';
export { IAjaxSettings } from './utils';
import * as utils from './utils';
export { utils };
/**
 * The default services provider token.
 */
export declare const IServiceManager: Token<IServiceManager>;
/**
 * The service manager interface.
 */
export interface IServiceManager extends ServiceManager.IManager {
}
