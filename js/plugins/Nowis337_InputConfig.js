

//==================================
/*: * @target MZ
 * @plugindesc v1.3 Keyboard and Controller Input Config
 * @author Nowis-337
 * @url https://nowis-337.itch.io/
 * 
 * @help Nowis337_InputConfig.js
 * - This plugin adds the option to rebind the keyboard and game controller keys.
 * - Features:
 *    * Ability to add your own custom keybinds and assign a custom keyname.
 *     (Can be used in scriptcalls to detect input for custom keynames).
 *    * Customise the button names dispayed (Xbox controller = default).
 * - Limitations:
 *    * Not compatible with plugins that bind common events to keys/buttons.
 *    * Can only bind function to 1 key/button.
 * 
 * Parameters:
 * - Default Options Menu - disable if you are using plugins that modify
 *   the options menu. You can alternatively call this menu with:
 *      SceneManager.push(Scene_ControllerRebind);
 * 
 * - Y Position - adjusts y position of the windows.
 * 
 * - Window Width - width of the menu window
 * 
 * - Timeout Count - Number of frames before cancelling when no input is provided when prompted
 * 
 * - Keybind List
 *      - Keybind Name - the name of the keybind displayed in the menu.
 *      - Key Preset - sets the keyname associated with RPG Maker default.
 *                   - set to "Custom" to set your own keyname (see below).
 *      - Custom Keyname - set a custom keyname for the keybind.
 *                       - can be used with script calls.
 *      - Default Key - sets the default button for this keybind.
 *      - Default Controller Key - sets the default controller button for this keybind.

 * - Text - customises menu names, labels and messages.
 *
 * 
 * - Button Names - rename what the buttons are displayed as in the menu. Default is Xbox controller button names.
 * 
 * 
 * - Renaming Keyboard Keys
 *      - I've added a section where you can change the name of the keyboard keys displayed
 *      - You'll have to edit the plugin file itself
 *      - you can find it in the plugin file under the section "KEYBOARD KEY LABELS"
 * 
 * ============================================================================
 * Free to use in non-commercial and commercial projects!
 * Feel free to edit the code as required
 * Please credit Nowis-337
 * ============================================================================
 * 
 * Version 1.0 - 12/11/23 - Finished plugin!
 * Version 1.1 - 13/11/23 - Bugfixes, New input settings now only apply when pressing the "confirm" button.
 *                          Added back the debug input, and pageup and pagedown in the default parameters
 * Version 1.2 - 15/11/23 - Fixed bug related to controller rebind.
 *                          Fixed errors with window selection due to timeout timer.
 * Version 1.3 - 26/12/23 - Added window width paramemter to set the width of the menu window
 *                          Added functionality to change the keyboard key names (will need to edit section in the plugin file itself)
 * 
 * @param defaultOptions
 * @desc Using Default Options Menu.
 * @text Default Options Menu
 * @type boolean
 * @default true
 * 
 * @param yPosition
 * @text Y Position
 * @desc Y coordinate
 * @type number
 * @default 40
 * 
 * @param uiWidth
 * @text Window Width
 * @desc Width of Menu Window
 * @type number
 * @default 816
 * 
 * @param timeoutTimer
 * @text Timeout Count
 * @desc Number of frames for input to timeout.
 * @type number
 * @default 800
 * 
* 
* @param KeybindList
* @text Keybind List
* @type struct<KeyBind>[]
* @default ["{\"keyName\":\"Up :\",\"keyPreset\":\"Up\",\"inputKey\":\"\",\"defaultother\":\"Up\",\"default\":\"\",\"defaultcontroller\":\"Up\"}","{\"keyName\":\"Left :\",\"keyPreset\":\"Left\",\"inputKey\":\"\",\"defaultother\":\"Left\",\"default\":\"\",\"defaultcontroller\":\"Left\"}","{\"keyName\":\"Down :\",\"keyPreset\":\"Down\",\"inputKey\":\"\",\"defaultother\":\"Down\",\"default\":\"\",\"defaultcontroller\":\"Down\"}","{\"keyName\":\"Right :\",\"keyPreset\":\"Right\",\"inputKey\":\"\",\"defaultother\":\"Right\",\"default\":\"\",\"defaultcontroller\":\"Right\"}","{\"keyName\":\"Select :\",\"keyPreset\":\"Ok\",\"inputKey\":\"\",\"defaultother\":\"Other\",\"default\":\"Z\",\"defaultcontroller\":\"A\"}","{\"keyName\":\"Cancel/Menu :\",\"keyPreset\":\"Escape\",\"inputKey\":\"\",\"defaultother\":\"Other\",\"default\":\"X\",\"defaultcontroller\":\"B\"}","{\"keyName\":\"Sprint :\",\"keyPreset\":\"Sprint\",\"inputKey\":\"\",\"defaultother\":\"Shift\",\"default\":\"\",\"defaultcontroller\":\"X\"}","{\"keyName\":\"Menu :\",\"keyPreset\":\"Menu\",\"inputKey\":\"\",\"defaultother\":\"Esc\",\"default\":\"\",\"defaultcontroller\":\"Y\"}","{\"keyName\":\"Page Up :\",\"keyPreset\":\"Custom\",\"inputKey\":\"pageup\",\"defaultother\":\"Other\",\"default\":\"Q\",\"defaultcontroller\":\"LB\"}","{\"keyName\":\"Page Down :\",\"keyPreset\":\"Custom\",\"inputKey\":\"pagedown\",\"defaultother\":\"Other\",\"default\":\"W\",\"defaultcontroller\":\"RB\"}"]
*

 * @param Text
 * @param OptionLabel
 * @parent Text
 * @text Option Label
 * @desc Name that appears in the options menu.
 * @type text
 * @default Input Config
 * 
 * @param KeyboardLabel
 * @parent Text
 * @text Keyboard Heading
 * @desc Heading for keyboard keybinds.
 * @type text
 * @default Keyboard
 * 
 * @param ControllerLabel
 * @parent Text
 * @text Controller Heading
 * @desc Heading for controller keybinds.
 * @type text
 * @default Controller
 * 
 * @param KeyboardResetLabel
 * @parent Text
 * @text Keyboard Reset Label
 * @desc Text for the keyboard reset button.
 * @type text
 * @default Reset Keyboard
 * 
 * @param ControllerResetLabel
 * @parent Text
 * @text Controller Reset Label
 * @desc Text for the controller reset button.
 * @type text
 * @default Reset Controller
 * 
* @param ConfirmLabel
 * @parent Text
 * @text Confirm Label
 * @desc Text for the confirm button.
 * @type text
 * @default Confirm
 * 
 * @param CancelLabel
 * @parent Text
 * @text Cancel Label
 * @desc Text for the cancel button.
 * @type text
 * @default Cancel
 * 
 * 
 * @param PendingKeyboardInput
 * @parent Text
 * @text Pending Keyboard Input
 * @desc Text that shows when prompting keyboard input.
 * @default Press new key to rebind.
 * 
 * @param PendingControllerInput
 * @parent Text
 * @text Pending Controller Input
 * @desc Text that shows when prompting controller input.
 * @default Press new button to rebind.
 * 

 * @param ButtonNames
 * @text Button Names
 * 
 * @param button12
 * @parent ButtonNames
 * @text Up
 * @type text
 * @default Up
 * 
 * @param button14
 * @parent ButtonNames
 * @text Left
 * @type text
 * @default Left
 * 
 * @param button13
 * @parent ButtonNames
 * @text Down
 * @type text
 * @default Down
 * 
 * @param button15
 * @parent ButtonNames
 * @text Right
 * @type text
 * @default Right
 * 
 * @param button0
 * @parent ButtonNames
 * @text A
 * @type text
 * @default A
 * 
 * @param button1
 * @parent ButtonNames
 * @text B
 * @type text
 * @default B
 * 
 * @param button2
 * @parent ButtonNames
 * @text X
 * @type text
 * @default X
 * 
 * @param button3
 * @parent ButtonNames
 * @text Y
 * @type text
 * @default Y
 * 
 * @param button4
 * @parent ButtonNames
 * @text LB
 * @type text
 * @default LB
 * 
 * @param button5
 * @parent ButtonNames
 * @text RB
 * @type text
 * @default RB
 * 
 * @param button6
 * @parent ButtonNames
 * @text LT
 * @type text
 * @default LT
 * 
 * @param button7
 * @parent ButtonNames
 * @text RT
 * @type text
 * @default RT
 * 
 * @param button8
 * @parent ButtonNames
 * @text Back
 * @type text
 * @default Back
 * 
 * @param button9
 * @parent ButtonNames
 * @text Start
 * @type text
 * @default Start
 * 
 * @param button10
 * @parent ButtonNames
 * @text LStick
 * @type text
 * @default LStick
 * 
 * @param button11
 * @parent ButtonNames
 * @text RStick
 * @type text
 * @default RStick 
*  
*/

