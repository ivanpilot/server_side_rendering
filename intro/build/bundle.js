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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(3);

var _express2 = _interopRequireDefault(_express);

var _renderer = __webpack_require__(4);

var _renderer2 = _interopRequireDefault(_renderer);

var _createStore = __webpack_require__(9);

var _createStore2 = _interopRequireDefault(_createStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*********************************************** */
// On the server side we need to carefully execute operations before rendering anything that is before calling renderer() function.
// Even though we are doing SSR, even on the server side assuming we need a redux store and we need to fetch data to populate our html file that will be rendered we will do all this before rendering anything
// Unlike with react which happens inside the browser and which take  care of concurrency / competition race, on the server side we must determine when all the required fetching and store update is finshed so ONLY THEN we can serve our html by calling the renderer() function. This is also the reason why on the server side we do not call the <Provider /> component as this will trigger that we are ready to render our html.
// Given the above, we are going to create the store inside the index.js file before calling the renderer() funciton so we know so the store will be already ready to fetch and be populated
// It is ONLY AFTER the store is created, the data are fetched and the store is populated that we will call renderer()
/*********************************************** */

//import React from 'react';
//import { renderToString } from 'react-dom/server';
//import Home from './client/components/Home';
var app = (0, _express2.default)(); //const express = require('express');
//const React = require('react');
//const renderToString = require('react-dom/server').renderToString;
//const Home = require('./client/components/Home').default;

app.use(_express2.default.static('public'));

app.get('/', function (req, res) {
    var store = (0, _createStore2.default)();

    res.send((0, _renderer2.default)(req));
    // We pass the req object to the renderer function so that the StaticRouter knows which url the user is trying to access and so which component must be rendered
});

app.listen(3000, function () {
    console.log('listening on PORT 3000');
});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(5);

var _reactRouterDom = __webpack_require__(1);

var _reactRedux = __webpack_require__(8);

var _Routes = __webpack_require__(6);

var _Routes2 = _interopRequireDefault(_Routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// On the server side, we use StaticRouter rather than BrowserRouter as we do on the client side. The reason is that the BrowserRouter looks at the url to select which Route component to use but on the server side we do not have any url to look at!! so We use StaticRouter and pass him the url info differently so it knows which component to render.
// The request object of every request hitting the express server contains the url

exports.default = function (req, store) {
    //const content = renderToString(<Home />);

    var content = (0, _server.renderToString)(_react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(
            _reactRouterDom.StaticRouter,
            { location: req.path, context: {} },
            _react2.default.createElement(_Routes2.default, null)
        )
    ));

    return '\n        <html>\n            <head></head>\n            <body>\n                <div id="root">' + content + '</div>\n                <script src="bundle.js"></script>\n            </body>\n        </html>\n    ';
};
//import Home from '../client/components/Home';

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

var _Home = __webpack_require__(7);

var _Home2 = _interopRequireDefault(_Home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _Home2.default })
    );
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Home = function Home() {
    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'div',
            null,
            'I am the Home component'
        ),
        _react2.default.createElement(
            'button',
            { onClick: function onClick() {
                    return console.log('Hello');
                } },
            'Click'
        )
    );
};

exports.default = Home;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = __webpack_require__(10);

var _reduxThunk = __webpack_require__(11);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Unlike for the client we do not use the <Provider /> here because on the server we just want to create the store to manage the redux aspect whereas for the client we create the store and immediately want to use it for our client side application

exports.default = function () {
    var store = (0, _redux.createStore)(reducers, {}, (0, _redux.applyMiddleware)(_reduxThunk2.default));
    return store;
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ })
/******/ ]);