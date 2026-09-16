(() => {
    const _TouchInput_onTouchStart = TouchInput._onTouchStart;
    TouchInput._onTouchStart = function(event) {
        event.changedTouches.forEach(touch => {
            this._onTouchStartAdjusted(touch);
        });
    };

    TouchInput._onTouchStartAdjusted = function(touch) {
        const x = Graphics.pageToCanvasX(touch.pageX);
        const y = Graphics.pageToCanvasY(touch.pageY);
        if (Graphics.isInsideCanvas(x, y)) {
            this._onTrigger(x, y);
        }
    };
})();