/*~struct~KeyBind:
* @param keyName
* @text Keybind Name
* @desc Name of the Keybind.
* @type text
* 
* @param keyPreset
* @text Key Preset
* @desc Preset default keybind options. Select 'Custom' to customise your own.
* @type select
* @option Ok
* @option Escape
* @option Cancel
* @option Menu
* @option Sprint
* @option Up
* @option Down
* @option Left
* @option Right
* @option Custom
* 
* 
* @param inputKey
* @text Custom Keyname
* @desc Custom keyname for a custom keybind. Requires "Custom" under Key Preset.
* @type text
* 
* 
* @param defaultother
* @text Default Input (Special Keys)
* @desc Bind to default special key. Select 'Other' for other keyboard inputs below.
* @type select
* @option Other
* @option Space
* @option Enter
* @option Backspace
* @option Shift
* @option Ctrl
* @option Alt
* @option Esc
* @option Tab
* @option Del
* @option Ins
* @option Home
* @option End
* @option PgUp
* @option PgDn
* @option Capslock
* @option NumLock
* @option Up
* @option Down
* @option Left
* @option Right
* @option Num0
* @option Num1
* @option Num2
* @option Num3
* @option Num4
* @option Num5
* @option Num6
* @option Num7
* @option Num8
* @option Num9
* @option NumPeriod
* @option NumDivide
* 
* 
* 
* @param default
* @text Default Input
* @desc Bind to default keyboard input. Select 'Other' above to use this.
* @type text
*
* 
* @param defaultcontroller
* @text Default Controller Key
* @desc default controller button for this keybind.
* @type select
* @option Up
* @option Left
* @option Down
* @option Right
* @option A
* @option B
* @option X
* @option Y
* @option LB
* @option RB
* @option LT
* @option RT
* @option Select
* @option Start
* @option LStick
* @option RStick
* 
*/


var Nowis337_InputConfig = {
    usingDefaultOption: Boolean(JSON.parse(PluginManager.parameters("Nowis337_InputConfig")["defaultOptions"])),
    _optionslabel: PluginManager.parameters("Nowis337_InputConfig")["OptionLabel"],
    _heading1: PluginManager.parameters("Nowis337_InputConfig")["KeyboardLabel"],
    _heading2: PluginManager.parameters("Nowis337_InputConfig")["ControllerLabel"],
    _label1: PluginManager.parameters("Nowis337_InputConfig")["KeyboardResetLabel"],
    _label2: PluginManager.parameters("Nowis337_InputConfig")["ControllerResetLabel"],
    _label3: PluginManager.parameters("Nowis337_InputConfig")["ConfirmLabel"],
    _label4: PluginManager.parameters("Nowis337_InputConfig")["CancelLabel"],
    _text1: PluginManager.parameters("Nowis337_InputConfig")["PendingKeyboardInput"],
    _text2: PluginManager.parameters("Nowis337_InputConfig")["PendingControllerInput"],
    _timer: Number(PluginManager.parameters("Nowis337_InputConfig")["timeoutTimer"]),
    _yPosition: Number(PluginManager.parameters("Nowis337_InputConfig")["yPosition"]),
    _uiWidth: Number(PluginManager.parameters("Nowis337_InputConfig")["uiWidth"]),

    
};

Nowis337_InputConfig.createData = function(){
    
    let rawData = JSON.parse(PluginManager.parameters("Nowis337_InputConfig")["KeybindList"]);
    let array = [];
    rawData.forEach(processData);

    function processData(struct0){
        let struct = JSON.parse(struct0);
   
        let object = {};
        // Extracting Label for KeyBind
        object.keyName = struct["keyName"];

        //Extracting InputKey
        if(struct["keyPreset"] == "Custom"){
            object.inputKey = struct["inputKey"]; // custom input key
        } else {
            switch(struct["keyPreset"]){ // presets
                case "Up": object.inputKey = "up"; break;
                case "Left": object.inputKey = "left"; break;
                case "Down": object.inputKey = "down"; break;
                case "Right": object.inputKey = "right"; break;
                case "Ok": object.inputKey = "ok"; break;
                case "Cancel": object.inputKey = "cancel"; break;
                case "Menu": object.inputKey = "menu"; break;
                case "Escape": object.inputKey = "escape"; break;
                case "Sprint": object.inputKey = "shift"; break;
                default: object.inputKey = null;
            };
        };
        //Extracting Default Key
        let keycode;
        if(struct["defaultother"] !== "Other"){
            keycode = Nowis337_InputConfig.findKeyCode(struct["defaultother"]);
        } else {
            let keycodeinput = struct["default"].toUpperCase();
            keycode = Nowis337_InputConfig.findKeyCode(keycodeinput);

        };
        object.default = keycode;

        //Extracting Default Controller Key
        let controller = struct["defaultcontroller"];

        switch(controller){
            case "Up": object.defaultcontroller = 12; break;
            case "Left": object.defaultcontroller = 14; break;
            case "Down": object.defaultcontroller = 13; break;
            case "Right": object.defaultcontroller = 15; break;
            case "A": object.defaultcontroller = 0; break;
            case "B": object.defaultcontroller = 1; break;
            case "X": object.defaultcontroller = 2; break;
            case "Y": object.defaultcontroller = 3; break;
            case "LB": object.defaultcontroller = 4; break;
            case "RB": object.defaultcontroller = 5; break;
            case "LT": object.defaultcontroller = 6; break;
            case "RT": object.defaultcontroller = 7; break;
            case "Select": object.defaultcontroller = 8; break;
            case "Start": object.defaultcontroller = 9; break;
            case "LStick": object.defaultcontroller = 10; break;
            case "RStick": object.defaultcontroller = 11; break;
            default: object.defaultcontroller = null;
        };
        // Done!
        array.push(object);
    };

    this.finalData = array;
    
};

// Translating plugin parameter to keycode
Nowis337_InputConfig.findKeyCode = function(inputkeyname){
    let object = Nowis337_InputConfig.keyLookUp.find(object => object.name == inputkeyname);
    if(object){
        return object.code;
    } else {
        return undefined;
    };
};

Nowis337_InputConfig.clearKeyboardInput = function(){
    Input.keyMapper = {};

};

Nowis337_InputConfig.clearControllerInput = function(){
    Input.gamepadMapper = {};

};

Nowis337_InputConfig.clearKeyboardInputDummy = function(){
    Nowis337_InputConfig.dummyCurrentKeyboardInput = {};

};

Nowis337_InputConfig.clearControllerInputDummy = function(){
    Nowis337_InputConfig.dummyCurrentControllerInput = {};

};


Nowis337_InputConfig.applyDefaultKeys = function(){
    this.clearKeyboardInput();
    this.finalData.forEach(applyDefaultFunction);

    function applyDefaultFunction(object){
        if(object.default){
            Input.keyMapper[object.default] = object.inputKey;
        };
    };
    Input.keyMapper[120] = "debug"; // Add Debug Key F9
    Input.keyMapper[17] = "control" // control


};

