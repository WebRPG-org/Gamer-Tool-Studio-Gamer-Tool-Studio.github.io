// ==================================================
// Cae_FaceOnRight.js
// ==================================================

/**
 * @file Cae_FaceOnRight.js (RMMZ)
 * Show Text face image can now be displayed on the right and/or flipped.
 * @author Caethyril
 * @version 1.1
 */

//#region Plugin header
/*:
 * @target MZ
 * @plugindesc v1.1 - Force the Show Text face to left/right and/or mirror it.
 * @author Caethyril
 * @url https://forums.rpgmakerweb.com/index.php?threads/caethyrils-mz-plugins.125657/
 * 
 * @help Features:
 *   Display the face image on the left or right of the message window.
 *   Choose a "mirror rule": determines when the face image gets mirrored.
 *   Use plugin commands to change the face position or mirror rule mid-game!
 * 
 * Plugin Commands:
 *   Set Face Position - show the message face on left or right
 *   Set Mirror Rule   - choose when the face should be mirrored
 * 
 * Text Codes (used in Show Text):
 *   \FacePos[x] - change the face position to x, where x is one of:
 *      - Left
 *      - Right
 *      - Toggle
 *      - Default
 *   \FaceMirror[x] - change the face mirror rule to x, where x is one of:
 *      - Left
 *      - Right
 *      - Always
 *      - Never
 *      - Default
 * 
 *   These text codes are case-insensitive.
 *   Using either text code will clear the message.
 * 
 * Word-wrap:
 *   There may be conflicts with word-wrap features from other plugins.
 *
 *  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Terms of use:
 *   This plugin is free to use and/or modify, under these conditions:
 *     - None of the original plugin header is removed.
 *     - Credit is given to Caethyril for the original work.
 * 
 *  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Compatibility:
 *   Aliases:   Window_Message:
 *                processEscapeCharacter, drawMessageFace, newLineX
 *              Window_NameBox:
 *                updatePlacement
 *   Defines:   Window_Base:
 *                drawFaceMirrorX
 *   This plugin does not add data to save files.
 * 
 *  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Changelog:
 *   v1.1 (2020-08-22): Added optional name box support (match face position).
 *                      Fixed mirror state not updating in some situations.
 *   v1.0 (2020-08-21): Initial release! Rewrite of RMMV version.
 * 
 * @command Set Face Position
 * @desc Set the message face to appear on the right or left.
 * 
 * @arg Position
 * @type combo
 * @option Left
 * @option Right
 * @option Toggle
 * @option Default
 * @desc Pick where to display the face!
 * @default Left
 * 
 * @command Set Mirror Rule
 * @desc Set the rule that determines when the face image gets mirrored horizontally.
 * 
 * @arg Rule
 * @type combo
 * @option Right
 * @option Left
 * @option Always
 * @option Never
 * @option Default
 * @desc When to horizontally mirror the face image.
 * @default Never
 * 
 * @param Default Position
 * @type combo
 * @option Left
 * @option Right
 * @desc Default face position in messages.
 * @default Left
 * 
 * @param Default Mirror Rule
 * @type combo
 * @option Left
 * @option Right
 * @option Always
 * @option Never
 * @desc Default rule determining when the message face gets horizontally mirrored.
 * @default Never
 * 
 * @param Reposition Name Box
 * @type boolean
 * @desc If true, the name box will appear on the same side as the face image.
 * @default true
 * 
 * @param --- Advanced ---
 * @type select
 * @desc Advanced internal configuration options.
 * 
 * @param Text Code: Position
 * @parent --- Advanced ---
 * @type string
 * @desc The key of the text code used to set face position in a message.
 * @default FacePos
 * 
 * @param Text Code: Mirror
 * @parent --- Advanced ---
 * @type string
 * @desc The key of the text code used to set the face mirror rule in a message.
 * @default FaceMirror
 */
//#endregion

