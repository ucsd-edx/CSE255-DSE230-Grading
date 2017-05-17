import { Token } from '@phosphor/coreutils';
import { Menu, MenuBar } from '@phosphor/widgets';
/**
 * The main menu token.
 */
export declare const IMainMenu: Token<IMainMenu>;
/**
 * The main menu interface.
 */
export interface IMainMenu {
    /**
     * Add a new menu to the main menu bar.
     */
    addMenu(menu: Menu, options?: IMainMenu.IAddOptions): void;
}
/**
 * The namespace for IMainMenu attached interfaces.
 */
export declare namespace IMainMenu {
    /**
     * The options used to add a menu to the main menu.
     */
    interface IAddOptions {
        /**
         * The rank order of the menu among its siblings.
         */
        rank?: number;
    }
}
/**
 * The main menu class.  It is intended to be used as a singleton.
 */
export declare class MainMenu extends MenuBar implements IMainMenu {
    /**
     * Add a new menu to the main menu bar.
     */
    addMenu(menu: Menu, options?: IMainMenu.IAddOptions): void;
    /**
     * Handle the disposal of a menu.
     */
    private _onMenuDisposed(menu);
    private _items;
}