Nowis337_InputConfig.applyDefaultControllerKeys = function(){
    this.clearControllerInput();
    this.finalData.forEach(applyDefaultFunction);

    function applyDefaultFunction(object){
        if(isFinite(object.defaultcontroller)){
            Input.gamepadMapper[object.defaultcontroller] = object.inputKey;
        };
    
    };

};

Nowis337_InputConfig.applyDefaultKeysDummy = function(){
    this.clearKeyboardInputDummy();
    this.finalData.forEach(applyDefaultFunction);

    function applyDefaultFunction(object){
        if(object.default){
            Nowis337_InputConfig.dummyCurrentKeyboardInput[object.default] = object.inputKey;
        };
    };
    Nowis337_InputConfig.dummyCurrentKeyboardInput[120] = "debug"; // Add Debug Key F9
    

};

Nowis337_InputConfig.applyDefaultControllerKeysDummy = function(){
    this.clearControllerInputDummy();
    this.finalData.forEach(applyDefaultFunction);

    function applyDefaultFunction(object){
        if(isFinite(object.defaultcontroller)){
            Nowis337_InputConfig.dummyCurrentControllerInput[object.defaultcontroller] = object.inputKey;
        };
    
    };

};







Nowis337_InputConfig.saveCurrentInput = function(){ // so can restore later when cancelling out of menu
    this.savedCurrentKeyboardInput = JSON.stringify(Input.keyMapper);
    this.savedCurrentControllerInput = JSON.stringify(Input.gamepadMapper);
};

Nowis337_InputConfig.createDummyInput = function(){ // this is used to display what is on the menu list (doesn't affect actual controls)
    Nowis337_InputConfig.dummyCurrentKeyboardInput = JSON.parse(JSON.stringify(Input.keyMapper));
    Nowis337_InputConfig.dummyCurrentControllerInput = JSON.parse(JSON.stringify(Input.gamepadMapper));
};

Nowis337_InputConfig.updatePendingKeyboardInput = function(){ 
    this.pendingCurrentKeyboardInput = JSON.parse(JSON.stringify(Input.keyMapper));
};

Nowis337_InputConfig.updatePendingControllerInput = function(){
    this.pendingCurrentControllerInput = JSON.parse(JSON.stringify(Input.gamepadMapper));
};

Nowis337_InputConfig.restorePendingKeyboardInput = function(){
    Nowis337_InputConfig.dummyCurrentKeyboardInput = JSON.parse(JSON.stringify(this.pendingCurrentKeyboardInput));
};

Nowis337_InputConfig.restorePendingControllerInput = function(){ //refer actual gamepad input
    Input.gamepadMapper = JSON.parse(JSON.stringify(this.pendingCurrentControllerInput));

};

Nowis337_InputConfig.restoreKeyboardInput = function(){
    Nowis337_InputConfig.dummyCurrentKeyboardInput = JSON.parse(this.savedCurrentKeyboardInput);
};

Nowis337_InputConfig.restoreControllerInput = function(){
    Nowis337_InputConfig.dummyCurrentControllerInput = JSON.parse(this.savedCurrentControllerInput);
};




Nowis337_InputConfig.prepareControllerKeys = function(){
    Input.gamepadMapper = {
        0: "0", // A
        1: "1", // B
        2: "2", // X
        3: "3", // Y
        4: "4", // LB
        5: "5", // RB
        6: "6", //LT
        7: "7", // RT
        8: "8", // Select/Back
        9: "9", // Start
        10: "10", // LstickClick
        11: "11", // RstickClick
        12: "12", // D-pad up
        13: "13", // D-pad down
        14: "14", // D-pad left
        15: "15" // D-pad right
    };
};


//==================================
// Finding display name from keycode - is is shown in the menu
Nowis337_InputConfig.findKeyDisplay = function(keycode){
    let number = 1*keycode;
    let object = Nowis337_InputConfig.keyLookUp.find(object => object.code == number);
    if(object){
        return object.name;
    } else {
        return "-"
    };

};

Nowis337_InputConfig.findKeyLabelDisplay = function(keycode){
    let number = 1*keycode;
    let object = Nowis337_InputConfig.keyLabelDisplay.find(object => object.code == number);
    if(object){
        return object.name;
    } else {
        return "-"
    };

};

Nowis337_InputConfig.findControllerKeyDisplay = function(keycode){
    let number = keycode;
    let label = PluginManager.parameters("Nowis337_InputConfig")["button"+number];
    if(label){
        return label
    } else {
        return "-";
    };
    
};

Nowis337_InputConfig.findKeySymbol = function(keycode){
    return Nowis337_InputConfig.dummyCurrentKeyboardInput[keycode];
};

Nowis337_InputConfig.findControllerKeySymbol = function(keycode){
    return Nowis337_InputConfig.dummyCurrentControllerInput[keycode];
};

Nowis337_InputConfig.currentBindedKey = function(keysymbol){
    let arrayofallkeys = Object.keys(Nowis337_InputConfig.dummyCurrentKeyboardInput);
    let currentkeycode = arrayofallkeys.find(value => Nowis337_InputConfig.dummyCurrentKeyboardInput[value] === keysymbol);
    return currentkeycode;
    
};

Nowis337_InputConfig.currentBindedControllerKey = function(keysymbol){
    let arrayofallkeys = Object.keys(Nowis337_InputConfig.dummyCurrentControllerInput);
    let currentkeycode = arrayofallkeys.find(value => Nowis337_InputConfig.dummyCurrentControllerInput[value] === keysymbol);
    return currentkeycode;
};



// Listening Stuff
Nowis337_InputConfig.listenFunction = function(event){
    if(SceneManager._scene._inputDelay > 0) return;
    SceneManager._scene.setInputDelay();
    SceneManager._scene.processKeyboardInput(event.keyCode);
};

Nowis337_InputConfig.addListenEvent = function(){
    document.addEventListener("keydown", Nowis337_InputConfig.listenFunction);

};

Nowis337_InputConfig.removeListenEvent = function(){
    document.removeEventListener("keydown", Nowis337_InputConfig.listenFunction);
}



//====================================================
// Saving and Loading Data
//====================================================
// ConfigManager
//====================================================

const Nowis337_InputConfig_ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
    let config1 = Nowis337_InputConfig_ConfigManager_makeData.call(this);
    config1.savedKeyboardMapper = Input.keyMapper;
    config1.savedControllerMapper = Input.gamepadMapper;
    return config1;
};

const Nowis337_InputConfig_ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
    Nowis337_InputConfig_ConfigManager_applyData.call(this, config);
    if("savedKeyboardMapper" in config){
        this.savedKeyboardMapper = config.savedKeyboardMapper;
        Input.keyMapper = config.savedKeyboardMapper;
    };
    if("savedControllerMapper" in config){
        this.savedControllerMapper = config.savedKeyboardMapper;
        Input.keyMapper = config.savedKeyboardMapper;
    };

};

const Nowis337_InputConfig_ConfigManager_load = ConfigManager.load;
ConfigManager.load = function() {
    Nowis337_InputConfig.createData();
    Nowis337_InputConfig.applyDefaultKeys();
    Nowis337_InputConfig.applyDefaultControllerKeys();
    Nowis337_InputConfig_ConfigManager_load.call(this);
};



//=====================================================
// Scene_Options
//=====================================================

const Nowis337_InputConfig_Scene_Options_prototype_maxCommands = Scene_Options.prototype.maxCommands
Scene_Options.prototype.maxCommands = function() {
    return Nowis337_InputConfig_Scene_Options_prototype_maxCommands.call(this)+1;
};

//=====================================================
// Window_Options
//=====================================================

const Nowis337_InputConfig_Window_Option_prototype_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function() {
    this.addCommand(Nowis337_InputConfig._optionslabel, "inputconfig");
    Nowis337_InputConfig_Window_Option_prototype_addGeneralOptions.call(this);
};

const Nowis337_InputConfig_Window_Option_prototype_changeValue = Window_Options.prototype.changeValue;
Window_Options.prototype.changeValue = function(symbol, value) {
    Nowis337_InputConfig_Window_Option_prototype_changeValue.call(this, symbol, value);
    if(symbol == "inputconfig"){
        Input.clear();
        if(Nowis337_InputConfig.usingDefaultOption){
            Nowis337_InputConfig._lastIndex = this.index();
        };
        
        SceneManager.push(Scene_InputConfig);
    };

};

