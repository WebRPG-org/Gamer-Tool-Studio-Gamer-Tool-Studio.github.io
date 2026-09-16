//=============================================================================
// SimplestMainMenu.js
//=============================================================================
/*:
* @target MZ
* @plugindesc v0.0.1 Simplest Main Menu
* @author MechPen
* @help SimplestMainMenu.js
*
* Removes everything except for the command window.
* You can remove Items, Skill, etc from the System 2 tab in the database.
*
*
*/

(() => {
//
const pluginName = "SimplestMainMenu";

Scene_Menu.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
	this._statusWindow.hide();
	this._goldWindow.hide();
};

Scene_Menu.prototype.commandWindowRect = function() {
    const ww = this.mainCommandWidth();
    const wh = this.mainAreaHeight() - this.goldWindowRect().height;
    const wx = Math.floor((Graphics.boxWidth - ww)/2);
    const wy = this.mainAreaTop();
    return new Rectangle(wx, wy, ww, wh);
};
   
})();


// end of file