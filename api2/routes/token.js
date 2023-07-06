"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _axios = _interopRequireDefault(require("axios"));
var _jwtDecode = _interopRequireDefault(require("jwt-decode"));
var CLIENT_ID = process.env.CLIENT_ID;
var CLIENT_SECRET = process.env.CLIENT_SECRET;
var _default = function _default(router) {
  router.post("/token", /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var _req$body, REDIRECT_URI, AUTHORIZATION_CODE, body, response, decoded;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, REDIRECT_URI = _req$body.redirectUrl, AUTHORIZATION_CODE = _req$body.code;
            body = {
              client_id: CLIENT_ID,
              client_secret: CLIENT_SECRET,
              code: AUTHORIZATION_CODE,
              redirect_uri: REDIRECT_URI,
              grant_type: "authorization_code"
            };
            _context.prev = 2;
            _context.next = 5;
            return _axios["default"].post(
            // "https://idp.monaco-arabox-test-i5loq.midentity.dev/auth/realms/korayeker777/protocol/openid-connect/token",
            "https://idp.neom-poc.shift.kobil.com/auth/realms/kurtis/protocol/openid-connect/token", body, {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            });
          case 5:
            response = _context.sent;
            decoded = (0, _jwtDecode["default"])(response.data.access_token);
            console.log(decoded.email);
            return _context.abrupt("return", res.json(response.data));
          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](2);
            res.status(400).json({
              message: _context.t0
            });
          case 14:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[2, 11]]);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};
exports["default"] = _default;