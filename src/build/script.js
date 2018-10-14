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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/LinkBuilder.js":
/*!****************************!*\
  !*** ./src/LinkBuilder.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return LinkBuilder; });\nclass LinkBuilder {\n  buildLink(className, innerHTML, action) {\n    let link = document.createElement('a');\n    link.href = '#';\n    link.classList.add('slidesjs-navigation');\n\n    if (className) {\n      link.classList.add(className);\n    }\n\n    if (innerHTML) {\n      link.innerHTML = innerHTML;\n    }\n\n    if (action) {\n      link.onclick = action;\n    }\n\n    return link;\n  }\n\n}\n\n//# sourceURL=webpack:///./src/LinkBuilder.js?");

/***/ }),

/***/ "./src/SliderJS.js":
/*!*************************!*\
  !*** ./src/SliderJS.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SliderJS; });\n/* harmony import */ var _LinkBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LinkBuilder */ \"./src/LinkBuilder.js\");\n\nclass SliderJS {\n  constructor(containerId, options = {}) {\n    this._topContainer = null;\n    this._slides = [];\n    this._currentSlideIndex = 0;\n    this._options = options;\n    this._containerId = containerId;\n    this._autoplayKey = null;\n    this._width = 800;\n    this._height = 400;\n    this._playing = false;\n    this._linkBuilder = new _LinkBuilder__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    this.init();\n    this._touchState = {\n      isActive: false,\n      x: 0,\n      y: 0,\n      minDiff: 50\n    };\n  }\n\n  init() {\n    if (!this._containerId) {\n      console.error('Не задан ИД контейнера картинок');\n      return;\n    }\n\n    this._topContainer = document.getElementById(this._containerId);\n\n    if (!this._topContainer) {\n      console.error('Не найден контейнер картинок');\n      return;\n    }\n\n    this.initSlides();\n    this.initContainer();\n\n    if (!this._options.hideControls) {\n      this.addPrevLink();\n      this.addNextLink();\n\n      if (this._options.autoplay) {\n        this.addAutoplay();\n        this.addPause();\n      }\n    } else if (this._options.autoplay) {\n      this.autoplay();\n    }\n  }\n\n  initContainer() {\n    const self = this;\n    const slidesContainer = document.createElement('div');\n    slidesContainer.classList.add('slidesjs-container');\n    slidesContainer.style.width = `${this._width}px`;\n    slidesContainer.style.height = `${this._height}px`;\n    slidesContainer.addEventListener('transitionend', () => {\n      self._playing = false;\n    });\n    slidesContainer.addEventListener('touchstart', e => {\n      self._touchState.isActive = true;\n      self._touchState.x = e.changedTouches[0].pageX;\n      self._touchState.y = e.changedTouches[0].pageY;\n    });\n    slidesContainer.addEventListener('touchend', e => {\n      self._touchState.isActive = false;\n      const diffX = e.changedTouches[0].pageX - self._touchState.x;\n      self._touchState.x = 0;\n\n      if (diffX > self._touchState.minDiff) {\n        self.prev.call(self);\n      } else if (-1 * diffX > -1 * self._touchState.minDiff) {\n        self.next.call(self);\n      }\n    });\n    const slidesControl = document.createElement('div');\n    slidesControl.classList.add('slidesjs-control');\n    slidesControl.style.width = `${this._width}px`;\n    slidesControl.style.height = `${this._height}px`;\n    slidesContainer.appendChild(slidesControl);\n\n    for (let i = 0; i < this._slides.length; i++) {\n      slidesControl.appendChild(this._slides[i]);\n    }\n\n    this._topContainer.appendChild(slidesContainer);\n  }\n\n  initSlides() {\n    this._topContainer.classList.add('slides');\n\n    const slides = this._topContainer.querySelectorAll('.slides > div,img');\n\n    if (slides.length === 0) {\n      return;\n    }\n\n    const prevIndex = slides.length - 1;\n\n    for (let i = 0; i < slides.length; i++) {\n      const slide = slides[i];\n      slide.classList.add('slidesjs-slide');\n\n      if (i > 1 && i !== prevIndex) {\n        slide.style.display = 'none';\n      }\n\n      if (i === prevIndex) {\n        slide.style.left = `-${this._width}px`;\n      }\n\n      if (i === 1) {\n        slide.style.left = `${this._width}px`;\n      }\n\n      if (i === 0) {\n        slide.style.left = '0';\n      }\n\n      this._slides.push(slide);\n    }\n  }\n\n  addLink(className, innerHTML, action) {\n    const link = this._linkBuilder.buildLink(className, innerHTML, action);\n\n    this._topContainer.appendChild(link);\n\n    return link;\n  }\n\n  addAutoplay() {\n    this.addLink('slidesjs-autoplay', '►', this.autoplay.bind(this));\n  }\n\n  addPause() {\n    const link = this.addLink('slidesjs-pause', '❚❚', this.pause.bind(this));\n    link.style.display = 'none';\n  }\n\n  addPrevLink() {\n    this.addLink('slidesjs-previous', '←', this.prev.bind(this));\n  }\n\n  addNextLink() {\n    this.addLink('slidesjs-next', '→', this.next.bind(this));\n  }\n\n  getPrevIndex(currentIndex) {\n    if (this._slides.length === 0) {\n      return 0;\n    }\n\n    let prevIndex;\n\n    if (currentIndex === 0) {\n      prevIndex = this._slides.length - 1;\n    } else {\n      prevIndex = currentIndex - 1;\n    }\n\n    return prevIndex;\n  }\n\n  getNextIndex(currentIndex) {\n    if (this._slides.length === 0) {\n      return 0;\n    }\n\n    let nextIndex;\n\n    if (currentIndex < this._slides.length - 1) {\n      nextIndex = currentIndex + 1;\n    } else {\n      nextIndex = 0;\n    }\n\n    return nextIndex;\n  }\n\n  autoplay() {\n    if (this._slides.length < 1) {\n      return;\n    }\n\n    const autoplayLink = this._topContainer.querySelector('.slidesjs-autoplay');\n\n    if (autoplayLink) {\n      autoplayLink.style.display = 'none';\n    }\n\n    const pauseLink = this._topContainer.querySelector('.slidesjs-pause');\n\n    if (pauseLink) {\n      pauseLink.style.display = 'inline';\n    }\n\n    let interval = this._options.autoplayInterval;\n\n    if (!interval || interval < 1000) {\n      interval = 1000;\n    }\n\n    this.next();\n    this._autoplayKey = setInterval(this.next.bind(this), interval);\n  }\n\n  pause() {\n    if (!this._autoplayKey) {\n      return;\n    }\n\n    clearInterval(this._autoplayKey);\n    this._autoplayKey = null;\n\n    const autoplayLink = this._topContainer.querySelector('.slidesjs-autoplay');\n\n    if (autoplayLink) {\n      autoplayLink.style.display = 'inline';\n    }\n\n    const pauseLink = this._topContainer.querySelector('.slidesjs-pause');\n\n    if (pauseLink) {\n      pauseLink.style.display = 'none';\n    }\n  }\n\n  prev() {\n    if (this._slides.length < 1) {\n      return;\n    }\n\n    if (this._playing) {\n      return;\n    }\n\n    this._playing = true;\n    const nextIndex = this.getNextIndex(this._currentSlideIndex);\n    this._slides[nextIndex].style.display = 'none';\n    this._slides[this._currentSlideIndex].style.left = `${this._width}px`;\n    this._slides[this._currentSlideIndex].style.zIndex = '10';\n    const prevIndex = this.getPrevIndex(this._currentSlideIndex);\n    const prevPrevIndex = this.getPrevIndex(prevIndex);\n\n    if (this._slides.length > 3) {\n      this._slides[prevPrevIndex].style.display = 'block';\n    }\n\n    this._slides[prevPrevIndex].style.left = `-${this._width}px`;\n    this._slides[prevIndex].style.display = 'block';\n    this._slides[prevIndex].style.left = '0px';\n    this._currentSlideIndex = prevIndex;\n  }\n\n  next() {\n    if (this._slides.length < 1) {\n      return;\n    }\n\n    if (this._playing) {\n      return;\n    }\n\n    this._playing = true;\n    const prevIndex = this.getPrevIndex(this._currentSlideIndex);\n    this._slides[prevIndex].style.display = 'none';\n    this._slides[this._currentSlideIndex].style.left = `-${this._width}px`;\n    const nextIndex = this.getNextIndex(this._currentSlideIndex);\n    const nextNextIndex = this.getNextIndex(nextIndex);\n\n    if (this._slides.length > 3) {\n      this._slides[nextNextIndex].style.display = 'block';\n    }\n\n    this._slides[nextNextIndex].style.left = `${this._width}px`;\n    this._slides[nextIndex].style.display = 'block';\n    this._slides[nextIndex].style.left = '0px';\n    this._currentSlideIndex = nextIndex;\n  }\n\n}\n\n//# sourceURL=webpack:///./src/SliderJS.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _SliderJS__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SliderJS */ \"./src/SliderJS.js\");\n/* harmony import */ var _LinkBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LinkBuilder */ \"./src/LinkBuilder.js\");\n\n\nwindow.SliderJS = _SliderJS__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\nwindow.LinkBuilder = _LinkBuilder__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ })

/******/ });