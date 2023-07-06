"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports["default"] = void 0;
var _admin = require("./admin");
Object.keys(_admin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _admin[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _admin[key];
    }
  });
});
var _store = require("./store");
Object.keys(_store).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _store[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _store[key];
    }
  });
});
var _types = require("./types");
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _types[key];
    }
  });
});
var _default = {
  load: function load(container, configModule, options) {
    var _options$kobil, _options$kobil2;
    if ((_options$kobil = options.kobil) !== null && _options$kobil !== void 0 && _options$kobil.admin) {
      new _admin.KobilAdminStrategy(container, configModule, options.kobil);
    }
    if ((_options$kobil2 = options.kobil) !== null && _options$kobil2 !== void 0 && _options$kobil2.store) {
      new _store.KobilStoreStrategy(container, configModule, options.kobil);
    }
  },
  getRouter: function getRouter(configModule, options) {
    var _options$kobil3, _options$kobil4;
    var routers = [];
    if ((_options$kobil3 = options.kobil) !== null && _options$kobil3 !== void 0 && _options$kobil3.admin) {
      routers.push((0, _admin.getKobilAdminAuthRouter)(options.kobil, configModule));
    }
    if ((_options$kobil4 = options.kobil) !== null && _options$kobil4 !== void 0 && _options$kobil4.store) {
      routers.push((0, _store.getKobilStoreAuthRouter)(options.kobil, configModule));
    }
    return routers;
  }
};
exports["default"] = _default;