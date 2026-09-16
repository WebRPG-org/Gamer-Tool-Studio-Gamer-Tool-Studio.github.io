/*Scene_Base.prototype.fitToBrowserViewport = function() {
    const aspectRatio = 816 / 624; // Original aspect ratio
    let newWidth = window.innerWidth;
    let newHeight = window.innerHeight;
    let calculatedHeight = Math.round(newWidth / aspectRatio);

    if (calculatedHeight > newHeight) {
        // If height overflows the window, adjust width instead
        newWidth = Math.round(newHeight * aspectRatio);
    } else {
        newHeight = calculatedHeight;
    }

    Graphics.boxWidth = newWidth;
    Graphics.boxHeight = newHeight;
    Graphics.width = newWidth;
    Graphics.height = newHeight;
};*/
Scene_Base.prototype.fitToBrowserViewport = function() {
    Graphics.boxWidth = window.innerWidth;
    Graphics.boxHeight = window.innerHeight;
    Graphics.width = window.innerWidth;
    Graphics.height = window.innerHeight;
};
