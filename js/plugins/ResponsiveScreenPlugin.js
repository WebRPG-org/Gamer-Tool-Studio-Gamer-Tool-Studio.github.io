/*:
 * @target MZ
 * @plugindesc Makes the game responsive to the window size, adjusting the screen and tile coordinates dynamically.
 * @author YourName
 *
 * @help ResponsiveScreenPlugin.js
 *
 * This plugin makes the game responsive to the size of the window or iframe.
 * The game dynamically resizes while maintaining correct tile-based input coordinates.
 * 
 * Features:
 * - Automatically adjusts the canvas size to fit the window or iframe container.
 * - Ensures tile input coordinates remain accurate after resizing.
 * - Works in NW.js and iframe hosting environments.
 * 
 * No plugin commands are required.
 */

(() => {
  const pluginName = "ResponsiveScreenPlugin";

  // Dynamically resize the canvas while maintaining the original aspect ratio
  const adjustCanvasSize = () => {
    const canvas = Graphics._canvas;
    const aspectRatio = 16 / 9;

    // Get the current window size
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Calculate new dimensions while maintaining the aspect ratio
    let newWidth = windowWidth;
    let newHeight = windowWidth / aspectRatio;

    if (newHeight > windowHeight) {
      newHeight = windowHeight;
      newWidth = windowHeight * aspectRatio;
    }

    // Apply the new dimensions to the canvas
    canvas.style.width = `${newWidth}px`;
    canvas.style.height = `${newHeight}px`;

    // Adjust the renderer to match the new dimensions
    if (Graphics._app) {
      Graphics._app.renderer.resize(newWidth, newHeight);
    }
  };

  // Ensure tile-based input coordinates are adjusted correctly
  const adjustTileInput = () => {
    const canvas = Graphics._canvas;
    const rect = canvas.getBoundingClientRect();

    // Scale the input coordinates to match the internal resolution
    TouchInput._x = (TouchInput._x - rect.left) * (Graphics.width / rect.width);
    TouchInput._y = (TouchInput._y - rect.top) * (Graphics.height / rect.height);
  };

  // Override Graphics.initialize to include our resizing logic
  const _Graphics_initialize = Graphics.initialize;
  Graphics.initialize = function(width, height, type) {
    _Graphics_initialize.call(this, width, height, type);

    // Add resize listener to adjust the canvas size dynamically
    window.addEventListener("resize", adjustCanvasSize);

    // Initial resize
    adjustCanvasSize();
  };

  // Hook into TouchInput.update to adjust input coordinates
  const _TouchInput_update = TouchInput.update;
  TouchInput.update = function() {
    _TouchInput_update.call(this);
    adjustTileInput();
  };

  // Ensure the SceneManager resizes correctly after canvas adjustments
  const _SceneManager_onResize = SceneManager.onResize;
  SceneManager.onResize = function() {
    _SceneManager_onResize.call(this);
    adjustCanvasSize();
  };
})();
