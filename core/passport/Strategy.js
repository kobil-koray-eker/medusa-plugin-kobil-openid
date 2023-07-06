"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PassportStrategy = PassportStrategy;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _passport = _interopRequireDefault(require("passport"));
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function PassportStrategy(Strategy, name) {
  var MixinStrategy = /*#__PURE__*/function (_Strategy) {
    (0, _inherits2["default"])(MixinStrategy, _Strategy);
    var _super = _createSuper(MixinStrategy);
    function MixinStrategy() {
      var _this;
      (0, _classCallCheck2["default"])(this, MixinStrategy);
      var callback = /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
          var _len2,
            params,
            _key2,
            done,
            _this2,
            validateResult,
            _args = arguments;
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                for (_len2 = _args.length, params = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                  params[_key2] = _args[_key2];
                }
                done = params.pop();
                _context.prev = 2;
                _context.next = 5;
                return (_this2 = _this).validate.apply(_this2, params);
              case 5:
                validateResult = _context.sent;
                done(null, validateResult);
                _context.next = 12;
                break;
              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](2);
                done(_context.t0, null);
              case 12:
              case "end":
                return _context.stop();
            }
          }, _callee, null, [[2, 9]]);
        }));
        return function callback() {
          return _ref.apply(this, arguments);
        };
      }();
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _super.call.apply(_super, [this].concat(args, [callback]));
      var passportInstance = _this.getPassportInstance();
      if (name) {
        passportInstance.use(name, (0, _assertThisInitialized2["default"])(_this));
      } else {
        passportInstance.use((0, _assertThisInitialized2["default"])(_this));
      }
      return _this;
    }
    (0, _createClass2["default"])(MixinStrategy, [{
      key: "getPassportInstance",
      value: function getPassportInstance() {
        return _passport["default"];
      }
    }]);
    return MixinStrategy;
  }(Strategy);
  return MixinStrategy;
}