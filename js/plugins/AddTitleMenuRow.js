/*:
 * @target MZ
 * @plugindesc Automatically launches the game in full screen and adjusts the title menu to show all options without scrolling.
 * @help This plugin forces the game to start in full screen and ensures all title menu options are visible by adjusting the window height.
 *@author Gamer Tool Studio
 */

(() => {
    // Automatically launch the game in full screen when the title screen starts
    const _Scene_Title_start = Scene_Title.prototype.start;
    Scene_Title.prototype.start = function() {
        _Scene_Title_start.call(this);
        // Enter full screen when the Title screen starts
        if (!Graphics._isFullScreen()) {
            Graphics._requestFullScreen();
        }
    };

    // Override the method to increase the number of visible rows in the title command window
    Window_TitleCommand.prototype.numVisibleRows = function() {
        return 4; // Adjust this number based on how many rows you want visible
    };

    // Override the window height method to ensure the title command window height is adjusted properly
    Window_TitleCommand.prototype.windowHeight = function() {
        return this.fittingHeight(this.numVisibleRows());
    };

    // Make sure the title command window is refreshed correctly after adding new rows
    const _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function() {
        _Scene_Title_createCommandWindow.call(this);
        // Force the command window to update its height and contents
        this._commandWindow.height = this._commandWindow.windowHeight();
        this._commandWindow.refresh();
    };

})();