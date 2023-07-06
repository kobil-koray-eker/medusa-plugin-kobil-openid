"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _config = _interopRequireDefault(require("@medusajs/medusa/dist/loaders/config"));
var _auth = _interopRequireDefault(require("../kobil-strategies/auth0"));
function _default(rootDirectory, pluginOptions) {
  var configModule = (0, _config["default"])(rootDirectory);
  return loadRouters(configModule, pluginOptions);
}
function loadRouters(configModule, options) {
  var routers = [];
  routers.push.apply(routers, (0, _toConsumableArray2["default"])(_auth["default"].getRouter(configModule, options)));
  return routers;
}