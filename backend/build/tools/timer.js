"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function timer(ms) {
    return new Promise(function (res) { return setTimeout(res, ms); });
}
exports.default = timer;