const Nowis337_InputConfig_Window_Options_prototype_statusText = Window_Options.prototype.statusText;
Window_Options.prototype.statusText = function(index) {
    const symbol = this.commandSymbol(index);
    if(symbol == "inputconfig") return "";
    return Nowis337_InputConfig_Window_Options_prototype_statusText.call(this, index);

};

const Nowis337_InputConfig_Window_Options_prototype_initialize = Window_Options.prototype.initialize;
Window_Options.prototype.initialize = function(rect) {
    Nowis337_InputConfig_Window_Options_prototype_initialize.call(this,rect);
 
};


const Nowis337_InputConfig_Scene_Options_prototype_popScene = Scene_Options.prototype.popScene;
Scene_Options.prototype.popScene = function() {
    if(Nowis337_InputConfig.usingDefaultOption){
        Nowis337_InputConfig._lastIndex = -1;
    };
    Nowis337_InputConfig_Scene_Options_prototype_popScene.call(this);
 
    
};
const Nowis337_InputConfig_Scene_Options_createOptionsWindow = Scene_Options.prototype.createOptionsWindow;
Scene_Options.prototype.createOptionsWindow = function() {
    Nowis337_InputConfig_Scene_Options_createOptionsWindow.call(this);
    if(Nowis337_InputConfig.usingDefaultOption){
        if(Nowis337_InputConfig._lastIndex!== undefined && Nowis337_InputConfig._lastIndex > -1){
            this._optionsWindow.select(Nowis337_InputConfig._lastIndex);
            Nowis337_InputConfig._lastIndex = -1;
        };
        
    };
};

const Nowis337_InputConfig_Window_Options_prototype_cursorRight = Window_Options.prototype.cursorRight;
Window_Options.prototype.cursorRight = function() {
    const index = this.index();
    const symbol = this.commandSymbol(index);
    if(symbol == "inputconfig") return;
    Nowis337_InputConfig_Window_Options_prototype_cursorRight.call(this);
};

const Nowis337_InputConfig_Window_Options_prototype_cursorLeft = Window_Options.prototype.cursorLeft;
Window_Options.prototype.cursorLeft = function() {
    const index = this.index();
    const symbol = this.commandSymbol(index);
    if(symbol == "inputconfig") return;
    Nowis337_InputConfig_Window_Options_prototype_cursorLeft.call(this);

};





























//====================================================
// Scene_InputConfig
//====================================================


function Scene_InputConfig() {
    this.initialize(...arguments);
}

Scene_InputConfig.prototype = Object.create(Scene_MenuBase.prototype);
Scene_InputConfig.prototype.constructor = Scene_InputConfig;

Scene_InputConfig.prototype.initialize = function() {
    Nowis337_InputConfig.saveCurrentInput();
    Nowis337_InputConfig.createDummyInput();

    Scene_MenuBase.prototype.initialize.call(this);
    this._inputDelay = 0;
    this._pendingKeySymbol = "";
    this._pendingBoundKeyCode = null;
    this._pendingBoundControllerCode = null;
    this._listeningMode = false;
    this._selectMode = "keyboard";
    this._changeMade = false;

      
};

Scene_InputConfig.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createTitleWindow();
    this.createKeyboardList();
    this.createControllerList();
    this.createLabelList();
    this.createDefaultWindow();
    this.createConfirmWindow();
    this.createPopupWindow();
    this.addTitleText();
    //==============================
    this._controllerList.refresh();
    this._keyList.refresh();
    this._resetWindow.refresh();
    this._confirmWindow.refresh();

    this.selectFirstEntry();
    if (this._cancelButton) this._cancelButton.setClickHandler(this.cancelScene.bind(this));


};

Scene_InputConfig.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);
    if(this._inputDelay > 0) this._inputDelay--;
    if(this._timeoutCount > 0 && this._timeoutCounterOn){
        this._timeoutCount--;
        if(this._timeoutCount <= 0){
            this.processTimeOut();
        };
    }
    if(this._listeningMode) this.listenForControllerInput();


};

Scene_InputConfig.prototype.setInputDelay = function(number = 5){
    this._inputDelay = number;
};

Scene_InputConfig.prototype.setTimeOutCounter = function(){
    this._timeoutCount = Nowis337_InputConfig._timer;
    this._timeoutCounterOn = true;
};

Scene_InputConfig.prototype.selectFirstEntry = function(){
    this._keyList.activate();
    this._keyList.select(0);
    this._controllerList.smoothSelect(this._keyList.index());
};


Scene_InputConfig.prototype.createTitleWindow = function() {
    const ww = Nowis337_InputConfig._uiWidth;
    const wh = this.calcWindowHeight(1, false);
    const wx = ((Graphics.width - ww)/2) - (Graphics.width - Graphics.boxWidth)/2;
    const wy = Nowis337_InputConfig._yPosition;
    const rect = new Rectangle(wx, wy, ww, wh);
    this._titleWindow = new Window_Base(rect);
    this.addWindow(this._titleWindow);

};

Scene_InputConfig.prototype.addTitleText = function(){
    const textrect = this._titleWindow.baseTextRect();
    let heading1 = Nowis337_InputConfig._heading1;
    let heading2 = Nowis337_InputConfig._heading2;
    this._titleWindow.drawText(heading1, textrect.x + textrect.width/3, textrect.y, textrect.width/3, "center");
    this._titleWindow.drawText(heading2, textrect.y + textrect.width *2/3, textrect.y, textrect.width/3, "center");
}






Scene_InputConfig.prototype.createKeyboardList = function() {
    const ww = Nowis337_InputConfig._uiWidth * 1/3;
    const wh = this.calcWindowHeight(8,true);
    const wx = this._titleWindow.x + this._titleWindow.width - ww*2 + 1;
    const wy = this._titleWindow.y + this._titleWindow.height;
    const rect = new Rectangle(wx, wy, ww, wh);

    this._keyList = new Window_KeyList(rect);
    this.addWindow(this._keyList);
    this._keyList.setHandler("ok", this.keyboardOk.bind(this));
    this._keyList.setHandler("cancel", this.selectCancel.bind(this));
};

Scene_InputConfig.prototype.createLabelList = function() {
    const ww = this._titleWindow.width - this._keyList.width - this._controllerList.width;
    const wh = this.calcWindowHeight(8,true);
    const wx = this._titleWindow.x;
    const wy = this._titleWindow.y + this._titleWindow.height;
    const rect = new Rectangle(wx, wy, ww, wh);

    this._labelList = new Window_LabelList(rect);
    this.addWindow(this._labelList);
    this._labelList.refresh();
    this._keyList._labelList = this._labelList;
    this._controllerList._labelList = this._labelList;
};

Scene_InputConfig.prototype.createControllerList = function() {
    const ww = Nowis337_InputConfig._uiWidth * 1/3;
    const wh = this._keyList.height;
    const wx = this._titleWindow.x + this._titleWindow.width - ww;
    const wy = this._titleWindow.y + this._titleWindow.height;
    const rect = new Rectangle(wx, wy, ww, wh);

    this._controllerList = new Window_ControllerList(rect);
    this.addWindow(this._controllerList);
    this._keyList._controllerList = this._controllerList;
    this._controllerList._keyList = this._keyList;
    this._controllerList.setHandler("ok", this.controllerOk.bind(this));
    this._controllerList.setHandler("cancel", this.selectCancel.bind(this));
    
};

