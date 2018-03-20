function Input() {
    throw new Error('This is a static class');
}

Input.initialize = function() {
    this.clear();
    this._setupEventHandlers();
};

Input.keyMapper = {
    9: 'tab',       // tab
    13: 'ok',       // enter
    16: 'shift',    // shift
    17: 'control',  // control
    18: 'control',  // alt
    27: 'escape',   // escape
    32: 'ok',       // space
    33: 'pageup',   // pageup
    34: 'pagedown', // pagedown
    37: 'left',     // left arrow
    65: 'left',     // A
    38: 'up',       // up arrow
    39: 'right',    // right arrow
    68: 'right',     // D
    40: 'down',     // down arrow
    45: 'escape',   // insert
    87: 'fire', // W
    88: 'escape',   // X
    90: 'ok',       // Z
    96: 'escape',   // numpad 0
    98: 'down',     // numpad 2
    100: 'left',    // numpad 4
    102: 'right',   // numpad 6
    104: 'up',      // numpad 8
    120: 'debug'    // F9
};
Input.clear = function() {
    this._currentState = {};
    this._touchPressed = 0;
};
Input.update = function() {
    this._pointerDown = this._pointerUp = false;
};

Input._setupEventHandlers = function() {
    this._setupKeyEventHandlers();
    this._setupMouseEventHandlers();
};
Input._setupKeyEventHandlers = function() {
    document.addEventListener('keydown', this._onKeyDown.bind(this));
    document.addEventListener('keyup', this._onKeyUp.bind(this));
};
Input._setupMouseEventHandlers = function() {
    document.addEventListener('mousedown', this._onMouseDown.bind(this));
    document.addEventListener('mousemove', this._onMouseMove.bind(this));
    document.addEventListener('mouseup', this._onMouseUp.bind(this));
    document.addEventListener('touchstart', this._onTouchStart.bind(this));
    document.addEventListener('touchmove', this._onTouchMove.bind(this));
    document.addEventListener('touchend', this._onTouchEnd.bind(this));
};
Input._onMouseDown = function(event) {
    this._pointerDown = true;
    this._x = event.pageX;
    this._y = event.pageY;
    this._touchPressed++;
};
Input._onMouseMove = function(event) {
    if (this._touchPressed) {
        this._x = event.pageX;
        this._y = event.pageY;
    }
};
Input._onMouseUp = function(event) {
    this._pointerUp = true;
    this._x = event.pageX;
    this._y = event.pageY;
    this._touchPressed--;
};
Input._onTouchStart = function(event) {
    this._pointerDown = true;
    this._x = event.touches[0].pageX;
    this._y = event.touches[0].pageY;
    this._touchPressed++;
};
Input._onTouchMove = function(event) {
    if (this._touchPressed) {
        this._x = event.touches[0].pageX;
        this._y = event.touches[0].pageY;
    }
};
Input._onTouchEnd = function(event) {
    this._pointerUp = true;
    this._x = event.touches[0] ? event.touches[0].pageX : 0;
    this._y = event.touches[0] ? event.touches[0].pageY : 0;
    this._touchPressed--;
};


Input.isPressed = function(keyName) {
    return !!this._currentState[keyName];
};

Input.isPointerDown = function() {
    return this._pointerDown;
};
Input.isPointerUp = function() {
    return this._pointerUp;
};
Input.isMousePressed = function() {
    return this._touchPressed;
};
Input.getMousePos = function() {
    return {x: this._x, y: this._y};
};

Input._onKeyDown = function(event) {
    var buttonName = this.keyMapper[event.keyCode];
    if (buttonName) {
        this._currentState[buttonName] = true;
    }
};
Input._onKeyUp = function(event) {
    var buttonName = this.keyMapper[event.keyCode];
    if (buttonName) {
        this._currentState[buttonName] = false;
    }
    if (event.keyCode === 0) {  // For QtWebEngine on OS X
        this.clear();
    }
};

Math.randomInt = function(max) {
    return Math.floor(max * Math.random());
};

