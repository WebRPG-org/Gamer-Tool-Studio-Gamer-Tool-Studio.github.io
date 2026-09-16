/*:
 * @target MZ
 * @plugindesc Automatically launches the game in full screen when the game starts at the Title screen.
 * @help This plugin forces the game to enter full screen as soon as the Title screen appears.
 */

(() => {
    const _Scene_Title_start = Scene_Title.prototype.start;
    Scene_Title.prototype.start = function() {
        _Scene_Title_start.call(this);
        // Enter full screen when the Title screen starts
        if (!Graphics._isFullScreen()) {
            Graphics._requestFullScreen();
        }
    };
})();
