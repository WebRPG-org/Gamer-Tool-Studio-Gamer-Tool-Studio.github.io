/*:
 * @target MZ
 * @plugindesc Enables Touch UI on the Title Screen but disables it during gameplay.
 * @help This plugin enables the touch UI (mouse clicks, touch input) on the Title Screen, 
 * but disables it in all other parts of the game once gameplay starts.
 */

(() => {
    // Disable touch UI by default in the config
    ConfigManager.touchUI = false;

    // Function to check if the current scene is the title screen
    const isTitleScene = function() {
        return SceneManager._scene instanceof Scene_Title;
    };

    // Update method to handle enabling/disabling touch UI based on the current scene
    const _SceneManager_updateInputData = SceneManager.updateInputData;
    SceneManager.updateInputData = function() {
        // Call the original method to update input data
        _SceneManager_updateInputData.call(this);

        // Enable touch input on the Title screen, disable it otherwise
        if (isTitleScene()) {
            TouchInput.update(); // Allow touch input in the title screen
        } else {
            Input.update(); // Only allow keyboard/gamepad input in other scenes
        }
    };

    // Prevent players from changing the touch UI option in the settings
    const _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        _ConfigManager_applyData.call(this, config);
        this.touchUI = false; // Always force touch UI to be off in settings
    };

    // Remove the touch UI option from the settings menu
    const _Scene_Options_prototype_createCommandWindow = Scene_Options.prototype.createCommandWindow;
    Scene_Options.prototype.createCommandWindow = function() {
        _Scene_Options_prototype_createCommandWindow.call(this);
        // Remove the touch UI option from the options menu
        const touchUICommandIndex = this._commandWindow.findSymbol('touchUI');
        if (touchUICommandIndex !== -1) {
            this._commandWindow.removeCommandAt(touchUICommandIndex);
        }
    };
})();