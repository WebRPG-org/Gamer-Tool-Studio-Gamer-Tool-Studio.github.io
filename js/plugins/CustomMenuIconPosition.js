/*:
 * @target MZ
 * @plugindesc Customize the position of the main menu icon.
 * @author Gamer Tool Studio
 * @help This plugin allows you to customize the position of the main menu icon.
 *
 * @param MenuIconX
 * @text Menu Icon X Position
 * @type number
 * @min 0
 * @default 0
 * @desc Adjust the X position of the main menu icon.
 *
 * @param MenuIconY
 * @text Menu Icon Y Position
 * @type number
 * @min 0
 * @default 0
 * @desc Adjust the Y position of the main menu icon.
 */

(() => {
    const parameters = PluginManager.parameters('CustomMenuIconPosition');
    const menuIconX = Number(parameters['MenuIconX'] || 0);
    const menuIconY = Number(parameters['MenuIconY'] || 0);

    const _Scene_Map_createButtons = Scene_Map.prototype.createButtons;
    Scene_Map.prototype.createButtons = function() {
        _Scene_Map_createButtons.call(this);
        if (this._menuButton) {
            this._menuButton.x = Graphics.boxWidth - this._menuButton.width - menuIconX;
            this._menuButton.y = menuIconY;
        }
    };
})();