Scene_InputConfig.prototype.createDefaultWindow = function() {
    const ww = this._titleWindow.width;
    const wh = this.calcWindowHeight(1,true);
    const wx = this._titleWindow.x;
    const wy = this._keyList.y + this._keyList.height;
    const rect = new Rectangle(wx, wy, ww, wh);

    this._resetWindow = new Window_ResetWindow(rect);
    this.addWindow(this._resetWindow);
    this._resetWindow._keyList = this._keyList;
    this._resetWindow._controllerList = this._controllerList;
    this._keyList._resetWindow = this._resetWindow;
    this._controllerList._resetWindow = this._resetWindow;
    this._resetWindow.setHandler("ok", this.defaultOk.bind(this));
    this._resetWindow.setHandler("cancel", this.selectCancel.bind(this));

};

Scene_InputConfig.prototype.createConfirmWindow = function() {
    const ww = this._titleWindow.width;
    const wh = this.calcWindowHeight(1,true);
    const wx = this._titleWindow.x;
    const wy = this._resetWindow.y + this._resetWindow.height;
    const rect = new Rectangle(wx, wy, ww, wh);

    this._confirmWindow = new Window_InputConfirmWindow(rect);
    this.addWindow(this._confirmWindow);
    this._confirmWindow._keyList = this._keyList;
    this._confirmWindow._controllerList = this._controllerList;
    this._confirmWindow._resetWindow = this._resetWindow;
    this._keyList._confirmWindow = this._confirmWindow;
    this._controllerList._confirmWindow = this._confirmWindow;
    this._resetWindow._confirmWindow = this._confirmWindow;
    this._confirmWindow.setHandler("ok", this.confirmOk.bind(this));
    this._confirmWindow.setHandler("cancel", this.confirmCancel.bind(this));


};



Scene_InputConfig.prototype.createPopupWindow = function() {
    const ww = Nowis337_InputConfig._uiWidth;
    const wh = this.calcWindowHeight(1,true)*2;
    const wx = this._titleWindow.x;
    const wy = this._resetWindow.y;
    const rect = new Rectangle(wx, wy, ww, wh);

    this._popupWindow = new Window_Base(rect);
    this._popupWindow._openness = 0;
    this.addWindow(this._popupWindow);

};


Scene_InputConfig.prototype.keyboardOk = function() {
    this.setInputDelay(20);
    this._pendingKeySymbol = this._keyList._data[this._keyList.index()].inputKey;
    this._pendingBoundKeyCode = Nowis337_InputConfig.currentBindedKey(this._pendingKeySymbol);
    this.updatePopupText(1);
    this._popupWindow.open();
    this.setTimeOutCounter();
    Nowis337_InputConfig.addListenEvent();


};

Scene_InputConfig.prototype.controllerOk = function() {
    Nowis337_InputConfig.updatePendingControllerInput();
    this.setInputDelay(20);
    this._pendingKeySymbol = this._keyList._data[this._keyList.index()].inputKey;
    this._pendingBoundControllerCode = Nowis337_InputConfig.currentBindedControllerKey(this._pendingKeySymbol);
    Nowis337_InputConfig.prepareControllerKeys();
    this.setTimeOutCounter();
    this.updatePopupText(2);
    this._popupWindow.open();
    this._listeningMode = true;

};

Scene_InputConfig.prototype.defaultOk = function() {
    this.setInputDelay();
    SoundManager.playLoad()
    if(this._resetWindow.index() == 0){ // Keyboard
        Nowis337_InputConfig.applyDefaultKeysDummy();
        this._keyList.refresh();
        this._controllerList.refresh();

    } else{ // Controller
        Nowis337_InputConfig.applyDefaultControllerKeysDummy();        
        this._keyList.refresh();
        this._controllerList.refresh();

    };

    this._resetWindow.activate();

};

Scene_InputConfig.prototype.confirmOk = function() {
    this.setInputDelay();
    if(this._confirmWindow.index() == 0){
        SoundManager.playSave();
        //apply dummy input into actual input
        Input.keyMapper = JSON.parse(JSON.stringify(Nowis337_InputConfig.dummyCurrentKeyboardInput));
        Input.gamepadMapper = JSON.parse(JSON.stringify(Nowis337_InputConfig.dummyCurrentControllerInput));
        SceneManager.pop();
    } else {
        if(this._changeMade){
            this._changeMade = false;
            this._confirmWindow.refresh();
            Nowis337_InputConfig.restoreControllerInput();
            Nowis337_InputConfig.restoreKeyboardInput();
            this._confirmWindow.activate();
            this._keyList.refresh();
            this._controllerList.refresh();
        } else {
            this.cancelScene();
        }
     
    };


};

Scene_InputConfig.prototype.confirmCancel = function() {
    if(this._confirmWindow.index() == 0){
        this._confirmWindow.select(1);
        this._confirmWindow.activate();
    } else {
        if(this._changeMade){
            this._changeMade = false;
            this._confirmWindow.refresh();
            Nowis337_InputConfig.restoreControllerInput();
            Nowis337_InputConfig.restoreKeyboardInput();
            this._confirmWindow.activate();
            this._keyList.refresh();
            this._controllerList.refresh();

        } else {
            this.cancelScene();
        }
    };

    

};


Scene_InputConfig.prototype.cancelScene = function() {
    SceneManager.pop();
   

};

Scene_InputConfig.prototype.selectCancel = function() {
    //SoundManager.playCancel();
    this._keyList.deselect();
    this._controllerList.deselect();
    this._keyList.deactivate();
    this._controllerList.deactivate();
    this._resetWindow.deselect();
    this._resetWindow.deactivate();
    //--------------------------------
    this._confirmWindow.activate();
    this._confirmWindow.select(1);
};

Scene_InputConfig.prototype.processKeyboardInput = function(keycode){
    this._timeoutCounterOn = false;
    SoundManager.playOk();
    Nowis337_InputConfig.removeListenEvent();
    if(this._pendingBoundKeyCode !== keycode){ // new keycoode is not the same as previous
        // swap previous
        let replacedsymbol = Nowis337_InputConfig.findKeySymbol(keycode);
        if(replacedsymbol){
            Nowis337_InputConfig.dummyCurrentKeyboardInput[this._pendingBoundKeyCode] = replacedsymbol; //swapped
        } else {
            delete Nowis337_InputConfig.dummyCurrentKeyboardInput[this._pendingBoundKeyCode]; // erase
        }
        // apply new key
        Nowis337_InputConfig.dummyCurrentKeyboardInput[keycode] = this._pendingKeySymbol;
        this._changeMade = true;
        this._confirmWindow.refresh();
    };
    this._popupWindow.close();
    this.setInputDelay();
    Input.clear();
    this._controllerList.deactivate();
    this._keyList.activate();
    this._keyList.refresh();
  
    };

Scene_InputConfig.prototype.listenForControllerInput = function() {
    if(this._inputDelay > 0) return;
    //if(!this._popupWindow.isOpen()) return;

    if(Input.isTriggered("0")){ // A
        this.processControllerInput(0);

    } else if (Input.isTriggered("1")){ //B
        this.processControllerInput(1);

    } else if (Input.isTriggered("2")){ //X
        this.processControllerInput(2);

    } else if (Input.isTriggered("3")){ //Y
        this.processControllerInput(3);

    } else if (Input.isTriggered("4")){ //LB
        this.processControllerInput(4);

    } else if (Input.isTriggered("5")){ //RB
        this.processControllerInput(5);

    } else if (Input.isTriggered("6")){ //LB
        this.processControllerInput(6);

    } else if (Input.isTriggered("7")){ // RB
        this.processControllerInput(7);

    } else if (Input.isTriggered("8")){ // Back
        this.processControllerInput(8); 

    } else if (Input.isTriggered("9")){ // Start
        this.processControllerInput(9);

    } else if (Input.isTriggered("10")){ // Left Stick
        this.processControllerInput(10);

    } else if (Input.isTriggered("11")){ // Right Stick
        this.processControllerInput(11);

    } else if (Input.isTriggered("12")){ // Dpad Up
        this.processControllerInput(12); 

    } else if (Input.isTriggered("13")){ // Dpad Down
        this.processControllerInput(13); 

    } else if (Input.isTriggered("14")){ // Dpad Left
        this.processControllerInput(14);

    } else if (Input.isTriggered("15")){ // Dpad Right
        this.processControllerInput(15);

    } else if(Input.isTriggered("escape") || Input.isTriggered("cancel")){
        this._timeoutCounterOn = false;
        this.setInputDelay();
        SoundManager.playCancel();
        Nowis337_InputConfig.restorePendingControllerInput();
        this._listeningMode = false;
        Input.clear();
        this._popupWindow.close();
        this._keyList.deactivate();
        this._controllerList.activate();
        this._controllerList.refresh();
    
    };

};    

