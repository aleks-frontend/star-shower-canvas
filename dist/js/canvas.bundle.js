/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/canvas.js":
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils__WEBPACK_IMPORTED_MODULE_0__);

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']; // Event Listeners

addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
}); // Objects

function Star(_ref) {
  var _ref$x = _ref.x,
      x = _ref$x === void 0 ? 0 : _ref$x,
      _ref$y = _ref.y,
      y = _ref$y === void 0 ? 0 : _ref$y,
      _ref$radius = _ref.radius,
      radius = _ref$radius === void 0 ? 30 : _ref$radius,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? '#fff' : _ref$color;
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.velocity = {
    x: _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomIntFromRange(-2, 2),
    y: 5
  };
  this.gravity = 0.5;
  this.friction = 0.8;
}

Star.prototype.draw = function () {
  c.save();
  c.beginPath();
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  c.shadowColor = '#fff';
  c.shadowBlur = 20;
  c.fillStyle = this.color;
  c.fill();
  c.closePath();
  c.restore();
};

Star.prototype.update = function () {
  this.draw();

  if (this.y + this.radius + this.velocity.y > window.innerHeight - groundHeight) {
    this.velocity.y = -this.velocity.y * this.friction;

    for (var i = 0; i < 8; i++) {
      miniStars.push(new MiniStar({
        x: this.x,
        y: this.y,
        radius: 2
      }));
    }

    this.radius -= 3;
  } else {
    this.velocity.y += this.gravity;
  }

  this.y += this.velocity.y;
  this.x += this.velocity.x;
};

function MiniStar(_ref2) {
  var _ref2$x = _ref2.x,
      x = _ref2$x === void 0 ? 0 : _ref2$x,
      _ref2$y = _ref2.y,
      y = _ref2$y === void 0 ? 0 : _ref2$y,
      _ref2$radius = _ref2.radius,
      radius = _ref2$radius === void 0 ? 30 : _ref2$radius,
      _ref2$color = _ref2.color,
      color = _ref2$color === void 0 ? '#fff' : _ref2$color;
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.velocity = {
    x: _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomIntFromRange(-5, 5),
    y: _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomIntFromRange(-15, 15)
  };
  this.gravity = 0.1;
  this.friction = 0.8;
  this.ttl = 100;
  this.opacity = 1;
}

MiniStar.prototype.draw = function () {
  c.save();
  c.beginPath();
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  c.shadowColor = '#fff';
  c.shadowBlur = 20;
  c.fillStyle = "rgba(255, 255, 255, ".concat(this.opacity, " )");
  c.fill();
  c.closePath();
  c.restore();
};

MiniStar.prototype.update = function () {
  this.draw();

  if (this.y + this.radius > canvas.height - groundHeight) {
    this.velocity.y = -this.velocity.y * this.friction;
  } else {
    this.velocity.y += this.gravity;
  }

  this.y += this.velocity.y;
  this.x += this.velocity.x;
  this.ttl -= 1;
  this.opacity -= 1 / this.ttl;
};

function Rocket() {
  this.rocketImage = new Image();
  this.rocketDirection = Math.random() < 0.5 ? 'ltr' : 'rtl';
  this.rocketVelocity = _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomIntFromRange(1, 3);
  this.rocketYPos = _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomIntFromRange(canvas.height / 2, canvas.height - groundHeight - 50);
  this.rocketImage.src = this.rocketDirection === 'ltr' ? 'rocket.svg' : 'rocket-reverse.svg';
  this.x = this.rocketDirection === 'ltr' ? -100 : canvas.width + 100;
  this.y = this.rocketYPos;
  this.velocity = {
    x: this.rocketDirection === 'ltr' ? this.rocketVelocity : -this.rocketVelocity,
    y: this.rocketVelocity
  };
  this.timeOutOfTheScreen = 0;
  this.rocketPauseTime = _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomIntFromRange(150, 300);
}

Rocket.prototype.draw = function () {
  c.drawImage(this.rocketImage, this.x, this.y, 20, 20);
};

Rocket.prototype.update = function () {
  this.draw();
  this.x += this.velocity.x;
  this.y -= this.velocity.y;

  if (this.y < 0) {
    if (this.timeOutOfTheScreen < this.rocketPauseTime) {
      this.timeOutOfTheScreen++;
    } else {
      rocket = new Rocket();
    }
  }
}; // Implementation


var stars;
var miniStars;
var staticStars;
var ticker = 0;
var groundHeight = 100;
var moon;
var moonToggle = Math.random() > 0.7;
var rocket = new Rocket();

function init() {
  stars = [];
  miniStars = [];
  staticStars = [];
  moon = new Star({
    x: _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomIntFromRange(0, canvas.width),
    y: _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomIntFromRange(0, canvas.height - 300),
    radius: _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomIntFromRange(50, 90),
    color: '#fff'
  });
  stars.push(new Star({
    width: canvas.width / 2,
    height: 30,
    radius: 15,
    color: 'white'
  }));

  for (var i = 0; i < 60; i++) {
    var xPos = _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomIntFromRange(0, canvas.width);
    var yPos = _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomIntFromRange(0, canvas.height) - 200;
    var radius = _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomIntFromRange(0.5, 3);
    staticStars.push(new Star({
      x: xPos,
      y: yPos,
      radius: radius,
      color: 'white'
    }));
  }
} // Animation Loop


function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  var bgGradient = c.createLinearGradient(0, 0, 0, canvas.height);
  bgGradient.addColorStop(0, '#01010d');
  bgGradient.addColorStop(1, '#402b70');
  c.fillStyle = bgGradient;
  c.fillRect(0, 0, canvas.width, canvas.height);
  if (moonToggle) moon.draw();
  staticStars.forEach(function (staticStar) {
    staticStar.draw();
  });
  c.fillStyle = 'black';
  c.fillRect(0, canvas.height - groundHeight, canvas.width, canvas.height);
  rocket.update();
  stars.forEach(function (star, index) {
    star.update();

    if (star.radius === 0) {
      stars.splice(index, 1);
    }
  });
  miniStars.forEach(function (miniStar, index) {
    miniStar.update();

    if (miniStar.ttl === 0) {
      miniStars.splice(index, 1);
    }
  });

  if (ticker % _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomIntFromRange(75, 200) === 0) {
    var xPos = _utils__WEBPACK_IMPORTED_MODULE_0___default.a.randomIntFromRange(0, canvas.width);
    var starWidth;
    var starWidthHelper = Math.random();

    if (starWidthHelper < 0.3) {
      starWidth = 9;
    } else if (starWidthHelper > 0.3 && starWidthHelper < 0.6) {
      starWidth = 12;
    } else {
      starWidth = 15;
    }

    stars.push(new Star({
      x: xPos,
      y: 0,
      radius: starWidth,
      color: 'white'
    }));
  }

  ticker++;
}

init();
animate();

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  var xDist = x2 - x1;
  var yDist = y2 - y1;
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

module.exports = {
  randomIntFromRange: randomIntFromRange,
  randomColor: randomColor,
  distance: distance
};

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map