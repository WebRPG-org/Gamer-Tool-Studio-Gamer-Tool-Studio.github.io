/*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Version 2.1.0] [Gamer Tool Studio]
 * @author Gamer Tool Studio
 *
 * @help PlayerTextInput.js
 *
 * This plugin provides two commands:
 * - userInput: Displays a window allowing the player to input text.
 *
 * - displayInput: Displays the text stored in the specified variable.
 *
 * ============================================
 * Plugin Commands
 * ============================================
 *
 * --------------------------------------------
 * userInput
 * --------------------------------------------
 * Displays a custom input window for the player to type text.
 *
 * Parameters:
 * - inputVariable: The game variable ID where the input text will be stored.
 * - placeholderText: The placeholder text displayed when no input has been entered.
 * - actorFaceImage: The face image to display in the input window.
 * - actorFaceImageIndex: The index of the face image (0-7).
 * - actorName: The name to display in the name box above the input window.
 *
 * --------------------------------------------
 * displayInput
 * --------------------------------------------
 * Displays the text stored in the specified variable as a message in-game.
 *
 * Parameters:
 * - inputVariable: The game variable ID where the input text is stored.
 * - actorImage: The face image to display in the message window.
 * - actorImageIndex: The index of the face image (0-7).
 * - actorName: The name to display in the message window.
 * - wrapTextLength: The number of characters per line before wrapping.
 *
 * ============================================
 * Terms of Use
 * ============================================
 * Free for use in non-commercial and commercial projects.
 * Credit is not required but appreciated.
 *
 * ============================================
 *
 * @command userInput
 * @text User Input
 * @desc Displays a custom window for the player to input text.
 *
 * @arg inputVariable
 * @text Input Variable ID
 * @desc The ID of the variable to store the player's input.
 * @type variable
 * @default 1
 *
 * @arg placeholderText
 * @text Placeholder Text
 * @desc The placeholder text displayed when the input is empty.
 * @type text
 * @default Enter your message...
 *
 * @arg actorFaceImage
 * @text Actor Face Image
 * @desc The face image to display in the input window.
 * @type file
 * @dir img/faces
 * @default
 *
 * @arg actorFaceImageIndex
 * @text Actor Face Index
 * @desc The index of the face image (0-7).
 * @type number
 * @min 0
 * @max 7
 * @default 0
 *
 * @arg actorName
 * @text Actor Name
 * @desc The name to display in the name box above the input window.
 * @type text
 * @default
 *
 * @arg wrapTextLength
 * @text Wrap Text Length
 * @desc The number of characters per line before wrapping.
 * @type number
 * @min 10
 * @default 40
 *
 * @command displayInput
 * @text Display Input
 * @desc Displays the text stored in the specified variable.
 *
 * @arg inputVariable
 * @text Input Variable ID
 * @desc The ID of the variable where the player's input is stored.
 * @type variable
 * @default 1
 *
 * @arg actorImage
 * @text Actor Face Image
 * @desc The face image to display in the message window.
 * @type file
 * @dir img/faces
 * @default
 *
 * @arg actorImageIndex
 * @text Actor Face Index
 * @desc The index of the face image (0-7).
 * @type number
 * @min 0
 * @max 7
 * @default 0
 *
 * @arg actorName
 * @text Actor Name
 * @desc The name to display in the message window.
 * @type text
 * @default
 *
 * @arg wrapTextLength
 * @text Wrap Text Length
 * @desc The number of characters per line before wrapping.
 * @type number
 * @min 10
 * @default 40
 */