Scene_InputConfig.prototype.processControllerInput = function(keycode) {
    this._timeoutCounterOn = false;
    SoundManager.playOk();
    Nowis337_InputConfig.restorePendingControllerInput();

    if(this._pendingBoundControllerCode !== keycode){
        // swap previous
        let replacedsymbol = Nowis337_InputConfig.findControllerKeySymbol(keycode);
        if(replacedsymbol){
            Nowis337_InputConfig.dummyCurrentControllerInput[this._pendingBoundControllerCode] = replacedsymbol; //swapped
        } else {
            delete Nowis337_InputConfig.dummyCurrentControllerInput[this._pendingBoundControllerCode]; // erase
        }
        // apply new key
        Nowis337_InputConfig.dummyCurrentControllerInput[keycode] = this._pendingKeySymbol;
        this._changeMade = true;
        this._confirmWindow.refresh();


    };

    this.setInputDelay();
    this._listeningMode = false;
    Input.clear();
    this._popupWindow.close();
    this._keyList.deactivate();
    this._controllerList.activate();
    this._controllerList.refresh();
};

Scene_InputConfig.prototype.updatePopupText = function(number) {
    this._popupWindow.contents.clear();

    let text;
    if(number == 1){
        text = Nowis337_InputConfig._text1;
    } else {
        text = Nowis337_InputConfig._text2;
    };
    let rect = this._popupWindow.baseTextRect();
    this._popupWindow.drawText(text, rect.x, rect.y, rect.width, "center");

};

Scene_InputConfig.prototype.processTimeOut = function() {
    this._timeoutCounterOn = false;
    if(this._selectMode == "controller"){
        this.setInputDelay();
        SoundManager.playCancel();
        Nowis337_InputConfig.restorePendingControllerInput();
        this._listeningMode = false;
        Input.clear();
        this._popupWindow.close();
        this._controllerList.activate();
        this._keyList.deactivate();
        this._controllerList.refresh();

    } else {
        Nowis337_InputConfig.removeListenEvent();
        this._popupWindow.close();
        this.setInputDelay();
        Input.clear();
        this._keyList.activate();
        this._controllerList.deactivate();
        this._keyList.refresh();

        
    };

};




//=================== Window_ControllerList =============================
function Window_ControllerList() {
    this.initialize(...arguments);
}

Window_ControllerList.prototype = Object.create(Window_Selectable.prototype);
Window_ControllerList.prototype.constructor = Window_ControllerList;

Window_ControllerList.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this._data = Nowis337_InputConfig.finalData;
    this._keyList = null;

};

Window_ControllerList.prototype.maxItems = function() {
    return Nowis337_InputConfig.finalData.length;
    
};

Window_ControllerList.prototype.drawItem = function(index) {
    const rect = this.itemRect(index);
    let keycode = Nowis337_InputConfig.currentBindedControllerKey(this._data[index].inputKey);
    let text = Nowis337_InputConfig.findControllerKeyDisplay(keycode);
    this.drawText(text, rect.x, rect.y, rect.width, "center");
};

Window_ControllerList.prototype.refresh = function() {
    this.paint();
};

Window_ControllerList.prototype.select = function(index) {
    Window_Selectable.prototype.select.call(this, index);
    if(this.active && this._keyList){
        if(this.index() !== this._keyList.index()){
            this._keyList.smoothSelect(index)
        };
    };

    if(this.active && this._labelList){
        if(this.index() !== this._labelList.index()){
            this._labelList.smoothSelect(index)
        };
    };

};

Window_ControllerList.prototype.cursorLeft = function(wrap) {
    if(SceneManager._scene._inputDelay > 0) return;
    if (this._keyList){
        this.deactivate();
        this.playCursorSound();
        SceneManager._scene.setInputDelay();
        SceneManager._scene._selectMode = "keyboard";
        this.refreshCursor();
        this._keyList.activate();

    } else {
        Window_Selectable.prototype.cursorLeft.call(this,wrap);
    };

};

Window_ControllerList.prototype.cursorRight = function(wrap) {
    if(SceneManager._scene._inputDelay > 0) return;
    if (this._keyList){
        this.deactivate();
        this.playCursorSound();
        SceneManager._scene.setInputDelay();
        SceneManager._scene._selectMode = "keyboard";
        this.refreshCursor();
        this._keyList.activate();
    } else {
        Window_Selectable.prototype.cursorRight.call(this,wrap);
    };

};

Window_ControllerList.prototype.cursorDown = function(wrap) {
    if(SceneManager._scene._inputDelay > 0) return;
    if(this.index() == this.maxItems()-1 && this._resetWindow){
        //this.playCursorSound();
        SceneManager._scene.setInputDelay();
        Input.clear();
        this.deactivate();
        this.deselect();
        if(this._keyList) this._keyList.deselect();

        this._resetWindow.activate();
        this._resetWindow.select(1);

    } else {
        Window_Selectable.prototype.cursorDown.call(this,wrap);

    };
};

Window_ControllerList.prototype.cursorUp = function(wrap) {
    if(SceneManager._scene._inputDelay > 0) return;
    if(this._confirmWindow && this.index() == 0){
        //this.playCursorSound();
        SceneManager._scene.setInputDelay();
        Input.clear();
        this.deactivate();
        this.deselect();
        this._keyList.deselect();
        this._confirmWindow.activate();
        this._confirmWindow.select(1);


    } else {
        Window_Selectable.prototype.cursorUp.call(this,wrap);

    };
   

};
Window_ControllerList.prototype.processTouch = function() {
    return;
};


Window_ControllerList.prototype.processHandling = function() {
    if(SceneManager._scene._inputDelay > 0) return;
    return Window_Selectable.prototype.processHandling.call(this);
};


Window_ControllerList.prototype.refreshCursor = function() {
    if(!this.active && SceneManager._scene._selectMode !== "controller"){
        this.setCursorRect(0, 0, 0, 0);
    } else {
        if (this._cursorAll) {
            this.refreshCursorForAll();
        } else if (this.index() >= 0) {
            const rect = this.itemRect(this.index());
            this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
        } else {
            this.setCursorRect(0, 0, 0, 0);
        }
    }

};

Window_ControllerList.prototype.cursorPagedown = function() {

};

Window_ControllerList.prototype.cursorPageup = function() {

};










//=================== Window_KeyList =============================
function Window_KeyList() {
    this.initialize(...arguments);
}

Window_KeyList.prototype = Object.create(Window_ControllerList.prototype);
Window_KeyList.prototype.constructor = Window_KeyList;

Window_KeyList.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this._data = Nowis337_InputConfig.finalData;
    this._controllerList = null;

};

Window_KeyList.prototype.itemWidth = function() {
    //return Math.floor(this.innerWidth / 2);
    return Math.floor(this.innerWidth);

};

Window_KeyList.prototype.itemRect = function(index) {
    const maxCols = this.maxCols();
    const itemWidth = this.itemWidth();
    const itemHeight = this.itemHeight();
    const colSpacing = this.colSpacing();
    const rowSpacing = this.rowSpacing();
    const col = index % maxCols;
    const row = Math.floor(index / maxCols);
    const x = (col) * itemWidth + colSpacing / 2 - this.scrollBaseX(); /////
    const y = row * itemHeight + rowSpacing / 2 - this.scrollBaseY();
    const width = itemWidth - colSpacing;
    const height = itemHeight - rowSpacing;
    return new Rectangle(x, y, width, height);
};

