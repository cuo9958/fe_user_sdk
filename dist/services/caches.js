"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isBrower = window ? true : false;
let caches = {};
if (isBrower) {
}
function get() {
    console.log(isBrower);
}
exports.get = get;
