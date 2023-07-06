"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = authStrategiesLoader;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _auth = _interopRequireDefault(require("../kobil-strategies/auth0"));
function authStrategiesLoader(_x, _x2) {
  return _authStrategiesLoader.apply(this, arguments);
}
function _authStrategiesLoader() {
  _authStrategiesLoader = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(container, authOptions) {
    var configModule;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          configModule = container.resolve("configModule");
          _auth["default"].load(container, configModule, authOptions);
        case 2:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _authStrategiesLoader.apply(this, arguments);
}