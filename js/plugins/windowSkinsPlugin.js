//=============================================================================
// RPG Maker MZ - Advanced Windowskin
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Changes the back sprite of the windowskin so that it's sliced up
 * the same way that windowskin frames are. Allows for a 24px wide frame area by default.
 * Overwrites some Window functions, BREAKS tiling patterns, and can make standard windowskins look weird, so use w/care.
 * @author noctiluca
 *
 * @help AdvancedWindowskin.js
 *
 */

Window.prototype._createBackSprite = function() {
    this._backSprite = new Sprite();
    for (let i = 0; i < 9; i++) {
        this._backSprite.addChild(new Sprite());
    }
    // this._backSprite.addChild(new TilingSprite());
    this._container.addChild(this._backSprite);
};

Window.prototype._refreshBack = function() {
    const drect = { x: 0, y: 0, width: this._width, height: this._height };
    const srect = { x: 0, y: 0, width: 96, height: 96};
    const m = 24;
    for (const child of this._backSprite.children) {
        child.bitmap = this._windowskin;
    }
    this._setRectPartsGeometry(this._backSprite, srect, drect, m);
    // const m = this._margin;
    // const w = Math.max(0, this._width - m * 2);
    // const h = Math.max(0, this._height - m * 2);
     const sprite = this._backSprite;
    // const tilingSprite = sprite.children[0];
    // [Note] We use 95 instead of 96 here to avoid blurring edges.
    // sprite.bitmap = this._windowskin;
    // sprite.setFrame(0, 0, 95, 95);
    // sprite.move(m, m);
    // sprite.scale.x = w / 95;
    // sprite.scale.y = h / 95;
    // tilingSprite.bitmap = this._windowskin;
    // tilingSprite.setFrame(0, 96, 96, 96);
    // tilingSprite.move(0, 0, w, h);
    // tilingSprite.scale.x = 96 / w;
    // tilingSprite.scale.y = 96 / h;
     sprite.setColorTone(this._colorTone);
};