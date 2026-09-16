(() => {
    const original_Window_Options_initialize = Window_Options.prototype.initialize;
    
    Window_Options.prototype.initialize = function(rect) {
        // Calculate the number of rows based on the contents of the options menu.
        const numberOfVisibleRows = this.maxVisibleRows() + 1; // Add one row
        rect.height = this.fittingHeight(numberOfVisibleRows); // Adjust the height to fit the number of rows
        original_Window_Options_initialize.call(this, rect);
    };

    // Create a new method to define the max visible rows
    Window_Options.prototype.maxVisibleRows = function() {
        return 9; // Replace this with the number of rows you want, including your new row
    };

})();
