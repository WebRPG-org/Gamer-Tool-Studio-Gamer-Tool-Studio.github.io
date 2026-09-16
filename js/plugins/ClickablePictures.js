/*:
 * @target MZ
 * @plugindesc Allows pictures to be clickable and trigger common events.
 * @author Gamer Tool Studio
 *
 * @command SetClickablePicture
 * @text Set Clickable Picture
 * @desc Makes a specified picture clickable and triggers a common event when clicked.
 *
 * @arg pictureId
 * @type number
 * @text Picture ID
 * @desc The ID of the picture to be made clickable.
 *
 * @arg commonEventId
 * @type common_event
 * @text Common Event ID
 * @desc The ID of the common event to be called when the picture is clicked.
 *
 * @help ClickablePictures.js
 *
 * This plugin allows you to set pictures as clickable, triggering common events.
 * Use the Plugin Command "SetClickablePicture" to make a picture clickable.
 */

(() => {
    const pluginName = 'ClickablePictures';

    let clickablePictures = {};

    PluginManager.registerCommand(pluginName, "SetClickablePicture", args => {
        const pictureId = Number(args.pictureId);
        const commonEventId = Number(args.commonEventId);
        clickablePictures[pictureId] = commonEventId;
    });

    const _Spriteset_Base_update = Spriteset_Base.prototype.update;
    Spriteset_Base.prototype.update = function() {
        _Spriteset_Base_update.call(this);
        this.updateClickablePictures();
    };

    Spriteset_Base.prototype.updateClickablePictures = function() {
        for (const pictureId of Object.keys(clickablePictures)) {
            const sprite = this._pictureContainer.children.find(child => child._pictureId == pictureId);
            if (sprite) {
                if (sprite.isClickTriggered()) {
                    $gameTemp.reserveCommonEvent(clickablePictures[pictureId]);
                }
            }
        }
    };

    Sprite_Picture.prototype.isClickTriggered = function() {
		if (this.visible && this.opacity > 0 && TouchInput.isTriggered() && this.isTouchInsideFrame()) {
			TouchInput.clear(); 
			return true;
		}
		return false;
	};


    Sprite_Picture.prototype.isTouchInsideFrame = function() {
        const x = this.canvasToLocalX(TouchInput.x);
        const y = this.canvasToLocalY(TouchInput.y);
        return x >= 0 && y >= 0 && x < this.width && y < this.height;
    };

    Sprite_Picture.prototype.canvasToLocalX = function(x) {
		let node = this;
		while (node) {
			x -= node.x;
			node = node.parent;
		}
		return x;
	};

	Sprite_Picture.prototype.canvasToLocalY = function(y) {
		let node = this;
		while (node) {
			y -= node.y;
			node = node.parent;
		}
		return y;
	};
})();