Window_KeyList.prototype.drawItem = function(index) {
    const rect = this.itemRect(index);
    let label = this._data[index].keyName;
    let keycode = Nowis337_InputConfig.currentBindedKey(this._data[index].inputKey);
    let text = Nowis337_InputConfig.findKeyLabelDisplay(keycode);

    this.drawText(text,rect.x, rect.y, rect.width, "center");
    //this.drawText(label, rect.x - rect.width - this.colSpacing() , rect.y, rect.width, "right");



};

Window_KeyList.prototype.refresh = function() {
    this.paint();
};

Window_KeyList.prototype.select = function(index) {
    Window_Selectable.prototype.select.call(this, index);
    if(this.active && this._controllerList){
        if(this.index() !== this._controllerList.index()){
            this._controllerList.smoothSelect(index)
        };
    };

    if(this.active && this._labelList){
        if(this.index() !== this._labelList.index()){
            this._labelList.smoothSelect(index)
        };
    };

};

Window_KeyList.prototype.cursorLeft = function(wrap) {
    if(SceneManager._scene._inputDelay > 0) return;
    if (this._controllerList){
        this.deactivate();
        this.playCursorSound();
        SceneManager._scene.setInputDelay();
        Input.clear();
        SceneManager._scene._selectMode = "controller";
        this.refreshCursor();
        this._controllerList.activate();

    } else {
        Window_Selectable.prototype.cursorLeft.call(this,wrap);
    };

};

Window_KeyList.prototype.cursorRight = function(wrap) {
    if(SceneManager._scene._inputDelay > 0) return;
    if (this._controllerList){
        this.deactivate();
        this.playCursorSound();
        SceneManager._scene.setInputDelay();
        Input.clear();
        SceneManager._scene._selectMode = "controller";
        this.refreshCursor();
        this._controllerList.activate();

    } else {
        Window_Selectable.prototype.cursorRight.call(this,wrap);
    };

};

Window_KeyList.prototype.cursorDown = function(wrap) {
    if(SceneManager._scene._inputDelay > 0) return;
    if(this.index() == this.maxItems()-1 && this._resetWindow){
        //this.playCursorSound();
        SceneManager._scene.setInputDelay();
        Input.clear();
        this.deactivate();
        this.deselect();
        if(this._controllerList) this._controllerList.deselect();

        this._resetWindow.activate();
        this._resetWindow.select(0);

    } else {
        Window_Selectable.prototype.cursorDown.call(this,wrap);

    };
   

};

Window_KeyList.prototype.cursorUp = function(wrap) {
    if(SceneManager._scene._inputDelay > 0) return;
    if(this._confirmWindow && this.index() == 0){
        //this.playCursorSound();
        SceneManager._scene.setInputDelay();
        Input.clear();
        this.deactivate();
        this.deselect();
        this._controllerList.deselect();
        this._confirmWindow.activate();
        this._confirmWindow.select(0);


    } else {
        Window_Selectable.prototype.cursorUp.call(this,wrap);

    };
   

};


Window_KeyList.prototype.refreshCursor = function() {
    if(!this.active && SceneManager._scene._selectMode !== "keyboard"){
        this.setCursorRect(0, 0, 0, 0);
    } else {
        if (this._cursorAll) {
            this.refreshCursorForAll();
        } else if (this.index() >= 0) {
            const rect = this.itemRect(this.index());
            this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
        } else {
            this.setCursorRect(0, 0, 0, 0);
        }
    }

};




//=================== Window_LabelList =============================
function Window_LabelList() {
    this.initialize(...arguments);
}

Window_LabelList.prototype = Object.create(Window_ControllerList.prototype);
Window_LabelList.prototype.constructor = Window_LabelList;

Window_LabelList.prototype.initialize = function(rect) {
    Window_ControllerList.prototype.initialize.call(this, rect);
    this._data = Nowis337_InputConfig.finalData;
};

Window_LabelList.prototype.drawItem = function(index) {
    const rect = this.itemRect(index);
    let label = this._data[index].keyName;
    this.drawText(label, rect.x - this.colSpacing() , rect.y, rect.width, "right");
};

Window_LabelList.prototype.refreshCursor = function() {
    this.setCursorRect(0, 0, 0, 0);

};

Window_LabelList.prototype.updateArrows = function() {
    this.downArrowVisible = false;
    this.upArrowVisible = false;
};


//=================== Window_ResetWindow =============================
function Window_ResetWindow() {
    this.initialize(...arguments);
}

Window_ResetWindow.prototype = Object.create(Window_Selectable.prototype);
Window_ResetWindow.prototype.constructor = Window_ResetWindow;

Window_ResetWindow.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);

};

Window_ResetWindow.prototype.maxItems = function() {
    return 2;
    
};

Window_ResetWindow.prototype.maxCols = function() {
    return 2;
};


Window_ResetWindow.prototype.itemWidth = function() {
    return Math.floor(this.innerWidth / 3);

};

Window_ResetWindow.prototype.itemRect = function(index) {
    const maxCols = this.maxCols();
    const itemWidth = this.itemWidth();
    const itemHeight = this.itemHeight();
    const colSpacing = this.colSpacing();
    const rowSpacing = this.rowSpacing();
    const col = index % maxCols;
    const row = Math.floor(index / maxCols);
    //const x = this.width - itemWidth - this._padding - colSpacing;
    const x = (col+1) * itemWidth + colSpacing / 2 - this.scrollBaseX();
    const y = row * itemHeight + rowSpacing / 2 - this.scrollBaseY();
    const width = itemWidth - colSpacing;
    const height = itemHeight - rowSpacing;
    return new Rectangle(x, y, width, height);
};

Window_ResetWindow.prototype.drawItem = function(index) {
    const rect = this.itemRect(index);
    let text;
    switch(index){
        case 0: text = Nowis337_InputConfig._label1; break;
        case 1: text = Nowis337_InputConfig._label2; break;
    }
    this.drawText(text,rect.x, rect.y, rect.width, "center")

};

Window_ResetWindow.prototype.cursorDown = function(wrap) {
    if(SceneManager._scene._inputDelay > 0) return;
    if(this._confirmWindow){
        //this.playCursorSound();
        SceneManager._scene.setInputDelay();
        Input.clear();
         this._confirmWindow.activate();
        this._confirmWindow.select(this.index());
        this.deactivate();
        this.deselect();

    } else {
        Window_Selectable.prototype.cursorDown.call(this,wrap);

    };
   

};

Window_ResetWindow.prototype.cursorUp = function(wrap) {
    if(SceneManager._scene._inputDelay > 0) return;
    if(this._keyList && this._controllerList){
        //this.playCursorSound();
        SceneManager._scene.setInputDelay();
        Input.clear();
        if(this.index() == 0){
            this._keyList.activate();
            SceneManager._scene._selectMode = "keyboard";

            this._keyList.smoothSelect(this._keyList.maxItems()-1);
        } else {
            this._controllerList.activate();
            SceneManager._scene._selectMode = "controller";
            this._controllerList.smoothSelect(this._controllerList.maxItems()-1);
        };
        this.deactivate();
        this.deselect();

    } else {
        Window_Selectable.prototype.cursorUp.call(this,wrap);

    };
   

};
Window_ResetWindow.prototype.processTouch = function() {
    return;
};


Window_ResetWindow.prototype.processHandling = function() { 
    if(SceneManager._scene._inputDelay > 0) return;
    return Window_Selectable.prototype.processHandling.call(this);
};

//=================== Window_InputConfirmWindow =============================
function Window_InputConfirmWindow() {
    this.initialize(...arguments);
}

Window_InputConfirmWindow.prototype = Object.create(Window_Selectable.prototype);
Window_InputConfirmWindow.prototype.constructor = Window_InputConfirmWindow;

Window_InputConfirmWindow.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);

};

Window_InputConfirmWindow.prototype.maxItems = function() {
    return 2;
    
};

Window_InputConfirmWindow.prototype.maxCols = function() {
    return 2;
};


Window_InputConfirmWindow.prototype.itemWidth = function() {
    return Math.floor(this.innerWidth / 3);

};

