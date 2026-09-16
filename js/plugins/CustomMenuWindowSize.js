/*:
 * @target MZ
 * @plugindesc Dynamically adjust the height of Window_MenuCommand based on its content in RPG Maker MZ.
 * @author Your Name
 * @help Adds 200 pixels to the height of the Window_MenuCommand for each command it contains.

 * @param additionalHeightPerCommand
 * @text Additional Height per Command
 * @type number
 * @default 200
 * @desc Additional height added to the window per menu command.
 */

(() => {
    const pluginName = "CustomMenuWindowSize";
    const parameters = PluginManager.parameters(pluginName);
    const additionalHeightPerCommand = Number(parameters['additionalHeightPerCommand'] || 200);

    // Override initialize to set a dynamic height based on the number of commands
    const _Window_MenuCommand_initialize = Window_MenuCommand.prototype.initialize;
    Window_MenuCommand.prototype.initialize = function(rect) {
        // Call the original method to ensure it's set up correctly
        _Window_MenuCommand_initialize.call(this, rect);

        // Dynamically adjust the height based on the number of commands
        this.height = this.fittingHeight(this.maxItems()) + (this.maxItems() * additionalHeightPerCommand);
    };

    // Adjust the fittingHeight method to include additional height per command
    Window_MenuCommand.prototype.fittingHeight = function(numLines) {
        const baseHeight = this.itemHeight() * numLines;
        return baseHeight + (numLines * additionalHeightPerCommand);
    };
})();