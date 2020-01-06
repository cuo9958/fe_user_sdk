"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("./utils/request");
class KoaMiddleware {
    constructor(opts) {
        this.baseUrl = '';
        this.token = '';
        this.STATE = 0;
        this.baseUrl = opts.url;
        this.token = opts.token;
    }
    async init() {
        this.STATE = 1;
    }
    auth() {
        request_1.get(this.baseUrl + '/open/auth', {});
    }
    login() {
        request_1.post(this.baseUrl + '/open/login', {});
    }
    getInfo() { }
    checkRule(rule) { }
}
let KoaCache = null;
function KoaMiddle(opts) {
    if (!KoaCache) {
        KoaCache = new KoaMiddleware(opts);
    }
    return KoaCache;
}
exports.KoaMiddle = KoaMiddle;
