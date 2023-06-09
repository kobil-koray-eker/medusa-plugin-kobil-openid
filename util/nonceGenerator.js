"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nonceGenerator = nonceGenerator;
function nonceGenerator(length) {
  var nonce = "";
  var allowed = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    nonce = nonce.concat(allowed.charAt(Math.floor(Math.random() * allowed.length)));
  }
  return nonce;
}