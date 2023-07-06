"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authCallbackMiddleware = authCallbackMiddleware;
exports.sendTokenFactory = sendTokenFactory;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * Return the handler of the auth callback for an auth strategy. Once the auth is successful this callback
 * will be called.
 * @param domain
 * @param secret
 * @param expiresIn
 * @param successRedirectGetter
 */
function authCallbackMiddleware(domain, secret, expiresIn, successRedirectGetter) {
  return function (req, res) {
    var sendToken = sendTokenFactory(domain, secret, expiresIn);
    sendToken(req, res);
    res.redirect(successRedirectGetter());
  };
}
function sendTokenFactory(domain, secret, expiresIn) {
  return function (req, res) {
    var tokenData = domain === 'admin' ? _objectSpread({
      userId: req.user.id
    }, req.user) : _objectSpread({
      customer_id: req.user.id
    }, req.user);
    var token = _jsonwebtoken["default"].sign(tokenData, secret, {
      expiresIn: expiresIn
    });
    var sessionKey = domain === 'admin' ? 'jwt' : 'jwt_store';
    req.session[sessionKey] = token;
  };
}