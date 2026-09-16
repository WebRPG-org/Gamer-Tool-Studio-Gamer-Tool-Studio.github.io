/*:
 * @target MZ
 * @plugindesc Adds a Fullscreen Toggle to the Options Window
 * @author SumRndmDde
 */

(() => {
    const optionName = "CustomFullScreenPlugin";

    const _Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
    Window_Options.prototype.makeCommandList = function() {
        _Window_Options_makeCommandList.call(this);
        this.addCommand(optionName, 'fullscreen');
    };

    Object.defineProperty(ConfigManager, 'fullscreen', {
        get: function() {
            return Graphics._isFullScreen();
        },
        set: function(value) {
            if (value) {
                Graphics._requestFullScreen();
            } else {
                Graphics._cancelFullScreen();
            }
        },
        configurable: true
    });
})();
