"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateAdminCallback = validateAdminCallback;
exports.validateStoreCallback = validateStoreCallback;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _medusaCoreUtils = require("medusa-core-utils");
var _types = require("../types");
/**
 * Default validate callback used by an admin passport strategy
 *
 */
function validateAdminCallback(_x, _x2) {
  return _validateAdminCallback.apply(this, arguments);
}
/**
 * Default validate callback used by a store passport strategy
 *
 * @param profile
 * @param strategyErrorIdentifier It will be used to compose the error message in case of an error (e.g Google, Facebook)
 * @param container
 */
function _validateAdminCallback() {
  _validateAdminCallback = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(profile, _ref) {
    var _profile$emails, _profile$emails$;
    var container, strategyErrorIdentifier, userService, email, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          container = _ref.container, strategyErrorIdentifier = _ref.strategyErrorIdentifier;
          userService = container.resolve("userService");
          email = (_profile$emails = profile.emails) === null || _profile$emails === void 0 ? void 0 : (_profile$emails$ = _profile$emails[0]) === null || _profile$emails$ === void 0 ? void 0 : _profile$emails$.value;
          if (email) {
            _context.next = 5;
            break;
          }
          throw new _medusaCoreUtils.MedusaError(_medusaCoreUtils.MedusaError.Types.NOT_ALLOWED, "Your ".concat(capitalize(strategyErrorIdentifier), " account does not contains any email and cannot be used"));
        case 5:
          _context.next = 7;
          return userService.retrieveByEmail(email)["catch"](function () {
            return void 0;
          });
        case 7:
          user = _context.sent;
          if (!user) {
            _context.next = 13;
            break;
          }
          if (!(!user.metadata || user.metadata[_types.AUTH_PROVIDER_KEY] !== _types.strategyNames[strategyErrorIdentifier].admin)) {
            _context.next = 11;
            break;
          }
          throw new _medusaCoreUtils.MedusaError(_medusaCoreUtils.MedusaError.Types.INVALID_DATA, "Admin with email ".concat(email, " already exists"));
        case 11:
          _context.next = 14;
          break;
        case 13:
          throw new _medusaCoreUtils.MedusaError(_medusaCoreUtils.MedusaError.Types.NOT_ALLOWED, "Unable to authenticate the user with the email ".concat(email));
        case 14:
          return _context.abrupt("return", {
            id: user.id
          });
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _validateAdminCallback.apply(this, arguments);
}
function validateStoreCallback(_x3, _x4) {
  return _validateStoreCallback.apply(this, arguments);
}
function _validateStoreCallback() {
  _validateStoreCallback = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(profile, _ref2) {
    var container, strategyErrorIdentifier, manager, customerService;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          container = _ref2.container, strategyErrorIdentifier = _ref2.strategyErrorIdentifier;
          manager = container.resolve("manager");
          customerService = container.resolve("customerService");
          _context3.next = 5;
          return manager.transaction( /*#__PURE__*/function () {
            var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(transactionManager) {
              var _profile$emails2, _profile$emails2$, _metadata, _profile$name$givenNa, _profile$name, _profile$name$familyN, _profile$name2;
              var email, customer;
              return _regenerator["default"].wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    // console.log("profile", profile);
                    email = (_profile$emails2 = profile.emails) === null || _profile$emails2 === void 0 ? void 0 : (_profile$emails2$ = _profile$emails2[0]) === null || _profile$emails2$ === void 0 ? void 0 : _profile$emails2$.value;
                    if (email) {
                      _context2.next = 3;
                      break;
                    }
                    throw new _medusaCoreUtils.MedusaError(_medusaCoreUtils.MedusaError.Types.NOT_ALLOWED, "Your ".concat(capitalize(strategyErrorIdentifier), " account does not contains any email and cannot be used"));
                  case 3:
                    _context2.next = 5;
                    return customerService.withTransaction(transactionManager).retrieveRegisteredByEmail(email)["catch"](function () {
                      return void 0;
                    });
                  case 5:
                    customer = _context2.sent;
                    if (!customer) {
                      _context2.next = 16;
                      break;
                    }
                    if (!(customer.metadata && customer.metadata[_types.CUSTOMER_METADATA_KEY] && !customer.metadata[_types.AUTH_PROVIDER_KEY])) {
                      _context2.next = 11;
                      break;
                    }
                    customer.metadata[_types.AUTH_PROVIDER_KEY] = _types.strategyNames[strategyErrorIdentifier].store;
                    _context2.next = 11;
                    return customerService.withTransaction(transactionManager).update(customer.id, {
                      metadata: customer.metadata
                    });
                  case 11:
                    if (!(!customer.metadata || !customer.metadata[_types.CUSTOMER_METADATA_KEY] || customer.metadata[_types.AUTH_PROVIDER_KEY] !== _types.strategyNames[strategyErrorIdentifier].store)) {
                      _context2.next = 15;
                      break;
                    }
                    throw new _medusaCoreUtils.MedusaError(_medusaCoreUtils.MedusaError.Types.INVALID_DATA, "Customer with email ".concat(email, " already exists"));
                  case 15:
                    return _context2.abrupt("return", {
                      id: customer.id
                    });
                  case 16:
                    _context2.next = 18;
                    return customerService.withTransaction(transactionManager).create({
                      email: email,
                      metadata: (_metadata = {}, (0, _defineProperty2["default"])(_metadata, _types.CUSTOMER_METADATA_KEY, true), (0, _defineProperty2["default"])(_metadata, _types.AUTH_PROVIDER_KEY, _types.strategyNames[strategyErrorIdentifier].store), _metadata),
                      first_name: (_profile$name$givenNa = (_profile$name = profile.name) === null || _profile$name === void 0 ? void 0 : _profile$name.givenName) !== null && _profile$name$givenNa !== void 0 ? _profile$name$givenNa : "",
                      last_name: (_profile$name$familyN = (_profile$name2 = profile.name) === null || _profile$name2 === void 0 ? void 0 : _profile$name2.familyName) !== null && _profile$name$familyN !== void 0 ? _profile$name$familyN : "",
                      has_account: true,
                      id: profile.id
                    });
                  case 18:
                    customer = _context2.sent;
                    return _context2.abrupt("return", {
                      id: customer.id
                    });
                  case 20:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return function (_x5) {
              return _ref3.apply(this, arguments);
            };
          }());
        case 5:
          return _context3.abrupt("return", _context3.sent);
        case 6:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _validateStoreCallback.apply(this, arguments);
}
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}