(function() {
'use strict';

    const NAMESPACE   = 'FaceOnRight';
    const PLUGIN_NAME = 'Cae_' + NAMESPACE;
    const ERR_PRE     = PLUGIN_NAME + '.js ';
    const ERR_NOPARAM = ERR_PRE + 'could not find its parameters!\nCheck the plugin file is named correctly and try again.';
    const ERR_WATRULE = ERR_PRE + 'unrecognised face mirror rule "%1".';

    window.CAE = window.CAE || {};      // Author namespace

    (($, U) => {

        const KEY_PDRAW = 'MIRROR_NAME_DRAW';
        if (!$[KEY_PDRAW]) Object.defineProperty($, KEY_PDRAW, { value: 'drawFaceMirrorX' });   // allow preconfig

        Object.defineProperty($, 'VERSION', { value: 1.1 });    // Version declaration
        window.Imported = window.Imported || {};                // Import namespace
        Imported[PLUGIN_NAME] = $.VERSION;                      // Import declaration

    // ======== Parameter stuff ======== //

        $.params = PluginManager.parameters(PLUGIN_NAME);
        if (!$.params) { SceneManager.showDevTools(); throw new Error(ERR_NOPARAM); };

        $.nameBoxPos = $.params['Reposition Name Box'] === 'true';

        Object.defineProperty($, 'KEY_MIR', { value: '_rule' });
        Object.defineProperty($, 'mirrorXRule', {
            get: function( ) { return this[$.KEY_MIR] || ''; },
            set: function(v) {
                if (v && v !== this[$.KEY_MIR]) {
                    v = String(v).toLowerCase();
                    if (v === 'default') v = $.params['Default Mirror Rule'].toLowerCase();
                    this[$.KEY_MIR] = v;
                    this.updateMirrorX();
                }
            },
            configurable: true
        });

        $._togglePos = ['left','right'];    // Used for toggle option
        Object.defineProperty($, 'KEY_POS', { value: '_pos' });
        Object.defineProperty($, 'facePosX', {
            get: function( ) { return this[$.KEY_POS] || ''; },
            set: function(v) {
                if (v && v !== this[$.KEY_POS]) {
                    v = String(v).toLowerCase();
                    if (v === 'default') v = $.params['Default Position'].toLowerCase();
                    else if (v === 'toggle') {
                        const P = $._togglePos;
                        const n = 1 + P.indexOf(this[$.KEY_POS]);
                        v = n > 0 ? P[n % P.length] : this[$.KEY_POS];
                    }
                    this[$.KEY_POS] = v;
                }
            },
            configurable: true
        });

        Object.defineProperty($, 'TCK_POS', { value: String($.params['Text Code: Position'] || 'FacePos').toUpperCase() });
        Object.defineProperty($, 'TCK_MIR', { value: String($.params['Text Code: Mirror'] || 'FaceMirror').toUpperCase() });

    // ======== Utility (local) ======== //
    
        $.isFaceOnRight = function() { return $.facePosX === 'right'; };
        $.isFaceMirrorX = function() { return $.mirrorX; }
        $.checkMirrorRule = function() {
            switch ($.mirrorXRule) {
                case 'left':   return !$.isFaceOnRight();
                case 'right':  return $.isFaceOnRight();
                case 'always': return true;
                case 'never':  return false;
            }
            console.error(ERR_WATRULE.format($.mirrorXRule));
            return false;
        };

        $.pluginActive = function() { return $.isFaceMirrorX() || $.isFaceOnRight(); };

        $.updateMirrorX  = function()     { return $.mirrorX = $.checkMirrorRule(); };
        $.setFacePosX    = function(pos)  { $.facePosX = pos; $.updateMirrorX(); return true; };
        $.setMirrorXRule = function(rule) { $.mirrorXRule = rule; return true; };

        $.setMirrorXRule('default');
        $.setFacePosX('default');

        $.messageMargin = 4;    // cuz the base code ain't modular enough

        // Modularity! Use default right-to-left X if face on right
        $.drawMessageFaceParams = function(win) {
            const margin = $.messageMargin;
            let r = {};
            r.mirrorX = $.isFaceMirrorX();
            r.method = r.mirrorX ? $[KEY_PDRAW] : 'drawFace';
            r.faceName = $gameMessage.faceName();
            r.faceIndex = $gameMessage.faceIndex();
            r.rtl = $gameMessage.isRTL();
            r.width = ImageManager.faceWidth;
            r.height = win.innerHeight;
            r.x = (r.rtl || $.isFaceOnRight()) ? win.innerWidth - r.width - margin : margin;
            r.y = 0;
            return r;
        };

        /**
         * Special version of obtainEscapeParam to match string arguments.
         * @param {Object} textState - Tracks current text state for message
         * @returns {String} Escape sequence parameter.
         */
        $.obtainEscapeParam = function(textState) {
            const regExp = /^\[(.+?)\]/;
            const arr = regExp.exec(textState.text.slice(textState.index));
            if (arr) {
                textState.index += arr[0].length;
                return arr[1];
            }
            return "";
        };

    // ======== Plugin Commands ======== //

        $.com = {
            setPosition:   function(o) { return $.setFacePosX(o.Position); },
            setMirrorRule: function(o) { return $.setMirrorXRule(o.Rule); }
        };
        PluginManager.registerCommand(PLUGIN_NAME, 'Set Face Position', $.com.setPosition);
        PluginManager.registerCommand(PLUGIN_NAME, 'Set Mirror Rule', $.com.setMirrorRule);

    // ============ Extends ============ //

        /**
         * Draws face mirrored in x-axis.
         * A slightly edited copy of the default drawFace method.
         * @param {String} faceName - Name of source face image
         * @param {Number} faceIndex - Face index in the source image
         * @param {Number} x - Destination x (px)
         * @param {Number} y - Destination y (px)
         * @param {Number} width - Source face width
         * @param {Number} height - Source face height
         */
        Window_Base.prototype[$[KEY_PDRAW]] = function(faceName, faceIndex, x, y, width = ImageManager.faceWidth, height = ImageManager.faceHeight) {
            const bitmap = ImageManager.loadFace(faceName);
            const pw = ImageManager.faceWidth;
            const ph = ImageManager.faceHeight;
            const sw = Math.min(width, pw);
            const sh = Math.min(height, ph);
            const dx = Math.floor(x + Math.max(width - pw, 0) / 2);
            const dy = Math.floor(y + Math.max(height - ph, 0) / 2);
            const sx = (faceIndex % 4) * pw + (pw - sw) / 2;
            const sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
            const ctx = this.contents._context;
            ctx.save();
            ctx.scale(-1, 1);
            this.contents.blt(bitmap, sx, sy, sw, sh, -dx - sw, dy);
            ctx.restore();
        };

    // ========== Alterations ========== //

        $.alias = $.alias || {};        // This plugin's alias namespace

        // Alias! Message escape sequences~
        void (alias => {
            Window_Message.prototype.processEscapeCharacter = function(code, textState) {
                let shouldRefresh = false;
                switch (String(code || '').toUpperCase()) {
                    case $.TCK_POS:
                        if ($.setFacePosX($.obtainEscapeParam(textState))) shouldRefresh = true;
                        break;
                    case $.TCK_MIR:
                        if ($.setMirrorXRule($.obtainEscapeParam(textState))) shouldRefresh = true;
                        break;
                    default:
                        alias.apply(this, arguments);
                }
                if (shouldRefresh) {
                    textState.startX = this.newLineX(textState);
                    this.newPage(textState);
                    this._nameBoxWindow.updatePlacement();
                }
            };
        })($.alias.Window_Messgae_processEscapeCharacter = Window_Message.prototype.processEscapeCharacter);
        
        // Alias! Check for position change or X-mirror when drawing face.
        void (alias => {
            Window_Message.prototype.drawMessageFace = function() {
                if ($.pluginActive()) {
                    const p = $.drawMessageFaceParams(this);
                    this[p.method](p.faceName, p.faceIndex, p.x, p.y, p.width, p.height);
                } else alias.apply(this, arguments);
            };
        })($.alias.Window_Message_drawMessageFace = Window_Message.prototype.drawMessageFace);

        // Alias! Remove text indent for non-RTL text if face is being shown on the right.
        void (alias => {
            Window_Message.prototype.newLineX = function(textState) {
                const dFault = alias.apply(this, arguments);
                return $.isFaceOnRight() ? (textState.rtl ? this.innerWidth - dFault : $.messageMargin) : dFault;
                // because default = RTL ? this.innerWidth - margin : margin;
            };
        })($.alias.Window_Message_newLineX = Window_Message.prototype.newLineX);

        // Alias! Change the name box position if appropriate.
        void (alias => {
            Window_NameBox.prototype.updatePlacement = function() {
                alias.apply(this, arguments);
                if ($.nameBoxPos && $.isFaceOnRight()) {
                    const msgWin = this._messageWindow;
                    this.x = msgWin.x + msgWin.width - this.width;
                }
            };
        })($.alias.Window_NameBox_updatePlacement = Window_NameBox.prototype.updatePlacement);

    })(CAE[NAMESPACE] = CAE[NAMESPACE] || {}, CAE.Utils = CAE.Utils || {});

})();