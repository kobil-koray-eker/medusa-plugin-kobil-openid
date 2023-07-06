"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _auth = _interopRequireDefault(require("./routes/auth"));
var _token = _interopRequireDefault(require("./routes/token"));
// import { projectConfig } from "../../../../medusa-config";

var cors = require("cors");
var _default = function _default() {
  var router = (0, _express.Router)();
  // router.use(
  //   cors({ origin: ["http://localhost:8000","http://test:3000"], credentials: true })
  // );
  router.use(_bodyParser["default"].json());
  router.use(_bodyParser["default"].urlencoded({
    extended: true
  }));
  (0, _auth["default"])(router);
  (0, _token["default"])(router);
  return router;
};
exports["default"] = _default;