(() => {
  const pluginName = "PlayerTextInputMz";

  window.PlayerTextInput = window.PlayerTextInput || {};
  window.PlayerTextInput.userInputActive = false;
  window.PlayerTextInput.commandQueue = []; // Queue for storing commands

  // Prevent player movement when the userInput window is active
 const _Game_Player_canMove = Game_Player.prototype.canMove;
 Game_Player.prototype.canMove = function() {
   if (window.PlayerTextInput.userInputActive) {
     return false;
   }
   return _Game_Player_canMove.call(this);
 };
 
  const _Scene_Map_isMenuCalled = Scene_Map.prototype.isMenuCalled;
  Scene_Map.prototype.isMenuCalled = function() {
    if (window.PlayerTextInput.userInputActive) {
      return false;
    }
    return _Scene_Map_isMenuCalled.call(this);
  };

  // Queue sound effect playback while blocking it during userInput window
  const _AudioManager_playSe = AudioManager.playSe;
  AudioManager.playSe = function(se) {
    if (window.PlayerTextInput.userInputActive) {
      // Queue the sound effect to be played later
      window.PlayerTextInput.commandQueue.push(() => _AudioManager_playSe.call(this, se));
    } else {
      _AudioManager_playSe.call(this, se);
    }
  };

  // Create Window_UserInput class
  function Window_UserInput() {
    this.initialize.apply(this, arguments);
  }

  Window_UserInput.prototype = Object.create(Window_Base.prototype);
  Window_UserInput.prototype.constructor = Window_UserInput;

  Window_UserInput.prototype.initialize = function(args) {
		this._inputArgs = args;
		this._inputVariable = parseInt(args.inputVariable, 10) || 1;
		this._inputLines = [''];
		this._maxLines = 4;
		this._wrapTextLength = 40;
		this._placeholderText = args.placeholderText || 'Enter your message...';

		// Actor face image and name
		this._actorFaceImage = args.actorFaceImage || ''; 
		this._actorFaceImageIndex = this._actorFaceImage ? parseInt(args.actorFaceImageIndex, 10) || 0 : 0;
		this._actorName = args.actorName || '';

		const width = 816;
		const height = this.fittingHeight(this._maxLines);
		const x = (Graphics.boxWidth - width) / 2;
		const y = Graphics.boxHeight - height;
		const rect = new Rectangle(x, y, width, height);

		Window_Base.prototype.initialize.call(this, rect);

		if (this._actorFaceImage) {
			this._faceBitmap = ImageManager.loadFace(this._actorFaceImage);
			if (!this._faceBitmap.isReady()) {
				this._faceBitmap.addLoadListener(() => this.refresh());
			}
		}

		this.activate();
		this.open();
		this.refresh();

		this._boundHandleInput = this.processInput.bind(this);
		document.addEventListener('keydown', this._boundHandleInput);

		window.PlayerTextInput.userInputActive = true;
	};


	Window_UserInput.prototype.refresh = function() {
		this.contents.clear();

		let textX = this.padding;
		let textY = this.padding;

		// Draw the face image if it exists
		if (this._actorFaceImage) {
			const faceWidth = ImageManager.faceWidth;
			const faceHeight = ImageManager.faceHeight;
			this.drawFace(this._actorFaceImage, this._actorFaceImageIndex, 0, 0, faceWidth, faceHeight);
			textX = faceWidth + this.padding;
		}

		// Display the placeholder text if no input has been made
		if (this._inputLines.join('') === '') {
			this.drawTextEx(this._placeholderText, textX, textY);
		}

		// Display each line of input text
		for (let i = 0; i < this._inputLines.length; i++) {
			this.drawTextEx(this._inputLines[i], textX, textY + (i * this.lineHeight()));
		}
	};


  Window_UserInput.prototype.processInput = function(event) {
    if (!this.active) return;

    const currentLineIndex = this._inputLines.length - 1;
    let currentLine = this._inputLines[currentLineIndex] || '';

    if (event.key === 'Enter') {
      this.submitInput();
      event.preventDefault();
    } else if (event.key === 'Backspace') {
      // Handle backspace
      if (currentLine.length > 0) {
        this._inputLines[currentLineIndex] = currentLine.slice(0, -1);
      } else if (this._inputLines.length > 1) {
        this._inputLines.pop();
      }
      this.refresh();
    } else if (event.key === 'Escape') {
      this.cancelInput();
      event.preventDefault();
    } else if (event.key.length === 1) {
      // Add the character to the current line
      currentLine += event.key;
      this._inputLines[currentLineIndex] = currentLine;

      // Apply wrapping to the entire input so far
      const fullText = this._inputLines.join(' ');
      this._inputLines = wrapText(fullText, this._wrapTextLength).split('\n');

      // Ensure the input lines do not exceed the maximum allowed
      if (this._inputLines.length > this._maxLines) {
        this._inputLines = this._inputLines.slice(-this._maxLines);
      }

      this.refresh();
    }
  };

  Window_UserInput.prototype.submitInput = function() {
    const inputText = this._inputLines.join('\n');
    $gameVariables.setValue(this._inputVariable, inputText);
  
    // Clean up input window and listeners
    this.deactivate();
    this.close();
    document.removeEventListener('keydown', this._boundHandleInput);
  
    // Remove the window from the scene
    var scene = SceneManager._scene;
    scene.removeChild(this);
  
    // Remove the name box window if it exists
    if (this._nameBoxWindow) {
      scene.removeChild(this._nameBoxWindow);
    }
  
    // Clear the input active flag
    window.PlayerTextInput.userInputActive = false;
  
    // Play queued commands (e.g., SE)
    window.PlayerTextInput.commandQueue.forEach(command => command());
    window.PlayerTextInput.commandQueue = []; // Clear the queue after execution
  
    console.log("Processed input: ", inputText);
  
    // Resume the interpreter
    if (typeof this.onInputComplete === 'function') {
      this.onInputComplete();
    }
  };
  

  Window_UserInput.prototype.cancelInput = function() {
    $gameVariables.setValue(this._inputVariable, '');
  
    // Clean up input window and listeners
    this.deactivate();
    this.close();
    document.removeEventListener('keydown', this._boundHandleInput);
  
    // Remove the window from the scene
    var scene = SceneManager._scene;
    scene.removeChild(this);
  
    // Remove the name box window if it exists
    if (this._nameBoxWindow) {
      scene.removeChild(this._nameBoxWindow);
    }
  
    // Clear the input active flag
    window.PlayerTextInput.userInputActive = false;
  
    // Play queued commands (e.g., SE)
    window.PlayerTextInput.commandQueue.forEach(command => command());
    window.PlayerTextInput.commandQueue = []; // Clear the queue after execution
  
    console.log("Input canceled");
  
    // Resume the interpreter
    if (typeof this.onInputComplete === 'function') {
      this.onInputComplete();
    }
  };
  
  // Wrap text for proper word wrapping
  function wrapText(text, wrapTextLength) {
    const words = text.split(' ');
    let wrappedText = '';
    let currentLine = '';

    for (let word of words) {
      // Check if the word fits within the current line
      const potentialLine = currentLine + (currentLine ? ' ' : '') + word;
      if (potentialLine.length > wrapTextLength) {
        // If it doesn't fit, push the current line and start a new line with the word
        if (currentLine.length > 0) {
          wrappedText += (wrappedText ? '\n' : '') + currentLine;
        }
        currentLine = word; // Start new line with the current word
      } else {
        // Otherwise, add the word to the current line
        currentLine = potentialLine;
      }
    }

    // Append the final line if necessary
    if (currentLine.length > 0) {
      wrappedText += (wrappedText ? '\n' : '') + currentLine;
    }

    return wrappedText;
  }

  function Window_UserInputNameBox(name, parentWindow) {
    this.initialize.apply(this, arguments);
	}

	Window_UserInputNameBox.prototype = Object.create(Window_Base.prototype);
	Window_UserInputNameBox.prototype.constructor = Window_UserInputNameBox;

	Window_UserInputNameBox.prototype.initialize = function (name, parentWindow) {
    	this._name = name;
    	this._parentWindow = parentWindow;
    	const height = this.fittingHeight(1);
    	const x = parentWindow.x;
    	const y = parentWindow.y - height;
    	const rect = new Rectangle(x, y, 100, height);
    	Window_Base.prototype.initialize.call(this, rect);
    	const textWidth = this.textWidth(this._name) + this.padding * 2;
    	this.width = textWidth;
    	this.move(x, y, textWidth, height);
    	this.createContents();
    	this.open();
    	this.refresh();
    };

    Window_UserInputNameBox.prototype.refresh = function () {
      this.contents.clear();
      this.drawText(this._name, this.padding, 0, this.contentsWidth() - this.padding * 2, 'left');
    };
  
  // Command for showing the input window
  window.PlayerTextInput.showInputWindow = function(args) {
    const inputWindow = new Window_UserInput(args);
    SceneManager._scene.addChild(inputWindow);
    
    // If actorName is provided, create a name box window above the input window
    if (args.actorName) {
      const nameBoxWindow = new Window_UserInputNameBox(args.actorName, inputWindow);
      SceneManager._scene.addChild(nameBoxWindow);
      inputWindow._nameBoxWindow = nameBoxWindow; // Store the reference in the input window
    }
  };

  // Expose command for external use
  window.PlayerTextInput.closeInputWindow = function() {
    window.PlayerTextInput.userInputActive = false;
  };
  
  PluginManager.registerCommand(pluginName, "userInput", function (args) {
    const interpreter = this;
    const scene = SceneManager._scene;
  
    if (scene instanceof Scene_Map) {
      if ($gameMessage.isBusy()) {
        interpreter.setWaitMode('message'); // Wait for the message window to close
        return;
      }
  
      // Create and show the input window
      const inputWindow = new Window_UserInput(args);
      scene.addChild(inputWindow);
  
      if (args.actorName?.trim()) {
        const nameBoxWindow = new Window_UserInputNameBox(args.actorName, inputWindow);
        scene.addChild(nameBoxWindow);
        inputWindow._nameBoxWindow = nameBoxWindow;
      }
  
      // Mark input as active and pause player actions
      window.PlayerTextInput.userInputActive = true;
  
      // Pause the interpreter until input is complete
      interpreter.setWaitMode("userInput");
  
      // Resume the interpreter after input completion
      inputWindow.onInputComplete = () => {
        console.log("User input completed. Resuming interpreter...");
        window.PlayerTextInput.userInputActive = false;
      };
  
      return;
    }
  });

  PluginManager.registerCommand(pluginName, "displayInput", function (args) {
    const inputVariableId = parseInt(args.inputVariable, 10) || 1;
    const inputText = String($gameVariables.value(inputVariableId) || '').trim();
    if (!inputText) return;
	const interpreter = this; // Current event interpreter
	// Set custom wait mode to wait for the message window to close
    interpreter.setWaitMode('waitForMessage');

    // Store the arguments to be used later
    interpreter._userInputArgs = args;

    $gameMessage.clear();
    if (args.actorImage?.trim()) {
      $gameMessage.setFaceImage(args.actorImage, parseInt(args.actorImageIndex, 10) || 0);
    }
    $gameMessage.setSpeakerName(args.actorName || '');
    $gameMessage.add(inputText);
    // Set the interpreter to wait until the message is closed
    this.setWaitMode('message');
  });
  
  // Custom wait mode handling
  (function() {
    const _Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode = function() {
      if (this._waitMode === 'userInput') {
        if (window.PlayerTextInput.userInputActive) {
          return true; // Keep waiting
        } else {
          this._waitMode = '';
          return false; // Stop waiting
        }
      }
      // Call original function for other wait modes
      return _Game_Interpreter_updateWaitMode.call(this);
   };
})();


})();