"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strategyNames = exports.TWENTY_FOUR_HOURS_IN_MS = exports.CUSTOMER_METADATA_KEY = exports.AUTH_PROVIDER_KEY = void 0;
var _auth = require("../kobil-strategies/auth0");
var CUSTOMER_METADATA_KEY = "useSocialAuth";
exports.CUSTOMER_METADATA_KEY = CUSTOMER_METADATA_KEY;
var AUTH_PROVIDER_KEY = "authProvider";
exports.AUTH_PROVIDER_KEY = AUTH_PROVIDER_KEY;
var TWENTY_FOUR_HOURS_IN_MS = 24 * 60 * 60 * 1000;
exports.TWENTY_FOUR_HOURS_IN_MS = TWENTY_FOUR_HOURS_IN_MS;
var strategyNames = {
  kobil: {
    admin: _auth.KOBIL_ADMIN_STRATEGY_NAME,
    store: _auth.KOBIL_STORE_STRATEGY_NAME
  }
};
exports.strategyNames = strategyNames;