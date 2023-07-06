"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _constants = require("../../util/constants");
var _nonceGenerator = require("../../util/nonceGenerator");
var CLIENT_ID = process.env.CLIENT_ID;
var _default = function _default(router) {
  router.post("/auth", function (req, res) {
    var REDIRECT_URI = req.body.redirectUrl;
    var NONCE = (0, _nonceGenerator.nonceGenerator)(11);
    var url = "".concat(_constants.BASE_URL, "/protocol/openid-connect/auth?client_id=").concat(CLIENT_ID, "&redirect_uri=").concat(REDIRECT_URI, "&scope=openid&response_type=code&response_mode=query&nonce=").concat(NONCE);
    res.json(url);
  });
};
exports["default"] = _default;