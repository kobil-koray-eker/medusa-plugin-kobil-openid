"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KobilAdminStrategy = void 0;
exports.getKobilAdminAuthRouter = getKobilAdminAuthRouter;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _passportOauth = require("passport-oauth2");
var _types = require("./types");
var _Strategy = require("../../core/passport/Strategy");
var _validateCallback = require("../../core/validate-callback");
var _authRoutesBuilder = require("../../core/passport/utils/auth-routes-builder");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var KobilAdminStrategy = /*#__PURE__*/function (_PassportStrategy) {
  (0, _inherits2["default"])(KobilAdminStrategy, _PassportStrategy);
  var _super = _createSuper(KobilAdminStrategy);
  function KobilAdminStrategy(container, configModule, strategyOptions) {
    var _this;
    (0, _classCallCheck2["default"])(this, KobilAdminStrategy);
    _this = _super.call(this, {
      authorizationURL: strategyOptions.authorizationURL,
      tokenURL: strategyOptions.tokenURL,
      clientID: strategyOptions.clientID,
      clientSecret: strategyOptions.clientSecret,
      callbackURL: strategyOptions.store.callbackUrl
    });
    _this.container = container;
    _this.configModule = configModule;
    _this.strategyOptions = strategyOptions;
    return _this;
  }
  (0, _createClass2["default"])(KobilAdminStrategy, [{
    key: "validate",
    value: function () {
      var _validate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, accessToken, refreshToken, extraParams, profile) {
        var _validateRes, validateRes;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!this.strategyOptions.admin.verifyCallback) {
                _context.next = 5;
                break;
              }
              _context.next = 3;
              return this.strategyOptions.admin.verifyCallback(this.container, req, accessToken, refreshToken, extraParams, profile);
            case 3:
              _validateRes = _context.sent;
              return _context.abrupt("return", _objectSpread(_objectSpread({}, _validateRes), {}, {
                accessToken: accessToken
              }));
            case 5:
              _context.next = 7;
              return (0, _validateCallback.validateAdminCallback)(profile, {
                container: this.container,
                strategyErrorIdentifier: "kobil"
              });
            case 7:
              validateRes = _context.sent;
              return _context.abrupt("return", _objectSpread(_objectSpread({}, validateRes), {}, {
                accessToken: accessToken
              }));
            case 9:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function validate(_x, _x2, _x3, _x4, _x5) {
        return _validate.apply(this, arguments);
      }
      return validate;
    }()
  }]);
  return KobilAdminStrategy;
}((0, _Strategy.PassportStrategy)(_passportOauth.Strategy, _types.KOBIL_ADMIN_STRATEGY_NAME));
/**
 * Return the router that holds the auth0 admin authentication routes
 * @param auth0
 * @param configModule
 */
exports.KobilAdminStrategy = KobilAdminStrategy;
function getKobilAdminAuthRouter(kobil, configModule) {
  var _kobil$admin$authPath, _kobil$admin$authCall;
  return (0, _authRoutesBuilder.passportAuthRoutesBuilder)({
    domain: "admin",
    configModule: configModule,
    authPath: (_kobil$admin$authPath = kobil.admin.authPath) !== null && _kobil$admin$authPath !== void 0 ? _kobil$admin$authPath : "/admin/auth/kobil",
    authCallbackPath: (_kobil$admin$authCall = kobil.admin.authCallbackPath) !== null && _kobil$admin$authCall !== void 0 ? _kobil$admin$authCall : "/admin/auth/kobil/cb",
    successRedirect: kobil.admin.successRedirect,
    strategyName: _types.KOBIL_ADMIN_STRATEGY_NAME,
    passportAuthenticateMiddlewareOptions: {
      scope: "openid"
    },
    passportCallbackAuthenticateMiddlewareOptions: {
      failureRedirect: kobil.admin.failureRedirect
    },
    expiresIn: kobil.admin.expiresIn
  });
}