Window_InputConfirmWindow.prototype.itemRect = function(index) {
    const maxCols = this.maxCols();
    const itemWidth = this.itemWidth();
    const itemHeight = this.itemHeight();
    const colSpacing = this.colSpacing();
    const rowSpacing = this.rowSpacing();
    const col = index % maxCols;
    const row = Math.floor(index / maxCols);
    //const x = this.width - itemWidth - this._padding - colSpacing;
    const x = (col+1) * itemWidth + colSpacing / 2 - this.scrollBaseX();
    const y = row * itemHeight + rowSpacing / 2 - this.scrollBaseY();
    const width = itemWidth - colSpacing;
    const height = itemHeight - rowSpacing;
    return new Rectangle(x, y, width, height);
};

Window_InputConfirmWindow.prototype.drawItem = function(index) {
    const rect = this.itemRect(index);
    let text = "";
    switch(index){
        case 0: text = Nowis337_InputConfig._label3; break;
        case 1: text = Nowis337_InputConfig._label4; break;
    };
    this.drawText(text, rect.x, rect.y, rect.width, "center")

};

Window_InputConfirmWindow.prototype.cursorDown = function(wrap) {
    if(SceneManager._scene._inputDelay > 0) return;
    if(this._keyList && this._controllerList){
        //this.playCursorSound();
        SceneManager._scene.setInputDelay();
        Input.clear();
        if(this.index() == 0){
            this._keyList.activate();
            SceneManager._scene._selectMode = "keyboard";
            this._keyList.smoothSelect(0);
        } else {
            this._controllerList.activate();
            SceneManager._scene._selectMode = "controller";
            this._controllerList.smoothSelect(0);
        };
        this.deactivate();
        this.deselect();

    } else {
        Window_Selectable.prototype.cursorDown.call(this,wrap);

    };
   

};

Window_InputConfirmWindow.prototype.cursorUp = function(wrap) {
    if(SceneManager._scene._inputDelay > 0) return;
    if(this._resetWindow){
        //this.playCursorSound();
        SceneManager._scene.setInputDelay();
        Input.clear();
        this._resetWindow.activate();
        this._resetWindow.select(this.index());
        this.deactivate();
        this.deselect();

    } else {
        Window_Selectable.prototype.cursorUp.call(this,wrap);

    };
   

};

Window_InputConfirmWindow.prototype.processTouch = function() {
    return;
};

Window_InputConfirmWindow.prototype.processHandling = function() { 
    if(SceneManager._scene._inputDelay > 0) return;
    return Window_Selectable.prototype.processHandling.call(this);
};



// APPENDIX
//================================
Nowis337_InputConfig.keyLookUp = 
[
// Do not edit these
{name:"Space", code: 32},
{name:"Enter", code: 13},
{name:"Backspace", code: 8},
{name:"Shift", code: 16},
{name:"Ctrl", code: 17},
{name:"Alt", code: 18},
{name:"Esc", code: 27},
{name:"Tab", code: 9},
{name:"Del", code: 46},
{name:"Ins", code: 45},
{name:"Home", code: 36},
{name:"End", code: 35},
{name:"PgUp", code: 33},
{name:"PgDn", code: 34},
{name:"Capslock", code: 20},
{name:"NumLock", code: 144},
{name:"Up", code: 38},
{name:"Down", code: 40},
{name:"Left", code: 37},
{name:"Right", code: 39},
{name:"Num1", code: 97},
{name:"Num2", code: 98},
{name:"Num3", code: 99},
{name:"Num4", code: 100},
{name:"Num5", code: 101},
{name:"Num6", code: 102},
{name:"Num7", code: 103},
{name:"Num8", code: 104},
{name:"Num9", code: 105},
{name:"Num0", code: 96},
{name:"NumPeriod", code: 110},
{name:"NumDivide", code: 111},

{name:"`", code: 192},
{name:"1", code: 49},
{name:"2", code: 50},
{name:"3", code: 51},
{name:"4", code: 52},
{name:"5", code: 53},
{name:"6", code: 54},
{name:"7", code: 55},
{name:"8", code: 56},
{name:"9", code: 57},
{name:"0", code: 48},
{name:"-", code: 189},
{name:"=", code: 187},
{name:"*", code: 106},
{name:"-", code: 109},
{name:"+", code: 107},

{name:"Q", code: 81},
{name:"W", code: 87},
{name:"E", code: 69},
{name:"R", code: 82},
{name:"T", code: 84},
{name:"Y", code: 89},
{name:"U", code: 85},
{name:"I", code: 73},
{name:"O", code: 79},
{name:"P", code: 80},
{name:"[", code: 219},
{name:"]", code: 221},
{name:"\\", code: 220},
{name:"A", code: 65},
{name:"S", code: 83},
{name:"D", code: 68},
{name:"F", code: 70},
{name:"G", code: 71},
{name:"H", code: 72},
{name:"J", code: 74},
{name:"K", code: 75},
{name:"L", code: 76},
{name:";", code: 186},
{name:"'", code: 222},
{name:"Z", code: 90},
{name:"X", code: 88},
{name:"C", code: 67},
{name:"V", code: 86},
{name:"B", code: 66},
{name:"N", code: 78},
{name:"M", code: 77},
{name:",", code: 188},
{name:".", code: 190},
{name:"/", code: 191}

];




// ================================================
// KEYBOARD KEY LABELS
// You can edit the name of these below
// ================================================
Nowis337_InputConfig.keyLabelDisplay = 
[

{name:"Space", code: 32},
{name:"Enter", code: 13},
{name:"Backspace", code: 8},
{name:"Shift", code: 16},
{name:"Ctrl", code: 17},
{name:"Alt", code: 18},
{name:"Esc", code: 27},
{name:"Tab", code: 9},
{name:"Del", code: 46},
{name:"Ins", code: 45},
{name:"Home", code: 36},
{name:"End", code: 35},
{name:"PgUp", code: 33},
{name:"PgDn", code: 34},
{name:"Capslock", code: 20},
{name:"NumLock", code: 144},
{name:"Up", code: 38},
{name:"Down", code: 40},
{name:"Left", code: 37},
{name:"Right", code: 39},
{name:"Num1", code: 97},
{name:"Num2", code: 98},
{name:"Num3", code: 99},
{name:"Num4", code: 100},
{name:"Num5", code: 101},
{name:"Num6", code: 102},
{name:"Num7", code: 103},
{name:"Num8", code: 104},
{name:"Num9", code: 105},
{name:"Num0", code: 96},
{name:"NumPeriod", code: 110},
{name:"NumDivide", code: 111},

{name:"`", code: 192},
{name:"1", code: 49},
{name:"2", code: 50},
{name:"3", code: 51},
{name:"4", code: 52},
{name:"5", code: 53},
{name:"6", code: 54},
{name:"7", code: 55},
{name:"8", code: 56},
{name:"9", code: 57},
{name:"0", code: 48},
{name:"-", code: 189},
{name:"=", code: 187},
{name:"*", code: 106},
{name:"-", code: 109},
{name:"+", code: 107},

{name:"Q", code: 81},
{name:"W", code: 87},
{name:"E", code: 69},
{name:"R", code: 82},
{name:"T", code: 84},
{name:"Y", code: 89},
{name:"U", code: 85},
{name:"I", code: 73},
{name:"O", code: 79},
{name:"P", code: 80},
{name:"[", code: 219},
{name:"]", code: 221},
{name:"\\", code: 220},
{name:"A", code: 65},
{name:"S", code: 83},
{name:"D", code: 68},
{name:"F", code: 70},
{name:"G", code: 71},
{name:"H", code: 72},
{name:"J", code: 74},
{name:"K", code: 75},
{name:"L", code: 76},
{name:";", code: 186},
{name:"'", code: 222},
{name:"Z", code: 90},
{name:"X", code: 88},
{name:"C", code: 67},
{name:"V", code: 86},
{name:"B", code: 66},
{name:"N", code: 78},
{name:"M", code: 77},
{name:",", code: 188},
{name:".", code: 190},
{name:"/", code: 191}

];