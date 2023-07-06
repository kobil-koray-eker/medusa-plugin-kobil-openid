"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passportAuthRoutesBuilder = passportAuthRoutesBuilder;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _express = require("express");
var _passport = _interopRequireDefault(require("passport"));
var _cors = _interopRequireDefault(require("cors"));
var _types = require("../../../types");
var _authCallbackMiddleware = require("../../auth-callback-middleware");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * Build and return a router including the different route and configuration for a passport strategy
 * @param domain
 * @param configModule
 * @param authPath The path used to start the auth process e.g /admin/auth/google
 * @param authCallbackPath The pass used as the callback handler
 * @param strategyName The name use the define the strategy
 * @param passportAuthenticateMiddlewareOptions The options apply to the passport strategy on the auth path
 * @param passportCallbackAuthenticateMiddlewareOptions The options apply to the passport strategy on the callback auth path
 * @param expiresIn
 * @param successRedirect
 */
function passportAuthRoutesBuilder(_ref) {
  var domain = _ref.domain,
    configModule = _ref.configModule,
    authPath = _ref.authPath,
    strategyName = _ref.strategyName,
    passportAuthenticateMiddlewareOptions = _ref.passportAuthenticateMiddlewareOptions,
    passportCallbackAuthenticateMiddlewareOptions = _ref.passportCallbackAuthenticateMiddlewareOptions,
    expiresIn = _ref.expiresIn,
    successRedirect = _ref.successRedirect,
    authCallbackPath = _ref.authCallbackPath;
  var router = (0, _express.Router)();
  var originalSuccessRedirect = successRedirect;
  var corsOptions = {
    origin: domain === 'admin' ? configModule.projectConfig.admin_cors.split(',') : configModule.projectConfig.store_cors.split(','),
    credentials: true
  };
  router.get(authPath, (0, _cors["default"])(corsOptions));
  /* necessary if you are using non medusajs client such as a pure axios call, axios initially requests options and then get */
  router.options(authPath, (0, _cors["default"])(corsOptions));
  router.get(authPath, function (req, res, next) {
    // Allow to override the successRedirect by passing a query param `?redirectTo=your_url`
    successRedirect = req.query.redirectTo ? req.query.redirectTo : originalSuccessRedirect;
    next();
  }, _passport["default"].authenticate(strategyName, _objectSpread(_objectSpread({}, passportAuthenticateMiddlewareOptions), {}, {
    session: false
  })));
  var callbackHandler = (0, _authCallbackMiddleware.authCallbackMiddleware)(domain, configModule.projectConfig.jwt_secret, expiresIn !== null && expiresIn !== void 0 ? expiresIn : _types.TWENTY_FOUR_HOURS_IN_MS, function () {
    return successRedirect;
  });
  router.get(authCallbackPath, (0, _cors["default"])(corsOptions));
  router.get(authCallbackPath, function (req, res, next) {
    if (req.user) {
      return callbackHandler(req, res);
    }
    next();
  }, _passport["default"].authenticate(strategyName, _objectSpread(_objectSpread({}, passportCallbackAuthenticateMiddlewareOptions), {}, {
    session: false
  })), callbackHandler);
  return router;
}